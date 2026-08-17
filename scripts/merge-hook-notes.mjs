/**
 * Merge additional HOOK_NOTES entries into data/hook-notes.mjs.
 *
 * Prose is written in batches (by subject area, often by different people), and
 * hand-splicing object literals into a 1,600-line file is how you lose an entry.
 * This does it deterministically and refuses to overwrite anything that already
 * has a summary.
 *
 *   node scripts/merge-hook-notes.mjs path/to/extra-notes.mjs [...]
 *
 * Each input file must export exactly one object literal — any of
 * `export const X = {...}`, `const X = {...}`, or a bare `{...}`.
 */

import { readFileSync, writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const target = join(repoRoot, 'data', 'hook-notes.mjs')

async function loadNotes(path) {
  const source = readFileSync(path, 'utf8')
  const open = source.indexOf('{')
  const close = source.lastIndexOf('}')
  if (open === -1 || close === -1) {
    throw new Error(`${path}: no object literal found`)
  }
  const literal = source.slice(open, close + 1)
  const module = await import(
    `data:text/javascript,export default ${encodeURIComponent(literal)}`
  )
  return module.default
}

const inputs = process.argv.slice(2)
if (!inputs.length) {
  console.error('usage: node scripts/merge-hook-notes.mjs <notes-file> [...]')
  process.exit(1)
}

const { HOOK_NOTES: existing } = await import(pathToFileURL(target).href)
const merged = { ...existing }
let added = 0
let skipped = 0

for (const input of inputs) {
  const notes = await loadNotes(resolve(input))
  for (const [name, note] of Object.entries(notes)) {
    if (merged[name] && merged[name].summary) {
      skipped++
      continue
    }
    merged[name] = note
    added++
  }
}

const header = readFileSync(target, 'utf8').split('export const HOOK_NOTES')[0]
const ordered = Object.keys(merged).sort()
const body = ordered
  .map((name) => `  ${JSON.stringify(name)}: ${JSON.stringify(merged[name], null, 2).replace(/\n/g, '\n  ')},`)
  .join('\n')

writeFileSync(target, `${header}export const HOOK_NOTES = {\n${body}\n}\n`)

console.log(`merged ${added} new notes, kept ${skipped} existing, ${ordered.length} total`)
