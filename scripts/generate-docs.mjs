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
const capturedExamplesFile = join(repoRoot, 'data', 'response-examples.json')
const manualExamplesFile = join(repoRoot, 'data', 'manual-examples.json')

/**
 * Real request/response pairs recorded against a live FluentCommunity install
 * and anonymised, keyed by `<module>/<operation-slug>`. See scripts/capture/.
 *
 * When an operation has a captured sample it replaces the shape inferred from
 * static analysis: the response schema is derived from the example, so a real
 * payload makes both the schema and the example accurate at once.
 */
const capturedExamples = loadExampleFixtures([
  { file: capturedExamplesFile, origin: 'captured' },
  { file: manualExamplesFile, origin: 'manual' },
])

function loadExampleFixtures(sources) {
  const byModuleSlug = {}
  const bySlug = {}
  const ambiguousSlugs = new Set()

  for (const { file, origin } of sources) {
    if (!existsSync(file)) {
      console.warn(`No example fixtures at ${relative(repoRoot, file)}`)
      continue
    }
    let parsed
    try {
      parsed = JSON.parse(readFileSync(file, 'utf8'))
    } catch (error) {
      console.warn(`Could not read ${relative(repoRoot, file)}: ${error.message}`)
      continue
    }
    for (const [module, operations] of Object.entries(parsed.modules || {})) {
      for (const [slug, entry] of Object.entries(operations)) {
        const record = { ...entry, origin }
        byModuleSlug[`${module}/${slug}`] = record
        if (bySlug[slug] && bySlug[slug] !== record) {
          ambiguousSlugs.add(slug)
        }
        bySlug[slug] = record
      }
    }
  }

  for (const slug of ambiguousSlugs) {
    delete bySlug[slug]
  }
  return { byModuleSlug, bySlug }
}

/**
 * The capture harness groups operations by its own idea of a module, which
 * occasionally differs from classifyRoute() — `get-exportable-students` is a
 * course concern but lives under the admin route prefix, for instance. Fall
 * back to the slug alone, which is unique across the generated operation set.
 */
function getCapturedExample(module, slug) {
  return capturedExamples.byModuleSlug[`${module}/${slug}`] || capturedExamples.bySlug[slug] || null
}

/**
 * Tell the reader where an operation's sample payload came from, so they know
 * how much to trust the values as opposed to the field names.
 */
function renderExampleProvenance(origin) {
  if (origin === 'captured') {
    return `
::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::
`
  }
  if (origin === 'manual') {
    return `
::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::
`
  }
  return `
::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::
`
}

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

/**
 * Both kinds share one page list. They used to diverge, which silently dropped
 * every hook whose category had no page for its kind — all 15 comment filters and
 * the theme-integration actions went missing that way. buildHookDocs() now fails
 * the build if a category has no page, so the two must stay in step.
 */
const HOOK_PAGE_ORDER = [
  'feeds',
  'comments',
  'reactions',
  'spaces',
  'members',
  'courses',
  'notifications',
  'media',
  'auth',
  'permissions',
  'moderation',
  'integrations',
  'rendering',
  'settings',
  'admin',
  'miscellaneous',
]

const HOOK_PAGES = {
  action: [...HOOK_PAGE_ORDER],
  filter: [...HOOK_PAGE_ORDER],
}

/**
 * Hand-written prose per hook, keyed by full hook name. Nothing here is derivable
 * from source — the plugin has no `@since` tags and almost no hook docblocks — so
 * this is the only channel for explaining what a hook is *for*.
 *
 * Every field is optional; fill entries in incrementally. Fields:
 *   page     explicit category override, beats the path and name rules
 *   summary  one sentence: when it fires / what it filters
 *   details  longer prose, rendered under the summary
 *   params   [{ name, type, desc }] — replaces the guessed parameter table
 *   returns  filters only: what a callback must return
 *   related  other hook names to cross-link
 *   since    version string, if known
 */
const HOOK_NOTES = {

  'fluent_community/feed/created': {
    summary: 'Runs after a post has been saved and published, once its media and mentions are attached.',
    details:
      'Fired from `FeedsHelper::createFeed()` and from `FeedsController::createFeed()`, and again from Pro when a ' +
      'scheduled post goes live or a moderator approves a held post — so a single post can reach this hook through ' +
      'more than one path, but only once per publication. Posts that end up `scheduled`, `pending` or any other ' +
      'non-published status skip it entirely; those fire `fluent_community/feed/scheduled` or ' +
      '`fluent_community/feed/new_feed_{status}` instead. Core uses it to write the activity row and to dispatch ' +
      'mention notifications.',
    params: [
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The saved post, with media rows already linked.' },
    ],
    related: ['fluent_community/space_feed/created', 'fluent_community/feed/updated', 'fluent_community/feed/before_deleted'],
  },

  'fluent_community/space_feed/created': {
    summary: 'The space-scoped counterpart of `fluent_community/feed/created`, for posts that belong to a space.',
    details:
      'Always fires immediately after `fluent_community/feed/created` and only when `$feed->space_id` is set; on the ' +
      'controller path a profile-only post fires `fluent_community/profile_feed/created` instead. Use it when your callback would ' +
      'otherwise have to guard on `$feed->space_id` — core hangs the space email notification off it.',
    params: [
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The published post; `space_id` is guaranteed non-empty.' },
    ],
    related: ['fluent_community/feed/created'],
  },

  'fluent_community/feed/updated': {
    summary: 'Runs after an existing post is saved with at least one changed column.',
    details:
      'It is skipped when the save produced no dirty attributes, so editing a post without changing anything is ' +
      'silent. Two call sites pass different change sets: the full editor in `FeedsController::updateFeed()`, and ' +
      '`patchFeed()`, which only ever touches `is_sticky`, `priority` and `comments_disabled`. Media and topic ' +
      'changes are persisted before the hook runs but are not reflected in `$dirty`.',
    params: [
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The post after saving.' },
      { name: 'dirty', type: 'array', desc: 'The changed attributes, keyed by column name, as returned by `getDirty()`.' },
    ],
    related: ['fluent_community/feed/created'],
  },

  'fluent_community/feed/before_deleted': {
    summary: 'Runs immediately before a post row is deleted, while its relations are still readable.',
    details:
      'This is the last point at which comments, reactions, activities, media and notifications attached to the post ' +
      'can still be queried — core\'s `CleanupHandler` uses exactly that window to cascade the deletes. Once the ' +
      'post is gone, `fluent_community/feed/deleted` fires with only the integer ID.',
    params: [
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The post about to be deleted.' },
    ],
    related: ['fluent_community/feed/media_deleted'],
  },

  'fluent_community/feed/media_deleted': {
    summary: 'Signals that one or more media rows attached to a post should be detached and cleaned up.',
    details:
      'Despite the name this is a request to clean up, not a notification that a delete already happened: core\'s ' +
      '`CleanupHandler::handleMediaDelete()` is what actually queues the files for removal, and lesson documents are ' +
      'routed to the lesson-specific path instead. The only live callers are in the Pro Document Library, which ' +
      'passes documents being replaced or removed; the one core call site in `FeedsController::deleteMediaPreview()` ' +
      'is commented out, so deleting a post\'s preview image does not currently fire it.',
    params: [
      {
        name: 'media',
        type: 'mixed',
        desc: 'Either a single `\\FluentCommunity\\App\\Models\\Media` model or a collection of them.',
      },
    ],
    related: ['fluent_community/remove_medias_by_url'],
  },

  'fluent_community/comment_added': {
    summary: 'Runs after a published comment or reply has been stored and its media attached.',
    details:
      'Comments held for moderation never reach it — those fire `fluent_community/comment/new_comment_{status}` ' +
      'instead. A type-scoped twin, `fluent_community/comment_added_{feed->type}`, fires immediately before it, so ' +
      'listening to both double-handles the same comment. Note the third argument is only supplied by ' +
      '`CommentsController::store()`; the Pro moderation-approval path passes just two.',
    params: [
      { name: 'comment', type: '\\FluentCommunity\\App\\Models\\Comment', desc: 'The stored comment, with relations loaded.' },
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The post the comment belongs to.' },
      { name: 'mentionedUsers', type: 'array', desc: 'Mentioned user models parsed out of the comment body. Optional; absent on the moderation-approval path.' },
    ],
    related: ['fluent_community/comment_updated', 'fluent_community/comment_deleted'],
  },

  'fluent_community/comment_updated': {
    summary: 'Runs after an edited comment is saved, provided the save changed something.',
    details:
      'Guarded by a dirty check, so a no-op edit is silent. Media attached to the comment is reconciled first, and ' +
      'any media dropped by the edit is announced separately through `fluent_community/comment/media_deleted`. The ' +
      'type-scoped `fluent_community/comment_updated_{feed->type}` fires directly after this one.',
    params: [
      { name: 'comment', type: '\\FluentCommunity\\App\\Models\\Comment', desc: 'The comment after saving, with relations loaded.' },
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The post the comment belongs to.' },
    ],
    related: ['fluent_community/comment_added'],
  },

  'fluent_community/comment_deleted': {
    summary: 'Runs after a comment row has been deleted and the post\'s comment count recalculated.',
    details:
      'The first argument is the comment ID, not a model — the row is already gone by the time the hook runs, so ' +
      'anything you need from the comment must be captured earlier via `fluent_community/before_comment_delete`. ' +
      'Attached media is announced beforehand through `fluent_community/comment/media_deleted`.',
    params: [
      { name: 'commentId', type: 'int', desc: 'ID of the deleted comment.' },
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The post the comment belonged to.' },
    ],
    related: ['fluent_community/comment_added'],
  },

  'fluent_community/space/joined': {
    summary: 'Fires once a user holds an active membership row in a community space.',
    details:
      'Course-type spaces never reach this hook — `Helper::addToSpace()` routes them to ' +
      '`fluent_community/course/enrolled` instead. It also does not fire for join requests that land in `pending`; ' +
      'those fire `fluent_community/space/join_requested`, and the later approval fires this hook. Only the ' +
      '`Helper::addToSpace()` path supplies the fourth argument, and only when a membership row was genuinely ' +
      'created, so treat `$created` as optional.',
    params: [
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space that was joined.' },
      { name: 'userId', type: 'int', desc: 'WordPress user ID of the new member.' },
      { name: 'by', type: 'string', desc: 'How the membership came about: `self`, `by_admin`, `automation`, or an integration key.' },
      { name: 'created', type: '\\FluentCommunity\\App\\Models\\SpaceUserPivot', desc: 'The newly created membership row. Optional — omitted when an existing pending or inactive row was reactivated.' },
    ],
    related: ['fluent_community/space/user_left', 'fluent_community/course/enrolled'],
  },

  'fluent_community/space/user_left': {
    page: 'spaces',
    summary: 'Fires after a membership row has been removed from a community space.',
    details:
      'Covers self-leaves, admin removals and CRM-driven removals alike; the `$by` argument tells them apart. As ' +
      'with joining, course-type spaces are routed elsewhere — they fire ' +
      '`fluent_community/course/student_left`. The pivot row is already deleted and the user\'s cached space list ' +
      'rebuilt by the time callbacks run.',
    params: [
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space the user left.' },
      { name: 'userId', type: 'int', desc: 'WordPress user ID of the departing member.' },
      { name: 'by', type: 'string', desc: 'What triggered the removal: `self`, `by_admin`, or `automation`.' },
    ],
    related: ['fluent_community/space/joined'],
  },

  'fluent_community/space/created': {
    summary: 'Runs after a new space is created, its images claimed, its creator attached as admin and its topics synced.',
    details:
      'Only fires for spaces created through `SpaceController::create()`; spaces produced by migrations, seeders or ' +
      'direct model writes do not reach it. The second argument is the sanitised request payload, which carries ' +
      'fields such as `topic_ids` and image URLs that are not columns on the model.',
    params: [
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The newly created space.' },
      { name: 'data', type: 'array', desc: 'The sanitised creation payload from the request.' },
    ],
    related: ['fluent_community/space/updated'],
  },

  'fluent_community/space/updated': {
    summary: 'Runs after a space is saved with changed values.',
    details:
      'Two call sites with different second arguments: `SpaceController::update()` passes the filtered request ' +
      'payload, while `BaseSpace::updateCustomData()` passes the dirty attribute map. The model-level call is ' +
      'additionally gated on `type == \'community\'`, so custom-data updates to courses, space groups and sidebar ' +
      'links stay silent. Check what you actually received before reading keys off the second argument.',
    params: [
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space after saving.' },
      { name: 'data', type: 'array', desc: 'Either the request payload or the changed attributes, depending on the call site.' },
    ],
    related: ['fluent_community/space/created'],
  },

  'fluent_community/space/member/role_updated': {
    page: 'spaces',
    summary: 'Runs after an existing member\'s role within a space has been changed and saved.',
    details:
      'Fires from the admin member-management endpoint only. When a pending member is approved with a non-default ' +
      'role, it fires straight after `fluent_community/space/joined` for the same user, so a promotion-on-approval ' +
      'reaches both hooks. The pivot is passed rather than the user, so read `$pivot->user_id` and `$pivot->role`.',
    params: [
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space whose membership changed.' },
      { name: 'pivot', type: '\\FluentCommunity\\App\\Models\\SpaceUserPivot', desc: 'The membership row, already saved with the new role.' },
    ],
    related: ['fluent_community/space/joined'],
  },

  'fluent_community/course/enrolled': {
    summary: 'Fires once a user holds an active enrolment row in a course.',
    details:
      'The course equivalent of `fluent_community/space/joined`; courses never fire the space hook. `Helper::addToSpace()` ' +
      're-resolves the model to a `Course` before firing so that course relations are available, and only that path ' +
      'passes the fourth argument. Re-activating a lapsed enrolment fires the hook again with no `$created`.',
    params: [
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course that was joined.' },
      { name: 'userId', type: 'int', desc: 'WordPress user ID of the student.' },
      { name: 'by', type: 'string', desc: 'How the enrolment came about: `self`, `by_admin`, `automation`, or an integration key.' },
      { name: 'created', type: '\\FluentCommunity\\App\\Models\\SpaceUserPivot', desc: 'The newly created enrolment row. Optional — omitted when an existing row was reactivated.' },
    ],
    related: ['fluent_community/space/joined', 'fluent_community/course/topic_completed'],
  },

  'fluent_community/course/topic_completed': {
    summary: 'Fires when completing a lesson brings every published lesson in its section to completed for that student.',
    details:
      'Evaluated inside the lesson-completion routine, immediately after `fluent_community/course/lesson_completed`, ' +
      'and only counts lessons with status `published` — draft lessons in the section do not hold completion back. ' +
      'Marking a lesson incomplete and completing it again will fire this a second time; it is not a one-shot event ' +
      'per student.',
    params: [
      { name: 'topic', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic', desc: 'The section (module) that is now fully complete.' },
      { name: 'userId', type: 'int', desc: 'WordPress user ID of the student.' },
      { name: 'lesson', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson', desc: 'The lesson whose completion closed out the section.' },
    ],
    related: ['fluent_community/course/enrolled'],
  },

  'fluent_community/lesson/before_deleted': {
    summary: 'Runs immediately before a lesson row is deleted, while its relations are still queryable.',
    details:
      'Fires from three places: deleting a single lesson, deleting a section (once per contained lesson), and ' +
      'deleting a whole course (once per lesson in every section). Core uses it to drop lesson media and watched-video ' +
      'records, so a bulk course delete will fan this out across every lesson.',
    params: [
      { name: 'lesson', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson', desc: 'The lesson about to be deleted.' },
    ],
    related: ['fluent_community/section/before_deleted'],
  },

  'fluent_community/section/before_deleted': {
    summary: 'Runs immediately before a course section is deleted.',
    details:
      'Ordering differs between the two call sites. Deleting a course fires this before its lessons are removed; ' +
      'deleting a single section fires this, deletes the section row, and only then walks the lessons — so in that ' +
      'path the section no longer exists when the per-lesson hooks run. Pro uses it to unschedule drip notifications.',
    params: [
      { name: 'section', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic', desc: 'The section about to be deleted.' },
    ],
    related: ['fluent_community/lesson/before_deleted'],
  },

  'fluent_community/track_activity': {
    summary: 'A no-argument ping that a user did something worth refreshing their last-seen timestamp for.',
    details:
      'Fired after a post or comment activity row is written, and on every portal ticker poll. It carries no ' +
      'payload — the handler resolves the current profile itself, and debounces so `last_activity` is written at ' +
      'most once every five minutes. Do not treat it as a content event; use the specific content hooks for that.',
    related: ['fluent_community/feed/created', 'fluent_community/comment_added'],
  },

  'fluent_community/user_points_updated': {
    summary: 'Fires after a member\'s total leaderboard points are recalculated to a different value.',
    details:
      'Points are recalculated lazily and cached for an hour per user, so this fires at most once an hour per member ' +
      'under normal traffic, and not at all when the recalculated total matches the stored one. The profile is ' +
      'already saved with the new total; `$oldPoints` is the only way to see the delta. Pro\'s leaderboard listens ' +
      'here to detect level changes.',
    params: [
      { name: 'xprofile', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'The member profile, already saved with the new total.' },
      { name: 'oldPoints', type: 'int', desc: 'The point total before the recalculation.' },
    ],
  },

  'fluent_community/content_flagged': {
    summary: 'Fires when accumulated reports push a post or comment over the configured flag threshold and it is unpublished.',
    details:
      'Only reached when content moderation is enabled, a positive `flag_after_threshold` is configured, the content ' +
      'is still `published`, and the report count has met the threshold. By the time callbacks run the content status ' +
      'is already `pending`, the report is marked `flagged`, and a flagged comment has been decremented from its ' +
      'post\'s comment count. This is Pro-only.',
    params: [
      { name: 'report', type: '\\FluentCommunityPro\\App\\Models\\Moderation', desc: 'The moderation record that crossed the threshold.' },
      { name: 'content', type: 'mixed', desc: 'The flagged `Feed` or `Comment` model, already saved as `pending`.' },
    ],
    related: ['fluent_community/content_moderation/created'],
  },

  'fluent_community/content_moderation/created': {
    summary: 'Fires whenever a moderation report is created against a post or comment.',
    details:
      'Covers both member-submitted reports and automatic profanity or first-post flags, which create a report with ' +
      '`meta.flagged_by = auto` and no `user_id` — check that before treating a report as human-submitted. Only the ' +
      'member-report endpoint passes the third argument; the auto-flag paths pass two. Several Pro handlers are ' +
      'attached, including the threshold check that may go on to fire `fluent_community/content_flagged`.',
    params: [
      { name: 'report', type: '\\FluentCommunityPro\\App\\Models\\Moderation', desc: 'The stored moderation record.' },
      { name: 'content', type: 'mixed', desc: 'The reported `Feed` or `Comment` model.' },
      { name: 'contentType', type: 'string', desc: '`post` or `comment`. Optional — supplied only by the member-report endpoint.' },
    ],
    related: ['fluent_community/content_flagged', 'fluent_community/report_reasons'],
  },

  'fluent_community_daily_jobs': {
    page: 'settings',
    summary: 'Action Scheduler task that runs once every 24 hours for the plugin\'s daily maintenance.',
    details:
      'Registered on activation and re-registered whenever a site administrator loads the portal, in the ' +
      '`fluent-community` Action Scheduler group. Core uses it to fire `fluent_community/remove_old_notifications` ' +
      'and to prune Action Scheduler logs older than seven days; Pro\'s leaderboard uses it to resync points. It ' +
      'takes no arguments and runs in a queue-runner request, so nothing about the current user is available.',
    related: ['fluent_community_scheduled_hour_jobs'],
  },

  'fluent_community_scheduled_hour_jobs': {
    page: 'settings',
    summary: 'Action Scheduler task that runs hourly for the plugin\'s short-interval maintenance.',
    details:
      'Core uses it to re-evaluate the daily digest schedule and to fire ' +
      '`fluent_community/maybe_delete_draft_medias`. Like the daily job it is unscheduled on deactivation and takes ' +
      'no arguments. Hook here rather than to WP-Cron if you need work that must survive a page-load-free site.',
    related: ['fluent_community_daily_jobs', 'fluent_community_send_daily_digest'],
  },

  'fluent_community_send_daily_digest': {
    summary: 'Fires when a batch of daily digest emails is due to be sent.',
    details:
      'Not a once-per-day event. The scheduled `fluent_community_send_daily_digest_init` action fires it, and the ' +
      'core handler then walks recipients 100 at a time, re-scheduling this same action whenever it approaches its ' +
      'run-time budget — so it can fire many times for a single digest run. It takes no arguments; the handler tracks ' +
      'its position through the `last_digest_sent_user_id` option.',
    related: ['fluent_community_scheduled_hour_jobs'],
  },

  'fluent_community/portal_head': {
    summary: 'Prints inside the `<head>` of the standalone portal page, after the plugin\'s colour variables.',
    details:
      'This is the SPA-only head hook: it fires from `app/Views/portal_page.php`, the template used when the portal ' +
      'renders itself rather than through a WordPress theme. For the theme-framed portal use ' +
      '`fluent_community/template_header` — Pro registers its custom CSS on both. Echo directly; there is no return ' +
      'value.',
    related: ['fluent_community/template_header', 'fluent_community/portal_footer'],
  },

  'fluent_community/portal_footer': {
    summary: 'Prints near the end of `<body>` on the standalone portal page, after the SPA scripts.',
    details:
      'Fires from `app/Views/portal_page.php` and from the Pro portal shortcode, and runs before `wp_footer()` on ' +
      'non-headless renders. Core hangs custom JS snippets and customiser output off it. The theme-framed portal uses ' +
      '`fluent_community/template_footer` instead.',
    related: ['fluent_community/portal_head', 'fluent_community/template_footer'],
  },

  'fluent_community/before_portal_dom': {
    summary: 'Prints inside the portal wrapper, immediately before the app markup.',
    details:
      'The one rendering hook shared by every portal surface: the standalone portal page, both WordPress frame ' +
      'templates, and the Gutenberg community block. Because it runs before the layout paints, it is the right place ' +
      'for pre-paint scripts — core uses it for the sidebar-collapse anti-flicker snippet.',
    related: ['fluent_community/portal_header'],
  },

  'fluent_community/portal_sidebar': {
    summary: 'Renders the portal\'s left sidebar navigation for a given render context.',
    details:
      'Core attaches the sidebar renderer itself, so adding a callback appends to the sidebar rather than replacing ' +
      'it. The `$context` argument distinguishes where the sidebar is being drawn: `headless` for the SPA, `wp` for ' +
      'the theme frame templates, `block_editor` for the Gutenberg block in edit mode, and `ajax` when ' +
      '`OptionController::getSidebarMenuHtml()` buffers the markup for a client-side refresh.',
    params: [
      { name: 'context', type: 'string', desc: 'Render context: `headless`, `wp`, `block_editor`, or `ajax`.' },
    ],
    related: ['fluent_community/portal_header'],
  },

  'fluent_community/portal_header': {
    summary: 'Renders the portal header bar for a given render context.',
    details:
      'As with the sidebar, core attaches the default header renderer, so callbacks add to it. `$context` is ' +
      '`headless`, `wp`, or `block_editor`; unlike the sidebar there is no `ajax` context. To add items inside the ' +
      'default header rather than around it, use the finer-grained `fluent_community/before_header_menu_items` and ' +
      '`fluent_community/after_header_right_menu_items` hooks.',
    params: [
      { name: 'context', type: 'string', desc: 'Render context: `headless`, `wp`, or `block_editor`.' },
    ],
    related: ['fluent_community/portal_sidebar'],
  },

  'fluent_community/enqueue_global_assets': {
    summary: 'Fires while the portal\'s shared stylesheet and script bundle are being enqueued.',
    details:
      'Core\'s own callback does the enqueueing, so this is the hook to attach dependent assets to rather than a ' +
      'notification that assets are already registered — register at a later priority if you need to depend on ' +
      '`fluent_community_global` or `portal_general`. `$useDefaultTheme` is false only for the Gutenberg block when ' +
      'the author opted out of the built-in theme, in which case `theme-default.css` is skipped.',
    params: [
      { name: 'useDefaultTheme', type: 'bool', desc: 'Whether the bundled default theme stylesheet is being loaded alongside the global one.' },
    ],
  },

  'fluent_community/template_header': {
    summary: 'Prints inside `<head>` of the WordPress theme frame templates, after `wp_head()`.',
    details:
      'Applies to the `fluent-community-frame.php` and `fluent-community-frame-full.php` page templates — the ' +
      'theme-integrated portal, not the standalone SPA page. Pro registers PWA meta tags and custom CSS on this and ' +
      'on `fluent_community/portal_head` together, which is the usual pattern for head output that must appear on ' +
      'every portal variant.',
    related: ['fluent_community/portal_head', 'fluent_community/template_footer'],
  },

  'fluent_community/template_footer': {
    summary: 'Prints at the end of `<body>` in the WordPress theme frame templates, after `wp_footer()`.',
    details:
      'Core renders the mobile bottom menu here. The Gutenberg community block also fires it, but indirectly — it ' +
      'defers the call into `wp_footer` at priority 99, so relative ordering against other footer output differs ' +
      'between the block and the frame templates.',
    related: ['fluent_community/template_header', 'fluent_community/portal_footer'],
  },

  'fluent_community/theme_body_atts': {
    summary: 'Prints extra attributes into the `<body>` tag of the theme frame templates.',
    details:
      'Output is echoed raw into the opening tag directly after `body_class()`, so emit `key="value"` pairs and ' +
      'escape them yourself; returning a value does nothing. Core uses it for Blocksy support, keyed off the theme ' +
      'name passed in.',
    params: [
      { name: 'themeName', type: 'string', desc: 'The active theme\'s directory slug, from `get_option(\'template\')`.' },
    ],
    related: ['fluent_community/theme_content'],
  },

  'fluent_community/theme_content': {
    summary: 'Renders the WordPress page content area inside the community frame layout.',
    details:
      'Core attaches `TemplateLoader::renderWpContent()` at priority 10, so callbacks added later append to the ' +
      'theme content. To take the region over entirely, remove the default first — the FluentCart checkout ' +
      'integration does exactly that with `remove_all_actions(\'fluent_community/theme_content\', 10)`.',
    params: [
      { name: 'themeName', type: 'string', desc: 'The active theme\'s directory slug.' },
      { name: 'layout', type: 'string', desc: '`default` for the standard frame, `full` for the full-width frame template.' },
    ],
    related: ['fluent_community/theme_body_atts'],
  },

  'fluent_community/portal_loaded': {
    summary: 'Fires on `plugins_loaded` once the FluentCommunity application container exists.',
    details:
      'The earliest safe extension point: the container, helper functions and Action Scheduler are available, but ' +
      'WordPress `init` has not run, so do not register post types, taxonomies or translations here. Core loads its ' +
      'own `Modules/` from this hook and Pro bootstraps itself from it, which is why Pro modules are always ' +
      'available by the time `fluent_community/on_wp_init` runs.',
    params: [
      { name: 'app', type: '\\FluentCommunity\\Framework\\Foundation\\Application', desc: 'The plugin application container.' },
    ],
    related: ['fluent_community/on_wp_init'],
  },

  'fluent_community/on_wp_init': {
    summary: 'Fires on WordPress `init`, after the FluentCommunity application has been bootstrapped.',
    details:
      'Registered from inside the `fluent_community/portal_loaded` callback, so it always runs after every core and ' +
      'Pro module has had a chance to register. Use it for anything that must wait for `init` — rewrite rules, ' +
      'registered types, or code that needs the current user.',
    params: [
      { name: 'app', type: '\\FluentCommunity\\Framework\\Foundation\\Application', desc: 'The plugin application container.' },
    ],
    related: ['fluent_community/portal_loaded'],
  },

  'fluent_community/can_access_portal': {
    summary: 'Filters whether a user may access the community portal at all.',
    details:
      'Applied at every return point of `Helper::canAccessPortal()`, so a callback sees the decision but not the ' +
      'reason behind it — the access level, role check and active-profile check are all collapsed into one boolean ' +
      'by the time it runs. No user ID is passed, so resolve the subject yourself if you need it. A callback that ' +
      'unconditionally returns `true` opens the portal to logged-out visitors as well.',
    params: [
      { name: 'canAccess', type: 'bool', desc: 'The decision reached from the access level, role list and profile status.' },
    ],
    returns: '`bool` — `true` to allow portal access, `false` to deny. The value is used directly, so return a real boolean.',
    related: ['fluent_community/super_admin_capability'],
  },

  'fluent_community/super_admin_capability': {
    summary: 'Filters the WordPress capability that identifies a FluentCommunity super admin.',
    details:
      'Defaults to `manage_options` and is checked with `user_can()`. Returning an empty or falsy value makes ' +
      '`Helper::isSuperAdmin()` return `false` for everyone, which disables the super-admin escape hatch across the ' +
      'plugin — that is the supported way to switch it off, not an error. This is distinct from the community ' +
      '`admin` role, which is stored per member rather than derived from WordPress capabilities.',
    params: [
      { name: 'capability', type: 'string', desc: 'The capability to test, `manage_options` by default.' },
    ],
    returns: '`string` — a WordPress capability name, or a falsy value to disable the super-admin check entirely.',
    related: ['fluent_community/user/permissions'],
  },

  'fluent_community/can_view_user_profile': {
    summary: 'Filters whether the current user may view a member profile page.',
    details:
      'The base decision comes from the `profile_page_visibility` privacy setting: `everybody` yields `true`, ' +
      '`logged_in` yields the login state, and anything else falls back to "own profile or moderator". `$pageStatus` ' +
      'is passed so a callback can relax one visibility mode without hard-coding the others. `$targetUserId` is ' +
      'frequently `null` — the own-profile branch compares it with a strict `===`, so a string ID will not match.',
    params: [
      { name: 'canView', type: 'bool', desc: 'The decision derived from the privacy setting.' },
      { name: 'pageStatus', type: 'string', desc: 'The `profile_page_visibility` setting: `everybody`, `logged_in`, or a moderator-only value.' },
      { name: 'targetUserId', type: 'int', desc: 'The profile owner\'s user ID. May be `null` when the caller did not supply one.' },
    ],
    returns: '`bool` — `true` to allow viewing.',
    related: ['fluent_community/can_view_members_page'],
  },

  'fluent_community/can_view_members_page': {
    summary: 'Filters whether the current user may view the members directory.',
    details:
      'Driven by the `members_page_status` privacy setting, with the same three-way shape as the profile and ' +
      'leaderboard checks. It gates the directory page only; individual profiles are governed separately by ' +
      '`fluent_community/can_view_user_profile`.',
    params: [
      { name: 'canView', type: 'bool', desc: 'The decision derived from the privacy setting.' },
      { name: 'pageStatus', type: 'string', desc: 'The `members_page_status` setting: `everybody`, `logged_in`, or a moderator-only value.' },
    ],
    returns: '`bool` — `true` to allow viewing.',
    related: ['fluent_community/can_view_user_profile', 'fluent_community/can_view_leaderboard_members'],
  },

  'fluent_community/can_view_leaderboard_members': {
    summary: 'Filters whether the current user may see the member list on the leaderboard.',
    details:
      'Reads the `leaderboard_members_visibility` privacy setting and otherwise mirrors the members-page check. It ' +
      'controls visibility of the ranked members, not whether the leaderboard feature itself is enabled.',
    params: [
      { name: 'canView', type: 'bool', desc: 'The decision derived from the privacy setting.' },
      { name: 'pageStatus', type: 'string', desc: 'The `leaderboard_members_visibility` setting: `everybody`, `logged_in`, or a moderator-only value.' },
    ],
    returns: '`bool` — `true` to allow viewing.',
    related: ['fluent_community/can_view_members_page'],
  },

  'fluent_community/user/permissions': {
    summary: 'Filters the permission map derived from a user\'s community roles.',
    details:
      'Applied at both ends of `User::getRolePermissions()`. Users with no community role reach the early branch and ' +
      'receive only `[\'read\' => true]` with an empty `$roles` array, so a callback must cope with a map that has ' +
      'none of the usual keys. The result is cached per user for the request and is what the Vue app receives as ' +
      '`appVars.permissions`, so anything added here becomes visible to the front end.',
    params: [
      { name: 'permissions', type: 'array', desc: 'Permission keys mapped to booleans, for example `community_admin`, `delete_any_feed`, `course_creator`.' },
      { name: 'roles', type: 'array', desc: 'The user\'s community role slugs. Empty for users with no community role.' },
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The user the permissions belong to.' },
    ],
    returns: '`array` — the permission map. Keep the existing keys unless you intend to revoke them; several controllers read them directly.',
    related: ['fluent_community/super_admin_capability'],
  },

  'fluent_community/course/can_view_lesson': {
    summary: 'Filters whether a user may view a particular lesson.',
    details:
      'Applied inside `CourseHelper::resolveLessonAccess()` before the companion ' +
      '`fluent_community/course/lesson_access_info` filter, which can still override the decision and attach a lock ' +
      'reason — so returning `true` here is a strong hint, not the final word. Pro attaches a callback that grants ' +
      'access to any lesson marked `is_free_preview`. Note that only three of the four arguments are used by that ' +
      'callback; add the ones you need with the right `$accepted_args` count.',
    params: [
      { name: 'canView', type: 'bool', desc: 'The access decision computed from enrolment, drip schedule and sequential progress.' },
      { name: 'lesson', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson', desc: 'The lesson being requested.' },
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course the lesson belongs to.' },
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The user requesting the lesson.' },
    ],
    returns: '`bool` — `true` to grant access.',
    related: ['fluent_community/course/access_message_html'],
  },

  'fluent_community/course/access_message_html': {
    summary: 'Filters the HTML shown in place of a lesson the current user cannot view.',
    details:
      'The default markup is a `fcom_locker` block whose wording already varies by lock reason — sequential ' +
      'progression, a future unlock date, or plain lack of enrolment. `$config` carries `is_locked`, `lock_type` and ' +
      '`unlock_date`, which is the only way to tell those cases apart once the string is built. The return value is ' +
      'rendered as HTML, so escape any user-supplied text yourself.',
    params: [
      { name: 'accessMessage', type: 'string', desc: 'The default locked-lesson HTML.' },
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course being viewed.' },
      { name: 'lesson', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson', desc: 'The locked lesson.' },
      { name: 'config', type: 'array', desc: 'Lock context: `is_locked`, `lock_type` (for example `sequential`) and `unlock_date`.' },
    ],
    returns: '`string` — HTML to render in place of the lesson body.',
    related: ['fluent_community/course/can_view_lesson'],
  },

  'fluent_community/portal_slug': {
    summary: 'Filters the URL segment the community portal is served from.',
    details:
      'Runs after the stored setting and the `FLUENT_COMMUNITY_PORTAL_SLUG` constant have both been applied, so a ' +
      'callback overrides even the constant. An empty string puts the portal at the site root, which is how Pro\'s ' +
      'shortcode renderer temporarily relocates it. The slug feeds both rewrite rules and every generated portal ' +
      'URL, so changing it at runtime without flushing rewrites will produce links that do not resolve.',
    params: [
      { name: 'slug', type: 'string', desc: 'The portal slug, `portal` by default.' },
    ],
    returns: '`string` — the slug, without leading or trailing slashes. An empty string serves the portal from the site root.',
  },

  'fluent_community/default_avatar': {
    summary: 'Filters the avatar URL used when a member has no usable profile image.',
    details:
      'The default value differs by call site: when Gravatar is disabled it is the bundled `placeholder.png`, and ' +
      'when Gravatar is enabled it is a `ui-avatars.com` URL passed to `get_avatar_url()` as the `default` ' +
      'parameter. Returning a falsy value is safe — every caller falls back to the bundled placeholder. Be aware ' +
      'that `XProfile::getAvatarAttribute()` caches the resolved URL per user for a week, so changes will not be ' +
      'visible immediately for existing members.',
    params: [
      { name: 'avatarUrl', type: 'string', desc: 'The default avatar URL for this context.' },
      { name: 'userId', type: 'int', desc: 'The user whose avatar is being resolved.' },
    ],
    returns: '`string` — an absolute image URL. A falsy return falls back to the bundled placeholder image.',
  },

  'fluent_community/max_post_length': {
    summary: 'Filters the maximum number of characters allowed in a post body.',
    details:
      'Defaults to 15000 and is enforced server-side in `FeedsHelper::sanitizeAndValidateData()`; exceeding it throws ' +
      'and the post is rejected. The check uses `strlen()` on the Markdown source, so it counts bytes rather than ' +
      'characters — multibyte content hits the ceiling sooner than the number suggests, and inline image syntax ' +
      'counts towards it.',
    params: [
      { name: 'maxLength', type: 'int', desc: 'The byte ceiling for a post body, 15000 by default.' },
    ],
    returns: '`int` — the maximum length. There is no matching client-side limit, so this is the only enforcement point.',
    related: ['fluent_community/max_comment_char_length'],
  },

  'fluent_community/max_comment_char_length': {
    summary: 'Filters the maximum number of characters allowed in a comment or reply.',
    details:
      'Defaults to 10000 and, like the post limit, is measured with `strlen()` on the Markdown source, so it is a ' +
      'byte count. Exceeding it throws a 422 before the comment is stored. It applies to both new comments and ' +
      'edits, since both run through the same validation routine.',
    params: [
      { name: 'maxLength', type: 'int', desc: 'The byte ceiling for a comment body, 10000 by default.' },
    ],
    returns: '`int` — the maximum length.',
    related: ['fluent_community/max_post_length'],
  },

  'fluent_community/upload_folder_name': {
    summary: 'Filters the folder, relative to the WordPress uploads base directory, that FluentCommunity writes media into.',
    details:
      'Defaults to the `FLUENT_COMMUNITY_UPLOAD_DIR` constant and is applied in two places that must agree — the ' +
      'directory resolver and the custom upload-dir override — so filter it unconditionally rather than for one ' +
      'code path. On first use the directory is created with a hardening `.htaccess` and an `index.php`; a folder ' +
      'you point at that already exists will not get those files. Pro\'s Document Library filters it temporarily to ' +
      'redirect document uploads.',
    params: [
      { name: 'folderName', type: 'string', desc: 'Path fragment appended to the uploads base directory, with a leading slash.' },
    ],
    returns: '`string` — the folder path fragment. Existing media is not migrated, so changing it orphans previously uploaded files.',
  },

  'fluent_community/media_upload_data': {
    summary: 'Filters the attributes used to create a media row just before it is written.',
    details:
      'The last point at which an upload can be redirected or rejected — Pro\'s Cloud Storage module rewrites ' +
      '`driver`, `media_path` and `media_url` here to push the file offsite. Returning a `WP_Error` surfaces its ' +
      'message to the uploader, and returning anything falsy aborts the upload with a generic error, so this doubles ' +
      'as an upload veto. It is applied by four separate upload endpoints (feed media, generic uploads, FluentPlayer ' +
      'and Pro documents), which all pass the same shape.',
    params: [
      { name: 'mediaData', type: 'array', desc: 'Attributes for the new media row: `media_type`, `driver`, `media_path`, `media_url`, `settings`.' },
      { name: 'file', type: 'array', desc: 'The processed upload, including `path`, `url`, `type` and a `meta` array of image dimensions.' },
    ],
    returns: '`array` — the attributes to create the media row with. Return a `WP_Error` to reject the upload with a message, or a falsy value to reject it generically.',
    related: ['fluent_community/support_attachment_types', 'fluent_community/upload_folder_name'],
  },

  'fluent_community/remove_medias_by_url': {
    summary: 'Requests deletion of media records matching a set of public URLs.',
    details:
      'This is an action rather than a filter, and the work is done by core\'s `CleanupHandler`, which resolves the ' +
      'URLs to media rows and queues the files for removal. Fire it yourself when you replace an image that ' +
      'FluentCommunity owns — spaces, space groups, profiles, lockscreens and Pro quizzes all do. The optional ' +
      '`$wheres` array currently understands only `sub_object_id`, which scopes the lookup to one owning record and ' +
      'prevents deleting an identical URL used elsewhere; omit it and every matching row is removed.',
    params: [
      { name: 'mediaUrls', type: 'array', desc: 'Public media URLs to remove. An empty array is a no-op.' },
      { name: 'wheres', type: 'array', desc: 'Optional constraints. Only `sub_object_id` is honoured.' },
    ],
    related: ['fluent_community/feed/media_deleted'],
  },

  'fluent_community/support_attachment_types': {
    summary: 'Filters the MIME types accepted by FluentCommunity\'s image upload endpoints.',
    details:
      'Applied at two upload entry points whose defaults are not identical: `FeedsController::handleMediaUpload()` ' +
      'includes `image/heic` while `UploadHelper::uploadFiles()` does not, so a callback that rebuilds the array ' +
      'instead of appending will silently change behaviour on one path. The list is also mined for extensions ' +
      'eligible for WebP conversion, so adding a non-image MIME type here has effects beyond validation.',
    params: [
      { name: 'mimeTypes', type: 'array', desc: 'Accepted MIME type strings, image types only by default.' },
    ],
    returns: '`array` — MIME type strings. They are joined into the validator\'s `mimetypes` rule, so return a flat, non-associative array.',
    related: ['fluent_community/media_upload_data'],
  },

  'fluent_community/portal_notices': {
    summary: 'Filters the list of notice blocks shown above the main community feed.',
    details:
      'Part of the `portal_vars` payload and empty by default. The Vue app renders each entry with `v-html` at the ' +
      'top of the all-feeds route only — not on space, course or profile pages — so entries must be complete, ' +
      'trusted HTML fragments and any user-supplied content in them must be escaped before it reaches the filter.',
    params: [
      { name: 'notices', type: 'array', desc: 'HTML fragments to render, one per notice. Empty by default.' },
    ],
    returns: '`array` — a flat list of HTML strings.',
    related: ['fluent_community/portal_vars'],
  },

  'fluent_community/max_media_per_post': {
    summary: 'Filters how many media items may be attached to a single post.',
    details:
      'Applied twice with the same default from the customiser settings (4): once inside `portal_vars`, where the ' +
      'composer uses it to stop accepting further images, and once in `FeedsHelper` where surplus items are trimmed ' +
      'with `array_slice()`. Filter it unconditionally so both agree — raising only the client-side value results in ' +
      'silently discarded attachments. A value of `0` hides the attachment button altogether.',
    params: [
      { name: 'maxMedia', type: 'int', desc: 'Maximum media items per post; comes from the `max_media_per_post` customiser setting, default 4.' },
    ],
    returns: '`int` — the cap. It is cast with `(int)` before the server-side trim.',
    related: ['fluent_community/portal_vars'],
  },

  'fluent_community/has_video_embeder': {
    summary: 'Filters whether the video embed control appears in the post composer.',
    details:
      'Surfaces as `features.video_embeder` in `portal_vars` and defaults to `true`. The Vue app tests it for ' +
      'truthiness only, so return the boolean `false` to hide the control — the string `\'no\'` is truthy and will ' +
      'leave it visible. The control is additionally gated on the composer\'s own `videoApp` config, so it only ever ' +
      'appears in the create-post composer, and hiding it does not block video embeds submitted through the API.',
    params: [
      { name: 'hasVideoEmbeder', type: 'bool', desc: 'Whether the embed control is offered, `true` by default.' },
    ],
    returns: '`bool` — return a falsy value, ideally `false`, to hide the control.',
    related: ['fluent_community/portal_vars', 'fluent_community/has_inline_image_upload'],
  },

  'fluent_community/has_inline_image_upload': {
    summary: 'Filters whether images can be uploaded inline from within the editor toolbar.',
    details:
      'A string flag, not a boolean: it surfaces as `features.has_inline_image_upload` and the Vue app compares it ' +
      'strictly against `\'yes\'`, so returning `true` disables the feature just as effectively as returning ' +
      '`\'no\'`. It controls the in-editor upload affordance only; the separate attachment control governed by ' +
      '`fluent_community/max_media_per_post` is unaffected.',
    params: [
      { name: 'hasInlineImageUpload', type: 'string', desc: '`yes` to allow inline uploads, anything else to disable. `yes` by default.' },
    ],
    returns: '`string` — return the literal string `\'yes\'` to keep the feature on.',
    related: ['fluent_community/max_media_per_post'],
  },

  'fluent_community/date_time_i18n': {
    summary: 'Filters the date, time and UI localisation strings handed to the portal front end.',
    details:
      'Surfaces as `portal_vars.dateTime18n` and mixes two consumers. The `weekdays`, `months`, `weekdaysShort`, ' +
      '`monthsShort` and `weekdaysMin` entries are underscore-joined lists that `src/app.js` splits on `_` to build ' +
      'the Day.js locale — keep both the separator and the element order or dates will be mislabelled. The ' +
      '`relativeTime` and `relativeTimeMobile` maps are Day.js relative-time formats, and the `pagination`, `table`, ' +
      '`image`, `upload`, `select` and `datepicker` blocks are the Element Plus locale. All values are already ' +
      'translated through the `fluent-community` text domain.',
    params: [
      { name: 'strings', type: 'array', desc: 'The localisation payload, keyed as described above.' },
    ],
    returns: '`array` — the payload, with the existing keys preserved. Missing keys are not backfilled.',
    related: ['fluent_community/portal_vars'],
  },

  'fluent_community/course_section_collapse_default': {
    summary: 'Filters whether course sections start collapsed in the course view.',
    details:
      'Surfaces as `portal_vars.course_sections_collapsed`. The course view compares it loosely against `\'yes\'`, ' +
      'so return the string rather than a boolean. It sets the initial state only — once a viewer expands or ' +
      'collapses a section, their interaction wins for the rest of the visit.',
    params: [
      { name: 'collapsed', type: 'string', desc: '`yes` to start collapsed, `no` to start expanded. `no` by default.' },
    ],
    returns: '`string` — `\'yes\'` or `\'no\'`.',
    related: ['fluent_community/course_lesson_fullscreen_default'],
  },

  'fluent_community/course_lesson_fullscreen_default': {
    summary: 'Filters whether the lesson view opens in fullscreen mode by default.',
    details:
      'Surfaces as `portal_vars.course_lesson_fullscreen` and is used only as the fallback for the viewer\'s stored ' +
      '`lesson_fs` preference — anyone who has already toggled fullscreen keeps their own setting, so this affects ' +
      'first-time viewers. Return the string `\'yes\'`; the comparison is against that literal.',
    params: [
      { name: 'fullscreen', type: 'string', desc: '`yes` to default to fullscreen, `no` otherwise. `no` by default.' },
    ],
    returns: '`string` — `\'yes\'` or `\'no\'`.',
    related: ['fluent_community/course_section_collapse_default'],
  },

  'fluent_community/default_profile_tab_route': {
    summary: 'Filters which tab a member profile opens on.',
    details:
      'Surfaces as `portal_vars.default_profile_tab` and is matched against a fixed map of tab keys: `about`, ' +
      '`posts`, `spaces`, `comments` and `courses`. Anything outside that set is ignored and the profile opens on ' +
      'the default tab. The redirect happens client-side with `router.replace`, so the profile URL changes as the ' +
      'page settles.',
    params: [
      { name: 'tab', type: 'string', desc: 'One of `about`, `posts`, `spaces`, `comments`, `courses`. Empty by default.' },
    ],
    returns: '`string` — a recognised tab key, or an empty string to keep the default tab.',
    related: ['fluent_community/portal_vars'],
  },

  'fluent_community/create_post_default_space': {
    summary: 'Filters the space pre-selected in the post composer.',
    details:
      'Surfaces as `portal_vars.default_post_space` and takes a space slug. The composer applies it only on the ' +
      'all-feeds and profile-feeds routes, only when no space is already chosen, and only if the slug appears among ' +
      'the spaces the viewer may post in — so an invalid or inaccessible slug is quietly ignored rather than ' +
      'producing an error. The special slug `__self__post__` selects the viewer\'s own profile.',
    params: [
      { name: 'spaceSlug', type: 'string', desc: 'Slug of the space to pre-select. Empty by default.' },
    ],
    returns: '`string` — a space slug, or an empty string for no pre-selection.',
    related: ['fluent_community/portal_vars'],
  },

  'fluent_community/disable_duplicate_comment_check': {
    summary: 'Filters whether the identical-comment guard is skipped for this submission.',
    details:
      'By default a comment whose body exactly matches an earlier comment by the same user on the same post is ' +
      'rejected with "No duplicate comment please!". The check only runs when the comment has text, so image-only ' +
      'replies bypass it regardless. Return `true` to skip it — useful for short affirmations such as "thanks" in ' +
      'busy spaces.',
    params: [
      { name: 'skipCheck', type: 'bool', desc: 'Whether to skip the duplicate check. `false` by default.' },
      { name: 'userId', type: 'int', desc: 'The commenting user\'s ID.' },
      { name: 'feedId', type: 'int', desc: 'The post being commented on.' },
    ],
    returns: '`bool` — `true` to allow the duplicate through.',
    related: ['fluent_community/rate_limit/comments_per_minute'],
  },

  'fluent_community/disable_self_comment_react': {
    summary: 'Filters whether users are barred from reacting to their own comments.',
    details:
      'The name reads as a switch that is on by default, but it is not: it defaults to `false`, meaning self-reacting ' +
      'is permitted. Return `true` to block it, at which point the API responds with an error. It applies to ' +
      'comment reactions only — reactions on the user\'s own posts are unaffected.',
    params: [
      { name: 'disabled', type: 'bool', desc: 'Whether to reject the reaction. `false` by default, so self-reacting is allowed.' },
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The post the comment belongs to, so the rule can be scoped per space.' },
    ],
    returns: '`bool` — `true` to reject a reaction on the user\'s own comment.',
  },

  'fluent_community/comment_order_options': {
    summary: 'Filters the comment sort options a space administrator can choose from as that space\'s default.',
    details:
      'Defaults to `oldest` (labelled "Earliest"), `latest`, `popular` and `most_replied`. It reaches the portal as ' +
      '`comment_order_by_options`, and the only consumer is the space settings form. The reader-facing sort ' +
      'dropdown is hard-coded in the Vue components and the sorting itself is done client-side, so adding a key ' +
      'here makes it selectable as a space default but nothing will know how to apply it. Removing keys is the safe ' +
      'direction. `$context` is `comment` at the only current call site.',
    params: [
      { name: 'options', type: 'array', desc: 'Sort keys mapped to translated labels.' },
      { name: 'context', type: 'string', desc: 'The list being sorted; `comment` today.' },
    ],
    returns: '`array` — an associative map of sort key to label, preserving order.',
    related: ['fluent_community/portal_vars'],
  },

  'fluent_community/rate_limit/comments_per_minute': {
    summary: 'Filters how many comments a member may post in a rolling one-minute window.',
    details:
      'Defaults to 5. The comparison is `count > limit` against comments created in the last 60 seconds, so the ' +
      'effective allowance is one more than the number returned — the default lets six through before the sixth ' +
      'attempt is refused. Site administrators are exempt before the filter is reached, and exceeding the limit ' +
      'throws rather than returning a structured error.',
    params: [
      { name: 'limitPerMinute', type: 'int', desc: 'Comments allowed per rolling minute, 5 by default.' },
    ],
    returns: '`int` — the limit. A very large value effectively disables comment rate limiting.',
    related: ['fluent_community/disable_duplicate_comment_check'],
  },

  'fluent_community/report_reasons': {
    summary: 'Filters the reasons a member can pick when reporting a post or comment.',
    details:
      'Defaults to harassment, spam, offensive, incorrect space, against community rules, and other. Keys are stored ' +
      'verbatim in the moderation record\'s `reason` column, so renaming a key orphans the label on reports already ' +
      'filed under the old one. Labels are translated through the `fluent-community` text domain; translate ' +
      'additions yourself.',
    params: [
      { name: 'reasons', type: 'array', desc: 'Reason keys mapped to translated labels.' },
    ],
    returns: '`array` — an associative map of stored key to display label.',
    related: ['fluent_community/content_moderation/created'],
  },

  'fluent_community/space/meta_fields': {
    summary: 'Collects extra settings sections to render on a space\'s settings screen.',
    details:
      'Starts as an empty array; each contributor adds one entry keyed by a provider slug, containing ' +
      '`section_title`, a `settings` array of current values and a `fields` array of form field definitions. ' +
      'Saving posts the values back through `fluent_community/space/update_meta_settings_{provider}`, so the two must ' +
      'use the same key. Rather than filtering directly, prefer `FluentExtendApi::addMetaBox()`, which wires both ' +
      'sides up for you and works for spaces and courses at once. If nothing is added, the screen shows no ' +
      'additional settings at all.',
    params: [
      { name: 'metaFields', type: 'array', desc: 'Settings sections keyed by provider slug. Empty by default.' },
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space whose settings are being rendered.' },
    ],
    returns: '`array` — the sections map. Returning an empty array suppresses the meta settings response entirely.',
    related: ['fluent_community/course/meta_fields'],
  },

  'fluent_community/course/meta_fields': {
    summary: 'Collects extra settings sections to render on a course\'s settings screen.',
    details:
      'The course-side twin of `fluent_community/space/meta_fields`, with the same section shape and the same paired ' +
      'save action, `fluent_community/course/update_meta_settings_{provider}`. It differs in passing a third ' +
      'argument, the raw request payload; `FluentExtendApi::addMetaBox()` registers its callback with only two, so ' +
      'declare the argument count you actually need.',
    params: [
      { name: 'metaFields', type: 'array', desc: 'Settings sections keyed by provider slug. Empty by default.' },
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course whose settings are being rendered.' },
      { name: 'requestData', type: 'array', desc: 'The full request payload. Optional in practice — omit it unless you need it.' },
    ],
    returns: '`array` — the sections map.',
    related: ['fluent_community/space/meta_fields'],
  },

  'fluent_community/portal_vars': {
    summary: 'Filters the complete configuration payload handed to the portal Vue application.',
    details:
      'The main extension point for the front end: everything the SPA knows about the current user, enabled ' +
      'features, permissions, URLs and translated strings passes through here, and both core modules and Pro use it ' +
      'to bolt on their own keys. Several narrower filters are applied while this array is being built, so they ' +
      'run before any callback attached here and can be overridden from it. Two keys are added after the filter — ' +
      '`welcome_banner`, and `auth_url`/`allow_signup` for logged-out visitors — so they cannot be filtered here. ' +
      'The result is printed into the page, so do not add secrets.',
    params: [
      { name: 'portalVars', type: 'array', desc: 'The portal configuration payload, including `auth`, `permissions`, `features`, `urls`, `i18n` and `rest`.' },
    ],
    returns: '`array` — the payload. Merge into it rather than replacing it; removing keys the SPA expects will break the portal.',
    related: ['fluent_community/portal_notices', 'fluent_community/date_time_i18n', 'fluent_community/max_media_per_post'],
  },

  // ---- Pro plugin hooks ----


  // ---------------------------------------------------------------------------
  // Followers  (app/Http/Controllers/FollowController.php)
  // All four fire only when the `followers_module` feature is enabled — the whole
  // /profile/{username}/follow route group is registered behind that flag.
  // ---------------------------------------------------------------------------

  'fluent_community/followed_user': {
    summary: 'Fires immediately after one member starts following another.',
    details: 'Fired from two call sites — the explicit POST /profile/{username}/follow endpoint and the POST /profile/{userId}/toggle-follow endpoint when the toggle resolves to "follow". The Follow row has already been inserted with its default level of 1, so a callback can read $follow->id. It does not fire when an existing block is lifted, and it never fires for self-follows or for a user who already has any Follow row (including a block, which is a Follow row at level 0).',
    params: [
      { name: 'follow', type: '\\FluentCommunityPro\\App\\Models\\Follow', desc: 'The newly created follow row (follower_id, followed_id, level).' },
      { name: 'xProfile', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'Profile of the user being followed.' },
    ],
    related: ['fluent_community/before_unfollowing_user', 'fluent_community/blocked_user'],
  },

  'fluent_community/before_unfollowing_user': {
    summary: 'Fires just before a follow relationship is deleted.',
    details: 'Fired from both the explicit POST /profile/{username}/unfollow endpoint and the toggle-follow endpoint when the toggle resolves to "unfollow". The row still exists when callbacks run — this is the last chance to read it, since the handler calls $follow->delete() on the next line. There is no matching "after" action.',
    params: [
      { name: 'follow', type: '\\FluentCommunityPro\\App\\Models\\Follow', desc: 'The follow row about to be deleted.' },
      { name: 'xProfile', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'Profile of the user being unfollowed.' },
    ],
    related: ['fluent_community/followed_user'],
  },

  'fluent_community/blocked_user': {
    summary: 'Fires after one member blocks another.',
    details: 'A block is stored as a Follow row with level 0, so this fires both when a brand new row is created and when an existing follow is demoted to a block. This is a member-to-member block, not a moderation action: the endpoint explicitly refuses when the target has community moderator access, and also refuses when the *caller* is a moderator.',
    params: [
      { name: 'follow', type: '\\FluentCommunityPro\\App\\Models\\Follow', desc: 'The follow row now at level 0.' },
      { name: 'xProfile', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'Profile of the blocked user.' },
    ],
    page: 'members',
    related: ['fluent_community/before_unblocking_user'],
  },

  'fluent_community/before_unblocking_user': {
    summary: 'Fires just before a block is lifted.',
    details: 'The row still exists when callbacks run; the handler deletes it on the next line. Unblocking deletes the row outright rather than restoring it to level 1, so the previous follow relationship is not recovered and no follow action fires afterwards.',
    params: [
      { name: 'follow', type: '\\FluentCommunityPro\\App\\Models\\Follow', desc: 'The level-0 follow row about to be deleted.' },
      { name: 'xProfile', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'Profile of the user being unblocked.' },
    ],
    page: 'members',
    related: ['fluent_community/blocked_user'],
  },

  // ---------------------------------------------------------------------------
  // Quiz  (app/Modules/Quiz/)
  // ---------------------------------------------------------------------------

  'fluent_community/question_types': {
    summary: 'Filters the list of quiz question types offered in the lesson editor.',
    details: 'The default list holds only single_choice and multiple_choice. This list drives the editor UI only — it is published to the portal as appVars.question_types and is never consulted when grading. The grader independently understands a third type, written_answer (with grading_mode of open or exact_match), so adding an entry here does not by itself teach the grader anything, and omitting one does not stop an already-saved question of that type from being graded.',
    params: [
      { name: 'types', type: 'array', desc: 'List of [ value, label ] maps.' },
    ],
    returns: 'The list of question types, each an array with `value` and `label` keys.',
    related: ['fluent_community/quiz/submitted'],
  },

  'fluent_community/quiz/submitted': {
    summary: 'Fires after a student submits a quiz and the attempt has been scored and saved.',
    details: 'Fires on every submission, including re-attempts — the attempt counter lives in $quizResult->meta[\'attempts\']. The row is already persisted, so $quizResult->score (0-100) and $quizResult->status are final. status is "passed"/"failed" only when the lesson has a passing score enabled, otherwise it is "published". If the lesson meta sets hide_result, $quizResult->message has already been scrubbed of the correct/incorrect flags before this action runs.',
    params: [
      { name: 'quizResult', type: '\\FluentCommunityPro\\App\\Modules\\Quiz\\QuizModel', desc: 'The saved attempt (score, status, meta, per-question message map).' },
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The student who submitted.' },
      { name: 'quiz', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson', desc: 'The quiz-type lesson that was answered.' },
    ],
    related: ['fluent_community/question_types'],
  },

  'fluent_community/quiz/exportable_result_row': {
    summary: 'Filters one row of the course quiz-results export.',
    details: 'Runs once per attempt in GET /admin/courses/{course_id}/export/quiz-results. Keys are human-readable column headings, not slugs — Student Name, Email, Username, Quiz, Score, Grade, Total Attempts, Submitted At — so adding a key adds a column. The export is capped at 5000 attempts.',
    params: [
      { name: 'row', type: 'array', desc: 'Column heading => value map for one attempt.' },
      { name: 'result', type: '\\FluentCommunityPro\\App\\Modules\\Quiz\\QuizModel', desc: 'The attempt, with xprofile, user and lesson eager-loaded.' },
      { name: 'courseId', type: 'int', desc: 'Course the export was requested for.' },
    ],
    returns: 'The row map to write to the export.',
    related: ['fluent_community/quiz/exportable_result_rows'],
  },

  'fluent_community/quiz/exportable_result_rows': {
    summary: 'Filters the whole quiz-results export payload after every row has been built.',
    details: 'Runs once, after fluent_community/quiz/exportable_result_row has run for each attempt. Use this one to reorder, append or drop rows wholesale; use the singular filter to reshape a row.',
    params: [
      { name: 'data', type: 'array', desc: 'Response payload — a `results` key holding the list of rows.' },
      { name: 'results', type: '\\FluentCommunity\\Framework\\Database\\Orm\\Collection', desc: 'The underlying QuizModel collection the rows were built from.' },
      { name: 'courseId', type: 'int', desc: 'Course the export was requested for.' },
    ],
    returns: 'The export payload array.',
    related: ['fluent_community/quiz/exportable_result_row'],
  },

  // ---------------------------------------------------------------------------
  // User badges
  // ---------------------------------------------------------------------------

  'fluent_community/xprofile/badge': {
    summary: 'Filters the badge object exposed as XProfile::$badge.',
    details: 'Backs a model accessor, so it runs every time $xprofile->badge is read — including once per profile in any serialized member list. Nothing in core or Pro attaches a callback, and the default is null: this is an unimplemented extension point. Note that the shipped Pro badge feature does not go through it — those badges are stored per profile in xprofile meta under badge_slug and published to the portal separately via the user_badges portal var.',
    params: [
      { name: 'badge', type: 'mixed', desc: 'Null by default.' },
      { name: 'xprofile', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'The profile whose badge is being resolved.' },
    ],
    returns: 'The badge value to expose on the profile, or null for none. Keep it cheap — this runs per profile, per render.',
  },

  // ---------------------------------------------------------------------------
  // PWA  (app/Modules/Pwa/PwaHelper.php)
  // These build the web app manifest and the portal install entry.
  // ---------------------------------------------------------------------------

  'fluent_community/pwa/description': {
    summary: 'Filters the description field of the PWA web app manifest.',
    details: 'Defaults to the site tagline from get_bloginfo(\'description\'). The result is cast to string.',
    params: [
      { name: 'description', type: 'string', desc: 'Manifest description, the site tagline by default.' },
    ],
    returns: 'The manifest description string.',
    related: ['fluent_community/pwa/orientation', 'fluent_community/pwa/theme_color'],
  },

  'fluent_community/pwa/orientation': {
    summary: 'Filters the screen orientation lock declared in the PWA manifest.',
    details: 'Defaults to "any" deliberately — course lessons and video play landscape, so a portrait lock would trap those screens. The return value is validated against the manifest spec list (any, natural, portrait, landscape, portrait-primary, portrait-secondary, landscape-primary, landscape-secondary) and anything else silently falls back to "any".',
    params: [
      { name: 'orientation', type: 'string', desc: 'Orientation lock, "any" by default.' },
    ],
    returns: 'One of the eight allowed manifest orientation values; any other string is ignored.',
    related: ['fluent_community/pwa/description'],
  },

  'fluent_community/pwa/install_button_text': {
    summary: 'Filters the label on the portal "Install App" entry.',
    details: 'Applies to the in-portal install entry only, not to the manifest. The result is cast to string.',
    params: [
      { name: 'buttonText', type: 'string', desc: 'Button label, "Install App" by default.' },
    ],
    returns: 'The button label string.',
    related: ['fluent_community/pwa/install_button_icon'],
  },

  'fluent_community/pwa/install_button_icon': {
    summary: 'Filters the inline SVG glyph on the portal install entry.',
    details: 'The shipped default is returned untouched; anything a callback returns is treated as untrusted and passed through CustomSanitizer::sanitizeSvg(). That sanitizer\'s allowlist drops stroke-linecap, stroke-linejoin and aria-hidden, so a replacement glyph should not rely on them. Use stroke="currentColor" so the icon follows the portal color mode.',
    params: [
      { name: 'icon', type: 'string', desc: 'Inline SVG markup for the install glyph.' },
    ],
    returns: 'Inline SVG markup. It will be sanitized unless it is byte-identical to the default.',
    related: ['fluent_community/pwa/install_button_text'],
  },

  'fluent_community/pwa/theme_color': {
    summary: 'Filters the PWA theme (title bar / browser chrome) color for one color mode.',
    details: 'Runs once per mode. The default follows the portal top-bar background for the active color schema rather than the brand button color, so the installed app window blends into the portal header. Falls back to #ffffff (light) / #2B2E33 (dark) when no schema color resolves.',
    params: [
      { name: 'color', type: 'string', desc: 'Hex color for this mode.' },
      { name: 'mode', type: 'string', desc: 'Either "light" or "dark".' },
    ],
    returns: 'A hex color string.',
    related: ['fluent_community/pwa/background_color'],
  },

  'fluent_community/pwa/background_color': {
    summary: 'Filters the PWA splash screen background color for one color mode.',
    details: 'An admin-set background color in the PWA settings wins over the per-mode portal body color; the manifest carries a single static value, so an explicit choice applies to every mode. Falls back to #ffffff (light) / #2B2E33 (dark).',
    params: [
      { name: 'color', type: 'string', desc: 'Hex color for this mode.' },
      { name: 'mode', type: 'string', desc: 'Either "light" or "dark".' },
    ],
    returns: 'A hex color string.',
    related: ['fluent_community/pwa/theme_color'],
  },

  // ---------------------------------------------------------------------------
  // Document library  (app/Modules/DocumentLibrary/)
  // ---------------------------------------------------------------------------

  'fluent_community/document/local_file_access': {
    summary: 'Fires just before a locally stored document is streamed to the browser.',
    details: 'Runs after the permission check has passed, on the local-driver path only — documents on a cloud storage driver redirect to a signed URL and never reach this action. It fires for inline views as well as downloads, and headers have not been sent yet, so a callback can still short-circuit. Note this is a download of a document, not of a media-gallery item.',
    params: [
      { name: 'document', type: '\\FluentCommunity\\App\\Models\\Media', desc: 'The media row being served (object_source is space_document or lesson_document).' },
      { name: 'forceDownload', type: 'string', desc: 'The raw force_download request value; empty means serve PDFs and raster images inline.' },
    ],
  },

  'fluent_community/space_document_title_label': {
    summary: 'Filters the "Documents" label in a space\'s header navigation.',
    details: 'Only reached for spaces whose permissions grant can_view_documents, i.e. where the space has document_library enabled. It renames the menu entry only — the route name and the API paths are unaffected.',
    params: [
      { name: 'label', type: 'string', desc: 'Menu label, "Documents" by default.' },
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\BaseSpace', desc: 'The space the header is being built for.' },
    ],
    returns: 'The menu label string.',
    related: ['fluent_community/space_media_title_label'],
  },

  // ---------------------------------------------------------------------------
  // Media gallery  (app/Modules/MediaGallery/)
  // ---------------------------------------------------------------------------

  'fluent_community/space_media/query': {
    summary: 'Filters the media-gallery query builder before it is paged.',
    details: 'Runs after the type filter has been applied — images for "photos", fluent_player media split by an audio token in settings for "videos" and "audios" — and before the cursor and per-page limits. This is the hook for adding constraints or eager loads; returning anything that is not a query builder will break the endpoint.',
    params: [
      { name: 'query', type: '\\FluentCommunity\\Framework\\Database\\Orm\\Builder', desc: 'The Media query for this space and tab.' },
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space whose gallery is being listed.' },
      { name: 'type', type: 'string', desc: 'One of photos, videos, audios.' },
    ],
    returns: 'The query builder.',
    related: ['fluent_community/space_media/api_response'],
  },

  'fluent_community/space_media/api_response': {
    summary: 'Filters the media-gallery API response.',
    details: 'The payload always carries items, has_more and cursor; has_audio is present only on the first page (no cursor), because the audio tab visibility is resolved once rather than per page. Fires after fluent_community/space_media/viewed.',
    params: [
      { name: 'response', type: 'array', desc: 'Response payload: items, has_more, cursor, and has_audio on the first page.' },
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space whose gallery was listed.' },
      { name: 'type', type: 'string', desc: 'One of photos, videos, audios.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/space_media/query', 'fluent_community/space_media/viewed'],
  },

  'fluent_community/space_media/transform_item': {
    summary: 'Filters one media item as it is shaped into the gallery API structure.',
    details: 'Runs once per row on every page of the gallery, so keep callbacks cheap and avoid per-item queries — the feed and its author are already eager-loaded on the model. The `kind` key is the gallery\'s own classification (image / video / audio) and is not the raw mime type, which is carried separately as media_type. `feed` is null for media not attached to a post.',
    params: [
      { name: 'item', type: 'array', desc: 'The item payload: id, url, media_type, kind, settings, created_at, feed.' },
      { name: 'media', type: '\\FluentCommunity\\App\\Models\\Media', desc: 'The underlying media row.' },
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space whose gallery is being listed.' },
    ],
    returns: 'The item payload array.',
    related: ['fluent_community/space_media/query', 'fluent_community/space_media/api_response'],
  },

  'fluent_community/space_media_title_label': {
    summary: 'Filters the "Media" label in a space\'s header navigation.',
    details: 'Only reached for spaces whose permissions grant can_view_media, i.e. where the space has media_gallery enabled. It renames the menu entry only — the route name and the API path are unaffected. The media entry is added at priority 0, ahead of the documents entry at priority 1.',
    params: [
      { name: 'label', type: 'string', desc: 'Menu label, "Media" by default.' },
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\BaseSpace', desc: 'The space the header is being built for.' },
    ],
    returns: 'The menu label string.',
    related: ['fluent_community/space_document_title_label'],
  },

  'fluent_community/space_media/viewed': {
    summary: 'Fires when a member loads a page of a space media gallery.',
    details: 'Fires once per request, including for each paged scroll, so it is a page-view signal rather than a first-visit signal. It runs only after the can_view_media permission check has passed.',
    params: [
      { name: 'space', type: '\\FluentCommunity\\App\\Models\\Space', desc: 'The space whose gallery was viewed.' },
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The viewer, or null for a guest on a public space.' },
      { name: 'type', type: 'string', desc: 'The tab viewed — photos, videos or audios.' },
    ],
    related: ['fluent_community/space_media/api_response'],
  },

  // ---------------------------------------------------------------------------
  // SEO / sitemap  (app/Modules/SeoSiteMap/)
  // ---------------------------------------------------------------------------

  'fluent_community/seo/ld_comment_limit': {
    summary: 'Filters how many comments are embedded in a post\'s JSON-LD structured data.',
    details: 'Defaults to 100 and is cast to int. It caps the comments serialized into the schema.org graph for SEO only — it has no effect on the comments the portal or the REST API return. Replies are nested under their parent within whatever the limit returns, so a low limit can orphan replies whose parent fell outside it.',
    params: [
      { name: 'limit', type: 'int', desc: 'Maximum comments to embed, 100 by default.' },
    ],
    returns: 'The comment limit as an integer.',
    page: 'rendering',
  },

  'fluent_communuty/add_sitemap_provider': {
    summary: 'Filters whether FluentCommunity registers its WordPress sitemap provider.',
    details: 'Returning false on this filter stops wp_register_sitemap_provider() from running, which removes the community entries from the core WordPress sitemap — useful when a dedicated SEO plugin is already emitting them. It runs on `init`, so a callback has to be attached before that. Note the hook prefix is misspelled `fluent_communuty` in the source; the name is part of the public surface and is documented as written.',
    params: [
      { name: 'shouldRegister', type: 'bool', desc: 'True by default.' },
    ],
    returns: 'Boolean — false to skip registering the sitemap provider.',
    page: 'rendering',
  },

  // ---------------------------------------------------------------------------
  // Leaderboard  (app/Modules/LeaderBoard/)
  // ---------------------------------------------------------------------------

  'fluent_community/leaderboard_api_response': {
    summary: 'Filters the GET /leaderboard response.',
    details: 'The payload holds a leaderboard list of exactly three boards, keyed 7_days, 30_days and all_time, each with a title and up to ten items. Entries whose XProfile is missing or not active have already been dropped, and the all-time pass may have written back a corrected total_points before this filter runs. The boards themselves are served from a cache that is cleared when leaderboard levels are saved.',
    params: [
      { name: 'response', type: 'array', desc: 'Response payload with a `leaderboard` key.' },
      { name: 'xProfiles', type: '\\FluentCommunity\\Framework\\Database\\Orm\\Collection', desc: 'The XProfiles appearing on any board, keyed by user_id.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/user_level_upgraded'],
  },

  'fluent_community/user_level_upgraded': {
    summary: 'Fires when a member\'s point total moves them into a higher leaderboard level.',
    details: 'Fires only on a genuine level change, not on every point change: the handler first checks that the new total exceeds the old level\'s ceiling and then that the level slug actually differs. Because it hangs off fluent_community/user_points_updated it can fire from the hourly point recalculation or the daily sync job, not only from live activity. It is one-directional — there is no downgrade action. Requires the leader_board_module feature to be enabled; FluentCRM automations use it as a trigger.',
    params: [
      { name: 'xprofile', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'The member who levelled up, with the new total_points already saved.' },
      { name: 'newLevel', type: 'array', desc: 'The new level — title, tagline, slug, level, min_points, max_points.' },
      { name: 'oldLevel', type: 'array', desc: 'The previous level, same shape.' },
    ],
    related: ['fluent_community/leaderboard_api_response'],
  },

  // ---------------------------------------------------------------------------
  // Bulk membership / CRM tag resolution  (app/Http/Controllers/BulkMembersController.php)
  // Each response filter wraps a payload of added / skipped / failed / processed /
  // total / has_more / message counters.
  // ---------------------------------------------------------------------------

  'fluent_community/bulk_members/add_members_response': {
    summary: 'Filters the response of the bulk add-members-to-space endpoint.',
    details: 'Applied on both branches of the endpoint — the explicit user_ids batch (capped at 500 ids per request) and the copy-from-another-source batch — so a callback sees the same counter payload either way.',
    params: [
      { name: 'response', type: 'array', desc: 'Counters: added, skipped, failed, processed, total, has_more, message.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
      { name: 'spaceSlug', type: 'string', desc: 'Slug of the target space.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/bulk_members/import_members_response'],
  },

  'fluent_community/bulk_members/add_students_response': {
    summary: 'Filters the response of the bulk enroll-students-in-course endpoint.',
    details: 'Applied on both branches of the endpoint — the explicit user_ids batch (capped at 500 ids per request) and the copy-from-another-source batch.',
    params: [
      { name: 'response', type: 'array', desc: 'Counters: added, skipped, failed, processed, total, has_more, message.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
      { name: 'courseId', type: 'int', desc: 'Target course id.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/bulk_members/import_students_response'],
  },

  'fluent_community/bulk_members/import_members_response': {
    summary: 'Filters the response of the CSV/list import-members-into-space endpoint.',
    details: 'This is the import path, which may create WordPress users that do not exist yet; the add path never does. Chunked — has_more and the counters describe the current chunk against the running total.',
    params: [
      { name: 'response', type: 'array', desc: 'Counters: added, skipped, failed, processed, total, has_more, message.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
      { name: 'spaceSlug', type: 'string', desc: 'Slug of the target space.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/bulk_members/add_members_response'],
  },

  'fluent_community/bulk_members/import_students_response': {
    summary: 'Filters the response of the CSV/list import-students-into-course endpoint.',
    details: 'The course-side counterpart of the member import; may create WordPress users that do not exist yet, and is chunked the same way.',
    params: [
      { name: 'response', type: 'array', desc: 'Counters: added, skipped, failed, processed, total, has_more, message.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
      { name: 'courseId', type: 'int', desc: 'Target course id.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/bulk_members/add_students_response'],
  },

  'fluent_community/bulk_members/crm_tag_members_resolve_response': {
    summary: 'Filters the response of resolving a FluentCRM tag into space members.',
    details: 'The hook name is assembled at runtime from a prefix and a suffix, so a source scan for the literal string will not find it — the call site is the shared runCrmTagResolve() helper. Requires FluentCRM to be active. The payload is a page of resolved user ids plus counters; the caller pages through with offset and per_page, and create_missing controls whether contacts without a WordPress user get one created.',
    params: [
      { name: 'response', type: 'array', desc: 'Resolved user_ids plus failed / processed counters.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
      { name: 'spaceSlug', type: 'string', desc: 'Slug of the space the tag is being resolved for.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/bulk_members/crm_tag_students_resolve_response'],
  },

  'fluent_community/bulk_members/crm_tag_students_resolve_response': {
    summary: 'Filters the response of resolving a FluentCRM tag into course students.',
    details: 'The course-side counterpart, from the same runtime-assembled hook name in runCrmTagResolve(). Requires FluentCRM to be active.',
    params: [
      { name: 'response', type: 'array', desc: 'Resolved user_ids plus failed / processed counters.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
      { name: 'courseId', type: 'int', desc: 'Course the tag is being resolved for.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/bulk_members/crm_tag_members_resolve_response'],
  },

  // ---------------------------------------------------------------------------
  // Community managers  (app/Http/Controllers/ProAdminController.php)
  // ---------------------------------------------------------------------------

  'fluent_community/manager/added': {
    summary: 'Fires when a user is given community manager roles for the first time.',
    details: 'Fires only on first assignment — updating an existing manager fires fluent_community/manager/updated instead. The roles array has already been normalised: "admin" collapses the list to just ["admin"], and course_creatror is dropped when course_admin is also present.',
    params: [
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The user, with community_role freshly loaded.' },
      { name: 'roles', type: 'array', desc: 'Normalised list of role slugs.' },
    ],
    related: ['fluent_community/manager/updated', 'fluent_community/manager/before_remove'],
  },

  'fluent_community/manager/updated': {
    summary: 'Fires when an existing community manager\'s roles change.',
    details: 'Guarded by a value comparison, so re-saving the same set of roles fires nothing. The roles have already been normalised the same way as on add.',
    params: [
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The manager being updated.' },
      { name: 'roles', type: 'array', desc: 'The new normalised list of role slugs.' },
    ],
    related: ['fluent_community/manager/added'],
  },

  'fluent_community/manager/before_remove': {
    summary: 'Fires just before a user\'s community manager roles are deleted.',
    details: 'The community_role relation is still readable here, which is the only place to capture which roles are being taken away — the paired after-action runs once the row is gone. Note the after-action is named `managed/after_remove`, not `manager/after_remove`.',
    params: [
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The manager being demoted, with community_role still loaded.' },
    ],
    related: ['fluent_community/managed/after_remove'],
  },

  'fluent_community/managed/after_remove': {
    summary: 'Fires after a user\'s community manager roles have been deleted.',
    details: 'The paired action for `manager/before_remove`. The segment is spelled `managed` rather than `manager`, which looks like a typo but is part of the public surface; the role row no longer exists by the time this runs.',
    params: [
      { name: 'user', type: '\\FluentCommunity\\App\\Models\\User', desc: 'The demoted user.' },
    ],
    related: ['fluent_community/manager/before_remove'],
  },

  // ---------------------------------------------------------------------------
  // Sidebar links  (app/Http/Controllers/ProAdminController.php)
  // ---------------------------------------------------------------------------

  'fluent_community/sidebar_link/before_delete': {
    summary: 'Fires just before a custom portal sidebar link is deleted.',
    details: 'The record is still readable here. There is no matching hook on save — only delete is instrumented.',
    params: [
      { name: 'link', type: '\\FluentCommunity\\App\\Models\\SidebarLink', desc: 'The link about to be deleted.' },
    ],
    related: ['fluent_community/sidebar_link/after_delete'],
  },

  'fluent_community/sidebar_link/after_delete': {
    summary: 'Fires after a custom portal sidebar link has been deleted.',
    details: 'The in-memory model is still passed, but the row is gone by this point.',
    params: [
      { name: 'link', type: '\\FluentCommunity\\App\\Models\\SidebarLink', desc: 'The deleted link.' },
    ],
    related: ['fluent_community/sidebar_link/before_delete'],
  },

  // ---------------------------------------------------------------------------
  // Scheduled posts  (app/Http/Controllers/SchedulePostsController.php)
  // ---------------------------------------------------------------------------

  'fluent_community/scheduled_posts_api_response': {
    summary: 'Filters the GET /scheduled-posts response.',
    details: 'Each feed in the paginated list has already been run through FeedsHelper::transformFeed(), so it carries the same shape as a normal feed listing.',
    params: [
      { name: 'data', type: 'array', desc: 'Response payload with a paginated `feeds` key.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
    ],
    returns: 'The response payload array.',
    related: ['fluent_community/feed/rescheduled'],
  },

  'fluent_community/feed/rescheduled': {
    summary: 'Fires after a scheduled post is moved to a new publish time.',
    details: 'Fires only for posts still in `scheduled` status, and only once the new time has passed the 30-minutes-from-now minimum. The Action Scheduler job has already been unscheduled and re-queued at the new UTC time. Publishing a scheduled post early does not fire this — that path fires fluent_community/feed/created (and fluent_community/space_feed/created for space posts) instead.',
    params: [
      { name: 'feed', type: '\\FluentCommunity\\App\\Models\\Feed', desc: 'The rescheduled post, with the new scheduled_at saved.' },
    ],
    related: ['fluent_community/scheduled_posts_api_response'],
  },

  // ---------------------------------------------------------------------------
  // Course email notifications  (app/Hooks/Handlers/CourseEmailNotificationHandler.php)
  // The `{type}` segment is assembled at runtime from the course type, so only
  // `scheduled` and `structured` ever appear.
  // ---------------------------------------------------------------------------

  'fluent_community/course/scheduled/init_notification': {
    summary: 'Fires when drip email notifications are armed for a section of a scheduled-drip course.',
    details: 'Only reached for courses whose course_type is `scheduled` and for sections whose meta has email_enabled set to yes. Paired with the unschedule action — a settings change fires unschedule then init, so callbacks must be idempotent.',
    params: [
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
      { name: 'section', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic', desc: 'The section whose notification is being armed.' },
    ],
    related: ['fluent_community/course/scheduled/unschedule_notification'],
  },

  'fluent_community/course/scheduled/unschedule_notification': {
    summary: 'Fires when drip email notifications are cancelled for a section of a scheduled-drip course.',
    details: 'Fires on an explicit cancel, on a settings reset (immediately before the matching init), and once per section when a course is switched away from the scheduled type — in that last case the handler has already flipped each section\'s email_enabled to no.',
    params: [
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
      { name: 'section', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic', desc: 'The section whose notification is being cancelled.' },
    ],
    related: ['fluent_community/course/scheduled/init_notification'],
  },

  'fluent_community/course/structured/init_notification': {
    summary: 'Fires when drip email notifications are armed for a section of a structured course.',
    details: 'The structured counterpart. Structured courses schedule per enrolled student rather than per section date, so the per-student Action Scheduler jobs are keyed on both section id and user id.',
    params: [
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
      { name: 'section', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic', desc: 'The section whose notification is being armed.' },
    ],
    related: ['fluent_community/course/structured/unschedule_notification'],
  },

  'fluent_community/course/structured/unschedule_notification': {
    summary: 'Fires when drip email notifications are cancelled for a section of a structured course.',
    details: 'Fires on an explicit cancel, on a settings reset immediately before the matching init, and once per section when a course is switched away from the structured type.',
    params: [
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
      { name: 'section', type: '\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic', desc: 'The section whose notification is being cancelled.' },
    ],
    related: ['fluent_community/course/structured/init_notification'],
  },

  'fluent_community/course_smart_codes': {
    summary: 'Filters the smart codes available in course drip notification emails.',
    details: 'A map of placeholder token to human label, used to populate the editor\'s insert menu. Registering a token here only advertises it — the replacement itself has to be wired separately, so an unresolved token will render literally in the email.',
    params: [
      { name: 'smartCodes', type: 'array', desc: 'Map of "{{token}}" => label.' },
    ],
    returns: 'The smart code map.',
    related: ['fluent_community/default_course_email_notification'],
  },

  'fluent_community/default_course_email_notification': {
    summary: 'Filters the default subject and body used for course drip notification emails.',
    details: 'Supplies the starting template for a section that has no saved notification of its own; a section with its own saved copy is unaffected. The default text uses the smart codes from fluent_community/course_smart_codes.',
    params: [
      { name: 'notification', type: 'array', desc: 'Default template with `subject` and `message` keys.' },
    ],
    returns: 'The default notification array.',
    related: ['fluent_community/course_smart_codes'],
  },

  // ---------------------------------------------------------------------------
  // Course welcome banner  (Pro)
  // ---------------------------------------------------------------------------

  'fluent_community/course_welcome_banner': {
    summary: 'Filters the welcome banner shown on a course, per audience.',
    details: 'Returns null before the filter runs when the banner for that view is not enabled, so callbacks only see enabled banners. The raw markdown `description` has already been stripped in favour of the rendered version, and for the not_enrolled view the allowClose flag is stripped too — a guest-facing banner cannot be dismissed.',
    params: [
      { name: 'banner', type: 'array', desc: 'The banner settings for this view.' },
      { name: 'view', type: 'string', desc: 'Either "enrolled" or "not_enrolled".' },
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
    ],
    returns: 'The banner settings array, or null to render no banner.',
    related: ['fluent_community/get_course_welcome_banner_settings', 'fluent_community/update_course_welcome_banner_settings'],
  },

  'fluent_community/get_course_welcome_banner_settings': {
    summary: 'Filters the course welcome banner settings returned to the admin editor.',
    details: 'The admin read path, not the render path — both the enrolled and not_enrolled views are always present here, already merged over the defaults, including views that are disabled.',
    params: [
      { name: 'settings', type: 'array', desc: 'Banner settings keyed by view.' },
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
    ],
    returns: 'The settings array.',
    related: ['fluent_community/course_welcome_banner'],
  },

  'fluent_community/update_course_welcome_banner_settings': {
    summary: 'Filters course welcome banner settings on save, just before they are persisted.',
    details: 'Runs after sanitisation and after each view\'s markdown description has been rendered into description_rendered. A callback that rewrites `description` here must render description_rendered itself, since that step has already happened.',
    params: [
      { name: 'settings', type: 'array', desc: 'Sanitised banner settings keyed by view.' },
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
    ],
    returns: 'The settings array to persist.',
    related: ['fluent_community/course/welcome_banner_updated'],
  },

  'fluent_community/course/welcome_banner_updated': {
    summary: 'Fires after course welcome banner settings have been saved.',
    details: 'Runs once the settings are persisted, so it is the right place to bust a cache. The settings passed are the post-filter, post-sanitisation values.',
    params: [
      { name: 'course', type: '\\FluentCommunity\\Modules\\Course\\Model\\Course', desc: 'The course.' },
      { name: 'settings', type: 'array', desc: 'The saved banner settings.' },
    ],
    related: ['fluent_community/update_course_welcome_banner_settings'],
  },

  // ---------------------------------------------------------------------------
  // Course student export  (app/Http/Controllers/ProAdminController.php)
  // ---------------------------------------------------------------------------

  'fluent_community/course/exportable_student_row': {
    summary: 'Filters one row of the course student export.',
    details: 'Runs once per student. Keys are human-readable column headings — Name, Email, Username, Progress, Enrollment Date, Last Activity — so adding a key adds a column. The export is capped at 5000 students and progress is pre-computed in bulk, so a callback should avoid re-querying it per row.',
    params: [
      { name: 'row', type: 'array', desc: 'Column heading => value map for one student.' },
      { name: 'student', type: '\\FluentCommunity\\App\\Models\\XProfile', desc: 'The student profile, with user and space_pivot loaded.' },
      { name: 'progress', type: 'int', desc: 'Completion percentage for this course.' },
      { name: 'courseId', type: 'int', desc: 'Course the export was requested for.' },
    ],
    returns: 'The row map to write to the export.',
    related: ['fluent_community/admin_course_exportable_students_api_response'],
  },

  'fluent_community/admin_course_exportable_students_api_response': {
    summary: 'Filters the whole course student export payload after every row has been built.',
    details: 'Runs once, after fluent_community/course/exportable_student_row has run for each student.',
    params: [
      { name: 'data', type: 'array', desc: 'Response payload — a `students` key holding the list of rows.' },
      { name: 'requestData', type: 'array', desc: 'The full request parameters.' },
      { name: 'courseId', type: 'int', desc: 'Course the export was requested for.' },
    ],
    returns: 'The export payload array.',
    related: ['fluent_community/course/exportable_student_row'],
  },

  // ---------------------------------------------------------------------------
  // Settings: auth, lockscreen, custom profile fields
  // ---------------------------------------------------------------------------

  'fluent_community/update_auth_settings': {
    summary: 'Filters the portal authentication settings just before they are saved.',
    details: 'Runs after AuthenticationService::formatAuthSettings() has normalised the payload and before it is written to the option and primed into the week-long cache. The login and signup form field lists are attached to the response *after* this filter, so they are not visible to a callback.',
    params: [
      { name: 'settings', type: 'array', desc: 'The formatted auth settings.' },
    ],
    returns: 'The settings array to persist.',
  },

  'fluent_community/update_lockscreen_settings': {
    summary: 'Filters lockscreen (paywall) settings just before they are saved to a space or course.',
    details: 'Shared by both endpoints — PUT /spaces/{spaceSlug}/lockscreens and PUT /admin/courses/{course_id}/lockscreens — so the second argument is a Space on one path and a Course on the other. Branch on the model type if the two need different handling. Runs after LockscreenService::formatLockscreenFields().',
    params: [
      { name: 'settings', type: 'array', desc: 'The formatted lockscreen fields.' },
      { name: 'target', type: '\\FluentCommunity\\App\\Models\\BaseSpace', desc: 'The Space or Course the lockscreen belongs to.' },
    ],
    returns: 'The lockscreen settings array to persist.',
  },

  'fluent_community/custom_profile_field_types': {
    summary: 'Filters the field types available when building custom profile fields.',
    details: 'A map of type slug to label backing the admin field-type picker. Registering a type here only offers it in the picker — storage, validation and rendering for a new type have to be supplied separately.',
    params: [
      { name: 'fieldTypes', type: 'array', desc: 'Map of type slug => label (text, textarea, number, date, select, radio, url, multiselect).' },
    ],
    returns: 'The field type map.',
  },

  // ---------------------------------------------------------------------------
  // Integrations
  // ---------------------------------------------------------------------------

  'fluent_community/wppayform__defaults': {
    summary: 'Filters the default settings for the Paymattic (WPPayForm) community integration on a form.',
    details: 'Supplies the starting values shown when the integration is first configured for a form — space and course assignment, auto-login, welcome email, the conditional-logic block, and the removal triggers for subscription cancellation and refund. Requires Paymattic to be active. It does not affect a form whose integration settings have already been saved.',
    params: [
      { name: 'fields', type: 'array', desc: 'The default integration settings.' },
      { name: 'formId', type: 'int', desc: 'The Paymattic form id.' },
    ],
    returns: 'The default settings array.',
  },
}

/**
 * Hand-written prose per REST operation, keyed by `<module>/<operation-slug>` (the
 * bare slug also works). Without an entry an operation's description just restates
 * its title, which tells a reader nothing.
 *
 * Fields, all optional except summary:
 *   summary   one sentence: what the endpoint does and for whom
 *   details   permissions, side effects, pagination, gotchas — omit rather than pad
 *   notes     array of short caveats rendered as a bullet list
 */
const OPERATION_NOTES = {}

/**
 * Where a hook lives is decided by its source file before its name, because names
 * lie: `fluent_community/course/topic_completed` matched the `topic` rule and filed
 * itself under spaces. First match wins; order matters.
 */
const HOOK_PATH_RULES = [
  [/\/Modules\/Course\//, 'courses'],
  [/\/app\/Modules\/Quiz\//, 'courses'],
  [/\/Modules\/Auth\//, 'auth'],
  [/\/Modules\/Integrations\/|\/app\/Modules\/Integrations\//, 'integrations'],
  [/\/Modules\/Theming\/|\/Modules\/Gutenberg\/|\/app\/Views\//, 'rendering'],
  [/Moderation(Handler|Controller)\.php/, 'moderation'],
  [/\/app\/Modules\/Pwa\//, 'settings'],
  [/\/app\/Modules\/LeaderBoard\//, 'members'],
  [/\/app\/Modules\/DocumentLibrary\/|\/app\/Modules\/MediaGallery\//, 'media'],
]

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

/**
 * `mixedNote` explains what "core and Pro" means in the caller's context, because
 * the old "Core + PRO" label read as "you need Pro for this" when it actually means
 * the thing is defined in core and Pro also participates — no licence required to
 * use it.
 */
function renderSourceLabel(sourceIds, mixedNote = 'extended by Pro') {
  const normalized = [...new Set(sourceIds)].sort()
  if (!normalized.length) {
    return '—'
  }
  const hasCore = normalized.includes('core')
  const hasPro = normalized.includes('pro')

  if (hasCore && hasPro) {
    return `Core <span class="edition-note">(${mixedNote})</span>`
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
  if (route.groupPrefix === 'media-gallery') {
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

  const verb = route.methodKey.toLowerCase()
  const actionSlug = slugifyClass(route.action)
  if (actionSlug === verb || actionSlug.startsWith(`${verb}-`)) {
    return actionSlug
  }
  return `${verb}-${actionSlug}`
}

function buildOperationMeta(route) {
  const slug = buildOperationAlias(route)
  const title = humanizeSlug(slug)
  const operationId = kebabToCamel(slug)
  const note = OPERATION_NOTES[`${route.module}/${slug}`] || OPERATION_NOTES[slug]
  return {
    slug,
    title,
    operationId,
    // Without a note this restates the title, which tells the reader nothing —
    // add entries to OPERATION_NOTES rather than leaving the fallback in place.
    description:
      (note && note.summary) ||
      `${title} for the FluentCommunity ${MODULE_META[route.module]?.title || route.module}.`,
    notes: note || null,
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
    const inferredResponseExample = resolved
      ? extractResponseShape(resolved.method, models, { module, slug: operation.slug })
      : { message: 'Success' }
    const errors = resolved
      ? extractErrorResponses(resolved.method, supportMethods)
      : [{ status: 400, message: 'Request error.' }]
    const inferredRequestBodyExample = buildRequestBodyExample(params.body)
    const requestBodySchema = buildRequestBodySchemaFromParams(params.body)

    // A recorded sample beats the statically inferred shape whenever we have one.
    const captured = getCapturedExample(module, operation.slug)
    const responseExample = captured?.response ?? inferredResponseExample
    const requestBodyExample = captured?.request ?? inferredRequestBodyExample

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
      exampleOrigin: captured?.origin || 'inferred',
      isCapturedExample: captured?.origin === 'captured',
      capturedQuery: captured?.query || null,
    }
  })
}

/**
 * Best-effort type for a parameter expression. This is a guess from the variable
 * name, so it returns a single concrete type when the name is unambiguous and plain
 * `mixed` otherwise — the old `Feed|mixed` unions meant "unsure" while reading like
 * a real union, and their pipes broke the Markdown tables they sat in.
 *
 * HOOK_NOTES[].params overrides this wherever a hook has been documented properly.
 */
function inferHookType(expr) {
  const normalized = expr.replace(/^&/, '').trim()

  if (normalized.startsWith('[') || normalized.endsWith(']')) {
    return 'array'
  }
  if (/->all\(\)/.test(normalized) || /toArray\(\)/.test(normalized)) {
    return 'array'
  }
  if (/^'|^"/.test(normalized)) {
    return 'string'
  }
  if (/^(true|false)$/i.test(normalized)) {
    return 'bool'
  }
  if (/^-?\d+$/.test(normalized)) {
    return 'int'
  }
  // Model checks come before the array-ish name checks: `$feedIds` is an array but
  // `$feed` is a model, and testing `Ids` first mislabelled several model params.
  if (/\bfeed\b|Feed$/i.test(normalized) && !/Ids?\b/i.test(normalized)) {
    return 'Feed'
  }
  if (/\bcomment\b|Comment$/i.test(normalized) && !/Ids?\b/i.test(normalized)) {
    return 'Comment'
  }
  if (/\bcourse\b|Course$/i.test(normalized) && !/Ids?\b/i.test(normalized)) {
    return 'Course'
  }
  if (/\blesson\b|Lesson$/i.test(normalized) && !/Ids?\b/i.test(normalized)) {
    return 'CourseLesson'
  }
  if (/\bspace\b|Space$/i.test(normalized) && !/Ids?\b/i.test(normalized)) {
    return 'Space'
  }
  if (/xprofile|XProfile/i.test(normalized)) {
    return 'XProfile'
  }
  if (/Ids\b/i.test(normalized)) {
    return 'int[]'
  }
  if (/Id\b/i.test(normalized)) {
    return 'int'
  }
  if (/users\b/i.test(normalized)) {
    return 'array'
  }
  if (/\buser\b|User$/i.test(normalized)) {
    return 'User'
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
  const path = hookName.replace(/^fluent_community[/_]?/, '')

  // 1. An explicit note wins over everything.
  const note = HOOK_NOTES[hookName]
  if (note && note.page) {
    return note.page
  }

  // 2. The defining file is a better signal than the hook name.
  const normalizedPath = toPosix(filePath || '')
  for (const [pattern, page] of HOOK_PATH_RULES) {
    if (pattern.test(normalizedPath)) {
      return page
    }
  }

  // 3. Name rules, most specific first.
  if (/permission|capability|can_view|can_access|can_create|is_allowed/.test(path)) return 'permissions'
  if (/moderation|report|content_flagged|block(ed|ing)_user/.test(path)) return 'moderation'
  // Everything that shapes what the portal renders or how it boots, including the
  // portal_vars bootstrap payload and its nested per-key defaults.
  if (
    /^portal|portal_vars|app_vars|before_portal|template_|theme_|headless|rendering_|block_editor|allowed_block_types|use_editor_block|allowed_html_tags|image_size_names_choose|app_route_paths|base_url|is_rtl|skip_no_conflict|date_time_i18n|on_wp_init|header|footer|sidebar|render_|enqueue_|asset_|editor_i18n/.test(
      path,
    ) &&
    !/portal_slug/.test(path)
  ) {
    return 'rendering'
  }
  if (/course|lesson|section|quiz|question_types/.test(path)) return 'courses'
  if (/comment/.test(path)) return 'comments'
  if (/reaction|survey/.test(path)) return 'reactions'
  if (/feed|ticker|post|bookmark|welcome_banner/.test(path)) return 'feeds'
  if (/notification|digest/.test(path)) return 'notifications'
  if (/auth|invitation|signup|login|password|terms_policy|default_redirect/.test(path)) return 'auth'
  if (/paywall|fluent_player|fluentform|wppayform|product_integration|install_/.test(path)) return 'integrations'
  if (/smartcode|verified_email_senders/.test(path)) return 'notifications'
  if (
    /member|user|profile|xprofile|follow|leaderboard|badge|manage[rd]|activit|default_avatar|display_name|social_link_providers|reactivate_account/.test(
      path,
    )
  ) {
    return 'members'
  }
  if (/media|upload|file|document|giphy|image|webp|attachment|preview_metadata|embed/.test(path)) return 'media'
  if (/space|menu|lockscreen|topic|sidebar_link/.test(path)) return 'spaces'
  if (/setting|config|color|snippet|pwa|portal_slug|features?|pro_upgrade/.test(path)) return 'settings'
  if (/admin|webhook/.test(path) || normalizedPath.includes('/Http/Controllers/AdminController.php')) {
    return 'admin'
  }
  return 'miscellaneous'
}

/**
 * Read a WordPress-style docblock sitting immediately above a hook call.
 *
 * Barely any call site has one today, so this is not the primary prose channel —
 * HOOK_NOTES is. It exists so that documenting a hook at the source counts for
 * something, which is the only way the coverage number improves on its own.
 */
function extractHookDocblock(content, matchIndex) {
  const before = content.slice(0, matchIndex)
  const lineStart = before.lastIndexOf('\n') + 1
  const preceding = before.slice(0, lineStart).replace(/\s+$/, '')
  if (!preceding.endsWith('*/')) {
    return null
  }
  const open = preceding.lastIndexOf('/**')
  if (open === -1) {
    return null
  }

  const body = preceding
    .slice(open + 3, preceding.length - 2)
    .split('\n')
    .map((line) => line.replace(/^\s*\*ted?\s?/, '').replace(/^\s*\*\s?/, '').trim())

  const summary = []
  const params = []
  let since = null

  for (const line of body) {
    const paramMatch = line.match(/^@param\s+(\S+)\s+\$(\w+)\s*(.*)$/)
    if (paramMatch) {
      params.push({ type: paramMatch[1], name: paramMatch[2], desc: paramMatch[3].trim() })
      continue
    }
    const sinceMatch = line.match(/^@since\s+(\S+)/)
    if (sinceMatch) {
      since = sinceMatch[1]
      continue
    }
    if (line.startsWith('@')) {
      continue
    }
    if (line || summary.length) {
      summary.push(line)
    }
  }

  const text = summary.join(' ').replace(/\s+/g, ' ').trim()
  if (!text && !params.length && !since) {
    return null
  }
  return { summary: text || null, params, since }
}

/**
 * Hook names that ship with a typo in the source. They are public surface — third
 * party callbacks are registered against the misspelling — so they must appear in
 * the reference, not be filtered out for failing the prefix check.
 *
 * `fluent_communuty/add_sitemap_provider` is the awkward one: the *prefix* is
 * misspelled, so it sits outside the namespace entirely and evades any
 * prefix-based tooling, this generator included.
 */
const MISSPELLED_HOOK_NAMES = new Set(['fluent_communuty/add_sitemap_provider'])

/**
 * A few hook names are assembled at runtime from a variable that every caller
 * passes as a string literal, so the docs would otherwise show one placeholder
 * where two real, separately-hookable names exist. Resolving them needs
 * cross-method dataflow the parser does not do, so they are listed here.
 *
 * Keep the placeholder documented too — it explains the naming pattern.
 */
const HOOK_NAME_RESOLUTIONS = {
  'fluent_community/bulk_members/{filterTag}': [
    'fluent_community/bulk_members/crm_tag_students_resolve_response',
    'fluent_community/bulk_members/crm_tag_members_resolve_response',
  ],
}

/**
 * Recurring jobs are scheduled with Action Scheduler (or WP cron) and consumed
 * with add_action(), never do_action(), so a scan for hook *calls* misses them
 * entirely — yet `add_action('fluent_community_daily_jobs', …)` is exactly the kind
 * of extension point this reference exists to document.
 */
function extractScheduledActionHooks(content, file, source) {
  const hooks = []
  const regex =
    /(as_schedule_recurring_action|as_schedule_single_action|wp_schedule_event|wp_schedule_single_event)\s*\(/g
  let match

  while ((match = regex.exec(content))) {
    const callStart = content.indexOf('(', match.index)
    const callEnd = scanBalanced(content, callStart, '(', ')')
    if (callEnd === -1) {
      continue
    }
    regex.lastIndex = callStart + 1

    const args = splitTopLevel(content.slice(callStart + 1, callEnd))
    // Action Scheduler takes (timestamp, interval, hook, …); wp_schedule_event
    // takes (timestamp, recurrence, hook, …). Either way the hook is the first
    // plain string literal in the argument list.
    const hookArg = args.find((arg) => /^\s*['"]/.test(arg))
    if (!hookArg) {
      continue
    }
    const hookName = stripQuotes(normalizeWhitespace(hookArg))
    if (!isFluentCommunityHook(hookName)) {
      continue
    }

    hooks.push({
      name: hookName,
      kind: 'action',
      deprecated: false,
      deprecatedSince: null,
      deprecatedReplacement: null,
      scheduled: true,
      sourceId: source.id,
      file: displaySourcePath(file),
      line: getLineNumber(content, match.index),
      category: categorizeHook(hookName, file),
      docblock: null,
      params: [],
    })
  }

  return hooks
}

function isFluentCommunityHook(hookName) {
  // The underscore form (fluent_community_send_daily_digest) is public surface too.
  return hookName.startsWith('fluent_community') || MISSPELLED_HOOK_NAMES.has(hookName)
}

function extractHookCalls() {
  const files = [
    ...collectFilesFromSources(['app'], (file) => file.endsWith('.php')),
    ...collectFilesFromSources(['Modules'], (file) => file.endsWith('.php')),
    // Core fires portal_loaded / on_wp_init from its bootstrap; listFiles() tolerates
    // the directory being absent, so Pro (which has no boot/) is unaffected.
    ...collectFilesFromSources(['boot'], (file) => file.endsWith('.php')),
  ]

  const hooks = []

  for (const file of files) {
    const content = read(file)
    const source = inferSourceConfig(file)
    const regex =
      /(do_action_ref_array|do_action_deprecated|do_action|apply_filters_ref_array|apply_filters_deprecated|apply_filters)\s*\(/g
    let match

    while ((match = regex.exec(content))) {
      const callStart = content.indexOf('(', match.index)
      const callEnd = scanBalanced(content, callStart, '(', ')')
      if (callEnd === -1) {
        continue
      }

      // Resume just inside the call rather than past it: hooks nested in another
      // call's arguments are real (nine of them live inside the portal_vars array)
      // and jumping to callEnd made them invisible.
      regex.lastIndex = callStart + 1

      const inner = content.slice(callStart + 1, callEnd)
      const args = splitTopLevel(inner)
      const hookName = expressionToHookName(args[0] || '')
      if (!isFluentCommunityHook(hookName)) {
        continue
      }

      const fn = match[1]
      const kind = fn.startsWith('apply_filters') ? 'filter' : 'action'
      const deprecated = fn.endsWith('_deprecated')
      const byRefArray = fn.endsWith('_ref_array')

      // do_action_ref_array() and the *_deprecated() variants pass one array of
      // arguments; unwrap it so the documented arity and the `&$var` by-reference
      // hint are both correct.
      let paramExpressions = args.slice(1)
      let deprecatedSince = null
      let deprecatedReplacement = null
      if (deprecated) {
        deprecatedSince = stripQuotes(normalizeWhitespace(args[2] || '')) || null
        deprecatedReplacement = stripQuotes(normalizeWhitespace(args[3] || '')) || null
        paramExpressions = args.slice(1, 2)
      }
      if ((byRefArray || deprecated) && paramExpressions.length === 1) {
        const literal = paramExpressions[0].trim()
        if (literal.startsWith('[') && literal.endsWith(']')) {
          paramExpressions = splitTopLevel(literal.slice(1, -1))
        }
      }

      const params = paramExpressions
        .map((arg) => arg.trim())
        .filter(Boolean)
        .map((arg, index) => ({
          name: normalizeWhitespace(arg.replace(/^&/, '')),
          type: inferHookType(arg),
          byRef: arg.startsWith('&'),
          index: index + 1,
        }))

      hooks.push({
        name: hookName,
        kind,
        deprecated,
        deprecatedSince,
        deprecatedReplacement,
        sourceId: source.id,
        file: displaySourcePath(file),
        line: getLineNumber(content, match.index),
        category: categorizeHook(hookName, file),
        docblock: extractHookDocblock(content, match.index),
        params,
      })

      // Also record the concrete names a runtime-assembled name resolves to, so
      // each is individually findable rather than hidden behind one placeholder.
      for (const resolved of HOOK_NAME_RESOLUTIONS[hookName] || []) {
        hooks.push({
          name: resolved,
          kind,
          deprecated,
          deprecatedSince,
          deprecatedReplacement,
          resolvedFrom: hookName,
          sourceId: source.id,
          file: displaySourcePath(file),
          line: getLineNumber(content, match.index),
          category: categorizeHook(resolved, file),
          docblock: null,
          params,
        })
      }
    }

    hooks.push(...extractScheduledActionHooks(content, file, source))
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
  // Keep the separators as dashes: stripping them made
  // `fluent_community/space/joined` collide with a hypothetical `spacejoined`.
  return name.replace(/[{}$]/g, '').replace(/[/_]/g, '-')
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

/**
 * Parameter expressions are inlined verbatim from source, and a few are whole array
 * literals — the `portal_vars` default array is 13 KB on one line, which destroys the
 * table it sits in. Collapse those to a summary of their keys.
 */
function condenseParamExpression(expression) {
  const value = normalizeWhitespace(expression)
  if (value.length <= 80) {
    return value
  }
  if (value.startsWith('[') && value.endsWith(']')) {
    const entries = splitTopLevel(value.slice(1, -1))
    const keys = entries
      .map((entry) => {
        const key = entry.split('=>')[0]
        return key && key !== entry ? stripQuotes(normalizeWhitespace(key)) : null
      })
      .filter(Boolean)
    if (keys.length) {
      const preview = keys.slice(0, 3).join(', ')
      return `array (${keys.length} keys: ${preview}${keys.length > 3 ? ', …' : ''})`
    }
    return `array (${entries.length} items)`
  }
  return `${value.slice(0, 77)}…`
}

function formatHookParamSummary(params) {
  if (!params.length) {
    return 'No parameters'
  }

  return params
    .map((param) => {
      const name = escapeMarkdownCode(condenseParamExpression(param.name))
      const type = escapeMarkdownCode(param.type)
      return `\`${param.byRef ? '&' : ''}${name}\` (${type})`
    })
    .join('<br>')
}

/**
 * categorizeHook() runs per call site, so a hook fired from two subsystems would be
 * filed on two pages and counted twice. A hook name belongs on exactly one page:
 * settle it once, by the category most of its call sites agree on, breaking ties
 * toward the earliest page in HOOK_PAGE_ORDER (the most specific one).
 */
function settleHookCategories(hooks) {
  const votesByName = new Map()
  for (const hook of hooks) {
    if (!votesByName.has(hook.name)) {
      votesByName.set(hook.name, new Map())
    }
    const votes = votesByName.get(hook.name)
    votes.set(hook.category, (votes.get(hook.category) || 0) + 1)
  }

  const settled = new Map()
  for (const [name, votes] of votesByName) {
    const override = HOOK_NOTES[name] && HOOK_NOTES[name].page
    if (override) {
      settled.set(name, override)
      continue
    }
    const winner = [...votes.entries()].sort((a, b) => {
      if (a[1] !== b[1]) return b[1] - a[1]
      return HOOK_PAGE_ORDER.indexOf(a[0]) - HOOK_PAGE_ORDER.indexOf(b[0])
    })[0][0]
    settled.set(name, winner)
  }

  return hooks.map((hook) => ({ ...hook, category: settled.get(hook.name) }))
}

function buildHookDocs(rawHooks) {
  const hooks = settleHookCategories(rawHooks)
  const actionHooks = hooks.filter((hook) => hook.kind === 'action')
  const filterHooks = hooks.filter((hook) => hook.kind === 'filter')

  const coverage = {}
  const writtenPages = { action: [], filter: [] }

  for (const kind of ['action', 'filter']) {
    const collection = kind === 'action' ? actionHooks : filterHooks
    const pageDir = join(docsRoot, 'hooks', kind === 'action' ? 'actions' : 'filters')
    const pageList = HOOK_PAGES[kind]

    // Any category without a page silently loses its hooks, which is how every
    // comment filter went missing. Fail the build rather than the docs.
    const orphanCategories = [...new Set(collection.map((hook) => hook.category))].filter(
      (category) => !pageList.includes(category),
    )
    if (orphanCategories.length) {
      throw new Error(
        `Hook categories with no ${kind} page: ${orphanCategories.join(', ')}. ` +
          'Add them to HOOK_PAGE_ORDER or fix categorizeHook().',
      )
    }

    // Totals are counted from what actually reaches a page, so the index can never
    // disagree with the sum of its pages again. Empty pages are not written at all —
    // there are no `admin` actions, for instance, and a stub page is just noise.
    const pagedHooks = pageList
      .map((page) => ({
        page,
        hooks: collection.filter((hook) => hook.category === page),
      }))
      .filter((entry) => entry.hooks.length > 0)
    const writtenGroups = pagedHooks.reduce((sum, entry) => sum + groupHooksByName(entry.hooks).length, 0)
    const writtenCallSites = pagedHooks.reduce((sum, entry) => sum + entry.hooks.length, 0)

    writeFile(
      join(pageDir, 'index.md'),
      `---
title: ${kind === 'action' ? 'Action Hooks' : 'Filter Hooks'}
description: Source-verified ${kind} hook inventory for FluentCommunity.
---

# ${kind === 'action' ? 'Action Hooks' : 'Filter Hooks'}

This page is generated from ${kind === 'action' ? '`do_action()`, `do_action_ref_array()` and `do_action_deprecated()`' : '`apply_filters()`, `apply_filters_ref_array()` and `apply_filters_deprecated()`'} calls in the FluentCommunity core and Pro plugin source trees.

## Overview

- **Unique ${kind}s:** ${writtenGroups}
- **${humanizeSlug(kind)} call sites:** ${writtenCallSites}
- **Categories covered:** ${pagedHooks.map((entry) => `\`${entry.page}\``).join(', ')}

## Categories

| Category | Hooks | Call sites |
| --- | --- | --- |
${pagedHooks
  .map(
    (entry) =>
      `| [${humanizeSlug(entry.page)}](/hooks/${kind === 'action' ? 'actions' : 'filters'}/${entry.page}) | ${groupHooksByName(entry.hooks).length} | ${entry.hooks.length} |`,
  )
  .join('\n')}
`,
    )

    writtenPages[kind] = pagedHooks.map((entry) => entry.page)

    for (const { page, hooks: categoryHooks } of pagedHooks) {
      const categoryGroups = groupHooksByName(categoryHooks)
      coverage[`${kind}/${page}`] = {
        hooks: categoryGroups.length,
        callSites: categoryHooks.length,
        documented: categoryGroups.filter((group) => Boolean(HOOK_NOTES[group.name])).length,
      }
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
      `| [\`${group.name}\`](#${hookAnchor(group.name)}) | ${renderSourceLabel(group.sourceIds, 'also fired by Pro')} | ${group.callSites.length} | \`${group.callSites[0].file}:${group.callSites[0].line}\` |`,
  )
  .join('\n') || '| — | — | — | No hooks found in this category. |'}

${categoryGroups.map((group) => renderHookSection(group, kind)).join('\n')}
`,
      )
    }
  }

  // A note whose key matches no extracted hook is dead weight — usually a typo, or
  // a hook that is only ever add_action'd and never fired. Say so rather than
  // letting it sit there looking like documentation.
  const knownHookNames = new Set(hooks.map((hook) => hook.name))
  const orphanNotes = Object.keys(HOOK_NOTES).filter((name) => !knownHookNames.has(name))
  if (orphanNotes.length) {
    console.warn(
      `  ${orphanNotes.length} HOOK_NOTES entries match no extracted hook: ${orphanNotes.join(', ')}`,
    )
  }

  ensureDir(generatedRoot)
  // The sidebar in .vitepress/config.mts reads this instead of repeating the list,
  // so a taxonomy change only has to be made here.
  writeFile(join(generatedRoot, 'hook-page-order.json'), `${JSON.stringify(writtenPages, null, 2)}\n`)
  writeFile(join(generatedRoot, 'hook-notes-coverage.json'), `${JSON.stringify(coverage, null, 2)}\n`)

  return coverage
}

function renderHookSection(group, kind) {
  const note = HOOK_NOTES[group.name] || {}
  const summary = describeHook(group)
  const documentedParamList = hookParamsFrom(group)
  const params = documentedParamList || mergeHookParamNames(group)
  const since = hookSinceFrom(group)
  const isDeprecated = group.callSites.some((hook) => hook.deprecated)
  const deprecatedSite = group.callSites.find((hook) => hook.deprecated)

  const meta = [
    `- **Type:** ${kind}`,
    `- **Edition:** ${renderSourceLabel(group.sourceIds, 'also fired by Pro')}`,
    `- **Call sites:** ${group.callSites.length}`,
  ]
  if (since) {
    meta.push(`- **Since:** ${since}`)
  }
  if (summary) {
    meta.push(`- **When it fires:** ${summary}`)
  }

  const isScheduled = group.callSites.every((hook) => hook.scheduled)
  const scheduledNotice = isScheduled
    ? `
::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with \`add_action()\` as usual.
:::
`
    : ''

  const resolvedFrom = group.callSites.find((hook) => hook.resolvedFrom)
  const resolvedNotice = resolvedFrom
    ? `
::: info Resolved name
The source assembles this name at runtime from \`${resolvedFrom.resolvedFrom}\`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::
`
    : ''

  const deprecationNotice = isDeprecated
    ? `
::: warning Deprecated
This hook is fired through \`${kind === 'action' ? 'do_action_deprecated' : 'apply_filters_deprecated'}()\`${
        deprecatedSite && deprecatedSite.deprecatedSince
          ? ` as of ${deprecatedSite.deprecatedSince}`
          : ''
      }.${
        deprecatedSite && deprecatedSite.deprecatedReplacement
          ? ` Use \`${deprecatedSite.deprecatedReplacement}\` instead.`
          : ' Avoid it in new code.'
      }
:::
`
    : ''

  const detailsBlock = note.details ? `\n${note.details}\n` : ''

  const documentedParams =
    documentedParamList && documentedParamList.length
      ? `
### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
${documentedParamList
  .map(
    (param, index) =>
      `| ${index + 1} | \`$${param.name}\` | \`${escapeMarkdownCode(param.type || 'mixed')}\` | ${param.desc || '—'} |`,
  )
  .join('\n')}
`
      : ''

  const returnsBlock =
    kind === 'filter' && note.returns ? `\n**Return:** ${note.returns}\n` : ''

  const relatedBlock = note.related && note.related.length
    ? `\n**Related:** ${note.related.map((name) => `[\`${name}\`](#${hookAnchor(name)})`).join(' · ')}\n`
    : ''

  return `
<a id="${hookAnchor(group.name)}"></a>

## \`${group.name}\`

${meta.join('\n')}
${scheduledNotice}${resolvedNotice}${deprecationNotice}${detailsBlock}${documentedParams}${returnsBlock}
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
${buildHookExample(group)}
\`\`\`
${relatedBlock}`
}

/**
 * Pick the call site an example should be built from. The first site after sorting
 * by path can be a Pro site that passes fewer arguments than Core does, which
 * produced examples with the wrong arity — take the widest signature instead, and
 * prefer Core when several sites tie.
 */
function pickExampleCallSite(group) {
  return group.callSites.reduce((best, candidate) => {
    if (candidate.params.length !== best.params.length) {
      return candidate.params.length > best.params.length ? candidate : best
    }
    if (best.sourceId !== 'core' && candidate.sourceId === 'core') {
      return candidate
    }
    return best
  }, group.callSites[0])
}

/**
 * A hook fired from several places may pass a variable at one site and a string
 * literal at another; `'by_admin'` cannot be named, so borrow the name that another
 * call site gives that position.
 */
function mergeHookParamNames(group) {
  const site = pickExampleCallSite(group)
  return site.params.map((param, index) => {
    if (/\$[A-Za-z_]/.test(param.name) || /->[A-Za-z_]/.test(param.name)) {
      return param
    }
    const named = group.callSites
      .map((candidate) => candidate.params[index])
      .find((candidate) => candidate && /\$[A-Za-z_]/.test(candidate.name))
    return named ? { ...param, name: named.name } : param
  })
}

/**
 * Prefer a hand-written note, fall back to a source docblock, and print nothing at
 * all when neither exists — the old fallback rendered the same filler sentence 412
 * times, which is strictly worse than an absent bullet.
 */
function describeHook(group) {
  const note = HOOK_NOTES[group.name]
  if (note && note.summary) {
    return note.summary
  }
  const documented = group.callSites.find((hook) => hook.docblock && hook.docblock.summary)
  return documented ? documented.docblock.summary : null
}

function hookParamsFrom(group) {
  const note = HOOK_NOTES[group.name]
  if (note && note.params) {
    return note.params
  }
  const documented = group.callSites.find(
    (hook) => hook.docblock && hook.docblock.params && hook.docblock.params.length,
  )
  return documented ? documented.docblock.params : null
}

function hookSinceFrom(group) {
  const note = HOOK_NOTES[group.name]
  if (note && note.since) {
    return note.since
  }
  const documented = group.callSites.find((hook) => hook.docblock && hook.docblock.since)
  return documented ? documented.docblock.since : null
}

function buildHookExampleArgs(params) {
  const used = new Set()

  return params.map((param, index) => {
    // An array literal has no name of its own; naming it after the first value
    // inside produced signatures like `function ($display_name, $student, ...)`
    // for a parameter that is the whole row array.
    const isArrayLiteral = /^\s*(\[|array\s*\()/.test(param.name)
    const propertyMatch = isArrayLiteral ? null : param.name.match(/->([A-Za-z_][A-Za-z0-9_]*)/)
    const variableMatch = isArrayLiteral ? null : param.name.match(/\$([A-Za-z_][A-Za-z0-9_]*)/)
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

function buildHookExample(group) {
  const note = HOOK_NOTES[group.name]
  if (note && note.example) {
    return note.example
  }

  const site = pickExampleCallSite(group)
  const documented = hookParamsFrom(group)
  const params = documented || mergeHookParamNames(group)
  const fn = site.kind === 'action' ? 'add_action' : 'add_filter'
  const args = documented ? documented.map((param) => param.name) : buildHookExampleArgs(params)
  const signature = args
    .map((name, index) => `${params[index] && params[index].byRef ? '&' : ''}$${name}`)
    .join(', ')
  const returnLine = site.kind === 'filter' ? `\n    return $${args[0] || 'value'};` : ''

  return `${fn}('${group.name}', function (${signature}) {${returnLine}\n}, 10, ${args.length});`
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

Every route runs behind a WordPress REST authentication check and then a
FluentCommunity policy. Authenticate the request the way you would any WordPress
REST call:

- **Server to server:** a [WordPress Application Password](https://wordpress.org/documentation/article/application-passwords/) sent as HTTP Basic auth. The interactive examples on these pages use this.
- **In the browser:** the logged-in cookie plus an \`X-WP-Nonce\` header carrying a \`wp_rest\` nonce. This is what the portal itself uses.

## Authorization

Authentication only establishes *who* you are. Each route group then applies a
policy, and the policy is what decides whether the call is allowed:

| Policy | Applies to | Requirement |
| --- | --- | --- |
| \`PortalPolicy\` | Feeds, comments, reactions, members, notifications, profile, activity, options | An active member profile with portal access. Anything other than \`GET\` also requires a logged-in user. |
| \`SpacePolicy\` | Spaces | Portal access, plus per-space membership and role checks inside each method. |
| \`AdminPolicy\` | Admin and settings routes | Community administrator. |
| \`CourseAdminPolicy\` | Course administration | Course-creator access, and management rights over the course named in the path. |
| \`ModerationPolicy\` | Moderation reports | Community moderator access; the \`content_moderation\` feature must also be enabled for the listing routes. |
| \`TopicPolicy\` | Topic management | Space-manage access, with a narrow read-only exception for course creators fetching topic options. |
| \`InvitationPolicy\` | Invitations | Any logged-in user with portal access; per-space moderator rights are then checked inside each method. |

::: warning Community administrator is not a WordPress administrator
\`AdminPolicy\` checks FluentCommunity's own \`community_admin\` permission (or a
super admin), not the WordPress \`manage_options\` capability. A community
administrator is a role FluentCommunity delegates, and it can be granted to users
who have no elevated WordPress capabilities at all. Treat these routes as
privileged, but do not assume the caller is a site administrator.
:::

A route may also be gated by a feature flag (\`Helper::isFeatureEnabled('…')\`) or
by the Pro plugin being active. Where that applies it is called out on the
operation's own page.

## Conventions

- **Method override:** the portal frontend sends \`PUT\`, \`PATCH\` and \`DELETE\` as \`POST\` with an \`X-HTTP-Method-Override\` header. Direct API clients can use the real verbs.
- **Pagination:** list endpoints return a paginator object (\`data\`, \`total\`, \`per_page\`, \`current_page\`, \`last_page\`) and accept \`page\` and \`per_page\`.
- **Errors:** most failures return a JSON body with a \`message\` key. Note that several endpoints report a *business* failure as HTTP 200 with only a \`message\` — check the body, not just the status.

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
${route.notes && route.notes.summary ? `\n${route.notes.summary}\n` : ''}${
          route.notes && route.notes.details ? `\n${route.notes.details}\n` : ''
        }
## Endpoint

- **Method:** \`${route.httpMethod}\`
- **Path:** \`${route.routePath}\`
- **Edition:** ${renderSourceLabel([route.sourceId])}
- **Controller:** \`${route.controllerClass}@${route.action}\`
- **Route source:** \`${route.routeFile}:${route.routeLine}\`
${route.controllerFile ? `- **Controller source:** \`${route.controllerFile}\`` : ''}
${
  route.notes && route.notes.notes && route.notes.notes.length
    ? `\n${route.notes.notes.map((item) => `- ${item}`).join('\n')}\n`
    : ''
}${renderExampleProvenance(route.exampleOrigin)}

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
  const hookCoverage = buildHookDocs(hooks)
  buildRouteOverviewAndSpecs(routes)

  const byOrigin = routes.reduce((carry, route) => {
    carry[route.exampleOrigin] = (carry[route.exampleOrigin] || 0) + 1
    return carry
  }, {})

  console.log(
    `Generated docs for ${MODEL_ORDER.length} models, ${
      hookSummary.uniqueActionNames + hookSummary.uniqueFilterNames
    } unique hooks across ${hooks.length} call sites, and ${routes.length} routes.`,
  )
  console.log(
    `Response samples: ${byOrigin.captured || 0} recorded live, ${
      byOrigin.manual || 0
    } reconstructed from source, ${byOrigin.inferred || 0} inferred from static analysis.`,
  )

  const describedRoutes = routes.filter((route) => route.notes && route.notes.summary).length
  console.log(
    `Endpoint prose: ${describedRoutes}/${routes.length} operations have a hand-written description (${Math.round(
      (describedRoutes / routes.length) * 100,
    )}%). Add entries to OPERATION_NOTES to raise it.`,
  )

  const hookTotals = Object.values(hookCoverage).reduce(
    (carry, entry) => ({
      hooks: carry.hooks + entry.hooks,
      documented: carry.documented + entry.documented,
    }),
    { hooks: 0, documented: 0 },
  )
  console.log(
    `Hook prose: ${hookTotals.documented}/${hookTotals.hooks} hooks have a hand-written note (${Math.round(
      (hookTotals.documented / hookTotals.hooks) * 100,
    )}%). Add entries to HOOK_NOTES to raise it.`,
  )

  const inferred = routes.filter((route) => route.exampleOrigin === 'inferred')
  if (inferred.length) {
    console.log(
      `  Still inferred: ${inferred.map((route) => `${route.module}/${route.slug}`).join(', ')}`,
    )
  }
}

main()
