/// <reference types="node" />

import { defineConfig } from 'vitepress'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const generatedDir = join(projectRoot, '.generated')
const moduleOrderPath = join(generatedDir, 'restapi-module-order.json')

const MODULE_ORDER: Record<string, string[]> = existsSync(moduleOrderPath)
  ? JSON.parse(readFileSync(moduleOrderPath, 'utf8'))
  : {}

const databaseSidebar = [
  {
    text: 'Overview',
    items: [
      { text: 'Schema', link: '/database/schema' },
      { text: 'Models Overview', link: '/database/models' },
      { text: 'Query Builder', link: '/database/query-builder' },
      { text: 'Relationships', link: '/database/models/relationships' },
    ],
  },
  {
    text: 'Content Models',
    items: [
      { text: 'Feed', link: '/database/models/feed' },
      { text: 'Comment', link: '/database/models/comment' },
      { text: 'Activity', link: '/database/models/activity' },
      { text: 'Media', link: '/database/models/media' },
      { text: 'Reaction', link: '/database/models/reaction' },
    ],
  },
  {
    text: 'Community Models',
    items: [
      { text: 'Space', link: '/database/models/space' },
      { text: 'BaseSpace', link: '/database/models/base-space' },
      { text: 'SpaceGroup', link: '/database/models/space-group' },
      { text: 'SpaceUserPivot', link: '/database/models/space-user-pivot' },
      { text: 'SidebarLink', link: '/database/models/sidebar-link' },
      { text: 'Term', link: '/database/models/term' },
    ],
  },
  {
    text: 'People and Messaging',
    items: [
      { text: 'User', link: '/database/models/user' },
      { text: 'XProfile', link: '/database/models/x-profile' },
      { text: 'UserMeta', link: '/database/models/user-meta' },
      { text: 'Contact', link: '/database/models/contact' },
      { text: 'Notification', link: '/database/models/notification' },
      { text: 'NotificationSubscriber', link: '/database/models/notification-subscriber' },
      { text: 'NotificationSubscription', link: '/database/models/notification-subscription' },
    ],
  },
  {
    text: 'Framework Models',
    items: [
      { text: 'Meta', link: '/database/models/meta' },
      { text: 'Model', link: '/database/models/model' },
      { text: 'DynamicModel', link: '/database/models/dynamic-model' },
    ],
  },
]

// Which hook pages exist, and in what order, is decided by the generator — it only
// writes a page when hooks actually land on it. Reading its manifest keeps the
// sidebar from listing pages that no longer exist (or missing ones that appeared).
const hookPageOrderPath = join(generatedDir, 'hook-page-order.json')

const HOOK_PAGE_ORDER: Record<string, string[]> = existsSync(hookPageOrderPath)
  ? JSON.parse(readFileSync(hookPageOrderPath, 'utf8'))
  : { action: [], filter: [] }

const HOOK_PAGE_LABELS: Record<string, string> = {
  feeds: 'Feeds',
  comments: 'Comments',
  reactions: 'Reactions',
  spaces: 'Spaces',
  members: 'Members',
  courses: 'Courses',
  notifications: 'Notifications',
  media: 'Media',
  auth: 'Auth',
  permissions: 'Permissions',
  moderation: 'Moderation',
  integrations: 'Integrations',
  rendering: 'Rendering & Theming',
  settings: 'Settings',
  admin: 'Admin',
  miscellaneous: 'Miscellaneous',
}

function hookPagesFor(kind: 'action' | 'filter') {
  const segment = kind === 'action' ? 'actions' : 'filters'
  return (HOOK_PAGE_ORDER[kind] || []).map((page) => ({
    text: HOOK_PAGE_LABELS[page] || page,
    link: `/hooks/${segment}/${page}`,
  }))
}

const actionHookPages = hookPagesFor('action')
const filterHookPages = hookPagesFor('filter')

const helperPages = [
  { text: 'Overview', link: '/helpers/' },
  { text: 'Helper Class', link: '/helpers/helper-class' },
]

function buildHooksSidebar() {
  return [
    {
      text: 'Actions',
      collapsed: true,
      items: [{ text: 'Overview', link: '/hooks/actions/' }, ...actionHookPages],
    },
    {
      text: 'Filters',
      collapsed: true,
      items: [{ text: 'Overview', link: '/hooks/filters/' }, ...filterHookPages],
    },
    {
      text: 'Helpers',
      collapsed: true,
      items: helperPages,
    },
  ]
}

const guidePages = [
  { text: 'Guides Overview', link: '/guides/' },
  { text: 'Code Snippets', link: '/guides/code-snippets' },
  { text: 'Menu Customization', link: '/guides/menu-customization' },
  { text: 'Theme Compatibility', link: '/guides/theme-compatibility' },
  { text: 'Meta Settings API', link: '/guides/meta-settings-api' },
  { text: 'Incoming Webhooks (Pro)', link: '/guides/incoming-webhooks' },
  { text: 'Cloud Storage (Pro)', link: '/guides/cloud-storage/' },
  { text: 'Cloudflare R2 (Pro)', link: '/guides/cloud-storage/cloudflare-r2' },
  { text: 'Amazon S3 (Pro)', link: '/guides/cloud-storage/amazon-s3' },
  { text: 'BunnyCDN (Pro)', link: '/guides/cloud-storage/bunnycdn' },
]

const deploymentPages = [
  { text: 'Deployment Overview', link: '/deployment/' },
  { text: 'Server Requirements', link: '/deployment/server-requirements' },
  { text: 'Performance Optimization', link: '/deployment/performance-optimization' },
  { text: 'Benchmarks', link: '/deployment/benchmarks' },
]

function getOperationSidebarItems(moduleDir: string) {
  const opsDir = join(projectRoot, 'docs', 'restapi', 'operations', moduleDir)
  if (!existsSync(opsDir)) {
    return []
  }

  const files = readdirSync(opsDir).filter((file) => file.endsWith('.md'))
  const order = MODULE_ORDER[moduleDir] || []

  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const content = readFileSync(join(opsDir, file), 'utf8')
    const titleMatch = content.match(/^title:\s*(.+)$/m)
    const title = titleMatch
      ? titleMatch[1].replace(/['"]/g, '').trim()
      : slug.replace(/-/g, ' ')

    return {
      text: title,
      link: `/restapi/operations/${moduleDir}/${slug}`,
      _slug: slug,
    }
  })

  items.sort((a, b) => {
    const indexA = order.indexOf(a._slug)
    const indexB = order.indexOf(b._slug)
    const weightA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA
    const weightB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB

    if (weightA !== weightB) {
      return weightA - weightB
    }

    return a.text.localeCompare(b.text)
  })

  return items.map(({ _slug, ...item }) => item)
}

function buildRestApiSidebar() {
  const sections = [
    {
      group: 'Core Resources',
      items: [
        { text: 'Feeds', link: '/restapi/feeds', dir: 'feeds' },
        { text: 'Spaces', link: '/restapi/spaces', dir: 'spaces' },
        { text: 'Members', link: '/restapi/members', dir: 'members' },
        { text: 'Comments', link: '/restapi/comments', dir: 'comments' },
        { text: 'Documents (Pro)', link: '/restapi/documents', dir: 'documents' },
      ],
    },
    {
      group: 'Engagement',
      items: [
        { text: 'Reactions', link: '/restapi/reactions', dir: 'reactions' },
        { text: 'Notifications', link: '/restapi/notifications', dir: 'notifications' },
        { text: 'Activity', link: '/restapi/activity', dir: 'activity' },
        { text: 'Leaderboard (Pro)', link: '/restapi/leaderboard', dir: 'leaderboard' },
      ],
    },
    {
      group: 'Administration',
      items: [
        { text: 'Settings', link: '/restapi/settings', dir: 'settings' },
        { text: 'Admin', link: '/restapi/admin', dir: 'admin' },
        { text: 'Options', link: '/restapi/options', dir: 'options' },
        { text: 'Reports (Pro)', link: '/restapi/reports', dir: 'reports' },
        { text: 'Profile', link: '/restapi/profile', dir: 'profile' },
        { text: 'Media', link: '/restapi/media', dir: 'media' },
      ],
    },
    {
      group: 'Learning',
      items: [{ text: 'Courses', link: '/restapi/courses', dir: 'courses' }],
    },
    {
      group: 'Operations',
      items: [
        { text: 'Migrations', link: '/restapi/migrations', dir: 'migrations' },
        { text: 'Invitations', link: '/restapi/invitations', dir: 'invitations' },
      ],
    },
    {
      group: 'Extensions',
      items: [
        { text: 'Cart', link: '/restapi/cart', dir: 'cart' },
        { text: 'Giphy (Pro)', link: '/restapi/giphy', dir: 'giphy' },
      ],
    },
  ]

  const sidebar: Array<Record<string, unknown>> = [
    {
      text: 'Getting Started',
      items: [{ text: 'API Overview', link: '/restapi/' }],
    },
  ]

  for (const section of sections) {
    sidebar.push({
      text: section.group,
      collapsed: false,
      items: section.items.map((module) => {
        const operations = getOperationSidebarItems(module.dir)

        if (!operations.length) {
          return {
            text: module.text,
            link: module.link,
          }
        }

        return {
          text: module.text,
          link: module.link,
          collapsed: true,
          items: operations,
        }
      }),
    })
  }

  return sidebar
}

// Canonical origin for this site — reused by the canonical links and the absolute
// og:/twitter: URLs below. Changing the host should only ever mean editing this line.
const SITE_URL = 'https://dev.fluentcommunity.co'

/**
 * Per-page link-preview cards.
 *
 * `scripts/generate-featured-images.mjs` renders a branded 1200x630 PNG carrying each
 * page's own title into `public/images/featured/`, served at `/images/featured/`.
 *
 * NAMING RULE — kept in sync with that script's cardNameFor(): the card is the page's
 * served path (i.e. `pageData.relativePath`, which VitePress has already passed through
 * any `rewrites`) minus `.md`, with every `/` replaced by `--`, plus `.png`. The home
 * page's `index.md` uses `index.png`.
 *
 * Anything without a generated card falls back to `default.png`, which the generator
 * also emits — so a shared link is never left with no preview at all. The URL must be
 * absolute: relative paths are ignored by Slack/X/LinkedIn/Facebook scrapers.
 */
const FEATURED_DIR = join(projectRoot, 'public', 'images', 'featured')

function featuredImageFor(relativePath: string): string {
  const name = `${relativePath.replace(/\.md$/, '').replace(/\//g, '--')}.png`
  const file = existsSync(join(FEATURED_DIR, name)) ? name : 'default.png'
  return `${SITE_URL}/images/featured/${encodeURIComponent(file)}`
}

export default defineConfig({
  srcDir: 'docs',
  title: 'FluentCommunity Developer Docs',
  description: 'Production-grade developer documentation for FluentCommunity.',
  ignoreDeadLinks: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/fluent-community-icon.png' }],
    ['meta', { name: 'theme-color', content: '#4F5BD5' }],
    [
      'script',
      {
        type: 'module',
        src: 'https://cdn.jsdelivr.net/gh/fluent-docai/chat-widget@latest/chat-widget.js',
      },
    ],
    [
      'script',
      { type: 'module' },
      'FluentBotChatWidget.injectWidget("dbe13b70-6e14-432a-9eda-be1f7d1d9478");',
    ],

    // Open Graph / Twitter values that never vary per page. Every generated card is
    // 1200x630, so the dimensions live here; the image URL itself is per page and
    // is set in transformPageData() below.
    ['meta', { property: 'og:site_name', content: 'FluentCommunity Developer Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  vite: {
    publicDir: join(projectRoot, 'public'),
    assetsInclude: ['**/*.json'],
    plugins: [
      {
        name: 'fluentcommunity-openapi-assets',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (!req.url?.startsWith('/openapi/public/')) {
              next()
              return
            }

            const requestPath = req.url.replace('/openapi/public/', '')
            const fullPath = join(projectRoot, 'public', 'openapi', requestPath)

            if (!existsSync(fullPath)) {
              next()
              return
            }

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(readFileSync(fullPath, 'utf8'))
          })
        },
        closeBundle() {
          const sourceDir = join(projectRoot, 'public', 'openapi')
          const targetDir = join(__dirname, 'dist', 'openapi', 'public')

          if (!existsSync(sourceDir)) {
            return
          }

          const jsonFiles: string[] = []

          const copyRecursive = (source: string, target: string) => {
            const stats = statSync(source)

            if (stats.isDirectory()) {
              mkdirSync(target, { recursive: true })
              for (const entry of readdirSync(source)) {
                if (entry === 'README.md') {
                  continue
                }
                copyRecursive(join(source, entry), join(target, entry))
              }
              return
            }

            if (!source.endsWith('.json')) {
              return
            }

            mkdirSync(dirname(target), { recursive: true })
            copyFileSync(source, target)
            jsonFiles.push(`/openapi/public/${relative(sourceDir, source).replace(/\\/g, '/')}`)
          }

          copyRecursive(sourceDir, targetDir)

          writeFileSync(
            join(targetDir, 'manifest.json'),
            JSON.stringify(
              {
                files: jsonFiles,
                generated: new Date().toISOString(),
              },
              null,
              2,
            ),
          )
        },
      },
    ],
  },
  markdown: {
    config(md) {
      const originalFence = md.renderer.rules.fence

      if (!originalFence) {
        return
      }

      md.renderer.rules.fence = (tokens, index, options, env, renderer) => {
        const token = tokens[index]
        const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
        const language = info ? info.split(/\s+/g)[0] : ''

        if (language === 'mermaid') {
          return `<Mermaid content="${md.utils.escapeHtml(token.content)}" />`
        }

        return originalFence(tokens, index, options, env, renderer)
      }
    },
  },
  // Per-page SEO tags: canonical URL plus the Open Graph / Twitter values that differ
  // per page, including the page's own featured image (see featuredImageFor above).
  transformPageData(pageData, { siteConfig }) {
    // `relativePath` is the path AFTER `rewrites`, so it matches the public URL.
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = path ? `${SITE_URL}/${path}` : `${SITE_URL}/`
    const title = pageData.frontmatter.title || pageData.title || siteConfig.site.title
    const description =
      pageData.frontmatter.description || pageData.description || siteConfig.site.description
    const image = featuredImageFor(pageData.relativePath)

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'og:image:alt', content: title }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }]
    )
  },
  themeConfig: {
    logo: '/images/fluent-community-icon.png',
    siteTitle: 'FluentCommunity',
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Database',
        items: [
          { text: 'Schema', link: '/database/schema' },
          { text: 'Models', link: '/database/models' },
          { text: 'Query Builder', link: '/database/query-builder' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          { text: 'Action Hooks', link: '/hooks/actions/' },
          { text: 'Filter Hooks', link: '/hooks/filters/' },
          { text: 'Helpers', link: '/helpers/' },
        ],
      },
      { text: 'REST API', link: '/restapi/' },
      {
        text: 'Guides',
        items: guidePages.filter((page) => !page.text.includes('Overview')),
      },
      {
        text: 'Deployment',
        items: deploymentPages.filter((page) => !page.text.includes('Overview')),
      },
    ],
    sidebar: {
      '/database/': [
        {
          text: 'Database',
          items: databaseSidebar,
        },
      ],
      '/hooks/': buildHooksSidebar(),
      '/helpers/': buildHooksSidebar(),
      '/restapi/': buildRestApiSidebar(),
      '/guides/': [
        {
          text: 'Guides',
          items: guidePages,
        },
      ],
      '/deployment/': [
        {
          text: 'Deployment',
          items: deploymentPages,
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/WPManageNinja/fluent-community-developer-docs' },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    editLink: {
      pattern:
        'https://github.com/WPManageNinja/fluent-community-developer-docs/edit/master/:path',
    },
    footer: {
      message: 'FluentCommunity developer documentation',
      copyright: 'Copyright © 2026 WPManageNinja',
    },
  },
})
