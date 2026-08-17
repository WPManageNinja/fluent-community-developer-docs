/**
 * Hand-written prose for FluentCommunity hooks, keyed by full hook name.
 *
 * Nothing here is derivable from source — the plugin has no `@since` tags and
 * almost no hook docblocks — so this is the only channel for explaining what a
 * hook is *for*. `scripts/generate-docs.mjs` reads it; a key that matches no
 * extracted hook is reported as a warning on every run, so typos surface.
 *
 * Every field is optional except `summary`. Fill entries in incrementally.
 *
 *   page     explicit category override, beats the file-path and name rules
 *   summary  one sentence: when it fires (actions) / what it filters (filters)
 *   details  longer prose, rendered under the summary
 *   params   [{ name, type, desc }] positional; replaces the guessed table
 *   returns  filters only: what a callback must return
 *   related  other hook names to cross-link
 *   since    version string, only if genuinely known
 */
export const HOOK_NOTES = {

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
