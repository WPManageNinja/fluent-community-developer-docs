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

const actionHookPages = [
  { text: 'Feeds', link: '/hooks/actions/feeds' },
  { text: 'Spaces', link: '/hooks/actions/spaces' },
  { text: 'Members', link: '/hooks/actions/members' },
  { text: 'Comments', link: '/hooks/actions/comments' },
  { text: 'Notifications', link: '/hooks/actions/notifications' },
  { text: 'Reactions', link: '/hooks/actions/reactions' },
  { text: 'Auth', link: '/hooks/actions/auth' },
  { text: 'Admin', link: '/hooks/actions/admin' },
  { text: 'Media', link: '/hooks/actions/media' },
  { text: 'Courses', link: '/hooks/actions/courses' },
  { text: 'Miscellaneous', link: '/hooks/actions/miscellaneous' },
]

const filterHookPages = [
  { text: 'Feeds', link: '/hooks/filters/feeds' },
  { text: 'Spaces', link: '/hooks/filters/spaces' },
  { text: 'Members', link: '/hooks/filters/members' },
  { text: 'Notifications', link: '/hooks/filters/notifications' },
  { text: 'Settings', link: '/hooks/filters/settings' },
  { text: 'Permissions', link: '/hooks/filters/permissions' },
  { text: 'Auth', link: '/hooks/filters/auth' },
  { text: 'Media', link: '/hooks/filters/media' },
  { text: 'Courses', link: '/hooks/filters/courses' },
  { text: 'Miscellaneous', link: '/hooks/filters/miscellaneous' },
]

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

export default defineConfig({
  srcDir: 'docs',
  title: 'FluentCommunity Developer Docs',
  description: 'Production-grade developer documentation for FluentCommunity.',
  ignoreDeadLinks: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/fluent-community-icon.png' }],
    ['meta', { name: 'theme-color', content: '#4F5BD5' }],
    ['meta', { property: 'og:title', content: 'FluentCommunity Developer Docs' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Database, hooks, and REST API references for FluentCommunity.',
      },
    ],
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
