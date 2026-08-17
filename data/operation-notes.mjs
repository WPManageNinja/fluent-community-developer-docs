/**
 * Hand-written prose for REST operations, keyed by `<module>/<operation-slug>`
 * (the bare slug also works). Without an entry an operation's description just
 * restates its title, which tells a reader nothing.
 *
 * The keys match `docs/restapi/operations/<module>/<slug>.md`. A key that matches
 * no operation is reported as a warning on every generator run.
 *
 * Every field is optional except `summary`:
 *
 *   summary  one sentence: what the endpoint does and what it returns
 *   details  permissions, side effects, pagination, gotchas — omit rather than pad
 *   notes    array of short standalone caveats, rendered as a bullet list
 */
export const OPERATION_NOTES = {
  // ---------------------------------------------------------------------------
  // activity
  // ---------------------------------------------------------------------------
  'activity/list-activities': {
    summary:
      'Returns the most recent post-published and comment-added events, collapsed to one entry per post per action, with a pre-rendered message and a portal route for each.',
    details:
      'Scope the stream with `context[space_id]` or `context[user_id]`; when both are present the space wins. `per_page` defaults to 5 and is capped by the `fluent_community/max_per_page` filter (100 by default), and `has_more` is derived by fetching one extra row rather than by counting. A call with no space returns `pinned_posts` as well; scoped to a space, pinned posts are returned only when `with_pins` is set, and `with_pending_count` adds the number of pending join requests for callers who can add members.',
    notes: [
      'Callers who are not community moderators see only activity flagged public or belonging to a space they are a member of.',
      'Activity from deactivated or blocked profiles, and from posts that are no longer published, is filtered out.',
    ],
  },

  // ---------------------------------------------------------------------------
  // admin
  // ---------------------------------------------------------------------------
  'admin/get-general-settings': {
    summary:
      'Returns the portal-wide settings record together with the list of WordPress roles that can be granted portal access and whether open registration is enabled on the site.',
    details:
      'The `administrator` role is stripped from `user_roles` because administrators always have access. `users_can_register` reflects the WordPress option, not a FluentCommunity setting.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/save-general-settings': {
    summary:
      'Persists the portal-wide settings record — branding, access level, auth copy and redirects, and the portal slug.',
    details:
      'Only keys that already exist in the stored settings are accepted, so unknown fields are dropped silently. Logo, white-logo and featured-image URLs are resolved against the media table and the matching media rows are marked active so the cleanup cron does not remove them. Changing `slug` flushes the rewrite rules and returns a `redirect_url`; the slug is ignored when the `FLUENT_COMMUNITY_PORTAL_SLUG` constant is defined.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/change-portal-slug': {
    summary:
      'Changes the URL segment the portal is served from and rebuilds the WordPress rewrite rules so the new path resolves immediately.',
    details:
      'The submitted slug passes through `sanitize_title()` and must not be empty. Rewrite rules are flushed and the cached `rewrite_rules` option is deleted, so the first request after this call is slower than usual. Requests are rejected when the `FLUENT_COMMUNITY_PORTAL_SLUG` constant pins the slug in code.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Every existing portal URL changes; links held elsewhere will 404 until they are updated.',
    ],
  },
  'admin/get-email-settings': {
    summary:
      'Returns the global email notification settings — digest schedule, sender details and template branding — falling back to the portal logo when no email-specific logo is set.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/save-email-settings': {
    summary:
      'Merges the submitted email notification settings over the stored ones and saves the result.',
    details:
      'Submitted values are merged onto the previous settings, so a partial payload is safe. If `digest_mail_day` or `daily_digest_time` changes, every queued `fluent_community_send_daily_digest_init` action is unscheduled and the digest is re-queued on the next cron pass.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/get-storage-settings': {
    summary:
      'Returns the media storage driver configuration, with secrets masked; without the Pro plugin it always reports the local driver.',
    notes: ['Remote storage drivers require FluentCommunity Pro.'],
  },
  'admin/save-storage-settings': {
    summary:
      'Validates and stores the media storage driver configuration, testing the connection before saving anything for remote drivers.',
    details:
      'Required fields differ per driver (`amazon_s3`, `bunny_cdn`, `cloudflare_r2` and `local`). Sending the literal `FCOM_ENCRYPTED_DATA_KEY` for `access_key` or `secret_key` keeps the currently stored credential instead of overwriting it. A failed connection test aborts the save. Selecting `local` also switches the `cloud_storage` feature flag off; any remote driver switches it on.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; rejected outright when the `FLUENT_COMMUNITY_CLOUD_STORAGE` constant defines the config in code.',
    ],
  },
  'admin/get-admin-welcome-banner': {
    summary:
      'Returns the two portal welcome banner variants — one shown to signed-in members, one to logged-out visitors — as stored, before rendering.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/save-admin-welcome-banner': {
    summary:
      'Stores both welcome banner variants and pre-renders their Markdown descriptions to HTML so the portal does not have to parse them per request.',
    details:
      'Rendering happens only for a variant whose `enabled` flag is `yes`. When the logged-out variant has a button label and `useCustomUrl` is not `yes`, its link is replaced with the portal auth URL. The result is written to the options table and cached for a week.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/get-auth-settings': {
    summary:
      'Returns the login and signup configuration together with the resolved form field definitions the auth screens render.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Reading is available in core, but saving these settings is a Pro endpoint.',
    ],
  },
  'admin/save-auth-settings': {
    summary:
      'Normalises and stores the login and signup configuration, then returns it with the recalculated form field definitions.',
    details:
      'The payload is passed through the auth settings formatter, so unrecognised keys are dropped and each field is coerced to its expected shape. The saved settings are also written to a week-long cache used by the front-end auth screens.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/get-onboarding-settings': {
    summary:
      'Returns the general settings plus everything the setup wizard needs: which sibling Fluent plugins are already installed and the current user name and email to prefill.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/save-onboarding-settings': {
    summary:
      'Applies the setup wizard answers — site title, logo, portal slug and starter content — and kicks off the optional plugin installs.',
    details:
      'Passing a `template` creates the matching starter spaces. Any of `install_fluentcrm`, `install_fluentsmtp` and `install_fluentcart` set to `yes` triggers a background install of that plugin from the WordPress.org repository. The slug is only applied when it has not already been fixed. Rewrite rules are flushed at the end.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Installs plugins on the site and can opt the submitted email address into the FluentCommunity newsletter.',
    ],
  },
  'admin/get-profile-link-providers': {
    summary:
      'Returns the catalogue of social link providers members can add to their profile, including the ones currently disabled.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/save-profile-link-providers': {
    summary:
      'Records which social link providers are offered on the profile editor, discarding any submitted key that is not a known provider.',
    details:
      'The filtered list is handed to the `fluent_community/update_profile_link_providers` action; persistence is done by the handler listening on that hook rather than by the controller itself.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'admin/list-all-space-courses': {
    summary:
      'Returns every space and course row in serial order, ignoring privacy and membership, for use in admin pickers and mapping screens.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Secret spaces and unpublished courses are included; do not reuse this response in member-facing UI.',
    ],
  },
  'admin/list-admin-managers': {
    summary:
      'Returns the paginated list of members who hold a FluentCommunity management role, with their role set and profile attached.',
    details:
      'The optional `search` term matches display name, email address or login. Members whose profile is not active are excluded.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/save-admin-manager': {
    summary:
      'Grants or replaces the FluentCommunity role set for one WordPress user, creating their community profile if they do not have one yet.',
    details:
      '`user_id` and a non-empty `roles` array are required. Granting `admin` discards every other role in the payload, and `course_admin` supersedes `course_creatror`. Existing managers are updated in place; the role set is stored whole, so omitting a role removes it.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/delete-admin-manager': {
    summary:
      'Revokes every FluentCommunity management role from a user, leaving their WordPress account and community profile intact.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/search-admin-users': {
    summary:
      'Searches WordPress users for the admin pickers, returning a paginated list matched on name, login and email.',
    details:
      'Pass `context=add_manager` to exclude users who already hold a community role. On multisite the result is limited to users with capabilities on the current site.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/get-messaging-settings': {
    summary:
      'Returns the direct-messaging configuration alongside the realtime socket credentials used by the chat client.',
    details:
      'Fails with a message asking for an update when the installed Fluent Messaging plugin is too old to expose the config helper.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro and the Fluent Messaging plugin.',
    ],
  },
  'admin/save-messaging-settings': {
    summary:
      'Merges the submitted messaging settings over the stored ones and saves the realtime socket credentials when realtime chat is switched on.',
    details:
      'Keys not already present in the stored config are discarded. `socket_config` is only written when `realtime_enabled` is `yes` in the merged result.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro and the Fluent Messaging plugin.',
    ],
  },
  'admin/get-custom-profile-fields': {
    summary:
      'Returns the custom profile field configuration — the field groups, the field definitions and whether the feature is switched on.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/post-save-custom-profile-fields': {
    summary:
      'Replaces the whole custom profile field configuration and keeps the `custom_profile_fields` feature flag in step with the submitted `is_enabled` value.',
    details:
      'Groups are sanitised first and fields are then validated against the surviving group slugs, so a field pointing at a removed group is dropped. Switching the feature on for the first time runs a one-off migration that copies existing custom field values into the profile table.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'The submitted set replaces the stored one, so any group or field left out is deleted.',
    ],
  },
  'admin/list-topics': {
    summary:
      'Returns the post topics defined for the community, along with every space they can be attached to.',
    details:
      'Pass `optionsOnly` for the trimmed id/title/description shape used by pickers; that variant also skips the space list. A `search` term filters topics by title, case-insensitively.',
    notes: [
      'Requires a community admin, a course admin, or the admin role in the space named by `space_id`; course creators may call the `optionsOnly` variant.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/save-topics': {
    summary:
      'Creates a topic or updates an existing one, and reconciles which spaces the topic is available in.',
    details:
      'Passing `id` updates in place; otherwise a new term is created and the slug — derived from `slug` or the title — must be unique. `space_ids` is treated as the complete set: relations not in the list are deleted and missing ones are created, and ids that do not resolve to a space are skipped. The topic cache is cleared afterwards.',
    notes: [
      'Requires a community admin, a course admin, or the admin role in the space named by `space_id`.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/save-topic-config': {
    summary:
      'Stores the community-wide topic limits — how many topics a post and a space may carry, and whether topics appear on post cards.',
    details:
      'Only keys that already exist in the stored config are accepted. The cached config is cleared so the new limits apply to the next post save.',
    notes: [
      'Requires a community admin, a course admin, or the admin role in the space named by `space_id`.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/delete-topic': {
    summary: 'Deletes a post topic and every space relation recorded for it.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin) — a narrower role than the endpoints that create topics.',
      'Requires FluentCommunity Pro.',
      'Destructive: the topic term and its space relations are removed; posts previously tagged with it lose the tag.',
    ],
  },
  'admin/list-webhooks': {
    summary:
      'Returns the paginated list of inbound webhooks, and on the first page also the spaces and courses available as enrolment targets.',
    details:
      'The `courses` key is only present when the `course_module` feature is enabled. Pass `search` to filter by webhook title.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/save-webhook': {
    summary:
      'Creates or updates an inbound webhook that adds or removes the resolved user from a set of spaces and courses when it is called.',
    details:
      'Pass `id` to update an existing hook; the stored `running_count` is carried over rather than reset. Submitted `course_ids`, `space_ids`, `remove_course_ids` and `remove_space_ids` are filtered against real records, and course ids are discarded entirely when the `course_module` feature is off.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/delete-webhook': {
    summary: 'Deletes an inbound webhook so its URL stops accepting calls.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'Destructive and immediate; any external system still posting to the URL will start failing.',
    ],
  },
  'admin/save-sidebar-link': {
    summary:
      'Creates or updates a custom sidebar link inside a space group, including its icon, target and visibility rule.',
    details:
      'A title, a `parent_id` space group, a `privacy` value of `public`, `logged_in`, `members_only` or `logged_out_only`, and a valid `settings.permalink` URL are all required. `members_only` links additionally need `settings.membership_ids`, which are checked against real spaces. Supplying `shape_svg` clears any emoji icon. New links are appended at the end of the group serial order.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/delete-sidebar-link': {
    summary: 'Removes a custom sidebar link from the portal navigation.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/list-user-badges': {
    summary: 'Returns the badge definitions available to award to member profiles.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/save-user-badges': {
    summary:
      'Replaces the whole badge catalogue with the submitted list, keying each badge by its slug and marking any uploaded logo as permanent media.',
    details:
      'Every badge needs a `title`; a missing `slug` is derived from it. SVG shapes and emoji are sanitised, and a badge with neither falls back to an empty emoji. Because the set is stored whole, a badge left out of the payload is removed.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'Removing a badge here does not clear the badge slug already stored on member profiles.',
    ],
  },
  'admin/get-settings': {
    summary:
      'Returns the Progressive Web App settings — app name, short name, icon source, theme colour and install prompt position.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; this is the PWA module settings endpoint despite its generic path name.',
    ],
  },
  'admin/post-save-settings': {
    summary:
      'Validates and stores the Progressive Web App settings, marking a custom icon as permanent media and recording its pixel dimensions.',
    details:
      '`app_name` is required and length-capped, as is `short_name`. `icon_source` must be `default` or `custom`, and a custom source without a resolvable icon is rejected. `install_position` accepts only `top` or `bottom`. Icon dimensions are validated before the media row is activated.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; this is the PWA module settings endpoint despite its generic path name.',
    ],
  },
  'admin/get-license-status': {
    summary:
      'Returns the current Pro licence state, including expiry and a renewal URL when the licence has lapsed.',
    details: 'The licence key itself is stripped from the response. A remote lookup failure is reported as an `invalid` status with the error message rather than as an HTTP error.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'admin/save-license-key': {
    summary: 'Activates a Pro licence key against the remote licensing service and stores the returned licence data.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; makes an outbound HTTP request, so it can fail on restricted networks.',
    ],
  },
  'admin/deactivate-license-key': {
    summary: 'Releases the Pro licence activation for this site so the key can be used elsewhere.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; Pro updates stop after deactivation.',
    ],
  },
  'admin/get-exportable-students': {
    summary:
      'Returns a flattened, spreadsheet-shaped list of a course roster — name, email, username, progress percentage, enrolment date and last activity.',
    details:
      'Capped at 5000 students in a single call and filterable with `search`. Progress is calculated in bulk for the whole page rather than per student.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Requires FluentCommunity Pro.',
      'The response includes member email addresses.',
    ],
  },

  // ---------------------------------------------------------------------------
  // comments
  // ---------------------------------------------------------------------------
  'comments/list-feed-comments': {
    summary:
      'Returns every comment on a post in chronological order, with each author profile attached and the current user liked state flagged.',
    details:
      'Comments are not paginated — the whole thread is returned in one response. Pending comments are only visible to moderators when content moderation is enabled. A post the caller cannot reach, or an unpublished post they cannot edit, returns a 404 rather than an empty list.',
    notes: ['Comments from deactivated or blocked profiles are excluded.'],
  },
  'comments/create-comment': {
    summary:
      'Posts a comment or a threaded reply on a feed item, renders its Markdown, links any attached media and bumps the post comment count.',
    details:
      'Either `comment` text or a media attachment is required; text is capped at 10 000 characters by default. Pass `parent_id` to reply, which must reference a comment on the same post. An identical comment by the same user on the same post is rejected as a duplicate. Mentions are parsed and recorded so the mentioned members are notified. Where content moderation holds the comment, the response carries the resulting status instead of a success message.',
    notes: [
      'Requires the `can_comment` permission in the space, and fails when the post author has disabled comments or the course has comments switched off.',
      'Fires `fluent_community/comment_added`, which is what sends reply and mention notifications.',
    ],
  },
  'comments/update-comment': {
    summary:
      'Replaces the body of an existing comment, re-renders it, and reconciles its attached media with the submitted list.',
    details:
      'The comment must belong to the post named in the path. Media rows attached to the comment but absent from the new payload are handed to the `fluent_community/comment/media_deleted` action for cleanup. Notification hooks fire only when something actually changed.',
    notes: [
      'The comment author can always edit; anyone else needs the `edit_any_comment` permission in the space.',
    ],
  },
  'comments/patch-comment': {
    summary: 'Pins or unpins a top-level comment so it sorts above the rest of the thread.',
    details:
      '`is_sticky` is the only field accepted. Pinning first clears the sticky flag from every other comment on the same post, so a post can only ever have one pinned comment. Replies cannot be pinned.',
    notes: ['Requires a community moderator or community admin, either globally or within the post space.'],
  },
  'comments/delete-comment': {
    summary:
      'Deletes a comment, recounts the comments on its post and hands any attached media to the media cleanup hook.',
    details:
      'The comment must belong to the post named in the path. The post `comments_count` is recalculated from the table rather than decremented, and the post `updated_at` is deliberately left untouched.',
    notes: [
      'The comment author can always delete; anyone else needs the `delete_any_comment` permission in the space.',
      'Destructive: the comment row is removed outright, and replies to it are orphaned rather than deleted.',
    ],
  },
  'comments/get-comment': {
    summary: 'Returns a single comment with its author profile, optionally in the shape the editor expects.',
    details:
      'Pass `context=edit` to receive `media_images` resolved from the stored media metadata instead of the raw `meta` blob. Access is checked against the parent post, so a comment on a post the caller cannot reach returns a 404.',
  },
  'comments/get-comments': {
    summary:
      'Returns a paginated list of the comments one member has written, each with the full parent post eager-loaded so the post can open without a second request.',
    details:
      'Despite living under the comments group this is a profile endpoint, addressed by `{username}`. Viewing another member list is restricted to posts that member can see and to plain text posts; the profile owner and community moderators see everything.',
  },
  'comments/get-course-comments': {
    summary:
      'Returns a paginated, newest-first list of every comment left on lessons within one course, for the course management screen.',
    details:
      'Each row carries the author profile, a trimmed parent lesson reference and a `liked` flag for the current user. Member email addresses are explicitly hidden. Pending comments appear only when content moderation is enabled and the caller can moderate.',
    notes: ['Requires a course admin for this course, or a WordPress user with `manage_options`.'],
  },

  // ---------------------------------------------------------------------------
  // courses
  // ---------------------------------------------------------------------------
  'courses/list-courses': {
    summary:
      'Returns the paginated course catalogue visible to the current user, each entry carrying its enrolment state, progress, section and lesson counts.',
    details:
      'Only published courses are listed, except that course creators also see their own drafts. Secret courses appear only if the caller is enrolled. Filter with `search`, `topic_slug` and `type=enrolled`; sort with `sort_by` set to `alphabetical` (default), `latest` or `oldest`. Pass `with_categories` to receive the category list alongside the courses.',
    notes: ['Courses with `hide_members_count` enabled report a `studentsCount` of zero rather than omitting it.'],
  },
  'courses/list-all-courses': {
    summary:
      'Returns the paginated course catalogue with each course fully expanded — sections, per-lesson lock state and the current user progress track — in a single call.',
    details:
      'This is markedly heavier than `list-courses` because every course is run through the same processing as the single-course endpoint. Non-moderators see public and private courses plus any course they are enrolled in or created; moderators see everything published.',
    notes: [
      'Requires the `course_module` feature to be enabled.',
      'Expect a slow response on large catalogues; prefer `list-courses` for listing screens.',
    ],
  },
  'courses/get-course': {
    summary:
      'Returns one course by numeric id with its sections, the lessons the caller may see, per-lesson lock state and the current progress track.',
    details:
      'Sections with no visible lessons are omitted entirely. Lesson bodies are not parsed unless `intended_lesson_slug` matches, which is what makes the deep-link into a lesson render immediately while the rest lazy-load. Private courses the caller is not enrolled in come back with a `lockscreen_config` instead of content; secret courses return an error.',
    notes: ['Unpublished courses are visible only to their course admins.'],
  },
  'courses/get-course-by-slug': {
    summary:
      'Returns one course by slug with everything `get-course` returns, plus the instructor block — the creator profile, their total course count and optionally their total student count.',
    details:
      'The instructor block is omitted when the course has `hide_instructor_view` set, and the student total is only calculated when `show_instructor_students_count` is on. As with the id variant, pass `intended_lesson_slug` to have that one lesson body rendered eagerly.',
  },
  'courses/get-lesson-by-slug': {
    summary:
      'Returns a single lesson by course and lesson slug, with its access decision resolved and its body parsed only when the caller may read it.',
    details:
      'Access folds together enrolment, the section unlock date for structured and scheduled courses, sequential lesson ordering, and the public-lesson-view setting that lets public self-paced courses be read without enrolling. When access is denied the lesson still comes back, but locked, carrying a `lock_type` and where relevant an `unlock_date`. Draft lessons are visible only to course admins.',
    notes: [
      'Secret courses return an error unless the caller is enrolled or is a course admin.',
      'The `fluent_community/course/can_view_lesson` filter can override the decision, so integrations may widen or narrow access.',
    ],
  },
  'courses/enroll-course': {
    summary:
      'Enrols the current user in a course and returns their freshly initialised progress track.',
    details:
      'Self-enrolment only works on published, public courses; course admins may enrol themselves in their own unpublished courses. Calling it again on an existing enrolment is not an error — it returns the current track with an already-enrolled message.',
    notes: ['Requires a signed-in user; private and secret courses must be joined through an admin or a paywall.'],
  },
  'courses/update-lesson-completion': {
    summary:
      'Marks a lesson complete or incomplete for the current user and returns the recalculated course progress track.',
    details:
      '`state` must be `completed` or `incomplete`. The caller must already be enrolled, and both the course and the lesson must be published. When the update takes progress to 100 per cent the course completion routine runs and `is_completed` comes back true. A lesson gated behind a video watch threshold returns an error with a `video_watch_required` code and the required percentage.',
  },
  'courses/post-mark-lesson-video-watched': {
    summary:
      'Records that the current user has watched enough of a gated lesson video to be allowed to mark the lesson complete.',
    details:
      'Send `watched_percent`; it must reach the lesson threshold or the call is rejected with the required figure. A lesson that is not video-gated returns `is_gated: false` and records nothing.',
    notes: ['Requires a signed-in user who is enrolled in the course.'],
  },
  'courses/delete-reset-my-progress': {
    summary:
      'Clears the current user own completion records for a course and returns an empty progress track, leaving the enrolment in place.',
    notes: [
      'Requires the caller to be enrolled in a published course.',
      'Destructive: every completed-lesson record for this user in this course is removed and cannot be restored.',
    ],
  },
  'courses/list-admin-courses': {
    summary:
      'Returns the paginated list of courses the current user may manage, each with its student count and its section and lesson totals.',
    details:
      'Unlike the portal listing this includes drafts. Filter with `search`, `topic_slug` and `status` (`published` or `draft`); sort with `sort_by=alphabetical`, otherwise newest first. Pass `with_categories` to receive the category list too.',
    notes: ['Requires the course-creator permission; the list is scoped to courses the caller administers.'],
  },
  'courses/get-admin-course': {
    summary:
      'Returns one course in its editable form, with the lock screen configuration, the attached category ids and — when it has students — the completion count and average progress.',
    notes: ['Requires a course admin for this course, or a WordPress user with `manage_options`.'],
  },
  'courses/create-course': {
    summary:
      'Creates a course in draft state, with its type, privacy, layout and lock screen behaviour set from the submitted settings.',
    details:
      '`title`, `description`, `privacy` (`public`, `private` or `secret`) and `course_type` (`self_paced`, `structured` or `scheduled`) are all required. A custom lock screen is only honoured on private courses, and the `redirect` variant additionally requires a valid `settings.onboard_redirect_url`. `public_lesson_view` is only stored for public self-paced courses. A colliding slug gets a timestamp suffix rather than failing.',
    notes: ['Requires the course-creator permission.'],
  },
  'courses/update-course': {
    summary:
      'Updates a course record and its settings block, firing the course-published hook the first time its status crosses into `published`.',
    details:
      'The same required fields as creation apply, plus `status` (`draft`, `published` or `archived`). Cover photo and logo are cleared when their fields are empty, so omitting them removes the images. Reassigning `created_by` is only honoured for community admins. Hooks fire only when something actually changed.',
    notes: ['Requires a course admin for this course, or a WordPress user with `manage_options`.'],
  },
  'courses/duplicate-course': {
    summary:
      'Copies a course, its sections, its lessons and their attached documents into a new draft owned by the current user.',
    details:
      'The copy takes the original title with a "(Copy)" suffix and a timestamped slug, and is always created as a draft regardless of the source status. Students, enrolments and progress are not copied.',
    notes: ['Requires the course-creator permission.'],
  },
  'courses/delete-course': {
    summary:
      'Deletes a course together with all of its content and every trace of student participation in it.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Destructive and cascading: reactions, comments, lessons, sections and every student enrolment record for the course are deleted along with it, and progress cannot be recovered.',
    ],
  },
  'courses/list-course-students': {
    summary:
      'Returns the paginated roster of a course, each student carrying their enrolment pivot and their completion percentage.',
    details:
      'Filter with `search`; sort with `sort_by` set to `created_at` (enrolment date, the default), `display_name` or `last_activity`, and `sort_dir`. Progress is resolved for the whole page in one bulk query.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/add-course-student': {
    summary: 'Enrols one existing WordPress user in the course on behalf of an administrator.',
    details:
      '`user_id` is required and must reference a real user; their community profile is created on the fly if missing. Users whose profile is not active are rejected, as is a user who is already enrolled.',
    notes: ['Requires a course admin for this course, or a WordPress user with `manage_options`.'],
  },
  'courses/remove-course-student': {
    summary: 'Unenrols a student from the course.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Destructive: removing the enrolment also removes the progress tied to it, so re-adding the student does not restore their completions.',
    ],
  },
  'courses/delete-reset-student-progress': {
    summary:
      'Clears one student completion records for the course while leaving them enrolled.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Destructive: the completion history is removed and cannot be restored.',
    ],
  },
  'courses/post-bulk-add-students': {
    summary:
      'Enrols many users in a course in one call, either from an explicit id list or by copying the membership of another space or course in batches.',
    details:
      'Send up to 500 ids in `user_ids`; larger payloads are rejected with a 413 so the client must chunk them. With no ids the request is treated as a source-copy batch and the response reports how many were added, skipped and failed so the client can resume from the returned offset.',
    notes: [
      'Requires a course admin for this course.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'courses/post-bulk-import-students': {
    summary:
      'Imports students into a course from submitted rows, creating WordPress users for addresses that do not yet exist.',
    details: 'The response reports per-batch counts so a large import can be driven in chunks from the client.',
    notes: [
      'Requires a course admin for this course.',
      'Requires FluentCommunity Pro.',
      'Can create new WordPress user accounts and, depending on the payload, send them welcome email.',
    ],
  },
  'courses/post-resolve-crm-tag-course': {
    summary:
      'Resolves a FluentCRM tag into a page of contacts to enrol in the course, optionally creating WordPress users for contacts that do not have one.',
    details:
      'Requires a valid `tag_id`. Paging is driven by `offset` and `per_page` (clamped between 50 and 500, default 200); `create_missing` controls user creation and `notify_new_users` controls whether new accounts are emailed.',
    notes: [
      'Requires a course admin for this course.',
      'Requires FluentCommunity Pro and an active FluentCRM installation.',
    ],
  },
  'courses/list-course-sections': {
    summary: 'Returns the sections of a course in display order, with their lessons attached.',
    details:
      'Pass `conditions[]=only_published` to restrict both sections and lessons to published records. Pass `with_lock_screen` to receive the course lock screen settings in the same response.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/get-course-section': {
    summary: 'Returns one section of a course with its lessons.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/create-course-section': {
    summary: 'Adds a published section to the end of a course outline.',
    details: '`title` is required. The new section takes the next free priority, so it always appears last.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/update-course-section': {
    summary: 'Replaces the title and status of a section.',
    details: '`title` and a `status` of `draft`, `published` or `archived` are both required.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/patch-course-section': {
    summary:
      'Applies a partial update to a section, accepting the drip fields that match the course type.',
    details:
      'Beyond `title` and `status`, a scheduled course also accepts `scheduled_at` and a structured course accepts `reactions_count`, which stores the drip delay in days. The two are mutually exclusive: setting a schedule clears the delay and vice versa. Changing either fires its own hook so drip notifications can be rescheduled.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/delete-course-section': {
    summary: 'Deletes a section and every lesson inside it.',
    notes: [
      'Requires the course-creator permission and management access to this course.',
      'Destructive and cascading: all lessons in the section are deleted with it, along with student progress against them.',
    ],
  },
  'courses/copy-course-section': {
    summary:
      'Copies a section, its lessons and their attached documents from one course into another, appended to the end of the destination outline.',
    details:
      'Send `section_id` and `from_course_id`; the caller must administer the source course as well as the destination one, which the route policy alone does not enforce. Student progress is not copied.',
    notes: ['Requires course-admin access to both the source and the destination course.'],
  },
  'courses/reindex-course-sections': {
    summary: 'Applies a new display order to a course outline by writing the submitted priority for each section.',
    details:
      'Send `indexes` as a map of section id to priority. Ids that do not belong to this course are ignored, so a malformed payload silently reorders nothing.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/reindex-course-lessons': {
    summary: 'Applies a new display order to the lessons inside one section.',
    details:
      'Send `indexes` as a map of lesson id to priority. Only lessons that belong to both this course and this section are updated.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/list-course-lessons': {
    summary: 'Returns the lessons of a course in display order, optionally narrowed to one section.',
    details: 'Pass `topic_id` to restrict the list to a single section. The response is not paginated.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/get-course-lesson': {
    summary: 'Returns one lesson in its editable form with its section and course attached.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/create-course-lesson': {
    summary: 'Creates an empty draft lesson at the end of a section.',
    details:
      '`title` and `section_id` are required, and the section must belong to this course. The lesson is always created as a draft and takes the next free priority within its section.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/update-course-lesson': {
    summary:
      'Saves the full lesson record — title, status, body and metadata — and reconciles the featured image media.',
    details:
      'The payload is nested under `lesson`, and `title`, `parent_id` and a `status` of `draft`, `published` or `archived` are required. An empty `message` is honoured, so the body can be cleared deliberately. Removing the featured image detaches the underlying media row. Attached document ids are preserved from the stored metadata rather than taken from the request.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/patch-course-lesson': {
    summary:
      'Applies a partial update to a lesson, accepting only `title`, `status`, `slug` and `message`.',
    details:
      'Empty values are dropped so a blank field cannot wipe an existing one, but `message` bypasses that guard so a lesson body can be emptied on purpose. Publishing a lesson that has never been published stamps `scheduled_at` with the current time, which is what drip and notification logic reads.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/delete-course-lesson': {
    summary: 'Deletes a single lesson from a course.',
    notes: [
      'Requires the course-creator permission and management access to this course.',
      'Destructive: student completion records for the lesson go with it, which shifts every enrolled student overall course progress.',
    ],
  },
  'courses/post-duplicate-lesson': {
    summary:
      'Copies a lesson, inserts the copy directly after the original and renumbers the rest of the section.',
    details:
      'The copy takes a "(Copy)" suffix, incremented if that title is already used in the section, and gets a fresh slug. Attached documents are copied too. Every sibling lesson is renumbered so the new ordering is contiguous.',
    notes: ['Requires a course admin for this course, or a WordPress user with `manage_options`.'],
  },
  'courses/move-course-lesson': {
    summary: 'Moves a lesson into a different section of the same course.',
    details:
      'Send `lesson_id` and `section_id`; both must already belong to the course in the path. The lesson keeps its existing priority value, so a reindex call usually follows.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/update-course-links': {
    summary: 'Replaces the sidebar link list shown on a course with the submitted set.',
    details: 'Each link is sanitised individually. The submitted array replaces the stored one wholesale.',
    notes: ['Requires a course admin for this course, or a WordPress user with `manage_options`.'],
  },
  'courses/get-course-meta-settings': {
    summary:
      'Returns the extra course settings panels contributed by integrations, or `null` when nothing has registered any.',
    details:
      'The panels come entirely from the `fluent_community/course/meta_fields` filter, so the response is empty on a stock install.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/search-course-users': {
    summary:
      'Searches for WordPress users who are not yet enrolled in the course, for the add-student picker.',
    details:
      'Limited to 100 candidates. Email addresses are only included for callers with the WordPress `list_users` capability. On multisite the search is restricted to users with capabilities on the current site.',
    notes: ['Requires a course admin for this course, or a WordPress user with `manage_options`.'],
  },
  'courses/search-course-instructors': {
    summary: 'Searches all WordPress users so one can be assigned as the course instructor.',
    details:
      'Unlike the student picker this does not exclude existing course members, and it is capped at 100 results. Email addresses appear only for callers with the WordPress `list_users` capability.',
    notes: ['Requires the course-creator permission and management access to this course.'],
  },
  'courses/update-course-lockscreen-settings': {
    summary:
      'Stores the lock screen a private course shows to visitors who are not enrolled — its copy, imagery and call to action.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'courses/get-course-welcome-banner-settings': {
    summary:
      'Returns the two course welcome banner variants, one for enrolled students and one for visitors who have not enrolled.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'courses/post-update-course-welcome-banner-settings': {
    summary:
      'Stores both course welcome banner variants and pre-renders their Markdown descriptions to HTML.',
    details:
      'Only the `enrolled` and `not_enrolled` views are recognised. The banner is displayed only while the course `show_welcome_banner` setting is on, which is saved through the course update endpoint rather than here.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'courses/submit-lesson-quiz': {
    summary:
      'Grades a quiz lesson submission, stores the attempt and returns the per-question result with the score.',
    details:
      'Answers are keyed by question slug in `answers`; unanswered questions are skipped rather than marked wrong. Written answers are length-capped at 500 characters for exact-match grading and 10 000 otherwise. The caller must be enrolled and the quiz lesson must be published.',
    notes: ['Requires FluentCommunity Pro with the Quiz module.'],
  },
  'courses/get-lesson-quiz-result': {
    summary: 'Returns the current user stored result for one quiz lesson, or null if they have not attempted it.',
    details:
      'When the quiz has `hide_result` set, the correct answers are stripped from the stored result before it is returned.',
    notes: [
      'Requires the caller to be enrolled in the course.',
      'Requires FluentCommunity Pro with the Quiz module.',
    ],
  },
  'courses/list-course-quiz-results': {
    summary:
      'Returns the paginated quiz attempts across a whole course, each with the student profile and the lesson attached.',
    details:
      '`search` matches student name, username or quiz title. `filter_by` accepts `passed`, `failed` or `published`; the client value `n/a` is mapped to `published`, which is the ungraded state.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Requires FluentCommunity Pro with the Quiz module.',
    ],
  },
  'courses/update-course-quiz-result': {
    summary: 'Overrides the pass or fail grade recorded against one quiz attempt.',
    details:
      '`status` must be `passed` or `failed`; nothing else is accepted, and the score itself is left unchanged.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Requires FluentCommunity Pro with the Quiz module.',
    ],
  },
  'courses/get-exportable-quiz-results': {
    summary:
      'Returns a flattened, spreadsheet-shaped list of quiz attempts for a course — student, email, quiz, score, grade, attempt count and submission time.',
    details: 'Capped at 5000 rows and filterable with the same `search` and `filter_by` values as the paginated listing.',
    notes: [
      'Requires a course admin for this course, or a WordPress user with `manage_options`.',
      'Requires FluentCommunity Pro with the Quiz module; the response includes member email addresses.',
    ],
  },

  // ---------------------------------------------------------------------------
  // feeds
  // ---------------------------------------------------------------------------
  'feeds/list-feeds': {
    summary:
      'Returns a page of posts the current user is allowed to read, transformed for display, with the pinned post of a space returned separately on the first page.',
    details:
      'Pass `space` to scope to one space, `user_id` to scope to one author, `topic_slug` to filter by topic, and `search` with an optional `search_in` list of columns. `order_by_type` selects the sort. `per_page` defaults to 10 and is capped by the `fluent_community/max_per_page` filter (100 by default). Pagination is cursor-like rather than counted: `total` is an estimate derived from the page size, and `has_more` means only that the page came back full.',
    notes: [
      'Sticky posts are hoisted into the separate `sticky` key on page 1 of a space, and suppressed entirely when searching, filtering by topic, or when `disable_sticky=yes`.',
      'Posts from spaces the caller is not a member of, and posts by deactivated or blocked profiles, are excluded.',
      'Filtering by `status` is only honoured for moderators or for a caller reading their own posts.',
    ],
  },
  'feeds/get-feed-by-slug': {
    summary:
      'Returns a single post by slug, fully transformed, along with its reactions summary and author profile.',
    details:
      'Pass `context=edit` to receive the raw editable form instead of the rendered one; that variant requires edit access and fails otherwise. Only `published` and `unlisted` posts are readable by link — anything else returns a 404 unless the caller can edit it.',
    notes: ['A post in a space the caller cannot reach returns 404 rather than 403, so post existence cannot be probed.'],
  },
  'feeds/get-feed-by-id': {
    summary:
      'Returns a single post by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint.',
    details:
      'Because it delegates, `context=edit` and the same access rules apply. Note that the id lookup happens before the access check, so an id that does not exist at all fails differently from one the caller may not read.',
  },
  'feeds/create-feed': {
    summary:
      'Creates a post, renders its Markdown, attaches media and topics, and returns the transformed post ready to prepend to the feed.',
    details:
      '`message` is required. Pass `space` with a space slug to post into a space, or the sentinel `__self__post__` to post to your own profile, which only works when global posts are enabled. Spaces with `topic_required` reject posts carrying no valid `topic_ids`, and topics beyond the configured maximum are trimmed. Reposting the same text into the same space within seven days is rejected as a duplicate. Mentions are parsed and recorded, and moderators may set `send_announcement_email=yes` to email the space.',
    notes: [
      'Requires the `can_create_post` permission in the target space.',
      'Where content moderation or scheduling changes the status, the response carries that status instead of a published message, and the notification hooks do not fire.',
    ],
  },
  'feeds/update-feed': {
    summary:
      'Replaces the body and metadata of an existing post, re-renders it, reconciles its media and topics, and records an edit history entry.',
    details:
      'Only posts in `published`, `unlisted`, `scheduled` or `pending` state can be edited. The last five edits are kept in post meta. Survey posts are checked so existing options cannot be removed out from under voters. Passing `new_space_id` moves the post — and its activity rows — into another space, which requires community-admin rights in the destination and the author being a member of it; `move_to_profile` does the reverse. Sending `media_images` at all deactivates any media row not in the list.',
    notes: [
      'The post author can always edit; anyone else needs the `edit_any_feed` permission globally or in the space.',
    ],
  },
  'feeds/patch-feed': {
    summary:
      'Applies a small state change to a post — pinning it, changing its priority, or turning comments off.',
    details:
      'Moderators may set `is_sticky`, `priority` and `comments_disabled`; a plain author is restricted to `comments_disabled` only. Making a post sticky first clears the sticky flag from every other post in the same space, so a space holds at most one pinned post.',
    notes: ['Requires the post author, a community moderator, or a community admin, either globally or in the space.'],
  },
  'feeds/delete-feed': {
    summary: 'Deletes a post from the community.',
    notes: [
      'The post author can always delete; anyone else needs the `delete_any_feed` permission globally or in the space.',
      'Destructive: the post row is removed and the `fluent_community/feed/deleted` action runs, which is what cleans up its comments, reactions and activity entries.',
    ],
  },
  'feeds/list-bookmarks': {
    summary:
      'Returns a page of the published posts the current user has bookmarked, newest first and transformed for display.',
    details:
      'Supports `topic_slug`, `search`, `order_by_type` and a `type` filter on the post type. Pagination behaves like the main feed: `total` is an estimate and `has_more` means the page came back full.',
    notes: ['Requires a signed-in user; bookmarks are per-user and never shared.'],
  },
  'feeds/get-feed-ticker': {
    summary:
      'Returns posts created or updated since a given moment, each with its full payload, plus the unread notification count — the polling endpoint that keeps an open feed fresh.',
    details:
      'Pass `since` as a datetime; it defaults to one minute ago, and any value older than five minutes is clamped back to one minute to bound the query. At most 20 posts come back per poll, each flagged `created` or `updated` and tagged with a context of `global` or `space-<slug>`. Calling it also fires the activity tracker that stamps the user last-seen time.',
    notes: ['Signed-out callers get an empty payload with an error string rather than an HTTP error.'],
  },
  'feeds/get-ticker-updates': {
    summary:
      'Returns a lightweight list of post ids that have changed since a given moment, marked created, updated or deleted, without any post content.',
    details:
      'Scope with `context` set to `global`, `space-<slug>` or `user-<id>`. Up to 100 changes and 50 deletions are reported per call. Use this when you only need to know what to refetch; use the ticker endpoint when you want the posts themselves.',
    notes: ['Signed-out callers get an empty payload with an error string rather than an HTTP error.'],
  },
  'feeds/batch-fetch-feeds': {
    summary:
      'Returns the full transformed payload for a list of post ids in one request, for refreshing items a ticker call flagged as changed.',
    details:
      'Send `feed_ids`; only the first 20 are honoured and the rest are dropped silently. Only published posts the caller may read come back, so the returned count can be lower than the number requested.',
  },
  'feeds/get-welcome-banner': {
    summary:
      'Returns the welcome banner for the current audience — the signed-in variant for members, the logged-out variant for visitors.',
  },
  'feeds/get-feed-links': {
    summary: 'Returns the configurable link list shown alongside the main feed.',
    details:
      'Pass `scope=view` to receive only the links that are currently enabled; without it the full stored list comes back, including disabled entries, which is what the editor needs.',
  },
  'feeds/update-feed-links': {
    summary: 'Replaces the feed sidebar link list with the submitted set.',
    details: 'Each link is sanitised individually and the submitted array replaces the stored one wholesale.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'feeds/get-oembed': {
    summary:
      'Fetches and returns link preview metadata for a URL so the composer can show a card before the post is saved.',
    details:
      'Makes an outbound HTTP request to the target URL, so it is slower than other endpoints and fails with an error payload when the URL yields no usable metadata.',
  },
  'feeds/render-markdown-preview': {
    summary:
      'Renders submitted Markdown to the same sanitised HTML a saved post would produce, without creating anything.',
    details:
      'Pass `text`. Adding `with[]=meta` together with a `feed` object also runs the post metadata processing, so link previews and media blocks come back resolved as they would after a save.',
  },
  'feeds/list-scheduled-posts': {
    summary:
      'Returns the paginated list of posts one member has scheduled but not yet published, soonest first.',
    details:
      '`user_id` is effectively required: the check compares it against the current user id strictly, so omitting it fails for everyone except community admins, and for them it then matches no rows. Community admins may pass any `user_id` to inspect another member queue.',
    notes: ['Requires FluentCommunity Pro.'],
  },
  'feeds/publish-scheduled-post': {
    summary:
      'Publishes a scheduled post immediately, cancelling its queued publish action and restamping its creation time to now.',
    details:
      'Only posts still in `scheduled` state are accepted. Publishing fires the normal post-created hooks, so notifications and announcement emails go out at this point rather than at the original scheduled time.',
    notes: [
      'Requires the post author or a community moderator, either globally or in the post space.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'feeds/reschedule-post': {
    summary:
      'Moves a scheduled post to a new publish time and re-queues the background action that will publish it.',
    details:
      '`scheduled_at` is required, is read in the site timezone and must be at least 30 minutes in the future. The previously queued publish action is cancelled before the new one is scheduled.',
    notes: [
      'Requires the post author or a community moderator, either globally or in the post space.',
      'Requires FluentCommunity Pro and a working Action Scheduler queue.',
    ],
  },

  // ---------------------------------------------------------------------------
  // members
  // ---------------------------------------------------------------------------
  'members/list-members': {
    summary:
      'Returns a paginated directory of community members in the requested sort order, or the trimmed candidate list the mention autocomplete uses.',
    details:
      'Passing `mention` switches the endpoint into autocomplete mode: at most ten matches, the current user excluded, and — when `space` or `space_id` is given — restricted to that space, which the caller must belong to. The directory mode instead honours `search`, `sort_by` (`last_activity`, `display_name` or `created_at`) and `sort_dir`, and is gated by the `members_page_status` privacy setting.',
    notes: [
      'Moderators may pass `status` to list `pending`, `blocked` or `deactivated` members; everyone else only ever sees active profiles.',
      'When the members page is restricted the response is an error carrying `permission_failed`, not an empty list.',
    ],
  },
  'members/update-member': {
    summary:
      'Changes the community status of one member, moving them between active, pending and blocked.',
    details:
      '`status` must be `active`, `pending` or `blocked`; any other value is ignored and the call still reports success. Demoting another community admin is refused — their manager role has to be removed first.',
    notes: [
      'Requires the `delete_any_feed` community permission, which in practice means a community moderator or admin.',
      'Blocking a member hides their posts and comments from the portal.',
    ],
  },
  'members/list-space-members': {
    summary:
      'Returns the paginated active membership of a space, each entry carrying the member profile and their role, plus the count of outstanding join requests.',
    details:
      'Sort with `sort_by` set to `created_at` (join date, the default), `display_name` or `last_activity`, and `sort_dir`; filter with `search`. Callers who can add members may pass `status=pending` to list the join requests instead of the members.',
    notes: [
      'Gated by the `can_view_members` space permission; failure comes back as an error carrying `permission_failed`.',
    ],
  },
  'members/add-space-member': {
    summary:
      'Adds an existing WordPress user to a space, approves their pending join request, or changes the role they already hold.',
    details:
      '`user_id` is required and must resolve to a real user; their community profile is created on the fly. `role` accepts `member`, `moderator` or `admin` and falls back to `member`. The behaviour depends on the existing pivot: no membership adds one, a pending one is approved, and an active one has its role updated — or is rejected if the role is unchanged. The response message differs in each case.',
    notes: ['Requires the `can_add_member` permission in this space.'],
  },
  'members/remove-space-member': {
    summary: 'Removes a member from a space and refreshes their cached space access list.',
    notes: [
      'Requires the `can_remove_member` permission in this space.',
      'Destructive: the membership row is deleted, which revokes access to the space content immediately. Posts and comments the member made in the space are left in place.',
    ],
  },
  'members/post-bulk-add-members': {
    summary:
      'Adds many users to a space in one call, either from an explicit id list or by copying the membership of another space or course in batches.',
    details:
      'Send up to 500 ids in `user_ids`; larger payloads are rejected with a 413 so the client must chunk them. With no ids the request is treated as a source-copy batch and the response reports added, skipped and failed counts so the client can resume from the returned offset. `role` accepts `member`, `moderator` or `admin`.',
    notes: [
      'Requires the `can_add_member` permission in this space.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'members/post-bulk-import-members': {
    summary:
      'Imports members into a space from submitted rows, creating WordPress users for addresses that do not yet exist.',
    details: 'The response reports per-batch counts so a large import can be driven in chunks from the client.',
    notes: [
      'Requires the `can_add_member` permission in this space.',
      'Requires FluentCommunity Pro.',
      'Can create new WordPress user accounts and, depending on the payload, send them welcome email.',
    ],
  },
  'members/post-resolve-crm-tag-space': {
    summary:
      'Resolves a FluentCRM tag into a page of contacts to add to the space, optionally creating WordPress users for contacts that do not have one.',
    details:
      'Requires a valid `tag_id`. Paging is driven by `offset` and `per_page` (clamped between 50 and 500, default 200); `create_missing` controls user creation and `notify_new_users` controls whether new accounts are emailed.',
    notes: [
      'Requires the `can_add_member` permission in this space.',
      'Requires FluentCommunity Pro and an active FluentCRM installation.',
    ],
  },

  // ---------------------------------------------------------------------------
  // notifications
  // ---------------------------------------------------------------------------
  'notifications/list-notifications': {
    summary:
      'Returns the paginated notification history for the current user, newest activity first, with the unread total alongside it.',
    details:
      'Filter with `status` (for example `unread`) and `notification_type`, which defaults to `all`. Each row carries the actor profile and the per-user subscriber record that holds the read flag. Ordering is by `updated_at`, so a notification that gets new activity moves back to the top.',
    notes: ['Requires a signed-in user; a caller only ever sees their own notifications.'],
  },
  'notifications/list-unread-notifications': {
    summary:
      'Returns up to 50 unread notifications for the current user with the unread total, for the notification dropdown.',
    details: 'Not paginated. `notification_type` narrows the list; it defaults to `all`.',
    notes: ['Requires a signed-in user.'],
  },
  'notifications/mark-notification-read': {
    summary:
      'Marks one notification read for the current user and returns the recalculated unread count.',
    details:
      'When the notification is tied to a post, every other notification for that same post is marked read at the same time, so opening one item clears the whole thread rather than a single row.',
    notes: ['Requires a signed-in user; only the caller own subscriber rows are touched.'],
  },
  'notifications/mark-notifications-read-by-feed': {
    summary:
      'Marks every notification about one post read for the current user and returns the new unread count together with the remaining unread post ids.',
    details:
      'The `unread_feed_ids` list is what the portal uses to keep the unread dot on individual posts in the feed, so this response is directly usable to update the list in place.',
    notes: ['Requires a signed-in user.'],
  },
  'notifications/mark-all-notifications-read': {
    summary: 'Marks every unread notification read for the current user in a single update.',
    notes: ['Requires a signed-in user; the unread count is not returned, so refetch it if you display one.'],
  },

  // ---------------------------------------------------------------------------
  // options
  // ---------------------------------------------------------------------------
  'options/get-app-vars': {
    summary:
      'Returns the bootstrap payload the portal SPA needs — current user, permissions, feature flags, branding and route configuration — together with the sidebar menu groups.',
    details:
      'The `rest` block is deliberately stripped, because the client already holds its own REST configuration. Content varies by caller: a signed-out visitor gets a much smaller payload than a community admin.',
  },
  'options/get-menu-items': {
    summary: 'Returns the sidebar menu groups on their own, for refreshing navigation without refetching the full bootstrap payload.',
  },
  'options/get-sidebar-menu-html': {
    summary:
      'Returns the server-rendered sidebar HTML together with the spaces the current user can act in, each carrying its resolved permissions, membership and topics.',
    details:
      'Community moderators receive every space; everyone else receives only spaces where they hold an active membership. Private spaces the caller is not a member of come back with a `lockscreen_config` in place of content. The spaces map is keyed by slug.',
    notes: ['Signed-out callers receive the rendered HTML and an empty spaces object.'],
  },

  // ---------------------------------------------------------------------------
  // profile
  // ---------------------------------------------------------------------------
  'profile/get-profile': {
    summary:
      'Returns one member public profile by username, with the navigation tabs the portal should render for that member.',
    details:
      'How much comes back depends on the `profile_page_visibility` privacy setting and on who is asking: a restricted profile is flagged `is_restricted` and omits the bio, website, social links and join date. The profile owner and community admins additionally receive the email address, name parts, and flags saying whether the username, email and password can be changed. The Courses tab only appears when the `course_module` feature is enabled.',
    notes: ['Profiles that are not active are hidden from everyone except community moderators, with a 403.'],
  },
  'profile/update-profile': {
    summary:
      'Saves the editable profile fields — names, bio, headline, website and social links — and mirrors the display name onto the WordPress user record.',
    details:
      '`first_name` is required. The bio is capped at 5000 characters and the headline at 60, both adjustable by filter. Social links whose key is not a registered provider are dropped. Changing the username is allowed for moderators, or for the owner when `can_customize_username` is on, and returns a `redirect_url` because the profile URL changes. Changing the email address is only offered when the caller has `edit_users` or the `can_change_email` privacy setting permits it on their own profile; in the latter case the change is held pending a confirmation email rather than applied.',
    notes: [
      'Editing someone else profile requires community-moderator access; only moderators may set `is_verified`, `status` or badge slugs.',
    ],
  },
  'profile/patch-profile': {
    summary:
      'Applies a targeted profile change — swapping the avatar or cover photo, or deactivating the account.',
    details:
      'Media URLs must resolve to an unclaimed uploaded media row, otherwise the call fails; the previous image is queued for cleanup. Sending `data[status]=deactivated` on an active profile blanks the profile status and stamps the deactivation time, and returns early without touching anything else.',
    notes: [
      'Requires the profile owner or a community moderator.',
      'Deactivation is gated by the `can_deactive_account` privacy setting unless the caller is a community admin.',
    ],
  },
  'profile/post-change-password': {
    summary:
      'Changes the account password after verifying the current one, and returns freshly minted nonces so the open session keeps working.',
    details:
      'All three of `current_password`, `new_password` and `confirm_password` are required; the new password must be at least four characters, must match the confirmation and must differ from the current one. Because WordPress destroys every session on a password change, the endpoint re-issues the auth cookie and returns new `rest_nonce` and `ajax_nonce` values — the client must adopt them or every subsequent request will fail.',
    notes: [
      'Only the account owner can call this; moderators and admins cannot change a password here.',
      'Blocked entirely when the `can_change_password` privacy setting is off.',
      'Every other session for the account is logged out.',
    ],
  },
  'profile/list-profile-spaces': {
    summary: 'Returns the spaces a member actively belongs to, each with its member count.',
    details:
      'Secret spaces are only included when the caller is the profile owner or a community moderator. Spaces with `hide_members_count` report zero unless the caller may view their members.',
    notes: ['Gated by the `user_space_visibility` privacy setting; failure comes back carrying `permission_failed`.'],
  },
  'profile/list-profile-memberships': {
    summary:
      'Returns only the space ids a member actively belongs to — the cheap lookup used to decide what to show on their profile.',
    details: 'Secret spaces are excluded unless the caller is the profile owner or a community moderator.',
    notes: ['Gated by the `user_space_visibility` privacy setting.'],
  },
  'profile/get-courses': {
    summary:
      'Returns the published courses a member is enrolled in, each with their progress, cover image and section, lesson and student counts.',
    details:
      'Secret courses are only included when the caller is the profile owner or a community moderator. Courses without a cover image fall back to the bundled placeholder.',
    notes: [
      'Requires the `course_module` feature to be enabled.',
      'Gated by the `user_space_visibility` privacy setting.',
    ],
  },
  'profile/get-notification-preferences': {
    summary:
      'Returns the email notification preferences for a member — the global toggles, the per-space post preferences grouped by space group, and the digest send day.',
    details:
      'Preferences the member has never set are filled in from the community defaults, so the response is always complete. The per-space preference is flattened to `all_member_posts`, `admin_only_posts` or empty. Spaces with no parent group are gathered under a synthetic "Other Spaces" group.',
    notes: ['Requires the profile owner or a community moderator.'],
  },
  'profile/save-notification-preferences': {
    summary:
      'Stores the email notification preferences for a member, translating the per-space choices into the underlying subscription rows.',
    details:
      'Global toggles are sent as `yes` or `no` under `user_globals`. `message_email_frequency` accepts `disabled`, `hourly`, `daily` or `weekly`; anything else leaves the stored value untouched. Under `space_prefs`, `all_member_posts` enables notifications for both member and admin posts while `admin_only_posts` enables only the admin one.',
    notes: ['Requires the profile owner or a community moderator.'],
  },
  'profile/list-profile-followers': {
    summary:
      'Returns the paginated list of members following this profile, each annotated with whether the current user follows them back.',
    details:
      'Filter with `search` over display name and username; pass `sort_by=alphabetical` for name order, otherwise newest first. Blocked relationships are excluded.',
    notes: [
      'Requires FluentCommunity Pro with the `followers_module` feature enabled.',
      'Visibility is governed by the followers privacy settings, so a restricted profile returns an error.',
    ],
  },
  'profile/list-profile-followings': {
    summary:
      'Returns the paginated list of members this profile follows, each annotated with whether the current user follows them too.',
    details:
      'Filter with `search` over display name and username; pass `sort_by=alphabetical` for name order, otherwise newest first. Blocked relationships are excluded.',
    notes: [
      'Requires FluentCommunity Pro with the `followers_module` feature enabled.',
      'Visibility is governed by the followers privacy settings.',
    ],
  },
  'profile/list-profile-blocked-users': {
    summary: 'Returns the paginated list of members this profile has blocked.',
    notes: [
      'Requires FluentCommunity Pro with the `followers_module` feature enabled.',
      'Only the profile owner and community moderators may read this list; anyone else gets a 403.',
    ],
  },
  'profile/follow-profile-user': {
    summary: 'Creates a follow relationship from the current user to the named member.',
    details:
      'Following yourself is rejected, as is following someone you already follow or have blocked — the block is stored in the same table, so an existing block surfaces as an already-following error.',
    notes: ['Requires FluentCommunity Pro with the `followers_module` feature enabled.'],
  },
  'profile/unfollow-profile-user': {
    summary: 'Removes the follow relationship from the current user to the named member.',
    notes: ['Requires FluentCommunity Pro with the `followers_module` feature enabled.'],
  },
  'profile/toggle-profile-follow': {
    summary:
      'Follows the named member if not already followed, and unfollows them if they are — addressed by numeric user id rather than username.',
    details:
      'A blocked relationship cannot be toggled; unblock first. The response message tells you which way the toggle went.',
    notes: ['Requires FluentCommunity Pro with the `followers_module` feature enabled.'],
  },
  'profile/block-profile-user': {
    summary:
      'Blocks a member, converting any existing follow relationship into a block rather than creating a second row.',
    details:
      'Blocking yourself is rejected, as is blocking anyone who holds community-moderator access. Community moderators are themselves forbidden from blocking anybody.',
    notes: ['Requires FluentCommunity Pro with the `followers_module` feature enabled.'],
  },
  'profile/unblock-profile-user': {
    summary: 'Lifts a block, deleting the relationship row entirely rather than reverting it to a follow.',
    notes: ['Requires FluentCommunity Pro with the `followers_module` feature enabled.'],
  },
  'profile/toggle-profile-notification': {
    summary:
      'Turns notifications about a member you already follow on or off, without changing the follow itself.',
    details:
      'The follow relationship stores this as a level, so the toggle flips between plain following and following with notifications. Calling it when you do not follow the member, or when you have blocked them, is an error.',
    notes: ['Requires FluentCommunity Pro with the `followers_module` feature enabled.'],
  },

  // ---------------------------------------------------------------------------
  // reactions
  // ---------------------------------------------------------------------------
  'reactions/list-feed-reactions': {
    summary:
      'Returns the members who liked a post, with their public profiles, for the reaction list popover.',
    details:
      'Capped at 100 distinct users with no pagination, so a very popular post shows a truncated list. Only `like` reactions are returned; bookmarks are stored in the same table but excluded.',
  },
  'reactions/list-comment-reactions': {
    summary: 'Returns the members who liked a comment, with their public profiles.',
    details:
      'Capped at 100 distinct users with no pagination. Access is validated against the parent post, so a comment on an unreachable post returns a 404.',
  },
  'reactions/post-add-or-remove-post-react': {
    summary:
      'Adds or removes the current user reaction on a post and returns the updated reaction count.',
    details:
      '`react_type` accepts `like` or `bookmark` and defaults to `like`; anything else falls back to `like`. Send `remove` truthy to withdraw the reaction. Only likes affect `reactions_count` — a bookmark is private and does not change the visible count. Reacting twice is a no-op that still returns the current count. The post `updated_at` is deliberately not touched so reactions do not resurface the post in ticker polls.',
    notes: ['Requires a signed-in user, and the post must be published.'],
  },
  'reactions/toggle-feed-reaction': {
    summary:
      'Adds or removes the current user reaction on a post and returns the updated count — a second route onto the same behaviour as the reactions toggle endpoint.',
    details:
      'This path is served by the comments controller rather than the reaction controller, but the logic is duplicated line for line: same `react_type` handling, same `remove` flag, same response. New integrations should prefer `POST /feeds/{feed_id}/reactions/toggle`.',
    notes: ['Requires a signed-in user, and the post must be published.'],
  },
  'reactions/toggle-comment-reaction': {
    summary:
      'Sets or clears the current user like on a comment and returns the new reaction count with the resulting liked state.',
    details:
      'Unlike the post reaction endpoints this takes an explicit `state` boolean rather than a `remove` flag: truthy likes, falsy unlikes, and repeating the same state is a no-op. The comment must belong to the post named in the path.',
    notes: ['Requires a signed-in user with at least registered access to the space holding the post.'],
  },
  'reactions/cast-survey-vote': {
    summary:
      'Records the current user vote on a survey post and returns the updated survey configuration with their choices flagged.',
    details:
      'Send the chosen option identifiers in `vote_indexes`. The post must actually be of the `survey` content type and must have a valid option list; a survey past its `end_date` is refused. The returned options carry a `voted` flag for the caller.',
    notes: ['Requires a signed-in user who can read the post.'],
  },
  'reactions/list-survey-voters': {
    summary: 'Returns the members who voted for one survey option, with their public profiles.',
    details:
      'Capped at 100 voters with no pagination. The option is identified by its slug in the path, so an unknown slug returns an empty list rather than an error.',
  },

  // ---------------------------------------------------------------------------
  // settings
  // ---------------------------------------------------------------------------
  'settings/get-feature-settings': {
    summary:
      'Returns the feature flag configuration together with the add-on catalogue and whether each companion plugin is installed.',
    details:
      'A stored Giphy API key is replaced with the literal `FCOM_ENCRYPTED_DATA_KEY` rather than being returned, so the key never leaves the server.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/save-feature-settings': {
    summary:
      'Saves the feature flag configuration, merging the submitted flags over the stored ones.',
    details:
      'Only recognised flags are accepted — courses, leaderboard, Giphy, emoji, badges, cloud storage, CRM sync, followers, custom profile fields and PWA. Enabling the Giphy module requires a key. Sending back the `FCOM_ENCRYPTED_DATA_KEY` placeholder preserves the stored key instead of overwriting it.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Several flags gate whole route groups, so turning one off removes its endpoints on the next request.',
    ],
  },
  'settings/get-menu-settings': {
    summary:
      'Returns the portal navigation configuration — the main menu, the profile dropdown, the pre-community items and the custom footer link groups.',
    details: 'Groups are normalised to plain arrays and groups without a title are dropped, so the response is always render-ready.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/save-menu-settings': {
    summary:
      'Replaces the portal navigation configuration, preserving the protected attributes of built-in menu entries.',
    details:
      'Items missing a title or a permalink are discarded. Items without a slug are treated as new custom entries and get a generated one. For entries that already exist, `is_system`, `is_locked`, `is_unavailable` and `slug` are carried over from the stored version so a client cannot promote a custom link into a system one.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/install-plugin': {
    summary:
      'Installs and activates one of the companion Fluent plugins from the add-on catalogue, in the background.',
    details:
      'Only slugs present in the add-on catalogue are accepted. Repository plugins are fetched from WordPress.org; FluentCommunity Chat and FluentPlayer are installed through their own hooks and require the Pro plugin.',
    notes: [
      'Requires the WordPress `install_plugins` capability in addition to the community-admin permission.',
      'Writes to the plugins directory and activates code on the site.',
    ],
  },
  'settings/get-customization-settings': {
    summary:
      'Returns the portal appearance settings — dark mode, header and sidebar behaviour, post modal, and the powered-by line.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/save-customization-settings': {
    summary: 'Stores the portal appearance settings, coercing each field to its expected shape.',
    details:
      'Boolean-style keys are forced to `yes` or `no`. `default_theme_mode` accepts only `light`, `dark` or `system`, and is reset to `light` whenever dark mode is switched off. `affiliate_id` is cast to an integer and blanked when it is zero.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/get-privacy-settings': {
    summary:
      'Returns the privacy configuration that governs who can see the members directory, member profiles and member space lists, and what members may change about their own account.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/save-privacy-settings': {
    summary: 'Stores the privacy configuration.',
    details:
      'These values feed the visibility checks on the members directory, profile pages, profile space lists, and the username, email and password change controls, so a change here alters what several member-facing endpoints return.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/get-color-config': {
    summary:
      'Returns the active light and dark colour schema selection alongside the full catalogue of available schemas.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Reading is available in core, but saving a colour configuration is a Pro endpoint.',
    ],
  },
  'settings/save-color-config': {
    summary:
      'Selects the light and dark colour schemas, and compiles the resulting CSS once so the portal can serve it without regenerating per request.',
    details:
      'Both `light_schema` and `dark_schema` must name a schema that exists, otherwise the call is rejected. Choosing `custom` for either side stores the matching `light_config` or `dark_config` selector map; choosing a named schema clears it. The compiled CSS is cached against the plugin version.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'settings/get-crm-tagging-config': {
    summary:
      'Returns the FluentCRM tagging configuration together with every space and course that can be mapped, and the CRM tag list to map them onto.',
    details:
      'Spaces are grouped by space group, with ungrouped ones under "Other Spaces" and all courses under a separate group. `crm_tags` is empty and `has_fluentcrm` is false when FluentCRM is not installed.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Reading is available in core, but saving the configuration is a Pro endpoint.',
    ],
  },
  'settings/save-crm-tagging-config': {
    summary:
      'Stores the mapping between FluentCRM tags and spaces or courses, and keeps the `has_crm_sync` feature flag in step.',
    details:
      'Non-numeric tag mappings are discarded, and `linked_maps` is reduced to the keys that survive in `tagging_maps`. If none of the mapped ids resolve to a real space or course the whole map is emptied rather than partially saved. Disabling the integration saves the flags and returns early without validating the maps.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; `create_user` and `send_welcome_email` cause account creation and outbound email during subsequent tag syncs.',
    ],
  },
  'settings/get-fluent-player-settings': {
    summary: 'Returns the FluentPlayer integration settings used for lesson and post video playback.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/save-fluent-player-settings': {
    summary:
      'Stores the FluentPlayer integration settings and returns the normalised result.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'settings/get-snippets-settings': {
    summary: 'Returns the custom CSS and custom JavaScript injected into the portal.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'settings/save-snippets-settings': {
    summary:
      'Stores the custom CSS and, for callers allowed to post unfiltered HTML, the custom JavaScript injected into the portal.',
    details:
      'CSS is sanitised before storage. Custom JavaScript is only written when the caller holds the WordPress `unfiltered_html` capability; otherwise the previously stored script is silently retained, so the save appears to succeed while the JS field is ignored.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; the stored snippets run on every portal page.',
    ],
  },
  'settings/get-followers-settings': {
    summary:
      'Returns the followers module configuration, including who may see a member follower and following lists.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'settings/save-followers-settings': {
    summary: 'Stores the followers module configuration and returns the normalised result.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; these values govern the follower and following list endpoints.',
    ],
  },

  // ---------------------------------------------------------------------------
  // spaces
  // ---------------------------------------------------------------------------
  'spaces/list-spaces': {
    summary:
      'Returns every space the current user has a membership row for, in alphabetical order, without pagination.',
    details:
      'The membership status is not checked, so a space the user has only requested to join is included alongside the ones they are active in. This is the lightweight lookup used to decide where a member may post; use the discovery endpoint for a browsable list.',
  },
  'spaces/discover-spaces': {
    summary:
      'Returns the paginated set of spaces the current user could join or already belongs to, each with its active member count.',
    details:
      'Public and private spaces are always listed; secret spaces appear only where the user holds an active membership. Filter with `search` and `type=joined`; sort with `sort_by` set to `alphabetical` (the default), `latest` or `oldest`. Spaces with `hide_members_count` report zero unless the caller may view their members.',
  },
  'spaces/list-all-spaces': {
    summary:
      'Returns the paginated list of spaces with each one formatted for display, including the current user permissions and membership within it.',
    details:
      'Community moderators receive every space; everyone else sees public and private spaces plus any secret space they actively belong to. Heavier than the discovery endpoint because every space is run through the full formatter.',
  },
  'spaces/get-space-by-slug': {
    summary:
      'Returns one space with its settings, topics, the current user membership and the permissions they hold inside it.',
    notes: [
      'A secret space the caller is neither a member nor an admin of returns exactly the same 404 as a space that does not exist, so its existence cannot be probed by slug.',
    ],
  },
  'spaces/create-space': {
    summary:
      'Creates a space, makes the caller its first admin, and attaches the submitted cover photo, logo and topics.',
    details:
      '`space[title]` and a `space[privacy]` of `public`, `private` or `secret` are required, and the slug — derived from `slug` or the title — must be unique. Turning on `settings.topic_required` without any `topic_ids` is rejected. Cover photo, logo and OG image URLs must resolve to unclaimed uploaded media, which is then marked permanent. New spaces are appended to the end of their group serial order.',
    notes: [
      'Requires community-admin access, or the admin role in the space named by `space_id`.',
      'The creator is attached as a space admin automatically.',
    ],
  },
  'spaces/update-space-by-slug': {
    summary:
      'Updates a space record and its settings, and returns a redirect URL when the change altered its slug.',
    details:
      'The payload is nested under `data`. A blank title is rejected and a slug already taken by another space is rejected. Turning on `topic_required` requires the space to end up with at least one topic, whether from the payload or from what is already attached. Sending a media field empty clears that image. `topic_ids`, when present, replaces the topic set and is trimmed to the configured maximum. Any `meta_settings` block is dispatched to per-provider hooks rather than stored directly.',
    notes: ['Requires community-admin access or the admin role in this space.'],
  },
  'spaces/update-space-by-id': {
    summary:
      'Updates a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint.',
    notes: ['Requires community-admin access or the admin role in this space.'],
  },
  'spaces/delete-space-by-slug': {
    summary: 'Deletes a space along with everything posted in it and every membership record for it.',
    notes: [
      'Requires community-admin access or the admin role in this space.',
      'Destructive and cascading: comments, reactions, posts and all membership rows for the space are deleted first, then the space itself. None of it can be recovered.',
    ],
  },
  'spaces/delete-space-by-id': {
    summary:
      'Deletes a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint.',
    notes: [
      'Requires community-admin access or the admin role in this space.',
      'Destructive and cascading: comments, reactions, posts and all membership rows for the space are deleted along with it.',
    ],
  },
  'spaces/join-space': {
    summary:
      'Joins the current user to a space, or lodges a join request when the space requires approval, and returns the resulting membership.',
    details:
      'Public spaces grant immediate active membership. Private spaces produce a `pending` membership by default, which the `fluent_community/space/join_status_for_private` filter can override. Community admins and moderators bypass this and join directly as admin or moderator respectively. Attempting to join a space you already have a membership row for is an error.',
    notes: [
      'Requires a signed-in user.',
      'Secret spaces cannot be self-joined by ordinary members; they must be added by an admin.',
    ],
  },
  'spaces/leave-space': {
    summary: 'Removes the current user membership of a space and refreshes their cached space access.',
    notes: [
      'Requires a signed-in user who currently holds a membership row.',
      'Destructive: the membership is deleted, so a private or secret space cannot be rejoined without a new approval or invitation. Posts and comments already made are left in place.',
    ],
  },
  'spaces/get-space-lockscreens': {
    summary:
      'Returns the lock screen configuration a space shows to visitors who are not members — its copy, imagery and call to action.',
    notes: [
      'A secret space the caller is neither a member nor an admin of returns the same 404 as a space that does not exist.',
    ],
  },
  'spaces/update-space-lockscreen-settings': {
    summary: 'Stores the lock screen configuration a space shows to non-members.',
    details:
      'The route group only requires portal access, so the controller performs its own check and returns 403 unless the caller manages spaces or holds the admin role in this one.',
    notes: [
      'Requires community-admin or course-admin access, or the admin role in this space.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'spaces/get-space-meta-settings': {
    summary:
      'Returns the extra space settings panels contributed by integrations, or `null` when nothing has registered any.',
    details:
      'The panels come entirely from the `fluent_community/space/meta_fields` filter, so the response is empty on a stock install.',
    notes: ['Requires community-admin or course-admin access, or the admin role in this space.'],
  },
  'spaces/update-space-links': {
    summary: 'Replaces the sidebar link list shown on a space with the submitted set.',
    details: 'Each link is sanitised individually and the submitted array replaces the stored one wholesale.',
    notes: ['Requires community-admin access or the admin role in this space.'],
  },
  'spaces/search-space-users': {
    summary:
      'Searches for WordPress users who are not yet members of a space, for the add-member picker.',
    details:
      '`space_id` is required and must reference a real space. The search is limited to 100 candidates. Email addresses are only included for community moderators who also hold the WordPress `list_users` capability. On multisite the search is restricted to users with capabilities on the current site.',
    notes: ['Requires the `can_add_member` permission in the space named by `space_id`.'],
  },
  'spaces/list-space-groups': {
    summary:
      'Returns the space groups with their spaces expanded, plus any space or course that has not been assigned to a group.',
    details:
      'Pass `options_only` for the trimmed id and title list used by pickers, which any portal user may read. The full response formats each community space for the caller and attaches topics to courses, so it is considerably heavier.',
    notes: [
      'The full listing requires community-admin or course-admin access, or the admin role in the space named by `space_id`.',
    ],
  },
  'spaces/create-space-group': {
    summary: 'Creates a space group to hold spaces in the sidebar.',
    details:
      '`title` and `slug` are both required and must be unique across all space records, groups and spaces alike. The group is appended to the end of the sidebar order.',
    notes: ['Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.'],
  },
  'spaces/update-space-group': {
    summary: 'Updates the title, description and expansion behaviour of a space group.',
    details: '`title` is required and must not collide with any other space record title. The slug cannot be changed here.',
    notes: ['Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.'],
  },
  'spaces/delete-space-group': {
    summary: 'Deletes an empty space group.',
    details: 'A group that still contains spaces is refused, so no space is ever orphaned by this call.',
    notes: ['Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.'],
  },
  'spaces/reindex-space-groups': {
    summary: 'Applies a new sidebar order to the space groups.',
    details:
      'Send `indexes` as a map of group id to zero-based position; each group serial is stored as the position plus one. An id that does not resolve to a group aborts the call.',
    notes: ['Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.'],
  },
  'spaces/reindex-spaces': {
    summary: 'Applies a new sidebar order to spaces within their group.',
    details:
      'Unlike the group variant, `indexes` here is an ordered array of space ids and the position in the array becomes the serial. An id that does not resolve to a space aborts the call.',
    notes: ['Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.'],
  },
  'spaces/move-space': {
    summary: 'Moves a space into a different space group.',
    details:
      'Send `space_id` and `group_id`; both must resolve. The space keeps its existing serial, so a reindex call usually follows to place it correctly within the new group.',
    notes: ['Requires community-admin access, or the admin role in the space named by `space_id`.'],
  },

  // ---------------------------------------------------------------------------
  // reports
  // ---------------------------------------------------------------------------
  'reports/create-moderation-report': {
    summary:
      'Files a moderation report against a post or a comment and returns the report together with the reported content.',
    details:
      '`content_type` must be `post` or `comment`, `post_id` is required, and a comment report additionally needs the comment id in `parent_id`. `reason` is capped at 255 characters and the optional `explanation` at 1000. A member can only report the same content once. The running report count is written onto the reported content, and `fluent_community/content_moderation/created` fires — the listeners on that hook are what notify moderators and can auto-unpublish content once the configured threshold is reached.',
    notes: [
      'Requires an active portal user; unlike the rest of the moderation group this endpoint is not gated on the `content_moderation` feature flag, so reports can still be filed while the feature is off even though no screen lists them.',
      'The guard that stops members reporting a moderator applies to posts only, not to comments.',
    ],
  },
  'reports/list-moderation-reports': {
    summary:
      'Returns the paginated moderation queue, newest first, with the reported post or comment, its author and the reporting member attached.',
    details:
      'Filter with `post_id`, `parent_id`, `status` and `content_type`. The reported content `title` is replaced with a 160-character excerpt of its body so the queue can be scanned without loading full posts.',
    notes: [
      'Requires a community moderator, or the admin or moderator role in the space named by `space_id`.',
      'The listing is not scoped to a space: a space moderator who passes `space_id` to satisfy the policy still receives reports from every space, including ones they do not moderate.',
      'The route only exists while the `content_moderation` feature is enabled; with the flag off it returns 404 rather than a permission error.',
    ],
  },
  'reports/update-moderation-report': {
    summary:
      'Resolves a moderation report by setting its status, and publishes or unpublishes the reported content to match.',
    details:
      '`status` accepts `published`, `unpublished`, `pending`, `rejected`, `flagged` or `ignored`. Every sibling report against the same content is updated at once, and the report count on the content is reset to zero. Where the content was being held pending approval, releasing it replays the normal creation hooks, so notifications and announcement emails are sent at this point.',
    notes: [
      'Requires a community moderator, or the admin or moderator role in the space holding the reported content.',
      'Only `unpublished` hides the content — every other status, including `rejected` and `flagged`, publishes it. Choosing `rejected` to reject the content does the opposite of what the word suggests.',
      'The `unpublished` outcome can also flag the reported member account, depending on the auto-flag thresholds in the moderation config.',
    ],
  },
  'reports/delete-moderation-report': {
    summary: 'Removes a single moderation report from the queue.',
    details:
      'Only the one report is deleted, not the whole group of reports against the same content, and the report count stored on the content is left as it was — so the content can keep showing a reported badge.',
    notes: [
      'Requires a community moderator, or the admin or moderator role in the space holding the reported content.',
      'Destructive: the report and its related notification rows are deleted. The reported post or comment is untouched, and content already auto-unpublished stays hidden.',
    ],
  },
  'reports/save-moderation-config': {
    summary:
      'Stores the content moderation configuration and keeps the `content_moderation` feature flag in step with its `is_enabled` value.',
    details:
      'Recognised keys are `is_enabled`, `profanity_filter`, `flag_after_threshold`, `first_comment_approval`, `auto_flag_user_reject_threshold` and `auto_flag_user_report_threshold`. Any other key sent in `config` is stored as submitted rather than being discarded, so send only the documented fields.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro. Disabling the feature here also removes the moderation queue routes on the next request.',
    ],
  },
  'reports/get-overview-widget-report': {
    summary:
      'Returns the four headline community counters — members, posts, comments and spaces — each with a period-over-period comparison.',
    details:
      '`start_date` and `end_date` default to the last 30 days and are read as plain dates in UTC. The comparison baseline is always the same window shifted back one calendar month, regardless of how wide the requested range is, so a seven-day range is compared against the same seven days a month earlier. `comparison` comes back as a string.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro. Counts are unfiltered by status, so drafts and pending posts are included.',
    ],
  },
  'reports/get-overview-activity-report': {
    summary:
      'Returns a gap-filled time series of one activity type across the community, ready to plot without client-side interpolation.',
    details:
      '`activity` selects the series and accepts `posts` (the default), `comments`, `members` or `spaces`; any other value raises an unhandled error rather than a validation message. Bucket size switches automatically with the range — daily up to 62 days, weekly to 92, monthly beyond — and the `date` label format changes with it, which the response does not signal.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro. Weekly and monthly grouping has no year component, so a range spanning a year boundary merges buckets.',
    ],
  },
  'reports/get-popular-day-time-report': {
    summary:
      'Returns a day-of-week by time-of-day heatmap of community activity, as a fixed grid of six four-hour blocks against the seven weekdays.',
    details:
      'Only `start_date` and `end_date` are read; the block size is fixed. Each cell sums posts, comments, spaces and member signups into a single figure, so it measures overall busyness rather than any one activity.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'Expensive: the report issues one count query per day, per block, per model — roughly 720 queries for the default 30-day range, and proportionally more for wider ones. There is no range cap and no caching.',
    ],
  },
  'reports/get-member-widget-report': {
    summary:
      'Returns the member counters for a date range — total, active, new and pending — each with a period-over-period comparison.',
    details:
      'All four are counts within the requested window rather than lifetime totals, so `total_members` and `new_members` are computed identically and always match; only their titles differ. `active_members` counts by last activity instead of signup date.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'The comparison figure on `pending_members` is not reliable — the previous-period query is built on the already-filtered one, so it resolves to zero.',
    ],
  },
  'reports/get-member-activity-report': {
    summary: 'Returns a gap-filled time series of member signups across the requested range.',
    details:
      'The end date is excluded from this series while the member widget includes the whole end day, so the chart and the counters for the same range cover slightly different windows.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'reports/list-top-members-report': {
    summary:
      'Returns ten member profiles ordered by lifetime points, drawn from those who joined within the requested range.',
    details:
      'The date range filters on the profile creation date, not on points earned, so this is really the highest-scoring recent joiners. A long-standing member with a high score never appears unless the range covers the date they signed up. Fixed at ten results with no pagination.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; full profile records are returned, including their meta.',
    ],
  },
  'reports/list-top-post-starters-report': {
    summary:
      'Returns the ten members who published the most posts within the requested range, each with their post count.',
    details:
      'The range is applied to the posts rather than to the member record, so this ranks activity in the window as expected. Only plain text posts are counted — lessons and documents are excluded — and post status is not filtered. Fixed at ten results.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'reports/list-top-commenters-report': {
    summary:
      'Returns the ten members who wrote the most comments within the requested range, each with their comment count.',
    details: 'The range is applied to the comments, so this ranks activity in the window. Fixed at ten results.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'reports/get-space-widget-report': {
    summary:
      'Returns the space counters for a date range — spaces, posts, comments and members — optionally narrowed to one space.',
    details:
      'Pass `space_id` to scope posts, comments and members to a single space; the space total ignores it and always counts community-wide. Status filtering is inconsistent between the two modes: the site-wide post count includes drafts while the per-space count does not.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'The period-over-period `comparison` on all four counters is unreliable here, because each previous-period query is built on top of the current-period one; treat only `total_records` as meaningful.',
    ],
  },
  'reports/get-space-activity-report': {
    summary:
      'Returns a gap-filled time series of posts, optionally narrowed to one space with `space_id`.',
    details:
      'Despite sitting under the spaces analytics group this charts posts, not spaces — the `activity` key in the response reads `posts`.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
    ],
  },
  'reports/list-popular-spaces-report': {
    summary:
      'Returns a ranked table of the busiest spaces, or — when `space_id` is supplied — the busiest posts inside that one space.',
    details:
      'Both variants come back as a `columns` and `data` pair, but the columns differ: spaces are ranked on posts, comments and members, while posts are ranked on comments and reactions with a 40-character title excerpt. The space `comments_count` is an all-time figure even though the post and member counts beside it are scoped to the range.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'The space ranking takes ten rows before sorting them, so on a site with more than ten spaces it ranks the ten oldest spaces among themselves rather than returning the ten most popular.',
    ],
  },
  'reports/search-report-spaces': {
    summary:
      'Searches community spaces by title, returning id and title pairs for the analytics space picker.',
    details:
      'Only `search` is read. Space groups, courses and sidebar links are excluded, and unpublished spaces are not filtered out.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'There is no result limit, so an empty `search` returns every community space on the site in one response.',
    ],
  },

  // ---------------------------------------------------------------------------
  // leaderboard
  // ---------------------------------------------------------------------------
  'leaderboard/list-leaderboard': {
    summary:
      'Returns the three leaderboards — last 7 days, last 30 days and all time — each with its top ten members and their profiles attached.',
    details:
      'No parameters are read; the ranking size and windows are fixed. Results are cached for five minutes, so a member who has only now earned points may not move immediately.',
    notes: [
      'Requires FluentCommunity Pro; visibility is governed by the `leaderboard_members_visibility` privacy setting, which can open it to everyone, restrict it to signed-in members, or limit it to moderators.',
      'This read endpoint writes: where a stored profile point total is behind the calculated one it is corrected and `fluent_community/user_points_updated` fires, which can trigger a level upgrade and any automation listening on it.',
      'The routes are registered even when the `leader_board_module` feature is switched off, though the scoring that feeds them is not.',
    ],
  },
  'leaderboard/get-leaderboard-levels': {
    summary:
      'Returns the leaderboard level definitions with their point thresholds, plus the members excluded from ranking.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro; the excluded-member list includes email addresses.',
    ],
  },
  'leaderboard/save-leaderboard-levels': {
    summary:
      'Stores the leaderboard levels and the excluded-member list, recomputing every point boundary so the levels tile without gaps.',
    details:
      'Each submitted level carries a `title`, `tagline` and `min_points`. The submitted thresholds are used only to sort the levels; after sorting, every boundary is recalculated — the first level starts at zero, the last is open-ended, and each remaining level starts one point above the previous one ends. The three leaderboard caches are cleared afterwards.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Requires FluentCommunity Pro.',
      'Level slugs are reassigned by position as `level_1` upwards, so reordering levels by points silently changes which slug means which level. Anything keyed on a level slug, such as a badge award or a CRM trigger, shifts with it.',
    ],
  },

  // ---------------------------------------------------------------------------
  // documents
  // ---------------------------------------------------------------------------
  'documents/list-documents': {
    summary:
      'Returns the paginated document posts of one space, newest first, each with its author and topics attached.',
    details:
      '`space_id` is required. Filter with `search` and an optional `search_in` list of columns. Only posts whose content type is `document` and whose status is `published` or `unlisted` are listed.',
    notes: [
      'Requires the `can_view_documents` permission in the space; failure comes back as an error carrying `permission_failed`.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'documents/upload-document': {
    summary:
      'Uploads a document file into a space document library, or — when `lesson_id` is given — attaches it directly to a course lesson.',
    details:
      'Files are stored privately and served through a download route rather than a public URL. A space upload is created as draft media that the cleanup cron removes within two hours unless a post adopts it, while a lesson upload is activated immediately and appended to the lesson document list.',
    notes: [
      'The space route requires the `can_upload_documents` permission in that space; the lesson route requires course-admin access to the course that owns the lesson.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'documents/update-document': {
    summary:
      'Renames a document, updating both the media record and the entry in the parent post or lesson document list.',
    details:
      'Only the display title changes; the stored file and its real extension are untouched, so a rename cannot change the served file type.',
    notes: [
      'Lesson documents require course-admin access; space documents require the `can_upload_documents` permission in that space, or ownership of the upload where it is not yet attached to a post.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'documents/delete-document': {
    summary:
      'Detaches a document from its post or lesson and hands the media record to the media cleanup hook.',
    details:
      'The controller removes the entry from the parent document list and fires `fluent_community/feed/media_deleted`; the listeners on that hook are what actually delete the row and the underlying file, including from cloud storage. Removing the last document from a post also switches that post content type back from `document` to `text`.',
    notes: [
      'Lesson documents require course-admin access; space documents require the `can_upload_documents` permission in that space, or ownership of an unattached upload.',
      'Requires FluentCommunity Pro.',
      'The space check is on upload rights rather than authorship, so any member who can upload to a space can delete documents uploaded by others.',
      'Destructive: the file is removed from storage, and the parent post can silently change type as a result.',
    ],
  },

  // ---------------------------------------------------------------------------
  // giphy
  // ---------------------------------------------------------------------------
  'giphy/search-giphy': {
    summary:
      'Proxies a Giphy search — or the trending feed when no query is given — and returns a trimmed list of GIFs carrying only the preview and medium renditions.',
    details:
      'Pass `q` to search and `offset` to page through results; the page size is fixed at 20. The request is made server-side against a hardcoded Giphy endpoint using the stored API key, which is never included in the response. A missing key returns a 400 with a message rather than an empty list.',
    notes: [
      'Requires FluentCommunity Pro with the `giphy_module` feature enabled and an API key configured; with the flag off the route does not exist.',
      'Requires an active portal user, and on a portal whose access level is public that includes anonymous visitors.',
      'Responses are neither cached nor rate limited, so calls here consume the site owner Giphy quota directly.',
    ],
  },

  // ---------------------------------------------------------------------------
  // media
  // ---------------------------------------------------------------------------
  'media/get-index': {
    summary:
      'Returns a cursor-paginated page of the photos, videos or audio shared in one space, each item carrying the post and author it came from.',
    details:
      'Select the tab with `type` set to `photos` (the default), `videos` or `audios`. Paging is by `cursor` — the last media id seen — rather than a page number, and `per_page` defaults to 24 and is clamped between 12 and 48. The first page additionally returns `has_audio` so the client knows whether to offer the audio tab. Only active media attached to published posts is listed.',
    notes: [
      'Requires the `can_view_media` permission in the space; failure returns 403 carrying `permission_failed`, and an unknown space slug returns 404.',
      'Requires FluentCommunity Pro.',
    ],
  },
  'media/post-handle-media-upload': {
    summary:
      'Uploads an image for use in a post or comment, optionally resizing and converting it to WebP, and returns the media URL and key.',
    details:
      'Accepts JPEG, PNG, GIF, WebP and HEIC by default, up to 100 MB, both adjustable by filter. Conversion to WebP happens unless `disable_convert=yes` is sent, and passing `resize` with `max_width` downscales oversized images first. The returned `media_key` is what identifies the upload when it is later attached to a post or comment.',
    notes: [
      'Requires a signed-in user; uploads are rate limited through the `fluent_community/check_rate_limit/media_upload` hook.',
      'Uploaded media starts inactive and is deleted by the cleanup cron if it is never attached to anything.',
      'HEIC uploads fail unless the server has Imagick built with HEIC support.',
    ],
  },
  'media/delete-media-preview': {
    summary: 'Clears the link preview image stored on a post, leaving the rest of the post untouched.',
    notes: [
      'Requires the same permission as deleting the post: the author, or the `delete_any_feed` permission globally or in the space.',
    ],
  },

  'media/upload-video': {
    summary:
      'Uploads a video or audio file for FluentPlayer playback and returns the media record with the settings the player needs.',
    details:
      'Send `media_kind` as `video` or `audio`; audio uploads additionally require the `enable_audio` player setting. The size limit is 300 MB by default and adjustable by filter, and the accepted MIME types come from the FluentPlayer settings.',
    notes: [
      'Requires a signed-in user, the FluentPlayer plugin to be active, and the `video_upload` player setting to be on.',
      'Who may upload is governed by the `video_upload_role` player setting — community admins only, admins and moderators, or everyone.',
    ],
  },
  'media/get-video-content': {
    summary:
      'Renders the FluentPlayer markup for one media item, including the scoped CSS that applies the portal theme colours to the player.',
    details:
      'A `media_id` that resolves to a stored media row is access-checked against its parent post, and an empty `html` string comes back when the caller may not view it. An id that matches nothing is treated as an external embed and the player is built from the allowlisted `url`, `title`, `image`, `provider` and `type` query values instead. Returns empty markup when FluentPlayer is not installed.',
    notes: [
      'Failure is signalled by an empty `html` string with a 200 status, not by an HTTP error.',
      'This route has no logged-in requirement of its own, so on a portal whose access level is public anonymous visitors can call it.',
    ],
  },
  'media/post-update-audio-meta': {
    summary:
      'Updates the display title and poster thumbnail stored on an uploaded audio media item.',
    details:
      'Sending an empty `posterSrc` clears the custom poster and returns the player to its default no-thumbnail layout. Media that is not FluentPlayer audio is rejected with a 422.',
    notes: [
      'The route only requires a signed-in user; ownership is enforced in the controller, so only the uploader, a community moderator or a community admin may edit.',
    ],
  },

  // ---------------------------------------------------------------------------
  // cart
  // ---------------------------------------------------------------------------
  'cart/search-cart-products': {
    summary:
      'Searches published FluentCart products that have at least one variant, returning up to 20 with their formatted price range, for the paywall picker.',
    notes: [
      'Only portal access is required because this is a GET route, so any member — and anonymous visitors on a public portal — can enumerate product titles and prices; an empty `search` returns the first 20 products.',
      'The whole cart route group only exists while FluentCart is active.',
    ],
  },
  'cart/create-cart-product': {
    summary:
      'Creates a simple one-time digital FluentCart product with a single variant, so a paywall can be set up without leaving the community admin.',
    details:
      'Takes `title` and `price`; the price is stored in minor units. The product is published immediately and tagged with a `created_from` meta of `fluent_community`. Neither field is validated, so an empty title or a negative price is accepted.',
    notes: [
      'Requires community-admin access, or the admin role in the space named by `space_id`.',
      'Also requires the FluentCart `products/create` permission, which is checked separately and returns a 422 when missing.',
      'The generated variant is created with a stock of 1, so the product sells exactly once until its stock is raised in FluentCart.',
    ],
  },
  'cart/list-space-paywalls': {
    summary:
      'Returns the published FluentCart products attached to a space as paywalls, each variant carrying its price, thumbnail and a ready-made instant-checkout URL.',
    details:
      'Pass `paywall_ids` to narrow the result to specific variants. The checkout URL already carries the redirect back into the portal with the space id attached.',
    notes: [
      'Only portal access is required because this is a GET route, and the space is loaded without global scopes, so paywall details can be read for any space id including secret ones. The response also carries a wp-admin URL per product.',
      'The whole cart route group only exists while FluentCart is active.',
    ],
  },
  'cart/create-space-paywall': {
    summary: 'Attaches a published FluentCart product to a space as a paywall.',
    details:
      '`cart_product_id` must reference a published product, and attaching the same product twice is rejected. The product id list is stored on the space settings, and `fluent_community/paywall_added` fires afterwards.',
    notes: ['Requires community-admin access, or the admin role in this space.'],
  },
  'cart/delete-space-paywall': {
    summary: 'Detaches a FluentCart product from a space so it no longer sells access to it.',
    details:
      '`cart_product_id` must currently be attached to the space, and the product must still be published — a product unpublished in FluentCart after being linked cannot be detached here. Passing `revoke_access=yes` additionally drops the space from the FluentCart product integration feed.',
    notes: [
      'Requires community-admin access, or the admin role in this space.',
      'The product itself is not deleted; only the link between it and the space is removed.',
      'Even with `revoke_access=yes`, members who already bought access keep their membership — the setting only stops future orders from granting it.',
    ],
  },

  // ---------------------------------------------------------------------------
  // migrations
  // ---------------------------------------------------------------------------
  'migrations/list-available-migrations': {
    summary:
      'Returns the migration sources detected on this site — BuddyBoss or BuddyPress — as an empty list when neither is installed.',
    details: 'Detection is by constant, and BuddyBoss takes precedence, so only ever one source is reported.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'The whole migrations route group is only registered when BuddyPress or BuddyBoss is installed; otherwise every path in it returns 404.',
    ],
  },
  'migrations/get-buddypress-migration-config': {
    summary:
      'Returns everything the migration wizard needs before it starts: the BuddyPress groups with their member counts and migrated state, the source data statistics, and any previously saved progress.',
    details:
      '`has_previous` tells the client whether a partially completed run already exists, so it can offer to resume or reset.',
    notes: ['Requires the FluentCommunity community-admin permission (or a WordPress super admin).'],
  },
  'migrations/start-buddypress-migration': {
    summary:
      'Begins a BuddyPress or BuddyBoss migration by importing the groups as spaces and returns the progress record plus the maximum source ids the polling loop needs.',
    details:
      'Send `config` as a map of BuddyPress group id to the destination space group. `reset_migration=yes` clears any saved progress before starting. After this call the migration advances by repeatedly polling the status endpoint.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Highly destructive when `delete_current_data=yes` is sent: the feeds, comments, reactions, media, activity and profile tables are truncated, every community space is deleted, and the whole `uploads/fluent-community` directory is removed from disk. There is no confirmation step and nothing can be recovered.',
    ],
  },
  'migrations/get-buddypress-migration-status': {
    summary:
      'Advances the migration by one time-boxed batch and returns the updated progress record — this endpoint does the work, it does not merely report on it.',
    details:
      'Each call processes group members, posts and comments, or user profiles depending on the stage recorded in the progress record, stopping when it approaches the server maximum run time. The client is expected to poll it until the stage reaches `completed`. A progress record in an unrecognised stage returns an error asking for the migration to be restarted.',
    notes: [
      'Requires the FluentCommunity community-admin permission (or a WordPress super admin).',
      'Despite its name this is a write endpoint: calling it creates spaces, members, posts and profiles.',
    ],
  },

  // ---------------------------------------------------------------------------
  // invitations
  // ---------------------------------------------------------------------------
  'invitations/list-invitations': {
    summary:
      'Returns the paginated invitations the current user has issued for one space, newest first, with a ready-to-share access URL on each one that is still valid.',
    details:
      '`space_id` is required — the space is loaded with `findOrFail`, so omitting it fails rather than returning every invitation. `status` defaults to `pending`; pass `all` to drop the status filter. The response also carries an `is_mod` flag for the client.',
    notes: [
      'Requires the `community_moderator` permission in the space named by `space_id`.',
      'The query is always scoped to the caller own invitations, so a moderator does not see invitations issued by other moderators despite the `is_mod` flag suggesting otherwise.',
      'Although the controller ships in the free plugin, the routes are only registered by FluentCommunity Pro and only while the `invitation` feature is enabled; otherwise they return 404.',
      'This GET also writes: invitations past their expiry are flipped to `expired` and saved as the list is built.',
    ],
  },
  'invitations/create-invitation': {
    summary:
      'Invites one email address to join a space and sends the invitation email immediately.',
    details:
      'A valid `email` and a `space_id` are required; `invitee_name` is optional. The invitation is refused when the address already belongs to a member of that space, or when the caller has already invited the same address to the same space.',
    notes: [
      'Requires the `community_moderator` permission in the space named by `space_id`.',
      'Requires FluentCommunity Pro with the `invitation` feature enabled.',
      'Sends outbound email synchronously, so the request is only as fast as the mail transport. Nothing rate limits it — the daily cap helper exists in the controller but is never called.',
    ],
  },
  'invitations/create-invitation-link': {
    summary:
      'Creates a shareable invitation link for a space that any recipient can redeem, and returns its access URL.',
    details:
      '`title` and `space_id` are required; `limit` caps how many people may redeem it and `expire_date` sets an expiry. The link is actually created by whatever is listening on the `fluent_community/create_invitation_link` filter, so the call fails with a generic message when no handler is registered.',
    notes: [
      'Requires the `community_moderator` permission in the space named by `space_id`.',
      'Requires FluentCommunity Pro with the `invitation` feature enabled — Pro also supplies the filter that actually creates the link.',
      'Anyone holding the returned URL can join the space until the limit or expiry is reached; neither `limit` nor `expire_date` is validated.',
    ],
  },
  'invitations/resend-invitation': {
    summary: 'Sends the invitation email again for an invitation that has not yet been redeemed.',
    details:
      'Refused once the invitation has been sent more than five times; the send count is tracked on the invitation record.',
    notes: [
      'Requires the `community_moderator` permission in the space the invitation was issued for.',
      'Requires FluentCommunity Pro with the `invitation` feature enabled.',
      'The token is not regenerated, so previously sent links stay valid.',
      'Nothing restricts this to email invitations. Calling it on a shareable link mails an empty recipient and still increments the counter, which for link invitations is the redemption count checked against the limit — repeated calls can exhaust a working invite link.',
    ],
  },
  'invitations/delete-invitation': {
    summary: 'Revokes an invitation so its email and link can no longer be redeemed.',
    notes: [
      'Requires the `community_moderator` permission in the space the invitation was issued for.',
      'Requires FluentCommunity Pro with the `invitation` feature enabled.',
      'Destructive: the invitation row is deleted and any link already shared stops working immediately.',
    ],
  },
}
