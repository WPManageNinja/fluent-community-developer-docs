import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'fs'
import { basename, dirname, join, relative, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = resolve(__dirname, '..')
const pluginRoot = resolve(repoRoot, '..')
const pluginsRoot = resolve(pluginRoot, '..')
const proPluginRoot = resolve(pluginsRoot, 'fluent-community-pro')
const docsRoot = join(repoRoot, 'docs')
const openapiRoot = join(repoRoot, 'public', 'openapi')
const generatedRoot = join(repoRoot, '.generated')

const SOURCE_CONFIGS = [
  {
    id: 'core',
    label: 'Core',
    root: pluginRoot,
  },
  ...(existsSync(proPluginRoot)
    ? [
        {
          id: 'pro',
          label: 'Pro',
          root: proPluginRoot,
        },
      ]
    : []),
]

const MODEL_ORDER = [
  'Activity',
  'BaseSpace',
  'Comment',
  'Contact',
  'DynamicModel',
  'Feed',
  'Media',
  'Meta',
  'Model',
  'Notification',
  'NotificationSubscriber',
  'NotificationSubscription',
  'Reaction',
  'SidebarLink',
  'Space',
  'SpaceGroup',
  'SpaceUserPivot',
  'Term',
  'User',
  'UserMeta',
  'XProfile',
]

const MODEL_SLUGS = {
  Activity: 'activity',
  BaseSpace: 'base-space',
  Comment: 'comment',
  Contact: 'contact',
  DynamicModel: 'dynamic-model',
  Feed: 'feed',
  Media: 'media',
  Meta: 'meta',
  Model: 'model',
  Notification: 'notification',
  NotificationSubscriber: 'notification-subscriber',
  NotificationSubscription: 'notification-subscription',
  Reaction: 'reaction',
  SidebarLink: 'sidebar-link',
  Space: 'space',
  SpaceGroup: 'space-group',
  SpaceUserPivot: 'space-user-pivot',
  Term: 'term',
  User: 'user',
  UserMeta: 'user-meta',
  XProfile: 'x-profile',
}

const MODEL_SUMMARIES = {
  Activity:
    'Tracks member-facing activity stream entries such as feed publications and comments.',
  BaseSpace:
    'Provides the shared ORM behavior for spaces, courses, space groups, and sidebar links.',
  Comment:
    'Stores feed comments, threaded replies, and their moderation-aware relationships.',
  Contact:
    'Bridges FluentCommunity users to FluentCRM contact records when FluentCRM is installed.',
  DynamicModel:
    'Creates runtime table bindings when FluentCommunity needs an ORM model for a dynamic table.',
  Feed:
    'Represents community posts, announcements, scheduled posts, and other feed content.',
  Media:
    'Stores uploaded media metadata and delivery information for feeds, comments, and spaces.',
  Meta:
    'Backs the shared meta table used across spaces, terms, users, and other object types.',
  Model:
    'Defines the shared base ORM behavior inherited by FluentCommunity models built on WPFluent.',
  Notification:
    'Stores notification payloads before they are fanned out to per-user delivery rows.',
  NotificationSubscriber:
    'Represents rows in `fcom_notification_users` where `object_type = notification`.',
  NotificationSubscription:
    'Represents rows in `fcom_notification_users` where `object_type = subscription`.',
  Reaction:
    'Stores likes and survey votes for feeds, comments, and course content.',
  SidebarLink:
    'Uses the shared spaces table to store custom sidebar navigation links.',
  Space:
    'Represents a community space with privacy, membership, topic, and layout settings.',
  SpaceGroup:
    'Represents hierarchical group containers for organizing spaces on the portal.',
  SpaceUserPivot:
    'Stores the membership, role, and membership metadata for users inside spaces.',
  Term:
    'Stores taxonomy-like topics, categories, and term metadata used by feeds and courses.',
  User:
    'Wraps the WordPress `users` table with community-specific relationships and helpers.',
  UserMeta:
    'Wraps the WordPress `usermeta` table for community-focused metadata access.',
  XProfile:
    'Stores public-facing profile fields, status, verification, and community profile metadata.',
}

const KEY_METHOD_SUMMARIES = {
  Activity: {
    getFormattedMessage:
      'Builds the HTML activity sentence shown in the activity feed for supported activity types.',
  },
  BaseSpace: {
    updateCustomData:
      'Sanitizes and persists mutable space fields such as title, description, media, and settings.',
    getMembership:
      'Returns the current user membership record for the space, including the pivot metadata.',
    isAdmin:
      'Checks whether a user is an admin or, optionally, a moderator for the current space.',
    formatSpaceData:
      'Normalizes related data before a space object is returned from controllers.',
  },
  Comment: {
    getCommentParentUserIds:
      'Collects the users that participated in a thread for mention and notification workflows.',
    getHumanExcerpt: 'Returns a short, human-readable excerpt of the comment body.',
  },
  Feed: {
    getHumanExcerpt: 'Returns a short excerpt used in notifications and activity messages.',
    hasEditAccess: 'Checks whether the current user can edit the feed item.',
    updateCustomMeta: 'Persists a single custom meta value on the feed record.',
    getCustomMeta: 'Reads a single custom meta value from the serialized feed meta payload.',
  },
  Media: {
    getPublicUrlAttribute: 'Resolves the public URL through the active media driver filter.',
    getSignedPublicUrl:
      'Builds a temporary signed URL through the active driver when private media is enabled.',
    deleteFile: 'Deletes the stored asset from the backing filesystem driver.',
  },
  Notification: {
    getRouteAttribute:
      'Returns the resolved notification route that the portal uses for navigation.',
  },
  Space: {
    defaultSettings:
      'Returns the default settings payload merged into every serialized space settings record.',
  },
  SpaceGroup: {
    updateCustomData:
      'Sanitizes and updates the editable attributes for a space group record.',
  },
  Term: {
    posts: 'Returns the many-to-many relation between terms and feed posts.',
  },
  User: {
    getGeneralData:
      'Builds a normalized profile payload used by controllers and portal views.',
    cacheAccessSpaces:
      'Caches the set of spaces the user can access to reduce repeated permission lookups.',
  },
  XProfile: {
    hasCustomAvatar: 'Returns whether the profile has an explicitly assigned avatar URL.',
    getPermalink: 'Builds the canonical portal profile URL for the user.',
  },
}

const MODULE_META = {
  feeds: {
    title: 'Feeds API',
    description:
      'Feed creation, retrieval, discovery, ticker updates, bookmarks, and markdown preview.',
    auth:
      'These routes are registered with `PortalPolicy`. Browser clients typically use WordPress cookie auth and a nonce, while server-to-server integrations can use Application Passwords.',
  },
  spaces: {
    title: 'Spaces API',
    description:
      'Space discovery, lifecycle management, joins/leaves, lock screen configuration, and group organization.',
    auth:
      'Most space routes are protected by `SpacePolicy`, which combines portal access with space-specific permissions.',
  },
  members: {
    title: 'Members API',
    description:
      'Global member listing plus space-scoped membership management endpoints.',
    auth:
      'Member routes require an authenticated portal user and, for write actions, the relevant space or moderation capability.',
  },
  comments: {
    title: 'Comments API',
    description:
      'Feed comment listing, creation, updates, deletes, and single comment retrieval.',
    auth:
      'Comment routes are protected by `PortalPolicy` and then validated against feed and space permissions inside the controller.',
  },
  reactions: {
    title: 'Reactions API',
    description:
      'Feed/comment reactions plus survey vote and survey voter endpoints.',
    auth:
      'Reaction routes use `PortalPolicy` and enforce feed or comment access checks inside the relevant controller.',
  },
  notifications: {
    title: 'Notifications API',
    description:
      'Read, unread, mark-as-read, and mark-all-read notification workflows.',
    auth:
      'Notification routes require an authenticated portal user.',
  },
  activity: {
    title: 'Activity API',
    description: 'Activity feed retrieval, including support for pinned and trending content.',
    auth:
      'Activity routes are portal routes and inherit portal access checks through `PortalPolicy`.',
  },
  profile: {
    title: 'Profile API',
    description:
      'Public profile retrieval plus profile edits, memberships, comments, spaces, and notification preferences.',
    auth:
      'Profile routes are portal routes. Mutating routes enforce ownership or moderation rules inside the controller.',
  },
  media: {
    title: 'Media API',
    description:
      'Feed media uploads, media preview cleanup, and Fluent Player video upload/content endpoints.',
    auth:
      'Media routes are split across `PortalPolicy` and the Fluent Player integration routes.',
  },
  settings: {
    title: 'Settings API',
    description:
      'Feature flags, menu configuration, customization settings, privacy settings, and Fluent Player settings.',
    auth:
      'Settings routes are guarded by `AdminPolicy` and intended for administrators or site managers.',
  },
  admin: {
    title: 'Admin API',
    description:
      'General admin settings, email/storage configuration, onboarding, profile links, and course discovery.',
    auth:
      'All admin endpoints are protected by `AdminPolicy`.',
  },
  options: {
    title: 'Options API',
    description:
      'Portal bootstrap variables, server-rendered sidebar HTML, and menu item payloads.',
    auth:
      'Options routes are portal routes and are primarily used by the Vue portal shell.',
  },
  courses: {
    title: 'Courses API',
    description:
      'Portal course consumption endpoints and the full course administration surface.',
    auth:
      'Course routes are split between `PortalPolicy` and `CourseAdminPolicy` depending on whether the endpoint is a learner or admin flow.',
  },
  migrations: {
    title: 'Migrations API',
    description:
      'BuddyBoss and BuddyPress migration discovery, execution, and status polling.',
    auth:
      'Migration routes are registered under `AdminPolicy` and should be treated as administrator-only operations.',
  },
  invitations: {
    title: 'Invitations API',
    description:
      'Invitation listing, creation, resend, delete, and link-generation endpoints.',
    auth:
      'Invitation routes are protected by the dedicated invitation policy and intended for community management flows.',
  },
  cart: {
    title: 'Cart Integration API',
    description:
      'FluentCart-backed paywall search, creation, retrieval, and removal for spaces.',
    auth:
      'Cart routes use `SpacePolicy` and assume the FluentCart integration module is active.',
  },
  reports: {
    title: 'Reports API',
    description:
      'Analytics, moderation reporting, and Pro reporting endpoints for administrators.',
    auth:
      'Reports routes are primarily administrator-only and are protected by `AdminPolicy` or moderation-specific policies.',
  },
  documents: {
    title: 'Documents API',
    description:
      'Document library upload, listing, update, delete, and download-related portal endpoints.',
    auth:
      'Document routes are portal routes and rely on `PortalPolicy` plus per-document access checks in the Pro module.',
  },
  giphy: {
    title: 'Giphy API',
    description:
      'Giphy search and media discovery endpoints exposed by the Pro media integration.',
    auth:
      'Giphy routes are portal routes and require an authenticated community user.',
  },
  leaderboard: {
    title: 'Leaderboard API',
    description:
      'Public leaderboard retrieval plus administrator level configuration endpoints.',
    auth:
      'Leaderboard routes are split between `PortalPolicy` for public reads and `AdminPolicy` for configuration.',
  },
}

const EXTERNAL_TABLE_NOTES = {
  users: 'WordPress core table. FluentCommunity reads from it but does not create or migrate it.',
  usermeta:
    'WordPress core table. FluentCommunity exposes it through `UserMeta`, but schema ownership stays with WordPress.',
  fc_subscribers:
    'FluentCRM table. It is referenced by FluentCommunity when FluentCRM is installed.',
}

const XPROFILE_PUBLIC_FIELDS = [
  'user_id',
  'display_name',
  'username',
  'avatar',
  'status',
  'total_points',
  'is_verified',
  'meta',
  'created_at',
  'short_description',
  'last_activity',
]

const HOOK_PAGES = {
  action: [
    'feeds',
    'spaces',
    'members',
    'comments',
    'notifications',
    'reactions',
    'auth',
    'admin',
    'media',
    'courses',
    'miscellaneous',
  ],
  filter: [
    'feeds',
    'spaces',
    'members',
    'notifications',
    'settings',
    'permissions',
    'auth',
    'media',
    'courses',
    'miscellaneous',
  ],
}

const DYNAMIC_OBJECT_SCHEMA = Symbol('dynamicObjectSchema')

function ensureDir(path) {
  mkdirSync(path, { recursive: true })
}

function writeFile(path, content) {
  ensureDir(dirname(path))
  writeFileSync(path, content.replace(/\n{3,}/g, '\n\n'))
}

function read(path) {
  return readFileSync(path, 'utf8')
}

function cleanGeneratedOutput() {
  for (const dir of [
    join(docsRoot, 'database'),
    join(docsRoot, 'hooks'),
    join(docsRoot, 'restapi'),
    join(docsRoot, 'modules'),
    generatedRoot,
  ]) {
    rmSync(dir, { recursive: true, force: true })
  }

  for (const module of Object.keys(MODULE_META)) {
    rmSync(join(openapiRoot, module), { recursive: true, force: true })
  }
}

function toPosix(path) {
  return path.replace(/\\/g, '/')
}

function getSourceConfigById(sourceId) {
  return SOURCE_CONFIGS.find((source) => source.id === sourceId) || SOURCE_CONFIGS[0]
}

function inferSourceConfig(filePath) {
  return (
    SOURCE_CONFIGS.find((source) => filePath === source.root || filePath.startsWith(`${source.root}/`)) ||
    SOURCE_CONFIGS[0]
  )
}

function displaySourcePath(filePath) {
  return toPosix(relative(pluginsRoot, filePath))
}

function renderProBadge() {
  return '<span class="pro-badge">PRO</span>'
}

function renderSourceLabel(sourceIds) {
  const normalized = [...new Set(sourceIds)].sort()
  if (!normalized.length) {
    return '—'
  }
  const hasCore = normalized.includes('core')
  const hasPro = normalized.includes('pro')

  if (hasCore && hasPro) {
    return `Core + ${renderProBadge()}`
  }

  if (hasPro) {
    return renderProBadge()
  }

  return 'Core'
}

function isProOnly(sourceIds) {
  const normalized = [...new Set(sourceIds)]
  return normalized.length === 1 && normalized[0] === 'pro'
}

function humanizeSlug(value) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\bapi\b/gi, 'API')
    .replace(/\boembed\b/gi, 'OEmbed')
    .replace(/\bcrm\b/gi, 'CRM')
    .replace(/\bwp\b/gi, 'WP')
    .replace(/\bid\b/gi, 'ID')
    .replace(/\bog\b/gi, 'OG')
    .replace(/\burl\b/gi, 'URL')
    .replace(/\bhtml\b/gi, 'HTML')
    .replace(/\bjson\b/gi, 'JSON')
    .replace(/\bui\b/gi, 'UI')
    .replace(/\bby slug\b/gi, 'By Slug')
    .replace(/\bby id\b/gi, 'By ID')
    .replace(/\bapi\b/gi, 'API')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase())
}

function kebabToCamel(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

function camelToWords(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim()
}

function singularize(word) {
  if (word.endsWith('ies')) {
    return `${word.slice(0, -3)}y`
  }

  if (word.endsWith('s') && !word.endsWith('ss')) {
    return word.slice(0, -1)
  }

  return word
}

function slugifyClass(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

function getLineNumber(content, index) {
  return content.slice(0, index).split('\n').length
}

function stripQuotes(value) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith('`') && trimmed.endsWith('`'))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function stripPhpComments(value) {
  return value
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/#.*$/gm, '')
}

function scanBalanced(text, startIndex, openChar, closeChar) {
  let depth = 0
  let inSingle = false
  let inDouble = false
  let inTemplate = false
  let inLineComment = false
  let inBlockComment = false

  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false
      }
      continue
    }

    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false
        index += 1
      }
      continue
    }

    if (inSingle) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === "'") {
        inSingle = false
      }
      continue
    }

    if (inDouble) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '"') {
        inDouble = false
      }
      continue
    }

    if (inTemplate) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '`') {
        inTemplate = false
      }
      continue
    }

    if (char === '/' && next === '/') {
      inLineComment = true
      index += 1
      continue
    }

    if (char === '/' && next === '*') {
      inBlockComment = true
      index += 1
      continue
    }

    if (char === "'") {
      inSingle = true
      continue
    }

    if (char === '"') {
      inDouble = true
      continue
    }

    if (char === '`') {
      inTemplate = true
      continue
    }

    if (char === openChar) {
      depth += 1
      continue
    }

    if (char === closeChar) {
      depth -= 1
      if (depth === 0) {
        return index
      }
    }
  }

  return -1
}

function splitTopLevel(value, delimiter = ',') {
  const parts = []
  let current = ''
  let round = 0
  let square = 0
  let curly = 0
  let inSingle = false
  let inDouble = false
  let inTemplate = false

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]
    const next = value[index + 1]

    if (inSingle) {
      current += char
      if (char === '\\') {
        current += next || ''
        index += 1
        continue
      }
      if (char === "'") {
        inSingle = false
      }
      continue
    }

    if (inDouble) {
      current += char
      if (char === '\\') {
        current += next || ''
        index += 1
        continue
      }
      if (char === '"') {
        inDouble = false
      }
      continue
    }

    if (inTemplate) {
      current += char
      if (char === '\\') {
        current += next || ''
        index += 1
        continue
      }
      if (char === '`') {
        inTemplate = false
      }
      continue
    }

    if (char === "'") {
      inSingle = true
      current += char
      continue
    }

    if (char === '"') {
      inDouble = true
      current += char
      continue
    }

    if (char === '`') {
      inTemplate = true
      current += char
      continue
    }

    if (char === '(') round += 1
    if (char === ')') round -= 1
    if (char === '[') square += 1
    if (char === ']') square -= 1
    if (char === '{') curly += 1
    if (char === '}') curly -= 1

    if (char === delimiter && round === 0 && square === 0 && curly === 0) {
      if (current.trim()) {
        parts.push(current.trim())
      }
      current = ''
      continue
    }

    current += char
  }

  if (current.trim()) {
    parts.push(current.trim())
  }

  return parts
}

function splitTopLevelKeyValue(value) {
  let round = 0
  let square = 0
  let curly = 0
  let inSingle = false
  let inDouble = false

  for (let index = 0; index < value.length - 1; index += 1) {
    const char = value[index]
    const next = value[index + 1]

    if (inSingle) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === "'") {
        inSingle = false
      }
      continue
    }

    if (inDouble) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '"') {
        inDouble = false
      }
      continue
    }

    if (char === "'") {
      inSingle = true
      continue
    }

    if (char === '"') {
      inDouble = true
      continue
    }

    if (char === '(') round += 1
    if (char === ')') round -= 1
    if (char === '[') square += 1
    if (char === ']') square -= 1
    if (char === '{') curly += 1
    if (char === '}') curly -= 1

    if (char === '=' && next === '>' && round === 0 && square === 0 && curly === 0) {
      return [value.slice(0, index).trim(), value.slice(index + 2).trim()]
    }
  }

  return null
}

function parsePhpArrayLiteral(arrayLiteral) {
  const body = stripPhpComments(arrayLiteral.trim()).replace(/^\[/, '').replace(/\]$/, '')
  const entries = splitTopLevel(body)

  return entries.map((entry) => {
    const pair = splitTopLevelKeyValue(entry)
    if (!pair) {
      return { value: stripQuotes(entry) }
    }
    return {
      key: stripQuotes(pair[0]),
      value: pair[1].trim(),
    }
  })
}

function extractNamedArray(content, propertyName) {
  const regex = new RegExp(`\\$${propertyName}\\s*=\\s*\\[`, 'm')
  const match = regex.exec(content)
  if (!match) {
    return null
  }

  const start = content.indexOf('[', match.index)
  const end = scanBalanced(content, start, '[', ']')
  if (end === -1) {
    return null
  }

  return parsePhpArrayLiteral(content.slice(start, end + 1))
}

function extractScalarAssignment(content, propertyName) {
  const regex = new RegExp(
    `(?:public|protected|private)\\s+(?:static\\s+)?\\$${propertyName}\\s*=\\s*([^;]+);`,
    'm',
  )
  const match = regex.exec(content)
  return match ? stripQuotes(match[1]) : null
}

function extractClassName(content) {
  const classMatch = content.match(/class\s+([A-Za-z0-9_]+)(?:\s+extends\s+([A-Za-z0-9_\\]+))?/)
  if (!classMatch) {
    return null
  }

  return {
    name: classMatch[1],
    parent: classMatch[2] || null,
  }
}

function extractNamespace(content) {
  const match = content.match(/namespace\s+([^;]+);/)
  return match ? match[1].trim() : null
}

function extractMethods(content) {
  const methods = []
  const methodRegex =
    /(public|protected|private)\s+(static\s+)?function\s+([A-Za-z0-9_]+)\s*\(([\s\S]*?)\)\s*\{/g

  let match
  while ((match = methodRegex.exec(content))) {
    const braceIndex = content.indexOf('{', match.index)
    const endIndex = scanBalanced(content, braceIndex, '{', '}')
    if (endIndex === -1) {
      continue
    }

    methods.push({
      visibility: match[1],
      isStatic: Boolean(match[2]),
      name: match[3],
      params: normalizeWhitespace(match[4]),
      body: content.slice(braceIndex + 1, endIndex),
      start: match.index,
      line: getLineNumber(content, match.index),
    })

    methodRegex.lastIndex = endIndex + 1
  }

  return methods
}

function listFiles(dir, filter) {
  const items = []

  if (!existsSync(dir)) {
    return items
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      items.push(...listFiles(fullPath, filter))
    } else if (!filter || filter(fullPath)) {
      items.push(fullPath)
    }
  }

  return items
}

function collectFilesFromSources(pathParts, filter) {
  return SOURCE_CONFIGS.flatMap((source) =>
    listFiles(join(source.root, ...pathParts), (file) => !filter || filter(file, source)),
  )
}

function buildClassIndex() {
  const files = [
    ...collectFilesFromSources(['app'], (file) => file.endsWith('.php')),
    ...collectFilesFromSources(['Modules'], (file) => file.endsWith('.php')),
  ]

  const index = new Map()

  for (const file of files) {
    const content = read(file)
    const namespace = extractNamespace(content)
    const classInfo = extractClassName(content)

    if (!namespace || !classInfo) {
      continue
    }

    const fqcn = `${namespace}\\${classInfo.name}`
    const entry = {
      fqcn,
      file,
      relativeFile: displaySourcePath(file),
      content,
      namespace,
      sourceId: inferSourceConfig(file).id,
    }
    index.set(classInfo.name, entry)
    index.set(fqcn, entry)
  }

  return index
}

function parseTableSchemas() {
  const tableSchemas = {}
  const migrationFiles = listFiles(join(pluginRoot, 'database', 'Migrations'), (file) =>
    file.endsWith('.php'),
  )

  for (const file of migrationFiles) {
    const content = read(file)
    const tableMatch = content.match(/\$table\s*=\s*\$wpdb->prefix\s*\.\s*'([^']+)'/)
    const createMatch = content.match(/CREATE TABLE \$table \(([\s\S]*?)\)\s+\$charsetCollate;/)
    if (!tableMatch || !createMatch) {
      continue
    }

    const table = tableMatch[1]
    const columns = []
    const lines = createMatch[1]
      .split('\n')
      .map((line) => line.trim().replace(/,$/, ''))
      .filter(Boolean)

    for (const line of lines) {
      if (!line.startsWith('`')) {
        continue
      }

      const columnMatch = line.match(/^`([^`]+)`\s+(.+)$/)
      if (!columnMatch) {
        continue
      }

      const definition = columnMatch[2]
      const defaultMatch = definition.match(/DEFAULT\s+([^ ]+(?:\s[^ ]+)*)/i)
      columns.push({
        name: columnMatch[1],
        type: definition
          .replace(/\bDEFAULT\b[\s\S]*$/i, '')
          .replace(/\bPRIMARY KEY\b/gi, '')
          .replace(/\bAUTO_INCREMENT\b/gi, '')
          .replace(/\bNOT NULL\b/gi, '')
          .replace(/\bNULL\b/gi, '')
          .trim(),
        nullable: !/\bNOT NULL\b/i.test(definition),
        default: defaultMatch ? defaultMatch[1].replace(/,$/, '') : '',
        definition,
        file: relative(pluginRoot, file),
      })
    }

    tableSchemas[table] = {
      table,
      file: relative(pluginRoot, file),
      columns,
    }
  }

  return tableSchemas
}

function describeColumn(columnName) {
  const descriptions = {
    id: 'Primary key for the row.',
    user_id: 'WordPress user ID associated with the row.',
    created_by: 'WordPress user ID that created the record.',
    post_id: 'Associated feed post ID.',
    feed_id: 'Associated feed ID.',
    object_id: 'Associated object ID, interpreted together with the object type.',
    object_type: 'Discriminator used to reuse the same table for multiple object types.',
    notification_type: 'Delivery channel or notification subtype for the row.',
    parent_id: 'Parent row ID used for threading or hierarchy.',
    related_id: 'Secondary related object ID used by activity records.',
    title: 'Human-readable title stored for the record.',
    slug: 'Sanitized slug or public identifier.',
    message: 'Raw message or body content.',
    message_rendered: 'Rendered HTML representation of the message.',
    meta: 'Serialized meta payload used by FluentCommunity.',
    value: 'Serialized meta value.',
    settings: 'Serialized settings payload.',
    status: 'Lifecycle or moderation status.',
    privacy: 'Visibility state used by feeds and spaces.',
    type: 'Subtype discriminator for the row.',
    content_type: 'Content subtype such as text, document, or survey.',
    serial: 'Ordering index inside a group of related records.',
    role: 'Membership role assigned to the user.',
    is_active: 'Boolean-like flag indicating whether the row is currently active.',
    is_public: 'Visibility flag used by activity rows.',
    is_read: 'Boolean-like flag indicating whether the notification has been read.',
    is_sticky: 'Boolean-like flag used for pinned or sticky records.',
    total_points: 'Accumulated profile points used for rankings and badges.',
    comments_count: 'Cached number of comments attached to the record.',
    reactions_count: 'Cached number of reactions attached to the record.',
    priority: 'Numeric priority used for pinned or featured ordering.',
    media_key: 'Unique key used to identify a stored media object.',
    media_type: 'Media subtype such as image, file, or video.',
    media_path: 'Internal storage path for the media file.',
    media_url: 'Persisted public URL for the media file.',
    driver: 'Storage driver used to serve the media file.',
    route: 'Portal route used to open the notification or action destination.',
    action: 'Action name stored for the notification or activity.',
    src_user_id: 'User that triggered the notification or action.',
    src_object_type: 'Source object type that created the notification.',
    username: 'Profile username or WordPress username alias.',
    display_name: 'Public display name shown in the portal.',
    avatar: 'Avatar URL for the profile or user.',
    short_description: 'Short biographical text or intro.',
    last_activity: 'Timestamp of the last tracked user activity.',
    created_at: 'Creation timestamp maintained by the ORM.',
    updated_at: 'Update timestamp maintained by the ORM.',
  }

  return descriptions[columnName] || `${humanizeSlug(columnName)} stored for this record.`
}

function guessColumnType(columnName) {
  if (columnName.endsWith('_id') || columnName === 'id') {
    return 'integer'
  }
  if (columnName.startsWith('is_')) {
    return 'boolean'
  }
  if (columnName.endsWith('_at') || columnName.includes('date')) {
    return 'datetime'
  }
  if (columnName.includes('count') || columnName === 'priority' || columnName === 'serial') {
    return 'integer'
  }
  if (columnName === 'settings' || columnName === 'meta' || columnName === 'value') {
    return 'serialized'
  }
  return 'string'
}

function inferRelationType(body) {
  const types = [
    'belongsToMany',
    'hasManyThrough',
    'hasOneThrough',
    'belongsTo',
    'hasMany',
    'hasOne',
  ]

  for (const type of types) {
    if (body.includes(`->${type}(`)) {
      return type
    }
  }

  return null
}

function inferRelationTarget(body) {
  const match = body.match(
    /->(?:belongsToMany|hasManyThrough|hasOneThrough|belongsTo|hasMany|hasOne)\(\s*([A-Za-z0-9_\\]+)::class/,
  )
  if (!match) {
    return null
  }

  const raw = match[1]
  return raw.includes('\\') ? raw.split('\\').pop() : raw
}

function parseModel(classIndex, tableSchemas) {
  const models = {}
  const modelFiles = [
    ...collectFilesFromSources(['app', 'Models'], (file) => file.endsWith('.php')),
    ...collectFilesFromSources(
      ['Modules'],
      (file) => file.endsWith('Model.php') || /\/Models?\//.test(toPosix(file)),
    ),
  ]

  for (const file of modelFiles) {
    const content = read(file)
    const namespace = extractNamespace(content)
    const classInfo = extractClassName(content)
    if (!namespace || !classInfo) {
      continue
    }

    const methods = extractMethods(content)
    const fillable = (extractNamedArray(content, 'fillable') || []).map((entry) => entry.value)
    const guarded = (extractNamedArray(content, 'guarded') || []).map((entry) => entry.value)
    const searchable = (extractNamedArray(content, 'searchable') || []).map((entry) => entry.value)
    const appends = (extractNamedArray(content, 'appends') || []).map((entry) => entry.value)
    const publicColumns = (extractNamedArray(content, 'publicColumns') || []).map((entry) => entry.value)
    const casts = Object.fromEntries(
      (extractNamedArray(content, 'casts') || [])
        .filter((entry) => entry.key)
        .map((entry) => [entry.key, stripQuotes(entry.value)]),
    )

    const relations = []
    const scopes = []
    const keyMethods = []

    for (const method of methods) {
      const relationType = inferRelationType(method.body)
      if (relationType) {
        relations.push({
          name: method.name,
          type: relationType,
          target: inferRelationTarget(method.body),
          signature: normalizeWhitespace(method.params),
        })
        continue
      }

      if (method.name.startsWith('scope')) {
        scopes.push({
          name: method.name.replace(/^scope/, ''),
          params: method.params,
          body: normalizeWhitespace(method.body).slice(0, 180),
        })
        continue
      }

      if (
        method.visibility === 'public' &&
        !method.name.startsWith('get') &&
        !method.name.startsWith('set') &&
        !['boot', '__construct'].includes(method.name)
      ) {
        keyMethods.push(method.name)
      }
    }

    const source = inferSourceConfig(file)
    models[classInfo.name] = {
      name: classInfo.name,
      parent: classInfo.parent ? classInfo.parent.split('\\').pop() : null,
      namespace,
      fqcn: `${namespace}\\${classInfo.name}`,
      file,
      relativeFile: displaySourcePath(file),
      sourceId: source.id,
      table: extractScalarAssignment(content, 'table'),
      primaryKey: extractScalarAssignment(content, 'primaryKey') || 'id',
      fillable,
      guarded,
      searchable,
      appends,
      publicColumns,
      casts,
      methods,
      relations,
      scopes,
      keyMethods,
      summary: MODEL_SUMMARIES[classInfo.name] || `${classInfo.name} model used by FluentCommunity.`,
      schema: tableSchemas[extractScalarAssignment(content, 'table') || ''],
      externalNote: null,
    }
  }

  models.Contact.externalNote = EXTERNAL_TABLE_NOTES.fc_subscribers
  models.Contact.table = 'fc_subscribers'
  models.User.externalNote = EXTERNAL_TABLE_NOTES.users
  models.User.table = 'users'
  models.UserMeta.externalNote = EXTERNAL_TABLE_NOTES.usermeta
  models.UserMeta.table = 'usermeta'

  return models
}

function resolveModelProperty(models, modelName, key) {
  const model = models[modelName]
  if (!model) {
    return key === 'relations' ||
      key === 'scopes' ||
      key === 'fillable' ||
      key === 'guarded' ||
      key === 'keyMethods' ||
      key === 'searchable' ||
      key === 'appends' ||
      key === 'publicColumns'
      ? []
      : key === 'casts'
        ? {}
        : null
  }

  const ownValue = model[key]
  if (
    ownValue &&
    ((Array.isArray(ownValue) && ownValue.length) ||
      (!Array.isArray(ownValue) && typeof ownValue === 'object' && Object.keys(ownValue).length) ||
      (!Array.isArray(ownValue) && typeof ownValue !== 'object'))
  ) {
    if (key === 'relations' || key === 'scopes' || key === 'keyMethods') {
      const inherited = model.parent ? resolveModelProperty(models, model.parent, key) : []
      return [...inherited, ...ownValue]
    }
    if (key === 'casts') {
      return {
        ...(model.parent ? resolveModelProperty(models, model.parent, key) : {}),
        ...ownValue,
      }
    }
    if (
      key === 'fillable' ||
      key === 'guarded' ||
      key === 'searchable' ||
      key === 'appends' ||
      key === 'publicColumns'
    ) {
      return [...(model.parent ? resolveModelProperty(models, model.parent, key) : []), ...ownValue]
    }
    return ownValue
  }

  if (model.parent) {
    return resolveModelProperty(models, model.parent, key)
  }

  if (
    key === 'relations' ||
    key === 'scopes' ||
    key === 'fillable' ||
    key === 'guarded' ||
    key === 'keyMethods' ||
    key === 'searchable' ||
    key === 'appends' ||
    key === 'publicColumns'
  ) {
    return []
  }

  if (key === 'casts') {
    return {}
  }

  return ownValue
}

function buildControllerMethodIndex(classIndex) {
  const entries = {}
  const controllerFiles = [
    ...collectFilesFromSources(['app', 'Http', 'Controllers'], (file) => file.endsWith('.php')),
    ...collectFilesFromSources(
      ['Modules'],
      (file) => file.endsWith('Controller.php') || file.endsWith('InvitationController.php'),
    ),
  ]

  for (const file of controllerFiles) {
    const content = read(file)
    const namespace = extractNamespace(content)
    const classInfo = extractClassName(content)
    if (!classInfo) {
      continue
    }

    const fqcn = namespace ? `${namespace}\\${classInfo.name}` : classInfo.name
    const methods = extractMethods(content)
    entries[fqcn] = {
      file,
      relativeFile: displaySourcePath(file),
      content,
      methods,
      className: classInfo.name,
      sourceId: inferSourceConfig(file).id,
    }
    entries[classInfo.name] = entries[fqcn]
  }

  return entries
}

function collectRouteFiles() {
  return SOURCE_CONFIGS.flatMap((source) => {
    const candidates = [
      ...listFiles(join(source.root, 'app'), (file) => file.endsWith('.php')),
      ...listFiles(join(source.root, 'Modules'), (file) => file.endsWith('.php')),
    ]

    return candidates.filter((file) => {
      const content = read(file)
      return /\$router->(get|post|put|patch|delete)\s*\(/.test(content)
    })
  })
}

function parseRouteHandler(handlerExpression, fallbackNamespace) {
  const normalized = normalizeWhitespace(handlerExpression.trim())

  const stringMatch = normalized.match(/^'([^@']+)@([^']+)'$/)
  if (stringMatch) {
    return {
      controller: stringMatch[1].replace(/^\\/, ''),
      action: stringMatch[2],
      namespace: fallbackNamespace,
    }
  }

  const arrayMatch = normalized.match(/^\[\s*([A-Za-z0-9_\\]+)::class\s*,\s*'([^']+)'\s*\]$/)
  if (arrayMatch) {
    const fqcn = arrayMatch[1].replace(/^\\/, '')
    return {
      controller: fqcn,
      action: arrayMatch[2],
      namespace: fqcn.includes('\\') ? fqcn.split('\\').slice(0, -1).join('\\') : fallbackNamespace,
    }
  }

  return null
}

function getCurrentRouteGroup(stack) {
  const prefix = stack
    .map((entry) => entry.prefix)
    .filter(Boolean)
    .join('/')
    .replace(/^\/|\/$/g, '')

  const reverseStack = [...stack].reverse()
  const namespaceEntry = reverseStack.find((entry) => entry.namespace)
  const policyEntry = reverseStack.find((entry) => entry.policy)

  return {
    prefix,
    namespace: namespaceEntry ? namespaceEntry.namespace : null,
    policy: policyEntry ? policyEntry.policy : null,
  }
}

function parseRouteGroups(filePath) {
  const source = inferSourceConfig(filePath)
  const content = read(filePath)
  const lines = content.split('\n')
  const stack = []
  const routes = []
  let pendingGroupLines = []
  let pendingRouteLines = []
  let pendingRouteStartLine = null

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber += 1) {
    const line = lines[lineNumber]
    const trimmed = line.trim()

    if (trimmed.includes('->prefix(') || pendingGroupLines.length) {
      if (trimmed) {
        pendingGroupLines.push(trimmed)
      }

      const joined = pendingGroupLines.join(' ')
      if (joined.includes('->group(function')) {
        const prefixMatch = joined.match(/->prefix\('([^']+)'\)/)
        if (prefixMatch) {
          const namespaceMatch = joined.match(/->namespace\('([^']+)'\)/)
          const policyMatch = joined.match(/->withPolicy\(([^)]+)\)/)
          stack.push({
            prefix: prefixMatch[1],
            namespace: namespaceMatch ? namespaceMatch[1].replace(/^\\/, '') : null,
            policy: policyMatch ? policyMatch[1].replace(/['\\]/g, '') : null,
          })
          pendingGroupLines = []
          continue
        }
      }

      if (trimmed.endsWith(';')) {
        pendingGroupLines = []
      }
    }

    if (pendingRouteLines.length || /^\$router->(get|post|put|patch|delete)\s*\(/.test(trimmed)) {
      if (!pendingRouteLines.length) {
        pendingRouteStartLine = lineNumber + 1
      }
      if (trimmed) {
        pendingRouteLines.push(trimmed)
      }

      if (trimmed.endsWith(';')) {
        const statement = pendingRouteLines.join(' ')
        const statementMatch = statement.match(/^\$router->(get|post|put|patch|delete)\s*\(/)

        if (statementMatch) {
          const openParen = statement.indexOf('(')
          const closeParen = scanBalanced(statement, openParen, '(', ')')

          if (closeParen !== -1) {
            const args = splitTopLevel(statement.slice(openParen + 1, closeParen))
            const handler = parseRouteHandler(args[1] || '', getCurrentRouteGroup(stack).namespace)
            if (handler) {
              const currentGroup = getCurrentRouteGroup(stack)
              const constraints = []
              const constraintPart = statement.slice(closeParen + 1)
              const constraintRegex = /->(int|alphaNumDash)\('([^']+)'\)/g
              let constraintMatch
              while ((constraintMatch = constraintRegex.exec(constraintPart))) {
                constraints.push({
                  type: constraintMatch[1],
                  name: constraintMatch[2],
                })
              }

              const routeSuffix = stripQuotes(args[0] || '') || '/'
              const fullPath = normalizeRoutePath(currentGroup.prefix, routeSuffix)

              routes.push({
                sourceId: source.id,
                httpMethod: statementMatch[1].toUpperCase(),
                methodKey: statementMatch[1],
                routePath: fullPath,
                groupPrefix: currentGroup.prefix,
                controller: handler.controller,
                action: handler.action,
                namespace: handler.namespace || currentGroup.namespace,
                policy: currentGroup.policy,
                constraints,
                routeFile: displaySourcePath(filePath),
                routeLine: pendingRouteStartLine || lineNumber + 1,
              })
            }
          }
        }

        pendingRouteLines = []
        pendingRouteStartLine = null
      }
    }

    if (trimmed === '});' && stack.length) {
      stack.pop()
    }
  }

  return routes
}

function normalizeRoutePath(prefix, suffix) {
  const prefixClean = prefix ? `/${prefix.replace(/^\/|\/$/g, '')}` : ''
  const suffixClean = suffix === '/' ? '' : `/${suffix.replace(/^\/|\/$/g, '')}`
  return `${prefixClean}${suffixClean}`.replace(/\/+/g, '/')
}

function classifyRoute(route) {
  if (route.routePath.includes('/comments') && route.routePath.includes('/reactions')) {
    return 'reactions'
  }
  if (route.routePath.endsWith('/react') || route.routePath.includes('/apps/survey')) {
    return 'reactions'
  }
  if (route.controller.includes('ReactionController')) {
    return 'reactions'
  }
  if (route.routePath.includes('/comments')) {
    return 'comments'
  }
  if (route.routePath.includes('media-upload') || route.routePath.includes('media-preview')) {
    return 'media'
  }
  if (route.groupPrefix === 'fluent-player') {
    return 'media'
  }
  if (route.groupPrefix === 'documents') {
    return 'documents'
  }
  if (route.groupPrefix === 'giphy') {
    return 'giphy'
  }
  if (route.groupPrefix === 'leaderboard' || route.groupPrefix === 'admin/leaderboards') {
    return 'leaderboard'
  }
  if (route.groupPrefix === 'analytics' || route.groupPrefix.startsWith('analytics/')) {
    return 'reports'
  }
  if (route.groupPrefix === 'moderation' || route.groupPrefix.startsWith('moderation/')) {
    return 'reports'
  }
  if (route.groupPrefix === 'scheduled-posts') {
    return 'feeds'
  }
  if (route.routePath.includes('/members') && route.groupPrefix !== 'profile') {
    return 'members'
  }
  if (route.groupPrefix === 'feeds') return 'feeds'
  if (route.groupPrefix === 'spaces') return 'spaces'
  if (route.groupPrefix === 'profile') return 'profile'
  if (route.groupPrefix === 'admin') return 'admin'
  if (route.groupPrefix === 'members') return 'members'
  if (route.groupPrefix === 'notifications') return 'notifications'
  if (route.groupPrefix === 'activities') return 'activity'
  if (route.groupPrefix === 'comments') return 'comments'
  if (route.groupPrefix === 'options') return 'options'
  if (route.groupPrefix === 'settings') return 'settings'
  if (route.groupPrefix === 'courses' || route.groupPrefix === 'admin/courses') return 'courses'
  if (route.groupPrefix === 'migrations') return 'migrations'
  if (route.groupPrefix === 'invitations') return 'invitations'
  if (route.groupPrefix === 'cart') return 'cart'
  return route.groupPrefix.split('/')[0]
}

function buildOperationAlias(route) {
  const path = route.routePath
  const method = route.httpMethod
  const module = route.module

  const map = [
    { module: 'feeds', path: /^\/feeds$/, method: 'GET', slug: 'list-feeds' },
    { module: 'feeds', path: /^\/feeds$/, method: 'POST', slug: 'create-feed' },
    { module: 'feeds', path: /^\/feeds\/\{feed_id\}$/, method: 'POST', slug: 'update-feed' },
    { module: 'feeds', path: /^\/feeds\/\{feed_id\}$/, method: 'PATCH', slug: 'patch-feed' },
    { module: 'feeds', path: /^\/feeds\/media-upload$/, method: 'POST', slug: 'upload-feed-media' },
    { module: 'feeds', path: /^\/feeds\/bookmarks$/, method: 'GET', slug: 'list-bookmarks' },
    { module: 'feeds', path: /^\/feeds\/\{feed_slug\}\/by-slug$/, method: 'GET', slug: 'get-feed-by-slug' },
    { module: 'feeds', path: /^\/feeds\/\{feed_id\}\/by-id$/, method: 'GET', slug: 'get-feed-by-id' },
    { module: 'feeds', path: /^\/feeds\/\{feed_id\}$/, method: 'DELETE', slug: 'delete-feed' },
    { module: 'feeds', path: /^\/feeds\/\{feed_id\}\/media-preview$/, method: 'DELETE', slug: 'delete-media-preview' },
    { module: 'feeds', path: /^\/feeds\/ticker$/, method: 'GET', slug: 'get-feed-ticker' },
    { module: 'feeds', path: /^\/feeds\/ticker-updates$/, method: 'GET', slug: 'get-ticker-updates' },
    { module: 'feeds', path: /^\/feeds\/batch$/, method: 'POST', slug: 'batch-fetch-feeds' },
    { module: 'feeds', path: /^\/feeds\/oembed$/, method: 'GET', slug: 'get-oembed' },
    { module: 'feeds', path: /^\/feeds\/links$/, method: 'GET', slug: 'get-feed-links' },
    { module: 'feeds', path: /^\/feeds\/links$/, method: 'POST', slug: 'update-feed-links' },
    { module: 'feeds', path: /^\/feeds\/welcome-banner$/, method: 'GET', slug: 'get-welcome-banner' },
    { module: 'feeds', path: /^\/feeds\/markdown-preview$/, method: 'POST', slug: 'render-markdown-preview' },
    { module: 'spaces', path: /^\/spaces$/, method: 'GET', slug: 'list-spaces' },
    { module: 'spaces', path: /^\/spaces$/, method: 'POST', slug: 'create-space' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/by-slug$/, method: 'GET', slug: 'get-space-by-slug' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/by-slug$/, method: 'PUT', slug: 'update-space-by-slug' },
    { module: 'spaces', path: /^\/spaces\/\{spaceId\}\/by-id$/, method: 'PUT', slug: 'update-space-by-id' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/join$/, method: 'POST', slug: 'join-space' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/leave$/, method: 'POST', slug: 'leave-space' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/meta-settings$/, method: 'GET', slug: 'get-space-meta-settings' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/lockscreens$/, method: 'GET', slug: 'get-space-lockscreens' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/links$/, method: 'POST', slug: 'update-space-links' },
    { module: 'spaces', path: /^\/spaces\/users\/search$/, method: 'GET', slug: 'search-space-users' },
    { module: 'spaces', path: /^\/spaces\/discover$/, method: 'GET', slug: 'discover-spaces' },
    { module: 'spaces', path: /^\/spaces\/all-spaces$/, method: 'GET', slug: 'list-all-spaces' },
    { module: 'spaces', path: /^\/spaces\/space_groups$/, method: 'GET', slug: 'list-space-groups' },
    { module: 'spaces', path: /^\/spaces\/space_groups$/, method: 'POST', slug: 'create-space-group' },
    { module: 'spaces', path: /^\/spaces\/space_groups\/\{id\}$/, method: 'PUT', slug: 'update-space-group' },
    { module: 'spaces', path: /^\/spaces\/space_groups\/\{id\}$/, method: 'DELETE', slug: 'delete-space-group' },
    { module: 'spaces', path: /^\/spaces\/space_groups\/re-index$/, method: 'PATCH', slug: 'reindex-space-groups' },
    { module: 'spaces', path: /^\/spaces\/space_groups\/re-index-spaces$/, method: 'PATCH', slug: 'reindex-spaces' },
    { module: 'spaces', path: /^\/spaces\/space_groups\/move-space$/, method: 'PATCH', slug: 'move-space' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}$/, method: 'DELETE', slug: 'delete-space-by-slug' },
    { module: 'spaces', path: /^\/spaces\/\{spaceId\}\/by-id$/, method: 'DELETE', slug: 'delete-space-by-id' },
    { module: 'spaces', path: /^\/spaces\/\{spaceSlug\}\/lockscreens$/, method: 'PUT', slug: 'update-space-lockscreen-settings' },
    { module: 'members', path: /^\/members$/, method: 'GET', slug: 'list-members' },
    { module: 'members', path: /^\/members\/\{user_id\}$/, method: 'PATCH', slug: 'update-member' },
    { module: 'members', path: /^\/spaces\/\{spaceSlug\}\/members$/, method: 'GET', slug: 'list-space-members' },
    { module: 'members', path: /^\/spaces\/\{spaceSlug\}\/members$/, method: 'POST', slug: 'add-space-member' },
    { module: 'members', path: /^\/spaces\/\{spaceSlug\}\/members\/remove$/, method: 'POST', slug: 'remove-space-member' },
    { module: 'comments', path: /^\/feeds\/\{feed_id\}\/comments$/, method: 'GET', slug: 'list-feed-comments' },
    { module: 'comments', path: /^\/feeds\/\{feed_id\}\/comments$/, method: 'POST', slug: 'create-comment' },
    { module: 'comments', path: /^\/feeds\/\{feed_id\}\/comments\/\{comment_id\}$/, method: 'POST', slug: 'update-comment' },
    { module: 'comments', path: /^\/feeds\/\{feed_id\}\/comments\/\{comment_id\}$/, method: 'PATCH', slug: 'patch-comment' },
    { module: 'comments', path: /^\/feeds\/\{feed_id\}\/comments\/\{comment_id\}$/, method: 'DELETE', slug: 'delete-comment' },
    { module: 'comments', path: /^\/comments\/\{id\}$/, method: 'GET', slug: 'get-comment' },
    { module: 'reactions', path: /^\/feeds\/\{feed_id\}\/react$/, method: 'POST', slug: 'toggle-feed-reaction' },
    { module: 'reactions', path: /^\/feeds\/\{feed_id\}\/reactions$/, method: 'GET', slug: 'list-feed-reactions' },
    { module: 'reactions', path: /^\/comments\/\{comment_id\}\/reactions$/, method: 'GET', slug: 'list-comment-reactions' },
    { module: 'reactions', path: /^\/feeds\/\{feed_id\}\/comments\/\{comment_id\}\/reactions$/, method: 'POST', slug: 'toggle-comment-reaction' },
    { module: 'reactions', path: /^\/feeds\/\{feed_id\}\/apps\/survey-vote$/, method: 'POST', slug: 'cast-survey-vote' },
    { module: 'reactions', path: /^\/feeds\/\{feed_id\}\/apps\/survey-voters\/\{option_slug\}$/, method: 'GET', slug: 'list-survey-voters' },
    { module: 'notifications', path: /^\/notifications$/, method: 'GET', slug: 'list-notifications' },
    { module: 'notifications', path: /^\/notifications\/unread$/, method: 'GET', slug: 'list-unread-notifications' },
    { module: 'notifications', path: /^\/notifications\/mark-read\/\{notification_id\}$/, method: 'POST', slug: 'mark-notification-read' },
    { module: 'notifications', path: /^\/notifications\/mark-read\/\{feed_id\}\/by-feed-id$/, method: 'POST', slug: 'mark-notifications-read-by-feed' },
    { module: 'notifications', path: /^\/notifications\/mark-all-read$/, method: 'POST', slug: 'mark-all-notifications-read' },
    { module: 'activity', path: /^\/activities$/, method: 'GET', slug: 'list-activities' },
    { module: 'profile', path: /^\/profile\/\{username\}$/, method: 'GET', slug: 'get-profile' },
    { module: 'profile', path: /^\/profile\/\{username\}$/, method: 'POST', slug: 'update-profile' },
    { module: 'profile', path: /^\/profile\/\{username\}$/, method: 'PUT', slug: 'patch-profile' },
    { module: 'profile', path: /^\/profile\/\{username\}\/spaces$/, method: 'GET', slug: 'list-profile-spaces' },
    { module: 'profile', path: /^\/profile\/\{username\}\/memberships$/, method: 'GET', slug: 'list-profile-memberships' },
    { module: 'profile', path: /^\/profile\/\{username\}\/comments$/, method: 'GET', slug: 'list-profile-comments' },
    { module: 'profile', path: /^\/profile\/\{username\}\/notification-preferences$/, method: 'GET', slug: 'get-notification-preferences' },
    { module: 'profile', path: /^\/profile\/\{username\}\/notification-preferences$/, method: 'POST', slug: 'save-notification-preferences' },
    { module: 'profile', path: /^\/profile\/\{username\}\/followers$/, method: 'GET', slug: 'list-profile-followers' },
    { module: 'profile', path: /^\/profile\/\{username\}\/followings$/, method: 'GET', slug: 'list-profile-followings' },
    { module: 'profile', path: /^\/profile\/\{username\}\/blocked-users$/, method: 'GET', slug: 'list-profile-blocked-users' },
    { module: 'profile', path: /^\/profile\/\{username\}\/follow$/, method: 'POST', slug: 'follow-profile-user' },
    { module: 'profile', path: /^\/profile\/\{username\}\/unfollow$/, method: 'POST', slug: 'unfollow-profile-user' },
    { module: 'profile', path: /^\/profile\/\{userId\}\/toggle-follow$/, method: 'POST', slug: 'toggle-profile-follow' },
    { module: 'profile', path: /^\/profile\/\{username\}\/block$/, method: 'POST', slug: 'block-profile-user' },
    { module: 'profile', path: /^\/profile\/\{username\}\/unblock$/, method: 'POST', slug: 'unblock-profile-user' },
    { module: 'profile', path: /^\/profile\/\{username\}\/notification$/, method: 'POST', slug: 'toggle-profile-notification' },
    { module: 'admin', path: /^\/admin\/general$/, method: 'GET', slug: 'get-general-settings' },
    { module: 'admin', path: /^\/admin\/general$/, method: 'POST', slug: 'save-general-settings' },
    { module: 'admin', path: /^\/admin\/email-settings$/, method: 'GET', slug: 'get-email-settings' },
    { module: 'admin', path: /^\/admin\/email-settings$/, method: 'POST', slug: 'save-email-settings' },
    { module: 'admin', path: /^\/admin\/storage-settings$/, method: 'GET', slug: 'get-storage-settings' },
    { module: 'admin', path: /^\/admin\/storage-settings$/, method: 'POST', slug: 'save-storage-settings' },
    { module: 'admin', path: /^\/admin\/welcome-banner$/, method: 'GET', slug: 'get-admin-welcome-banner' },
    { module: 'admin', path: /^\/admin\/welcome-banner$/, method: 'POST', slug: 'save-admin-welcome-banner' },
    { module: 'admin', path: /^\/admin\/auth-settings$/, method: 'GET', slug: 'get-auth-settings' },
    { module: 'admin', path: /^\/admin\/on-boardings$/, method: 'GET', slug: 'get-onboarding-settings' },
    { module: 'admin', path: /^\/admin\/on-boardings$/, method: 'POST', slug: 'save-onboarding-settings' },
    { module: 'admin', path: /^\/admin\/on-boardings\/change-slug$/, method: 'POST', slug: 'change-portal-slug' },
    { module: 'admin', path: /^\/admin\/profile-link-providers$/, method: 'GET', slug: 'get-profile-link-providers' },
    { module: 'admin', path: /^\/admin\/profile-link-providers$/, method: 'POST', slug: 'save-profile-link-providers' },
    { module: 'admin', path: /^\/admin\/all_space_courses$/, method: 'GET', slug: 'list-all-space-courses' },
    { module: 'settings', path: /^\/settings\/features$/, method: 'GET', slug: 'get-feature-settings' },
    { module: 'settings', path: /^\/settings\/features$/, method: 'POST', slug: 'save-feature-settings' },
    { module: 'settings', path: /^\/settings\/menu-settings$/, method: 'GET', slug: 'get-menu-settings' },
    { module: 'settings', path: /^\/settings\/menu-settings$/, method: 'POST', slug: 'save-menu-settings' },
    { module: 'settings', path: /^\/settings\/install_plugin$/, method: 'POST', slug: 'install-plugin' },
    { module: 'settings', path: /^\/settings\/customization-settings$/, method: 'GET', slug: 'get-customization-settings' },
    { module: 'settings', path: /^\/settings\/customization-settings$/, method: 'POST', slug: 'save-customization-settings' },
    { module: 'settings', path: /^\/settings\/privacy-settings$/, method: 'GET', slug: 'get-privacy-settings' },
    { module: 'settings', path: /^\/settings\/privacy-settings$/, method: 'POST', slug: 'save-privacy-settings' },
    { module: 'settings', path: /^\/settings\/color-config$/, method: 'GET', slug: 'get-color-config' },
    { module: 'settings', path: /^\/settings\/color-config$/, method: 'POST', slug: 'save-color-config' },
    { module: 'settings', path: /^\/settings\/crm-tagging-config$/, method: 'GET', slug: 'get-crm-tagging-config' },
    { module: 'settings', path: /^\/settings\/crm-tagging-config$/, method: 'POST', slug: 'save-crm-tagging-config' },
    { module: 'settings', path: /^\/settings\/fluent-player-settings$/, method: 'GET', slug: 'get-fluent-player-settings' },
    { module: 'settings', path: /^\/settings\/fluent-player-settings$/, method: 'POST', slug: 'save-fluent-player-settings' },
    { module: 'settings', path: /^\/settings\/snippets-settings$/, method: 'GET', slug: 'get-snippets-settings' },
    { module: 'settings', path: /^\/settings\/snippets-settings$/, method: 'POST', slug: 'save-snippets-settings' },
    { module: 'settings', path: /^\/settings\/moderation-config$/, method: 'POST', slug: 'save-settings-moderation-config' },
    { module: 'settings', path: /^\/settings\/followers\/config$/, method: 'GET', slug: 'get-followers-settings' },
    { module: 'settings', path: /^\/settings\/followers\/config$/, method: 'POST', slug: 'save-followers-settings' },
    { module: 'options', path: /^\/options\/app-vars$/, method: 'GET', slug: 'get-app-vars' },
    { module: 'options', path: /^\/options\/sidebar-menu-html$/, method: 'GET', slug: 'get-sidebar-menu-html' },
    { module: 'options', path: /^\/options\/menu-items$/, method: 'GET', slug: 'get-menu-items' },
    { module: 'media', path: /^\/fluent-player\/video-upload$/, method: 'POST', slug: 'upload-video' },
    { module: 'media', path: /^\/fluent-player\/video-content\/\{media_id\}$/, method: 'GET', slug: 'get-video-content' },
    { module: 'courses', path: /^\/courses$/, method: 'GET', slug: 'list-courses' },
    { module: 'courses', path: /^\/courses\/\{course_id\}$/, method: 'GET', slug: 'get-course' },
    { module: 'courses', path: /^\/courses\/\{course_slug\}\/by-slug$/, method: 'GET', slug: 'get-course-by-slug' },
    { module: 'courses', path: /^\/courses\/\{course_slug\}\/lessons\/\{lesson_slug\}\/by-slug$/, method: 'GET', slug: 'get-lesson-by-slug' },
    { module: 'courses', path: /^\/courses\/\{course_id\}\/enroll$/, method: 'POST', slug: 'enroll-course' },
    { module: 'courses', path: /^\/courses\/\{course_id\}\/lessons\/\{lesson_id\}\/completion$/, method: 'PUT', slug: 'update-lesson-completion' },
    { module: 'courses', path: /^\/courses\/all-courses$/, method: 'GET', slug: 'list-all-courses' },
    { module: 'courses', path: /^\/admin\/courses$/, method: 'GET', slug: 'list-admin-courses' },
    { module: 'courses', path: /^\/admin\/courses$/, method: 'POST', slug: 'create-course' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}$/, method: 'GET', slug: 'get-admin-course' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}$/, method: 'PUT', slug: 'update-course' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/duplicate$/, method: 'POST', slug: 'duplicate-course' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}$/, method: 'DELETE', slug: 'delete-course' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/comments$/, method: 'GET', slug: 'list-course-comments' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/students$/, method: 'GET', slug: 'list-course-students' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/students$/, method: 'POST', slug: 'add-course-student' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/students\/\{student_id\}$/, method: 'DELETE', slug: 'remove-course-student' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/users\/search$/, method: 'GET', slug: 'search-course-users' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/links$/, method: 'POST', slug: 'update-course-links' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/meta-settings$/, method: 'GET', slug: 'get-course-meta-settings' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/instructors\/search$/, method: 'GET', slug: 'search-course-instructors' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections$/, method: 'GET', slug: 'list-course-sections' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections$/, method: 'POST', slug: 'create-course-section' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections\/indexes$/, method: 'PATCH', slug: 'reindex-course-sections' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections\/\{section_id\}$/, method: 'GET', slug: 'get-course-section' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections\/\{section_id\}$/, method: 'PUT', slug: 'update-course-section' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections\/\{section_id\}$/, method: 'PATCH', slug: 'patch-course-section' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections\/\{section_id\}$/, method: 'DELETE', slug: 'delete-course-section' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/sections\/\{section_id\}\/indexes$/, method: 'PATCH', slug: 'reindex-course-lessons' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/lessons$/, method: 'GET', slug: 'list-course-lessons' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/lessons$/, method: 'POST', slug: 'create-course-lesson' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/copy-section$/, method: 'PUT', slug: 'copy-course-section' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/move-lesson$/, method: 'PUT', slug: 'move-course-lesson' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/lessons\/\{lesson_id\}$/, method: 'GET', slug: 'get-course-lesson' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/lessons\/\{lesson_id\}$/, method: 'PUT', slug: 'update-course-lesson' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/lessons\/\{lesson_id\}$/, method: 'PATCH', slug: 'patch-course-lesson' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/lessons\/\{lesson_id\}$/, method: 'DELETE', slug: 'delete-course-lesson' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/lockscreens$/, method: 'PUT', slug: 'update-course-lockscreen-settings' },
    { module: 'courses', path: /^\/courses\/\{course_id\}\/lessons\/\{lesson_id\}\/quiz\/submit$/, method: 'POST', slug: 'submit-lesson-quiz' },
    { module: 'courses', path: /^\/courses\/\{course_id\}\/lessons\/\{lesson_id\}\/quiz\/result$/, method: 'GET', slug: 'get-lesson-quiz-result' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/quiz-results$/, method: 'GET', slug: 'list-course-quiz-results' },
    { module: 'courses', path: /^\/admin\/courses\/\{course_id\}\/quiz-results\/\{quiz_id\}$/, method: 'POST', slug: 'update-course-quiz-result' },
    { module: 'migrations', path: /^\/migrations$/, method: 'GET', slug: 'list-available-migrations' },
    { module: 'migrations', path: /^\/migrations\/buddypress\/config$/, method: 'GET', slug: 'get-buddypress-migration-config' },
    { module: 'migrations', path: /^\/migrations\/buddypress\/start$/, method: 'POST', slug: 'start-buddypress-migration' },
    { module: 'migrations', path: /^\/migrations\/buddypress\/status$/, method: 'GET', slug: 'get-buddypress-migration-status' },
    { module: 'invitations', path: /^\/invitations$/, method: 'GET', slug: 'list-invitations' },
    { module: 'invitations', path: /^\/invitations$/, method: 'POST', slug: 'create-invitation' },
    { module: 'invitations', path: /^\/invitations\/\{invitation_id\}$/, method: 'DELETE', slug: 'delete-invitation' },
    { module: 'invitations', path: /^\/invitations\/link$/, method: 'POST', slug: 'create-invitation-link' },
    { module: 'invitations', path: /^\/invitations\/\{invitation_id\}\/resend$/, method: 'POST', slug: 'resend-invitation' },
    { module: 'cart', path: /^\/cart\/products\/search$/, method: 'GET', slug: 'search-cart-products' },
    { module: 'cart', path: /^\/cart\/products\/create$/, method: 'POST', slug: 'create-cart-product' },
    { module: 'cart', path: /^\/cart\/spaces\/\{spaceId\}\/paywalls$/, method: 'GET', slug: 'list-space-paywalls' },
    { module: 'cart', path: /^\/cart\/spaces\/\{spaceId\}\/paywalls$/, method: 'POST', slug: 'create-space-paywall' },
    { module: 'cart', path: /^\/cart\/spaces\/\{spaceId\}\/paywalls$/, method: 'DELETE', slug: 'delete-space-paywall' },
    { module: 'feeds', path: /^\/scheduled-posts$/, method: 'GET', slug: 'list-scheduled-posts' },
    { module: 'feeds', path: /^\/scheduled-posts\/\{feed_id\}$/, method: 'PUT', slug: 'reschedule-post' },
    { module: 'feeds', path: /^\/scheduled-posts\/publish\/\{feed_id\}$/, method: 'POST', slug: 'publish-scheduled-post' },
    { module: 'reports', path: /^\/analytics\/overview\/widget$/, method: 'GET', slug: 'get-overview-widget-report' },
    { module: 'reports', path: /^\/analytics\/overview\/activity$/, method: 'GET', slug: 'get-overview-activity-report' },
    { module: 'reports', path: /^\/analytics\/overview\/popular-day-time$/, method: 'GET', slug: 'get-popular-day-time-report' },
    { module: 'reports', path: /^\/analytics\/members\/widget$/, method: 'GET', slug: 'get-member-widget-report' },
    { module: 'reports', path: /^\/analytics\/members\/activity$/, method: 'GET', slug: 'get-member-activity-report' },
    { module: 'reports', path: /^\/analytics\/members\/top-members$/, method: 'GET', slug: 'list-top-members-report' },
    { module: 'reports', path: /^\/analytics\/members\/top-post-starters$/, method: 'GET', slug: 'list-top-post-starters-report' },
    { module: 'reports', path: /^\/analytics\/members\/top-commenters$/, method: 'GET', slug: 'list-top-commenters-report' },
    { module: 'reports', path: /^\/analytics\/spaces\/widget$/, method: 'GET', slug: 'get-space-widget-report' },
    { module: 'reports', path: /^\/analytics\/spaces\/activity$/, method: 'GET', slug: 'get-space-activity-report' },
    { module: 'reports', path: /^\/analytics\/spaces\/popular$/, method: 'GET', slug: 'list-popular-spaces-report' },
    { module: 'reports', path: /^\/analytics\/spaces\/search$/, method: 'GET', slug: 'search-report-spaces' },
    { module: 'reports', path: /^\/moderation\/report$/, method: 'POST', slug: 'create-moderation-report' },
    { module: 'reports', path: /^\/moderation\/reports$/, method: 'GET', slug: 'list-moderation-reports' },
    { module: 'reports', path: /^\/moderation\/reports\/\{report_id\}$/, method: 'PUT', slug: 'update-moderation-report' },
    { module: 'reports', path: /^\/moderation\/reports\/\{report_id\}$/, method: 'DELETE', slug: 'delete-moderation-report' },
    { module: 'reports', path: /^\/moderation\/config$/, method: 'POST', slug: 'save-moderation-config' },
    { module: 'documents', path: /^\/documents$/, method: 'GET', slug: 'list-documents' },
    { module: 'documents', path: /^\/documents\/upload$/, method: 'POST', slug: 'upload-document' },
    { module: 'documents', path: /^\/documents\/update$/, method: 'POST', slug: 'update-document' },
    { module: 'documents', path: /^\/documents\/delete$/, method: 'POST', slug: 'delete-document' },
    { module: 'giphy', path: /^\/giphy$/, method: 'GET', slug: 'search-giphy' },
    { module: 'leaderboard', path: /^\/leaderboard$/, method: 'GET', slug: 'list-leaderboard' },
    { module: 'leaderboard', path: /^\/admin\/leaderboards\/levels$/, method: 'GET', slug: 'get-leaderboard-levels' },
    { module: 'leaderboard', path: /^\/admin\/leaderboards\/levels$/, method: 'POST', slug: 'save-leaderboard-levels' },
    { module: 'admin', path: /^\/admin\/managers$/, method: 'GET', slug: 'list-admin-managers' },
    { module: 'admin', path: /^\/admin\/managers$/, method: 'POST', slug: 'save-admin-manager' },
    { module: 'admin', path: /^\/admin\/managers\/\{user_id\}$/, method: 'DELETE', slug: 'delete-admin-manager' },
    { module: 'admin', path: /^\/admin\/users$/, method: 'GET', slug: 'search-admin-users' },
    { module: 'admin', path: /^\/admin\/auth-settings$/, method: 'POST', slug: 'save-auth-settings' },
    { module: 'admin', path: /^\/admin\/license$/, method: 'GET', slug: 'get-license-status' },
    { module: 'admin', path: /^\/admin\/license$/, method: 'POST', slug: 'save-license-key' },
    { module: 'admin', path: /^\/admin\/license$/, method: 'DELETE', slug: 'deactivate-license-key' },
    { module: 'admin', path: /^\/admin\/messaging-setting$/, method: 'GET', slug: 'get-messaging-settings' },
    { module: 'admin', path: /^\/admin\/messaging-setting$/, method: 'POST', slug: 'save-messaging-settings' },
    { module: 'admin', path: /^\/admin\/topics$/, method: 'GET', slug: 'list-topics' },
    { module: 'admin', path: /^\/admin\/topics$/, method: 'POST', slug: 'save-topics' },
    { module: 'admin', path: /^\/admin\/topics\/config$/, method: 'POST', slug: 'save-topic-config' },
    { module: 'admin', path: /^\/admin\/topics\/\{topic_id\}$/, method: 'DELETE', slug: 'delete-topic' },
    { module: 'admin', path: /^\/admin\/webhooks$/, method: 'GET', slug: 'list-webhooks' },
    { module: 'admin', path: /^\/admin\/webhooks$/, method: 'POST', slug: 'save-webhook' },
    { module: 'admin', path: /^\/admin\/webhooks\/\{id\}$/, method: 'DELETE', slug: 'delete-webhook' },
    { module: 'admin', path: /^\/admin\/links$/, method: 'POST', slug: 'save-sidebar-link' },
    { module: 'admin', path: /^\/admin\/links\/\{id\}$/, method: 'DELETE', slug: 'delete-sidebar-link' },
    { module: 'admin', path: /^\/admin\/user-badges$/, method: 'GET', slug: 'list-user-badges' },
    { module: 'admin', path: /^\/admin\/user-badges$/, method: 'POST', slug: 'save-user-badges' },
  ]

  const found = map.find((entry) => entry.module === module && entry.method === method && entry.path.test(path))
  if (found) {
    return found.slug
  }

  return `${route.methodKey.toLowerCase()}-${slugifyClass(route.action)}`
}

function buildOperationMeta(route) {
  const slug = buildOperationAlias(route)
  const title = humanizeSlug(slug)
  const operationId = kebabToCamel(slug)
  return {
    slug,
    title,
    operationId,
    description: `${title} for the FluentCommunity ${MODULE_META[route.module]?.title || route.module}.`,
  }
}

function normalizeRoutePathParams(path) {
  return path.replace(/\{([^}]+)\}/g, '{$1}')
}

function inferParamType(paramName, constraint, validation, defaultValue, requestMethod = '', callback = '') {
  const validationText = validation || ''
  const helper = requestMethod || callback || ''

  if (helper === 'file' || helper === 'files') {
    return 'string'
  }
  if (
    constraint?.type === 'int' ||
    /integer|int/.test(validationText) ||
    helper === 'getInt' ||
    /intval|absint/.test(helper)
  ) {
    return 'integer'
  }
  if (/boolean|bool/.test(validationText) || helper === 'getBool') {
    return 'boolean'
  }
  if (/numeric|decimal|float/.test(validationText) || helper === 'getFloat') {
    return 'number'
  }
  if (/array/.test(validationText)) {
    return 'array'
  }
  if (/([.]|^)(survey|settings|meta|config)$/.test(paramName)) {
    return 'object'
  }
  if (
    Array.isArray(defaultValue) ||
    /(^|[.])[A-Za-z0-9_]*_ids$/.test(paramName) ||
    /(^|[.])options$/.test(paramName)
  ) {
    return 'array'
  }
  if (defaultValue && typeof defaultValue === 'object') {
    return 'object'
  }
  if (typeof defaultValue === 'number' || /^-?\d+(\.\d+)?$/.test(String(defaultValue || ''))) {
    return Number.isInteger(Number(defaultValue)) ? 'integer' : 'number'
  }
  if (defaultValue === 'true' || defaultValue === 'false') {
    return 'boolean'
  }
  if (/email/.test(validationText) || helper === 'getEmail') {
    return 'string'
  }
  if (/json/.test(paramName)) {
    return 'object'
  }
  return 'string'
}

function extractRequestMethodCalls(body, assignmentOnly = false) {
  const regex = assignmentOnly
    ? /\$([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:\$request|\$this->request)->(getSafe|get|input|getInt|getBool|getFloat|getText|getTitle|getEmail|all|files|file|only|except)\s*\(/g
    : /(?:\$request|\$this->request)->(getSafe|get|input|getInt|getBool|getFloat|getText|getTitle|getEmail|all|files|file|only|except)\s*\(/g

  const calls = []
  let match

  while ((match = regex.exec(body))) {
    const openParen = body.indexOf('(', match.index)
    const closeParen = scanBalanced(body, openParen, '(', ')')
    if (closeParen === -1) {
      continue
    }

    const args = splitTopLevel(body.slice(openParen + 1, closeParen))
    calls.push({
      variableName: assignmentOnly ? match[1] : null,
      method: assignmentOnly ? match[2] : match[1],
      args,
      raw: body.slice(match.index, closeParen + 1),
    })

    regex.lastIndex = closeParen + 1
  }

  return calls
}

function extractNamesFromRequestArg(arg) {
  if (!arg) {
    return []
  }

  const trimmed = arg.trim()
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith('`') && trimmed.endsWith('`'))
  ) {
    return [stripQuotes(trimmed)]
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return parsePhpArrayLiteral(trimmed)
      .map((entry) => (entry.key ? stripQuotes(entry.key) : stripQuotes(entry.value)))
      .filter(Boolean)
  }

  return []
}

function normalizeDefaultValue(rawValue) {
  if (!rawValue) {
    return ''
  }

  const trimmed = rawValue.trim()
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const entries = parsePhpArrayLiteral(trimmed)
    const hasKeys = entries.some((entry) => entry.key)
    if (hasKeys) {
      return Object.fromEntries(
        entries
          .filter((entry) => entry.key)
          .map((entry) => [stripQuotes(entry.key), normalizeDefaultValue(entry.value)]),
      )
    }

    return entries.map((entry) => normalizeDefaultValue(entry.value))
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed)
  }
  if (trimmed === 'true') {
    return true
  }
  if (trimmed === 'false') {
    return false
  }

  return stripQuotes(trimmed)
}

function buildNestedParamName(root, field) {
  if (!root) {
    return field
  }

  if (!field) {
    return root
  }

  return `${root}.${field}`
}

function parseRequestVariableSources(body, initialSources = {}) {
  const sources = { ...initialSources }

  for (const call of extractRequestMethodCalls(body, true)) {
    const firstArg = call.args[0] || ''
    const names = extractNamesFromRequestArg(firstArg)
    const root = call.method === 'all' ? '' : call.method === 'files' ? '@files' : names[0] || ''

    sources[call.variableName] = {
      root,
      method: call.method,
      callback: call.method === 'getSafe' ? stripQuotes(call.args[1] || '') : '',
      defaultValue:
        call.method === 'getSafe'
          ? normalizeDefaultValue(call.args[2] || '')
          : normalizeDefaultValue(call.args[1] || ''),
    }
  }

  let changed = true
  while (changed) {
    changed = false

    for (const match of Array.from(
      body.matchAll(
        /\$([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:\([^)]+\)\s*)?Arr::get\(\s*\$([A-Za-z_][A-Za-z0-9_]*)\s*,\s*(['"`][^'"`]+['"`])\s*(?:,\s*([^)]*))?\)/g,
      ),
    )) {
      const variableName = match[1]
      const sourceName = match[2]
      const field = stripQuotes(match[3] || '')
      const source = sources[sourceName]

      if (!field || !source || sources[variableName]) {
        continue
      }

      sources[variableName] = {
        root: buildNestedParamName(source.root, field),
        method: 'Arr::get',
        callback: '',
        defaultValue: normalizeDefaultValue(match[4] || ''),
      }
      changed = true
    }
  }

  return sources
}

function resolveValidationRootSource(sourceExpression, sources) {
  const source = sourceExpression.trim()

  if (/->files\(\)/.test(source)) {
    return '@files'
  }

  if (/->all\(\)/.test(source)) {
    return ''
  }

  const variableMatch = source.match(/^\$([A-Za-z_][A-Za-z0-9_]*)$/)
  if (variableMatch && sources[variableMatch[1]]) {
    return sources[variableMatch[1]].root
  }

  return ''
}

function parseValidationRules(body, sources) {
  const validations = []
  const regex = /(?:\$this->validate|(?:\$request|\$this->request)->validate)\s*\(/g
  let match

  while ((match = regex.exec(body))) {
    const openParen = body.indexOf('(', match.index)
    const closeParen = scanBalanced(body, openParen, '(', ')')
    if (closeParen === -1) {
      continue
    }

    const args = splitTopLevel(body.slice(openParen + 1, closeParen))
    const isControllerValidation = match[0].includes('$this->validate')
    const sourceExpression = isControllerValidation ? args[0] || '' : '$request->all()'
    const rulesExpression = isControllerValidation ? args[1] || '' : args[0] || ''

    if (!rulesExpression.startsWith('[')) {
      regex.lastIndex = closeParen + 1
      continue
    }

    validations.push({
      root: resolveValidationRootSource(sourceExpression, sources),
      rules: Object.fromEntries(
        parsePhpArrayLiteral(rulesExpression)
          .filter((entry) => entry.key)
          .map((entry) => [stripQuotes(entry.key), stripQuotes(entry.value)]),
      ),
    })

    regex.lastIndex = closeParen + 1
  }

  return validations
}

function mergeParameter(target, param) {
  const existing = target.find((item) => item.name === param.name)
  if (!existing) {
    target.push(param)
    return
  }

  existing.required = existing.required || param.required
  existing.validation = [existing.validation, param.validation].filter(Boolean).join(' | ')
  existing.defaultValue =
    existing.defaultValue === '' || existing.defaultValue === undefined
      ? param.defaultValue
      : existing.defaultValue
  existing.format = existing.format || param.format
  if (existing.schemaType === 'string' && param.schemaType !== 'string') {
    existing.schemaType = param.schemaType
  }
  if (param.description && !existing.description.includes(param.description)) {
    existing.description = [existing.description, param.description].filter(Boolean).join(' ')
  }
}

function extractArrayAccessParams(route, methodInfo, sources, targetQueryParams, targetBodyParams) {
  const regex = /Arr::(get|has)\s*\(/g
  let match

  while ((match = regex.exec(methodInfo.body))) {
    const openParen = methodInfo.body.indexOf('(', match.index)
    const closeParen = scanBalanced(methodInfo.body, openParen, '(', ')')
    if (closeParen === -1) {
      continue
    }

    const args = splitTopLevel(methodInfo.body.slice(openParen + 1, closeParen))
    const sourceExpression = (args[0] || '').trim()
    const fieldExpression = args[1] || ''
    const defaultValue = match[1] === 'get' ? normalizeDefaultValue(args[2] || '') : ''
    const variableMatch = sourceExpression.match(/^\$([A-Za-z_][A-Za-z0-9_]*)$/)
    const field = stripQuotes(fieldExpression)

    if (!variableMatch || !field || !sources[variableMatch[1]]) {
      regex.lastIndex = closeParen + 1
      continue
    }

    const source = sources[variableMatch[1]]
    const name = buildNestedParamName(source.root, field)
    const target =
      route.httpMethod === 'GET' && source.root !== '@files' ? targetQueryParams : targetBodyParams

    mergeParameter(target, {
      name,
      in: target === targetQueryParams ? 'query' : 'body',
      required: false,
      schemaType: inferParamType(name, null, '', defaultValue),
      defaultValue,
      format: source.root === '@files' ? 'binary' : undefined,
      description: `${humanizeSlug(name)} read via \`Arr::${match[1]}()\` in ${route.action}().`,
    })

    regex.lastIndex = closeParen + 1
  }
}

function resolveMethodParamName(params, index = 0) {
  const param = splitTopLevel(params).map((item) => item.trim()).filter(Boolean)[index]
  if (!param) {
    return ''
  }

  const match = param.match(/\$([A-Za-z_][A-Za-z0-9_]*)/)
  return match ? match[1] : ''
}

function collectSupportMethodBodies(controller, methodInfo, classIndex, sources, visited = new Set()) {
  const results = []
  const ownerKey = `${controller.className}:${methodInfo.name}`
  if (visited.has(ownerKey)) {
    return results
  }
  visited.add(ownerKey)

  const localMethodRegex = /\$this->([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*?)\)/g
  let localMatch
  while ((localMatch = localMethodRegex.exec(methodInfo.body))) {
    const helperName = localMatch[1]
    if (!/sanitize|validate/i.test(helperName)) {
      continue
    }

    const helperMethod = controller.methods.find((method) => method.name === helperName)
    if (!helperMethod) {
      continue
    }

    const args = splitTopLevel(localMatch[2])
    const sourceVariable = (args[0] || '').trim().match(/^\$([A-Za-z_][A-Za-z0-9_]*)$/)?.[1]
    const paramName = resolveMethodParamName(helperMethod.params, 0)
    const seedSource =
      sourceVariable && sources[sourceVariable]
        ? {
            [paramName]: {
              root: sources[sourceVariable].root,
              method: 'helper',
              callback: '',
              defaultValue: '',
            },
          }
        : {}

    results.push({ controller, method: helperMethod, sources: seedSource })
    results.push(...collectSupportMethodBodies(controller, helperMethod, classIndex, { ...sources, ...seedSource }, visited))
  }

  const staticMethodRegex = /([A-Za-z_\\][A-Za-z0-9_\\]*)::([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*?)\)/g
  let staticMatch
  while ((staticMatch = staticMethodRegex.exec(methodInfo.body))) {
    const className = staticMatch[1].split('\\').pop()
    const helperName = staticMatch[2]
    if (!/sanitize|validate/i.test(helperName)) {
      continue
    }

    const helperClass = classIndex.get(className) || classIndex.get(staticMatch[1])
    if (!helperClass) {
      continue
    }

    const helperMethods = extractMethods(helperClass.content)
    const helperMethod = helperMethods.find((method) => method.name === helperName)
    if (!helperMethod) {
      continue
    }

    const args = splitTopLevel(staticMatch[3])
    const sourceVariable = (args[0] || '').trim().match(/^\$([A-Za-z_][A-Za-z0-9_]*)$/)?.[1]
    const paramName = resolveMethodParamName(helperMethod.params, 0)
    const seedSource =
      sourceVariable && sources[sourceVariable]
        ? {
            [paramName]: {
              root: sources[sourceVariable].root,
              method: 'helper',
              callback: '',
              defaultValue: '',
            },
          }
        : {}

    const helperController = {
      className: className,
      file: helperClass.file,
      methods: helperMethods,
    }

    results.push({ controller: helperController, method: helperMethod, sources: seedSource })
    results.push(
      ...collectSupportMethodBodies(
        helperController,
        helperMethod,
        classIndex,
        { ...sources, ...seedSource },
        visited,
      ),
    )
  }

  return results
}

function parseRequestParams(route, methodInfo, controller, classIndex) {
  const pathParams = []
  const queryParams = []
  const bodyParams = []
  const sources = parseRequestVariableSources(methodInfo.body)
  const supportBodies = controller
    ? collectSupportMethodBodies(controller, methodInfo, classIndex, sources)
    : []
  const bodiesToParse = [
    { method: methodInfo, sources },
    ...supportBodies.map((entry) => ({
      ...entry,
      sources: parseRequestVariableSources(entry.method.body, entry.sources),
    })),
  ]
  const validations = bodiesToParse.flatMap((entry) => parseValidationRules(entry.method.body, entry.sources))

  for (const paramName of Array.from(route.routePath.matchAll(/\{([^}]+)\}/g)).map((match) => match[1])) {
    const constraint = route.constraints.find((item) => item.name === paramName)
    pathParams.push({
      name: paramName,
      in: 'path',
      required: true,
      schemaType: inferParamType(paramName, constraint, '', null),
      description: `${humanizeSlug(paramName)} extracted from the URL path.`,
    })
  }

  for (const entry of bodiesToParse) {
    for (const call of extractRequestMethodCalls(entry.method.body)) {
      if (call.method === 'all') {
        continue
      }

      const names = extractNamesFromRequestArg(call.args[0] || '')
      const callback = call.method === 'getSafe' ? stripQuotes(call.args[1] || '') : ''
      const defaultValue =
        call.method === 'getSafe'
          ? normalizeDefaultValue(call.args[2] || '')
          : normalizeDefaultValue(call.args[1] || '')

      for (const paramName of names) {
        if (!paramName || pathParams.find((item) => item.name === paramName)) {
          continue
        }

        const target =
          route.httpMethod === 'GET' && call.method !== 'file' && call.method !== 'files'
            ? queryParams
            : bodyParams
        mergeParameter(target, {
          name: paramName,
          in: target === queryParams ? 'query' : 'body',
          required: false,
          schemaType: inferParamType(paramName, null, '', defaultValue, call.method, callback),
          defaultValue,
          format: call.method === 'file' || call.method === 'files' ? 'binary' : undefined,
          description: `${humanizeSlug(paramName)} read via \`$request->${call.method}()\` in ${route.action}().`,
        })
      }
    }

    extractArrayAccessParams(route, entry.method, entry.sources, queryParams, bodyParams)
  }

  for (const validation of validations) {
    for (const [field, rules] of Object.entries(validation.rules)) {
      const name = validation.root && validation.root !== '@files' ? `${validation.root}.${field}` : field
      const target = route.httpMethod === 'GET' && validation.root !== '@files' ? queryParams : bodyParams

      mergeParameter(target, {
        name,
        in: target === queryParams ? 'query' : 'body',
        required: /\brequired\b/.test(rules),
        schemaType: inferParamType(name, null, rules, '', validation.root === '@files' ? 'files' : ''),
        format: validation.root === '@files' ? 'binary' : undefined,
        validation: rules,
        description: `${humanizeSlug(name)} validated in ${route.action}().`,
      })
    }
  }

  return {
    path: pathParams,
    query: queryParams,
    body: bodyParams,
    hasFileUpload: bodyParams.some((param) => param.format === 'binary'),
  }
}

function extractArrayLiteralAt(body, index) {
  const start = body.indexOf('[', index)
  if (start === -1) {
    return null
  }
  const end = scanBalanced(body, start, '[', ']')
  if (end === -1) {
    return null
  }
  return body.slice(start, end + 1)
}

function scanStatementEnd(text, startIndex) {
  let round = 0
  let square = 0
  let curly = 0
  let inSingle = false
  let inDouble = false
  let inTemplate = false
  let inLineComment = false
  let inBlockComment = false

  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false
      }
      continue
    }

    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false
        index += 1
      }
      continue
    }

    if (inSingle) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === "'") {
        inSingle = false
      }
      continue
    }

    if (inDouble) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '"') {
        inDouble = false
      }
      continue
    }

    if (inTemplate) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '`') {
        inTemplate = false
      }
      continue
    }

    if (char === '/' && next === '/') {
      inLineComment = true
      index += 1
      continue
    }

    if (char === '/' && next === '*') {
      inBlockComment = true
      index += 1
      continue
    }

    if (char === "'") {
      inSingle = true
      continue
    }

    if (char === '"') {
      inDouble = true
      continue
    }

    if (char === '`') {
      inTemplate = true
      continue
    }

    if (char === '(') round += 1
    if (char === ')') round -= 1
    if (char === '[') square += 1
    if (char === ']') square -= 1
    if (char === '{') curly += 1
    if (char === '}') curly -= 1

    if (char === ';' && round === 0 && square === 0 && curly === 0) {
      return index
    }
  }

  return -1
}

function extractAssignments(body) {
  const assignments = []
  const regex = /\$([A-Za-z_][A-Za-z0-9_]*)\s*=\s*/g
  let match

  while ((match = regex.exec(body))) {
    const start = regex.lastIndex
    const end = scanStatementEnd(body, start)
    if (end === -1) {
      continue
    }

    assignments.push({
      variableName: match[1],
      expression: body.slice(start, end).trim(),
      index: match.index,
    })

    regex.lastIndex = end + 1
  }

  return assignments
}

function dedupeValues(values) {
  return Array.from(new Set(values.filter((value) => value !== undefined && value !== null && value !== '')))
}

function buildDateTimeExample() {
  return '2026-01-01 00:00:00'
}

function buildPaginationExample(itemExample) {
  return {
    data: itemExample ? [itemExample] : [],
    current_page: 1,
    per_page: 10,
    from: itemExample ? 1 : 0,
    to: itemExample ? 1 : 0,
    total: itemExample ? 1 : 0,
    last_page: itemExample ? 1 : 0,
    has_more: false,
  }
}

function buildDynamicObjectExample(additionalProperties = { type: 'string' }) {
  const example = {}
  example[DYNAMIC_OBJECT_SCHEMA] = additionalProperties
  return example
}

function getValueAtPath(source, pathSegments = []) {
  let current = source

  for (const segment of pathSegments) {
    if (current == null || typeof current !== 'object' || !(segment in current)) {
      return undefined
    }
    current = current[segment]
  }

  return current
}

function buildFieldExample(name, cast = '', schemaType = '') {
  const field = name || ''
  const castValue = String(cast || '').toLowerCase()
  const schemaValue = String(schemaType || '').toLowerCase()
  const numericFieldPattern =
    /(^id$|_id$|(^|_)count$|(^|_)total$|(^|_)page$|(^|_)per_page$|(^|_)from$|(^|_)to$|(^|_)timestamp$|(^|_)priority$|(^|_)serial$|(^|_)score$)/

  if (castValue === 'array') {
    return []
  }
  if (/(bool|boolean)/.test(castValue) || /^(is_|has_|can_)/.test(field) || /^(is|has|can)[A-Z]/.test(field)) {
    return false
  }
  if (
    /(int|integer)/.test(castValue) ||
    schemaValue === 'integer' ||
    numericFieldPattern.test(field) ||
    field === 'created_by'
  ) {
    return 0
  }
  if (/(float|double|decimal)/.test(castValue) || /(execution_time|duration)/.test(field)) {
    return 0.123
  }
  if (
    /(json|object)/.test(castValue) ||
    schemaValue === 'serialized' ||
    /(^|_)(meta|settings|config|permissions|preview_data|custom_fields|social_links|lockscreen_config|route|pivot|errors|shakes)$/.test(field)
  ) {
    return {}
  }
  if (
    /(data|items|feeds|spaces|comments|notifications|members|lessons|courses|students|results|records|groups|links|topics|terms|options|badge_slugs|memberships|profile_navs|profile_nav_actions)$/.test(
      field,
    )
  ) {
    return []
  }
  if (/(created_at|updated_at|scheduled_at|expired_at|date|last_activity)/.test(field)) {
    return buildDateTimeExample()
  }
  if (/(rendered|html)$/.test(field)) {
    return '<p>...</p>'
  }
  if (/(avatar|logo|photo|image|featured_image|cover_photo|url|permalink|website|icon)/.test(field)) {
    return ''
  }
  if (/(message|title|description|type|privacy|status|slug|username|display_name|bio|role|action|provider|email|pref|name)$/.test(field)) {
    return ''
  }

  return ''
}

function buildModelExample(models, modelName, options = {}) {
  const primaryKey = resolveModelProperty(models, modelName, 'primaryKey') || 'id'
  const casts = resolveModelProperty(models, modelName, 'casts') || {}
  const schemaColumns =
    models[modelName]?.schema?.columns?.reduce((accumulator, column) => {
      accumulator[column.name] = guessColumnType(column.name)
      return accumulator
    }, {}) || {}
  const fields = dedupeValues([
    primaryKey,
    ...(options.fields || []),
    ...(options.includeAppends ? resolveModelProperty(models, modelName, 'appends') : []),
  ])
  const example = {}

  for (const field of fields) {
    example[field] = buildFieldExample(field, casts[field], schemaColumns[field])
  }

  return {
    ...example,
    ...(options.extraProps || {}),
  }
}

function buildSpaceBriefExample(models) {
  return buildModelExample(models, 'Space', {
    fields: ['id', 'title', 'slug', 'type', 'privacy'],
  })
}

function buildSpaceMembershipExample() {
  return {
    ID: 0,
    display_name: '',
    avatar: '',
    pivot: {
      role: 'member',
      status: 'active',
      created_at: buildDateTimeExample(),
    },
  }
}

function buildHeaderLinkExample() {
  return {
    title: '',
    route: {
      name: '',
    },
  }
}

function buildSpaceLinkSettingExample() {
  return {
    title: '',
    enabled: 'yes',
    new_tab: 'no',
    emoji: '',
    icon_image: '',
    shape_svg: '',
    permalink: '',
    slug: '',
    privacy: 'public',
    membership_ids: [],
  }
}

function buildMediaPreviewExample() {
  return {
    image: '',
    url: '',
    type: 'image',
    provider: '',
    content_type: '',
    title: '',
    author_name: '',
    html: '<p>...</p>',
    width: 0,
    height: 0,
    media_id: 0,
    player: '',
  }
}

function buildMediaItemExample() {
  return {
    url: '',
    type: 'image',
    media_id: 0,
    width: 0,
    height: 0,
    provider: 'uploader',
  }
}

function buildDocumentListItemExample() {
  return {
    id: 0,
    url: '',
    media_key: '',
    title: '',
    type: 'document',
  }
}

function buildSurveyOptionExample() {
  return {
    slug: '',
    title: '',
    vote_counts: 0,
    voted: false,
  }
}

function buildSurveyConfigExample() {
  return {
    type: 'single_choice',
    options: [buildSurveyOptionExample()],
    end_date: buildDateTimeExample(),
  }
}

function buildSocialLinksExample() {
  return {
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    fb: '',
    blue_sky: '',
    tiktok: '',
    pinterest: '',
    telegram: '',
    snapchat: '',
    reddit: '',
    twitch: '',
    vk: '',
    github: '',
    mastodon: '',
  }
}

function buildXProfileMetaExample() {
  return {
    website: '',
    cover_photo: '',
    badge_slug: [''],
    social_links: buildSocialLinksExample(),
  }
}

function buildFeedMetaExample() {
  return {
    preview_data: null,
    media_preview: buildMediaPreviewExample(),
    media_items: [buildMediaItemExample()],
    document_lists: [buildDocumentListItemExample()],
    document_ids: [buildDocumentListItemExample()],
    survey_config: buildSurveyConfigExample(),
    send_announcement_email: 'no',
    comments_disabled: 'no',
    mentioned_user_ids: [0],
    auto_flagged: 'no',
    reports_count: 0,
  }
}

function buildCommentMetaExample() {
  return {
    media_preview: buildMediaPreviewExample(),
    media_items: [buildMediaItemExample()],
    mentioned_user_ids: [0],
  }
}

function buildMediaSettingsExample() {
  return {
    src: '',
    title: '',
    original_name: '',
    width: 0,
    height: 0,
    provider: 'uploader',
    crossorigin: false,
    posterSrc: '',
    playerWidth: 0,
    brandColor: '',
    controlBarColor: '',
    aspectRatio: '',
  }
}

function buildSpaceSettingsExample(kind = 'space') {
  if (kind === 'space_group') {
    return {
      hide_members: 'no',
      always_show_spaces: 'yes',
    }
  }

  return {
    restricted_post_only: 'no',
    emoji: '',
    shape_svg: '',
    custom_lock_screen: 'no',
    can_request_join: 'no',
    layout_style: 'timeline',
    disable_layout_style: 'no',
    show_sidebar: 'yes',
    show_paywalls: 'no',
    og_image: '',
    links: [buildSpaceLinkSettingExample()],
    document_library: 'no',
    document_access: 'members_only',
    disable_post_sort_by: 'no',
    default_post_sort_by: '',
    default_comment_sort_by: '',
    document_upload: 'admin_only',
    topic_required: 'no',
    hide_members_count: 'no',
    onboard_redirect_url: '',
    members_page_status: 'members_only',
    cart_product_ids: [0],
  }
}

function buildLockscreenFieldExample(type = 'image') {
  if (type === 'block') {
    return {
      hidden: false,
      type: 'block',
      label: 'Description',
      name: 'description',
      content: '<p>Description</p>',
    }
  }

  return {
    hidden: false,
    type: 'image',
    label: type === 'action' ? 'Call to action' : 'Banner',
    name: type === 'action' ? 'action' : 'banner',
    heading: type === 'action' ? 'Call to Action Heading' : 'Banner Heading',
    heading_color: '#FFFFFF',
    description: type === 'action' ? 'Call to Action Description' : 'Banner Description',
    text_color: '#FFFFFF',
    button_text: 'Buy Now',
    button_link: '',
    button_color: '#2B2E33',
    button_text_color: '#FFFFFF',
    background_image: '',
    overlay_color: '#798398',
    new_tab: 'no',
  }
}

function buildLockscreenConfigExample() {
  return {
    showCustom: true,
    showPaywalls: false,
    canSendRequest: false,
    lockScreen: [
      buildLockscreenFieldExample('image'),
      buildLockscreenFieldExample('block'),
      buildLockscreenFieldExample('action'),
    ],
    redirect_url: '',
  }
}

function buildAccessSettingsExample() {
  return {
    acess_level: 'public',
    access_roles: [],
  }
}

function buildGeneralSettingsExample(options = {}) {
  const settings = {
    site_title: '',
    slug: 'portal',
    logo: '',
    white_logo: '',
    logo_permalink_type: 'default',
    logo_permalink: '',
    featured_image: '',
    access: buildAccessSettingsExample(),
    auth_form_type: 'default',
    explicit_registration: 'no',
    disable_global_posts: 'yes',
    auth_content: 'Please login first to access this page',
    auth_redirect: '',
    restricted_role_content:
      'Sorry, you cannot access this page. Only authorized users can access this page.',
    auth_url: '',
    cutsom_auth_url: '',
    use_custom_signup_page: 'no',
    custom_signup_url: '',
  }

  if (options.onboarding) {
    settings.has_fluentcrm = 'no'
    settings.has_fluentsmtp = 'no'
    settings.has_fluentcart = 'no'
    settings.template = ''
    settings.install_fluentcrm = 'yes'
    settings.install_fluentsmtp = 'yes'
    settings.install_fluentcart = 'yes'
    settings.subscribe_to_newsletter = 'yes'
    settings.share_data = 'no'
    settings.user_full_name = ''
    settings.user_email_address = ''
  }

  return settings
}

function buildAuthTermsFieldExample() {
  return {
    disabled: false,
    required: true,
    type: 'inline_checkbox',
    label: '',
    inline_label: '',
  }
}

function buildAuthSettingsExample() {
  return {
    login: {
      banner: {
        hidden: false,
        type: 'banner',
        position: 'left',
        logo: '',
        title: 'Welcome to Your Site',
        description: 'Join our community and start your journey to success',
        title_color: '#19283a',
        text_color: '#525866',
        background_image: '',
        background_color: '#F5F7FA',
      },
      form: {
        type: 'form',
        position: 'right',
        title: 'Login to Your Site',
        description: 'Enter your email and password to login',
        title_color: '#19283a',
        text_color: '#525866',
        button_label: 'Login',
        button_color: '#2B2E33',
        button_label_color: '#ffffff',
        background_image: '',
        background_color: '#ffffff',
      },
    },
    signup: {
      banner: {
        hidden: false,
        type: 'banner',
        position: 'left',
        logo: '',
        title: 'Welcome to Your Site',
        description: 'Join our community and start your journey to success',
        title_color: '#19283a',
        text_color: '#525866',
        background_image: '',
        background_color: '#F5F7FA',
      },
      form: {
        type: 'form',
        position: 'right',
        title: 'Sign Up to Your Site',
        description: 'Create an account to get started',
        button_label: 'Sign up',
        terms_label: '',
        title_color: '#19283a',
        text_color: '#525866',
        button_color: '#2B2E33',
        button_label_color: '#ffffff',
        background_image: '',
        background_color: '#ffffff',
        fields: {
          terms: buildAuthTermsFieldExample(),
        },
      },
    },
  }
}

function buildWelcomeBannerVideoExample() {
  return {
    type: 'oembed',
    url: '',
    content_type: '',
    provider: '',
    title: '',
    author_name: '',
    html: '',
  }
}

function buildWelcomeBannerCtaExample() {
  return {
    label: '',
    link: '',
    type: 'primary',
    newTab: 'no',
  }
}

function buildWelcomeBannerEntryExample(view = 'login', includeDescription = true, includeRendered = false) {
  const entry = {
    enabled: 'no',
    mediaType: 'image',
    bannerImage: '',
    bannerVideo: buildWelcomeBannerVideoExample(),
    ctaButtons: [buildWelcomeBannerCtaExample()],
  }

  if (includeDescription) {
    entry.description = ''
  }

  if (includeRendered) {
    entry.description_rendered = '<p>...</p>'
  }

  if (view === 'login') {
    entry.allowClose = 'no'
  } else {
    entry.useCustomUrl = 'no'
  }

  return entry
}

function buildWelcomeBannerSettingsExample(includeRendered = false) {
  return {
    login: buildWelcomeBannerEntryExample('login', true, includeRendered),
    logout: buildWelcomeBannerEntryExample('logout', true, includeRendered),
  }
}

function buildWelcomeBannerViewExample(view = 'login') {
  return buildWelcomeBannerEntryExample(view, false, false)
}

function buildStorageConfigExample() {
  return {
    driver: 'local',
    access_key: '',
    secret_key: '',
    bucket: '',
    public_url: '',
    endpoint_url: '',
    account_id: '',
    sub_folder: '',
    s3_endpoint: '',
  }
}

function buildCustomizationSettingsExample() {
  return {
    dark_mode: 'yes',
    fixed_page_header: 'yes',
    show_powered_by: 'yes',
    feed_link_on_sidebar: 'yes',
    show_post_modal: 'yes',
    fixed_sidebar: 'no',
    icon_on_header_menu: 'no',
    affiliate_id: '',
    rich_post_layout: 'classic',
    member_list_layout: 'classic',
    default_feed_layout: 'timeline',
    disable_feed_layout: 'no',
    post_title_pref: 'optional',
    max_media_per_post: 4,
    disable_feed_sort_by: 'no',
    default_feed_sort_by: '',
  }
}

function buildPrivacySettingsExample() {
  return {
    can_customize_username: 'no',
    can_change_email: 'no',
    show_last_activity: 'yes',
    can_deactive_account: 'no',
    email_auto_login: 'yes',
    enable_gravatar: 'yes',
    enable_user_sync: 'yes',
    members_page_status: 'everybody',
    profile_page_visibility: 'everybody',
    user_space_visibility: 'everybody',
    leaderboard_members_visibility: 'everybody',
  }
}

function buildColorSelectorGroupExample() {
  return {
    body: {
      primary_bg: '#FFFFFF',
      primary_border: '#E5E7EB',
      primary_text: '#111827',
      secondary_bg: '#F8FAFC',
      secondary_text: '#64748B',
    },
    fcom_top_menu: {
      primary_bg: '#FFFFFF',
      primary_border: '#E5E7EB',
      menu_text: '#475569',
      menu_text_active: '#111827',
      active_bg: '#F1F5F9',
      menu_bg_hover: '#F8FAFC',
      menu_text_hover: '#111827',
    },
    spaces: {
      primary_bg: '#FFFFFF',
      primary_border: '#E5E7EB',
      menu_text: '#475569',
      menu_text_hover: '#111827',
      menu_bg_hover: '#F8FAFC',
      menu_text_active: '#FFFFFF',
      active_bg: '#0F172A',
    },
  }
}

function buildColorConfigExample() {
  return {
    light_schema: 'default',
    dark_schema: 'default',
    light_config: buildColorSelectorGroupExample(),
    dark_config: buildColorSelectorGroupExample(),
    version: '1.0.0',
  }
}

function buildColorSchemasExample() {
  return {
    lightSkins: {
      default: {
        title: 'Default',
        selectors: buildColorSelectorGroupExample(),
      },
      custom: {
        title: 'Custom',
        selectors: buildColorSelectorGroupExample(),
      },
    },
    darkSkins: {
      default: {
        title: 'Default',
        selectors: buildColorSelectorGroupExample(),
      },
      custom: {
        title: 'Custom',
        selectors: buildColorSelectorGroupExample(),
      },
    },
  }
}

function buildFluentPlayerSettingsExample() {
  return {
    enable_fluent_player: 'no',
    skin: 'modern',
    brandColor: '#4a90e2',
    controlBarColor: '',
    controls: {
      play: true,
      volume: true,
      progress_bar: true,
      current_time: true,
      captions_toggle: true,
      playback_speed: true,
      settings: true,
      pip: true,
      fullscreen: true,
      backward: true,
      forward: true,
    },
    behaviors: {
      muted_autoplay: false,
      save_play_position: false,
      hide_top_controls: false,
      hide_center_controls: false,
      hide_bottom_controls: false,
      load_strategy: 'visible',
    },
    video_upload: 'no',
    video_upload_role: 'admin',
    play_embedded_videos: 'yes',
  }
}

function buildNotificationRouteExample() {
  return {
    name: 'space_feeds',
    params: {
      space: '',
    },
  }
}

function buildNotificationSubscriberExample(models) {
  return buildModelExample(models, 'NotificationSubscriber', {
    fields: ['id', ...resolveModelProperty(models, 'NotificationSubscriber', 'fillable'), 'created_at', 'updated_at'],
  })
}

function buildNotificationExample(models, options = {}) {
  const example = buildModelExample(models, 'Notification', {
    fields: ['id', ...resolveModelProperty(models, 'Notification', 'fillable'), 'created_at', 'updated_at'],
  })

  example.route = buildNotificationRouteExample()

  if (options.withXProfile) {
    example.xprofile = buildXProfilePublicExample(models)
  }

  if (options.withSubscriber) {
    example.subscriber = buildNotificationSubscriberExample(models)
  }

  return example
}

function buildCartPaywallExample() {
  return {
    ID: 0,
    post_title: '',
    post_status: 'publish',
    post_excerpt: '',
    thumbnail: '',
    view_url: '',
  }
}

function buildXProfilePublicExample(models) {
  const example = buildModelExample(models, 'XProfile', {
    fields: [...XPROFILE_PUBLIC_FIELDS, 'badge', 'permalink'],
  })

  example.meta = buildXProfileMetaExample()

  return example
}

function buildMediaExample(models) {
  const example = buildModelExample(models, 'Media', {
    fields: ['id', 'object_source', 'user_id', 'media_key', 'feed_id', 'sub_object_id', 'media_type', 'driver', 'media_path', 'media_url', 'settings', 'is_active', 'public_url'],
  })

  example.settings = buildMediaSettingsExample()

  return example
}

function buildReactionExample(models, options = {}) {
  const example = buildModelExample(models, 'Reaction', {
    fields: ['id', 'user_id', 'object_id', 'object_type', 'type', 'parent_id', 'created_at', 'updated_at'],
  })

  if (options.withXProfile) {
    example.xprofile = buildModelExample(models, 'XProfile', {
      fields: ['user_id', 'avatar', 'display_name'],
    })
  }

  return example
}

function buildCommentExample(models, options = {}) {
  const example = buildModelExample(models, 'Comment', {
    fields: dedupeValues([
      'id',
      ...resolveModelProperty(models, 'Comment', 'fillable'),
    ]),
  })

  example.meta = buildCommentMetaExample()

  if (options.withXProfile) {
    example.xprofile = buildXProfilePublicExample(models)
  }
  if (options.withMedia) {
    example.media = buildMediaExample(models)
  }
  if (options.withPost) {
    example.post = buildFeedPostSummaryExample(models)
  }
  if (options.withSpace) {
    example.space = buildSpaceBriefExample(models)
  }
  if (options.withReactions) {
    example.reactions = [buildReactionExample(models, { withXProfile: true })]
  }
  if (options.withLiked) {
    example.liked = 1
  }

  return example
}

function buildFeedPostSummaryExample(models) {
  return {
    ...buildModelExample(models, 'Feed', {
      fields: ['id', 'title', 'message', 'type', 'space_id', 'slug', 'created_at'],
    }),
    space: buildSpaceBriefExample(models),
  }
}

function buildFeedEditExample(models) {
  const example = {
    ...buildModelExample(models, 'Feed', {
      fields: dedupeValues([
        'id',
        ...resolveModelProperty(models, 'Feed', 'publicColumns'),
        'message',
        'message_rendered',
        'featured_image',
        'scheduled_at',
        'privacy',
      ]),
      includeAppends: true,
    }),
    topic_ids: [],
    send_announcement_email: 'yes',
    survey: {
      type: '',
      options: [
        {
          slug: '',
          title: '',
          vote_counts: 0,
        },
      ],
      end_date: buildDateTimeExample(),
    },
    document_ids: [
      {
        id: 0,
        url: '',
        media_key: '',
        title: '',
        type: 'document',
      },
    ],
    media_images: [
      {
        url: '',
        type: 'image',
        media_id: 0,
        width: 0,
        height: 0,
        provider: 'uploader',
      },
    ],
    media: {
      image: '',
      type: 'oembed',
      provider: '',
      html: '<p>...</p>',
      media_id: 0,
      width: 0,
      height: 0,
    },
    space: buildSpaceBriefExample(models),
  }

  example.meta = buildFeedMetaExample()

  return example
}

function buildFeedExample(models, options = {}) {
  const example = buildModelExample(models, 'Feed', {
    fields: dedupeValues([
      'id',
      ...resolveModelProperty(models, 'Feed', 'publicColumns'),
      ...resolveModelProperty(models, 'Feed', 'appends'),
    ]),
  })

  example.meta = buildFeedMetaExample()

  if (options.withXProfile !== false) {
    example.xprofile = buildXProfilePublicExample(models)
  }
  if (options.withSpace !== false) {
    example.space = buildSpaceBriefExample(models)
  }
  if (options.withComments !== false) {
    example.comments = [buildCommentExample(models, { withXProfile: true, withLiked: true })]
  }
  if (options.withReactions !== false) {
    example.reactions = [buildReactionExample(models, { withXProfile: true })]
  }
  if (options.withTerms !== false) {
    example.terms = [
      {
        title: '',
        slug: '',
      },
    ]
  }

  example.has_user_react = false
  example.bookmarked = false
  example.default_comment_sort_by = ''

  return example
}

function buildSpaceExample(models, options = {}) {
  const example = buildModelExample(models, 'Space', {
    fields: dedupeValues([
      'id',
      ...resolveModelProperty(models, 'BaseSpace', 'fillable'),
      'created_at',
      'updated_at',
    ]),
  })

  example.settings = buildSpaceSettingsExample('space')

  if (options.formatted) {
    example.permissions = {
      can_view_info: true,
      can_view_posts: true,
      can_view_members: false,
      can_create_post: false,
    }
    example.description_rendered = '<p>...</p>'
    example.membership = buildSpaceMembershipExample()
    example.topics = [
      {
        id: 0,
        title: '',
        slug: '',
      },
    ]
    example.header_links = [buildHeaderLinkExample()]
    example.lockscreen_config = buildLockscreenConfigExample()
  }

  if (options.withMembersCount) {
    example.members_count = 0
  }

  return example
}

function buildSpaceGroupExample(models, options = {}) {
  const example = buildModelExample(models, 'SpaceGroup', {
    fields: dedupeValues([
      'id',
      ...resolveModelProperty(models, 'BaseSpace', 'fillable'),
      'created_at',
      'updated_at',
    ]),
  })

  example.settings = buildSpaceSettingsExample('space_group')

  if (options.withSpaces) {
    example.spaces = [buildSpaceExample(models, { formatted: true, withMembersCount: true })]
  }

  return example
}

function buildSpaceUserPivotExample(models, options = {}) {
  const example = buildModelExample(models, 'SpaceUserPivot', {
    fields: dedupeValues(['id', ...resolveModelProperty(models, 'SpaceUserPivot', 'fillable'), 'created_at', 'updated_at']),
  })

  example.meta = buildDynamicObjectExample()

  if (options.withXProfile) {
    example.xprofile = buildXProfilePublicExample(models)
  }

  return example
}

function buildProfileViewExample() {
  return {
    user_id: 0,
    is_verified: false,
    display_name: '',
    username: '',
    avatar: '',
    cover_photo: '',
    total_points: 0,
    badge_slugs: [''],
    status: '',
    is_restricted: false,
    canViewUserSpaces: false,
    last_activity: buildDateTimeExample(),
    website: '',
    created_at: buildDateTimeExample(),
    social_links: buildSocialLinksExample(),
    compilation_score: 0,
    short_description_rendered: '<p>...</p>',
    email: '',
    first_name: '',
    last_name: '',
    short_description: '',
    can_change_username: false,
    can_change_email: false,
    profile_navs: [
      {
        slug: '',
        title: '',
        url: '',
        wrapper_class: '',
        route: {
          name: '',
        },
      },
    ],
    profile_nav_actions: [],
  }
}

function normalizeRelationName(value) {
  const trimmed = stripQuotes(String(value || '').trim())
  return trimmed.replace(/^\./, '').replace(/\.$/, '')
}

function extractRelationPathsFromCallback(callbackValue, prefix = '') {
  const relations = []
  const regex = /->(?:with|load)\s*\(/g
  let match

  while ((match = regex.exec(callbackValue))) {
    const openParen = callbackValue.indexOf('(', match.index)
    const closeParen = scanBalanced(callbackValue, openParen, '(', ')')
    if (closeParen === -1) {
      continue
    }

    const args = splitTopLevel(callbackValue.slice(openParen + 1, closeParen))
    relations.push(...extractRelationPathsFromWithArg(args[0] || '', prefix))
    regex.lastIndex = closeParen + 1
  }

  return dedupeValues(relations)
}

function extractRelationPathsFromWithArg(argument, prefix = '') {
  const trimmed = argument.trim()
  if (!trimmed) {
    return []
  }

  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    const relation = normalizeRelationName(trimmed)
    return relation ? [prefix ? `${prefix}.${relation}` : relation] : []
  }

  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return []
  }

  const relations = []
  for (const entry of parsePhpArrayLiteral(trimmed)) {
    const relationName = normalizeRelationName(entry.key || entry.value)
    if (!relationName) {
      continue
    }

    const fullRelation = prefix ? `${prefix}.${relationName}` : relationName
    relations.push(fullRelation)

    if (entry.key && /function\s*\(/.test(entry.value)) {
      relations.push(...extractRelationPathsFromCallback(entry.value, fullRelation))
    }
  }

  return dedupeValues(relations)
}

function extractRelationPathsFromExpression(expression) {
  const relations = []
  const regex = /->(?:with|load)\s*\(/g
  let match

  while ((match = regex.exec(expression))) {
    const openParen = expression.indexOf('(', match.index)
    const closeParen = scanBalanced(expression, openParen, '(', ')')
    if (closeParen === -1) {
      continue
    }

    const args = splitTopLevel(expression.slice(openParen + 1, closeParen))
    relations.push(...extractRelationPathsFromWithArg(args[0] || ''))
    regex.lastIndex = closeParen + 1
  }

  return dedupeValues(relations)
}

function extractTopLevelMethodArguments(expression, methodName) {
  const methodToken = `->${methodName}(`
  const calls = []
  let round = 0
  let square = 0
  let curly = 0
  let inSingle = false
  let inDouble = false
  let inTemplate = false
  let inLineComment = false
  let inBlockComment = false

  for (let index = 0; index < expression.length; index += 1) {
    const char = expression[index]
    const next = expression[index + 1]

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false
      }
      continue
    }

    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false
        index += 1
      }
      continue
    }

    if (inSingle) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === "'") {
        inSingle = false
      }
      continue
    }

    if (inDouble) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '"') {
        inDouble = false
      }
      continue
    }

    if (inTemplate) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '`') {
        inTemplate = false
      }
      continue
    }

    if (char === '/' && next === '/') {
      inLineComment = true
      index += 1
      continue
    }

    if (char === '/' && next === '*') {
      inBlockComment = true
      index += 1
      continue
    }

    if (char === "'") {
      inSingle = true
      continue
    }

    if (char === '"') {
      inDouble = true
      continue
    }

    if (char === '`') {
      inTemplate = true
      continue
    }

    if (char === '(') round += 1
    if (char === ')') round -= 1
    if (char === '[') square += 1
    if (char === ']') square -= 1
    if (char === '{') curly += 1
    if (char === '}') curly -= 1

    if (round === 0 && square === 0 && curly === 0 && expression.slice(index, index + methodToken.length) === methodToken) {
      const openParen = index + methodToken.length - 1
      const closeParen = scanBalanced(expression, openParen, '(', ')')
      if (closeParen === -1) {
        continue
      }

      calls.push(expression.slice(openParen + 1, closeParen))
      index = closeParen
    }
  }

  return calls
}

function extractSelectFieldsFromExpression(expression, className, models) {
  let selectedFields = []
  for (const callArgs of extractTopLevelMethodArguments(expression, 'select')) {
    const args = splitTopLevel(callArgs)
    const firstArg = (args[0] || '').trim()

    if (/\$publicColumns\b/.test(firstArg)) {
      selectedFields = resolveModelProperty(models, className, 'publicColumns')
    } else if (/ProfileHelper::getXProfilePublicFields\(\)/.test(firstArg)) {
      selectedFields = XPROFILE_PUBLIC_FIELDS
    } else if (firstArg.startsWith('[') && firstArg.endsWith(']')) {
      selectedFields = parsePhpArrayLiteral(firstArg).map((entry) => stripQuotes(entry.value))
    }
  }

  return dedupeValues(selectedFields)
}

function inferModelDescriptorFromExpression(expression, models) {
  const trimmed = expression.trim()
  if (!trimmed) {
    return null
  }

  if (/->count\s*\(/.test(trimmed)) {
    return { kind: 'value', type: 'integer' }
  }

  const transformedFeedMatch = trimmed.match(/^FeedsHelper::transformFeed\(\s*\$[A-Za-z_][A-Za-z0-9_]*\s*\)$/)
  if (transformedFeedMatch) {
    return { kind: 'model', type: 'feed_transform' }
  }

  const transformForEditMatch = trimmed.match(/^FeedsHelper::transformForEdit\(\s*\$[A-Za-z_][A-Za-z0-9_]*\s*\)$/)
  if (transformForEditMatch) {
    return { kind: 'model', type: 'feed_edit' }
  }

  const transformedFeedsMatch = trimmed.match(/^FeedsHelper::transformFeedsCollection\(\s*\$[A-Za-z_][A-Za-z0-9_]*\s*\)$/)
  if (transformedFeedsMatch) {
    return { kind: 'collection', type: 'feed_transform' }
  }

  const formattedSpaceMatch = trimmed.match(/^\$[A-Za-z_][A-Za-z0-9_]*->formatSpaceData\(/)
  if (formattedSpaceMatch) {
    return { kind: 'model', type: 'space_formatted' }
  }

  const classMatch = trimmed.match(/([A-Za-z_\\][A-Za-z0-9_\\]*)::/)
  if (!classMatch) {
    return null
  }

  const className = classMatch[1].split('\\').pop()
  if (!models[className]) {
    return null
  }

  const relations = extractRelationPathsFromExpression(trimmed)
  const selectedFields = extractSelectFieldsFromExpression(trimmed, className, models)
  const pluckMatch = trimmed.match(/->pluck\(\s*['"]([^'"]+)['"]/)
  if (pluckMatch) {
    return {
      kind: 'collection',
      type: 'scalar',
      scalarField: stripQuotes(pluckMatch[1]),
    }
  }

  if (/->paginate\(/.test(trimmed)) {
    return { kind: 'pagination', type: 'model', modelName: className, relations, selectedFields }
  }
  if (/->get\(/.test(trimmed)) {
    return { kind: 'collection', type: 'model', modelName: className, relations, selectedFields }
  }

  return { kind: 'model', type: 'model', modelName: className, relations, selectedFields }
}

function inferExampleFromName(name) {
  if (!name) {
    return null
  }

  if (/^(is_|has_|can_)/.test(name) || /^(is|has|can)[A-Z]/.test(name)) {
    return false
  }
  if (
    /(^id$|_id$|(^|_)count$|(^|_)total$|(^|_)page$|(^|_)per_page$|(^|_)from$|(^|_)to$|(^|_)timestamp$|(^|_)priority$|(^|_)serial$|(^|_)score$)/.test(
      name,
    ) ||
    name === 'created_by'
  ) {
    return 0
  }
  if (/(execution_time|duration)/.test(name)) {
    return 0.123
  }
  if (
    /(data|items|feeds|spaces|comments|notifications|members|lessons|courses|students|results|records|groups|links|topics|terms|options|badge_slugs|memberships|profile_navs|profile_nav_actions)$/.test(
      name,
    )
  ) {
    return []
  }
  if (
    /(^|_)(meta|settings|config|permissions|preview_data|custom_fields|social_links|lockscreen_config|route|pivot|errors|shakes)$/.test(
      name,
    )
  ) {
    return {}
  }
  if (/(rendered|html)$/.test(name)) {
    return '<p>...</p>'
  }
  if (/(created_at|updated_at|scheduled_at|expired_at|date|last_activity)/.test(name)) {
    return buildDateTimeExample()
  }
  if (/(avatar|logo|photo|image|featured_image|cover_photo|url|permalink|website|icon)/.test(name)) {
    return ''
  }
  if (/(message|slug|title|description|type|privacy|status|route|action|username|display_name|bio|role|provider|email|name|pref)$/.test(name)) {
    return ''
  }

  return null
}

function buildDescriptorExample(descriptor, models) {
  if (!descriptor) {
    return null
  }

  if (descriptor.kind === 'value' && descriptor.type === 'integer') {
    return 0
  }

  if (descriptor.type === 'scalar') {
    return [buildFieldExample(descriptor.scalarField)]
  }

  let itemExample = null

  if (descriptor.type === 'feed_transform') {
    itemExample = buildFeedExample(models)
  } else if (descriptor.type === 'feed_edit') {
    itemExample = buildFeedEditExample(models)
  } else if (descriptor.type === 'space_formatted') {
    itemExample = buildSpaceExample(models, { formatted: true, withMembersCount: false })
  } else if (descriptor.modelName === 'Feed') {
    itemExample = buildModelExample(models, 'Feed', {
      fields: dedupeValues(['id', ...(descriptor.selectedFields || resolveModelProperty(models, 'Feed', 'publicColumns'))]),
      includeAppends: true,
    })

    if ((descriptor.relations || []).includes('xprofile')) {
      itemExample.xprofile = buildXProfilePublicExample(models)
    }
    if ((descriptor.relations || []).includes('space')) {
      itemExample.space = buildSpaceBriefExample(models)
    }
    if ((descriptor.relations || []).includes('comments')) {
      itemExample.comments = [
        buildCommentExample(models, {
          withXProfile: (descriptor.relations || []).includes('comments.xprofile'),
        }),
      ]
    }
    if ((descriptor.relations || []).includes('reactions')) {
      itemExample.reactions = [
        buildReactionExample(models, {
          withXProfile: (descriptor.relations || []).includes('reactions.xprofile'),
        }),
      ]
    }
    if ((descriptor.relations || []).includes('terms')) {
      itemExample.terms = [
        {
          title: '',
          slug: '',
        },
      ]
    }
  } else if (descriptor.modelName === 'Comment') {
    itemExample = buildCommentExample(models, {
      withXProfile: (descriptor.relations || []).includes('xprofile'),
      withMedia: (descriptor.relations || []).includes('media'),
      withPost: (descriptor.relations || []).includes('post'),
      withReactions: (descriptor.relations || []).includes('reactions'),
    })
  } else if (descriptor.modelName === 'Space') {
    itemExample = buildSpaceExample(models, {
      formatted: (descriptor.relations || []).length > 0,
      withMembersCount: false,
    })
  } else if (descriptor.modelName === 'SpaceGroup') {
    itemExample = buildSpaceGroupExample(models, {
      withSpaces: (descriptor.relations || []).includes('spaces'),
    })
  } else if (descriptor.modelName === 'SpaceUserPivot') {
    itemExample = buildSpaceUserPivotExample(models, {
      withXProfile: (descriptor.relations || []).includes('xprofile'),
    })
  } else if (descriptor.modelName === 'XProfile') {
    itemExample = buildModelExample(models, 'XProfile', {
      fields: dedupeValues(['user_id', ...(descriptor.selectedFields || resolveModelProperty(models, 'XProfile', 'fillable')), ...resolveModelProperty(models, 'XProfile', 'appends')]),
    })
    itemExample.meta = buildXProfileMetaExample()
  } else if (descriptor.modelName === 'Reaction') {
    itemExample = buildReactionExample(models, {
      withXProfile: (descriptor.relations || []).includes('xprofile'),
    })
  } else if (descriptor.modelName === 'Media') {
    itemExample = buildMediaExample(models)
  } else if (descriptor.modelName === 'Notification') {
    itemExample = buildNotificationExample(models, {
      withXProfile: (descriptor.relations || []).includes('xprofile'),
      withSubscriber: (descriptor.relations || []).includes('subscriber'),
    })
  } else if (descriptor.modelName === 'NotificationSubscriber') {
    itemExample = buildNotificationSubscriberExample(models)
  } else {
    itemExample = buildModelExample(models, descriptor.modelName, {
      fields: dedupeValues([
        resolveModelProperty(models, descriptor.modelName, 'primaryKey') || 'id',
        ...(descriptor.selectedFields || resolveModelProperty(models, descriptor.modelName, 'fillable')),
        ...resolveModelProperty(models, descriptor.modelName, 'appends'),
      ]),
    })
  }

  if (descriptor.kind === 'pagination') {
    return buildPaginationExample(itemExample)
  }
  if (descriptor.kind === 'collection') {
    return itemExample ? [itemExample] : []
  }

  return itemExample
}

function parseArrGetExpression(expression) {
  const objectPrefixMatch = expression.match(/^\(object\)\s*/)
  const normalized = objectPrefixMatch ? expression.slice(objectPrefixMatch[0].length).trim() : expression.trim()

  if (!normalized.startsWith('Arr::get(')) {
    return null
  }

  const openParen = normalized.indexOf('(')
  const closeParen = scanBalanced(normalized, openParen, '(', ')')
  if (closeParen === -1) {
    return null
  }

  const args = splitTopLevel(normalized.slice(openParen + 1, closeParen))
  return {
    castObject: Boolean(objectPrefixMatch),
    source: args[0] || '',
    path: stripQuotes(args[1] || ''),
    defaultValue: args[2] || '',
  }
}

function inferValueFromPropertyChain(value, context, key, models) {
  if (/->format\(/.test(value)) {
    return buildDateTimeExample()
  }
  if (/->(?:getPermalink|getIconMark)\(/.test(value)) {
    return ''
  }
  if (/->getCompletionScore\(/.test(value)) {
    return 0
  }
  if (/->isVerified\(/.test(value)) {
    return false
  }
  if (/->count\(/.test(value)) {
    return 0
  }

  const chainMatch = value.match(/^\$([A-Za-z_][A-Za-z0-9_]*)(?:->([A-Za-z_][A-Za-z0-9_]*))+$/)
  if (!chainMatch) {
    return undefined
  }

  const variableName = chainMatch[1]
  const propertyPath = value
    .replace(/^\$[A-Za-z_][A-Za-z0-9_]*/, '')
    .split('->')
    .filter(Boolean)
  const existing = getValueAtPath(context[variableName], propertyPath)
  if (existing !== undefined) {
    return existing
  }

  return inferExampleFromName(key || propertyPath[propertyPath.length - 1], models)
}

function inferValueFromExpression(rawValue, context = {}, key = '', models = {}) {
  const value = rawValue.trim()
  if (!value) {
    return inferExampleFromName(key)
  }

  const descriptor = inferModelDescriptorFromExpression(value, models)
  if (descriptor) {
    return buildDescriptorExample(descriptor, models)
  }

  if (value.startsWith('[') && value.endsWith(']')) {
    return arrayEntriesToShape(value, context, models)
  }

  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith('`') && value.endsWith('`'))
  ) {
    return stripQuotes(value)
  }

  if (/^(true|false)$/i.test(value)) {
    return value.toLowerCase() === 'true'
  }

  if (/^null$/i.test(value)) {
    return null
  }

  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value)
  }

  const translationMatch =
    value.match(/(?:esc_html__|__)\('([^']+)'/) ||
    value.match(/(?:esc_html__|__)\("([^"]+)"/)
  if (translationMatch) {
    return translationMatch[1]
  }

  if (value.startsWith('apply_filters(')) {
    const openParen = value.indexOf('(')
    const closeParen = scanBalanced(value, openParen, '(', ')')
    if (closeParen !== -1) {
      const args = splitTopLevel(value.slice(openParen + 1, closeParen))
      return inferValueFromExpression(args[1] || args[0] || '', context, key, models)
    }
  }

  if (value.startsWith('wp_parse_args(')) {
    const openParen = value.indexOf('(')
    const closeParen = scanBalanced(value, openParen, '(', ')')
    if (closeParen !== -1) {
      const args = splitTopLevel(value.slice(openParen + 1, closeParen))
      const primary = inferValueFromExpression(args[0] || '', context, key, models)
      const defaults = inferValueFromExpression(args[1] || '', context, key, models)
      if (primary && defaults && typeof primary === 'object' && typeof defaults === 'object') {
        return { ...defaults, ...primary }
      }
      return primary || defaults
    }
  }

  if (/^current_time\('timestamp'/.test(value)) {
    return 0
  }

  if (/^microtime\(true\)/.test(value)) {
    return 0.123
  }

  if (/^current_time\(['"]mysql['"]/.test(value)) {
    return buildDateTimeExample()
  }

  if (/wpautop\(|mdToHtml\(|wp_kses_post\(/.test(value)) {
    return '<p>...</p>'
  }

  if (/Helper::baseUrl\(|sanitize_url\(|esc_url\(|getPermalink\(|getIconMark\(/.test(value)) {
    return ''
  }

  if (/ProfileHelper::canViewUserSpaces\(/.test(value)) {
    return false
  }

  if (/\(object\)\s*Arr::get\(/.test(value) || /^Arr::get\(/.test(value)) {
    const arrGet = parseArrGetExpression(value)
    if (arrGet) {
      const sourceValue = inferValueFromExpression(arrGet.source, context, key, models)
      const pathSegments = arrGet.path ? arrGet.path.split('.') : []
      const resolvedValue = getValueAtPath(sourceValue, pathSegments)
      if (resolvedValue !== undefined) {
        return resolvedValue
      }

      if (arrGet.defaultValue) {
        const defaultValue = inferValueFromExpression(
          arrGet.defaultValue,
          context,
          pathSegments[pathSegments.length - 1] || key,
          models,
        )
        return arrGet.castObject && Array.isArray(defaultValue) ? {} : defaultValue
      }

      const fallback = inferExampleFromName(pathSegments[pathSegments.length - 1] || key)
      return arrGet.castObject && Array.isArray(fallback) ? {} : fallback
    }
  }

  const variableMatch = value.match(/^\$([A-Za-z_][A-Za-z0-9_]*)$/)
  if (variableMatch) {
    const variableName = variableMatch[1]
    return context[variableName] !== undefined ? context[variableName] : inferExampleFromName(variableName)
  }

  const propertyValue = inferValueFromPropertyChain(value, context, key, models)
  if (propertyValue !== undefined) {
    return propertyValue
  }

  if (/->paginate\(/.test(value)) {
    return buildPaginationExample(null)
  }

  if (/->get\(/.test(value) || /pluck\(/.test(value) || /transformFeedsCollection\(/.test(value)) {
    return []
  }

  if (/->first\(/.test(value) || /->find/.test(value) || /->create\(/.test(value)) {
    return {}
  }

  if (/wpautop\(/.test(value)) {
    return '<p>...</p>'
  }

  return inferExampleFromName(key || value.replace(/^\$/, ''))
}

function buildResponseContext(body, models) {
  const context = {}
  const includeMembersCount = body.includes('members_count')

  for (const assignment of extractAssignments(body)) {
    if (context[assignment.variableName] !== undefined && assignment.expression.startsWith('[')) {
      continue
    }

    const descriptor = inferModelDescriptorFromExpression(assignment.expression, models)
    if (descriptor) {
      context[assignment.variableName] = buildDescriptorExample(descriptor, models)
      continue
    }

    context[assignment.variableName] = inferValueFromExpression(
      assignment.expression,
      context,
      assignment.variableName,
      models,
    )
  }

  if (body.includes('$this->loadCommentRelations($comment)')) {
    context.comment = buildCommentExample(models, { withXProfile: true, withMedia: true })
  }

  if (body.includes('formatSpaceData(')) {
    for (const [key, value] of Object.entries(context)) {
      if (Array.isArray(value) && key.toLowerCase().includes('space')) {
        context[key] = [buildSpaceExample(models, { formatted: true, withMembersCount: includeMembersCount })]
      } else if (
        value &&
        typeof value === 'object' &&
        'data' in value &&
        Array.isArray(value.data) &&
        key.toLowerCase().includes('space')
      ) {
        context[key] = buildPaginationExample(
          buildSpaceExample(models, { formatted: true, withMembersCount: includeMembersCount }),
        )
      } else if (value && typeof value === 'object' && key.toLowerCase().includes('space')) {
        context[key] = buildSpaceExample(models, { formatted: true, withMembersCount: includeMembersCount })
      }
    }
  } else if (includeMembersCount) {
    for (const [key, value] of Object.entries(context)) {
      if (Array.isArray(value) && key.toLowerCase().includes('space')) {
        context[key] = [buildSpaceExample(models, { withMembersCount: true })]
      } else if (
        value &&
        typeof value === 'object' &&
        'data' in value &&
        Array.isArray(value.data) &&
        key.toLowerCase().includes('space')
      ) {
        context[key] = buildPaginationExample(buildSpaceExample(models, { withMembersCount: true }))
      }
    }
  }

  return context
}

function arrayEntriesToShape(arrayLiteral, context = {}, models = {}) {
  const entries = parsePhpArrayLiteral(arrayLiteral)
  const hasKeys = entries.some((entry) => entry.key)

  if (!hasKeys) {
    return entries.map((entry, index) =>
      inferValueFromExpression(entry.value, context, `item_${index + 1}`, models),
    )
  }

  const shape = {}
  for (const entry of entries) {
    if (!entry.key) {
      continue
    }
    shape[stripQuotes(entry.key)] = inferValueFromExpression(
      entry.value,
      context,
      stripQuotes(entry.key),
      models,
    )
  }

  return shape
}

function inferExampleValue(key, rawValue = '') {
  const value = rawValue.trim()

  if (value.startsWith('[')) {
    return []
  }

  if (/true|false/.test(value) || key.startsWith('is_') || key.startsWith('has_')) {
    return false
  }

  if (/count|total|page|per_page|from|to|timestamp|id$|_id$|priority|serial/.test(key)) {
    return 0
  }

  if (/(data|items|feeds|spaces|comments|notifications|members|lessons|courses|students)/.test(key)) {
    return []
  }

  if (/(settings|config|meta|space|feed|comment|notification|profile)/.test(key)) {
    return {}
  }

  if (key.includes('message')) {
    return 'Success'
  }

  if (key.includes('execution_time')) {
    return 0.123
  }

  return null
}

function extractThrownValidationErrors(methodInfos) {
  const errors = []

  for (const methodInfo of methodInfos) {
    for (const match of Array.from(
      methodInfo.body.matchAll(/throw new \\?Exception\s*\(([\s\S]*?)\)\s*;/g),
    )) {
      const messageArg = match[1] || ''
      const message =
        messageArg.match(/(?:esc_html__|__)\('([^']+)'/)?.[1] ||
        messageArg.match(/(?:esc_html__|__)\("([^"]+)"/)?.[1] ||
        stripQuotes(messageArg)

      if (message && !errors.find((item) => item.status === 422 && item.message === message)) {
        errors.push({ status: 422, message })
      }
    }
  }

  return errors
}

function extractResponseShape(methodInfo, models, route = null) {
  if (route?.module === 'profile' && route?.slug === 'get-profile') {
    return {
      profile: buildProfileViewExample(),
    }
  }

  const routeKey = route ? `${route.module}/${route.slug}` : ''
  const routeSpecificResponses = {
    'admin/get-general-settings': {
      settings: buildGeneralSettingsExample(),
      user_roles: {
        subscriber: 'Subscriber',
        contributor: 'Contributor',
        author: 'Author',
        editor: 'Editor',
      },
      users_can_register: false,
      user_registration_enable_url: '',
    },
    'admin/get-auth-settings': {
      settings: buildAuthSettingsExample(),
    },
    'admin/get-onboarding-settings': {
      settings: buildGeneralSettingsExample({ onboarding: true }),
    },
    'admin/get-admin-welcome-banner': {
      settings: buildWelcomeBannerSettingsExample(),
    },
    'admin/save-admin-welcome-banner': {
      message: 'Welcome banner settings have been updated successfully',
      settings: buildWelcomeBannerSettingsExample(true),
    },
    'admin/get-storage-settings': {
      config: buildStorageConfigExample(),
    },
    'settings/get-customization-settings': {
      settings: buildCustomizationSettingsExample(),
    },
    'settings/get-privacy-settings': {
      settings: buildPrivacySettingsExample(),
    },
    'settings/get-color-config': {
      config: buildColorConfigExample(),
      schemas: buildColorSchemasExample(),
    },
    'settings/get-fluent-player-settings': {
      settings: buildFluentPlayerSettingsExample(),
    },
    'feeds/get-welcome-banner': {
      welcome_banner: buildWelcomeBannerViewExample('login'),
    },
    'cart/create-space-paywall': {
      message: 'Paywall has been added',
      paywall: buildCartPaywallExample(),
    },
  }

  if (routeSpecificResponses[routeKey]) {
    return routeSpecificResponses[routeKey]
  }

  const body = methodInfo.body
  const context = buildResponseContext(body, models)

  let bestCandidate = null
  const returnRegex = /return\s+/g
  let match

  while ((match = returnRegex.exec(body))) {
    if (body.startsWith('return $this->sendError', match.index)) {
      continue
    }

    if (body.startsWith('return apply_filters(', match.index)) {
      const openParen = body.indexOf('(', match.index)
      const closeParen = scanBalanced(body, openParen, '(', ')')
      if (closeParen !== -1) {
        const args = splitTopLevel(body.slice(openParen + 1, closeParen))
        bestCandidate = args[1] || args[0] || ''
        returnRegex.lastIndex = closeParen + 1
        continue
      }
    }

    const semicolonIndex = body.indexOf(';', match.index)
    if (semicolonIndex !== -1) {
      bestCandidate = body.slice(match.index + 7, semicolonIndex).trim()
      returnRegex.lastIndex = semicolonIndex + 1
    }
  }

  if (!bestCandidate) {
    return { message: 'Success' }
  }

  if (bestCandidate.startsWith('[')) {
    return arrayEntriesToShape(bestCandidate, context, models)
  }

  return inferValueFromExpression(bestCandidate, context, '', models)
}

function extractErrorResponses(methodInfo, supportMethods = []) {
  const errors = []
  const methods = [methodInfo, ...supportMethods]

  for (const method of methods) {
    const body = method.body
    const regex = /sendError\s*\(/g
    let match

    while ((match = regex.exec(body))) {
      const openParen = body.indexOf('(', match.index)
      const closeParen = scanBalanced(body, openParen, '(', ')')
      if (closeParen === -1) {
        continue
      }

      const args = splitTopLevel(body.slice(openParen + 1, closeParen))
      const messageArg = args[0] || ''
      const statusArg = args[1] ? Number.parseInt(args[1], 10) : 422
      let message = 'Error response'

      if (/__\('([^']+)'/.test(messageArg)) {
        message = messageArg.match(/__\('([^']+)'/)?.[1] || message
      } else if (/esc_html__\('([^']+)'/.test(messageArg)) {
        message = messageArg.match(/esc_html__\('([^']+)'/)?.[1] || message
      } else if (/['"]message['"]\s*=>\s*__\('([^']+)'/.test(messageArg)) {
        message = messageArg.match(/['"]message['"]\s*=>\s*__\('([^']+)'/)?.[1] || message
      } else if (/['"]message['"]\s*=>\s*['"]([^'"]+)['"]/.test(messageArg)) {
        message = messageArg.match(/['"]message['"]\s*=>\s*['"]([^'"]+)['"]/)?.[1] || message
      } else if (
        (messageArg.startsWith("'") && messageArg.endsWith("'")) ||
        (messageArg.startsWith('"') && messageArg.endsWith('"'))
      ) {
        message = stripQuotes(messageArg)
      }

      if (!errors.find((item) => item.status === statusArg && item.message === message)) {
        errors.push({ status: Number.isNaN(statusArg) ? 422 : statusArg, message })
      }

      regex.lastIndex = closeParen + 1
    }
  }

  for (const error of extractThrownValidationErrors(methods)) {
    if (!errors.find((item) => item.status === error.status && item.message === error.message)) {
      errors.push(error)
    }
  }

  if (!errors.length) {
    errors.push({ status: 422, message: 'Request validation or permission error.' })
  }

  return errors
}

function schemaFromExample(example) {
  if (Array.isArray(example)) {
    return {
      type: 'array',
      items: example.length ? schemaFromExample(example[0]) : { type: 'object', additionalProperties: true },
    }
  }

  if (example === null) {
    return {
      type: 'string',
      nullable: true,
    }
  }

  if (typeof example === 'number') {
    return { type: Number.isInteger(example) ? 'integer' : 'number' }
  }

  if (typeof example === 'boolean') {
    return { type: 'boolean' }
  }

  if (typeof example === 'object') {
    const dynamicSchema = example[DYNAMIC_OBJECT_SCHEMA]
    if (dynamicSchema) {
      return {
        type: 'object',
        additionalProperties: dynamicSchema,
      }
    }

    return {
      type: 'object',
      properties: Object.fromEntries(
        Object.entries(example).map(([key, value]) => [key, schemaFromExample(value)]),
      ),
      additionalProperties: false,
    }
  }

  return { type: 'string', nullable: example === null }
}

function buildRequestBodyExample(bodyParams) {
  if (!bodyParams.length) {
    return null
  }

  const root = {}

  for (const param of bodyParams) {
    const segments = param.name.split('.')
    let pointer = root
    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index]
      const last = index === segments.length - 1

      if (last) {
        if (
          pointer[segment] &&
          typeof pointer[segment] === 'object' &&
          !Array.isArray(pointer[segment]) &&
          param.schemaType !== 'array'
        ) {
          continue
        }
        pointer[segment] = exampleValueForParam(param)
      } else {
        if (!pointer[segment] || typeof pointer[segment] !== 'object' || Array.isArray(pointer[segment])) {
          pointer[segment] = {}
        }
        pointer = pointer[segment]
      }
    }
  }

  return root
}

function exampleValueForParam(param) {
  if (param.format === 'binary') return '(binary)'
  if (param.schemaType === 'array') return []
  if (param.schemaType === 'object') return {}
  if (param.schemaType === 'boolean') return false
  if (param.schemaType === 'number') return 0
  if (param.schemaType === 'integer') return 0
  return ''
}

function buildRequestBodySchemaFromParams(bodyParams) {
  if (!bodyParams.length) {
    return null
  }

  const root = {
    type: 'object',
    properties: {},
    required: [],
  }

  for (const param of bodyParams) {
    const segments = param.name.split('.')
    let pointer = root

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index]
      const last = index === segments.length - 1

      if (last) {
        pointer.properties[segment] ||= {
          type: param.schemaType,
          ...(param.schemaType === 'array' ? { items: { type: 'string' } } : {}),
          ...(param.format ? { format: param.format } : {}),
        }
      } else {
        if (
          !pointer.properties[segment] ||
          pointer.properties[segment].type !== 'object' ||
          !pointer.properties[segment].properties
        ) {
          pointer.properties[segment] = {
            type: 'object',
            properties: {},
            required: [],
          }
        }
      }

      if (last) {
        if (param.required && !pointer.required.includes(segment)) {
          pointer.required.push(segment)
        }
      } else {
        pointer = pointer.properties[segment]
      }
    }
  }

  if (!root.required.length) {
    delete root.required
  }

  return root
}

function inferExpressionPlaceholder(expression) {
  const trimmed = expression.trim()
  const propertyMatch = trimmed.match(/([A-Za-z_][A-Za-z0-9_]*)\s*$/)
  return propertyMatch ? propertyMatch[1] : 'value'
}

function splitTopLevelOperator(value, operator) {
  const parts = []
  let current = ''
  let round = 0
  let square = 0
  let curly = 0
  let inSingle = false
  let inDouble = false
  let inTemplate = false

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]
    const next = value[index + 1]

    if (inSingle) {
      current += char
      if (char === '\\') {
        current += next || ''
        index += 1
        continue
      }
      if (char === "'") {
        inSingle = false
      }
      continue
    }

    if (inDouble) {
      current += char
      if (char === '\\') {
        current += next || ''
        index += 1
        continue
      }
      if (char === '"') {
        inDouble = false
      }
      continue
    }

    if (inTemplate) {
      current += char
      if (char === '\\') {
        current += next || ''
        index += 1
        continue
      }
      if (char === '`') {
        inTemplate = false
      }
      continue
    }

    if (char === "'") {
      inSingle = true
      current += char
      continue
    }

    if (char === '"') {
      inDouble = true
      current += char
      continue
    }

    if (char === '`') {
      inTemplate = true
      current += char
      continue
    }

    if (char === '(') {
      round += 1
      current += char
      continue
    }

    if (char === ')') {
      round -= 1
      current += char
      continue
    }

    if (char === '[') {
      square += 1
      current += char
      continue
    }

    if (char === ']') {
      square -= 1
      current += char
      continue
    }

    if (char === '{') {
      curly += 1
      current += char
      continue
    }

    if (char === '}') {
      curly -= 1
      current += char
      continue
    }

    if (
      round === 0 &&
      square === 0 &&
      curly === 0 &&
      value.slice(index, index + operator.length) === operator
    ) {
      parts.push(current.trim())
      current = ''
      index += operator.length - 1
      continue
    }

    current += char
  }

  if (current.trim()) {
    parts.push(current.trim())
  }

  return parts
}

function normalizeFrontendRouteExpression(expression) {
  if (!expression) {
    return null
  }

  const parts = splitTopLevel(expression, '+').map((part) => part.trim()).filter(Boolean)
  if (!parts.length) {
    return null
  }

  const normalized = parts
    .map((part) => {
      const trimmed = part.trim()

      if (
        (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))
      ) {
        return stripQuotes(trimmed)
      }

      if (trimmed.startsWith('`') && trimmed.endsWith('`')) {
        return stripQuotes(trimmed).replace(/\$\{([^}]+)\}/g, (_, expr) => `{${inferExpressionPlaceholder(expr)}}`)
      }

      return `{${inferExpressionPlaceholder(trimmed)}}`
    })
    .join('')
    .replace(/^\/+/, '')

  return normalized || null
}

function expandFrontendRouteExpressions(expression) {
  const trimmed = expression.trim()
  if (!trimmed) {
    return []
  }

  for (const operator of ['||', '??']) {
    const parts = splitTopLevelOperator(trimmed, operator)
    if (parts.length > 1) {
      return Array.from(
        new Set(parts.flatMap((part) => expandFrontendRouteExpressions(part)).filter(Boolean)),
      )
    }
  }

  const normalized = normalizeFrontendRouteExpression(trimmed)
  return normalized ? [normalized] : []
}

function splitJsObjectEntry(value) {
  let round = 0
  let square = 0
  let curly = 0
  let inSingle = false
  let inDouble = false
  let inTemplate = false

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]
    const next = value[index + 1]

    if (inSingle) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === "'") {
        inSingle = false
      }
      continue
    }

    if (inDouble) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '"') {
        inDouble = false
      }
      continue
    }

    if (inTemplate) {
      if (char === '\\') {
        index += 1
        continue
      }
      if (char === '`') {
        inTemplate = false
      }
      continue
    }

    if (char === "'") {
      inSingle = true
      continue
    }

    if (char === '"') {
      inDouble = true
      continue
    }

    if (char === '`') {
      inTemplate = true
      continue
    }

    if (char === '(') round += 1
    if (char === ')') round -= 1
    if (char === '[') square += 1
    if (char === ']') square -= 1
    if (char === '{') curly += 1
    if (char === '}') curly -= 1

    if (char === ':' && round === 0 && square === 0 && curly === 0) {
      return [value.slice(0, index).trim(), value.slice(index + 1).trim()]
    }
  }

  const trimmed = value.trim()
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(trimmed)) {
    return [trimmed, trimmed]
  }

  return null
}

function extractObjectKeys(expression) {
  const trimmed = expression.trim()
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    return []
  }

  return splitTopLevel(trimmed.slice(1, -1))
    .map((entry) => splitJsObjectEntry(entry)?.[0])
    .filter(Boolean)
    .map((key) => stripQuotes(key))
}

function resolveObjectKeysFromVariable(expression, content, callIndex) {
  const identifier = expression.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)$/)?.[1]
  if (!identifier) {
    return []
  }

  const searchBody = content.slice(0, callIndex)
  const regex = new RegExp(`(?:const|let|var)\\s+${identifier}\\s*=\\s*\\{`, 'g')
  let match
  let objectLiteral = null

  while ((match = regex.exec(searchBody))) {
    const start = searchBody.indexOf('{', match.index)
    const end = scanBalanced(searchBody, start, '{', '}')
    if (end === -1) {
      continue
    }
    objectLiteral = searchBody.slice(start, end + 1)
    regex.lastIndex = end + 1
  }

  return objectLiteral ? extractObjectKeys(objectLiteral) : []
}

function normalizeObservedAccessKeys(matches, variableName) {
  const ignoreSegments = new Set([
    'length',
    'map',
    'forEach',
    'filter',
    'find',
    'findIndex',
    'some',
    'every',
    'reduce',
    'push',
    'unshift',
    'splice',
    'slice',
    'includes',
  ])

  return Array.from(
    new Set(
      matches
        .map((match) => match.replace(new RegExp(`^${variableName}(?:\\?\\.|\\.)`), ''))
        .map((path) => path.split(/\?*\./))
        .map((segments) => {
          const result = []
          for (const segment of segments) {
            if (!segment || ignoreSegments.has(segment)) {
              break
            }
            result.push(segment)
          }
          return result.join('.')
        })
        .filter(Boolean),
    ),
  )
}

function extractDirectResponseAccessKeys(body, variableName) {
  const regex = new RegExp(
    `\\b${variableName}(?:\\?\\.|\\.)[A-Za-z_][A-Za-z0-9_]*(?:(?:\\?\\.|\\.)[A-Za-z_][A-Za-z0-9_]*)*`,
    'g',
  )
  return normalizeObservedAccessKeys(
    Array.from(body.matchAll(regex)).map((match) => match[0]),
    variableName,
  )
}

function extractResponseAccessKeys(body, variableName) {
  const keys = new Set(extractDirectResponseAccessKeys(body, variableName))
  const aliasRegex = new RegExp(
    `\\b(?:const|let|var)\\s+([A-Za-z_][A-Za-z0-9_]*)\\s*=\\s*${variableName}((?:\\?\\.|\\.)[A-Za-z_][A-Za-z0-9_]*(?:(?:\\?\\.|\\.)[A-Za-z_][A-Za-z0-9_]*)*)`,
    'g',
  )

  for (const match of Array.from(body.matchAll(aliasRegex))) {
    const aliasName = match[1]
    const basePath = normalizeObservedAccessKeys([`${variableName}${match[2]}`], variableName)[0]
    if (!basePath) {
      continue
    }

    keys.add(basePath)
    for (const aliasPath of extractDirectResponseAccessKeys(body, aliasName)) {
      keys.add(`${basePath}.${aliasPath}`)
    }
  }

  return Array.from(keys)
}

function extractFrontendResponseKeys(content, matchIndex, closeParen) {
  const tailStart = closeParen + 1
  const tail = content.slice(tailStart, tailStart + 4000)
  const thenMatch =
    tail.match(/^\s*\.then\s*\(\s*function\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)\s*\{/) ||
    tail.match(/^\s*\.then\s*\(\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)\s*=>\s*\{/) ||
    tail.match(/^\s*\.then\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*=>\s*\{/)

  if (thenMatch) {
    const relativeBraceIndex = tail.indexOf('{', thenMatch.index || 0)
    const absoluteBraceIndex = relativeBraceIndex === -1 ? -1 : tailStart + relativeBraceIndex
    const absoluteCloseBrace =
      absoluteBraceIndex === -1 ? -1 : scanBalanced(content, absoluteBraceIndex, '{', '}')
    if (absoluteBraceIndex !== -1 && absoluteCloseBrace !== -1) {
      return extractResponseAccessKeys(
        content.slice(absoluteBraceIndex + 1, absoluteCloseBrace),
        thenMatch[1],
      )
    }
  }

  const lineStart = content.lastIndexOf('\n', matchIndex) + 1
  const linePrefix = content.slice(lineStart, matchIndex)
  const assignmentMatch = linePrefix.match(/\b(?:const|let|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:await\s+)?$/)
  if (assignmentMatch) {
    return extractResponseAccessKeys(content.slice(tailStart, tailStart + 4000), assignmentMatch[1])
  }
  return []
}

function normalizeFrontendMethod(recipient) {
  if (/get$/.test(recipient)) return 'GET'
  if (/post$/.test(recipient)) return 'POST'
  if (/put$/.test(recipient)) return 'PUT'
  if (/patch$/.test(recipient)) return 'PATCH'
  if (/del$/.test(recipient) || /delete$/.test(recipient)) return 'DELETE'
  return null
}

function extractFrontendConsumers() {
  const files = collectFilesFromSources(
    ['src'],
    (file) => file.endsWith('.js') || file.endsWith('.vue'),
  )
  const regex =
    /(this\.\$(?:get|post|put|patch|del)|this\.\$api\.(?:get|post|put|patch|delete)|window\.FluentCommunityUtil\.Rest\.(?:get|post|put|patch|delete)|Rest\.(?:get|post|put|patch|delete))\s*\(/g

  const consumers = []

  for (const file of files) {
    const content = read(file)
    let match

    while ((match = regex.exec(content))) {
      const openParen = content.indexOf('(', match.index)
      const closeParen = scanBalanced(content, openParen, '(', ')')
      if (closeParen === -1) {
        continue
      }

      const args = splitTopLevel(content.slice(openParen + 1, closeParen))
      const routeExpression = args[0] || ''
      const routePatterns = expandFrontendRouteExpressions(routeExpression)
      const method = normalizeFrontendMethod(match[1])
      const inlinePayloadKeys = args[1] ? extractObjectKeys(args[1]) : []
      const payloadKeys = inlinePayloadKeys.length
        ? inlinePayloadKeys
        : resolveObjectKeysFromVariable(args[1] || '', content, match.index)
      const responseKeys = extractFrontendResponseKeys(content, match.index, closeParen)

      if (method && routePatterns.length) {
        consumers.push({
          method,
          routePatterns,
          routeExpression: routeExpression.trim(),
          payloadKeys,
          responseKeys,
          sourceId: inferSourceConfig(file).id,
          file: displaySourcePath(file),
          line: getLineNumber(content, match.index),
        })
      }

      regex.lastIndex = closeParen + 1
    }
  }

  return consumers
}

function buildRoutePatternMatcher(routePath) {
  return new RegExp(
    `^${routePath
      .replace(/^\//, '')
      .replace(/\{[^}]+\}/g, '[^/]+')
      .replace(/\//g, '\\/')}$`,
  )
}

function findFrontendConsumersForRoute(route, consumers) {
  const matcher = buildRoutePatternMatcher(route.routePath)
  return consumers.filter(
    (consumer) =>
      consumer.method === route.httpMethod &&
      consumer.routePatterns.some((routePattern) => matcher.test(routePattern)),
  )
}

function resolveControllerMethod(controllerIndex, route) {
  const namespace = route.namespace || 'FluentCommunity\\App\\Http\\Controllers'
  const fqcn = route.controller.includes('\\') ? route.controller : `${namespace}\\${route.controller}`
  const controller = controllerIndex[fqcn] || controllerIndex[route.controller]
  if (!controller) {
    return null
  }

  const directMatch = controller.methods.find((method) => method.name === route.action)
  if (directMatch) {
    return { controller, method: directMatch }
  }

  const looseMatch = controller.methods.find(
    (method) => method.name.toLowerCase() === route.action.toLowerCase(),
  )
  return looseMatch ? { controller, method: looseMatch } : null
}

function buildRoutes(controllerIndex, classIndex, frontendConsumers, models) {
  const rawRoutes = collectRouteFiles().flatMap((filePath) => parseRouteGroups(filePath))

  return rawRoutes.map((route) => {
    const module = classifyRoute(route)
    const operation = buildOperationMeta({ ...route, module })
    const resolved = resolveControllerMethod(controllerIndex, route)
    const supportMethods = resolved
      ? collectSupportMethodBodies(
          resolved.controller,
          resolved.method,
          classIndex,
          parseRequestVariableSources(resolved.method.body),
        ).map((entry) => entry.method)
      : []
    const params = resolved
      ? parseRequestParams({ ...route, module }, resolved.method, resolved.controller, classIndex)
      : { path: [], query: [], body: [], hasFileUpload: false }
    const responseExample = resolved
      ? extractResponseShape(resolved.method, models, { module, slug: operation.slug })
      : { message: 'Success' }
    const errors = resolved
      ? extractErrorResponses(resolved.method, supportMethods)
      : [{ status: 400, message: 'Request error.' }]
    const requestBodyExample = buildRequestBodyExample(params.body)
    const requestBodySchema = buildRequestBodySchemaFromParams(params.body)

    return {
      ...route,
      module,
      ...operation,
      controllerFile: resolved ? resolved.controller.relativeFile : null,
      controllerSourceId: resolved ? resolved.controller.sourceId : route.sourceId,
      controllerClass: resolved ? resolved.controller.className : route.controller,
      methodInfo: resolved?.method || null,
      params,
      responseExample,
      responseSchema: schemaFromExample(responseExample),
      requestBodyExample,
      requestBodySchema,
      requestBodyContentType: params.hasFileUpload ? 'multipart/form-data' : 'application/json',
      frontendConsumers: findFrontendConsumersForRoute(route, frontendConsumers),
      errors,
    }
  })
}

function inferHookType(expr) {
  const normalized = expr.replace(/^&/, '').trim()
  if (normalized.startsWith('[') || normalized.endsWith(']')) {
    return 'array'
  }
  if (/->all\(\)/.test(normalized) || /toArray\(\)/.test(normalized)) {
    return 'array'
  }
  if (/Ids\b/i.test(normalized) || /users\b/i.test(normalized)) {
    return 'array'
  }
  if (/feed/i.test(normalized)) {
    return 'Feed|mixed'
  }
  if (/space/i.test(normalized)) {
    return 'Space|mixed'
  }
  if (/comment/i.test(normalized)) {
    return 'Comment|mixed'
  }
  if (/course|lesson|topic/i.test(normalized)) {
    return 'mixed'
  }
  if (/user|profile|subscriber/i.test(normalized)) {
    return 'mixed'
  }
  if (/request/i.test(normalized)) {
    return 'array'
  }
  return 'mixed'
}

function expressionToHookName(expression) {
  return splitTopLevel(expression, '.')
    .map((part) => {
      const trimmed = part.trim()
      if (!trimmed) return ''
      if (
        (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))
      ) {
        return trimmed.slice(1, -1)
      }
      const variable = trimmed.match(/\$([A-Za-z_][A-Za-z0-9_]*)/)
      return variable ? `{${variable[1]}}` : `{expr}`
    })
    .join('')
}

function categorizeHook(hookName, filePath) {
  const path = hookName.replace(/^fluent_community\//, '')

  if (/feed|ticker|post/.test(path)) return 'feeds'
  if (/space|portal|menu|lockscreen|topic/.test(path)) return 'spaces'
  if (/member|user|profile|xprofile|follow|leaderboard|badge/.test(path)) return 'members'
  if (/comment/.test(path)) return 'comments'
  if (/notification|digest/.test(path)) return 'notifications'
  if (/reaction|survey/.test(path)) return 'reactions'
  if (/auth|invitation|signup|login/.test(path)) return 'auth'
  if (/permission|capability/.test(path)) return 'permissions'
  if (/setting|config|color|theme|template|snippet/.test(path)) return 'settings'
  if (/media|upload|file|document|giphy/.test(path)) return 'media'
  if (/course|lesson|section|quiz/.test(path)) return 'courses'
  if (/admin|report|moderation|webhook/.test(path) || filePath.includes('/Http/Controllers/AdminController.php')) return 'admin'
  return 'miscellaneous'
}

function extractHookCalls() {
  const files = [
    ...collectFilesFromSources(['app'], (file) => file.endsWith('.php')),
    ...collectFilesFromSources(['Modules'], (file) => file.endsWith('.php')),
  ]

  const hooks = []

  for (const file of files) {
    const content = read(file)
    const source = inferSourceConfig(file)
    const regex = /(do_action_ref_array|do_action|apply_filters)\s*\(/g
    let match

    while ((match = regex.exec(content))) {
      const callStart = content.indexOf('(', match.index)
      const callEnd = scanBalanced(content, callStart, '(', ')')
      if (callEnd === -1) {
        continue
      }

      const inner = content.slice(callStart + 1, callEnd)
      const args = splitTopLevel(inner)
      const hookName = expressionToHookName(args[0] || '')
      if (!hookName.startsWith('fluent_community/')) {
        regex.lastIndex = callEnd + 1
        continue
      }

      const kind = match[1] === 'apply_filters' ? 'filter' : 'action'
      const params = args.slice(1).map((arg, index) => ({
        name: normalizeWhitespace(arg.replace(/^&/, '')),
        type: inferHookType(arg),
        index: index + 1,
      }))

      hooks.push({
        name: hookName,
        kind,
        sourceId: source.id,
        file: displaySourcePath(file),
        line: getLineNumber(content, match.index),
        category: categorizeHook(hookName, file),
        params,
      })

      regex.lastIndex = callEnd + 1
    }
  }

  return hooks.sort((a, b) => a.name.localeCompare(b.name) || a.file.localeCompare(b.file))
}

function summarizeHooks(hooks) {
  const actions = hooks.filter((hook) => hook.kind === 'action')
  const filters = hooks.filter((hook) => hook.kind === 'filter')

  return {
    callSites: hooks.length,
    actionCallSites: actions.length,
    filterCallSites: filters.length,
    uniqueActionNames: new Set(actions.map((hook) => hook.name)).size,
    uniqueFilterNames: new Set(filters.map((hook) => hook.name)).size,
  }
}

function buildModelDocs(models, hooks, routes) {
  const hookSummary = summarizeHooks(hooks)
  const stats = {
    models: MODEL_ORDER.length,
    hooks: hookSummary.uniqueActionNames + hookSummary.uniqueFilterNames,
    hookCallSites: hookSummary.callSites,
    actions: hookSummary.uniqueActionNames,
    filters: hookSummary.uniqueFilterNames,
    actionCallSites: hookSummary.actionCallSites,
    filterCallSites: hookSummary.filterCallSites,
    routes: routes.length,
  }

  const tableList = Object.values(models)
    .map((model) => resolveModelProperty(models, model.name, 'table'))
    .filter(Boolean)
  const uniqueTables = [...new Set(tableList)]

  writeFile(
    join(docsRoot, 'index.md'),
    `---
title: Developer Docs
layout: page
sidebar: false
aside: false
prev: false
next: false
editLink: false
pageClass: docs-home
---

<DocsHome :stats="{ models: ${stats.models}, routes: ${stats.routes}, hooks: ${stats.hooks}, hookCallSites: ${stats.hookCallSites}, openapiSpecs: ${stats.routes + 1} }" />
`,
  )

  writeFile(
    join(docsRoot, 'getting-started.md'),
    `---
title: Getting Started
description: Setup, architecture, and navigation guidance for FluentCommunity developers.
---

# Getting Started

FluentCommunity is a WordPress community/forum plugin built on the WPFluent framework. This docs site is generated directly from the checked-out FluentCommunity core and Pro plugin source, so the counts, routes, hook names, and model references match the current code.

## What This Site Covers

- **Database layer:** ${stats.models} first-party models mapped to ${uniqueTables.length} tables and shared tables.
- **Hooks:** ${stats.actions} unique action hooks and ${stats.filters} unique filter hooks found across ${stats.hookCallSites} call sites in the core and Pro \`app/\` and \`Modules/\` trees.
- **REST API:** ${stats.routes} registered routes across core and Pro route files.

## Development Commands

\`\`\`bash
yarn install
yarn docs:dev
yarn docs:build
\`\`\`

## Source of Truth

| Concern | Source |
| --- | --- |
| Core routes | \`fluent-community/app/Http/Routes/api.php\` |
| Pro routes | \`fluent-community-pro/app/Http/Routes/api.php\`, \`fluent-community-pro/app/Modules/**/Http/*_api.php\`, and route-bearing Pro modules |
| Controllers | \`fluent-community/app/Http/Controllers/\`, \`fluent-community/Modules/**/Controllers/\`, and the matching Pro controller trees |
| Models | \`fluent-community/app/Models/\` plus Pro runtime models used by route responses |
| Migrations | \`database/Migrations/\` |
| Hooks | \`do_action(...)\` and \`apply_filters(...)\` calls across the core and Pro source trees |

## Authentication Notes

FluentCommunity uses WordPress REST infrastructure. In browser-driven portal flows, the plugin typically relies on cookie authentication and nonces. For server-to-server calls, WordPress Application Passwords are the most practical option for routes that are not intentionally public.

## REST Client Conventions

- The REST namespace is **\`fluent-community/v2\`**.
- Portal clients in the plugin send **PUT/PATCH/DELETE** requests as POST requests with the \`X-HTTP-Method-Override\` header.
- Space, admin, and portal permission checks are enforced by policy classes first and then by controller-level validation.

## Main Sections

- [Database Schema](/database/schema)
- [Model Reference](/database/models)
- [Action Hooks](/hooks/actions/)
- [Filter Hooks](/hooks/filters/)
- [REST API](/restapi/)
- [Extending FluentCommunity](/modules/extending)
`,
  )

  const relationships = []
  for (const modelName of MODEL_ORDER) {
    const relationItems = resolveModelProperty(models, modelName, 'relations') || []
    const table = resolveModelProperty(models, modelName, 'table')
    for (const relation of relationItems) {
      relationships.push({
        source: modelName,
        sourceTable: table,
        name: relation.name,
        type: relation.type,
        target: relation.target || 'Unknown',
        targetTable:
          relation.target && models[relation.target]
            ? resolveModelProperty(models, relation.target, 'table')
            : 'external',
      })
    }
  }

  const contentDiagram = relationships
    .filter((item) =>
      ['Feed', 'Comment', 'Reaction', 'Media', 'Notification', 'Activity', 'XProfile', 'User'].includes(
        item.source,
      ),
    )
    .map((item) => mermaidRelation(item))
    .filter((value, index, all) => all.indexOf(value) === index)
    .join('\n')

  const spaceDiagram = relationships
    .filter((item) =>
      ['BaseSpace', 'Space', 'SpaceGroup', 'SpaceUserPivot', 'Term', 'User', 'XProfile'].includes(
        item.source,
      ),
    )
    .map((item) => mermaidRelation(item))
    .filter((value, index, all) => all.indexOf(value) === index)
    .join('\n')

  const deliveryDiagram = relationships
    .filter((item) =>
      ['Notification', 'NotificationSubscriber', 'NotificationSubscription', 'Meta', 'UserMeta', 'Contact', 'XProfile'].includes(
        item.source,
      ),
    )
    .map((item) => mermaidRelation(item))
    .filter((value, index, all) => all.indexOf(value) === index)
    .join('\n')

  writeFile(
    join(docsRoot, 'database', 'schema.md'),
    `---
title: Database Schema
description: Table inventory and ER diagrams for FluentCommunity.
---

# Database Schema

FluentCommunity defines ${uniqueTables.filter((table) => table && table.startsWith('fcom_')).length} first-party database tables in \`database/Migrations/\`, plus relationships to WordPress core tables and optional integration tables.

## Table Inventory

| Table | Source |
| --- | --- |
${uniqueTables
  .map((table) => {
    const schema = Object.values(models).find(
      (model) => resolveModelProperty(models, model.name, 'table') === table && model.schema,
    )?.schema
    const source = schema?.file || EXTERNAL_TABLE_NOTES[table] || 'Inherited / external table'
    return `| \`${table}\` | ${source} |`
  })
  .join('\n')}

## Content Relationships

\`\`\`mermaid
erDiagram
${contentDiagram}
\`\`\`

## Space, Membership, and Taxonomy Relationships

\`\`\`mermaid
erDiagram
${spaceDiagram}
\`\`\`

## Notifications, Meta, and Profile Relationships

\`\`\`mermaid
erDiagram
${deliveryDiagram}
\`\`\`
`,
  )

  writeFile(
    join(docsRoot, 'database', 'models.md'),
    `---
title: Database Models
description: Overview of the FluentCommunity ORM model layer.
---

# Database Models

The FluentCommunity ORM layer is built on WPFluent and Eloquent-style models. The list below covers every first-party model in \`app/Models/\`, including the shared base \`Model\` wrapper used by the package.

| Model | Table | Notes |
| --- | --- | --- |
${MODEL_ORDER.map((modelName) => {
  const model = models[modelName]
  const table = resolveModelProperty(models, modelName, 'table')
  return `| [\`${modelName}\`](/database/models/${MODEL_SLUGS[modelName]}) | ${
    table ? `\`${table}\`` : 'Inherited / runtime-defined'
  } | ${model.summary} |`
}).join('\n')}
`,
  )

  const allScopes = MODEL_ORDER.flatMap((modelName) =>
    (resolveModelProperty(models, modelName, 'scopes') || []).map((scope) => ({
      model: modelName,
      name: scope.name,
      params: scope.params,
    })),
  )

  writeFile(
    join(docsRoot, 'database', 'query-builder.md'),
    `---
title: Query Builder
description: Common query builder patterns and available model scopes.
---

# Query Builder

FluentCommunity models inherit the WPFluent query builder. The generated scope inventory below comes directly from \`scope*\` methods in the model layer.

## Scope Inventory

| Model | Scope | Parameters |
| --- | --- | --- |
${allScopes
  .map((scope) => `| [\`${scope.model}\`](/database/models/${MODEL_SLUGS[scope.model]}) | \`${scope.name}\` | \`${scope.params || '—'}\` |`)
  .join('\n')}

## Common Patterns

\`\`\`php
use FluentCommunity\\App\\Models\\Feed;
use FluentCommunity\\App\\Models\\Space;

$feeds = Feed::query()
    ->searchBy('release notes')
    ->byUserAccess(get_current_user_id())
    ->limit(10)
    ->get();

$spaces = Space::query()
    ->searchBy('marketing')
    ->orderBy('title', 'ASC')
    ->get();
\`\`\`
`,
  )

  writeFile(
    join(docsRoot, 'database', 'models', 'relationships.md'),
    `---
title: Relationships
description: Relationship patterns used by FluentCommunity models.
---

# Relationships

The model layer uses standard WPFluent relation helpers such as \`belongsTo\`, \`hasMany\`, \`belongsToMany\`, and \`hasManyThrough\`.

## Relationship Inventory

| Source | Method | Type | Target |
| --- | --- | --- | --- |
${relationships
  .map(
    (item) =>
      `| [\`${item.source}\`](/database/models/${MODEL_SLUGS[item.source]}) | \`${item.name}\` | \`${item.type}\` | \`${item.target}\` |`,
  )
  .join('\n')}
`,
  )

  for (const modelName of MODEL_ORDER) {
    const model = models[modelName]
    const table = resolveModelProperty(models, modelName, 'table')
    const fillable = resolveModelProperty(models, modelName, 'fillable') || []
    const casts = resolveModelProperty(models, modelName, 'casts') || {}
    const scopes = resolveModelProperty(models, modelName, 'scopes') || []
    const relations = resolveModelProperty(models, modelName, 'relations') || []
    const schema = model.schema

    const attributes = schema
      ? schema.columns
      : fillable.map((field) => ({
          name: field,
          type: guessColumnType(field),
          nullable: true,
          default: '',
        }))

    const customMethods = [
      ...new Set([
        ...Object.keys(KEY_METHOD_SUMMARIES[modelName] || {}),
        ...resolveModelProperty(models, modelName, 'keyMethods'),
      ]),
    ].filter(Boolean)

    writeFile(
      join(docsRoot, 'database', 'models', `${MODEL_SLUGS[modelName]}.md`),
      `---
title: ${modelName} Model
description: ORM reference for FluentCommunity\\App\\Models\\${modelName}.
---

# ${modelName} Model

${model.summary}

## Table

- **Table:** ${table ? `\`${table}\`` : 'Inherited / runtime-defined'}
- **Primary key:** \`${model.primaryKey}\`
${model.externalNote ? `- **Schema ownership:** ${model.externalNote}` : ''}
${model.parent ? `- **Extends:** \`${model.parent}\`` : ''}

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
${attributes
  .map((column) => {
    const cast = casts[column.name] ? `, cast: ${casts[column.name]}` : ''
    return `| \`${column.name}\` | \`${column.type}${cast}\` | ${
      column.nullable ? 'Yes' : 'No'
    } | \`${column.default || '—'}\` | ${describeColumn(column.name)} |`
  })
  .join('\n')}

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
${relations
  .map(
    (relation) =>
      `| \`${relation.name}()\` | \`${relation.type}\` | \`${relation.target || 'Unknown'}\` | Signature: \`${relation.signature || '—'}\` |`,
  )
  .join('\n') || '| — | — | — | No relationships are declared on this model. |'}

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
${scopes
  .map(
    (scope) =>
      `| \`${scope.name}\` | \`${scope.params || '—'}\` | ${camelToWords(scope.name)} scope declared on the model. |`,
  )
  .join('\n') || '| — | — | No custom scopes are declared on this model. |'}

## Key Methods

| Method | Description |
| --- | --- |
${customMethods
  .map((methodName) => {
    const description =
      KEY_METHOD_SUMMARIES[modelName]?.[methodName] ||
      `${camelToWords(methodName)} implemented on the model.`
    return `| \`${methodName}()\` | ${description} |`
  })
  .join('\n') || '| — | No additional public methods are documented for this model. |'}

## Usage Examples

\`\`\`php
use ${model.fqcn};

$records = ${modelName}::query()
    ${scopes[0] ? `->${scopes[0].name.charAt(0).toLowerCase() + scopes[0].name.slice(1)}(${exampleScopeArgs(scopes[0])})` : ''}
    ->limit(10)
    ->get();

$first = ${modelName}::query()->first();
\`\`\`
`,
    )
  }

  writeFile(
    join(docsRoot, 'modules', 'extending.md'),
    `---
title: Extending FluentCommunity
description: Practical extension patterns for modules, routes, controllers, and hooks.
---

# Extending FluentCommunity

FluentCommunity is structured around WPFluent service providers, route files, controller classes, policies, and WordPress hooks.

## Common Extension Points

### Add a new module

1. Create a module directory in \`Modules/\`.
2. Register it from the module bootstrap used by FluentCommunity.
3. Add any REST routes via a module-specific \`*_api.php\` file or module bootstrap.
4. Reuse the existing policy classes or add a module-specific policy when the module needs its own access layer.

### Add routes and controllers

- Core routes live in \`app/Http/Routes/api.php\`.
- Module routes live alongside the module, for example \`Modules/Course/Http/course_api.php\`.
- Controllers should sanitize input with WordPress helpers and validate request data before persisting it.

### Add hooks

- Use the \`fluent_community/\` prefix for new hooks.
- Prefer action hooks for lifecycle events and filter hooks for payload customization.
- Keep parameter lists stable because the hook reference pages are generated from the actual call sites.

## Existing Modules

| Module | Purpose |
| --- | --- |
| \`Auth\` | Invitation, signup, and login flows. |
| \`Course\` | Courses, sections, lessons, and learner progress. |
| \`Gutenberg\` | Frontend rendering inside WordPress blocks. |
| \`Integrations\` | FluentCRM, FluentCart, Fluent Forms, and Fluent Player bridges. |
| \`Migrations\` | BuddyBoss/BuddyPress migration tooling. |
| \`PushNotification\` | Notification fan-out for supported events. |
| \`Theming\` | Theme wrappers and headless portal rendering. |
`,
  )
}

function exampleScopeArgs(scope) {
  const parts = scope.params.split(',').map((part) => part.trim()).filter(Boolean)
  if (!parts.length) {
    return ''
  }

  return parts
    .slice(1)
    .map((part) => {
      if (/search|slug|type|key/i.test(part)) return `'example'`
      if (/actions|ids/i.test(part)) return `[]`
      if (/user|space|feed|course|lesson|section|comment|id/i.test(part)) return `1`
      return `null`
    })
    .join(', ')
}

function mermaidRelation(item) {
  const relationMap = {
    belongsTo: `${item.targetTable} ||--o{ ${item.sourceTable} : ${item.name}`,
    hasMany: `${item.sourceTable} ||--o{ ${item.targetTable} : ${item.name}`,
    hasOne: `${item.sourceTable} ||--|| ${item.targetTable} : ${item.name}`,
    belongsToMany: `${item.sourceTable} }o--o{ ${item.targetTable} : ${item.name}`,
    hasManyThrough: `${item.sourceTable} ||--o{ ${item.targetTable} : ${item.name}`,
    hasOneThrough: `${item.sourceTable} ||--|| ${item.targetTable} : ${item.name}`,
  }
  return relationMap[item.type] || `${item.sourceTable} }o--o{ ${item.targetTable} : ${item.name}`
}

function hookAnchor(name) {
  return name.replace(/[{}$/]/g, '').replace(/\//g, '-')
}

function escapeMarkdownCode(value) {
  return String(value)
    .replace(/`/g, '\\`')
    .replace(/\|/g, '&#124;')
    .replace(/{{/g, '{&#8203;{')
    .replace(/}}/g, '}&#8203;}')
}

function groupHooksByName(collection) {
  const groups = new Map()

  for (const hook of collection) {
    if (!groups.has(hook.name)) {
      groups.set(hook.name, {
        name: hook.name,
        kind: hook.kind,
        category: hook.category,
        callSites: [],
      })
    }

    groups.get(hook.name).callSites.push(hook)
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      callSites: group.callSites.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line),
      sourceIds: [...new Set(group.callSites.map((hook) => hook.sourceId))].sort(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function formatHookParamSummary(params) {
  if (!params.length) {
    return 'No parameters'
  }

  return params.map((param) => `\`${escapeMarkdownCode(param.name)}\` (${param.type})`).join('<br>')
}

function buildHookDocs(hooks) {
  const actionHooks = hooks.filter((hook) => hook.kind === 'action')
  const filterHooks = hooks.filter((hook) => hook.kind === 'filter')

  for (const kind of ['action', 'filter']) {
    const collection = kind === 'action' ? actionHooks : filterHooks
    const groupedCollection = groupHooksByName(collection)
    const pageDir = join(docsRoot, 'hooks', kind === 'action' ? 'actions' : 'filters')
    const pageList = HOOK_PAGES[kind]

    writeFile(
      join(pageDir, 'index.md'),
      `---
title: ${kind === 'action' ? 'Action Hooks' : 'Filter Hooks'}
description: Source-verified ${kind} hook inventory for FluentCommunity.
---

# ${kind === 'action' ? 'Action Hooks' : 'Filter Hooks'}

This page is generated from ${kind === 'action' ? '`do_action()` and `do_action_ref_array()`' : '`apply_filters()`'} calls in the FluentCommunity core and Pro plugin source trees.

## Overview

- **Unique ${kind}s:** ${groupedCollection.length}
- **${humanizeSlug(kind)} call sites:** ${collection.length}
- **Categories covered:** ${pageList.map((page) => `\`${page}\``).join(', ')}

## Categories

${pageList.map((page) => `- [${humanizeSlug(page)}](/hooks/${kind === 'action' ? 'actions' : 'filters'}/${page})`).join('\n')}
`,
    )

    for (const page of pageList) {
      const categoryHooks = collection.filter((hook) => hook.category === page)
      const categoryGroups = groupHooksByName(categoryHooks)
      writeFile(
        join(pageDir, `${page}.md`),
        `---
title: ${humanizeSlug(page)} ${kind === 'action' ? 'Actions' : 'Filters'}
description: ${humanizeSlug(page)} ${kind} hooks for FluentCommunity.
---

# ${humanizeSlug(page)} ${kind === 'action' ? 'Actions' : 'Filters'}

${categoryGroups.length} unique ${kind} hook${categoryGroups.length === 1 ? '' : 's'} currently map to this category, across ${categoryHooks.length} call site${categoryHooks.length === 1 ? '' : 's'}.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
${categoryGroups
  .map(
    (group) =>
      `| [\`${group.name}\`](#${hookAnchor(group.name)}) | ${renderSourceLabel(group.sourceIds)} | ${group.callSites.length} | \`${group.callSites[0].file}:${group.callSites[0].line}\` |`,
  )
  .join('\n') || '| — | — | — | No hooks found in this category. |'}

${categoryGroups
  .map(
    (group) => `
<a id="${hookAnchor(group.name)}"></a>

## \`${group.name}\`

- **Type:** ${kind}
- **Edition:** ${renderSourceLabel(group.sourceIds)}
- **Call sites:** ${group.callSites.length}
- **When it fires:** ${describeHook(group.callSites[0])}

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
${group.callSites
  .map(
    (hook) =>
      `| ${renderSourceLabel([hook.sourceId])} | \`${hook.file}:${hook.line}\` | ${formatHookParamSummary(hook.params)} |`,
  )
  .join('\n') || '| — | — | No parameters are passed. |'}

### Example

\`\`\`php
${buildHookExample(group.callSites[0])}
\`\`\`
`,
  )
  .join('\n')}
`,
      )
    }
  }
}

function describeHook(hook) {
  const clean = hook.name.replace(/^fluent_community\//, '')
  return `${humanizeSlug(clean)} hook emitted from the current call site.`
}

function buildHookExampleArgs(params) {
  const used = new Set()

  return params.map((param, index) => {
    const propertyMatch = param.name.match(/->([A-Za-z_][A-Za-z0-9_]*)/)
    const variableMatch = param.name.match(/\$([A-Za-z_][A-Za-z0-9_]*)/)
    let candidate = propertyMatch ? propertyMatch[1] : variableMatch ? variableMatch[1] : `param${index + 1}`

    if (candidate === 'this') {
      candidate = `param${index + 1}`
    }

    candidate =
      candidate === candidate.toUpperCase()
        ? candidate.toLowerCase()
        : candidate.replace(/^[A-Z]/, (char) => char.toLowerCase())

    if (used.has(candidate)) {
      candidate = `${candidate}_${index + 1}`
    }

    used.add(candidate)
    return candidate
  })
}

function buildHookExample(hook) {
  const fn = hook.kind === 'action' ? 'add_action' : 'add_filter'
  const args = buildHookExampleArgs(hook.params)
  const functionSignature = args.length ? `$${args.join(', $')}` : ''
  const returnLine = hook.kind === 'filter' ? `\n    return $${args[0] || 'value'};` : ''

  return `${fn}('${hook.name}', function (${functionSignature}) {${returnLine}\n}, 10, ${hook.params.length});`
}

function buildRouteOverviewAndSpecs(routes) {
  const moduleGroups = Object.keys(MODULE_META).reduce((carry, key) => {
    carry[key] = routes.filter((route) => route.module === key)
    return carry
  }, {})

  const moduleOrder = {}
  for (const [module, moduleRoutes] of Object.entries(moduleGroups)) {
    moduleOrder[module] = moduleRoutes.map((route) => route.slug)
  }
  ensureDir(generatedRoot)
  writeFileSync(join(generatedRoot, 'restapi-module-order.json'), JSON.stringify(moduleOrder, null, 2))

  writeFile(
    join(docsRoot, 'restapi', 'index.md'),
    `---
title: REST API Overview
description: Source-verified overview for the FluentCommunity REST API.
---

# FluentCommunity REST API

This reference covers ${routes.length} routes registered in the FluentCommunity core and module route files.

## Base URL

\`https://your-site.com/wp-json/fluent-community/v2\`

## Authentication

- **Admin and settings routes:** typically used with WordPress Application Passwords.
- **Portal routes:** typically use cookie authentication plus a nonce in browser contexts.
- **Method override:** the FluentCommunity frontend sends PUT, PATCH, and DELETE requests as POST requests with \`X-HTTP-Method-Override\`.

## Modules

| Module | Edition | Route Count | Description |
| --- | --- | --- | --- |
${Object.entries(MODULE_META)
  .map(
    ([module, meta]) => {
      const sourceIds = [...new Set((moduleGroups[module] || []).map((route) => route.sourceId))]
      return `| [${meta.title}](/restapi/${module}) | ${renderSourceLabel(sourceIds)} | ${moduleGroups[module]?.length || 0} | ${meta.description} |`
    },
  )
  .join('\n')}
`,
  )

  for (const [module, meta] of Object.entries(MODULE_META)) {
    const moduleRoutes = moduleGroups[module] || []
    const pagePath = join(docsRoot, 'restapi', `${module}.md`)

    if (!moduleRoutes.length) {
      writeFile(
        pagePath,
        `---
title: ${meta.title}
description: ${meta.description}
---

# ${meta.title}

${meta.description}

## Status

No REST routes are currently registered for this module in the route files scanned by the generator.
`,
      )
      continue
    }

    writeFile(
      pagePath,
      `---
title: ${meta.title}
description: ${meta.description}
---

# ${meta.title}

${meta.description}

${isProOnly([...new Set(moduleRoutes.map((route) => route.sourceId))]) ? `${renderProBadge()}\n` : ''}

## Authentication

${meta.auth}

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
${moduleRoutes
  .map(
    (route) =>
      `| \`${route.httpMethod}\` | \`${route.routePath}\` | ${renderSourceLabel([route.sourceId])} | [${route.title}](/restapi/operations/${module}/${route.slug}) | \`${route.controllerClass}@${route.action}\` |`,
  )
  .join('\n')}
`,
    )

    for (const route of moduleRoutes) {
      const operationDocPath = join(docsRoot, 'restapi', 'operations', module, `${route.slug}.md`)
      writeFile(
        operationDocPath,
        `---
title: ${route.title}
description: "${route.description}"
outline: false
aside: false
---
## Endpoint

- **Method:** \`${route.httpMethod}\`
- **Path:** \`${route.routePath}\`
- **Edition:** ${renderSourceLabel([route.sourceId])}
- **Controller:** \`${route.controllerClass}@${route.action}\`
- **Route source:** \`${route.routeFile}:${route.routeLine}\`
${route.controllerFile ? `- **Controller source:** \`${route.controllerFile}\`` : ''}

<OAOperation operationId="${route.operationId}" specUrl="/openapi/public/${module}/${route.slug}.json" />
`,
      )

      const parameters = [
        ...route.params.path.map((param) => ({
          name: param.name,
          in: 'path',
          required: true,
          description: param.description,
          schema: { type: param.schemaType },
        })),
        ...route.params.query.map((param) => ({
          name: param.name,
          in: 'query',
          required: param.required,
          description: param.description,
          schema: {
            type: param.schemaType,
            ...(param.defaultValue ? { default: param.defaultValue } : {}),
          },
        })),
      ]

      const spec = {
        openapi: '3.0.4',
        info: {
          title: 'FluentCommunity API',
          description:
            'Complete REST API documentation for FluentCommunity — a WordPress community and forum plugin.',
          version: '1.0.0',
        },
        servers: [
          {
            url: 'https://{website}/wp-json/fluent-community/v2',
            description: 'Your WordPress website',
            variables: {
              website: {
                default: 'YourWebsite.com',
                description: 'Your WordPress website domain (without https://)',
              },
            },
          },
        ],
        security: [{ ApplicationPasswords: [] }],
        paths: {
          [normalizeRoutePathParams(route.routePath)]: {
            [route.httpMethod.toLowerCase()]: {
              operationId: route.operationId,
              summary: `${route.httpMethod} ${route.title}`,
              description: `${route.description}\n\nController: \`${route.controllerClass}@${route.action}\`\nRoute source: \`${route.routeFile}:${route.routeLine}\``,
              tags: [meta.title.replace(/ API$/, '')],
              security: [{ ApplicationPasswords: [] }],
              parameters,
              ...(route.requestBodySchema
                ? {
                    requestBody: {
                      required: route.params.body.some((param) => param.required),
                      content: {
                        [route.requestBodyContentType]: {
                          schema: route.requestBodySchema,
                          example: route.requestBodyExample,
                        },
                      },
                    },
                  }
                : {}),
              responses: Object.fromEntries(
                [
                  [
                    '200',
                    {
                      description: 'Successful response',
                      content: {
                        'application/json': {
                          schema: route.responseSchema,
                          example: route.responseExample,
                        },
                      },
                    },
                  ],
                  ...route.errors.map((error) => [
                    String(error.status),
                    {
                      description: error.message,
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              message: { type: 'string' },
                            },
                          },
                          example: {
                            message: error.message,
                          },
                        },
                      },
                    },
                  ]),
                ].reduce((carry, [status, response]) => {
                  if (!carry[status]) {
                    carry.push([status, response])
                  }
                  return carry
                }, []),
              ),
            },
          },
        },
        components: {
          securitySchemes: {
            ApplicationPasswords: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description:
                'WordPress Application Passwords — use Basic auth with username:application_password.',
            },
          },
        },
      }

      writeFile(
        join(openapiRoot, module, `${route.slug}.json`),
        `${JSON.stringify(spec, null, 2)}\n`,
      )
    }
  }
}

function main() {
  cleanGeneratedOutput()
  ensureDir(docsRoot)
  ensureDir(openapiRoot)
  ensureDir(generatedRoot)

  const classIndex = buildClassIndex()
  const tableSchemas = parseTableSchemas()
  const models = parseModel(classIndex, tableSchemas)
  const controllerIndex = buildControllerMethodIndex(classIndex)
  const frontendConsumers = extractFrontendConsumers()
  writeFileSync(
    join(generatedRoot, 'frontend-consumers.json'),
    JSON.stringify(frontendConsumers, null, 2),
  )
  const routes = buildRoutes(controllerIndex, classIndex, frontendConsumers, models)
  const hooks = extractHookCalls()
  const hookSummary = summarizeHooks(hooks)

  buildModelDocs(models, hooks, routes)
  buildHookDocs(hooks)
  buildRouteOverviewAndSpecs(routes)

  console.log(
    `Generated docs for ${MODEL_ORDER.length} models, ${
      hookSummary.uniqueActionNames + hookSummary.uniqueFilterNames
    } unique hooks across ${hooks.length} call sites, and ${routes.length} routes.`,
  )
}

main()
