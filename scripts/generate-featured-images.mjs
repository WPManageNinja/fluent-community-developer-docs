#!/usr/bin/env node
/**
 * Generates branded 1200x630 featured/OG images for every doc page, so a link
 * shared on Slack / X / Facebook / LinkedIn previews with that page's own title
 * instead of one generic hero image for the whole site.
 *
 * Output: <publicDir>/images/featured/<card>.png, served at `/images/featured/<card>.png`.
 *
 * NAMING RULE — kept in sync with `featuredImageFor()` in the VitePress config:
 *
 *     card = <served page path without .md, with every "/" replaced by "--"> + ".png"
 *
 * "Served page path" is what `pageData.relativePath` holds by the time the config's
 * transform hook runs — i.e. AFTER any `rewrites` have been applied. For a repo with no
 * rewrites that is the real source path (`guide/setup/install.md` -> `guide--setup--install.png`);
 * for a repo that flattens URLs it is the flat slug (`install.md` -> `install.png`). The
 * `servedPath()` function in the CONFIG block below replicates this repo's rewrite rule so
 * the script can compute the same name without importing the TypeScript config.
 *
 * The home page (`index.md`) becomes `index.png`, and a `default.png` is also emitted as
 * the fallback for any page with no card. If two pages would produce the same card name
 * the script fails loudly rather than letting one silently overwrite the other.
 *
 * Idempotent: skips any output file that already exists unless --force is passed.
 * Run via `npm run featured:generate` (or `featured:regenerate`).
 */

import { readdirSync, statSync, readFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, relative, dirname, basename, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..')
const FORCE = process.argv.includes('--force')

// =========================================================================
// CONFIG — the only block that differs between the WPManageNinja docs repos.
// =========================================================================

const SITE_URL = 'https://dev.fluentcommunity.co'
const FOOTER_TEXT = 'dev.fluentcommunity.co'
const DEFAULT_TITLE = 'FluentCommunity Developer Docs'

// Paths, relative to the repo root. SRC_DIR_REL mirrors VitePress `srcDir` ('' = repo root);
// PUBLIC_DIR_REL mirrors the effective publicDir; HOME_REL is the `layout: home` page.
const SRC_DIR_REL = 'docs'
const PUBLIC_DIR_REL = 'public'
const HOME_REL = 'docs/index.md'
// Folders under SRC_DIR that hold no pages (mirrors `srcExclude` / stray asset folders).
const EXCLUDE_DIRS_REL = []

// Eyebrow label = first folder of the page path, after skipping these wrapper folders,
// title-cased — with SECTION_LABELS pinning the ones that title-case badly (acronyms etc.).
const SECTION_PREFIXES = []
const SECTION_LABELS = {
  restapi: 'REST API'
}

// Dark-mode wordmark. `width` sizes a ready-made lockup; `recolor` swaps SVG fills that
// vanish on a dark ground; `wordmark` sets the product name beside an icon-only mark.
const LOGO = {
  path: 'public/images/dev-logo-dark.png',
  width: 380
}

// Brand palette (see .vitepress/theme CSS): near-black ground tinted toward the brand hue,
// three blurred brand-colour fields, and a light tint of the brand for the eyebrow.
const PALETTE = {
  bgTop: '#171A3A',
  bgBottom: '#0A0B14',
  accent: '#4F5BD5',
  eyebrow: '#A3ABFF',
  glows: [
    {
      color: '#4F5BD5',
      opacity: 0.5
    },
    {
      color: '#2F3799',
      opacity: 0.55
    },
    {
      color: '#7B85F0',
      opacity: 0.22
    }
  ]
}

// No `rewrites` in this repo: pages are served at their source path.
function servedPath(rel) {
  return rel
}

// =========================================================================
// Shared implementation — identical across repos; fix bugs here in all of them.
// =========================================================================

const CANVAS_W = 1200
const CANVAS_H = 630
const MARGIN_X = 88
const TEXT_MAX_W = 1000
const LOGO_X = MARGIN_X
const LOGO_Y = 76
const FONT_STACK = 'Helvetica, Arial, sans-serif'

const SRC_DIR = join(REPO_ROOT, SRC_DIR_REL)
const PUBLIC_DIR = join(REPO_ROOT, PUBLIC_DIR_REL)
const OUTPUT_DIR = join(PUBLIC_DIR, 'images', 'featured')
const HOME_PATH = join(REPO_ROOT, HOME_REL)
const EXCLUDED_DIRS = new Set(
  [PUBLIC_DIR, ...EXCLUDE_DIRS_REL.map((d) => join(REPO_ROOT, d)), join(REPO_ROOT, 'node_modules'), join(REPO_ROOT, '.vitepress'), join(REPO_ROOT, '.claude'), join(REPO_ROOT, '.github')]
)
const EXCLUDED_FILES = new Set(['README.md', 'CLAUDE.md', 'AGENTS.md', 'CONTRIBUTING.md', 'LICENSE.md', 'CHANGELOG-INTERNAL.md'])

// -------------------------------------------------------------------------
// File discovery
// -------------------------------------------------------------------------

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (EXCLUDED_DIRS.has(full) || entry.startsWith('.')) continue
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walk(full, files)
    } else if (stat.isFile() && entry.endsWith('.md') && !EXCLUDED_FILES.has(entry)) {
      files.push(full)
    }
  }
  return files
}

// -------------------------------------------------------------------------
// Titles + labels
// -------------------------------------------------------------------------

/** `courses-&-learning-(pro)` -> `Courses & Learning (Pro)`; SECTION_LABELS wins when set. */
function titleCaseSlug(slug) {
  return slug
    .split('-')
    .map((word) => word.replace(/(^|\()([a-z])/g, (_, pre, ch) => pre + ch.toUpperCase()))
    .join(' ')
}

function sectionLabel(relFromSrc) {
  const parts = relFromSrc.split('/')
  parts.pop() // the file itself
  while (parts.length && SECTION_PREFIXES.includes(parts[0])) parts.shift()
  if (!parts.length) return 'Documentation'
  return SECTION_LABELS[parts[0]] ?? titleCaseSlug(parts[0])
}

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim()
}

function unquote(text) {
  return text.trim().replace(/^(["'])(.*)\1$/, '$2')
}

/** Frontmatter `title`, else the first `# H1`, else the home hero, else the slug. */
function extractTitle(mdPath, fallbackSlug) {
  const content = readFileSync(mdPath, 'utf8')

  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (fm) {
    const title = fm[1].match(/^title:\s*(.+?)\s*$/m)
    if (title) return stripMarkdown(unquote(title[1]))
  }

  for (const line of content.split(/\r?\n/)) {
    const match = line.trim().match(/^#\s+(.+)$/)
    if (match) return stripMarkdown(match[1])
  }

  // `layout: home` pages have no H1 — fall back to the hero.
  const heroName = content.match(/^\s{2}name:\s*["']?(.+?)["']?\s*$/m)
  const heroText = content.match(/^\s{2}text:\s*["']?(.+?)["']?\s*$/m)
  if (heroName) return heroText ? `${heroName[1]} ${heroText[1]}` : heroName[1]

  return titleCaseSlug(fallbackSlug)
}

function escapeXml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function cardNameFor(servedPath) {
  return `${servedPath.replace(/\.md$/, '').replace(/\//g, '--')}.png`
}

// -------------------------------------------------------------------------
// Title layout
// -------------------------------------------------------------------------
//
// librsvg returns no text metrics, so line breaking approximates: bold Helvetica
// averages ~0.55em per character over mixed-case English. Walk the sizes from
// largest down and take the first that fits, so short titles stay big and long
// ones step down instead of running off the canvas.

const CHAR_WIDTH_RATIO = 0.55
const FONT_SIZE_TIERS = [66, 58, 50, 44, 38]
const MAX_LINES = 3

function wrapAt(title, fontSize) {
  const budget = Math.floor(TEXT_MAX_W / (fontSize * CHAR_WIDTH_RATIO))
  const lines = []
  let current = ''

  for (const word of title.split(/\s+/)) {
    const attempt = current ? `${current} ${word}` : word
    if (attempt.length <= budget || !current) {
      current = attempt
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)

  return { lines, budget }
}

function layoutTitle(title) {
  for (const fontSize of FONT_SIZE_TIERS) {
    const { lines } = wrapAt(title, fontSize)
    if (lines.length <= MAX_LINES) return { fontSize, lines }
  }

  const fontSize = FONT_SIZE_TIERS[FONT_SIZE_TIERS.length - 1]
  const { lines, budget } = wrapAt(title, fontSize)
  lines.length = MAX_LINES
  lines[MAX_LINES - 1] = `${lines[MAX_LINES - 1].slice(0, budget - 1).replace(/\s+$/, '')}…`
  return { fontSize, lines }
}

// -------------------------------------------------------------------------
// SVG template
// -------------------------------------------------------------------------

function buildSvg({ title, eyebrow }) {
  const { fontSize, lines } = layoutTitle(title)
  const lineHeight = Math.round(fontSize * 1.18)

  // Bottom-anchored above the footer, so one-, two- and three-line cards share
  // the same optical baseline. The eyebrow and the accent rule travel with it.
  const blockBottom = 468
  const firstBaseline = blockBottom - (lines.length - 1) * lineHeight
  const eyebrowBaseline = firstBaseline - fontSize - 22
  const ruleY = blockBottom + 40

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="${MARGIN_X}" y="${firstBaseline + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('')

  const [g1, g2, g3] = PALETTE.glows

  return `<svg width="${CANVAS_W}" height="${CANVAS_H}" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${PALETTE.bgTop}"/>
      <stop offset="100%" stop-color="${PALETTE.bgBottom}"/>
    </linearGradient>
    <linearGradient id="rule" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${PALETTE.accent}"/>
      <stop offset="100%" stop-color="${PALETTE.eyebrow}"/>
    </linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="90"/>
    </filter>
  </defs>
  <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="url(#bg)"/>
  <!-- Soft brand-colour fields pushed to the edges so the text column stays on the
       darkest part of the ground. -->
  <g filter="url(#blur)">
    <ellipse cx="1020" cy="110" rx="340" ry="230" fill="${g1.color}" opacity="${g1.opacity}"/>
    <ellipse cx="1180" cy="540" rx="300" ry="240" fill="${g2.color}" opacity="${g2.opacity}"/>
    <ellipse cx="120" cy="650" rx="360" ry="200" fill="${g3.color}" opacity="${g3.opacity}"/>
  </g>
  <text x="${MARGIN_X}" y="${eyebrowBaseline}" font-family="${FONT_STACK}" font-size="21" font-weight="700" letter-spacing="4" fill="${PALETTE.eyebrow}">${escapeXml(
    eyebrow.toUpperCase()
  )}</text>
  <text font-family="${FONT_STACK}" font-weight="700" font-size="${fontSize}" fill="#FFFFFF">${tspans}</text>
  <rect x="${MARGIN_X}" y="${ruleY}" width="132" height="5" rx="2.5" fill="url(#rule)"/>
  <text x="${MARGIN_X}" y="574" font-family="${FONT_STACK}" font-size="18" font-weight="400" letter-spacing="1" fill="#FFFFFF" opacity="0.55">${FOOTER_TEXT}</text>
</svg>`
}

/**
 * The logo lockup, rasterised once and reused. Handles the three shapes found across
 * the repos: a ready-made dark-mode wordmark (just resize), an SVG whose fills need
 * swapping to read on a dark ground (`recolor`), and an icon-only mark that needs the
 * product name set next to it (`wordmark`).
 */
async function loadLogo() {
  const path = join(REPO_ROOT, LOGO.path)
  if (!existsSync(path)) throw new Error(`Logo source not found at ${path}`)

  let input = path
  if (LOGO.recolor) {
    let svg = readFileSync(path, 'utf8')
    for (const [from, to] of LOGO.recolor) {
      if (!new RegExp(from, 'i').test(svg)) {
        throw new Error(`${path} no longer contains the ${from} fill this script recolours; update LOGO.recolor.`)
      }
      svg = svg.replace(new RegExp(from, 'gi'), to)
    }
    input = Buffer.from(svg)
  }

  if (!LOGO.wordmark) {
    return sharp(input).resize({ width: LOGO.width }).png().toBuffer()
  }

  // Icon + text lockup: icon at `height`, then the name in bold white beside it.
  const iconH = LOGO.wordmark.iconHeight
  const icon = await sharp(input).resize({ height: iconH }).png().toBuffer()
  const iconMeta = await sharp(icon).metadata()
  const fontSize = Math.round(iconH * 0.58)
  const gap = Math.round(iconH * 0.28)
  const textW = Math.ceil(LOGO.wordmark.text.length * fontSize * 0.6)
  const totalW = iconMeta.width + gap + textW
  const svg = `<svg width="${totalW}" height="${iconH}" xmlns="http://www.w3.org/2000/svg">
    <text x="${iconMeta.width + gap}" y="${Math.round(iconH * 0.69)}" font-family="${FONT_STACK}" font-size="${fontSize}" font-weight="700" fill="#FFFFFF">${escapeXml(LOGO.wordmark.text)}</text>
  </svg>`
  return sharp(Buffer.from(svg)).composite([{ input: icon, left: 0, top: 0 }]).png().toBuffer()
}

async function renderCard({ title, eyebrow, outPath, logo }) {
  await sharp(Buffer.from(buildSvg({ title, eyebrow })))
    .composite([{ input: logo, left: LOGO_X, top: LOGO_Y }])
    // Flat gradient + text compresses well at max effort, and this is lossless.
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(outPath)
}

// -------------------------------------------------------------------------
// Main
// -------------------------------------------------------------------------

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })

  const logo = await loadLogo()

  const jobs = [
    { outPath: join(OUTPUT_DIR, 'default.png'), title: DEFAULT_TITLE, eyebrow: 'Documentation' },
  ]

  if (existsSync(HOME_PATH)) {
    jobs.push({
      outPath: join(OUTPUT_DIR, 'index.png'),
      title: extractTitle(HOME_PATH, 'index'),
      eyebrow: 'Documentation',
    })
  }

  const seen = new Map() // card name -> source path
  const collisions = []
  const unknown = []

  for (const filePath of walk(SRC_DIR).sort()) {
    if (filePath === HOME_PATH) continue

    const relFromSrc = relative(SRC_DIR, filePath).split(sep).join('/')
    const served = servedPath(relFromSrc)
    if (!served) {
      unknown.push(relFromSrc)
      continue
    }

    const card = cardNameFor(served)
    if (seen.has(card)) {
      collisions.push(`${card}  <-  ${seen.get(card)}  and  ${relFromSrc}`)
      continue
    }
    seen.set(card, relFromSrc)

    jobs.push({
      outPath: join(OUTPUT_DIR, card),
      title: extractTitle(filePath, basename(relFromSrc, '.md')),
      eyebrow: sectionLabel(relFromSrc),
    })
  }

  if (unknown.length) {
    throw new Error(
      `${unknown.length} page(s) have no known served URL (servedPath() returned null), so their ` +
        `card name cannot be derived:\n  ${unknown.join('\n  ')}`
    )
  }
  if (collisions.length) {
    throw new Error(
      `${collisions.length} card-name collision(s) — these pages would overwrite each other's card:\n  ${collisions.join('\n  ')}`
    )
  }

  let generated = 0
  let skipped = 0
  for (const job of jobs) {
    if (existsSync(job.outPath) && !FORCE) {
      skipped++
      continue
    }
    await renderCard({ ...job, logo })
    generated++
  }

  console.log(`Featured images: generated ${generated}, skipped ${skipped}.`)

  // A renamed or deleted page leaves its card behind, and nothing else would
  // ever notice. Report them rather than deleting — the call is the author's.
  const expected = new Set(jobs.map((job) => basename(job.outPath)))
  const orphans = readdirSync(OUTPUT_DIR).filter((name) => name.endsWith('.png') && !expected.has(name))
  if (orphans.length) {
    console.log(`\n${orphans.length} card(s) no longer match a page — delete them if the page is gone:`)
    orphans.forEach((name) => console.log(`  ${PUBLIC_DIR_REL}/images/featured/${name}`))
  }
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exitCode = 1
})
