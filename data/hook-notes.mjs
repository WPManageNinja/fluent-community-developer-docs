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
  "fluent_community/' . $contentType . '_report_added_async": {
    "summary": "The dynamic scheduling site behind the two report notification tasks.",
    "details": "This entry documents the `as_schedule_single_action()` call in Pro's moderation handler, where the action name is built from the report's `content_type` — the extractor could not resolve the concatenation, which is why the name appears literally. In practice it only ever produces `fluent_community/comment_report_added_async` or `fluent_community/post_report_added_async`; hook those, not this. The task is queued immediately with the report ID and a starting user ID of 0.",
    "params": [
      {
        "name": "reportId",
        "type": "int",
        "desc": "ID of the moderation record."
      },
      {
        "name": "lastUserId",
        "type": "int",
        "desc": "The user ID to resume after; `0` on the first run."
      }
    ],
    "related": [
      "fluent_community/post_report_added_async",
      "fluent_community/comment_report_added_async"
    ]
  },
  "fluent_community/activities_api_response": {
    "summary": "Filters the recent-activity listing response.",
    "details": "Applied at two call sites in the same method with slightly different payloads: the global and profile variant returns early and carries `pinned_posts` only when no member is selected, while the space variant adds `pinned_posts` and `pending_count` on request. Both always carry `activities`, `after_contents` and `before_contents`. Activities are deduplicated to the newest row per post and action, so the list is shorter than the raw activity table.",
    "params": [
      {
        "name": "returnData",
        "type": "array",
        "desc": "Response payload: `activities`, `after_contents`, `before_contents`, and sometimes `pinned_posts` and `pending_count`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/pinned_posts_api_response",
      "fluent_community/activity/after_contents"
    ]
  },
  "fluent_community/activity/after_contents": {
    "summary": "Filters HTML appended below the activity list on the global activity feed.",
    "details": "One of three mutually exclusive variants — this one is used only when neither a space nor a member is in scope, with `..._space` and `..._user` taking over otherwise. It defaults to an empty string and reaches the portal as `after_contents`, so the markup is rendered by the SPA rather than echoed; return HTML rather than printing it, and escape it yourself.",
    "params": [
      {
        "name": "afterContent",
        "type": "string",
        "desc": "HTML to render below the activity list. Empty by default."
      },
      {
        "name": "context",
        "type": "array",
        "desc": "The request `context` array; empty of `space_id` and `user_id` on this variant."
      }
    ],
    "returns": "`string` — HTML. It is not sanitised for you.",
    "related": [
      "fluent_community/activity/before_contents",
      "fluent_community/activity/after_contents_space"
    ]
  },
  "fluent_community/activity/after_contents_space": {
    "summary": "Filters HTML appended below the activity list on a space page.",
    "details": "Used in place of `fluent_community/activity/after_contents` whenever the request carries a `space_id`; the space variant is checked first, so it also wins when both a space and a member are supplied. The second argument is the space ID, already cast to an integer.",
    "params": [
      {
        "name": "afterContent",
        "type": "string",
        "desc": "HTML to render below the activity list. Empty by default."
      },
      {
        "name": "spaceId",
        "type": "int",
        "desc": "The space in scope."
      },
      {
        "name": "context",
        "type": "array",
        "desc": "The request `context` array."
      }
    ],
    "returns": "`string` — HTML. It is not sanitised for you.",
    "related": [
      "fluent_community/activity/before_contents_space",
      "fluent_community/activity/after_contents"
    ]
  },
  "fluent_community/activity/after_contents_user": {
    "summary": "Filters HTML appended below the activity list on a member profile.",
    "details": "Reached only when the request carries a `user_id` and no `space_id`. Pro's FluentCRM integration uses it to render the member's CRM profile card underneath their activity.",
    "params": [
      {
        "name": "afterContent",
        "type": "string",
        "desc": "HTML to render below the activity list. Empty by default."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "The member in scope."
      },
      {
        "name": "context",
        "type": "array",
        "desc": "The request `context` array."
      }
    ],
    "returns": "`string` — HTML. It is not sanitised for you.",
    "related": [
      "fluent_community/activity/before_contents_user"
    ]
  },
  "fluent_community/activity/before_contents": {
    "summary": "Filters HTML rendered above the activity list on the global activity feed.",
    "details": "The mirror of `fluent_community/activity/after_contents`, resolved in the same else-branch and returned to the portal as `before_contents`. Both variants are evaluated on every activity request, so keep the callback cheap.",
    "params": [
      {
        "name": "beforeContent",
        "type": "string",
        "desc": "HTML to render above the activity list. Empty by default."
      },
      {
        "name": "context",
        "type": "array",
        "desc": "The request `context` array."
      }
    ],
    "returns": "`string` — HTML. It is not sanitised for you.",
    "related": [
      "fluent_community/activity/after_contents"
    ]
  },
  "fluent_community/activity/before_contents_space": {
    "summary": "Filters HTML rendered above the activity list on a space page.",
    "details": "The space-scoped mirror of `fluent_community/activity/before_contents`. It wins over the generic and member-scoped variants whenever a `space_id` is present in the request context.",
    "params": [
      {
        "name": "beforeContent",
        "type": "string",
        "desc": "HTML to render above the activity list. Empty by default."
      },
      {
        "name": "spaceId",
        "type": "int",
        "desc": "The space in scope."
      },
      {
        "name": "context",
        "type": "array",
        "desc": "The request `context` array."
      }
    ],
    "returns": "`string` — HTML. It is not sanitised for you.",
    "related": [
      "fluent_community/activity/after_contents_space"
    ]
  },
  "fluent_community/activity/before_contents_user": {
    "summary": "Filters HTML rendered above the activity list on a member profile.",
    "details": "The member-scoped mirror of `fluent_community/activity/before_contents`, reached only when a `user_id` is present and no `space_id` is.",
    "params": [
      {
        "name": "beforeContent",
        "type": "string",
        "desc": "HTML to render above the activity list. Empty by default."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "The member in scope."
      },
      {
        "name": "context",
        "type": "array",
        "desc": "The request `context` array."
      }
    ],
    "returns": "`string` — HTML. It is not sanitised for you.",
    "related": [
      "fluent_community/activity/after_contents_user"
    ]
  },
  "fluent_community/admin_course_comments_api_response": {
    "summary": "Filters the comment list on the course admin screen.",
    "details": "Comments come back paginated with their post and author profile loaded, `user_email` hidden on the user relation, and a `liked` flag set for comments the current administrator has reacted to. It covers comments left on the course's lessons.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `comments` key holding paginated comments."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body."
  },
  "fluent_community/admin_course_exportable_students_api_response": {
    "summary": "Filters the whole course student export payload after every row has been built.",
    "details": "Runs once, after fluent_community/course/exportable_student_row has run for each student.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload — a `students` key holding the list of rows."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "courseId",
        "type": "int",
        "desc": "Course the export was requested for."
      }
    ],
    "returns": "The export payload array.",
    "related": [
      "fluent_community/course/exportable_student_row"
    ]
  },
  "fluent_community/admin_course_lesson_api_response": {
    "summary": "Filters a single lesson as returned to the course editor.",
    "details": "The lesson comes back with its `topic` and `course` relations loaded and its meta unredacted — this is the editing view, so `fluent_community/lesson/get_public_meta` does not run on this path.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `lesson` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/course_lesson_api_response"
    ]
  },
  "fluent_community/admin_course_lessons_api_response": {
    "summary": "Filters the lesson list returned to the course editor.",
    "details": "Ordered by `priority` then ID, and optionally narrowed to one section with a `topic_id` parameter. Every status is included, so drafts and archived lessons are in the list. The lessons are raw models — the student-facing formatting and meta redaction do not apply.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `lessons` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/admin_course_lesson_api_response"
    ]
  },
  "fluent_community/admin_course_non_members_api_response": {
    "summary": "Filters the list of users who could be enrolled in a course.",
    "details": "Feeds the \"add student\" picker. `user_email` is only among the selected columns when the current user has the `list_users` capability, so do not assume it is present. The result is paginated at 100 per page.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `users` key holding paginated user models."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/admin_course_students_api_response"
    ]
  },
  "fluent_community/admin_course_other_instructors_api_response": {
    "summary": "Filters the candidate list for adding a co-instructor to a course.",
    "details": "A plain search across WordPress users capped at 100 rows, with no filtering by role or existing course involvement — the name notwithstanding, the list is not restricted to people who are already instructors elsewhere. As with the non-member picker, `user_email` is only selected when the viewer has `list_users`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `instructors` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/admin_course_non_members_api_response"
    ]
  },
  "fluent_community/admin_course_section_api_response": {
    "summary": "Filters a single section, with its lessons, as returned to the course editor.",
    "details": "The section is looked up by course and ID together, so it cannot be fetched across courses. Every lesson is loaded regardless of status. The payload key is `topic`, not `section` — sections are `CourseTopic` models internally.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `topic` key holding the section and its lessons."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/admin_course_sections_api_response"
    ]
  },
  "fluent_community/admin_course_sections_api_response": {
    "summary": "Filters the section list returned to the course editor.",
    "details": "Which lessons are eager-loaded depends on the request: with `conditions` set, only published lessons come back; otherwise every lesson does, drafts included. `lockscreen` is added only when `with_lock_screen` was requested.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`sections`, each with its `lessons`, and optionally `lockscreen`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/admin_course_section_api_response"
    ]
  },
  "fluent_community/admin_course_students_api_response": {
    "summary": "Filters the enrolled-student list on the course admin screen.",
    "details": "Only rows whose membership role is `student` are joined in, so course admins and instructors do not appear. Each profile is limited to the public XProfile fields and carries a `progress` percentage resolved in one bulk query. Sorting is validated against a fixed column and direction list before the query runs.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `students` key holding paginated profiles."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/admin_course_non_members_api_response"
    ]
  },
  "fluent_community/admin_courses_api_response": {
    "summary": "Filters the paginated course list on the admin courses screen.",
    "details": "Each course carries `students_count`, `sectionsCount`, `lessonsCount`, its owner and a placeholder cover photo where none is set. Drafts are included, and the `status` and `sortBy` request parameters have already been applied to the query. `course_categories` appears only when `with_categories` was requested.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`courses` (paginated) and `course_categories`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/course_info"
    ]
  },
  "fluent_community/after_header_logo": {
    "summary": "Prints inside the header's left group, immediately after the logo link.",
    "details": "The closing counterpart of `fluent_community/before_header_logo`, in the same `.top_menu_left` container and with the same argument. Nothing in core or Pro listens, so it is a clean slot for a badge or a secondary brand mark.",
    "params": [
      {
        "name": "auth",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The current member's profile, or `null` for a guest."
      }
    ],
    "related": [
      "fluent_community/before_header_logo"
    ]
  },
  "fluent_community/after_header_menu": {
    "summary": "Prints in the centre group of the header, after the main navigation list.",
    "details": "Unlike the logo hooks this one receives the render context rather than the profile. Core prints the \"Portal Settings\" heading here on admin routes, replacing the main menu that the same code path empties through `fluent_community/header_vars`. The surrounding `<nav>` is only emitted when there are menu items, so on an empty menu your output is the sole content of the centre group.",
    "params": [
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, or `block_editor`."
      }
    ],
    "related": [
      "fluent_community/header_vars",
      "fluent_community/main_menu_items"
    ]
  },
  "fluent_community/after_header_right_menu_items": {
    "summary": "Prints as the last item of the header's right-hand menu list, after the account menu or login button.",
    "details": "Emit `<li>` elements. Beyond rendering, core treats this hook as an ordering probe: the sidebar footer checks `did_action()` on it to decide whether the header has already been drawn, and lays the sidebar out differently when it has not. Firing it manually will therefore change how the sidebar renders.",
    "params": [
      {
        "name": "auth",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The current member's profile, or `null` for a guest."
      }
    ],
    "related": [
      "fluent_community/before_header_right_menu_items",
      "fluent_community/after_portal_sidebar"
    ]
  },
  "fluent_community/after_portal_sidebar": {
    "summary": "Prints at the very bottom of the sidebar column, after the SPA mount point.",
    "details": "Core attaches the sidebar footer here — the upgrade or wp-admin shortcut, the settings cog and the \"Powered by\" line — but only when the header has already rendered, which it detects with `did_action('fluent_community/after_header_right_menu_items')`. On a page where the header is suppressed, the core callback instead defers an admin cog into `fluent_community/before_header_menu_items` and prints nothing here. Also skipped for the `ajax` context.",
    "params": [
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, or `block_editor`."
      }
    ],
    "related": [
      "fluent_community/after_sidebar_wrap",
      "fluent_community/after_header_right_menu_items"
    ]
  },
  "fluent_community/after_registration_form": {
    "summary": "Prints at the bottom of the signup card, below the \"Already have an account?\" link.",
    "details": "Fires from `app/Views/auth/user_invitation.php`, the template used for both plain signup and invitation-accepting signup, so it does not run on the login or password-reset forms. It takes no arguments and nothing in core or Pro listens.",
    "related": [
      "fluent_community/before_registration_form"
    ]
  },
  "fluent_community/after_sidebar_wrap": {
    "summary": "Prints immediately after the `#fcom_sidebar_wrap` element closes, before the mobile menu mount point.",
    "details": "The counterpart of `fluent_community/before_sidebar_wrap` and subject to the same `ajax` exclusion. Three things render in sequence at the foot of the sidebar: this hook, the empty `#fcom_menu_sidebar` div the SPA mounts into, and then `fluent_community/after_portal_sidebar`.",
    "params": [
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, or `block_editor`."
      }
    ],
    "related": [
      "fluent_community/before_sidebar_wrap",
      "fluent_community/after_portal_sidebar"
    ]
  },
  "fluent_community/after_sync_bp_users": {
    "summary": "Fires after a batch of BuddyPress users has been migrated into FluentCommunity.",
    "details": "Two call sites — the WP-CLI migrator and the admin migration screen — both firing once per batch rather than once per migration, and the controller loops until every user is done, so expect many invocations. The profiles have already been created by `BPMigratorHelper::syncUser()`. Pro uses it to carry BuddyPress follower relationships across.",
    "params": [
      {
        "name": "users",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Collection",
        "desc": "The `User` models synced in this batch."
      }
    ]
  },
  "fluent_community/all_courses_api_response": {
    "summary": "Filters the response of the endpoint that lists every course with its full detail payload.",
    "details": "Unlike the directory listing, each entry here has been through `CourseController::processCourse()`, so sections, lessons and per-lesson access decisions are already resolved — an expensive response, and the reason `fluent_community/course/processed` fires once per course before this filter. `total` is the unpaginated count.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`courses` (fully processed) and `total`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/courses_api_response",
      "fluent_community/course/processed"
    ]
  },
  "fluent_community/all_space_courses_api_response": {
    "summary": "Filters the flat list of every space and course used by admin pickers.",
    "details": "Queried without global scopes and without any privacy or membership filtering, so secret spaces and unpublished courses are included — the endpoint is behind the admin policy for that reason. It is the data behind space and course selectors in the settings screens, ordered by `serial`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `all_spaces` key holding every `community` and `course` row."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body."
  },
  "fluent_community/all_spaces_api_response": {
    "summary": "Filters the paginated all-spaces directory response.",
    "details": "A different endpoint from `fluent_community/spaces_api_response`: this one lists spaces the viewer could join, not just their own. Non-moderators see only public and private spaces plus any secret space they already belong to. Member counts are zeroed for spaces that hide them from non-members, and each space has been through `formatSpaceData()` and `fluent_community/space`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a paginated `spaces` block."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/spaces_api_response",
      "fluent_community/space"
    ]
  },
  "fluent_community/allow_auto_login_by_url": {
    "summary": "Filters whether a signed URL may log its recipient in automatically.",
    "details": "Signed links are what notification and digest emails use: they carry `fcom_action=signed_url` and a hashed, expiring token that resolves to a user. The default deliberately refuses accounts that can `delete_pages` — editors and administrators — so a forwarded email cannot hand over a privileged session. Returning `true` unconditionally removes that protection. The visitor is redirected with the parameters stripped whether or not the login happened.",
    "params": [
      {
        "name": "willAutoLogin",
        "type": "bool",
        "desc": "Whether to sign the user in; `false` for users who can `delete_pages`."
      },
      {
        "name": "targetUser",
        "type": "\\WP_User",
        "desc": "The user the signed URL resolved to."
      }
    ],
    "returns": "`bool` — evaluated for truthiness.",
    "related": [
      "fluent_community/portal_action_{action}"
    ]
  },
  "fluent_community/allowed_block_types": {
    "summary": "Filters which block types may be inserted in the lesson editor.",
    "details": "An explicit allowlist rather than a denylist, so a block that is not named is unavailable even if it is registered — third-party blocks have to be added here to appear in the lesson inserter. Removing a type hides it from the inserter but does not strip it from lessons that already contain it. The list is one key of the object `fluent_community/block_editor_settings` filters, so that hook can override this one.",
    "params": [
      {
        "name": "blockTypes",
        "type": "array",
        "desc": "Flat list of block names such as `core/paragraph`, `core/image`, `core/embed`."
      }
    ],
    "returns": "`array` — a flat list of block names.",
    "related": [
      "fluent_community/block_editor_settings"
    ]
  },
  "fluent_community/allowed_html_tags": {
    "summary": "Filters the `wp_kses` tag allowlist used for embed and rich media HTML.",
    "details": "The base list is `wp_kses_allowed_html('post')` plus a deliberately narrow `iframe` entry. Two omissions are intentional and documented at the call site: no `<style>` element, because kses never filters the text inside one, and no `srcdoc` attribute on iframes, because a sandbox-less `srcdoc` iframe is same-origin with the portal. Re-adding either hands script or CSS injection to anyone who can author embed markup.",
    "params": [
      {
        "name": "tags",
        "type": "array",
        "desc": "The kses allowlist: tag names mapped to allowed attribute maps."
      }
    ],
    "returns": "`array` — a kses allowlist. It is passed straight to `wp_kses()`, so the nested shape must be preserved."
  },
  "fluent_community/app_route_paths": {
    "summary": "Filters the first URL segments that are recognised as portal routes.",
    "details": "Only consulted when the portal is mounted at the site root — with a portal slug in place the rewrite rules do the matching and this list is not reached. A segment missing from it will 404 through the theme instead of loading the SPA, so anything added through `fluent_community/rendering_path_ssr_{pathParts}` normally has to be registered here too; the FluentCart checkout does exactly that. The list is also published to the front end as `portal_vars.portal_paths` on root-mounted installs.",
    "params": [
      {
        "name": "paths",
        "type": "array",
        "desc": "Flat list of first-segment slugs such as `members`, `courses`, `u`, `post`, `admin`."
      }
    ],
    "returns": "`array` — a flat, non-associative list of segments. Removing a default segment makes that portal section unreachable.",
    "related": [
      "fluent_community/rendering_path_ssr_{pathParts}",
      "fluent_community/portal_supported_query_params"
    ]
  },
  "fluent_community/app_vars_api_response": {
    "summary": "Filters the response of the endpoint the SPA uses to refresh its bootstrap data without a page reload.",
    "details": "The `appVars` key is a fresh `PortalHandler::appVars()` run — the same payload as `fluent_community/portal_vars`, minus `rest`, which is stripped so the nonce is not re-issued over AJAX. Anything you add through `fluent_community/portal_vars` is already present here; use this filter only for keys that should exist on the refresh path but not in the initial page render.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`appVars` and `menu_links_groups`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/portal_vars",
      "fluent_community/sidebar_menu_html_api_response"
    ]
  },
  "fluent_com_editor/asset_listed_slugs": {
    "summary": "Filters the URL fragments that exempt a script from the lesson editor's no-conflict mode.",
    "details": "Scripts are the only assets this affects; the stylesheet side is governed by the differently prefixed `fluent_community/asset_listed_slugs`, so filtering this one does nothing for CSS. The list is joined into a regular expression and matched against every enqueued script URL under the plugins and themes directories; anything that does not match is dequeued and its `script_loader_src` forced to `false`. `\\/fluent-community(-pro)?\\/` is appended after the filter and cannot be removed.",
    "params": [
      {
        "name": "approvedSlugs",
        "type": "array",
        "desc": "Regular-expression fragments matched against script URLs, for example `\\/gutenberg\\/`."
      }
    ],
    "returns": "`array` — fragments that are deduplicated and joined with `|` into one pattern, so each entry must be regex-safe.",
    "related": [
      "fluent_com_editor/skip_no_conflict",
      "fluent_community/asset_listed_slugs"
    ]
  },
  "fluent_com_editor/skip_no_conflict": {
    "summary": "Filters whether the lesson editor's no-conflict sweep runs at all.",
    "details": "Return `true` and neither the script pass nor the stylesheet pass is registered, so every third-party asset stays enqueued on the editor screen. This is the broader of the two escape hatches: `fluent_community/skip_no_conflict` only spares stylesheets, and it is never reached when this filter returns `true`. Note the legacy `fluent_com_editor/` prefix — the stylesheet-only counterpart uses `fluent_community/`.",
    "params": [
      {
        "name": "isSkip",
        "type": "bool",
        "desc": "Whether to leave every third-party script and stylesheet enqueued. `false` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness.",
    "related": [
      "fluent_com_editor/asset_listed_slugs",
      "fluent_community/skip_no_conflict"
    ]
  },
  "fluent_community/asset_listed_slugs": {
    "summary": "Filters the URL fragments that exempt a stylesheet from the lesson editor's no-conflict mode.",
    "details": "Stylesheets are the only assets this affects. The list is joined into a regular expression and matched against every enqueued stylesheet URL under the plugins and themes directories; anything that does not match is dequeued so third-party CSS cannot break the editor. `\\/fluent-community(-pro)?\\/` is appended after the filter and cannot be removed, so the plugin's own stylesheets and Pro's always survive. Note the script side is governed by a differently prefixed hook, `fluent_com_editor/asset_listed_slugs` — filtering this one does nothing for JavaScript.",
    "params": [
      {
        "name": "approvedSlugs",
        "type": "array",
        "desc": "Regular-expression fragments matched against stylesheet URLs, for example `\\/gutenberg\\/`."
      }
    ],
    "returns": "`array` — fragments that are deduplicated and joined with `|` into one pattern, so each entry must be regex-safe.",
    "related": [
      "fluent_community/skip_no_conflict"
    ]
  },
  "fluent_community/autg/password_confirmation": {
    "summary": "Deprecated misspelling of `fluent_community/auth/password_confirmation`.",
    "details": "Kept alive through `apply_filters_deprecated()` and marked deprecated since 2.7.8, so a callback still runs but raises a deprecation notice when `WP_DEBUG` is on. Its return value becomes the input to the correctly spelled filter, which therefore has the final say. Move existing callbacks across.",
    "params": [
      {
        "name": "isRequired",
        "type": "bool",
        "desc": "Whether password confirmation is required. `true` by default."
      }
    ],
    "returns": "`bool` — passed on as the default for `fluent_community/auth/password_confirmation`.",
    "related": [
      "fluent_community/auth/password_confirmation"
    ]
  },
  "fluent_community/auth/after_login_redirect_url": {
    "summary": "Filters where a member lands after signing in through the community auth page.",
    "details": "Applied at two call sites that reach different sign-in flows: the plugin's own AJAX login handler, and a bridge on `fluent_auth/login_redirect_url` that only fires when the request carries `is_fcom_auth` and `fcom_redirect`. Logins that happen anywhere else on the site never reach it. The incoming value has already been through `wp_validate_redirect()` against the portal base, but your return value is not re-validated on the AJAX path — it is handed to the browser as-is.",
    "params": [
      {
        "name": "redirectUrl",
        "type": "string",
        "desc": "The resolved destination, the portal base by default."
      },
      {
        "name": "user",
        "type": "\\WP_User",
        "desc": "The user who signed in."
      }
    ],
    "returns": "`string` — an absolute URL.",
    "related": [
      "fluent_community/auth/after_signup_redirect_url",
      "fluent_community/auth/after_login_with_invitation"
    ]
  },
  "fluent_community/auth/after_login_with_invitation": {
    "summary": "Filters where a member is sent after logging in with an invitation token attached.",
    "details": "Core's handler does the real work here: it validates the token, adds the user to the invited space as `member` or `student`, marks the invitation accepted and returns the space permalink. The result is only adopted when it is truthy and not a `WP_Error`, so returning `null` leaves the ordinary redirect in place. It runs before `fluent_community/auth/after_login_redirect_url`, which sees the resulting URL and can still change it.",
    "params": [
      {
        "name": "redirectUrl",
        "type": "mixed",
        "desc": "`null` on entry."
      },
      {
        "name": "user",
        "type": "\\WP_User",
        "desc": "The user who just signed in."
      },
      {
        "name": "invitationToken",
        "type": "string",
        "desc": "The submitted invitation token."
      }
    ],
    "returns": "`string` — a URL, or `null`/`WP_Error` to fall back to the default redirect.",
    "related": [
      "fluent_community/auth/after_login_redirect_url",
      "fluent_community/auth/invitation"
    ]
  },
  "fluent_community/auth/after_signup_redirect_url": {
    "summary": "Filters where a new member lands after completing registration.",
    "details": "Core attaches the invitation handler here, which — when the request carried a valid `invitation_token` — enrols the new account in the invited space, marks the invitation accepted and redirects to the space instead. The third argument is the raw `$_REQUEST` array, unsanitised. The URL is returned to the front end both as `redirect_url` and inside the success HTML, so it is used twice.",
    "params": [
      {
        "name": "redirectUrl",
        "type": "string",
        "desc": "The destination, the portal base or a validated `redirect_to`."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The newly registered user, with an XProfile already synced."
      },
      {
        "name": "postedData",
        "type": "array",
        "desc": "The raw `$_REQUEST` payload, including `invitation_token` when present."
      }
    ],
    "returns": "`string` — an absolute URL.",
    "related": [
      "fluent_community/auth/after_login_redirect_url"
    ]
  },
  "fluent_community/auth/before_auth_page_process": {
    "summary": "Fires on the auth page after the redirect shortcuts have been evaluated but before a form is chosen.",
    "details": "By the time it runs, an already-signed-in visitor without an invitation has been redirected away and an auto-accepted invitation has been handled, so reaching this hook means a form is about to be rendered. It is the earliest place to short-circuit the auth page with a redirect and an `exit()` of your own. Both arguments can be empty: `$currentUserId` is `0` for a guest and `$invitation` is `null` unless a valid `invitation_token` was supplied.",
    "params": [
      {
        "name": "currentUserId",
        "type": "int",
        "desc": "The signed-in user ID, or `0`."
      },
      {
        "name": "invitation",
        "type": "\\FluentCommunity\\Modules\\Auth\\Classes\\Invitation",
        "desc": "The resolved, still-valid invitation, or `null`."
      }
    ],
    "related": [
      "fluent_community/auth/pre_content",
      "fluent_community/auth/invitation"
    ]
  },
  "fluent_community/auth/disable_rate_limit": {
    "summary": "Filters whether the login and signup rate limit is bypassed for this request.",
    "details": "The limit is ten attempts per IP address per five minutes, tracked in a transient and shared between the login and registration endpoints. Returning `true` skips the check and the counter increment entirely, so it also stops the request contributing to a later limit. Nothing about the request is passed — inspect `$_SERVER` or the request yourself if you want to scope the exemption.",
    "params": [
      {
        "name": "disabled",
        "type": "bool",
        "desc": "Whether to skip rate limiting. `false` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness."
  },
  "fluent_community/auth/invitation": {
    "summary": "Resolves an invitation token from the URL into an invitation record.",
    "details": "Starts as `null`; core's `InvitationHandler` answers it with the matching `pending` or `active` row. Whatever is returned must expose `isValid()` — the caller invokes it immediately and discards anything that fails, then reads `message` (the invited email) and `post_id` (the space) off it. This is the hook for backing invitations with your own storage.",
    "params": [
      {
        "name": "invitation",
        "type": "mixed",
        "desc": "The resolved invitation, `null` before core answers."
      },
      {
        "name": "token",
        "type": "string",
        "desc": "The raw `invitation_token` query parameter."
      }
    ],
    "returns": "`\\FluentCommunity\\Modules\\Auth\\Classes\\Invitation` or `null` — an object with an `isValid()` method, or `null` for an unknown token.",
    "related": [
      "fluent_community/auth/show_invitation_for_user",
      "fluent_community/auth/after_login_with_invitation"
    ]
  },
  "fluent_community/auth/login_fields": {
    "summary": "Filters the field definitions for the plugin's own login form.",
    "details": "Narrower than it looks: the built-in login form is only used when FluentAuth is not active, since otherwise the page renders the `[fluent_auth_login]` shortcode instead. The fields also reach the admin settings screen through `fluent_community/get_auth_settings`. Unlike the signup fields these are not used to derive validation — the handler validates `log` and `pwd` from the WordPress login form directly.",
    "params": [
      {
        "name": "fields",
        "type": "array",
        "desc": "Field definitions keyed by name: `username` and `password`."
      }
    ],
    "returns": "`array` — the field map.",
    "related": [
      "fluent_community/auth/signup_fields"
    ]
  },
  "fluent_community/auth/login_url": {
    "summary": "Filters the URL the portal's login and signup buttons point at.",
    "details": "Wraps `Helper::getAuthUrl()`, which already honours the administrator-configured custom auth URL. It feeds the header login button, the header data and the logged-out redirect, so it changes where visitors are sent but not which pages are protected — the gate itself is `Helper::isPublicAccessible()`. Pointing it back into the portal risks a redirect loop; core guards against that only for the stored setting, not for this filter.",
    "params": [
      {
        "name": "authUrl",
        "type": "string",
        "desc": "The resolved auth page URL."
      }
    ],
    "returns": "`string` — an absolute URL.",
    "related": [
      "fluent_community/portal/not_logged_in",
      "fluent_community/auth/lost_password_url"
    ]
  },
  "fluent_community/auth/lost_password_url": {
    "summary": "Filters the \"Lost your password?\" destination on the community login form.",
    "details": "The default depends on FluentAuth: with it active the link stays on the community auth page with `form=reset_password`, otherwise it is `wp_lostpassword_url()` with a redirect back. Note the redirect argument is only applied on the WordPress branch — the FluentAuth URL carries no redirect. The native login template renders `wp_lostpassword_url()` directly and does not use this filter.",
    "params": [
      {
        "name": "url",
        "type": "string",
        "desc": "The reset-password URL for the current configuration."
      }
    ],
    "returns": "`string` — an absolute URL.",
    "related": [
      "fluent_community/auth/login_url"
    ]
  },
  "fluent_community/auth/password_confirmation": {
    "summary": "Filters whether the registration form asks for the password twice.",
    "details": "Returning `false` drops the `conf_password` field from the form and relaxes the validation rule on `password` accordingly, so the two stay in step. The value passed in is itself the result of the deprecated `fluent_community/autg/password_confirmation` filter, which still runs first.",
    "params": [
      {
        "name": "isRequired",
        "type": "bool",
        "desc": "Whether confirmation is required. `true` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness.",
    "related": [
      "fluent_community/autg/password_confirmation",
      "fluent_community/auth/signup_fields"
    ]
  },
  "fluent_community/auth/pre_content": {
    "summary": "Replaces the body of the auth page with your own rendering.",
    "details": "The return value is never printed. The callback that renders the auth forms applies this filter first and, if the result is non-empty, returns without drawing anything — so a truthy return is a veto, and your markup has to be echoed from inside the filter callback itself. Returning an empty string leaves the built-in login, signup, reset and invitation screens in place.",
    "params": [
      {
        "name": "preContent",
        "type": "string",
        "desc": "Empty string on entry."
      },
      {
        "name": "context",
        "type": "string",
        "desc": "The `$scope` from the headless page; `user_registration`."
      },
      {
        "name": "targetForm",
        "type": "string",
        "desc": "The form about to render: `login`, `register`, `reset_password` or `accept_invitation`."
      },
      {
        "name": "frameData",
        "type": "array",
        "desc": "Frame data: `logo`, `title`, `description`, `button_label`."
      }
    ],
    "returns": "`string` — any non-empty value suppresses the default auth markup; the string itself is discarded, so echo your own output.",
    "related": [
      "fluent_community/headless/content"
    ]
  },
  "fluent_community/auth/registration_enabled": {
    "summary": "Filters whether members may register themselves.",
    "details": "The base value is the WordPress `users_can_register` option, widened by the plugin's own `explicit_registration` setting when that option is off. It governs the signup form, the \"Login / Signup\" button label and the server-side guard in the registration endpoint alike. A valid invitation bypasses it on every one of those paths, so returning `false` closes public registration without breaking invitations.",
    "params": [
      {
        "name": "enabled",
        "type": "bool",
        "desc": "Whether self-registration is open."
      }
    ],
    "returns": "`bool` — evaluated for truthiness; callers cast it with `!!`.",
    "related": [
      "fluent_community/auth/signup_fields"
    ]
  },
  "fluent_community/auth/settings": {
    "summary": "Filters the stored login and signup screen configuration.",
    "details": "Applied in `AuthenticationService::getAuthSettings()`, which every consumer goes through, so this is the authoritative place to change the auth screens. The array has a `login` and a `signup` branch, each with a `banner` block (logo, title, description, colours, background) and a `form` block (title, description, button label and colours). The terms field is backfilled into `signup.form.fields.terms` before the filter runs if it is missing. For the admin editing screen only, `fluent_community/get_auth_settings` runs afterwards.",
    "params": [
      {
        "name": "authSettings",
        "type": "array",
        "desc": "The full auth configuration, merged over the shipped defaults."
      }
    ],
    "returns": "`array` — the configuration. Consumers read nested keys directly, so preserve the `login`/`signup` shape.",
    "related": [
      "fluent_community/get_auth_settings",
      "fluent_community/auth/signup_fields"
    ]
  },
  "fluent_community/auth/show_invitation_for_user": {
    "summary": "Renders the accept-invitation screen for a signed-in user who arrived with a valid invitation.",
    "details": "Reached only when the visitor is already logged in, the invitation is valid, and either it carries no email or its email matches the signed-in account. Core attaches `InvitationHandler::showCommunityOnBoard()`, so a callback of your own appends to that screen rather than replacing it. Output is echoed; it is drawn inside the auth page body from `fluent_community/headless/content`.",
    "params": [
      {
        "name": "invitation",
        "type": "\\FluentCommunity\\Modules\\Auth\\Classes\\Invitation",
        "desc": "The invitation being accepted."
      },
      {
        "name": "frameData",
        "type": "array",
        "desc": "Auth page frame data: `logo`, `title`, `description`, `button_label`."
      }
    ],
    "related": [
      "fluent_community/auth/invitation",
      "fluent_community/headless/content"
    ]
  },
  "fluent_community/auth/signup_fields": {
    "summary": "Filters the field definitions used to build and validate the registration form.",
    "details": "Both sides of registration read this: the form builder renders it, and the AJAX handler derives the accepted request keys, the required-field rules and the per-field `sanitize_callback` from it — so a field added here is accepted by the endpoint, and one removed here is silently dropped from the request. Core already filters it in `app/Hooks/filters.php`. `conf_password` is unset afterwards when password confirmation is disabled, and the stored terms field overrides the `terms` entry. Do not rename `full_name`, `email`, `username` or `password`: the handler references them by name.",
    "params": [
      {
        "name": "fields",
        "type": "array",
        "desc": "Field definitions keyed by name, each with `type`, `label`, `placeholder`, `required` and `sanitize_callback`."
      },
      {
        "name": "invitation",
        "type": "\\FluentCommunity\\Modules\\Auth\\Classes\\Invitation",
        "desc": "The invitation being accepted, or `null` for an ordinary signup."
      }
    ],
    "returns": "`array` — the field map, rendered in order.",
    "related": [
      "fluent_community/auth/login_fields",
      "fluent_community/auth/password_confirmation"
    ]
  },
  "fluent_community/auth/signup_verification_email_body": {
    "summary": "Filters the body of the registration verification code email.",
    "details": "The filtered HTML is the inner content only; it is wrapped in the shared `email.template` view with the community logo and footer afterwards, so return a fragment rather than a whole document. The plain code is passed separately, which is the supported way to rebuild the message around it — the code itself is stored only as a hash in the signed token, so this is the one place it can be read.",
    "params": [
      {
        "name": "message",
        "type": "string",
        "desc": "The default HTML body, already containing the code."
      },
      {
        "name": "verificationCode",
        "type": "string",
        "desc": "The six-digit code, in clear."
      },
      {
        "name": "formData",
        "type": "array",
        "desc": "The submitted registration data, including `email`, `first_name` and `last_name`."
      }
    ],
    "returns": "`string` — an HTML fragment.",
    "related": [
      "fluent_community/auth/signup_verification_mail_subject",
      "fluent_community/auth/two_factor_enabled"
    ]
  },
  "fluent_community/auth/signup_verification_mail_subject": {
    "summary": "Filters the subject line of the registration verification code email.",
    "details": "Only fires when two-factor signup verification is active. It receives just the default subject — no user or form data — so anything dynamic has to be resolved in the callback. The matching body filter does get the form data.",
    "params": [
      {
        "name": "subject",
        "type": "string",
        "desc": "The default subject, naming the site title."
      }
    ],
    "returns": "`string` — the subject line, passed to the mailer unescaped.",
    "related": [
      "fluent_community/auth/signup_verification_email_body"
    ]
  },
  "fluent_community/auth/two_factor_enabled": {
    "summary": "Filters whether registration requires an emailed verification code.",
    "details": "The value handed in is the result of `fluent_auth/verify_signup_email`, kept for compatibility with FluentAuth snippets, and defaults to on. When it is enabled the signup endpoint responds with a verification form instead of creating the account, and the account is only created once the code checks out. Core disables it for invitations that carry a fixed email address, on the grounds that the address is already proven.",
    "params": [
      {
        "name": "enabled",
        "type": "bool",
        "desc": "Whether to require email verification during signup. `true` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness.",
    "related": [
      "fluent_community/auth/signup_verification_mail_subject",
      "fluent_community/auth/signup_verification_email_body"
    ]
  },
  "fluent_community/base_url": {
    "summary": "Filters the absolute base URL every portal link is built from.",
    "details": "The default is `home_url()` joined with the portal slug, and the result is passed through `rtrim()` before the path is appended, so a trailing slash is harmless. `Helper::baseUrl()` is called on nearly every request path, so keep the callback cheap and side-effect free. When the routing type is `hash` the path is appended after a `#` instead. Changing the host here does not change the rewrite rules, so an off-site value produces links that no longer resolve.",
    "params": [
      {
        "name": "baseUrl",
        "type": "string",
        "desc": "The portal base URL, `home_url()` plus the portal slug by default."
      }
    ],
    "returns": "`string` — an absolute URL. Trailing slashes are trimmed.",
    "related": [
      "fluent_community/portal_slug",
      "fluent_community/portal_route_type"
    ]
  },
  "fluent_community/before_auth_form_header": {
    "summary": "Prints above the heading of an auth form, with the form type as its argument.",
    "details": "Three call sites, and their positions differ: on the signup template it fires as the first child of `#fcom_user_onboard_wrap`, above the header block; on the native login template likewise; on the FluentAuth login markup it fires inside `.fcom_onboard_header`, directly above the title. Core uses it to print the \"X has invited you…\" banner, registering a callback on the fly when an invitation is present, which means it can be attached after the page has already begun rendering.",
    "params": [
      {
        "name": "formType",
        "type": "string",
        "desc": "`login` or `signup`. Note the invitation-accept and password-reset screens do not fire this hook."
      }
    ],
    "related": [
      "fluent_community/before_registration_form"
    ]
  },
  "fluent_community/before_comment_create": {
    "summary": "Fires with the prepared comment attributes just before the row is inserted.",
    "details": "Read-only: the attributes are passed by value, so mutating them changes nothing. The filter that runs on the very next line, `fluent_community/comment/comment_data`, is the one that can alter them. Everything is already resolved at this point — rendered HTML, media, `parent_id` for replies, `is_admin`, and `meta.mentioned_user_ids` — which makes this a convenient point for validation logging or for throwing to abort the request.",
    "params": [
      {
        "name": "commentData",
        "type": "array",
        "desc": "The attributes the comment will be created with."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being commented on."
      }
    ],
    "related": [
      "fluent_community/comment/comment_data",
      "fluent_community/comment_added"
    ]
  },
  "fluent_community/before_comment_delete": {
    "summary": "Runs immediately before a comment row is deleted, while it and its relations are still readable.",
    "details": "The only place to capture a comment before it disappears — `fluent_community/comment_deleted` receives just the ID. Attached media is announced separately through `fluent_community/comment/media_deleted` right after this hook, and the post's comment count is recalculated after the delete, so the count on `$comment->post` is still the pre-delete value here.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment about to be deleted."
      }
    ],
    "related": [
      "fluent_community/comment_deleted",
      "fluent_community/comment/media_deleted"
    ]
  },
  "fluent_community/before_header_logo": {
    "summary": "Prints inside the header's left group, between the mobile menu button and the logo.",
    "details": "Fires from `app/Views/portal/header.php`, so it applies to every surface that renders the standard header: the standalone portal, the two theme frame templates and the Gutenberg block. An empty `#fcom_before_logo` div sits just before it as a client-side mount point. Output is echoed raw into the markup — escape it yourself.",
    "params": [
      {
        "name": "auth",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The current member's profile, or `null` for a guest."
      }
    ],
    "related": [
      "fluent_community/after_header_logo"
    ]
  },
  "fluent_community/before_header_menu_items": {
    "summary": "Prints in the header's right-hand menu list, between the notification bell and the account menu.",
    "details": "The name suggests the main navigation, but this fires inside `ul.fcom_user_context_menu_items` on the right of the header — for the main menu use `fluent_community/after_header_menu`. It is the only header hook that receives the render context as a second argument. Core hangs the admin settings cog here on pages where the sidebar footer is not drawn.",
    "params": [
      {
        "name": "auth",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The current member's profile, or `null` for a guest."
      },
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, or `block_editor`."
      }
    ],
    "related": [
      "fluent_community/before_header_right_menu_items",
      "fluent_community/after_header_menu"
    ]
  },
  "fluent_community/before_header_right_menu_items": {
    "summary": "Prints as the first item of the header's right-hand `ul.fcom_user_context_menu_items`.",
    "details": "You are inside a `<ul>`, so emit complete `<li>` elements. It runs before the dark-mode toggle, the search placeholder and the notification bell. Core uses it for the \"Customize Colors\" entry shown to site administrators on admin routes.",
    "params": [
      {
        "name": "auth",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The current member's profile, or `null` for a guest."
      }
    ],
    "related": [
      "fluent_community/after_header_right_menu_items",
      "fluent_community/before_header_menu_items"
    ]
  },
  "fluent_community/before_js_loaded": {
    "summary": "Prints at the end of `<body>` on the standalone portal page, after the app wrapper and before the scripts.",
    "details": "The last hook that runs before the SPA bundle is emitted, which makes it the place for JavaScript the app must find already defined — core prints the `fluentComAdmin` and `fcom_portal_general` variable blocks here in headless mode, and Pro's emoji module preloads its data. It fires immediately before `fluent_community/portal_footer`; use that one instead for anything that should run after the bundle.",
    "related": [
      "fluent_community/portal_footer",
      "fluent_community/headless/before_js_loaded"
    ]
  },
  "fluent_community/before_portal_dom": {
    "summary": "Prints inside the portal wrapper, immediately before the app markup.",
    "details": "The one rendering hook shared by every portal surface: the standalone portal page, both WordPress frame templates, and the Gutenberg community block. Because it runs before the layout paints, it is the right place for pre-paint scripts — core uses it for the sidebar-collapse anti-flicker snippet.",
    "related": [
      "fluent_community/portal_header"
    ]
  },
  "fluent_community/before_portal_rendered": {
    "summary": "Fires in `PortalHandler::renderFullApp()` immediately before the portal page template is rendered.",
    "details": "The last point before any markup is emitted: assets have been enqueued, dynamic meta data resolved and the collapsed-sidebar body class decided. `$data` is passed by value, so mutating it changes nothing — filter `fluent_community/portal_data_vars` if you need to alter the payload. Use it to register late output callbacks, which is what the colour customiser does.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The full render payload: `title`, `css_files`, `js_files`, `js_vars`, `isHeadless`, `route_group`, `landing_route`."
      }
    ],
    "related": [
      "fluent_community/portal_data_vars",
      "fluent_community/rendering_headless_portal"
    ]
  },
  "fluent_community/before_registration_form": {
    "summary": "Prints inside the signup card, above the registration form itself.",
    "details": "Core renders the FluentAuth social login buttons here when FluentAuth is active. Note the mismatch at the call site: the core callback is declared with a `$frameData` parameter but `do_action()` is called with no arguments, so that parameter is always null — declare your own callback with none.",
    "related": [
      "fluent_community/after_registration_form",
      "fluent_community/before_auth_form_header"
    ]
  },
  "fluent_community/before_sidebar_wrap": {
    "summary": "Prints immediately before the `#fcom_sidebar_wrap` element in the portal sidebar.",
    "details": "Skipped entirely when the sidebar is being rendered for the AJAX refresh endpoint (`$context` of `ajax`), so anything printed here will be missing after a client-side sidebar reload. Pro's PWA module uses it as the `top` slot for install prompts. Echo directly.",
    "params": [
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, or `block_editor`. Never `ajax` — that context skips the hook."
      }
    ],
    "related": [
      "fluent_community/after_sidebar_wrap",
      "fluent_community/portal_sidebar"
    ]
  },
  "fluent_community/before_unblocking_user": {
    "summary": "Fires just before a block is lifted.",
    "details": "The row still exists when callbacks run; the handler deletes it on the next line. Unblocking deletes the row outright rather than restoring it to level 1, so the previous follow relationship is not recovered and no follow action fires afterwards.",
    "params": [
      {
        "name": "follow",
        "type": "\\FluentCommunityPro\\App\\Models\\Follow",
        "desc": "The level-0 follow row about to be deleted."
      },
      {
        "name": "xProfile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "Profile of the user being unblocked."
      }
    ],
    "page": "members",
    "related": [
      "fluent_community/blocked_user"
    ]
  },
  "fluent_community/before_unfollowing_user": {
    "summary": "Fires just before a follow relationship is deleted.",
    "details": "Fired from both the explicit POST /profile/{username}/unfollow endpoint and the toggle-follow endpoint when the toggle resolves to \"unfollow\". The row still exists when callbacks run — this is the last chance to read it, since the handler calls $follow->delete() on the next line. There is no matching \"after\" action.",
    "params": [
      {
        "name": "follow",
        "type": "\\FluentCommunityPro\\App\\Models\\Follow",
        "desc": "The follow row about to be deleted."
      },
      {
        "name": "xProfile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "Profile of the user being unfollowed."
      }
    ],
    "related": [
      "fluent_community/followed_user"
    ]
  },
  "fluent_community/block_editor_footer": {
    "summary": "Prints after the editor mount point and before `</body>` in the lesson block editor document.",
    "details": "Core attaches the entire WordPress footer sequence here — footer scripts, script modules, media templates and global styles — because `wp_footer()` is never called on this document. Register at a later priority if your output depends on those having run.",
    "related": [
      "fluent_community/block_editor_head"
    ]
  },
  "fluent_community/block_editor_head": {
    "summary": "Prints as the last thing inside `<head>` of the standalone lesson block editor document.",
    "details": "The lesson editor renders its own complete HTML document in an iframe rather than going through a theme, so `wp_head()` never runs on it; the WordPress head routines are dispatched from a private `fluent_block_editor/head` action just before this hook. Core uses it to link the editor stylesheets and inline the colour-scheme variables. The page only exists when the request carries `fluent_community_block_editor`.",
    "related": [
      "fluent_community/block_editor_footer",
      "fluent_community/block_editor_settings"
    ]
  },
  "fluent_community/block_editor_settings": {
    "summary": "Filters the complete settings object handed to the isolated block editor used for lessons.",
    "details": "Applied last, after the editor styles, resolved assets, default styles and image sizes have been merged in, so a callback sees the final object. The keys mirror the ones core Gutenberg expects — colour and font-size palettes, `allowedBlockTypes`, the placeholder strings, the various `disableCustom*` switches — and are consumed by `@wordpress/block-editor` in an iframe rather than by the WordPress editor, so standard `block_editor_settings_all` callbacks do not apply here.",
    "params": [
      {
        "name": "editorSettings",
        "type": "array",
        "desc": "The editor settings object, including `styles`, `imageSizes`, `allowedBlockTypes` and the palettes."
      }
    ],
    "returns": "`array` — the settings object, JSON-encoded into the editor page.",
    "related": [
      "fluent_community/allowed_block_types",
      "fluent_community/editor_i18n_strings"
    ]
  },
  "fluent_community/blocked_user": {
    "summary": "Fires after one member blocks another.",
    "details": "A block is stored as a Follow row with level 0, so this fires both when a brand new row is created and when an existing follow is demoted to a block. This is a member-to-member block, not a moderation action: the endpoint explicitly refuses when the target has community moderator access, and also refuses when the *caller* is a moderator.",
    "params": [
      {
        "name": "follow",
        "type": "\\FluentCommunityPro\\App\\Models\\Follow",
        "desc": "The follow row now at level 0."
      },
      {
        "name": "xProfile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "Profile of the blocked user."
      }
    ],
    "page": "members",
    "related": [
      "fluent_community/before_unblocking_user"
    ]
  },
  "fluent_community/bookmarks_api_response": {
    "summary": "Filters the response of the bookmarked-posts listing.",
    "details": "The payload wraps a `feeds` block with the usual paging keys, and adds `last_id` on page one only. Bookmarks are restricted to `published` posts, so the list never contains scheduled, pending or unlisted items even for moderators.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `feeds` block and, on page one, `last_id`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/feeds_api_response"
    ]
  },
  "fluent_community/bulk_members/add_members_response": {
    "summary": "Filters the response of the bulk add-members-to-space endpoint.",
    "details": "Applied on both branches of the endpoint — the explicit user_ids batch (capped at 500 ids per request) and the copy-from-another-source batch — so a callback sees the same counter payload either way.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Counters: added, skipped, failed, processed, total, has_more, message."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "spaceSlug",
        "type": "string",
        "desc": "Slug of the target space."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/bulk_members/import_members_response"
    ]
  },
  "fluent_community/bulk_members/add_students_response": {
    "summary": "Filters the response of the bulk enroll-students-in-course endpoint.",
    "details": "Applied on both branches of the endpoint — the explicit user_ids batch (capped at 500 ids per request) and the copy-from-another-source batch.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Counters: added, skipped, failed, processed, total, has_more, message."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "courseId",
        "type": "int",
        "desc": "Target course id."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/bulk_members/import_students_response"
    ]
  },
  "fluent_community/bulk_members/crm_tag_members_resolve_response": {
    "summary": "Filters the response of resolving a FluentCRM tag into space members.",
    "details": "The hook name is assembled at runtime from a prefix and a suffix, so a source scan for the literal string will not find it — the call site is the shared runCrmTagResolve() helper. Requires FluentCRM to be active. The payload is a page of resolved user ids plus counters; the caller pages through with offset and per_page, and create_missing controls whether contacts without a WordPress user get one created.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Resolved user_ids plus failed / processed counters."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "spaceSlug",
        "type": "string",
        "desc": "Slug of the space the tag is being resolved for."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/bulk_members/crm_tag_students_resolve_response"
    ]
  },
  "fluent_community/bulk_members/crm_tag_students_resolve_response": {
    "summary": "Filters the response of resolving a FluentCRM tag into course students.",
    "details": "The course-side counterpart, from the same runtime-assembled hook name in runCrmTagResolve(). Requires FluentCRM to be active.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Resolved user_ids plus failed / processed counters."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "courseId",
        "type": "int",
        "desc": "Course the tag is being resolved for."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/bulk_members/crm_tag_members_resolve_response"
    ]
  },
  "fluent_community/bulk_members/import_members_response": {
    "summary": "Filters the response of the CSV/list import-members-into-space endpoint.",
    "details": "This is the import path, which may create WordPress users that do not exist yet; the add path never does. Chunked — has_more and the counters describe the current chunk against the running total.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Counters: added, skipped, failed, processed, total, has_more, message."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "spaceSlug",
        "type": "string",
        "desc": "Slug of the target space."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/bulk_members/add_members_response"
    ]
  },
  "fluent_community/bulk_members/import_students_response": {
    "summary": "Filters the response of the CSV/list import-students-into-course endpoint.",
    "details": "The course-side counterpart of the member import; may create WordPress users that do not exist yet, and is chunked the same way.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Counters: added, skipped, failed, processed, total, has_more, message."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "courseId",
        "type": "int",
        "desc": "Target course id."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/bulk_members/add_students_response"
    ]
  },
  "fluent_community/bulk_members/{filterTag}": {
    "summary": "The runtime-assembled name behind the two FluentCRM tag-resolution response filters.",
    "details": "The suffix is passed in by the caller, so a source scan for a literal hook name finds nothing here. It has exactly two live values, both from `BulkMembersController::runCrmTagResolve()`: `fluent_community/bulk_members/crm_tag_members_resolve_response` for spaces and `fluent_community/bulk_members/crm_tag_students_resolve_response` for courses. Hook those names rather than this one. Pro-only, and requires FluentCRM to be active.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Resolved `user_ids` plus failed and processed counters."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "contextId",
        "type": "mixed",
        "desc": "The space slug or the course ID, depending on which endpoint ran."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/bulk_members/crm_tag_members_resolve_response",
      "fluent_community/bulk_members/crm_tag_students_resolve_response"
    ]
  },
  "fluent_community/can_access_portal": {
    "summary": "Filters whether a user may access the community portal at all.",
    "details": "Applied at every return point of `Helper::canAccessPortal()`, so a callback sees the decision but not the reason behind it — the access level, role check and active-profile check are all collapsed into one boolean by the time it runs. No user ID is passed, so resolve the subject yourself if you need it. A callback that unconditionally returns `true` opens the portal to logged-out visitors as well.",
    "params": [
      {
        "name": "canAccess",
        "type": "bool",
        "desc": "The decision reached from the access level, role list and profile status."
      }
    ],
    "returns": "`bool` — `true` to allow portal access, `false` to deny. The value is used directly, so return a real boolean.",
    "related": [
      "fluent_community/super_admin_capability"
    ]
  },
  "fluent_community/can_view_comments_{feed}": {
    "summary": "Dynamic filter deciding whether the comment list for a post or lesson is returned at all.",
    "details": "The placeholder is `$feed->type`, so in practice it is `fluent_community/can_view_comments_text` for ordinary posts and `fluent_community/can_view_comments_course_lesson` for lesson discussions — there is no un-suffixed variant to hook. Returning `false` makes the endpoint respond with an empty `comments` array rather than an error, so the client shows a post with no comments instead of a permission message. The post has already passed its own visibility check by then.",
    "params": [
      {
        "name": "canViewComments",
        "type": "bool",
        "desc": "Whether to return the comments. `true` by default."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post or lesson the comments belong to."
      }
    ],
    "returns": "`bool` — a falsy value yields an empty comment list, not a 403.",
    "related": [
      "fluent_community/user/space/permissions"
    ]
  },
  "fluent_community/can_view_leaderboard_members": {
    "summary": "Filters whether the current user may see the member list on the leaderboard.",
    "details": "Reads the `leaderboard_members_visibility` privacy setting and otherwise mirrors the members-page check. It controls visibility of the ranked members, not whether the leaderboard feature itself is enabled.",
    "params": [
      {
        "name": "canView",
        "type": "bool",
        "desc": "The decision derived from the privacy setting."
      },
      {
        "name": "pageStatus",
        "type": "string",
        "desc": "The `leaderboard_members_visibility` setting: `everybody`, `logged_in`, or a moderator-only value."
      }
    ],
    "returns": "`bool` — `true` to allow viewing.",
    "related": [
      "fluent_community/can_view_members_page"
    ]
  },
  "fluent_community/can_view_members_page": {
    "summary": "Filters whether the current user may view the members directory.",
    "details": "Driven by the `members_page_status` privacy setting, with the same three-way shape as the profile and leaderboard checks. It gates the directory page only; individual profiles are governed separately by `fluent_community/can_view_user_profile`.",
    "params": [
      {
        "name": "canView",
        "type": "bool",
        "desc": "The decision derived from the privacy setting."
      },
      {
        "name": "pageStatus",
        "type": "string",
        "desc": "The `members_page_status` setting: `everybody`, `logged_in`, or a moderator-only value."
      }
    ],
    "returns": "`bool` — `true` to allow viewing.",
    "related": [
      "fluent_community/can_view_user_profile",
      "fluent_community/can_view_leaderboard_members"
    ]
  },
  "fluent_community/can_view_user_profile": {
    "summary": "Filters whether the current user may view a member profile page.",
    "details": "The base decision comes from the `profile_page_visibility` privacy setting: `everybody` yields `true`, `logged_in` yields the login state, and anything else falls back to \"own profile or moderator\". `$pageStatus` is passed so a callback can relax one visibility mode without hard-coding the others. `$targetUserId` is frequently `null` — the own-profile branch compares it with a strict `===`, so a string ID will not match.",
    "params": [
      {
        "name": "canView",
        "type": "bool",
        "desc": "The decision derived from the privacy setting."
      },
      {
        "name": "pageStatus",
        "type": "string",
        "desc": "The `profile_page_visibility` setting: `everybody`, `logged_in`, or a moderator-only value."
      },
      {
        "name": "targetUserId",
        "type": "int",
        "desc": "The profile owner's user ID. May be `null` when the caller did not supply one."
      }
    ],
    "returns": "`bool` — `true` to allow viewing.",
    "related": [
      "fluent_community/can_view_members_page"
    ]
  },
  "fluent_community/check_rate_limit/create_comment": {
    "summary": "Runs at the top of the create-comment endpoint so rate limiters can abort the request.",
    "details": "Core attaches `RateLimitHandler::maybeLimitComment()`, which throws once the member has exceeded `fluent_community/rate_limit/comments_per_minute` within the last 60 seconds. It fires before the comment text is validated and before the target post is even loaded, so the user is all you get. Throw to refuse; there is no return value.",
    "params": [
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The authenticated commenter."
      }
    ],
    "related": [
      "fluent_community/rate_limit/comments_per_minute",
      "fluent_community/check_rate_limit/create_post"
    ]
  },
  "fluent_community/check_rate_limit/create_post": {
    "summary": "Runs at the very top of the create-post endpoint so rate limiters can abort the request.",
    "details": "Core attaches `RateLimitHandler::maybeLimitPost()`, which throws when the author has created more posts than `fluent_community/rate_limit/posts_per_5_minutes` allows in the last five minutes. Throwing is the intended way to refuse a post from here — there is no return value, and the controller has not yet validated or sanitised anything, so the only thing you can reliably inspect is the user. Site administrators are exempted inside core's callback, not before the hook.",
    "params": [
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The authenticated author."
      }
    ],
    "related": [
      "fluent_community/rate_limit/posts_per_5_minutes",
      "fluent_community/check_rate_limit/create_comment"
    ]
  },
  "fluent_community/check_rate_limit/media_upload": {
    "summary": "Runs before an upload is validated so rate limiters can abort the request.",
    "details": "Core attaches `RateLimitHandler::maybeLimitMediaUpload()`, which throws once the member has created more media rows than `fluent_community/rate_limit/media_upload_per_minute` allows in the last 60 seconds. It runs after the PHP upload-size sanity check but before MIME validation, so nothing about the file is available yet. Site administrators are exempted inside the callback.",
    "params": [
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The uploading member."
      }
    ],
    "related": [
      "fluent_community/rate_limit/media_upload_per_minute"
    ]
  },
  "fluent_community/color_config_api_response": {
    "summary": "Filters the payload the colour customiser loads its state from.",
    "details": "`config` is `fluent_community/color_schmea_config` resolved with the `edit` context, and `schemas` is the full set of built-in light and dark skins with every selector and property, which is what the customiser renders its controls from. Adding a skin here makes it selectable but does not make it generate CSS — that comes from `Utility::getColorSchemas()`, which this payload merely exposes.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`config` and `schemas`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/color_schmea_config",
      "fluent_community/suggested_colors"
    ]
  },
  "fluent_community/color_schmea_config": {
    "summary": "Filters the stored colour scheme selection and per-selector overrides.",
    "details": "The hook name contains a typo — \"schmea\" — that has to be reproduced exactly. Core supplies only the empty default: it is Pro that merges the saved `portal_color_config` option over it, so on a free install the portal always renders the default light and dark skins. A `cached_css` key, if present, short-circuits CSS generation entirely, and a `version` that no longer matches the plugin version triggers `fluent_community/recache_color_schema`. `$context` is `view` on every render path and `edit` only for the customiser endpoint.",
    "params": [
      {
        "name": "config",
        "type": "array",
        "desc": "`light_schema`, `dark_schema`, `light_config`, `dark_config`, `version`, and optionally `cached_css`."
      },
      {
        "name": "context",
        "type": "string",
        "desc": "`view` when rendering, `edit` when the customiser is loading the config."
      }
    ],
    "returns": "`array` — the colour configuration. Returning a `cached_css` string bypasses generation.",
    "related": [
      "fluent_community/recache_color_schema",
      "fluent_community/color_config_api_response"
    ]
  },
  "fluent_community/comment/comment_data": {
    "summary": "Filters the attributes a new comment is about to be created from.",
    "details": "The pre-save hook for comments, applied immediately after the read-only `fluent_community/before_comment_create` action. Setting `status` to something other than `published` here diverts the request into the held-comment branch — that is how Pro's moderation holds a comment back. There is no `WP_Error` contract: unlike the post-side filters, whatever you return is passed straight to `Comment::create()`, so throw if you need to abort.",
    "params": [
      {
        "name": "commentData",
        "type": "array",
        "desc": "The attributes to create the comment with: `post_id`, `message`, `message_rendered`, `parent_id`, `is_admin`, `meta`, `status`."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being commented on."
      }
    ],
    "returns": "`array` — the attribute map. It is not validated, so unknown keys will reach the model.",
    "related": [
      "fluent_community/comment/update_comment_data",
      "fluent_community/before_comment_create"
    ]
  },
  "fluent_community/comment/media_deleted": {
    "summary": "Signals that media attached to a comment should be detached and cleaned up.",
    "details": "A request to clean up rather than a report that a delete happened: core's `CleanupHandler::queueMediaDelete()` is what removes local files and deactivates remote ones. Two call sites, and they pass different things — editing a comment passes only the media rows the edit dropped, whereas deleting a comment passes the whole `media` relation. It is not fired at all when an edit drops no media.",
    "params": [
      {
        "name": "media",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Collection",
        "desc": "The `Media` rows to clean up."
      }
    ],
    "related": [
      "fluent_community/feed/media_deleted",
      "fluent_community/handle_remove_bulk_media"
    ]
  },
  "fluent_community/comment/new_comment_response": {
    "summary": "Filters the response returned when a new comment is not published.",
    "details": "Only applied on the held-for-moderation branch. The success path returns its payload without any filter at all, so this is not a general \"comment created\" response hook — it exists so Pro can explain to the author why their comment is pending. The `comment` value is the raw model with its relations loaded.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Response payload: `comment` and `message`."
      },
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The stored comment, in its non-published status."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/comment/new_comment_{comment}",
      "fluent_community/comment/patch_comment_response"
    ]
  },
  "fluent_community/comment/new_comment_{comment}": {
    "summary": "Status-scoped action for a comment that was not published, where the suffix is the comment status.",
    "details": "In practice the live name is `fluent_community/comment/new_comment_pending`, fired when moderation holds a comment back; Pro listens there to attach the flag record. A held comment fires neither `fluent_community/comment_added` nor its type-scoped twin, so if you are counting comments you must handle this branch as well.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The stored comment, in its non-published status."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      }
    ],
    "related": [
      "fluent_community/comment_added",
      "fluent_community/comment/new_comment_response"
    ]
  },
  "fluent_community/comment/patch_comment_response": {
    "summary": "Filters the response of the comment patch endpoint.",
    "details": "The patch endpoint handles the pin toggle only and is restricted to moderators and admins. The filter is applied whether or not anything changed, and receives four arguments — note that the request data is last, not second as in most response filters.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Response payload: `comment` and `message`."
      },
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment after the patch."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/comment/updated"
    ]
  },
  "fluent_community/comment/react_added": {
    "summary": "Fires when a member likes a comment.",
    "details": "Guarded by `wasRecentlyCreated`, so re-sending the same like is a no-op that does not fire again. The comment's incremented `reactions_count` is already saved. Comment reactions have no type dimension — unlike post reactions there is no bookmark variant. Core uses it to raise the reply-liked notification.",
    "params": [
      {
        "name": "reaction",
        "type": "\\FluentCommunity\\App\\Models\\Reaction",
        "desc": "The stored reaction row."
      },
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment that was liked."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      }
    ],
    "related": [
      "fluent_community/comment/react_removed",
      "fluent_community/feed/react_added"
    ]
  },
  "fluent_community/comment/react_removed": {
    "summary": "Fires when a member withdraws a like from a comment.",
    "details": "Only fires when a row was actually deleted, so a stray un-like is silent. The reaction is gone by then, and unlike the add side no reaction model is passed, so the acting user is not available from the arguments.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment, with the decremented count already saved."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      }
    ],
    "related": [
      "fluent_community/comment/react_added"
    ]
  },
  "fluent_community/comment/update_comment_data": {
    "summary": "Filters the attributes an edited comment is about to be saved with.",
    "details": "The update-side twin of `fluent_community/comment/comment_data`, with two extra arguments. What you return is filled onto the model and determines the dirty check, so returning the attributes unchanged makes the edit a silent no-op that fires neither `fluent_community/comment_updated` nor its type-scoped twin. Pro uses it to re-flag an edited comment.",
    "params": [
      {
        "name": "commentData",
        "type": "array",
        "desc": "The attributes for the edit."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload; carries `is_admin`."
      },
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment as currently stored."
      }
    ],
    "returns": "`array` — the attribute map.",
    "related": [
      "fluent_community/comment/comment_data"
    ]
  },
  "fluent_community/comment/updated": {
    "summary": "Fires after a comment is changed through the moderator patch endpoint.",
    "details": "A different event from `fluent_community/comment_updated`, which covers author edits to the body. This one only ever runs for the pin toggle: the patch endpoint accepts `is_sticky` alone, requires moderator or admin rights, and refuses to pin a reply. Pinning a comment un-pins every other comment on the post first, and those bulk un-pins do not fire the hook.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment after saving."
      },
      {
        "name": "dirty",
        "type": "array",
        "desc": "The changed attributes as returned by `getDirty()`; in practice just `is_sticky`."
      }
    ],
    "related": [
      "fluent_community/comment_updated",
      "fluent_community/comment/patch_comment_response"
    ]
  },
  "fluent_community/comment_added": {
    "summary": "Runs after a published comment or reply has been stored and its media attached.",
    "details": "Comments held for moderation never reach it — those fire `fluent_community/comment/new_comment_{status}` instead. A type-scoped twin, `fluent_community/comment_added_{feed->type}`, fires immediately before it, so listening to both double-handles the same comment. Note the third argument is only supplied by `CommentsController::store()`; the Pro moderation-approval path passes just two.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The stored comment, with relations loaded."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      },
      {
        "name": "mentionedUsers",
        "type": "array",
        "desc": "Mentioned user models parsed out of the comment body. Optional; absent on the moderation-approval path."
      }
    ],
    "related": [
      "fluent_community/comment_updated",
      "fluent_community/comment_deleted"
    ]
  },
  "fluent_community/comment_added_async": {
    "summary": "Action Scheduler task that sends the comment notification emails for one comment.",
    "details": "Queued for immediate execution from `EmailNotificationHandler::handleNewCommentEvent()` whenever the comment mentions somebody, the post author wants comment mail, or a thread participant wants reply mail. The handler re-queues this same action when it approaches its run-time budget, passing the last notified user ID as the cursor, so it fires repeatedly for a busy thread.",
    "params": [
      {
        "name": "commentId",
        "type": "int",
        "desc": "ID of the comment to notify about."
      },
      {
        "name": "lastUserId",
        "type": "int",
        "desc": "Highest recipient ID already mailed; 0 on the first batch."
      }
    ],
    "related": [
      "fluent_community/comment_added",
      "fluent_community/email_notify_new_posts"
    ]
  },
  "fluent_community/comment_added_{feed}": {
    "summary": "Post-type-scoped twin of `fluent_community/comment_added`, suffixed with the parent post's type.",
    "details": "The suffix is `$feed->type`, so the live names are `fluent_community/comment_added_text` for ordinary posts and `fluent_community/comment_added_document` for course lessons. It fires immediately before the generic `fluent_community/comment_added`, so listening to both double-handles the same comment. Pro fires it a second time from the moderation-approval path when a held comment is published.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The stored comment, with relations loaded."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post or lesson the comment belongs to."
      }
    ],
    "related": [
      "fluent_community/comment_added"
    ]
  },
  "fluent_community/comment_api_response": {
    "summary": "Filters the single-comment response.",
    "details": "Serves the endpoint the portal calls when deep-linking to a comment and when opening one for editing. With `context=edit` the payload has been reshaped first: `meta` is unset and any attached images are lifted onto a `media_images` property, or a non-uploader preview is put back under `meta.media_preview`. Access is verified against the parent post before the filter runs.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `comment` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `context`."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/comments_api_response"
    ]
  },
  "fluent_community/comment_deleted": {
    "summary": "Runs after a comment row has been deleted and the post's comment count recalculated.",
    "details": "The first argument is the comment ID, not a model — the row is already gone by the time the hook runs, so anything you need from the comment must be captured earlier via `fluent_community/before_comment_delete`. Attached media is announced beforehand through `fluent_community/comment/media_deleted`.",
    "params": [
      {
        "name": "commentId",
        "type": "int",
        "desc": "ID of the deleted comment."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belonged to."
      }
    ],
    "related": [
      "fluent_community/comment_added"
    ]
  },
  "fluent_community/comment_deleted_{feed}": {
    "summary": "Post-type-scoped twin of `fluent_community/comment_deleted`.",
    "details": "Suffixed with `$feed->type`, and fired immediately before the generic hook, so both run for every deletion. As with the generic hook the first argument is an ID, not a model — the row is already gone. The post's `comments_count` has been recounted and saved without bumping `updated_at`.",
    "params": [
      {
        "name": "commentId",
        "type": "int",
        "desc": "ID of the deleted comment."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belonged to."
      }
    ],
    "related": [
      "fluent_community/comment_deleted",
      "fluent_community/before_comment_delete"
    ]
  },
  "fluent_community/comment_notification/email_sections": {
    "page": "notifications",
    "summary": "Filters extra HTML injected into the \"new comment\" notification email.",
    "details": "Same marker mechanism as the post notifications, but the third argument is the comment rather than the post — reach the post through `$comment->post` if you need it. Applied once per recipient inside the batched send loop.",
    "params": [
      {
        "name": "sections",
        "type": "array",
        "desc": "`before_content` and `after_content`, both empty strings by default."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The recipient."
      },
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment being announced."
      }
    ],
    "returns": "`array` — only `before_content` and `after_content` are read.",
    "related": [
      "fluent_community/new_feed_notification/email_sections"
    ]
  },
  "fluent_community/comment_order_options": {
    "summary": "Filters the comment sort options a space administrator can choose from as that space's default.",
    "details": "Defaults to `oldest` (labelled \"Earliest\"), `latest`, `popular` and `most_replied`. It reaches the portal as `comment_order_by_options`, and the only consumer is the space settings form. The reader-facing sort dropdown is hard-coded in the Vue components and the sorting itself is done client-side, so adding a key here makes it selectable as a space default but nothing will know how to apply it. Removing keys is the safe direction. `$context` is `comment` at the only current call site.",
    "params": [
      {
        "name": "options",
        "type": "array",
        "desc": "Sort keys mapped to translated labels."
      },
      {
        "name": "context",
        "type": "string",
        "desc": "The list being sorted; `comment` today."
      }
    ],
    "returns": "`array` — an associative map of sort key to label, preserving order.",
    "related": [
      "fluent_community/portal_vars"
    ]
  },
  "fluent_community/comment_report_added_async": {
    "summary": "Action Scheduler task that emails moderators about a reported or auto-flagged comment.",
    "details": "The comment-side twin of `fluent_community/post_report_added_async`, with the same batching and resume behaviour and the same recipient rules. The email body is the rendered comment with a \"Review the comment\" button, and the link carries a `comment_id` query parameter so the portal scrolls to it. Pro-only.",
    "params": [
      {
        "name": "reportId",
        "type": "int",
        "desc": "ID of the moderation record."
      },
      {
        "name": "lastUserId",
        "type": "int",
        "desc": "Resume point: only users with a higher ID are mailed on this run. `0` first time."
      }
    ],
    "related": [
      "fluent_community/post_report_added_async"
    ]
  },
  "fluent_community/comment_updated": {
    "summary": "Runs after an edited comment is saved, provided the save changed something.",
    "details": "Guarded by a dirty check, so a no-op edit is silent. Media attached to the comment is reconciled first, and any media dropped by the edit is announced separately through `fluent_community/comment/media_deleted`. The type-scoped `fluent_community/comment_updated_{feed->type}` fires directly after this one.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment after saving, with relations loaded."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      }
    ],
    "related": [
      "fluent_community/comment_added"
    ]
  },
  "fluent_community/comment_updated_{feed}": {
    "summary": "Post-type-scoped twin of `fluent_community/comment_updated`.",
    "details": "Suffixed with `$feed->type` and fired immediately after the generic hook, under the same dirty-check guard — an edit that changed nothing fires neither. Media dropped by the edit has already been announced through `fluent_community/comment/media_deleted`.",
    "params": [
      {
        "name": "comment",
        "type": "\\FluentCommunity\\App\\Models\\Comment",
        "desc": "The comment after saving, with relations loaded."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to."
      }
    ],
    "related": [
      "fluent_community/comment_updated"
    ]
  },
  "fluent_community/comments_api_response": {
    "summary": "Filters the comment listing response for one post.",
    "details": "The endpoint returns every comment on the post in one go — there is no paging, and sorting is done client side — so on a busy thread the payload can be large. Replies are flat in the list, distinguished by `parent_id`. When `fluent_community/can_view_comments_{type}` denies access the endpoint returns an empty list early and this filter never runs.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `comments` collection."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/comments_query_response",
      "fluent_community/can_view_comments_{feed}"
    ]
  },
  "fluent_community/comments_query_response": {
    "summary": "Filters the comment collection for a post before the viewer's likes are marked on it.",
    "details": "Receives an Eloquent collection of `Comment` models, not an array and not a response payload — return a collection or the `each()` call that follows will fail. It runs after moderation-status scoping and after inactive-profile comments have been excluded, which makes it the right place to drop or reorder comments; `fluent_community/comments_api_response` is the place to reshape the response.",
    "params": [
      {
        "name": "comments",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Collection",
        "desc": "The post's comments, with `xprofile` eager-loaded."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The comment collection.",
    "related": [
      "fluent_community/comments_api_response"
    ]
  },
  "fluent_community/content_flagged": {
    "summary": "Fires when accumulated reports push a post or comment over the configured flag threshold and it is unpublished.",
    "details": "Only reached when content moderation is enabled, a positive `flag_after_threshold` is configured, the content is still `published`, and the report count has met the threshold. By the time callbacks run the content status is already `pending`, the report is marked `flagged`, and a flagged comment has been decremented from its post's comment count. This is Pro-only.",
    "params": [
      {
        "name": "report",
        "type": "\\FluentCommunityPro\\App\\Models\\Moderation",
        "desc": "The moderation record that crossed the threshold."
      },
      {
        "name": "content",
        "type": "mixed",
        "desc": "The flagged `Feed` or `Comment` model, already saved as `pending`."
      }
    ],
    "related": [
      "fluent_community/content_moderation/created"
    ]
  },
  "fluent_community/content_moderation/created": {
    "summary": "Fires whenever a moderation report is created against a post or comment.",
    "details": "Covers both member-submitted reports and automatic profanity or first-post flags, which create a report with `meta.flagged_by = auto` and no `user_id` — check that before treating a report as human-submitted. Only the member-report endpoint passes the third argument; the auto-flag paths pass two. Several Pro handlers are attached, including the threshold check that may go on to fire `fluent_community/content_flagged`.",
    "params": [
      {
        "name": "report",
        "type": "\\FluentCommunityPro\\App\\Models\\Moderation",
        "desc": "The stored moderation record."
      },
      {
        "name": "content",
        "type": "mixed",
        "desc": "The reported `Feed` or `Comment` model."
      },
      {
        "name": "contentType",
        "type": "string",
        "desc": "`post` or `comment`. Optional — supplied only by the member-report endpoint."
      }
    ],
    "related": [
      "fluent_community/content_flagged",
      "fluent_community/report_reasons"
    ]
  },
  "fluent_community/convert_image_to_webp": {
    "summary": "Filters whether an uploaded image is converted to WebP.",
    "details": "Defaults to true unless the request asked for `disable_convert=yes`. Conversion only actually happens when the image is also being resized and exceeds the width limit — the flag is read inside that branch — so returning `true` does not convert a small image on its own. Two call sites carry this filter, but `UploadHelper::processUpload()` has no callers anywhere in either plugin, so in practice only the media upload endpoint reaches it.",
    "params": [
      {
        "name": "willWebPConvert",
        "type": "bool",
        "desc": "Whether conversion is permitted. True unless the request disabled it."
      },
      {
        "name": "file",
        "type": "array",
        "desc": "The uploaded file descriptor: `file`, `url`, `type`."
      }
    ],
    "returns": "`bool` — `false` keeps the original format.",
    "related": [
      "fluent_community/media_upload_resize",
      "fluent_community/media_upload_max_width_{context}"
    ]
  },
  "fluent_community/course": {
    "summary": "Passes each course by reference while a course list is being prepared for the front end.",
    "details": "Fired with `do_action_ref_array()`, so a callback declared as `function (&$course)` can attach or change properties in place — unusual for an action, and the reason it exists. It runs once per course in the course directory and in the profile \"Courses\" tab, after enrolment state, progress, cover photo fallback and the section, lesson and student counts have been set. Single-course responses take a different path and fire `fluent_community/course/processed` instead.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course, passed by reference."
      }
    ],
    "related": [
      "fluent_community/course/processed",
      "fluent_community/courses_api_response"
    ]
  },
  "fluent_community/course/access_message_html": {
    "summary": "Filters the HTML shown in place of a lesson the current user cannot view.",
    "details": "The default markup is a `fcom_locker` block whose wording already varies by lock reason — sequential progression, a future unlock date, or plain lack of enrolment. `$config` carries `is_locked`, `lock_type` and `unlock_date`, which is the only way to tell those cases apart once the string is built. The return value is rendered as HTML, so escape any user-supplied text yourself.",
    "params": [
      {
        "name": "accessMessage",
        "type": "string",
        "desc": "The default locked-lesson HTML."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course being viewed."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The locked lesson."
      },
      {
        "name": "config",
        "type": "array",
        "desc": "Lock context: `is_locked`, `lock_type` (for example `sequential`) and `unlock_date`."
      }
    ],
    "returns": "`string` — HTML to render in place of the lesson body.",
    "related": [
      "fluent_community/course/can_view_lesson"
    ]
  },
  "fluent_community/course/before_create": {
    "summary": "Fires with the assembled course attributes just before a course row is written.",
    "details": "Two call sites behave differently. On the create endpoint the array is exactly what `Course::create()` is about to receive. On the duplicate endpoint the same hook fires with the source course's attributes plus the new title, slug, `draft` status and owner — but the copy is then made with `replicate()`, so the array you see is informational only. Since this is an action, not a filter, the attributes cannot be changed from here either way.",
    "params": [
      {
        "name": "courseData",
        "type": "array",
        "desc": "Course attributes: `title`, `slug`, `privacy`, `description`, `status`, `settings`, `serial`."
      }
    ],
    "related": [
      "fluent_community/course/created"
    ]
  },
  "fluent_community/course/before_delete": {
    "summary": "Fires before a course and everything attached to it is removed.",
    "details": "The last point at which the course's sections, lessons, comments, reactions and enrolments are all still readable. What follows is a cascade: reactions and comments are deleted, then each section fires `fluent_community/section/before_deleted` and each of its lessons fires `fluent_community/lesson/before_deleted`, then enrolments go, then the course row.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course about to be deleted."
      }
    ],
    "related": [
      "fluent_community/course/deleted",
      "fluent_community/section/before_deleted"
    ]
  },
  "fluent_community/course/before_progress_reset": {
    "summary": "Fires before a student's progress in a course is wiped.",
    "details": "The completion and course-completed rows still exist here, so this is the point at which a record of what the student had finished can be captured. It fires before the transaction opens and runs even if the reset then fails, in which case `fluent_community/course/progress_reset` never follows.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course being reset."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      }
    ],
    "related": [
      "fluent_community/course/progress_reset"
    ]
  },
  "fluent_community/course/can_view_lesson": {
    "summary": "Filters whether a user may view a particular lesson.",
    "details": "Applied inside `CourseHelper::resolveLessonAccess()` before the companion `fluent_community/course/lesson_access_info` filter, which can still override the decision and attach a lock reason — so returning `true` here is a strong hint, not the final word. Pro attaches a callback that grants access to any lesson marked `is_free_preview`. Note that only three of the four arguments are used by that callback; add the ones you need with the right `$accepted_args` count.",
    "params": [
      {
        "name": "canView",
        "type": "bool",
        "desc": "The access decision computed from enrolment, drip schedule and sequential progress."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson being requested."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course the lesson belongs to."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The user requesting the lesson."
      }
    ],
    "returns": "`bool` — `true` to grant access.",
    "related": [
      "fluent_community/course/access_message_html"
    ]
  },
  "fluent_community/course/completed": {
    "summary": "Fires when a student's progress in a course reaches 100 per cent.",
    "details": "Evaluated after each lesson completion and backed by a `course_completed` activity row, so it normally fires once per student per course. A second call site is meant to re-fire it when an already-completed course is finished again, but it gates on the lesson's `scheduled_at` being later than the activity timestamp — and nothing in the lesson editor ever writes that column — so in practice it does not trigger. It is registered as a FluentCRM automation trigger.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The completed course."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      }
    ],
    "related": [
      "fluent_community/course/lesson_completed",
      "fluent_community/course/progress_reset"
    ]
  },
  "fluent_community/course/created": {
    "summary": "Fires after a new course row exists, its images claimed and its categories synced.",
    "details": "Covers both a fresh course and a duplicated one; on the duplicate path every section, lesson and attached document has already been copied by the time it runs. A course created with `status` of `published` straight away does not additionally fire `fluent_community/course/published` — that hook only observes transitions made through the update endpoint.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The new course."
      }
    ],
    "related": [
      "fluent_community/course/before_create",
      "fluent_community/course/published"
    ]
  },
  "fluent_community/course/deleted": {
    "summary": "Fires after a course row and its associated records have been deleted.",
    "details": "Only the integer ID survives — the model is gone, so capture anything you need from `fluent_community/course/before_delete`. Enrolment rows are removed directly with a bulk delete on this path, so `fluent_community/course/student_left` does not fire for the students who lose access.",
    "params": [
      {
        "name": "courseId",
        "type": "int",
        "desc": "ID of the deleted course."
      }
    ],
    "related": [
      "fluent_community/course/before_delete"
    ]
  },
  "fluent_community/course/enrolled": {
    "summary": "Fires once a user holds an active enrolment row in a course.",
    "details": "The course equivalent of `fluent_community/space/joined`; courses never fire the space hook. `Helper::addToSpace()` re-resolves the model to a `Course` before firing so that course relations are available, and only that path passes the fourth argument. Re-activating a lapsed enrolment fires the hook again with no `$created`.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course that was joined."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      },
      {
        "name": "by",
        "type": "string",
        "desc": "How the enrolment came about: `self`, `by_admin`, `automation`, or an integration key."
      },
      {
        "name": "created",
        "type": "\\FluentCommunity\\App\\Models\\SpaceUserPivot",
        "desc": "The newly created enrolment row. Optional — omitted when an existing row was reactivated."
      }
    ],
    "related": [
      "fluent_community/space/joined",
      "fluent_community/course/topic_completed"
    ]
  },
  "fluent_community/course/exportable_student_row": {
    "summary": "Filters one row of the course student export.",
    "details": "Runs once per student. Keys are human-readable column headings — Name, Email, Username, Progress, Enrollment Date, Last Activity — so adding a key adds a column. The export is capped at 5000 students and progress is pre-computed in bulk, so a callback should avoid re-querying it per row.",
    "params": [
      {
        "name": "row",
        "type": "array",
        "desc": "Column heading => value map for one student."
      },
      {
        "name": "student",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The student profile, with user and space_pivot loaded."
      },
      {
        "name": "progress",
        "type": "int",
        "desc": "Completion percentage for this course."
      },
      {
        "name": "courseId",
        "type": "int",
        "desc": "Course the export was requested for."
      }
    ],
    "returns": "The row map to write to the export.",
    "related": [
      "fluent_community/admin_course_exportable_students_api_response"
    ]
  },
  "fluent_community/course/lesson_access_info": {
    "summary": "Filters the final access decision for a lesson, together with the reason it is locked.",
    "details": "Runs immediately after `fluent_community/course/can_view_lesson` and has the last word: whatever that filter decided arrives here as `can_view`, and a callback may overturn it. Set `lock_type` to explain why — the value reaches the front end and drives the locked-lesson wording — but note that `lock_type` is forcibly cleared whenever `can_view` ends up truthy. Pro's sequential-progression lock is implemented here. `$ctx` tells you how the initial decision was reached without re-querying.",
    "params": [
      {
        "name": "access",
        "type": "array",
        "desc": "`can_view` (bool) and `lock_type` (string, empty by default)."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson being resolved."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course it belongs to."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The viewer, or `null` for a guest."
      },
      {
        "name": "ctx",
        "type": "array",
        "desc": "How the base decision was reached: `enrollment`, `is_admin`, `has_section_access`, `has_public_access`."
      }
    ],
    "returns": "`array` — must keep the `can_view` and `lock_type` keys; both are read straight off the result.",
    "related": [
      "fluent_community/course/can_view_lesson",
      "fluent_community/course/access_message_html"
    ]
  },
  "fluent_community/course/lesson_completed": {
    "summary": "Fires the first time a student completes a lesson.",
    "details": "Tied to the creation of the completion record, not to the act of marking complete: a lesson that was completed, marked incomplete and completed again reuses the existing row and takes an early return, so this hook fires once per student per lesson for the lifetime of that row. Only a progress reset, which deletes the rows, makes it fire again. It is registered as a FluentCRM automation trigger.",
    "params": [
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The completed lesson."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      }
    ],
    "related": [
      "fluent_community/course/topic_completed",
      "fluent_community/course/lesson_marked_incomplete"
    ]
  },
  "fluent_community/course/lesson_marked_incomplete": {
    "summary": "Fires when a student un-completes a lesson they had previously completed.",
    "details": "The completion row is kept and its `type` flipped to `incomplete` rather than deleted, which is why completing the lesson again does not fire `fluent_community/course/lesson_completed`. Core listens to clear the video-watched record for gated lessons, so the student has to watch the video again before they can re-complete.",
    "params": [
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson marked incomplete."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      }
    ],
    "related": [
      "fluent_community/course/lesson_completed",
      "fluent_community/is_allowed_to_complete_lesson"
    ]
  },
  "fluent_community/course/meta_fields": {
    "summary": "Collects extra settings sections to render on a course's settings screen.",
    "details": "The course-side twin of `fluent_community/space/meta_fields`, with the same section shape and the same paired save action, `fluent_community/course/update_meta_settings_{provider}`. It differs in passing a third argument, the raw request payload; `FluentExtendApi::addMetaBox()` registers its callback with only two, so declare the argument count you actually need.",
    "params": [
      {
        "name": "metaFields",
        "type": "array",
        "desc": "Settings sections keyed by provider slug. Empty by default."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course whose settings are being rendered."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload. Optional in practice — omit it unless you need it."
      }
    ],
    "returns": "`array` — the sections map.",
    "related": [
      "fluent_community/space/meta_fields"
    ]
  },
  "fluent_community/course/processed": {
    "summary": "Filters a single course after it has been prepared for a detail response.",
    "details": "Applied in `CourseController::processCourse()`, which serves the course page, the course-by-slug endpoint and each entry of the all-courses listing. It runs before the rendered course details and the section and lesson lists are attached, so those are not yet on the model. Pro uses it to add the welcome banner, choosing the enrolled or not-enrolled variant from the context array.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course, with `is_course_admin`, `can_self_enroll` and any lockscreen config already set."
      },
      {
        "name": "context",
        "type": "array",
        "desc": "Currently just `is_enrolled`."
      }
    ],
    "returns": "`\\FluentCommunity\\Modules\\Course\\Model\\Course` — the model. The caller keeps using it as an object, so do not return an array.",
    "related": [
      "fluent_community/course",
      "fluent_community/course_api_response"
    ]
  },
  "fluent_community/course/progress_reset": {
    "summary": "Fires after a student's lesson completions and course-completion record have been deleted.",
    "details": "Only reached when the delete transaction succeeded. Both `completed` and `incomplete` completion rows are removed, so the student is genuinely back to nothing — which also means `fluent_community/course/lesson_completed` will fire again for lessons they had already finished. Core listens to clear video-watched records for the whole course.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course that was reset."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      }
    ],
    "related": [
      "fluent_community/course/before_progress_reset",
      "fluent_community/course/lesson_completed"
    ]
  },
  "fluent_community/course/published": {
    "summary": "Fires when a course changes to published status through the admin editor.",
    "details": "Nested inside the dirty check, and fires immediately after `fluent_community/course/updated` for the same save. It observes a transition, so it only fires when the previous status was something other than `published`; re-saving an already published course is silent. A course created directly with a published status never reaches it.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The newly published course."
      }
    ],
    "related": [
      "fluent_community/course/updated"
    ]
  },
  "fluent_community/course/scheduled/init_notification": {
    "summary": "Fires when drip email notifications are armed for a section of a scheduled-drip course.",
    "details": "Only reached for courses whose course_type is `scheduled` and for sections whose meta has email_enabled set to yes. Paired with the unschedule action — a settings change fires unschedule then init, so callbacks must be idempotent.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section whose notification is being armed."
      }
    ],
    "related": [
      "fluent_community/course/scheduled/unschedule_notification"
    ]
  },
  "fluent_community/course/scheduled/send_notification_async": {
    "summary": "Action Scheduler task that emails a scheduled course's section-release notification.",
    "details": "Queued in the `fluent-community` group for the section's release moment, converted to UTC, with the section ID as its only argument — one task per section, sent to every enrolled student. The handler walks recipients in batches and re-queues this same action when it nears its run-time budget, tracking its position in the section's `last_send_user_id` meta, so it can run many times for one release. Pro-only.",
    "params": [
      {
        "name": "sectionId",
        "type": "int",
        "desc": "ID of the section being released."
      }
    ],
    "related": [
      "fluent_community/course/structured/send_notification_async"
    ]
  },
  "fluent_community/course/scheduled/unschedule_notification": {
    "summary": "Fires when drip email notifications are cancelled for a section of a scheduled-drip course.",
    "details": "Fires on an explicit cancel, on a settings reset (immediately before the matching init), and once per section when a course is switched away from the scheduled type — in that last case the handler has already flipped each section's email_enabled to no.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section whose notification is being cancelled."
      }
    ],
    "related": [
      "fluent_community/course/scheduled/init_notification"
    ]
  },
  "fluent_community/course/structured/init_notification": {
    "summary": "Fires when drip email notifications are armed for a section of a structured course.",
    "details": "The structured counterpart. Structured courses schedule per enrolled student rather than per section date, so the per-student Action Scheduler jobs are keyed on both section id and user id.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section whose notification is being armed."
      }
    ],
    "related": [
      "fluent_community/course/structured/unschedule_notification"
    ]
  },
  "fluent_community/course/structured/send_notification_async": {
    "summary": "Action Scheduler task that emails one student the release notification for a structured section.",
    "details": "Structured courses drip relative to each student's enrolment date, so unlike the scheduled variant this is queued per student — the arguments are the section ID and the user ID, and the pair is what `as_unschedule_all_actions()` matches on when an enrolment ends or a notification is switched off. Tasks are queued when a student enrols and when a section's notification is enabled. Pro-only.",
    "params": [
      {
        "name": "sectionId",
        "type": "int",
        "desc": "ID of the section being released."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the enrolled student."
      }
    ],
    "related": [
      "fluent_community/course/scheduled/send_notification_async",
      "fluent_community/course/enrolled"
    ]
  },
  "fluent_community/course/structured/unschedule_notification": {
    "summary": "Fires when drip email notifications are cancelled for a section of a structured course.",
    "details": "Fires on an explicit cancel, on a settings reset immediately before the matching init, and once per section when a course is switched away from the structured type.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section whose notification is being cancelled."
      }
    ],
    "related": [
      "fluent_community/course/structured/init_notification"
    ]
  },
  "fluent_community/course/student_left": {
    "summary": "Fires after a student's enrolment row is removed from a course.",
    "details": "The course-side counterpart of `fluent_community/space/user_left`; courses never fire the space hook. Deleting the course itself does not fire it, because enrolments are then removed with a bulk query. Pro listens to unschedule drip emails and to sync the CRM, and it is registered as a FluentCRM automation trigger.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course the student left."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the departing student."
      },
      {
        "name": "by",
        "type": "string",
        "desc": "What triggered the removal: `self`, `by_admin`, or `automation`."
      }
    ],
    "related": [
      "fluent_community/course/enrolled",
      "fluent_community/space/user_left"
    ]
  },
  "fluent_community/course/topic_completed": {
    "summary": "Fires when completing a lesson brings every published lesson in its section to completed for that student.",
    "details": "Evaluated inside the lesson-completion routine, immediately after `fluent_community/course/lesson_completed`, and only counts lessons with status `published` — draft lessons in the section do not hold completion back. Marking a lesson incomplete and completing it again will fire this a second time; it is not a one-shot event per student.",
    "params": [
      {
        "name": "topic",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section (module) that is now fully complete."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson whose completion closed out the section."
      }
    ],
    "related": [
      "fluent_community/course/enrolled"
    ]
  },
  "fluent_community/course/update_meta_settings_{metaProvider}": {
    "summary": "Dynamic action that hands a provider its slice of the course settings form back for saving.",
    "details": "The placeholder is the provider slug used when the section was contributed through `fluent_community/course/meta_fields`, so registration and saving must agree on the key. It fires once per provider present in the request's `meta_settings` map, after the course itself has been saved, and the values arrive exactly as the form submitted them — sanitise before storing. `FluentExtendApi::addMetaBox()` wires both halves up for you.",
    "params": [
      {
        "name": "metaData",
        "type": "array",
        "desc": "The submitted values for this provider, unsanitised."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course being saved."
      }
    ],
    "related": [
      "fluent_community/course/meta_fields",
      "fluent_community/space/update_meta_settings_{metaProvider}"
    ]
  },
  "fluent_community/course/updated": {
    "summary": "Fires after a course is saved from the admin editor with at least one changed column.",
    "details": "Guarded by a dirty check, so a no-op save is silent, and settings-only changes count because `settings` is a single column. The third argument is a `clone` of the model taken before the new values were filled, which is the only way to see what a value used to be — Pro compares `settings.course_type` across the two to unschedule drip notifications when the course type changes. Category syncing and the meta-settings actions run after this hook, not before.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course after saving."
      },
      {
        "name": "dirtyFields",
        "type": "array",
        "desc": "Changed attributes keyed by column, from `getDirty()`."
      },
      {
        "name": "prevCourse",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "A clone of the course as it was before the update."
      }
    ],
    "related": [
      "fluent_community/course/published",
      "fluent_community/course/created"
    ]
  },
  "fluent_community/course/welcome_banner_updated": {
    "summary": "Fires after course welcome banner settings have been saved.",
    "details": "Runs once the settings are persisted, so it is the right place to bust a cache. The settings passed are the post-filter, post-sanitisation values.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      },
      {
        "name": "settings",
        "type": "array",
        "desc": "The saved banner settings."
      }
    ],
    "related": [
      "fluent_community/update_course_welcome_banner_settings"
    ]
  },
  "fluent_community/course/{courseType}/unschedule_notification": {
    "summary": "Dynamic action asking the drip-email scheduler to drop any pending notification for a section.",
    "details": "The placeholder is the course type — `self_paced`, `scheduled` or `structured` — resolved by `Course::getCourseType()`. Only the `scheduled` and `structured` variants have listeners, so on a self-paced course the action fires into the void. Pro fires it from three places: when a section is about to be deleted, when a section's notification is switched off, and as the first half of the unschedule-then-reschedule pair used when a release date changes. Everything here is Pro-only.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course the section belongs to."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section whose notification should be cancelled."
      }
    ],
    "related": [
      "fluent_community/course/{prevType}/unschedule_notification",
      "fluent_community/course/scheduled/send_notification_async"
    ]
  },
  "fluent_community/course/{prevType}/unschedule_notification": {
    "summary": "The same unschedule action, fired against a course's previous type after the type is changed.",
    "details": "When a course switches between self-paced, scheduled and structured, the pending notifications belong to the old scheme, so Pro walks every section with notifications enabled, disables them, and fires the unschedule action with the *previous* type in the placeholder rather than the current one. Same signature and same listeners as `fluent_community/course/{courseType}/unschedule_notification` — a callback should handle both. Pro-only.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course whose type just changed."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "A section that had notifications enabled; already saved with `email_enabled` set to `no`."
      }
    ],
    "related": [
      "fluent_community/course/{courseType}/unschedule_notification",
      "fluent_community/course/updated"
    ]
  },
  "fluent_community/course_api_response": {
    "summary": "Filters the response for a course fetched by slug — the course landing page.",
    "details": "The by-slug endpoint does more than the by-ID one: unless the course hides the instructor view it also loads the creator, their total course count, optionally their total student count, and their rendered bio. Everything else is the shared `processCourse()` payload, so `fluent_community/course/processed` has already run.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The processed course payload: the course, its sections and lessons, and progress state."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/get_course_api_response",
      "fluent_community/course/processed"
    ]
  },
  "fluent_community/course_info": {
    "summary": "Filters the course model returned to the admin course editor.",
    "details": "Serves the admin single-course endpoint only, and the model has admin-only extras attached by then: `students_count`, `course_type` lifted out of settings, the lockscreen, `category_ids`, and — when there are students — the completed count and overall progress average. Pro's quiz module uses it to add the quiz route to the editor navigation.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course, with admin statistics attached."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`\\FluentCommunity\\Modules\\Course\\Model\\Course` — the model; it is returned to the client under a `course` key.",
    "related": [
      "fluent_community/admin_courses_api_response"
    ]
  },
  "fluent_community/course_lesson_api_response": {
    "summary": "Filters the response for a single lesson opened by slug.",
    "details": "The lesson has already been resolved against the drip schedule, the enrolment and the access filters, and formatted accordingly — its body is only parsed when the viewer may see it, and `is_locked`, `lock_type` and `unlock_date` describe the outcome. To change access itself use `fluent_community/course/lesson_access_info`, not this filter, which runs far too late.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `lesson` key holding the formatted lesson."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/course/lesson_access_info",
      "fluent_community/lesson/get_public_meta"
    ]
  },
  "fluent_community/course_lesson_fullscreen_default": {
    "summary": "Filters whether the lesson view opens in fullscreen mode by default.",
    "details": "Surfaces as `portal_vars.course_lesson_fullscreen` and is used only as the fallback for the viewer's stored `lesson_fs` preference — anyone who has already toggled fullscreen keeps their own setting, so this affects first-time viewers. Return the string `'yes'`; the comparison is against that literal.",
    "params": [
      {
        "name": "fullscreen",
        "type": "string",
        "desc": "`yes` to default to fullscreen, `no` otherwise. `no` by default."
      }
    ],
    "returns": "`string` — `'yes'` or `'no'`.",
    "related": [
      "fluent_community/course_section_collapse_default"
    ]
  },
  "fluent_community/course_section_collapse_default": {
    "summary": "Filters whether course sections start collapsed in the course view.",
    "details": "Surfaces as `portal_vars.course_sections_collapsed`. The course view compares it loosely against `'yes'`, so return the string rather than a boolean. It sets the initial state only — once a viewer expands or collapses a section, their interaction wins for the rest of the visit.",
    "params": [
      {
        "name": "collapsed",
        "type": "string",
        "desc": "`yes` to start collapsed, `no` to start expanded. `no` by default."
      }
    ],
    "returns": "`string` — `'yes'` or `'no'`.",
    "related": [
      "fluent_community/course_lesson_fullscreen_default"
    ]
  },
  "fluent_community/course_smart_codes": {
    "summary": "Filters the smart codes available in course drip notification emails.",
    "details": "A map of placeholder token to human label, used to populate the editor's insert menu. Registering a token here only advertises it — the replacement itself has to be wired separately, so an unresolved token will render literally in the email.",
    "params": [
      {
        "name": "smartCodes",
        "type": "array",
        "desc": "Map of \"{{token}}\" => label."
      }
    ],
    "returns": "The smart code map.",
    "related": [
      "fluent_community/default_course_email_notification"
    ]
  },
  "fluent_community/course_view_json_ld": {
    "summary": "Filters the JSON-LD block emitted on a course landing page.",
    "details": "Starts empty, so no structured data is printed unless something fills it — Pro's sitemap module supplies a `Course` graph. It is only reached on the `course_view` route, only in headless rendering, and only when the space exists and is not `secret`. The result is encoded with `JSON_HEX_TAG` and friends, so markup in the values cannot break out of the script tag.",
    "params": [
      {
        "name": "jsonLd",
        "type": "array",
        "desc": "The structured-data graph. Empty by default."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The course, loaded as a base space."
      },
      {
        "name": "data",
        "type": "array",
        "desc": "The render payload so far, including the resolved title, description and featured image."
      }
    ],
    "returns": "`array` — JSON-encoded into a `application/ld+json` script tag. An empty array prints nothing.",
    "related": [
      "fluent_community/feed_view_json_ld",
      "fluent_community/portal_head_meta"
    ]
  },
  "fluent_community/course_welcome_banner": {
    "summary": "Filters the welcome banner shown on a course, per audience.",
    "details": "Returns null before the filter runs when the banner for that view is not enabled, so callbacks only see enabled banners. The raw markdown `description` has already been stripped in favour of the rendered version, and for the not_enrolled view the allowClose flag is stripped too — a guest-facing banner cannot be dismissed.",
    "params": [
      {
        "name": "banner",
        "type": "array",
        "desc": "The banner settings for this view."
      },
      {
        "name": "view",
        "type": "string",
        "desc": "Either \"enrolled\" or \"not_enrolled\"."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      }
    ],
    "returns": "The banner settings array, or null to render no banner.",
    "related": [
      "fluent_community/get_course_welcome_banner_settings",
      "fluent_community/update_course_welcome_banner_settings"
    ]
  },
  "fluent_community/courses_api_response": {
    "summary": "Filters the course directory response shown to members.",
    "details": "Each course in the list has already been through the by-reference `fluent_community/course` action, which is the better place to change individual courses. `course_categories` is only populated when the request asked for it with `with_categories`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`courses` (a paginated set) and `course_categories`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/course",
      "fluent_community/all_courses_api_response"
    ]
  },
  "fluent_community/create_invitation_link": {
    "summary": "Creates the invitation record behind a shareable space invite link.",
    "details": "Core supplies no default — the filter starts at `null` and the free plugin has no callback, so the \"create invite link\" endpoint returns \"Something went wrong\" unless Pro is active. Pro answers at priority 1 with `InvitationService::createLinkInvite()`. Returning a `WP_Error` surfaces its message to the moderator; anything falsy produces the generic error. The controller then reads `getAccessUrl()` off whatever you return.",
    "params": [
      {
        "name": "invitation",
        "type": "mixed",
        "desc": "The invitation to create; `null` on entry."
      },
      {
        "name": "invitationData",
        "type": "array",
        "desc": "Sanitised payload: `email` (empty), `user_id`, `space_id`, `title`, `limit`, `expire_date`."
      }
    ],
    "returns": "`\\FluentCommunity\\Modules\\Auth\\Classes\\Invitation` — a saved record exposing `getAccessUrl()`. Return a `WP_Error` to fail with a message, or a falsy value to fail generically.",
    "related": [
      "fluent_community/invitation_link_created"
    ]
  },
  "fluent_community/create_post_default_space": {
    "summary": "Filters the space pre-selected in the post composer.",
    "details": "Surfaces as `portal_vars.default_post_space` and takes a space slug. The composer applies it only on the all-feeds and profile-feeds routes, only when no space is already chosen, and only if the slug appears among the spaces the viewer may post in — so an invalid or inaccessible slug is quietly ignored rather than producing an error. The special slug `__self__post__` selects the viewer's own profile.",
    "params": [
      {
        "name": "spaceSlug",
        "type": "string",
        "desc": "Slug of the space to pre-select. Empty by default."
      }
    ],
    "returns": "`string` — a space slug, or an empty string for no pre-selection.",
    "related": [
      "fluent_community/portal_vars"
    ]
  },
  "fluent_community/created_user_role": {
    "summary": "Filters the WordPress role given to accounts FluentCommunity creates for existing contacts.",
    "details": "Narrower than the name suggests. It is only consulted by `ProfileHelper::createWpUser()`, which serves the FluentForms integration and Pro's bulk member and student imports. Portal signup goes through `Modules/Auth/AuthHelper` and does not reach this filter, so it is not the hook for changing the role new members register with. The value is passed straight to `wp_insert_user()` and is not validated against registered roles.",
    "params": [
      {
        "name": "role",
        "type": "string",
        "desc": "The role slug, `subscriber` by default."
      },
      {
        "name": "userData",
        "type": "array",
        "desc": "The supplied account data: `email`, `full_name`, `password`, `username`."
      }
    ],
    "returns": "`string` — a role slug. An unregistered slug leaves the user with no capabilities."
  },
  "fluent_community/crm_tagging_config_api_response": {
    "summary": "Filters the FluentCRM tagging configuration screen payload.",
    "details": "`crm_tags` is an empty array when FluentCRM is not installed, and `has_fluentcrm` tells the form which case it is in. `settings.tagging_maps` and `settings.linked_maps` are cast to empty objects when they have no entries, so that they serialise as `{}` rather than `[]` and the Vue form can assign into them — preserve that if you rebuild them.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`settings`, `spaceGroups`, `crm_tags`, `has_fluentcrm`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body."
  },
  "fluent_community/custom_order_by": {
    "summary": "Applies a custom sort to the post query for an order key the built-in sorts do not handle.",
    "details": "Reachable only for keys you have added through `fluent_community/post_order_options`: the scope rejects anything outside that list before the filter, and each of the seven shipped keys is handled by an earlier branch and returns early. A callback receives the query builder and must return a builder — return nothing and the caller ends up with `null` where a query is expected. Apply ordering only; adding `where` clauses here silently changes which posts a viewer sees.",
    "params": [
      {
        "name": "query",
        "type": "mixed",
        "desc": "The post query builder, with no ordering applied yet."
      },
      {
        "name": "type",
        "type": "string",
        "desc": "The requested sort key."
      }
    ],
    "returns": "The query builder. Returning anything else breaks the caller, which continues to chain on it.",
    "related": [
      "fluent_community/post_order_options"
    ]
  },
  "fluent_community/custom_profile_field_types": {
    "summary": "Filters the field types available when building custom profile fields.",
    "details": "A map of type slug to label backing the admin field-type picker. Registering a type here only offers it in the picker — storage, validation and rendering for a new type have to be supplied separately.",
    "params": [
      {
        "name": "fieldTypes",
        "type": "array",
        "desc": "Map of type slug => label (text, textarea, number, date, select, radio, url, multiselect)."
      }
    ],
    "returns": "The field type map."
  },
  "fluent_community/customization_settings": {
    "summary": "Filters the portal customisation settings — layout, header, sidebar and post-composer preferences.",
    "details": "Applied after the stored values are merged over the defaults, but before the free-edition lockdown: on a site without Pro, `show_powered_by`, `affiliate_id`, `rich_post_layout`, `member_list_layout` and `enable_sidebar_toggle` are overwritten immediately afterwards, so filtering those five has no effect there. The result is held in a static for the rest of the request, meaning the filter runs once and a callback registered late may never be reached.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "Customisation values such as `dark_mode`, `default_theme_mode`, `fixed_page_header`, `fixed_sidebar`, `default_feed_layout`, `max_media_per_post`, `post_title_pref`."
      }
    ],
    "returns": "`array` — the settings map; individual keys are read with `Arr::get()`, so a missing key reads as null.",
    "related": [
      "fluent_community/customization_settings_api_response",
      "fluent_community/has_color_scheme"
    ]
  },
  "fluent_community/customization_settings_api_response": {
    "summary": "Filters the customisation settings as returned to the admin settings screen.",
    "details": "A read-only view of what `fluent_community/customization_settings` produced, including the free-edition overrides — so what the administrator sees here is what the portal will actually use. Filtering it changes the settings form, not the behaviour; the save endpoint validates its own field list either way.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `settings` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/customization_settings"
    ]
  },
  "fluent_community/date_time_i18n": {
    "summary": "Filters the date, time and UI localisation strings handed to the portal front end.",
    "details": "Surfaces as `portal_vars.dateTime18n` and mixes two consumers. The `weekdays`, `months`, `weekdaysShort`, `monthsShort` and `weekdaysMin` entries are underscore-joined lists that `src/app.js` splits on `_` to build the Day.js locale — keep both the separator and the element order or dates will be mislabelled. The `relativeTime` and `relativeTimeMobile` maps are Day.js relative-time formats, and the `pagination`, `table`, `image`, `upload`, `select` and `datepicker` blocks are the Element Plus locale. All values are already translated through the `fluent-community` text domain.",
    "params": [
      {
        "name": "strings",
        "type": "array",
        "desc": "The localisation payload, keyed as described above."
      }
    ],
    "returns": "`array` — the payload, with the existing keys preserved. Missing keys are not backfilled.",
    "related": [
      "fluent_community/portal_vars"
    ]
  },
  "fluent_community/default_avatar": {
    "summary": "Filters the avatar URL used when a member has no usable profile image.",
    "details": "The default value differs by call site: when Gravatar is disabled it is the bundled `placeholder.png`, and when Gravatar is enabled it is a `ui-avatars.com` URL passed to `get_avatar_url()` as the `default` parameter. Returning a falsy value is safe — every caller falls back to the bundled placeholder. Be aware that `XProfile::getAvatarAttribute()` caches the resolved URL per user for a week, so changes will not be visible immediately for existing members.",
    "params": [
      {
        "name": "avatarUrl",
        "type": "string",
        "desc": "The default avatar URL for this context."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "The user whose avatar is being resolved."
      }
    ],
    "returns": "`string` — an absolute image URL. A falsy return falls back to the bundled placeholder image."
  },
  "fluent_community/default_course_email_notification": {
    "summary": "Filters the default subject and body used for course drip notification emails.",
    "details": "Supplies the starting template for a section that has no saved notification of its own; a section with its own saved copy is unaffected. The default text uses the smart codes from fluent_community/course_smart_codes.",
    "params": [
      {
        "name": "notification",
        "type": "array",
        "desc": "Default template with `subject` and `message` keys."
      }
    ],
    "returns": "The default notification array.",
    "related": [
      "fluent_community/course_smart_codes"
    ]
  },
  "fluent_community/default_profile_tab_route": {
    "summary": "Filters which tab a member profile opens on.",
    "details": "Surfaces as `portal_vars.default_profile_tab` and is matched against a fixed map of tab keys: `about`, `posts`, `spaces`, `comments` and `courses`. Anything outside that set is ignored and the profile opens on the default tab. The redirect happens client-side with `router.replace`, so the profile URL changes as the page settles.",
    "params": [
      {
        "name": "tab",
        "type": "string",
        "desc": "One of `about`, `posts`, `spaces`, `comments`, `courses`. Empty by default."
      }
    ],
    "returns": "`string` — a recognised tab key, or an empty string to keep the default tab.",
    "related": [
      "fluent_community/portal_vars"
    ]
  },
  "fluent_community/default_redirect_url": {
    "summary": "Filters the fallback destination written into the FluentAuth login form.",
    "details": "Narrow scope: it applies only when FluentAuth renders the login form and the request carries no `redirect_to`. The value is escaped into a hidden `fcom_redirect` field, which the login bridge later validates with `wp_validate_redirect()` against the portal base — so an off-site URL will be discarded downstream rather than honoured.",
    "params": [
      {
        "name": "redirectUrl",
        "type": "string",
        "desc": "The default destination, the portal base URL."
      }
    ],
    "returns": "`string` — a URL; it is validated against the portal base before use.",
    "related": [
      "fluent_community/auth/after_login_redirect_url"
    ]
  },
  "fluent_community/default_theme_mode": {
    "summary": "Filters the theme mode a visitor sees before making a choice of their own.",
    "details": "The stored setting is validated against `light`, `dark` and `system` before the filter runs, but the returned value is not re-validated — return something else and it is passed to the front end as-is, where the pre-paint script falls through to light. Precedence at runtime is host-theme cookie, then the viewer's own stored pick, then this value, so it only affects first-time visitors.",
    "params": [
      {
        "name": "mode",
        "type": "string",
        "desc": "`light`, `dark` or `system`. `light` by default."
      }
    ],
    "returns": "`string` — one of `light`, `dark`, `system`. Unrecognised values behave as `light`.",
    "related": [
      "fluent_community/has_color_scheme",
      "fluent_community/general_portal_vars"
    ]
  },
  "fluent_community/delete_remote_media_{this}": {
    "summary": "Asks the owning storage driver to delete a media file it holds, named after the driver.",
    "details": "The suffix is `$media->driver`, so the live name is `fluent_community/delete_remote_media_s3` for Pro's cloud storage. It is the else-branch of `Media::deleteFile()`: local files are unlinked directly and never reach a hook. Nothing verifies that a handler exists, so a media row on an unhandled driver has its database row removed while the remote object is left behind.",
    "params": [
      {
        "name": "media",
        "type": "\\FluentCommunity\\App\\Models\\Media",
        "desc": "The media row whose remote file should be removed."
      }
    ],
    "related": [
      "fluent_community/media_public_url_{this}",
      "fluent_community/handle_remove_bulk_media"
    ]
  },
  "fluent_community/digest_email_body": {
    "summary": "Filters the fully composed HTML body of a daily digest email.",
    "details": "The last hook before the digest is handed to the mailer. Logo, footer, the signed notification-preferences URL and the `fluent_community/digest_notification/email_sections` insertions are all already in place, so the placeholder comments those sections replace are gone by now. Per-recipient: it runs once for every member in the digest batch.",
    "params": [
      {
        "name": "emailBody",
        "type": "string",
        "desc": "The complete HTML body."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The recipient."
      }
    ],
    "returns": "`string` — the HTML body, sent as-is.",
    "related": [
      "fluent_community/digest_email_subject",
      "fluent_community/digest_notification/email_sections"
    ]
  },
  "fluent_community/digest_email_subject": {
    "summary": "Filters the subject line of a daily digest email.",
    "details": "The default greets the member by name, names the site, and appends a bell glyph with the unread count when there is one. That count is passed as the third argument, so you can rebuild the subject without recounting. Runs once per recipient.",
    "params": [
      {
        "name": "emailSubject",
        "type": "string",
        "desc": "The composed subject line."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The recipient."
      },
      {
        "name": "notificationCount",
        "type": "int",
        "desc": "Number of unread notifications included in the digest."
      }
    ],
    "returns": "`string` — the subject line.",
    "related": [
      "fluent_community/digest_email_body"
    ]
  },
  "fluent_community/digest_notification/email_sections": {
    "page": "notifications",
    "summary": "Filters extra HTML injected into a member's daily digest email.",
    "details": "The only one of the four section filters with a two-argument signature — there is no single post or comment to pass, since a digest aggregates many. It is applied while composing one recipient's digest, after the logo and footer have been added, and immediately before `fluent_community/digest_email_body` sees the finished HTML.",
    "params": [
      {
        "name": "sections",
        "type": "array",
        "desc": "`before_content` and `after_content`, both empty strings by default."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The digest recipient."
      }
    ],
    "returns": "`array` — only `before_content` and `after_content` are read.",
    "related": [
      "fluent_community/digest_email_body"
    ]
  },
  "fluent_community/disable_duplicate_comment_check": {
    "summary": "Filters whether the identical-comment guard is skipped for this submission.",
    "details": "By default a comment whose body exactly matches an earlier comment by the same user on the same post is rejected with \"No duplicate comment please!\". The check only runs when the comment has text, so image-only replies bypass it regardless. Return `true` to skip it — useful for short affirmations such as \"thanks\" in busy spaces.",
    "params": [
      {
        "name": "skipCheck",
        "type": "bool",
        "desc": "Whether to skip the duplicate check. `false` by default."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "The commenting user's ID."
      },
      {
        "name": "feedId",
        "type": "int",
        "desc": "The post being commented on."
      }
    ],
    "returns": "`bool` — `true` to allow the duplicate through.",
    "related": [
      "fluent_community/rate_limit/comments_per_minute"
    ]
  },
  "fluent_community/disable_duplicate_post_check": {
    "summary": "Filters whether the identical-post guard is skipped for this submission.",
    "details": "By default a post whose trimmed body exactly matches one the same author made in the same space within the last seven days is refused with \"No duplicate post please!\". The window is much wider than the comment equivalent, which has no time bound but is scoped to a single post. Note the third argument is the space ID and is `null` for profile posts.",
    "params": [
      {
        "name": "skipCheck",
        "type": "bool",
        "desc": "Whether to skip the duplicate check. `false` by default."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "The author's user ID."
      },
      {
        "name": "spaceId",
        "type": "int",
        "desc": "The target space ID, or `null` for a profile post."
      }
    ],
    "returns": "`bool` — a truthy return skips the check entirely and allows the duplicate.",
    "related": [
      "fluent_community/disable_duplicate_comment_check"
    ]
  },
  "fluent_community/disable_self_comment_react": {
    "summary": "Filters whether users are barred from reacting to their own comments.",
    "details": "The name reads as a switch that is on by default, but it is not: it defaults to `false`, meaning self-reacting is permitted. Return `true` to block it, at which point the API responds with an error. It applies to comment reactions only — reactions on the user's own posts are unaffected.",
    "params": [
      {
        "name": "disabled",
        "type": "bool",
        "desc": "Whether to reject the reaction. `false` by default, so self-reacting is allowed."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post the comment belongs to, so the rule can be scoped per space."
      }
    ],
    "returns": "`bool` — `true` to reject a reaction on the user's own comment."
  },
  "fluent_community/disable_self_post_react": {
    "summary": "Filters whether members are barred from reacting to their own posts.",
    "details": "Like its comment twin the name inverts the default: it is `false`, so self-reacting is allowed unless you return `true`. The filter is only consulted when the reacting user is the author, and it is applied before the like/bookmark split, so blocking it also blocks members bookmarking their own posts. Two identical call sites exist because the react endpoint is implemented twice.",
    "params": [
      {
        "name": "disabled",
        "type": "bool",
        "desc": "Whether to reject the reaction. `false` by default."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being reacted to, so the rule can be scoped per space."
      }
    ],
    "returns": "`bool` — `true` to reject the reaction with an error.",
    "related": [
      "fluent_community/disable_self_comment_react"
    ]
  },
  "fluent_community/document/local_file_access": {
    "summary": "Fires just before a locally stored document is streamed to the browser.",
    "details": "Runs after the permission check has passed, on the local-driver path only — documents on a cloud storage driver redirect to a signed URL and never reach this action. It fires for inline views as well as downloads, and headers have not been sent yet, so a callback can still short-circuit. Note this is a download of a document, not of a media-gallery item.",
    "params": [
      {
        "name": "document",
        "type": "\\FluentCommunity\\App\\Models\\Media",
        "desc": "The media row being served (object_source is space_document or lesson_document)."
      },
      {
        "name": "forceDownload",
        "type": "string",
        "desc": "The raw force_download request value; empty means serve PDFs and raster images inline."
      }
    ]
  },
  "fluent_community/editor_i18n_strings": {
    "summary": "Filters the translated strings handed to the lesson editor's JavaScript.",
    "details": "An English-keyed map: each key is the source string and each value its translation through the `fluent-community` text domain. The editor looks strings up by the English key, so renaming a key breaks the lookup and the untranslated fallback is used — change values, not keys.",
    "params": [
      {
        "name": "strings",
        "type": "array",
        "desc": "Source string mapped to translated string."
      }
    ],
    "returns": "`array` — the string map, with the original keys intact.",
    "related": [
      "fluent_community/block_editor_settings"
    ]
  },
  "fluent_community/email_notify_new_posts": {
    "summary": "Action Scheduler task that emails a space's subscribers about one newly published post.",
    "details": "Scheduled two minutes after a space post is published, and only when the space actually has mail subscribers or the post mentions somebody. The handler walks recipients 60 at a time and re-schedules this same action when it runs out of time budget, tracking its position in the post's `_last_email_user_id` custom meta — so it fires repeatedly for one post. The single argument is the post ID, although the handler also accepts a `Feed` model because it calls itself recursively.",
    "params": [
      {
        "name": "feedId",
        "type": "int",
        "desc": "ID of the post to notify about."
      }
    ],
    "related": [
      "fluent_community/space_feed/created",
      "fluent_community/email_notify_users_everyone_tag"
    ]
  },
  "fluent_community/email_notify_users_everyone_tag": {
    "page": "notifications",
    "summary": "Action Scheduler task that broadcasts a post to every member of its space.",
    "details": "Queued five minutes after a space admin or moderator publishes a post carrying the everyone tag. It is the wide-reach path and it deliberately ignores per-space post subscriptions — the only opt-out honoured is a member having turned off mention mail. The handler pages through recipients and re-queues itself with the cursor in the second argument, so it fires many times for one post, and it bails immediately if the corresponding `space_feed/created` notification row cannot be found.",
    "params": [
      {
        "name": "feedId",
        "type": "int",
        "desc": "ID of the post to broadcast."
      },
      {
        "name": "lastSendUserId",
        "type": "int",
        "desc": "Highest recipient ID already mailed; 0 on the first batch."
      }
    ],
    "related": [
      "fluent_community/feed/scheduling_everyone_tag",
      "fluent_community/email_notify_new_posts"
    ]
  },
  "fluent_community/email_settings_api_response": {
    "summary": "Filters the email notification settings screen payload.",
    "details": "When no email logo has been set, the general site logo is added as `global_logo` so the form can preview a fallback — the two are distinct keys and only `logo` is saved. Note that changing the digest day or time through the save endpoint unschedules every pending digest run, so a callback that rewrites those values has a side effect on Action Scheduler.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `email_settings` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/verified_email_senders"
    ]
  },
  "fluent_community/enqueue_global_assets": {
    "summary": "Fires while the portal's shared stylesheet and script bundle are being enqueued.",
    "details": "Core's own callback does the enqueueing, so this is the hook to attach dependent assets to rather than a notification that assets are already registered — register at a later priority if you need to depend on `fluent_community_global` or `portal_general`. `$useDefaultTheme` is false only for the Gutenberg block when the author opted out of the built-in theme, in which case `theme-default.css` is skipped.",
    "params": [
      {
        "name": "useDefaultTheme",
        "type": "bool",
        "desc": "Whether the bundled default theme stylesheet is being loaded alongside the global one."
      }
    ]
  },
  "fluent_community/error_page_custom_css": {
    "summary": "Filters CSS injected into the standalone error page.",
    "details": "The error page is the minimal document shown for a pending join request, a deactivated account or a denied role, and it loads none of the portal stylesheets — this filter is the only styling hook it has. The default is an empty string and the return value is passed through `wp_strip_all_tags()` before being printed inside a `<style>` block, so markup in it is dropped rather than escaped.",
    "params": [
      {
        "name": "css",
        "type": "string",
        "desc": "CSS to inline. Empty by default."
      }
    ],
    "returns": "`string` — CSS text. An empty or falsy value omits the `<style>` block entirely."
  },
  "fluent_community/features/analytics": {
    "summary": "Filters whether the community analytics feature is available.",
    "details": "The default is `['status' => 'no']` and Pro flips `status` to `yes`, so analytics is effectively a Pro feature that free installs can unlock by returning `yes`. Only the `status` key is read, and it is compared with a strict `=== 'yes'` — a boolean `true` leaves the feature switched off. The result surfaces to the front end as `features.has_analytics`.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "Analytics configuration; only `status` is consumed."
      }
    ],
    "returns": "`array` — must be an array with a `status` key; the comparison is strictly against the string `yes`.",
    "related": [
      "fluent_community/features_api_response"
    ]
  },
  "fluent_community/features_api_response": {
    "summary": "Filters the feature-flag screen payload.",
    "details": "The Giphy API key is replaced with the placeholder `FCOM_ENCRYPTED_DATA_KEY` before the filter runs, so the real key never reaches the client — do not put it back. `addOns` describes the modules that can be switched on, several of which need Pro. Turning a flag off here only changes the form; the modules themselves read `Utility::getFeaturesConfig()` at bootstrap.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`features` (flag map, with the Giphy key masked) and `addOns`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/features/analytics"
    ]
  },
  "fluent_community/feed/before_deleted": {
    "summary": "Runs immediately before a post row is deleted, while its relations are still readable.",
    "details": "This is the last point at which comments, reactions, activities, media and notifications attached to the post can still be queried — core's `CleanupHandler` uses exactly that window to cascade the deletes. Once the post is gone, `fluent_community/feed/deleted` fires with only the integer ID.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post about to be deleted."
      }
    ],
    "related": [
      "fluent_community/feed/media_deleted"
    ]
  },
  "fluent_community/feed/cast_survey_vote": {
    "summary": "Fires when a member casts one or more new votes in a survey post.",
    "details": "Only fires when the ballot contains at least one option the member had not already voted for — changing a vote fires it, withdrawing every vote does not. The `Reaction` rows are already written, but the tallies in the post's `meta.survey_config` are updated afterwards, so re-reading the post inside a callback gives stale counts. The first argument holds only the newly added option slugs, not the full ballot.",
    "params": [
      {
        "name": "newSyncIndexes",
        "type": "array",
        "desc": "Option slugs newly voted for; already-held votes are excluded."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The survey post."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the voter."
      }
    ],
    "related": [
      "fluent_community/feed/updated_survey_config",
      "fluent_community/survey_config_response"
    ]
  },
  "fluent_community/feed/created": {
    "summary": "Runs after a post has been saved and published, once its media and mentions are attached.",
    "details": "Fired from `FeedsHelper::createFeed()` and from `FeedsController::createFeed()`, and again from Pro when a scheduled post goes live or a moderator approves a held post — so a single post can reach this hook through more than one path, but only once per publication. Posts that end up `scheduled`, `pending` or any other non-published status skip it entirely; those fire `fluent_community/feed/scheduled` or `fluent_community/feed/new_feed_{status}` instead. Core uses it to write the activity row and to dispatch mention notifications.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The saved post, with media rows already linked."
      }
    ],
    "related": [
      "fluent_community/space_feed/created",
      "fluent_community/feed/updated",
      "fluent_community/feed/before_deleted"
    ]
  },
  "fluent_community/feed/deleted": {
    "summary": "Runs after a post row has been deleted, with only its ID.",
    "details": "The model is gone by this point, so capture anything you need from `fluent_community/feed/before_deleted` instead. Pro uses it to drop moderation reports filed against the post. Deleting a space, which removes its posts in bulk, does not route through the controller and therefore does not fire this hook per post.",
    "params": [
      {
        "name": "feedId",
        "type": "int",
        "desc": "ID of the deleted post."
      }
    ],
    "related": [
      "fluent_community/feed/before_deleted"
    ]
  },
  "fluent_community/feed/filterable_statuses": {
    "summary": "Filters which post statuses a caller may explicitly request in the feed listing.",
    "details": "Defaults to an empty array, meaning no status filter is honoured at all in core — the free plugin always falls back to the moderation-aware default scope. Pro adds `published`, `unlisted`, `pending` and `scheduled`. The requested status is matched with a strict `in_array()`, so return plain strings, and the filter only unlocks the request for moderators or a member viewing their own profile feed; anyone else is silently held to the default scope.",
    "params": [
      {
        "name": "statuses",
        "type": "array",
        "desc": "Allowed status strings. Empty by default."
      }
    ],
    "returns": "`array` — a flat list of status strings, compared strictly against the requested `status`.",
    "related": [
      "fluent_community/feed/save_status"
    ]
  },
  "fluent_community/feed/just_created_type_{formContentType}": {
    "summary": "Content-type-scoped action fired right after a post of that type is saved.",
    "details": "The suffix is the `content_type` value submitted with the request, so the live names are `fluent_community/feed/just_created_type_document` and `..._survey`. It fires only when the request carried a non-empty `content_type`, straight after `fluent_community/feed_mentioned` and before media is attached, and before any status branching — a post held for moderation reaches it too. Pro's Document Library uses it to bind uploaded documents to the new post.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The freshly saved post."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The raw request payload, including the type-specific fields."
      }
    ],
    "related": [
      "fluent_community/feed/new_feed_data_type_{formContentType}",
      "fluent_community/feed/updating_content_type_old_{existingContentType}"
    ]
  },
  "fluent_community/feed/media_deleted": {
    "summary": "Signals that one or more media rows attached to a post should be detached and cleaned up.",
    "details": "Despite the name this is a request to clean up, not a notification that a delete already happened: core's `CleanupHandler::handleMediaDelete()` is what actually queues the files for removal, and lesson documents are routed to the lesson-specific path instead. The only live callers are in the Pro Document Library, which passes documents being replaced or removed; the one core call site in `FeedsController::deleteMediaPreview()` is commented out, so deleting a post's preview image does not currently fire it.",
    "params": [
      {
        "name": "media",
        "type": "mixed",
        "desc": "Either a single `\\FluentCommunity\\App\\Models\\Media` model or a collection of them."
      }
    ],
    "related": [
      "fluent_community/remove_medias_by_url"
    ]
  },
  "fluent_community/feed/new_feed_data": {
    "summary": "Filters the attribute array a new post is about to be created from.",
    "details": "The main pre-save hook for posts, applied by both `FeedsController::store()` and `FeedsHelper::createFeed()`. By this point `message_rendered`, `meta` and the mention IDs are all populated and media has been resolved, so changing `message` alone will not change what readers see. Returning a `WP_Error` aborts the save and surfaces its message and error data to the client — Pro's moderation and post-scheduling handlers both use this hook, the latter to switch `status` to `scheduled`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The attributes to create the post with: `message`, `message_rendered`, `status`, `space_id`, `content_type`, `meta` and so on."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload; carries `is_admin` on the controller path."
      }
    ],
    "returns": "`array` — the attribute map, or a `WP_Error` to reject the post.",
    "related": [
      "fluent_community/feed/new_feed_data_type_{formContentType}",
      "fluent_community/feed/update_feed_data"
    ]
  },
  "fluent_community/feed/new_feed_data_type_{formContentType}": {
    "summary": "Content-type-scoped twin of `fluent_community/feed/new_feed_data`.",
    "details": "Applied immediately after the generic filter, and only when the request carried a non-empty `content_type` — so the live names are `fluent_community/feed/new_feed_data_type_document` and `..._survey`. It shares the generic filter's `WP_Error` contract, which is how the Document Library rejects a post whose documents fail validation; it registers at priority 1 so it runs before other callbacks.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The attributes to create the post with, as returned by the generic filter."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the attribute map, or a `WP_Error` to reject the post.",
    "related": [
      "fluent_community/feed/new_feed_data"
    ]
  },
  "fluent_community/feed/new_feed_response": {
    "summary": "Filters the response returned after a post is created.",
    "details": "Applied on the published branch and on the held-for-moderation branch, but not on the scheduled branch, which returns early with an unfiltered payload carrying `scheduled_at`. The `message` key is the string the composer shows; Pro rewrites it for unlisted posts and for posts caught by moderation. Unusually for a response filter the second argument is the `Feed` model rather than the request data, which is the third.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Response payload: `feed`, `message`, `last_fetched_timestamp`."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post that was created."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/feed/update_feed_response",
      "fluent_community/feed/patch_feed_response"
    ]
  },
  "fluent_community/feed/new_feed_{feed}": {
    "summary": "Status-scoped action for a new post that did not go live, where the suffix is the post status.",
    "details": "The real names are `fluent_community/feed/new_feed_pending`, `..._draft` and so on. It is reached only when the saved status is neither `published` nor `unlisted`, and never for `scheduled`, which is intercepted earlier by `fluent_community/feed/scheduled`. In practice `pending` is the live case: Pro's moderation handler listens on it to attach the flag record to a held post. Posts that go live fire `fluent_community/feed/created` instead.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The saved post, in its non-published status."
      }
    ],
    "related": [
      "fluent_community/feed/created",
      "fluent_community/feed/scheduled"
    ]
  },
  "fluent_community/feed/patch_feed_response": {
    "summary": "Filters the response of the lightweight post-patch endpoint.",
    "details": "The patch endpoint only ever touches `is_sticky`, `priority` and `comments_disabled`, and non-moderators are narrowed to `comments_disabled` alone. The `feed` in the payload is the raw model, not a transformed post, so it does not carry the interaction and permission keys the SPA sees elsewhere. The filter is applied even when nothing changed.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Response payload: `feed` (raw model) and `message`."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post after the patch."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/feed/update_feed_response"
    ]
  },
  "fluent_community/feed/react_added": {
    "summary": "Fires when a like is stored against a post.",
    "details": "Only likes reach it — bookmarks are stored through the same endpoint but skip the counter update and the hook. There are two identical call sites, `ReactionController::addOrRemovePostReact()` and `CommentsController::addOrRemovePostReact()`, because the two REST routes `POST /feeds/{id}/react` and `POST /feeds/{id}/reactions/toggle` are served by duplicated implementations; a given request fires it once. The reaction's `xprofile` relation is eager-loaded before the hook runs.",
    "params": [
      {
        "name": "react",
        "type": "\\FluentCommunity\\App\\Models\\Reaction",
        "desc": "The stored reaction row, with `xprofile` loaded."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post that was liked, with the incremented count already saved."
      }
    ],
    "related": [
      "fluent_community/feed/react_removed",
      "fluent_community/comment/react_added"
    ]
  },
  "fluent_community/feed/react_removed": {
    "summary": "Fires when a like is withdrawn from a post.",
    "details": "Passes the post only — the reaction row is already deleted, so there is no way to tell from here which user un-liked it. As with the add side, bookmarks do not fire it, and the same duplicated code exists in both `ReactionController` and `CommentsController`. The decremented `reactions_count` has been saved without touching the post's `updated_at`.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post, with the decremented count already saved."
      }
    ],
    "related": [
      "fluent_community/feed/react_added"
    ]
  },
  "fluent_community/feed/rescheduled": {
    "summary": "Fires after a scheduled post is moved to a new publish time.",
    "details": "Fires only for posts still in `scheduled` status, and only once the new time has passed the 30-minutes-from-now minimum. The Action Scheduler job has already been unscheduled and re-queued at the new UTC time. Publishing a scheduled post early does not fire this — that path fires fluent_community/feed/created (and fluent_community/space_feed/created for space posts) instead.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The rescheduled post, with the new scheduled_at saved."
      }
    ],
    "related": [
      "fluent_community/scheduled_posts_api_response"
    ]
  },
  "fluent_community/feed/save_status": {
    "summary": "Filters the status a post is about to be saved with.",
    "details": "Two call sites with different defaults. On create the incoming value is always `published`, and the third argument is `null`. On update it is only consulted when the request carried a `status` among `published`, `unlisted`, `scheduled` and `pending`, the incoming value is that status — except that a request for `unlisted` passes the post's current status instead — and the third argument is the existing post. Pro uses it to honour `unlisted`; the returned string is written straight to the column without validation.",
    "params": [
      {
        "name": "status",
        "type": "string",
        "desc": "The status to save. `published` on create."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload, including the requested `status`."
      },
      {
        "name": "existingFeed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being edited, or `null` on create."
      }
    ],
    "returns": "`string` — the status. It is not validated against a whitelist, so an unrecognised value will be stored and will hide the post.",
    "related": [
      "fluent_community/feed/filterable_statuses",
      "fluent_community/feed/new_feed_{feed}"
    ]
  },
  "fluent_community/feed/scheduled": {
    "summary": "Fires when a newly created post is saved with the `scheduled` status.",
    "details": "Checked before the published and non-published branches, so a scheduled post fires neither `fluent_community/feed/created` nor `fluent_community/feed/new_feed_{status}`. Nothing in core schedules the later publication: Pro's `SchedulePostHandler` listens here and queues `fluent_community/feed/scheduled_publish` for `$feed->scheduled_at`, which is when `fluent_community/feed/created` finally runs. Without Pro the post simply stays scheduled.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The scheduled post; `scheduled_at` is set."
      }
    ],
    "related": [
      "fluent_community/feed/scheduled_publish",
      "fluent_community/feed/created"
    ]
  },
  "fluent_community/feed/scheduled_publish": {
    "summary": "Action Scheduler task that publishes one scheduled post when its time arrives.",
    "details": "Pro-only. Queued in the `fluent-community` group with the post ID as its single argument, and unscheduled again whenever the post is rescheduled, published early or deleted, so at most one pending occurrence exists per post. The handler is what flips the status to `published` and fires `fluent_community/feed/created`.",
    "params": [
      {
        "name": "feedId",
        "type": "int",
        "desc": "ID of the post due to be published."
      }
    ],
    "related": [
      "fluent_community/feed/scheduled"
    ]
  },
  "fluent_community/feed/scheduling_everyone_tag": {
    "summary": "Fires just before the \"everyone\" broadcast email for a post is queued.",
    "details": "Only reached for space posts whose body carries the everyone tag and whose author is a space admin or moderator. Core does not use it as an event so much as a marker: `EmailNotificationHandler` calls `did_action()` on it to suppress the ordinary per-subscriber post email, so that a broadcast post is not mailed twice. Immediately afterwards `fluent_community/email_notify_users_everyone_tag` is scheduled for five minutes out.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post carrying the everyone tag."
      }
    ],
    "related": [
      "fluent_community/email_notify_users_everyone_tag",
      "fluent_community/email_notify_new_posts"
    ]
  },
  "fluent_community/feed/update_data": {
    "summary": "The last chance to alter a post's attributes before an edit is saved.",
    "details": "Not to be confused with `fluent_community/feed/update_feed_data`, which is a different filter earlier in the same method. This one runs after content-type handling, edit-history stamping and any space move, immediately before `fill()` and `save()`, so whatever it returns is what lands in the row and in the `$dirty` map reported by `fluent_community/feed/updated`. Unlike the earlier filter it has no `WP_Error` path — returning one would be filled onto the model.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The attributes about to be written."
      },
      {
        "name": "existingFeed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post as currently stored."
      }
    ],
    "returns": "`array` — the attribute map. Must be an array; there is no error contract here.",
    "related": [
      "fluent_community/feed/update_feed_data",
      "fluent_community/feed/updated"
    ]
  },
  "fluent_community/feed/update_feed_data": {
    "summary": "Filters an edited post's attributes early in the update flow.",
    "details": "The update-side counterpart of `fluent_community/feed/new_feed_data`, applied before content-type resolution and before the space-move handling, and it does support `WP_Error` for rejecting an edit. Anything you set here can still be overwritten further down the method — notably `content_type`, `space_id` and `meta.last_edited`. For a final say, use `fluent_community/feed/update_data`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The attributes for the edit, including `message`, `message_rendered` and `meta`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload; carries `is_admin`."
      }
    ],
    "returns": "`array` — the attribute map, or a `WP_Error` to reject the edit.",
    "related": [
      "fluent_community/feed/update_data",
      "fluent_community/feed/new_feed_data"
    ]
  },
  "fluent_community/feed/update_feed_data_type_{newContentType}": {
    "summary": "Content-type-scoped filter applied when an edited post has a non-text content type.",
    "details": "The suffix is the incoming type, so `..._document` and `..._survey` are the live names. It is skipped entirely when the resolved type is `text`, including the case where a document post loses its documents and is demoted back to text. Note the extra third argument compared with the create-side twin, and that it honours `WP_Error` — the Document Library uses that to refuse an edit with invalid documents.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The attributes for the edit."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      },
      {
        "name": "existingFeed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post as currently stored."
      }
    ],
    "returns": "`array` — the attribute map, or a `WP_Error` to reject the edit.",
    "related": [
      "fluent_community/feed/new_feed_data_type_{formContentType}",
      "fluent_community/feed/updating_content_type_old_{existingContentType}"
    ]
  },
  "fluent_community/feed/update_feed_response": {
    "summary": "Filters the response returned after a post is edited.",
    "details": "Applied unconditionally at the end of the update endpoint, including when the edit changed nothing and the `fluent_community/feed/updated` action was therefore skipped. The `feed` value is the fully transformed post, the same shape the listing endpoints return.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `feed` and `message`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/feed/new_feed_response"
    ]
  },
  "fluent_community/feed/updated": {
    "summary": "Runs after an existing post is saved with at least one changed column.",
    "details": "It is skipped when the save produced no dirty attributes, so editing a post without changing anything is silent. Two call sites pass different change sets: the full editor in `FeedsController::updateFeed()`, and `patchFeed()`, which only ever touches `is_sticky`, `priority` and `comments_disabled`. Media and topic changes are persisted before the hook runs but are not reflected in `$dirty`.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post after saving."
      },
      {
        "name": "dirty",
        "type": "array",
        "desc": "The changed attributes, keyed by column name, as returned by `getDirty()`."
      }
    ],
    "related": [
      "fluent_community/feed/created"
    ]
  },
  "fluent_community/feed/updated_survey_config": {
    "summary": "Filters a survey's configuration after vote tallies have been recalculated but before it is stored.",
    "details": "The returned array is written straight into the post's `meta.survey_config` and saved, so this is the persistence-side hook — mutating `options[*].vote_counts` here changes the stored tallies. It runs on every ballot submission, including one that only withdraws votes. For a display-only change use `fluent_community/survey_config_response`, which runs afterwards and is not persisted.",
    "params": [
      {
        "name": "surveyConfig",
        "type": "array",
        "desc": "The survey configuration, including `options` with recalculated `vote_counts`, and `end_date`."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The survey post."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the voter."
      }
    ],
    "returns": "`array` — the configuration, written verbatim to `meta.survey_config`.",
    "related": [
      "fluent_community/survey_config_response",
      "fluent_community/feed/cast_survey_vote"
    ]
  },
  "fluent_community/feed/updating_content_type_old_{existingContentType}": {
    "summary": "Fires when an edit changes a post from one content type to another, named after the outgoing type.",
    "details": "The suffix is the type being left behind, so a document post turned back into text fires `fluent_community/feed/updating_content_type_old_document`. It runs before the post is saved, giving a callback the chance to clean up the old type's attachments while they are still linked — that is exactly what Pro's Document Library does. Nothing fires for the incoming type; use `fluent_community/feed/update_feed_data_type_{newContentType}` for that side.",
    "params": [
      {
        "name": "existingFeed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post as currently stored, before the update is applied."
      },
      {
        "name": "newContentType",
        "type": "string",
        "desc": "The content type it is changing to."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The raw request payload."
      }
    ],
    "related": [
      "fluent_community/feed/update_feed_data_type_{newContentType}"
    ]
  },
  "fluent_community/feed/uploaded_feed_medias": {
    "summary": "Filters the media models resolved for a post while its metadata is being prepared.",
    "details": "Applied at the end of `FeedsHelper::processFeedMetaData()`, which runs on both create and update, and the returned models are what the controller then binds to the post by setting `feed_id`, `is_active` and `object_source`. Every entry must be a saveable `Media` model — the caller writes properties onto each one directly. The core FluentPlayer integration uses it to swap in transcoded audio and video rows.",
    "params": [
      {
        "name": "medias",
        "type": "array",
        "desc": "The resolved `Media` models for this post."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — a flat list of `Media` models."
  },
  "fluent_community/feed_api_response": {
    "summary": "Filters the single-post response, for both the read and the edit views.",
    "details": "Applied at three points in `getFeedBySlug()`, and `getFeedById()` delegates to it, so every single-post fetch passes through. The payload shape is not constant: with `context=edit` it is `{ feed }` built by `FeedsHelper::transformForEdit()`, otherwise `{ feed, execution_time }` built by `transformFeed()`. Check which one you have before reaching into the feed object.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `feed`, plus `execution_time` on the read path."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `context`."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/feeds_api_response",
      "fluent_community/rendering_feed_model"
    ]
  },
  "fluent_community/feed_general_config": {
    "summary": "Filters the shared configuration used while transforming posts for output.",
    "details": "Two call sites with incompatible trailing arguments: `transformFeed()` passes a single `Feed` and the current user ID, while `transformFeedsCollection()` passes the whole collection and an array of post IDs. The `is_collection` key in the config tells them apart — branch on that rather than on argument types. Setting `interactions` here is pointless for logged-in viewers: the collection path overwrites it per post from a pre-fetched reaction map, and the single path overwrites it outright.",
    "params": [
      {
        "name": "config",
        "type": "array",
        "desc": "Transform config: `user_id`, `interactions`, `comment_like_ids`, `is_collection`."
      },
      {
        "name": "feed",
        "type": "mixed",
        "desc": "A single `Feed` model, or the `Collection` of posts on the collection path."
      },
      {
        "name": "context",
        "type": "mixed",
        "desc": "The current user ID on the single path, or the array of post IDs on the collection path."
      }
    ],
    "returns": "The config array. Keep `is_collection` intact — the transformer branches on it.",
    "related": [
      "fluent_community/rendering_feed_model"
    ]
  },
  "fluent_community/feed_links_api_response": {
    "summary": "Filters the response of the feed custom-links endpoint.",
    "details": "Applied on both branches with the same payload key. With `scope=view` the list has already been filtered down to links the current viewer may see; any other scope returns the raw stored list for the settings screen, including disabled and privacy-restricted entries. Read `scope` out of the second argument if the difference matters.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `links` array."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `scope`."
      }
    ],
    "returns": "The response payload array."
  },
  "fluent_community/feed_mentioned": {
    "summary": "Fires when a newly created post contains @-mentions, carrying the mentioned user models.",
    "details": "Fired from `FeedsController::store()` and from `FeedsHelper::createFeed()`, in both cases immediately after the post row is saved and before its media is attached — so `$feed->media` is not populated yet. It fires regardless of the resulting status, including for posts held as `pending` or `scheduled`. Editing a post to add a mention does not fire it. For the notification-side event, which passes IDs rather than models and only runs for published posts, use `fluent_community/feed_mentioned_user_ids`.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The freshly saved post."
      },
      {
        "name": "users",
        "type": "array",
        "desc": "The mentioned `User` models resolved from the message body."
      }
    ],
    "related": [
      "fluent_community/feed_mentioned_user_ids",
      "fluent_community/feed/created"
    ]
  },
  "fluent_community/feed_mentioned_user_ids": {
    "summary": "Fires while mention notifications are being built for a published post.",
    "details": "Hangs off `fluent_community/feed/created`, so unlike `fluent_community/feed_mentioned` it only sees posts that reached a published state. It runs before the mention notification row is created, and the IDs come from the post's `meta.mentioned_user_ids`, which means they are the IDs recorded at save time rather than a fresh parse of the body.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The published post."
      },
      {
        "name": "mentionedUserIds",
        "type": "array",
        "desc": "WordPress user IDs read from `meta.mentioned_user_ids`."
      }
    ],
    "related": [
      "fluent_community/feed_mentioned"
    ]
  },
  "fluent_community/feed_oembed_api_response": {
    "summary": "Filters the link-preview response returned for a pasted URL.",
    "details": "Only applied when `RemoteUrlParser` successfully resolved metadata; a failed or invalid URL returns an error response that never reaches this filter. The `oembed` value is the parser output — `title`, `image`, `description`, `icon`, `type` and `url` — and is what ends up stored as the post's `meta.media_preview`. To intervene before the remote request is made, use `fluent_community/preview_metadata_pre_fetch` instead.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with an `oembed` metadata array."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `url`."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/preview_metadata_pre_fetch"
    ]
  },
  "fluent_community/feed_ticker": {
    "summary": "Filters the polling payload the portal uses to refresh feeds and the notification badge.",
    "details": "The SPA polls this endpoint every 45 to 75 seconds per open session, so callbacks run very frequently and must stay cheap. The payload carries `timestamp`, `has_changes`, a `feeds` array of up to 20 change records each with a fully transformed `feed_data`, an unread `notifications` count, an unused `spaces` placeholder, and `execution_time`. The `new_count` inside `notifications` is hard-coded to 0.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Ticker payload: `timestamp`, `has_changes`, `feeds`, `notifications`, `spaces`, `execution_time`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/track_activity"
    ]
  },
  "fluent_community/feed_view_json_ld": {
    "summary": "Collects the JSON-LD structured data emitted in the head of a single post page.",
    "details": "Starts as an empty array and is only reached on server-rendered post views, so it has no effect on SPA navigation between posts. Nothing in core adds to it; Pro's SEO module is the only contributor, and the whole graph is dropped when nothing is added. The third argument is the page meta being assembled, which already contains the resolved title, description, canonical URL and featured image.",
    "params": [
      {
        "name": "jsonLd",
        "type": "array",
        "desc": "The structured-data graph. Empty by default."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being rendered."
      },
      {
        "name": "data",
        "type": "array",
        "desc": "The head meta assembled so far: `title`, `og_title`, `description`, `canonical_url`, `featured_image`."
      }
    ],
    "returns": "The structured-data array. An empty array emits no JSON-LD block."
  },
  "fluent_community/feeds_api_response": {
    "summary": "Filters the main feed listing response.",
    "details": "Covers the global feed, space feeds and profile feeds — they are all the same endpoint. The payload holds a `feeds` block with the paging keys, a `sticky` post that is only ever populated on page one of a space feed, `execution_time`, and `last_fetched_timestamp` for a logged-in viewer on page one of an unfiltered feed. Note `total` is an estimate derived from the current page, not a real count.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `feeds`, `sticky`, `execution_time`, and sometimes `last_fetched_timestamp`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/feeds_query",
      "fluent_community/feed_api_response"
    ]
  },
  "fluent_community/feeds_query": {
    "summary": "Passes the main feed list query by reference so callbacks can constrain it before it is paged.",
    "details": "Fired with `do_action_ref_array()`, so declare the first parameter as `&$query` and mutate it in place — returning a builder does nothing. It runs after search, topic, status, space, author and access scoping have been applied and immediately before `limit()`/`offset()`, which makes it the right place to add joins or further `where` clauses but the wrong place to change the page size. `$queryArgs` is the resolved, array-filtered context and always carries `is_main_query`, true only for the unfiltered global feed. Pro uses it to apply block lists and the \"Following\" sort.",
    "params": [
      {
        "name": "query",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Builder",
        "desc": "The Feed query, passed by reference."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      },
      {
        "name": "queryArgs",
        "type": "array",
        "desc": "Resolved context: `per_page`, `page`, optional `space_slug`, `user_id`, `search`, `selected_topic`, and `is_main_query`."
      }
    ],
    "related": [
      "fluent_community/feeds_api_response"
    ]
  },
  "fluent_community/fluent_player/fallback_timings": {
    "summary": "Filters the timeouts the front end uses to decide the FluentPlayer embed has failed.",
    "details": "All five values are milliseconds and they govern the fallback path only — how long the portal waits for the player content, its script and its initialisation before giving up and rendering a plain link. They are only added to the payload when FluentPlayer is active and are read once at page load, so changes apply on the next render. Raising them hides genuine failures for longer; lowering them risks false negatives on slow connections.",
    "params": [
      {
        "name": "timings",
        "type": "array",
        "desc": "`content_timeout_ms`, `script_timeout_ms`, `script_grace_ms`, `init_timeout_ms`, `stall_timeout_ms`."
      }
    ],
    "returns": "`array` — the timing map; the front end reads each key by name.",
    "related": [
      "fluent_community/fluentplayer_defaults_settings"
    ]
  },
  "fluent_community/fluent_player/max_audios_per_post": {
    "summary": "Filters how many audio items may be attached to one post.",
    "details": "Defaults to 10 and is clamped to 1–50 after the filter, so a callback cannot lift the ceiling above 50 or disable audio by returning 0 — the clamp exists to bound the sanitisation and database work, and is documented as such at the call site. The resolved figure both trims the submitted list server-side and reaches the composer as `features.fluent_player.max_audios_per_post`.",
    "params": [
      {
        "name": "maxAudios",
        "type": "int",
        "desc": "Audio items allowed per post, 10 by default."
      }
    ],
    "returns": "`int` — cast to an integer and clamped to between 1 and 50.",
    "related": [
      "fluent_community/support_audio_types"
    ]
  },
  "fluent_community/fluentform__defaults": {
    "summary": "Filters the default configuration of a Fluent Forms integration feed for FluentCommunity.",
    "details": "Supplies the initial state of the feed form an administrator sees when connecting a Fluent Forms form to the community — it is the shape of a new, unsaved feed, not the settings of a saved one. Field mapping keys such as `Email` and `username` hold Fluent Forms shortcodes once configured. The double underscore in the hook name is not a typo.",
    "params": [
      {
        "name": "fields",
        "type": "array",
        "desc": "Feed defaults: `name`, `space_ids`, `Email`, `username`, `enableAutoLogin`, `sendEmailToNewUser`, `conditionals`, `enabled`."
      },
      {
        "name": "formId",
        "type": "int",
        "desc": "The Fluent Forms form being connected."
      }
    ],
    "returns": "`array` — the feed defaults, rendered into the integration settings form."
  },
  "fluent_community/fluentplayer_defaults_settings": {
    "summary": "Filters the default player settings applied to a FluentPlayer embed.",
    "details": "Applied last, after the plugin defaults have been merged with the stored FluentPlayer settings and after the iOS Safari compatibility pass has forced `playsinline` and `preload` — so a callback can undo those corrections, which is rarely what you want. Note `loadStrategy` is deliberately set to `idle` because the portal is a single-page app; changing it can leave players uninitialised after client-side navigation.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "Player settings such as `viewType`, `brandColor`, `aspectRatio`, `playsInline`, `loadStrategy`, and any stored overrides."
      }
    ],
    "returns": "`array` — the settings map handed to the player.",
    "related": [
      "fluent_community/fluent_player/fallback_timings"
    ]
  },
  "fluent_community/followed_user": {
    "summary": "Fires immediately after one member starts following another.",
    "details": "Fired from two call sites — the explicit POST /profile/{username}/follow endpoint and the POST /profile/{userId}/toggle-follow endpoint when the toggle resolves to \"follow\". The Follow row has already been inserted with its default level of 1, so a callback can read $follow->id. It does not fire when an existing block is lifted, and it never fires for self-follows or for a user who already has any Follow row (including a block, which is a Follow row at level 0).",
    "params": [
      {
        "name": "follow",
        "type": "\\FluentCommunityPro\\App\\Models\\Follow",
        "desc": "The newly created follow row (follower_id, followed_id, level)."
      },
      {
        "name": "xProfile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "Profile of the user being followed."
      }
    ],
    "related": [
      "fluent_community/before_unfollowing_user",
      "fluent_community/blocked_user"
    ]
  },
  "fluent_community/general_portal_vars": {
    "summary": "Filters the small configuration object shared by every non-SPA portal script.",
    "details": "Localised as `fcom_portal_general` for the `portal_general.js` bundle, which handles the sidebar toggle, group collapsing and the dark-mode switch. It is applied at two very different call sites: `PortalHandler::getGlobalScriptVars()` builds the full array, while `Helper::renderColorSchemePrePaintScript()` applies it to a one-key array just to read `color_switch_cookie_name` — so a callback must not assume the other keys are present. Core uses it to adopt the Blocksy and Kadence dark-mode cookies, which is how the portal follows the host theme's theme switch.",
    "params": [
      {
        "name": "vars",
        "type": "array",
        "desc": "Configuration keys such as `scope`, `theme`, `has_color_scheme`, `default_theme_mode`, `color_switch_cookie_name`. Only `color_switch_cookie_name` is guaranteed."
      }
    ],
    "returns": "`array` — the configuration object.",
    "related": [
      "fluent_community/default_theme_mode",
      "fluent_community/has_color_scheme"
    ]
  },
  "fluent_community/general_settings_api_response": {
    "summary": "Filters the general settings screen payload.",
    "details": "The settings are re-read from the database rather than from cache. `user_roles` is every WordPress role except `administrator`, which is removed deliberately because administrators always have access and are not selectable as a restricted role. `users_can_register` reflects the WordPress option rather than the plugin's own registration setting.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`settings`, `user_roles`, `users_can_register`, `user_registration_enable_url`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/auth/registration_enabled"
    ]
  },
  "fluent_community/generated_upload_file_name": {
    "summary": "Filters the randomised filename given to an upload before it is written to disk.",
    "details": "The default is the original name prefixed with `fluentcom-`, 32 random characters, and `-fluentcom-`. That sandwich is not decorative: the surrounding code relies on it to recover the original name, so removing the markers breaks download filenames. The second argument gives you the pre-prefix name. Applied to every FluentCommunity upload, including avatars, covers and lesson documents.",
    "params": [
      {
        "name": "name",
        "type": "string",
        "desc": "The prefixed filename."
      },
      {
        "name": "originalName",
        "type": "string",
        "desc": "The filename as submitted by the client."
      },
      {
        "name": "file",
        "type": "array",
        "desc": "The full file descriptor being uploaded."
      }
    ],
    "returns": "`string` — the filename to write. It is not re-sanitised, so escape path separators yourself."
  },
  "fluent_community/get_auth_settings": {
    "summary": "Filters the auth settings as returned to the admin settings screen.",
    "details": "A thin wrapper over `fluent_community/auth/settings` that runs only in `AdminController::getAuthSettings()`, after the live login and signup field definitions have been injected into `login.form.fields` and `signup.form.fields`. Filter it to change what an administrator sees or can edit; filter `fluent_community/auth/settings` to change what is actually used at render time.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "The auth configuration with `form.fields` populated for both branches."
      }
    ],
    "returns": "`array` — returned to the admin app under a `settings` key.",
    "related": [
      "fluent_community/auth/settings"
    ]
  },
  "fluent_community/get_course_api_response": {
    "summary": "Filters the response for a course fetched by numeric ID.",
    "details": "The same `processCourse()` payload as the by-slug endpoint, minus the instructor block that only the by-slug path assembles. Both endpoints refuse an unpublished course to anyone who is not a course admin, so the filter is never reached in that case.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The processed course payload."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/course_api_response"
    ]
  },
  "fluent_community/get_course_welcome_banner_settings": {
    "summary": "Filters the course welcome banner settings returned to the admin editor.",
    "details": "The admin read path, not the render path — both the enrolled and not_enrolled views are always present here, already merged over the defaults, including views that are disabled.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "Banner settings keyed by view."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The settings array.",
    "related": [
      "fluent_community/course_welcome_banner"
    ]
  },
  "fluent_community/get_lockscreen_settings": {
    "summary": "Filters the lock-screen configuration served for one space.",
    "details": "This is the settings-editing view, reached through the space lock-screen endpoint; the reader-facing lock screen is assembled by `LockscreenService::getLockscreenConfig()` and is only produced for spaces whose privacy is `private`. Secret spaces the viewer cannot see return a 404 before the filter runs.",
    "params": [
      {
        "name": "lockscreen",
        "type": "array",
        "desc": "The stored lock-screen field definitions."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space whose lock screen was requested."
      }
    ],
    "returns": "The lock-screen settings array.",
    "related": [
      "fluent_community/lockscreen_fields"
    ]
  },
  "fluent_community/get_welcome_banner_settings": {
    "summary": "Filters the stored welcome-banner settings as returned to the admin settings screen.",
    "details": "This is the editor-facing shape: both the `login` and `logout` variants complete with their raw `description`, whether or not they are enabled. The reader-facing banner goes through `fluent_community/welcome_banner_for_logged_in` or `..._for_guests` instead, which strip the raw description and return `null` for a disabled banner.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "The banner settings, keyed `login` and `logout`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The settings array.",
    "related": [
      "fluent_community/update_welcome_banner_settings",
      "fluent_community/welcome_banner_api_response"
    ]
  },
  "fluent_community/handle_remove_bulk_media": {
    "summary": "Lets a storage driver take over deletion of a whole collection of media rows.",
    "details": "Applied at two points in the cleanup handler — the queue path, which unlinks local files and merely deactivates remote ones, and the hard-delete path, which removes every row. Returning `true` short-circuits both, so your callback becomes solely responsible for deleting the rows and the underlying files; nothing else runs afterwards. It is only reached for collections, never for a single media model, and never for an empty collection.",
    "params": [
      {
        "name": "handled",
        "type": "bool",
        "desc": "Whether deletion has been taken over. `false` by default."
      },
      {
        "name": "media",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Collection",
        "desc": "The media rows to remove."
      }
    ],
    "returns": "`bool` — `true` to suppress the built-in deletion entirely.",
    "related": [
      "fluent_community/delete_remote_media_{this}",
      "fluent_community/comment/media_deleted"
    ]
  },
  "fluent_community/has_color_scheme": {
    "summary": "Filters whether the light/dark colour scheme is active for the current render.",
    "details": "The base value is the `dark_mode` customisation setting. It controls three things at once: the pre-paint theme script in `<head>`, the dark-mode toggle in the header, and the `has_color_scheme` flag handed to the sidebar and the front-end scripts. Core turns it off with `__return_false` for the whole auth page, so the login screen never renders a toggle.",
    "params": [
      {
        "name": "hasColorScheme",
        "type": "bool",
        "desc": "Whether the colour scheme is enabled, from the `dark_mode` customisation setting."
      }
    ],
    "returns": "`bool` — evaluated for truthiness.",
    "related": [
      "fluent_community/default_theme_mode",
      "fluent_community/color_schmea_config"
    ]
  },
  "fluent_community/has_global_post": {
    "summary": "Filters whether members may post outside a space, to their own profile feed.",
    "details": "The stored setting is inverted before the filter sees it: `disable_global_posts` set to `yes` arrives here as `false`. Returning `false` makes the composer reject a submission with no space and rejects the special `__self__post__` space slug, and it is also what the \"Post to profile\" option in the composer keys off.",
    "params": [
      {
        "name": "status",
        "type": "bool",
        "desc": "Whether profile posting is allowed. Derived from the `disable_global_posts` setting."
      }
    ],
    "returns": "`bool` — `true` to allow posts with no space."
  },
  "fluent_community/has_inline_image_upload": {
    "summary": "Filters whether images can be uploaded inline from within the editor toolbar.",
    "details": "A string flag, not a boolean: it surfaces as `features.has_inline_image_upload` and the Vue app compares it strictly against `'yes'`, so returning `true` disables the feature just as effectively as returning `'no'`. It controls the in-editor upload affordance only; the separate attachment control governed by `fluent_community/max_media_per_post` is unaffected.",
    "params": [
      {
        "name": "hasInlineImageUpload",
        "type": "string",
        "desc": "`yes` to allow inline uploads, anything else to disable. `yes` by default."
      }
    ],
    "returns": "`string` — return the literal string `'yes'` to keep the feature on.",
    "related": [
      "fluent_community/max_media_per_post"
    ]
  },
  "fluent_community/has_post_title": {
    "summary": "Filters whether posts carry a title, and whether that title is mandatory.",
    "details": "Despite the boolean-sounding name this is a string preference: `optional`, `required`, or an empty string when titles are off. The stored value `disabled` is normalised to an empty string before the filter runs, so return an empty string rather than `disabled` to switch titles off. Any truthy value enables title handling in the sanitiser, but only the exact string `required` makes a missing title an error; titles are trimmed to 192 characters regardless.",
    "params": [
      {
        "name": "pref",
        "type": "string",
        "desc": "`optional`, `required`, or an empty string."
      }
    ],
    "returns": "`string` — an empty string disables titles, `required` makes them mandatory, and any other truthy string behaves as optional."
  },
  "fluent_community/has_video_embeder": {
    "summary": "Filters whether the video embed control appears in the post composer.",
    "details": "Surfaces as `features.video_embeder` in `portal_vars` and defaults to `true`. The Vue app tests it for truthiness only, so return the boolean `false` to hide the control — the string `'no'` is truthy and will leave it visible. The control is additionally gated on the composer's own `videoApp` config, so it only ever appears in the create-post composer, and hiding it does not block video embeds submitted through the API.",
    "params": [
      {
        "name": "hasVideoEmbeder",
        "type": "bool",
        "desc": "Whether the embed control is offered, `true` by default."
      }
    ],
    "returns": "`bool` — return a falsy value, ideally `false`, to hide the control.",
    "related": [
      "fluent_community/portal_vars",
      "fluent_community/has_inline_image_upload"
    ]
  },
  "fluent_community/header_vars": {
    "summary": "Filters the data the portal header template is rendered with.",
    "details": "Applied in `PortalHandler::getPortalHeader()` just before the `portal.header` view runs, so it is the way to swap the logo, its link target or the main menu without touching the template. Emptying `menuItems` suppresses the whole centre `<nav>`, which is what core does on admin routes. `auth` is the viewer's `XProfile` or `null`; the profile is only resolved when the viewer passes the portal access check.",
    "params": [
      {
        "name": "vars",
        "type": "array",
        "desc": "Header data: `portal_url`, `logo`, `white_logo`, `logo_permalink`, `site_title`, `profile_url`, `auth`, `auth_url`, `menuItems`, `context`."
      }
    ],
    "returns": "`array` — the header data. The template reads `logo`, `site_title` and `menuItems` directly, so keep them defined.",
    "related": [
      "fluent_community/main_menu_items",
      "fluent_community/after_header_menu"
    ]
  },
  "fluent_community/headless/before_js_loaded": {
    "summary": "Prints on the auth page after the inline JavaScript variables and before the module script tags.",
    "details": "The auth page ships no JavaScript variables of its own, so in practice the preceding `<script>` block is empty, and this is the last hook before the deferred module scripts. Nothing in core or Pro listens.",
    "params": [
      {
        "name": "scope",
        "type": "string",
        "desc": "The page scope; `user_registration` at the only live call site."
      }
    ],
    "related": [
      "fluent_community/headless/footer"
    ]
  },
  "fluent_community/headless/content": {
    "summary": "Renders the body of the auth page, inside the `.fluent_com` wrapper.",
    "details": "The whole login, signup, password-reset and invitation-acceptance UI is drawn from a single callback registered by `AuthModdule::viewAuthPage()`, which branches on the requested form. On the `signup` layout the wrapper sits in the right-hand column beside the branding panel; otherwise it is a plain full-width block. Adding your own callback appends below the form rather than replacing it — to replace it, return a non-empty string from `fluent_community/auth/pre_content` and print your own markup.",
    "params": [
      {
        "name": "scope",
        "type": "string",
        "desc": "The page scope; `user_registration` at the only live call site."
      }
    ],
    "related": [
      "fluent_community/auth/pre_content",
      "fluent_community/headless/footer"
    ]
  },
  "fluent_community/headless/footer": {
    "summary": "Prints as the last thing before `</body>` on the auth page, after `wp_footer()`.",
    "details": "Because the auth page sets `load_wp`, `wp_footer()` has already run when this fires — anything enqueued the normal way is on the page by now. Nothing in core or Pro listens.",
    "params": [
      {
        "name": "scope",
        "type": "string",
        "desc": "The page scope; `user_registration` at the only live call site."
      }
    ],
    "related": [
      "fluent_community/headless/head"
    ]
  },
  "fluent_community/headless/head": {
    "summary": "Prints as the last thing inside `<head>` of the auth page template, after the stylesheet links.",
    "details": "Same scope caveat as `fluent_community/headless/head_early`: this is the auth page, not the portal. Use it for overrides that must beat the plugin stylesheets, and `head_early` for anything they should be able to override. `wp_head()` has already run on this template because the auth page sets `load_wp`.",
    "params": [
      {
        "name": "scope",
        "type": "string",
        "desc": "The page scope; `user_registration` at the only live call site."
      }
    ],
    "related": [
      "fluent_community/headless/head_early",
      "fluent_community/headless/content"
    ]
  },
  "fluent_community/headless/head_early": {
    "summary": "Prints inside `<head>` of `headless_page.php`, before the stylesheets are linked.",
    "details": "This template is not the portal. Despite the name, `app/Views/headless_page.php` is rendered from exactly one place — `AuthModdule::viewAuthPage()` — so every `fluent_community/headless/*` hook fires only on the FluentCommunity login, signup, reset-password and accept-invitation screens, and `$scope` is always `user_registration`. Core uses this hook for the canonical link and the auth banner colour variables. The portal's own head hook is `fluent_community/portal_head`.",
    "params": [
      {
        "name": "scope",
        "type": "string",
        "desc": "The page scope; `user_registration` at the only live call site."
      }
    ],
    "related": [
      "fluent_community/headless/head",
      "fluent_community/portal_head"
    ]
  },
  "fluent_community/image_size_names_choose": {
    "summary": "Filters the image sizes offered in the lesson editor's image block.",
    "details": "A FluentCommunity-scoped analogue of WordPress's own `image_size_names_choose`, and independent of it — sizes added to the core filter do not appear here. The map is reshaped into the `imageSizes` list the block editor expects, so keys must be registered image size slugs; a slug with no registered size yields an option that resolves to the full-size image.",
    "params": [
      {
        "name": "sizeNames",
        "type": "array",
        "desc": "Image size slug mapped to display label: `thumbnail`, `medium`, `large`, `full`."
      }
    ],
    "returns": "`array` — an associative map of size slug to label.",
    "related": [
      "fluent_community/block_editor_settings"
    ]
  },
  "fluent_community/install_fluent_player_plugin": {
    "summary": "Fires when an administrator asks to install the FluentPlayer plugin from the add-ons screen.",
    "details": "Guarded by an explicit Pro check before it fires — a free install gets an error telling it to upgrade, so unlike the messaging hook this one is genuinely unreachable without Pro. Pro answers it with a direct background install from the vendor's S3 bucket. No arguments.",
    "related": [
      "fluent_community/install_messaging_plugin",
      "fluent_community/fluentplayer_defaults_settings"
    ]
  },
  "fluent_community/install_messaging_plugin": {
    "summary": "Fires when an administrator asks to install the Fluent Messages plugin from the add-ons screen.",
    "details": "Fluent Messages is not hosted on wordpress.org, so there is no default installer — Pro answers this hook with a direct background install from the vendor's S3 bucket. On a free site nothing is listening and the endpoint reports success without having installed anything. The action carries no arguments and no result: it runs synchronously inside the request and the response is fixed either way.",
    "related": [
      "fluent_community/install_fluent_player_plugin"
    ]
  },
  "fluent_community/invitation_created": {
    "summary": "Fires after an email invitation to a space or course has been stored.",
    "details": "Fired from `InvitationService::invite()` once every duplicate and membership check has passed, and before the invitation email is sent — so a callback that throws will leave a stored invitation with no email behind it. The invitee's address is in `message` and the token in `message_rendered`. Link invitations take a different path and fire `fluent_community/invitation_link_created` instead.",
    "params": [
      {
        "name": "invitation",
        "type": "\\FluentCommunity\\Modules\\Auth\\Classes\\Invitation",
        "desc": "The stored invitation; `status` is `pending`."
      }
    ],
    "related": [
      "fluent_community/invitation_link_created",
      "fluent_community/create_invitation_link"
    ]
  },
  "fluent_community/invitation_link_created": {
    "summary": "Fires after a shareable invitation link has been created for a space.",
    "details": "Link invitations differ from email ones: `message` is empty, `status` is `active` rather than `pending`, and `meta` carries the `title`, `limit` and `expire_date` chosen by the moderator. No email is sent. The redemption counter is kept in the row's `reactions_count` column, which is incremented each time someone signs up through the link.",
    "params": [
      {
        "name": "invitation",
        "type": "\\FluentCommunity\\Modules\\Auth\\Classes\\Invitation",
        "desc": "The stored link invitation."
      }
    ],
    "related": [
      "fluent_community/invitation_created",
      "fluent_community/create_invitation_link"
    ]
  },
  "fluent_community/is_allowed_to_complete_lesson": {
    "summary": "Filters whether the current student may change a lesson's completion state.",
    "details": "Covers both directions — the third argument is `completed` or `incomplete` — so a callback that only means to block completion must let `incomplete` through, as core's video gate does. Core attaches the video-watch gate at priority 11 and Pro attaches the quiz requirement at 10, both of which can veto. Returning `false` produces a 422; the controller adds a `video_watch_required` code and the threshold to the error when the video gate is the reason, so a custom refusal is reported generically.",
    "params": [
      {
        "name": "isAllowed",
        "type": "bool",
        "desc": "Whether the change is permitted. `true` by default."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The published lesson being marked."
      },
      {
        "name": "state",
        "type": "string",
        "desc": "`completed` or `incomplete`."
      }
    ],
    "returns": "`bool` — `false` rejects the request with a 422.",
    "related": [
      "fluent_community/course/lesson_completed",
      "fluent_community/lesson_video_gate/default_threshold"
    ]
  },
  "fluent_community/is_rtl": {
    "summary": "Filters whether FluentCommunity renders in right-to-left mode.",
    "details": "Defaults to WordPress `is_rtl()`. It decides which build of every stylesheet is requested — the RTL builds are separate files, not a runtime flip — and adds a `direction: rtl` rule to the standalone portal page. Because it is read while assets are being resolved, filter it early; changing it after the head has rendered has no effect.",
    "params": [
      {
        "name": "isRtl",
        "type": "bool",
        "desc": "Whether to use the RTL assets. WordPress `is_rtl()` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness."
  },
  "fluent_community/is_supported_theme": {
    "summary": "Filters whether the active theme lays its own content out well enough inside the community frame.",
    "details": "Only the boolean matters: `true` puts the `fcom_supported_wp_content` class on the content column, `false` uses `fcom_wp_content fcom_fallback_wp_content`, which adds the plugin's own padding and width handling. It defaults to `false` for every theme, including the ones `fluent_community/theme_content` has a dedicated renderer for, so declaring your theme supported is opt-in. Fires in both frame templates.",
    "params": [
      {
        "name": "isSupported",
        "type": "bool",
        "desc": "Whether the theme handles the frame content area itself. `false` by default."
      },
      {
        "name": "themeName",
        "type": "string",
        "desc": "The active theme's directory slug, from `get_option('template')`."
      }
    ],
    "returns": "`bool` — evaluated for truthiness; only the class name changes.",
    "related": [
      "fluent_community/theme_content",
      "fluent_community/template_slug"
    ]
  },
  "fluent_community/last_activity_date_for_unread_feeds": {
    "summary": "Filters the cut-off date used to count unread posts per space in the sidebar.",
    "details": "Defaults to the viewer's `last_activity` minus five minutes, expressed as a UTC `Y-m-d H:i:s` string, and is compared directly against `fcom_posts.created_at`. Returning a `DateTime` or a timestamp will not work — the value goes straight into the query. Members with no recorded activity never reach the filter, and counts are capped for display at `10+`.",
    "params": [
      {
        "name": "lastActivityDate",
        "type": "string",
        "desc": "UTC datetime string; `last_activity` minus 300 seconds by default."
      },
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The viewing member."
      }
    ],
    "returns": "`string` — a `Y-m-d H:i:s` datetime."
  },
  "fluent_community/leaderboard_api_response": {
    "summary": "Filters the GET /leaderboard response.",
    "details": "The payload holds a leaderboard list of exactly three boards, keyed 7_days, 30_days and all_time, each with a title and up to ten items. Entries whose XProfile is missing or not active have already been dropped, and the all-time pass may have written back a corrected total_points before this filter runs. The boards themselves are served from a cache that is cleared when leaderboard levels are saved.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Response payload with a `leaderboard` key."
      },
      {
        "name": "xProfiles",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Collection",
        "desc": "The XProfiles appearing on any board, keyed by user_id."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/user_level_upgraded"
    ]
  },
  "fluent_community/lesson/additional_media_updated": {
    "summary": "Fires at the end of a lesson save so integrations can persist media that is not a lesson column.",
    "details": "Fires on every save of the lesson editor, including ones where nothing changed and `fluent_community/lesson/updated` stayed silent. The first argument is the entire unsanitised request payload — which is the point, since attached documents and other add-on media travel outside the lesson attributes — so sanitise anything you read from it. `$updateData` is what was actually filled onto the model.",
    "params": [
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full, unsanitised request payload."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The saved lesson."
      },
      {
        "name": "updateData",
        "type": "array",
        "desc": "The attributes that were filled onto the lesson: `title`, `status`, `meta`, and `message` when submitted."
      }
    ],
    "related": [
      "fluent_community/lesson/updated"
    ]
  },
  "fluent_community/lesson/before_deleted": {
    "summary": "Runs immediately before a lesson row is deleted, while its relations are still queryable.",
    "details": "Fires from three places: deleting a single lesson, deleting a section (once per contained lesson), and deleting a whole course (once per lesson in every section). Core uses it to drop lesson media and watched-video records, so a bulk course delete will fan this out across every lesson.",
    "params": [
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson about to be deleted."
      }
    ],
    "related": [
      "fluent_community/section/before_deleted"
    ]
  },
  "fluent_community/lesson/create_data": {
    "summary": "Filters the attributes a new lesson is created with.",
    "details": "The default payload is deliberately thin — title, section, course and a `draft` status, plus a priority one past the current maximum in the section. The second argument is the whole request object, not an array, which is how Pro's quiz module detects that the new lesson should be a quiz and adds its own attributes. Anything you add must be fillable on `CourseLesson` or it is dropped by `create()`.",
    "params": [
      {
        "name": "lessonData",
        "type": "array",
        "desc": "`title`, `parent_id`, `space_id`, `status`, `priority`."
      },
      {
        "name": "request",
        "type": "\\FluentCommunity\\Framework\\Http\\Request\\Request",
        "desc": "The request object itself, not an array."
      }
    ],
    "returns": "`array` — attributes passed to `CourseLesson::create()`.",
    "related": [
      "fluent_community/lesson/update_data"
    ]
  },
  "fluent_community/lesson/duplicated": {
    "summary": "Fires after a lesson has been copied within its section.",
    "details": "The copy is a full `replicate()` with a fresh slug, a unique \"(Copy)\" title and a priority placing it immediately after the original; sibling priorities have already been re-indexed and attached documents copied across by the time it runs. Note the argument order — the new lesson comes first.",
    "params": [
      {
        "name": "newLesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The duplicate, freshly reloaded from the database."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson it was copied from."
      }
    ],
    "related": [
      "fluent_community/lesson/create_data"
    ]
  },
  "fluent_community/lesson/get_public_meta": {
    "summary": "Filters the lesson meta exposed to a student viewing the lesson.",
    "details": "The read-side counterpart of `fluent_community/lesson/sanitize_meta`. Core has already rewritten document entries into signed download URLs and — when the viewer may not see the lesson — emptied the document lists and removed the media block, so a callback must not put privileged data back without checking. Two callbacks ship: the video gate appends the watch state, and Pro's quiz module strips answers. Note the filter does not receive the `canView` flag, only the already-redacted array.",
    "params": [
      {
        "name": "meta",
        "type": "array",
        "desc": "The lesson meta, redacted for the viewer."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson being rendered."
      }
    ],
    "returns": "`array` — the meta sent to the front end. Do not add anything a locked-out viewer should not see.",
    "related": [
      "fluent_community/lesson/sanitize_meta",
      "fluent_community/course/lesson_access_info"
    ]
  },
  "fluent_community/lesson/sanitize_meta": {
    "summary": "Filters the lesson meta payload after core has sanitised it and before it is saved.",
    "details": "Core has already normalised the known keys by this point: the media block is emptied unless `enable_media` is `yes`, `video_length`, `passing_score` and `video_completion_threshold` are forced through `absint()`, and a non-zero threshold is clamped to 1–100. Unknown keys survive untouched, which is what makes this the hook for validating your own lesson meta — Pro's quiz module sanitises its question data here. Nothing downstream re-sanitises what you return.",
    "params": [
      {
        "name": "meta",
        "type": "array",
        "desc": "The sanitised lesson meta."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson being saved."
      }
    ],
    "returns": "`array` — merged over the lesson's existing meta by the caller.",
    "related": [
      "fluent_community/lesson/get_public_meta",
      "fluent_community/lesson/update_data"
    ]
  },
  "fluent_community/lesson/update_data": {
    "summary": "Filters the attributes about to be written when a lesson is saved.",
    "details": "The array has already been through `array_filter()`, so empty values were dropped — with one deliberate exception, `message`, which is added afterwards precisely so that clearing a lesson body still saves. The `meta` value has already passed through `fluent_community/lesson/sanitize_meta` and been merged over the lesson's existing meta. What you return determines the dirty check, and therefore whether `fluent_community/lesson/updated` fires at all.",
    "params": [
      {
        "name": "updateData",
        "type": "array",
        "desc": "`title`, `status`, `meta`, and `message` when the request supplied one."
      },
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson before the new values are filled."
      }
    ],
    "returns": "`array` — attributes filled onto the model.",
    "related": [
      "fluent_community/lesson/sanitize_meta",
      "fluent_community/lesson/updated"
    ]
  },
  "fluent_community/lesson/updated": {
    "summary": "Fires after a lesson is saved from the admin editor with at least one changed column.",
    "details": "Guarded by a dirty check, so a save that changes nothing is silent — but note the companion action `fluent_community/lesson/additional_media_updated` fires unconditionally straight after, even on a no-op save. The third argument saves you comparing statuses yourself: it is `true` only when this save moved the lesson to `published` from something else.",
    "params": [
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The lesson after saving."
      },
      {
        "name": "dirtyFields",
        "type": "array",
        "desc": "Changed attributes keyed by column, from `getDirty()`."
      },
      {
        "name": "isNewlyPublished",
        "type": "bool",
        "desc": "Whether this save published a previously unpublished lesson."
      }
    ],
    "related": [
      "fluent_community/lesson/update_data",
      "fluent_community/lesson/additional_media_updated"
    ]
  },
  "fluent_community/lesson/video_watched": {
    "summary": "Fires the first time a student watches enough of a gated lesson video to unlock completion.",
    "details": "Backed by a watched record, so it fires once per student per lesson; a student who re-watches, or whose existing record is merely reactivated, does not fire it again. Watching the video is not the same as completing the lesson — completion is a separate call that this hook only unblocks.",
    "params": [
      {
        "name": "lesson",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The gated lesson."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the student."
      }
    ],
    "related": [
      "fluent_community/is_allowed_to_complete_lesson",
      "fluent_community/lesson_video_gate/default_threshold"
    ]
  },
  "fluent_community/lesson_video_gate/auto_complete_delay": {
    "summary": "Filters how many seconds pass after a video ends before the lesson auto-completes.",
    "details": "Defaults to 3 and only matters on lessons that both enable the media block with a FluentPlayer video and turn on `auto_complete_on_video_end`. The value is cast with `(int)`; a negative return reverts to the default, while `0` is honoured and completes the lesson immediately. It is consumed by the browser-side tracker, so changes take effect on the next page load.",
    "params": [
      {
        "name": "delay",
        "type": "int",
        "desc": "Delay in seconds, 3 by default."
      }
    ],
    "returns": "`int` — cast to an integer; negative values fall back to 3.",
    "related": [
      "fluent_community/lesson_video_gate/default_threshold"
    ]
  },
  "fluent_community/lesson_video_gate/default_threshold": {
    "summary": "Filters the percentage of a video a student must watch when a lesson sets no threshold of its own.",
    "details": "Defaults to 80. The return value is cast with `(int)`, then clamped: anything at or below zero falls back to 80, and anything above 100 becomes 100. A per-lesson `video_completion_threshold` always wins over this. The resolved figure is used both by the server-side gate and by the front-end tracker, which reads it from the injected `fcomLessonVideoGate` variables.",
    "params": [
      {
        "name": "threshold",
        "type": "int",
        "desc": "Watch percentage required, 80 by default."
      }
    ],
    "returns": "`int` — cast and clamped to 1–100; non-positive values revert to the 80 default.",
    "related": [
      "fluent_community/lesson_video_gate/auto_complete_delay",
      "fluent_community/is_allowed_to_complete_lesson"
    ]
  },
  "fluent_community/lockscreen_fields": {
    "summary": "Filters the field definitions that make up a space's lock screen.",
    "details": "Each entry has a `name`, a `type` such as `block` or `image`, and the presentation keys for that type. Core's own callback runs at priority 10 and removes fields whose owning plugin is inactive, matching on `name` — `paywall` without FluentCart and `welcome_banner` without Pro — so register additions at a later priority if you want them to survive. In view-only mode `block` content has already been passed through `the_content` and the smart-code parser.",
    "params": [
      {
        "name": "fields",
        "type": "array",
        "desc": "The lock-screen field definitions."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space the lock screen belongs to."
      }
    ],
    "returns": "`array` — a list of field definitions. Return a re-indexed list; the core callback uses `array_values()`.",
    "related": [
      "fluent_community/lockscreen_formatted_field",
      "fluent_community/get_lockscreen_settings"
    ]
  },
  "fluent_community/lockscreen_formatted_field": {
    "summary": "Filters one lock-screen field after it has been sanitised for storage.",
    "details": "Runs once per submitted field on save. The core sanitiser only keeps a fixed set of keys — the text and colour fields, `button_link` as a URL, `hidden`, `content` for block fields and `background_image` — so any custom key you added on the read side is dropped before this filter and must be re-attached here. The second argument is the raw submitted field, which is where you will find it.",
    "params": [
      {
        "name": "formattedField",
        "type": "array",
        "desc": "The sanitised field, ready to store."
      },
      {
        "name": "value",
        "type": "array",
        "desc": "The raw submitted field, including keys the sanitiser dropped."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space being saved."
      }
    ],
    "returns": "The field array to store.",
    "related": [
      "fluent_community/lockscreen_fields"
    ]
  },
  "fluent_community/main_menu_items": {
    "summary": "Filters the primary navigation items above the space list in the portal sidebar.",
    "details": "Applied at two call sites that both start from the stored `mainMenuItems` group: the sidebar data builder and the server-side header renderer. Items are keyed by slug — `all_feeds`, `spaces` and so on — and the core Course module removes its own entry through this filter when the course feature is off. The mobile bottom bar reads `all_feeds` and `spaces` out of the unfiltered group, so removing an item here does not remove it from mobile; use `fluent_community/mobile_menu` for that.",
    "params": [
      {
        "name": "items",
        "type": "array",
        "desc": "Menu items keyed by slug, each with `title`, `shape_svg` and route data."
      },
      {
        "name": "scope",
        "type": "string",
        "desc": "Where the menu is being built; `sidebar` from the sidebar builder."
      }
    ],
    "returns": "`array` — the item map, keyed by slug.",
    "related": [
      "fluent_community/mobile_menu",
      "fluent_community/menu_groups",
      "fluent_community/sidebar_menu_groups_config"
    ]
  },
  "fluent_community/managed/after_remove": {
    "summary": "Fires after a user's community manager roles have been deleted.",
    "details": "The paired action for `manager/before_remove`. The segment is spelled `managed` rather than `manager`, which looks like a typo but is part of the public surface; the role row no longer exists by the time this runs.",
    "params": [
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The demoted user."
      }
    ],
    "related": [
      "fluent_community/manager/before_remove"
    ]
  },
  "fluent_community/manager/added": {
    "summary": "Fires when a user is given community manager roles for the first time.",
    "details": "Fires only on first assignment — updating an existing manager fires fluent_community/manager/updated instead. The roles array has already been normalised: \"admin\" collapses the list to just [\"admin\"], and course_creatror is dropped when course_admin is also present.",
    "params": [
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The user, with community_role freshly loaded."
      },
      {
        "name": "roles",
        "type": "array",
        "desc": "Normalised list of role slugs."
      }
    ],
    "related": [
      "fluent_community/manager/updated",
      "fluent_community/manager/before_remove"
    ]
  },
  "fluent_community/manager/before_remove": {
    "summary": "Fires just before a user's community manager roles are deleted.",
    "details": "The community_role relation is still readable here, which is the only place to capture which roles are being taken away — the paired after-action runs once the row is gone. Note the after-action is named `managed/after_remove`, not `manager/after_remove`.",
    "params": [
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The manager being demoted, with community_role still loaded."
      }
    ],
    "related": [
      "fluent_community/managed/after_remove"
    ]
  },
  "fluent_community/manager/updated": {
    "summary": "Fires when an existing community manager's roles change.",
    "details": "Guarded by a value comparison, so re-saving the same set of roles fires nothing. The roles have already been normalised the same way as on add.",
    "params": [
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The manager being updated."
      },
      {
        "name": "roles",
        "type": "array",
        "desc": "The new normalised list of role slugs."
      }
    ],
    "related": [
      "fluent_community/manager/added"
    ]
  },
  "fluent_community/max_comment_char_length": {
    "summary": "Filters the maximum number of characters allowed in a comment or reply.",
    "details": "Defaults to 10000 and, like the post limit, is measured with `strlen()` on the Markdown source, so it is a byte count. Exceeding it throws a 422 before the comment is stored. It applies to both new comments and edits, since both run through the same validation routine.",
    "params": [
      {
        "name": "maxLength",
        "type": "int",
        "desc": "The byte ceiling for a comment body, 10000 by default."
      }
    ],
    "returns": "`int` — the maximum length.",
    "related": [
      "fluent_community/max_post_length"
    ]
  },
  "fluent_community/max_execution_time": {
    "summary": "Filters the number of seconds a batched background job may run before re-scheduling itself.",
    "details": "The default is derived from PHP's `max_execution_time`: unlimited or unreadable becomes 60, the value is capped at 58, and three seconds of headroom are subtracted — so a typical site sees 27 or 55. Email digests, post and comment notifications and the moderation mailers all compare their elapsed time against it and queue a fresh Action Scheduler task when they exceed it. Returning a value larger than the real PHP limit risks jobs being killed mid-batch, which loses the resume point.",
    "params": [
      {
        "name": "maxRunTime",
        "type": "int",
        "desc": "Seconds of budget for a batch, already capped and reduced by three."
      }
    ],
    "returns": "`int` — seconds. It is not re-clamped, so the cap and the headroom are yours to respect.",
    "related": [
      "fluent_community_send_daily_digest"
    ]
  },
  "fluent_community/max_media_per_post": {
    "summary": "Filters how many media items may be attached to a single post.",
    "details": "Applied twice with the same default from the customiser settings (4): once inside `portal_vars`, where the composer uses it to stop accepting further images, and once in `FeedsHelper` where surplus items are trimmed with `array_slice()`. Filter it unconditionally so both agree — raising only the client-side value results in silently discarded attachments. A value of `0` hides the attachment button altogether.",
    "params": [
      {
        "name": "maxMedia",
        "type": "int",
        "desc": "Maximum media items per post; comes from the `max_media_per_post` customiser setting, default 4."
      }
    ],
    "returns": "`int` — the cap. It is cast with `(int)` before the server-side trim.",
    "related": [
      "fluent_community/portal_vars"
    ]
  },
  "fluent_community/max_per_page": {
    "summary": "Filters the ceiling on how many items a paginated portal endpoint will return.",
    "details": "Defaults to 100 and is applied identically in the feeds and activities endpoints, where the requested `per_page` is clamped with `min($maxPerPage, max(1, $perPage))`. The result is cast with `(int)` and an effective `0` falls back to 100, so the limit cannot be removed by returning nothing — return a large number instead. It bounds only these two endpoints; other list endpoints use the framework's own pagination defaults.",
    "params": [
      {
        "name": "maxPerPage",
        "type": "int",
        "desc": "The per-page ceiling, 100 by default."
      }
    ],
    "returns": "`int` — cast to an integer; a falsy result reverts to 100."
  },
  "fluent_community/max_post_length": {
    "summary": "Filters the maximum number of characters allowed in a post body.",
    "details": "Defaults to 15000 and is enforced server-side in `FeedsHelper::sanitizeAndValidateData()`; exceeding it throws and the post is rejected. The check uses `strlen()` on the Markdown source, so it counts bytes rather than characters — multibyte content hits the ceiling sooner than the number suggests, and inline image syntax counts towards it.",
    "params": [
      {
        "name": "maxLength",
        "type": "int",
        "desc": "The byte ceiling for a post body, 15000 by default."
      }
    ],
    "returns": "`int` — the maximum length. There is no matching client-side limit, so this is the only enforcement point.",
    "related": [
      "fluent_community/max_comment_char_length"
    ]
  },
  "fluent_community/max_profile_description_length": {
    "summary": "Filters the maximum length of a member's profile bio.",
    "details": "Defaults to 5000 and is measured with `strlen()` on the sanitised markdown, so it counts bytes rather than characters — multi-byte text hits the limit sooner than the number suggests. Note the headline limit next to it uses `mb_strlen()` instead. Exceeding it returns a validation error rather than truncating.",
    "params": [
      {
        "name": "maxDescriptionLength",
        "type": "int",
        "desc": "Maximum bio length in bytes, 5000 by default."
      }
    ],
    "returns": "`int` — the limit.",
    "related": [
      "fluent_community/max_profile_headline_length"
    ]
  },
  "fluent_community/max_profile_headline_length": {
    "summary": "Filters the maximum length of a member's profile headline.",
    "details": "Defaults to 60 and is measured with `mb_strlen()`, so it is a true character count — unlike the bio limit alongside it. Exceeding it returns a validation error rather than truncating. The headline is stored in `xprofile.meta`, so there is no column width forcing the value down.",
    "params": [
      {
        "name": "maxHeadlineLength",
        "type": "int",
        "desc": "Maximum headline length in characters, 60 by default."
      }
    ],
    "returns": "`int` — the limit.",
    "related": [
      "fluent_community/max_profile_description_length"
    ]
  },
  "fluent_community/maybe_delete_draft_medias": {
    "summary": "Fires hourly to clean up media that was uploaded but never attached to anything.",
    "details": "Dispatched from the `fluent_community_scheduled_hour_jobs` handler. The core callback removes at most 30 inactive media rows older than two hours per run, so a large backlog drains over several hours. The two-hour grace period is what lets a member leave a composer open without losing their upload. It takes no arguments.",
    "related": [
      "fluent_community_scheduled_hour_jobs",
      "fluent_community/handle_remove_bulk_media"
    ]
  },
  "fluent_community/media_public_url_{this}": {
    "summary": "Filters the public URL of a media item, named after its storage driver.",
    "details": "The suffix is `$media->driver`, giving `fluent_community/media_public_url_local` and `fluent_community/media_public_url_s3`. It backs the `public_url` accessor, so it runs every time a media URL is read — several times per post in a feed listing — and must stay free of network calls and queries. Nothing in either plugin registers on it by default; the signed variant is the one Pro cloud storage uses.",
    "params": [
      {
        "name": "mediaUrl",
        "type": "string",
        "desc": "The stored URL."
      },
      {
        "name": "media",
        "type": "\\FluentCommunity\\App\\Models\\Media",
        "desc": "The media row."
      }
    ],
    "returns": "`string` — an absolute URL.",
    "related": [
      "fluent_community/media_signed_public_url_{this}"
    ]
  },
  "fluent_community/media_signed_public_url_{this}": {
    "summary": "Filters the time-limited URL of a media item, named after its storage driver.",
    "details": "The suffix is `$media->driver`; Pro's cloud storage registers `fluent_community/media_signed_public_url_s3` to mint a pre-signed S3 URL. Unlike the plain public URL this is only requested where a temporary link is wanted, such as document downloads. The default expiry is an hour and arrives as the third argument in seconds; with no handler the unsigned stored URL is returned unchanged, which means no expiry at all.",
    "params": [
      {
        "name": "mediaUrl",
        "type": "string",
        "desc": "The stored URL."
      },
      {
        "name": "media",
        "type": "\\FluentCommunity\\App\\Models\\Media",
        "desc": "The media row."
      },
      {
        "name": "time",
        "type": "int",
        "desc": "Requested validity in seconds, 3600 by default."
      }
    ],
    "returns": "`string` — an absolute URL.",
    "related": [
      "fluent_community/media_public_url_{this}"
    ]
  },
  "fluent_community/media_upload_data": {
    "summary": "Filters the attributes used to create a media row just before it is written.",
    "details": "The last point at which an upload can be redirected or rejected — Pro's Cloud Storage module rewrites `driver`, `media_path` and `media_url` here to push the file offsite. Returning a `WP_Error` surfaces its message to the uploader, and returning anything falsy aborts the upload with a generic error, so this doubles as an upload veto. It is applied by four separate upload endpoints (feed media, generic uploads, FluentPlayer and Pro documents), which all pass the same shape.",
    "params": [
      {
        "name": "mediaData",
        "type": "array",
        "desc": "Attributes for the new media row: `media_type`, `driver`, `media_path`, `media_url`, `settings`."
      },
      {
        "name": "file",
        "type": "array",
        "desc": "The processed upload, including `path`, `url`, `type` and a `meta` array of image dimensions."
      }
    ],
    "returns": "`array` — the attributes to create the media row with. Return a `WP_Error` to reject the upload with a message, or a falsy value to reject it generically.",
    "related": [
      "fluent_community/support_attachment_types",
      "fluent_community/upload_folder_name"
    ]
  },
  "fluent_community/media_upload_max_file_size": {
    "summary": "Filters the numeric part of the upload size limit.",
    "details": "Paired with `fluent_community/media_upload_max_file_unit`, which supplies `MB` or `GB`; the two are multiplied into a kilobyte figure for the validator, so changing one without the other silently rescales the limit. The default is 100 at the media upload endpoint. A second call site in `UploadHelper::processUpload()` passes a caller-supplied default of 10, but that method has no callers in either plugin. This is only FluentCommunity's own check — the PHP and server upload limits still apply first.",
    "params": [
      {
        "name": "maxFileSize",
        "type": "int",
        "desc": "The size number, 100 at the live call site."
      }
    ],
    "returns": "`int` — the size, interpreted in the unit returned by `fluent_community/media_upload_max_file_unit`.",
    "related": [
      "fluent_community/media_upload_max_file_unit"
    ]
  },
  "fluent_community/media_upload_max_file_unit": {
    "summary": "Filters the unit the upload size limit is expressed in.",
    "details": "Compared case-insensitively against `MB` and `GB`; anything else is treated as kilobytes, since the size is passed to the validator unmultiplied. The returned string is also interpolated into the error message shown to the member, so it should stay short. Defaults to `MB` at the live call site.",
    "params": [
      {
        "name": "maxFileUnit",
        "type": "string",
        "desc": "`MB` by default."
      }
    ],
    "returns": "`string` — `MB`, `GB`, or any other value to have the size read as kilobytes.",
    "related": [
      "fluent_community/media_upload_max_file_size"
    ]
  },
  "fluent_community/media_upload_max_width_{context}": {
    "summary": "Filters the maximum width an uploaded image is resized to, scoped to the upload context.",
    "details": "The suffix is the `context` sent with the upload request — the portal uses values such as `avatar`, `cover_photo` and `feed` — and the filter is skipped entirely when no context is supplied. It only takes effect when resizing is on and the source image is genuinely wider than the returned value; a width of 0 disables resizing for that context. Resized images are re-saved at quality 90.",
    "params": [
      {
        "name": "maxWidth",
        "type": "int",
        "desc": "The width from the request, often empty."
      },
      {
        "name": "file",
        "type": "array",
        "desc": "The uploaded file descriptor."
      }
    ],
    "returns": "`int` — the maximum width in pixels. 0 or a falsy value skips resizing.",
    "related": [
      "fluent_community/media_upload_resize",
      "fluent_community/convert_image_to_webp"
    ]
  },
  "fluent_community/media_upload_resize": {
    "summary": "Filters whether an uploaded image is resized at all.",
    "details": "The two call sites disagree on the default, which is worth knowing before you write a callback. At the media upload endpoint the incoming value is the request's raw `resize` parameter, so it is falsy unless the client asked for resizing; in `UploadHelper::processUpload()` it is the inverse of the `resize` option, so it is true by default — but that method has no callers in either plugin. Resizing also requires a non-zero max width, and WebP conversion only happens as part of a resize.",
    "params": [
      {
        "name": "willResize",
        "type": "mixed",
        "desc": "The request's `resize` value at the live call site; not cast to bool."
      },
      {
        "name": "file",
        "type": "array",
        "desc": "The uploaded file descriptor."
      }
    ],
    "returns": "Truthy to permit resizing. The value is only tested for truthiness, so a non-empty string works.",
    "related": [
      "fluent_community/media_upload_max_width_{context}",
      "fluent_community/convert_image_to_webp"
    ]
  },
  "fluent_community/members_api_response": {
    "summary": "Filters the members-directory listing response.",
    "details": "Reached only after the members page permission check passes and only on the non-mention branch — the @-mention autocomplete returns through `fluent_community/mention_members_api_response` instead. Moderators may additionally filter by status; everyone else is held to active profiles. Note the paginator is passed again as the second argument, and the request data is third.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `members` paginator and `execution_time`."
      },
      {
        "name": "members",
        "type": "mixed",
        "desc": "The paginated XProfile result, also present inside the payload."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/members_query_ref",
      "fluent_community/mention_members_api_response"
    ]
  },
  "fluent_community/members_query_ref": {
    "summary": "Passes the members-directory query by reference before it is paginated.",
    "details": "Fired with `do_action_ref_array()`, so take `&$query` and mutate it — a return value is ignored. It runs after sorting, search and status scoping, and immediately before `paginate()`. The mention-autocomplete branch of the same endpoint returns earlier and never reaches this hook, so anything you add here does not affect who can be @-mentioned.",
    "params": [
      {
        "name": "members",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Builder",
        "desc": "The XProfile query, passed by reference."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "related": [
      "fluent_community/members_api_response",
      "fluent_community/mention_members_api_response"
    ]
  },
  "fluent_community/mention_members_api_response": {
    "summary": "Filters the @-mention autocomplete results.",
    "details": "A separate early-return branch of the members endpoint, triggered by a `mention` query parameter. It requires a logged-in viewer, is capped at ten active profiles, always excludes the viewer, and is scoped to the space when one is supplied — with membership of that space enforced first. It does not pass through `fluent_community/members_query_ref` or the members page permission check.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: a `members.data` list and `execution_time`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `mention` and the space."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/members_api_response"
    ]
  },
  "fluent_community/menu_groups": {
    "summary": "Filters the assembled menu group structure used to render the sidebar.",
    "details": "Applied only when the menu is built with the `view` context, so the admin menu-settings screen — which uses the editing context — never sees it. By this point links have already been filtered for accessibility against the current user. The array holds four keys: `mainMenuItems`, `profileDropdownItems`, `beforeCommunityMenuItems` and `afterCommunityLinkGroups`.",
    "params": [
      {
        "name": "menuGroups",
        "type": "array",
        "desc": "The four menu groups: `mainMenuItems`, `profileDropdownItems`, `beforeCommunityMenuItems`, `afterCommunityLinkGroups`."
      }
    ],
    "returns": "`array` — the group map. Removing a key will break the sidebar builder, which reads all four.",
    "related": [
      "fluent_community/main_menu_items",
      "fluent_community/menu_settings_api_response"
    ]
  },
  "fluent_community/menu_groups_for_user": {
    "summary": "Filters the space groups and their spaces as shown in one member's sidebar.",
    "details": "Runs after per-viewer visibility has been applied: secret spaces the viewer does not belong to are removed entirely, private spaces they are not in are marked `show_lock`, and groups left with no visible spaces are dropped unless the viewer moderates the space. Each group carries `id`, `title`, `slug`, `logo` and a `children` list. Adding an entry here bypasses those checks, so re-apply them yourself.",
    "params": [
      {
        "name": "formattedGroups",
        "type": "array",
        "desc": "The visible space groups, each with a `children` list of spaces."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The viewing member, or `null` for a guest."
      }
    ],
    "returns": "`array` — the group list.",
    "related": [
      "fluent_community/menu_groups",
      "fluent_community/sidebar_menu_groups_config"
    ]
  },
  "fluent_community/menu_items_api_response": {
    "summary": "Filters the sidebar navigation payload the portal fetches to refresh its menu.",
    "details": "The payload is the output of `Utility::getPortalSidebarData('sidebar')` unwrapped — `primaryItems`, `spaceGroups`, `settingsItems`, `topInlineLinks`, `bottomLinkGroups`, `is_admin`, `has_color_scheme` and `context` — not a payload with a `menu` key. The same structure is filtered one step earlier by `fluent_community/sidebar_menu_groups_config`, which is also used by the server-rendered sidebar; changes made here affect the REST refresh only.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The sidebar data structure."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The sidebar data array.",
    "related": [
      "fluent_community/sidebar_menu_groups_config",
      "fluent_community/main_menu_items"
    ]
  },
  "fluent_community/menu_settings_api_response": {
    "summary": "Filters the menu configuration returned to the admin menu-settings screen.",
    "details": "The editing counterpart of `fluent_community/menu_items_api_response`: it returns the stored configuration including disabled and privacy-restricted entries, because the screen must be able to re-enable them. Groups under `afterCommunityLinkGroups` have been normalised to `title`, `slug` and a re-indexed `items` list, and groups without a title are dropped.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `menuSettings` structure."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/menu_groups"
    ]
  },
  "fluent_community/mobile_menu": {
    "summary": "Filters the items in the portal's mobile bottom navigation bar.",
    "details": "Built independently of the sidebar: it looks up only `all_feeds` and `spaces` from the stored main menu, falling back to bundled SVGs when a custom icon is not set, then appends either a profile link or, for guests, a login link. Items are a flat, ordered list with `route`, `title` and `icon_svg`, and custom icons have already been through the SVG sanitiser — sanitise any markup you add yourself.",
    "params": [
      {
        "name": "mobileMenuItems",
        "type": "array",
        "desc": "Ordered items, each with `route` or `permalink`, `title` and `icon_svg`."
      },
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The viewing member, or `null` for a guest."
      },
      {
        "name": "context",
        "type": "string",
        "desc": "Render context; `headless` by default."
      }
    ],
    "returns": "`array` — the ordered item list.",
    "related": [
      "fluent_community/main_menu_items"
    ]
  },
  "fluent_community/new_feed_everybody_notification/email_sections": {
    "page": "notifications",
    "summary": "The same email-section injection for posts announced to every member with the \"everyone\" tag.",
    "details": "A separate call site from the space notification with an identical signature, because the two emails are assembled by different routines. A callback that should apply to both has to be attached to both hooks. Same marker substitution and the same per-recipient loop.",
    "params": [
      {
        "name": "sections",
        "type": "array",
        "desc": "`before_content` and `after_content`, both empty strings by default."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The recipient."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being announced."
      }
    ],
    "returns": "`array` — only `before_content` and `after_content` are read.",
    "related": [
      "fluent_community/new_feed_notification/email_sections"
    ]
  },
  "fluent_community/new_feed_notification/email_sections": {
    "page": "notifications",
    "summary": "Filters extra HTML injected into the per-space \"new post\" notification email.",
    "details": "The two strings are substituted into the `<!--email_content_before-->` and `<!--email_content_after-->` markers in the assembled template, so an empty value leaves the marker in place as an HTML comment. It is applied once per recipient inside the sending loop, with that recipient's user model, which makes per-user personalisation possible but also means the callback runs hundreds of times for a busy space — keep it cheap. The output is not escaped.",
    "params": [
      {
        "name": "sections",
        "type": "array",
        "desc": "`before_content` and `after_content`, both empty strings by default."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The recipient."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being announced."
      }
    ],
    "returns": "`array` — only the `before_content` and `after_content` keys are read, and only when non-empty.",
    "related": [
      "fluent_community/new_feed_everybody_notification/email_sections",
      "fluent_community/comment_notification/email_sections"
    ]
  },
  "fluent_community/notification/comment/notifed_to_author": {
    "summary": "Fires after the post author has been notified about a new comment.",
    "details": "Takes a single associative array rather than positional arguments — the shape is shared by all four `notification/comment/*` hooks, and `key` repeats the hook name so one callback can serve several. Skipped when the commenter is the author, and skipped when the author was @-mentioned, in which case `fluent_community/notification/comment/notifed_to_mentions` covers them instead. `created` distinguishes a new notification row from an existing one that was updated and marked unread again. The bundled push notification module listens here.",
    "params": [
      {
        "name": "eventData",
        "type": "array",
        "desc": "Keys: `user_ids`, `notification` (a `Notification` model), `key`, `comment`, `feed`, `created`."
      }
    ],
    "related": [
      "fluent_community/notification/comment/notifed_to_mentions",
      "fluent_community/notification/comment/notifed_to_thread_commetenter"
    ]
  },
  "fluent_community/notification/comment/notifed_to_mentions": {
    "summary": "Fires after the users @-mentioned in a comment have been notified.",
    "details": "Runs for both top-level comments and replies, and always creates a fresh notification rather than updating an existing one, so there is no `created` key in the payload. It runs before the author and thread notifications, and mentioned users are then subtracted from those recipient lists, so a mentioned reader gets exactly one notification.",
    "params": [
      {
        "name": "eventData",
        "type": "array",
        "desc": "Keys: `user_ids`, `notification` (a `Notification` model), `key`, `comment`, `feed`."
      }
    ],
    "related": [
      "fluent_community/notification/comment/notifed_to_author"
    ]
  },
  "fluent_community/notification/comment/notifed_to_other_users": {
    "summary": "Fires after other participants on a post have been notified about a new top-level comment.",
    "details": "The odd one out of the four. Its `notification` value is the raw attribute array used as a template, not a `Notification` model — a separate row is created per recipient — so code that reads `$notification->content` will fatal here. It only runs for top-level comments, never replies, and the bundled push notification module deliberately leaves it unsubscribed. `user_ids` merges freshly notified users with subscribers of pre-existing notifications that were refreshed.",
    "params": [
      {
        "name": "eventData",
        "type": "array",
        "desc": "Keys: `user_ids`, `key`, `notification` (a plain attribute array, not a model), `comment`, `feed`."
      }
    ],
    "related": [
      "fluent_community/notification/comment/notifed_to_author"
    ]
  },
  "fluent_community/notification/comment/notifed_to_thread_commetenter": {
    "summary": "Fires after participants in a reply thread have been notified of a new reply.",
    "details": "Note the misspelling in the hook name; it is part of the public surface and is documented as written. Only reached for replies, that is comments with a `parent_id`. Two call sites: one updates an existing `child_comment_added` notification and re-marks it unread, the other creates a new one. Neither passes a `created` key, so compare `$notification->wasRecentlyCreated` if you need to tell them apart.",
    "params": [
      {
        "name": "eventData",
        "type": "array",
        "desc": "Keys: `user_ids`, `notification` (a `Notification` model), `key`, `comment`, `feed`."
      }
    ],
    "related": [
      "fluent_community/notification/comment/notifed_to_author"
    ]
  },
  "fluent_community/notifications_api_response": {
    "summary": "Filters the paginated notification listing response.",
    "details": "Serves the full notification centre, ordered by `updated_at` descending — notifications are coalesced and bumped rather than duplicated, so the order reflects last activity, not creation. `unread_count` is a separate query over all unread notifications and is unaffected by the status or type filter applied to the list itself.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `notifications` paginator and `unread_count`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `status` and `notification_type`."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/unread_notifications_api_response"
    ]
  },
  "fluent_community/notify_profile_feed_new_post": {
    "summary": "Action Scheduler task that emails a member's followers about a new profile post.",
    "details": "Pro-only, part of the Followers module. Scheduled two minutes after a profile post is published by the `fluent_community/profile_feed/created` listener, and re-scheduled by the handler in batches, so it fires more than once for a busy author. The second argument is the cursor into the follower list; it is 0 on the first run.",
    "params": [
      {
        "name": "feedId",
        "type": "int",
        "desc": "ID of the profile post."
      },
      {
        "name": "lastUserId",
        "type": "int",
        "desc": "Highest follower ID already mailed; 0 on the first batch."
      }
    ],
    "related": [
      "fluent_community/profile_feed/created"
    ]
  },
  "fluent_community/on_wp_init": {
    "summary": "Fires on WordPress `init`, after the FluentCommunity application has been bootstrapped.",
    "details": "Registered from inside the `fluent_community/portal_loaded` callback, so it always runs after every core and Pro module has had a chance to register. Use it for anything that must wait for `init` — rewrite rules, registered types, or code that needs the current user.",
    "params": [
      {
        "name": "app",
        "type": "\\FluentCommunity\\Framework\\Foundation\\Application",
        "desc": "The plugin application container."
      }
    ],
    "related": [
      "fluent_community/portal_loaded"
    ]
  },
  "fluent_community/onboarding_settings_api_response": {
    "summary": "Filters the payload of the first-run onboarding wizard.",
    "details": "Built from the general settings plus a detection pass for the other Fluent plugins (`has_fluentcrm`, `has_fluentsmtp`, `has_fluentcart`) and matching `install_*` defaults of `yes`, so the wizard offers to install them. It also embeds the current administrator's name and email address for the newsletter opt-in, both of which default to being sent — filter them out if that is not wanted.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `settings` key holding the wizard state."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body."
  },
  "fluent_community/paywall_added": {
    "summary": "Fires after a FluentCart product is attached to a space or course as a paywall.",
    "details": "The product ID is already stored in the space's `settings.cart_product_ids` by the time it runs. Core answers by finding or creating the product's FluentCommunity integration feed so that a paid order grants access — which is why the paywall works at all. It requires FluentCart; without it the whole route group is absent.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space or course being paywalled."
      },
      {
        "name": "productId",
        "type": "int",
        "desc": "The FluentCart product ID."
      }
    ],
    "related": [
      "fluent_community/paywall_removed",
      "fluent_community/product_integration_feed_created"
    ]
  },
  "fluent_community/paywall_removed": {
    "summary": "Fires after a FluentCart product is detached from a space or course.",
    "details": "The third argument is the raw request payload, and core reads one key from it: unless `revoke_access` is exactly `yes`, the core handler returns immediately and the product's integration feed keeps granting access to the space even though the paywall is gone. Detaching and revoking are separate decisions, in other words.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space or course the paywall was removed from."
      },
      {
        "name": "productId",
        "type": "int",
        "desc": "The FluentCart product ID."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload; `revoke_access` decides whether the integration feed is updated."
      }
    ],
    "related": [
      "fluent_community/paywall_added",
      "fluent_community/product_integration_feed_updated"
    ]
  },
  "fluent_community/pinned_posts_api_response": {
    "summary": "Filters the pinned or trending posts shown alongside the activity list.",
    "details": "The first argument is a flat list of at most five items, each with `id`, `message` (a 100-character excerpt), `permalink`, `xprofile` and `created_at` — not a wrapped payload. The same filter serves two different queries: with `$isTrending` true and no space it returns the last seven days ordered by engagement, otherwise it returns posts explicitly flagged with `priority = 1`. Both arguments can be `null`/`false` on the global activity feed.",
    "params": [
      {
        "name": "posts",
        "type": "array",
        "desc": "The formatted pinned posts, at most five."
      },
      {
        "name": "spaceId",
        "type": "int",
        "desc": "The space being listed, or `null` for the global activity feed."
      },
      {
        "name": "isTrending",
        "type": "bool",
        "desc": "Whether the trending query was used rather than the pinned query."
      }
    ],
    "returns": "The list of formatted posts.",
    "related": [
      "fluent_community/activities_api_response"
    ]
  },
  "fluent_community/portal/not_logged_in": {
    "summary": "Fires when a logged-out visitor hits a portal URL on a community that is not publicly accessible.",
    "details": "The redirect happens on the next line and is followed by `exit()`, so a callback cannot cancel it or change the destination — this is a notification hook, useful for logging or for setting a cookie before the visitor leaves. `$authUrl` is either the administrator-configured external auth URL or the internal auth page with a `redirect_to` back to the requested path.",
    "params": [
      {
        "name": "authUrl",
        "type": "string",
        "desc": "The URL the visitor is about to be sent to."
      }
    ],
    "related": [
      "fluent_community/portal/viewed",
      "fluent_community/auth/login_url"
    ]
  },
  "fluent_community/portal/viewed": {
    "summary": "Fires once per portal page load, after access checks pass and before the app data is assembled.",
    "details": "Takes no arguments and does not tell you who is viewing — resolve the current user yourself. It runs after the logged-out redirect, so a guest only reaches it on a publicly accessible portal, and after the pending, deactivated and role checks, which end the request on their own error page. REST API traffic from the SPA does not fire it; this is the full-page render only.",
    "related": [
      "fluent_community/portal/not_logged_in",
      "fluent_community/portal_render_for_user"
    ]
  },
  "fluent_community/portal_action_{action}": {
    "summary": "Dynamic action fired for the value of the `fcom_action` query parameter on any portal URL.",
    "details": "This is the plugin's front-controller extension point: `?fcom_action=my_thing` on a portal URL fires `fluent_community/portal_action_my_thing`. It runs at the very top of `renderFullApp()` — before the logged-out redirect, before the profile-status checks and before the role gate — so a handler receives completely unauthenticated requests and must do its own capability and nonce checks. Core registers `auth`, `signed_url` and `reactivate_account`; Pro adds `download_document` and `incoming_webhook`. The action name comes straight from the request and is sanitised with `sanitize_text_field()`.",
    "params": [
      {
        "name": "requestData",
        "type": "array",
        "desc": "The raw `$_GET` superglobal, unsanitised."
      }
    ],
    "related": [
      "fluent_community/rendering_path_ssr_{pathParts}"
    ]
  },
  "fluent_community/portal_data_vars": {
    "summary": "Filters the render payload for a portal page: title, meta, asset lists and inline JavaScript variables.",
    "details": "This is the server-side sibling of `fluent_community/portal_vars`, which it already contains under `js_vars.fluentComAdmin`. It is the supported way to add a stylesheet or module script to the portal, since headless rendering ignores `wp_enqueue_style()`; add entries to the `css_files` and `js_files` maps, each keyed by handle with a `url` (and `deps` for scripts). Core swaps the whole bundle for the admin application here when `route_group` is `admin`, and the lesson video gate injects its tracker at priority 11 — register later than that if you need to see the final list.",
    "params": [
      {
        "name": "dataVars",
        "type": "array",
        "desc": "The render payload: `title`, `og_title`, `description`, `featured_image`, `css_files`, `js_files`, `header_js_files`, `js_vars`, `route_group`, `current_route`, `theme_color`."
      }
    ],
    "returns": "`array` — the payload. `portal_page.php` reads several keys unconditionally, so merge rather than replace.",
    "related": [
      "fluent_community/portal_vars",
      "fluent_community/before_portal_rendered"
    ]
  },
  "fluent_community/portal_footer": {
    "summary": "Prints near the end of `<body>` on the standalone portal page, after the SPA scripts.",
    "details": "Fires from `app/Views/portal_page.php` and from the Pro portal shortcode, and runs before `wp_footer()` on non-headless renders. Core hangs custom JS snippets and customiser output off it. The theme-framed portal uses `fluent_community/template_footer` instead.",
    "related": [
      "fluent_community/portal_head",
      "fluent_community/template_footer"
    ]
  },
  "fluent_community/portal_head": {
    "summary": "Prints inside the `<head>` of the standalone portal page, after the plugin's colour variables.",
    "details": "This is the SPA-only head hook: it fires from `app/Views/portal_page.php`, the template used when the portal renders itself rather than through a WordPress theme. For the theme-framed portal use `fluent_community/template_header` — Pro registers its custom CSS on both. Echo directly; there is no return value.",
    "related": [
      "fluent_community/template_header",
      "fluent_community/portal_footer"
    ]
  },
  "fluent_community/portal_head_meta": {
    "summary": "Prints inside `<head>` of the standalone portal page, among the SEO and Open Graph tags.",
    "details": "Fires only on the branch that skips `wp_head()` — that is, when `fluent_community/portal_page_headless` is left at its default `true`. Switch to classic rendering and this hook never runs, so anything essential should also be attached to `fluent_community/portal_head`, which fires on both branches. It sits after the `og:` and `twitter:` tags and before the canonical link and the JSON-LD block, so it is the right place for robots directives. Pro's sitemap module emits the `noindex` tag here.",
    "params": [
      {
        "name": "landingRoute",
        "type": "string",
        "desc": "The resolved route group for the request, for example `feed_view`, `course_view`, `user_profile`, or empty."
      }
    ],
    "related": [
      "fluent_community/portal_head",
      "fluent_community/render_default_touch_icon"
    ]
  },
  "fluent_community/portal_header": {
    "summary": "Renders the portal header bar for a given render context.",
    "details": "As with the sidebar, core attaches the default header renderer, so callbacks add to it. `$context` is `headless`, `wp`, or `block_editor`; unlike the sidebar there is no `ajax` context. To add items inside the default header rather than around it, use the finer-grained `fluent_community/before_header_menu_items` and `fluent_community/after_header_right_menu_items` hooks.",
    "params": [
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, or `block_editor`."
      }
    ],
    "related": [
      "fluent_community/portal_sidebar"
    ]
  },
  "fluent_community/portal_html": {
    "summary": "Renders the portal application markup inside the `.fluent_com` wrapper of the standalone portal page.",
    "details": "Core attaches the `portal.portal` view at the default priority, which draws the header, the sidebar column and the `#fluent_com_portal` mount point the Vue app takes over. Adding a callback appends to that markup; to replace the app shell entirely, remove the core action first. It fires from `app/Views/portal_page.php` only — the WordPress frame templates and the Gutenberg block build the same structure inline and do not fire it.",
    "related": [
      "fluent_community/before_portal_dom",
      "fluent_community/portal_header"
    ]
  },
  "fluent_community/portal_loaded": {
    "summary": "Fires on `plugins_loaded` once the FluentCommunity application container exists.",
    "details": "The earliest safe extension point: the container, helper functions and Action Scheduler are available, but WordPress `init` has not run, so do not register post types, taxonomies or translations here. Core loads its own `Modules/` from this hook and Pro bootstraps itself from it, which is why Pro modules are always available by the time `fluent_community/on_wp_init` runs.",
    "params": [
      {
        "name": "app",
        "type": "\\FluentCommunity\\Framework\\Foundation\\Application",
        "desc": "The plugin application container."
      }
    ],
    "related": [
      "fluent_community/on_wp_init"
    ]
  },
  "fluent_community/portal_notices": {
    "summary": "Filters the list of notice blocks shown above the main community feed.",
    "details": "Part of the `portal_vars` payload and empty by default. The Vue app renders each entry with `v-html` at the top of the all-feeds route only — not on space, course or profile pages — so entries must be complete, trusted HTML fragments and any user-supplied content in them must be escaped before it reaches the filter.",
    "params": [
      {
        "name": "notices",
        "type": "array",
        "desc": "HTML fragments to render, one per notice. Empty by default."
      }
    ],
    "returns": "`array` — a flat list of HTML strings.",
    "related": [
      "fluent_community/portal_vars"
    ]
  },
  "fluent_community/portal_page_headless": {
    "summary": "Filters whether the portal page renders without the WordPress theme head and footer.",
    "details": "Returns `false` from core, but `Modules\\FeaturesHandler` immediately adds `__return_true`, so headless is the effective default on every install. When it is true, `portal_page.php` skips `wp_head()` and `wp_footer()`, emits its own meta tags, and the assets are printed by hand from `fluent_community/rendering_headless_portal`. Return `false` to fall back to classic rendering, where WordPress enqueueing applies and theme and plugin head output reaches the portal. The name is unrelated to `app/Views/headless_page.php`, which is the auth page template.",
    "params": [
      {
        "name": "isHeadless",
        "type": "bool",
        "desc": "Whether to skip the WordPress head and footer. `false` in core, forced to `true` by `FeaturesHandler`."
      }
    ],
    "returns": "`bool` — the value is used in a truthy test. Returning `false` switches the portal to classic rendering.",
    "related": [
      "fluent_community/rendering_headless_portal",
      "fluent_community/portal_head_meta"
    ]
  },
  "fluent_community/portal_render_for_user": {
    "summary": "Fires on a full portal render for a signed-in member with an active profile.",
    "details": "Reached only after the status and role gates pass, and only when an `XProfile` exists — guests and blocked, pending or deactivated members never reach it. Core uses it to re-register the daily and hourly Action Scheduler jobs for site administrators, so it doubles as the plugin's \"someone is here, keep cron alive\" signal. Runs on every page load, so keep the work cheap.",
    "params": [
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The viewing member's profile."
      }
    ],
    "related": [
      "fluent_community/portal/viewed"
    ]
  },
  "fluent_community/portal_route_type": {
    "summary": "Filters whether portal routes are path-based or hash-based.",
    "details": "Defaults to `WebHistory`, the HTML5 history mode; the only other value the code understands is `hash`, which makes `Helper::baseUrl()` build `#/path` URLs and switches the Vue router to hash mode. It reaches the SPA as `portal_vars.routing_system`. Nothing in the shipped code returns `hash` — Pro's shortcode renderer used to, but its `register()` method returns before that filter is added, so the shortcode path is dead code.",
    "params": [
      {
        "name": "type",
        "type": "string",
        "desc": "`WebHistory` by default; `hash` for hash routing."
      }
    ],
    "returns": "`string` — `WebHistory` or `hash`. Any other value is treated as `WebHistory` by `Helper::baseUrl()` but passed to the router unchanged.",
    "related": [
      "fluent_community/base_url",
      "fluent_community/app_route_paths"
    ]
  },
  "fluent_community/portal_settings_menu_items": {
    "summary": "Filters the sections listed in the portal's admin settings navigation.",
    "details": "The default list is empty for anyone who is not a site administrator, so a callback that appends unconditionally will expose its entry to moderators and course admins as well — check `Helper::isSiteAdmin()` yourself. Entries are keyed by slug and carry `label`, `route` and an `icon_svg` string that is rendered as raw markup. The result travels to the admin SPA as `portalSettingsMenus`; the route must also exist in the Vue router or the entry will lead nowhere. Core's migration module adds its importer this way.",
    "params": [
      {
        "name": "menuItems",
        "type": "array",
        "desc": "Settings sections keyed by slug, each with `label`, `route` and `icon_svg`. Empty for non-administrators."
      }
    ],
    "returns": "`array` — the sections map, order preserved.",
    "related": [
      "fluent_community/portal_data_vars"
    ]
  },
  "fluent_community/portal_sidebar": {
    "summary": "Renders the portal's left sidebar navigation for a given render context.",
    "details": "Core attaches the sidebar renderer itself, so adding a callback appends to the sidebar rather than replacing it. The `$context` argument distinguishes where the sidebar is being drawn: `headless` for the SPA, `wp` for the theme frame templates, `block_editor` for the Gutenberg block in edit mode, and `ajax` when `OptionController::getSidebarMenuHtml()` buffers the markup for a client-side refresh.",
    "params": [
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, `block_editor`, or `ajax`."
      }
    ],
    "related": [
      "fluent_community/portal_header"
    ]
  },
  "fluent_community/portal_slug": {
    "summary": "Filters the URL segment the community portal is served from.",
    "details": "Runs after the stored setting and the `FLUENT_COMMUNITY_PORTAL_SLUG` constant have both been applied, so a callback overrides even the constant. An empty string puts the portal at the site root, which is how Pro's shortcode renderer temporarily relocates it. The slug feeds both rewrite rules and every generated portal URL, so changing it at runtime without flushing rewrites will produce links that do not resolve.",
    "params": [
      {
        "name": "slug",
        "type": "string",
        "desc": "The portal slug, `portal` by default."
      }
    ],
    "returns": "`string` — the slug, without leading or trailing slashes. An empty string serves the portal from the site root."
  },
  "fluent_community/portal_supported_query_params": {
    "summary": "Filters which query parameters make a root-level request count as a portal request.",
    "details": "Applies to one narrow case: a portal mounted at the site root, with an empty request path and a query string. Without a match the request falls through to the normal WordPress home page, which is what stops the portal swallowing every query-string URL on the site. Parameters beginning with `fcom_` are always accepted regardless of this list; the defaults add `customizer_panel` and `create_space`.",
    "params": [
      {
        "name": "supportedParams",
        "type": "array",
        "desc": "Query parameter names that identify a portal request. Cast to an array before use."
      }
    ],
    "returns": "`array` — a flat list of parameter names, compared with a strict `in_array()`.",
    "related": [
      "fluent_community/app_route_paths"
    ]
  },
  "fluent_community/portal_vars": {
    "summary": "Filters the complete configuration payload handed to the portal Vue application.",
    "details": "The main extension point for the front end: everything the SPA knows about the current user, enabled features, permissions, URLs and translated strings passes through here, and both core modules and Pro use it to bolt on their own keys. Several narrower filters are applied while this array is being built, so they run before any callback attached here and can be overridden from it. Two keys are added after the filter — `welcome_banner`, and `auth_url`/`allow_signup` for logged-out visitors — so they cannot be filtered here. The result is printed into the page, so do not add secrets.",
    "params": [
      {
        "name": "portalVars",
        "type": "array",
        "desc": "The portal configuration payload, including `auth`, `permissions`, `features`, `urls`, `i18n` and `rest`."
      }
    ],
    "returns": "`array` — the payload. Merge into it rather than replacing it; removing keys the SPA expects will break the portal.",
    "related": [
      "fluent_community/portal_notices",
      "fluent_community/date_time_i18n",
      "fluent_community/max_media_per_post"
    ]
  },
  "fluent_community/post_order_options": {
    "summary": "Filters the sort options offered for post listings.",
    "details": "Defaults to new activity, latest, oldest, popular, likes, alphabetical and unanswered. The keys do double duty: they populate the portal dropdowns and they are the whitelist `Feed::scopeCustomOrderBy()` and the sanitiser validate against, so removing a key stops that sort working everywhere. Adding a key makes it selectable and accepted, but the scope has no branch for it and falls through to `fluent_community/custom_order_by` — that is where you implement the ordering. Pro adds `following` this way. `$context` is `feed` or `user`.",
    "params": [
      {
        "name": "options",
        "type": "array",
        "desc": "Sort keys mapped to translated labels."
      },
      {
        "name": "context",
        "type": "string",
        "desc": "`feed` for space and global listings, `user` for profile feeds."
      }
    ],
    "returns": "`array` — an associative map of sort key to label, preserving order.",
    "related": [
      "fluent_community/custom_order_by",
      "fluent_community/comment_order_options"
    ]
  },
  "fluent_community/post_report_added_async": {
    "summary": "Action Scheduler task that emails moderators about a reported or auto-flagged post.",
    "details": "Queued in the `fluent-community` group as soon as the report is created, and re-queued by its own handler whenever the send loop approaches its run-time budget — so it can fire several times for one report, each time resuming after `$lastUserId`. Recipients are community admins and moderators with an active profile, and the reporting user is excluded. It returns silently if the report or its post has since been deleted. Pro-only.",
    "params": [
      {
        "name": "reportId",
        "type": "int",
        "desc": "ID of the moderation record."
      },
      {
        "name": "lastUserId",
        "type": "int",
        "desc": "Resume point: only users with a higher ID are mailed on this run. `0` first time."
      }
    ],
    "related": [
      "fluent_community/comment_report_added_async",
      "fluent_community/content_moderation/created"
    ]
  },
  "fluent_community/preview_metadata_pre_fetch": {
    "summary": "Lets a callback supply link-preview metadata instead of fetching the remote page.",
    "details": "Returning an array short-circuits the HTTP request entirely, and the value is written into the same object-cache entry the real fetch would have populated, for an hour by default. Only arrays are honoured: anything else, including a `WP_Error`, is ignored and the fetch proceeds. Use the same shape the parser produces — `title`, `image`, `description`, `icon`, `type`, `url` — since it is stored verbatim as the post's `meta.media_preview`. The cache is checked before this filter, so it does not run for a URL already cached.",
    "params": [
      {
        "name": "preempted",
        "type": "mixed",
        "desc": "`null` by default."
      },
      {
        "name": "url",
        "type": "string",
        "desc": "The URL being previewed, with any trailing slash removed."
      }
    ],
    "returns": "An `array` of metadata to bypass the remote fetch, or `null` to let it proceed. Non-array values are ignored.",
    "related": [
      "fluent_community/feed_oembed_api_response"
    ]
  },
  "fluent_community/privacy_settings_api_response": {
    "summary": "Filters the privacy settings screen payload.",
    "details": "Carries the visibility settings that the `fluent_community/can_view_*` filters read at runtime — profile page visibility, members page status, leaderboard member visibility and the self-deactivation switch. Changing values here changes the form, not the checks; filter the individual capability hooks to change behaviour.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `settings` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/can_view_members_page",
      "fluent_community/can_view_user_profile"
    ]
  },
  "fluent_community/pro_upgrade_base_url": {
    "summary": "Filters the destination of every \"Upgrade to Pro\" link in the portal.",
    "details": "Only the base URL passes through the filter; the UTM parameters are appended afterwards with `add_query_arg()`, so a query string of your own survives but the plugin's `utm_*` values are always added on top. Useful for pointing the links at a reseller or an internal page. Blank parameters are dropped before the URL is built.",
    "params": [
      {
        "name": "baseUrl",
        "type": "string",
        "desc": "The upgrade page URL, `https://fluentcommunity.co/pricing/` by default."
      }
    ],
    "returns": "`string` — an absolute URL. UTM parameters are appended to whatever you return."
  },
  "fluent_community/product_integration_feed_created": {
    "summary": "Fires when a new FluentCommunity integration feed is created on a FluentCart product.",
    "details": "Only reached when the product had no enabled FluentCommunity integration listening for `order_paid_done`; if one already existed, the space is appended to it and `fluent_community/product_integration_feed_updated` fires instead. Note the first argument can be `null` when the record could not be created, and that the arguments are IDs, not models — and that the second is the product ID here, where the update hook passes the space ID.",
    "params": [
      {
        "name": "integrationId",
        "type": "int",
        "desc": "ID of the created `ProductMeta` integration row, or `null` if creation failed."
      },
      {
        "name": "productId",
        "type": "int",
        "desc": "The FluentCart product the integration belongs to."
      }
    ],
    "related": [
      "fluent_community/product_integration_feed_updated",
      "fluent_community/paywall_added"
    ]
  },
  "fluent_community/product_integration_feed_updated": {
    "summary": "Fires when a space or course is added to or removed from a product's integration feed.",
    "details": "Both directions use this one hook, and nothing in the arguments says which happened — check the integration's `space_ids` or `course_ids` if you need to know. Courses are tracked under `course_ids` and community spaces under `space_ids`, chosen by the space type. The second argument is the space ID, unlike the create hook which passes the product ID.",
    "params": [
      {
        "name": "integrationId",
        "type": "int",
        "desc": "ID of the `ProductMeta` integration row that was updated."
      },
      {
        "name": "spaceId",
        "type": "int",
        "desc": "The space or course that was added or removed."
      }
    ],
    "related": [
      "fluent_community/product_integration_feed_created",
      "fluent_community/paywall_removed"
    ]
  },
  "fluent_community/profile_all_memberships_api_response": {
    "summary": "Filters the list of space IDs a member actively belongs to.",
    "details": "Returns bare IDs under a `memberships` key, not space models — the portal uses it to tick membership state in bulk. Only active memberships are counted, and secret spaces are included only when the viewer is the profile owner or a community moderator.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `memberships` list of space IDs."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/profile_spaces_api_response"
    ]
  },
  "fluent_community/profile_comments_api_response": {
    "summary": "Filters the comment listing shown on a member profile.",
    "details": "Scoped to comments on plain `text` posts the viewer may access, newest first, and paginated. The payload carries the paginator plus the profile itself. The parent posts of the listed comments have already been run through `FeedsHelper::transformFeedsCollection()`, so they are hydrated in place on each comment's `post` relation.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `comments` paginator and `xprofile`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/comments_api_response"
    ]
  },
  "fluent_community/profile_courses_api_response": {
    "summary": "Filters the courses listed on a member's public profile.",
    "details": "Scoped to public and private courses — secret ones are excluded by the query, so they cannot be added back by broadening the response. Enrolment and progress are computed for the profile owner rather than the viewer, and each course passes through the by-reference `fluent_community/course` action first.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "A single `courses` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body.",
    "related": [
      "fluent_community/course",
      "fluent_community/courses_api_response"
    ]
  },
  "fluent_community/profile_deactivated": {
    "summary": "Fires when a member deactivates their community profile.",
    "details": "Deactivation blanks `xprofile.status` to an empty string rather than setting a `deactivated` value, and stamps `_fcom_deactivated_at` on the WordPress user; the WordPress account itself is untouched. It requires either the `can_deactive_account` privacy setting or site-admin rights, and the profile is already saved by the time the hook runs. Reactivation fires `fluent_community/reactivate_account`.",
    "params": [
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The profile, already saved with an empty status."
      }
    ],
    "related": [
      "fluent_community/reactivate_account"
    ]
  },
  "fluent_community/profile_feed/created": {
    "summary": "The profile-scoped counterpart of `fluent_community/feed/created`, for posts with no space.",
    "details": "Fires immediately after `fluent_community/feed/created` when `$feed->space_id` is empty. Note the asymmetry with `fluent_community/space_feed/created`: only `FeedsController::store()` fires this one, so a profile post created programmatically through `FeedsHelper::createFeed()` fires the generic hook and nothing else. Pro's Followers module hangs the follower email off it.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The published post; `space_id` is empty."
      }
    ],
    "related": [
      "fluent_community/space_feed/created",
      "fluent_community/feed/created"
    ]
  },
  "fluent_community/profile_link_providers_api_response": {
    "summary": "Filters the social link providers returned to the admin profile-links screen.",
    "details": "Returns every registered provider, including the ones currently disabled, because the screen has to be able to switch them back on — `ProfileHelper::socialLinkProviders(true)` is the enabled-only variant used when rendering profiles. Each provider carries `title`, `icon_svg`, `placeholder`, `domain` and `enabled`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `providers` map keyed by provider slug."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/social_link_providers",
      "fluent_community/update_profile_link_providers"
    ]
  },
  "fluent_community/profile_notification_pref_api_response": {
    "summary": "Filters the notification preferences payload for a member.",
    "details": "Backs the notification settings screen. The payload holds `user_globals` cast to an object, the member's space groups, per-space preferences, the digest day already translated to a full weekday name, and the default messaging email frequency, which is forced to `no` when messaging email is switched off globally. The screen is also reachable through a signed URL from an email, so callbacks may run for a visitor who is not otherwise logged in.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `user_globals`, `spaceGroups`, `space_prefs`, `digestEmailDay`, `default_messaging_email_frequency`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array."
  },
  "fluent_community/profile_spaces_api_response": {
    "summary": "Filters the spaces listed on a member profile.",
    "details": "Only active memberships appear, and secret spaces are shown only to the profile owner and to community moderators. Member counts are zeroed for spaces that hide them from viewers without `can_view_members`. Courses are excluded — they are served by the separate profile courses endpoint.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `spaces` collection."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/profile_all_memberships_api_response"
    ]
  },
  "fluent_community/profile_view_data": {
    "summary": "Filters the assembled profile payload for the member profile page.",
    "details": "The main extension point for profiles, and the busiest — Pro attaches follower counts, custom fields, scheduled posts and moderation flags here. The payload is trimmed by visibility before the filter runs: bio, website, social links and join date are absent when the viewer may not see the profile, and the account management keys only appear for the owner or a site admin. `profile_navs` is the tab list and `profile_nav_actions` an empty array left for extensions to fill.",
    "params": [
      {
        "name": "profile",
        "type": "array",
        "desc": "The profile payload, including `profile_navs` and `profile_nav_actions`."
      },
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The profile being viewed."
      },
      {
        "name": "isAdmin",
        "type": "bool",
        "desc": "Whether the viewer is a site administrator. Optional — several Pro callbacks register for two arguments only."
      }
    ],
    "returns": "`array` — the profile payload. Removing keys the portal expects will break the profile page.",
    "related": [
      "fluent_community/update_profile_data",
      "fluent_community/xprofile_public_fields"
    ]
  },
  "fluent_community/public_display_name": {
    "summary": "Filters the name used for a member wherever the community refers to them publicly.",
    "details": "Resolves to the community profile's `display_name`, falling back to the WordPress user's. It exists specifically to keep a legal name out of notifications and emails, so overriding it carelessly reintroduces that leak. It runs once per name lookup with no caching — on a notification digest or an activity list that is once per row, so keep the callback free of queries.",
    "params": [
      {
        "name": "name",
        "type": "string",
        "desc": "The resolved public name."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The member whose name is being resolved."
      }
    ],
    "returns": "`string` — the display name. It is escaped by callers, not here."
  },
  "fluent_community/pwa/background_color": {
    "summary": "Filters the PWA splash screen background color for one color mode.",
    "details": "An admin-set background color in the PWA settings wins over the per-mode portal body color; the manifest carries a single static value, so an explicit choice applies to every mode. Falls back to #ffffff (light) / #2B2E33 (dark).",
    "params": [
      {
        "name": "color",
        "type": "string",
        "desc": "Hex color for this mode."
      },
      {
        "name": "mode",
        "type": "string",
        "desc": "Either \"light\" or \"dark\"."
      }
    ],
    "returns": "A hex color string.",
    "related": [
      "fluent_community/pwa/theme_color"
    ]
  },
  "fluent_community/pwa/description": {
    "summary": "Filters the description field of the PWA web app manifest.",
    "details": "Defaults to the site tagline from get_bloginfo('description'). The result is cast to string.",
    "params": [
      {
        "name": "description",
        "type": "string",
        "desc": "Manifest description, the site tagline by default."
      }
    ],
    "returns": "The manifest description string.",
    "related": [
      "fluent_community/pwa/orientation",
      "fluent_community/pwa/theme_color"
    ]
  },
  "fluent_community/pwa/install_button_icon": {
    "summary": "Filters the inline SVG glyph on the portal install entry.",
    "details": "The shipped default is returned untouched; anything a callback returns is treated as untrusted and passed through CustomSanitizer::sanitizeSvg(). That sanitizer's allowlist drops stroke-linecap, stroke-linejoin and aria-hidden, so a replacement glyph should not rely on them. Use stroke=\"currentColor\" so the icon follows the portal color mode.",
    "params": [
      {
        "name": "icon",
        "type": "string",
        "desc": "Inline SVG markup for the install glyph."
      }
    ],
    "returns": "Inline SVG markup. It will be sanitized unless it is byte-identical to the default.",
    "related": [
      "fluent_community/pwa/install_button_text"
    ]
  },
  "fluent_community/pwa/install_button_text": {
    "summary": "Filters the label on the portal \"Install App\" entry.",
    "details": "Applies to the in-portal install entry only, not to the manifest. The result is cast to string.",
    "params": [
      {
        "name": "buttonText",
        "type": "string",
        "desc": "Button label, \"Install App\" by default."
      }
    ],
    "returns": "The button label string.",
    "related": [
      "fluent_community/pwa/install_button_icon"
    ]
  },
  "fluent_community/pwa/orientation": {
    "summary": "Filters the screen orientation lock declared in the PWA manifest.",
    "details": "Defaults to \"any\" deliberately — course lessons and video play landscape, so a portrait lock would trap those screens. The return value is validated against the manifest spec list (any, natural, portrait, landscape, portrait-primary, portrait-secondary, landscape-primary, landscape-secondary) and anything else silently falls back to \"any\".",
    "params": [
      {
        "name": "orientation",
        "type": "string",
        "desc": "Orientation lock, \"any\" by default."
      }
    ],
    "returns": "One of the eight allowed manifest orientation values; any other string is ignored.",
    "related": [
      "fluent_community/pwa/description"
    ]
  },
  "fluent_community/pwa/theme_color": {
    "summary": "Filters the PWA theme (title bar / browser chrome) color for one color mode.",
    "details": "Runs once per mode. The default follows the portal top-bar background for the active color schema rather than the brand button color, so the installed app window blends into the portal header. Falls back to #ffffff (light) / #2B2E33 (dark) when no schema color resolves.",
    "params": [
      {
        "name": "color",
        "type": "string",
        "desc": "Hex color for this mode."
      },
      {
        "name": "mode",
        "type": "string",
        "desc": "Either \"light\" or \"dark\"."
      }
    ],
    "returns": "A hex color string.",
    "related": [
      "fluent_community/pwa/background_color"
    ]
  },
  "fluent_community/question_types": {
    "summary": "Filters the list of quiz question types offered in the lesson editor.",
    "details": "The default list holds only single_choice and multiple_choice. This list drives the editor UI only — it is published to the portal as appVars.question_types and is never consulted when grading. The grader independently understands a third type, written_answer (with grading_mode of open or exact_match), so adding an entry here does not by itself teach the grader anything, and omitting one does not stop an already-saved question of that type from being graded.",
    "params": [
      {
        "name": "types",
        "type": "array",
        "desc": "List of [ value, label ] maps."
      }
    ],
    "returns": "The list of question types, each an array with `value` and `label` keys.",
    "related": [
      "fluent_community/quiz/submitted"
    ]
  },
  "fluent_community/quiz/exportable_result_row": {
    "summary": "Filters one row of the course quiz-results export.",
    "details": "Runs once per attempt in GET /admin/courses/{course_id}/export/quiz-results. Keys are human-readable column headings, not slugs — Student Name, Email, Username, Quiz, Score, Grade, Total Attempts, Submitted At — so adding a key adds a column. The export is capped at 5000 attempts.",
    "params": [
      {
        "name": "row",
        "type": "array",
        "desc": "Column heading => value map for one attempt."
      },
      {
        "name": "result",
        "type": "\\FluentCommunityPro\\App\\Modules\\Quiz\\QuizModel",
        "desc": "The attempt, with xprofile, user and lesson eager-loaded."
      },
      {
        "name": "courseId",
        "type": "int",
        "desc": "Course the export was requested for."
      }
    ],
    "returns": "The row map to write to the export.",
    "related": [
      "fluent_community/quiz/exportable_result_rows"
    ]
  },
  "fluent_community/quiz/exportable_result_rows": {
    "summary": "Filters the whole quiz-results export payload after every row has been built.",
    "details": "Runs once, after fluent_community/quiz/exportable_result_row has run for each attempt. Use this one to reorder, append or drop rows wholesale; use the singular filter to reshape a row.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload — a `results` key holding the list of rows."
      },
      {
        "name": "results",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Collection",
        "desc": "The underlying QuizModel collection the rows were built from."
      },
      {
        "name": "courseId",
        "type": "int",
        "desc": "Course the export was requested for."
      }
    ],
    "returns": "The export payload array.",
    "related": [
      "fluent_community/quiz/exportable_result_row"
    ]
  },
  "fluent_community/quiz/submitted": {
    "summary": "Fires after a student submits a quiz and the attempt has been scored and saved.",
    "details": "Fires on every submission, including re-attempts — the attempt counter lives in $quizResult->meta['attempts']. The row is already persisted, so $quizResult->score (0-100) and $quizResult->status are final. status is \"passed\"/\"failed\" only when the lesson has a passing score enabled, otherwise it is \"published\". If the lesson meta sets hide_result, $quizResult->message has already been scrubbed of the correct/incorrect flags before this action runs.",
    "params": [
      {
        "name": "quizResult",
        "type": "\\FluentCommunityPro\\App\\Modules\\Quiz\\QuizModel",
        "desc": "The saved attempt (score, status, meta, per-question message map)."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The student who submitted."
      },
      {
        "name": "quiz",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseLesson",
        "desc": "The quiz-type lesson that was answered."
      }
    ],
    "related": [
      "fluent_community/question_types"
    ]
  },
  "fluent_community/rate_limit/comments_per_minute": {
    "summary": "Filters how many comments a member may post in a rolling one-minute window.",
    "details": "Defaults to 5. The comparison is `count > limit` against comments created in the last 60 seconds, so the effective allowance is one more than the number returned — the default lets six through before the sixth attempt is refused. Site administrators are exempt before the filter is reached, and exceeding the limit throws rather than returning a structured error.",
    "params": [
      {
        "name": "limitPerMinute",
        "type": "int",
        "desc": "Comments allowed per rolling minute, 5 by default."
      }
    ],
    "returns": "`int` — the limit. A very large value effectively disables comment rate limiting.",
    "related": [
      "fluent_community/disable_duplicate_comment_check"
    ]
  },
  "fluent_community/rate_limit/media_upload_per_minute": {
    "summary": "Filters how many files a member may upload in a rolling one-minute window.",
    "details": "Defaults to 10. The comparison is `count > limit` over media rows created in the last 60 seconds, so the effective allowance is one more than the number returned. It counts media rows rather than requests, and inactive draft uploads count too. Site administrators are exempt before the filter is consulted, and exceeding the limit throws rather than returning a structured error.",
    "params": [
      {
        "name": "limitPerMinute",
        "type": "int",
        "desc": "Uploads allowed per rolling minute, 10 by default."
      }
    ],
    "returns": "`int` — the limit.",
    "related": [
      "fluent_community/check_rate_limit/media_upload",
      "fluent_community/rate_limit/posts_per_5_minutes"
    ]
  },
  "fluent_community/rate_limit/posts_per_5_minutes": {
    "summary": "Filters how many posts a member may create in a rolling five-minute window.",
    "details": "Defaults to 5. The comparison is `count > limit` over posts created in the last 300 seconds, so the effective allowance is one more than the number returned. Site administrators are exempt before the filter is consulted, and exceeding the limit throws rather than returning a structured error.",
    "params": [
      {
        "name": "limitPer5Minutes",
        "type": "int",
        "desc": "Posts allowed per rolling five minutes, 5 by default."
      }
    ],
    "returns": "`int` — the limit.",
    "related": [
      "fluent_community/rate_limit/comments_per_minute",
      "fluent_community/check_rate_limit/create_post"
    ]
  },
  "fluent_community/reactions_api_response": {
    "summary": "Filters the list of members who liked a post or a comment.",
    "details": "One filter for both endpoints: `GET /feeds/{id}/reactions` and `GET /comments/{id}/reactions`. Nothing in the arguments distinguishes them, so inspect the reactions themselves if you need to. Only `like` reactions are returned, capped at 100 rows with no paging, and reactions whose profile is missing are excluded.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `reactions` collection."
      },
      {
        "name": "reactions",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Collection",
        "desc": "The reactions, with `xprofile` eager-loaded."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/survey_voters_api_response"
    ]
  },
  "fluent_community/reactivate_account": {
    "summary": "Fires when a member reactivates their previously deactivated profile.",
    "details": "Reached through the portal action URL rather than the REST API, and only after a nonce check, a confirmed empty status, and the `can_deactive_account` privacy setting still being enabled — turn that setting off and deactivated members can no longer come back. The profile is already saved as `active`; the `_fcom_deactivated_at` user meta is deleted immediately after the hook, and the request then redirects to the portal home.",
    "params": [
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The profile, already saved as active."
      }
    ],
    "related": [
      "fluent_community/profile_deactivated"
    ]
  },
  "fluent_community/recache_color_schema": {
    "summary": "Signals that the cached portal colour CSS is stale and should be rebuilt.",
    "details": "Fired from `Utility::getColorCssVariables()` when a `cached_css` value exists but was generated by a different plugin version — an upgrade, in other words. It is a request to rebuild rather than a notification: core does nothing with it, and Pro answers by clearing the cached option and regenerating the light and dark CSS. Note the stale CSS is still returned for the current request; the rebuild takes effect on the next one.",
    "related": [
      "fluent_community/color_schmea_config"
    ]
  },
  "fluent_community/remove_medias_by_url": {
    "summary": "Requests deletion of media records matching a set of public URLs.",
    "details": "This is an action rather than a filter, and the work is done by core's `CleanupHandler`, which resolves the URLs to media rows and queues the files for removal. Fire it yourself when you replace an image that FluentCommunity owns — spaces, space groups, profiles, lockscreens and Pro quizzes all do. The optional `$wheres` array currently understands only `sub_object_id`, which scopes the lookup to one owning record and prevents deleting an identical URL used elsewhere; omit it and every matching row is removed.",
    "params": [
      {
        "name": "mediaUrls",
        "type": "array",
        "desc": "Public media URLs to remove. An empty array is a no-op."
      },
      {
        "name": "wheres",
        "type": "array",
        "desc": "Optional constraints. Only `sub_object_id` is honoured."
      }
    ],
    "related": [
      "fluent_community/feed/media_deleted"
    ]
  },
  "fluent_community/remove_old_notifications": {
    "summary": "Fires once a day to prune notifications older than a month.",
    "details": "Dispatched from the `fluent_community_daily_jobs` handler. The core callback deletes at most 100 rows whose `updated_at` is over a month old per run, so a backlog is cleared gradually rather than in one pass. It takes no arguments and runs in an Action Scheduler request, so there is no current user.",
    "related": [
      "fluent_community_daily_jobs"
    ]
  },
  "fluent_community/render_default_touch_icon": {
    "summary": "Filters whether the portal emits an `apple-touch-icon` link pointing at the WordPress site icon.",
    "details": "Nested inside two conditions: it is only reached in headless rendering (where `wp_head()` is skipped) and only when the site has a site icon set. Pro's PWA module returns `false` so its own manifest icons win — that is the usual reason to filter it.",
    "params": [
      {
        "name": "render",
        "type": "bool",
        "desc": "Whether to print the touch icon link. `true` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness.",
    "related": [
      "fluent_community/portal_head_meta"
    ]
  },
  "fluent_community/rendering_feed_model": {
    "summary": "Filters a post model after it has been prepared for output but before it is serialised.",
    "details": "The final step of `FeedsHelper` post formatting, applied after the rendered HTML, reaction state, survey vote state and document download URLs have all been attached. It fires for every post in every list as well as for single posts, so it is a hot path. `$config` describes what the caller asked for, including the viewer's interaction map — read it rather than re-querying.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The prepared post model."
      },
      {
        "name": "config",
        "type": "array",
        "desc": "Formatting context, including `interactions` for the current viewer."
      }
    ],
    "returns": "`\\FluentCommunity\\App\\Models\\Feed` — the model. Return the model itself, not an array; callers use it as an object."
  },
  "fluent_community/rendering_headless_portal": {
    "summary": "Fires while a portal page is being prepared in headless mode, in place of the classic asset enqueue.",
    "details": "Headless mode is the shipped default (`Modules\\FeaturesHandler` returns `true` from `fluent_community/portal_page_headless`), and in it WordPress asset enqueueing is skipped entirely: core answers this hook by registering callbacks on `fluent_community/portal_head`, `fluent_community/before_js_loaded` and `fluent_community/portal_footer` that print the stylesheet and module script tags by hand. If you replace the core callback, you must print those assets yourself. When the filter is switched off, `PortalHandler::loadClassicPortalAssets()` runs instead and this hook never fires. Despite the name it has nothing to do with `app/Views/headless_page.php`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The render payload, including `css_files`, `js_files`, `header_js_files` and `js_vars`."
      }
    ],
    "related": [
      "fluent_community/portal_page_headless",
      "fluent_community/portal_head"
    ]
  },
  "fluent_community/rendering_path_ssr_{pathParts}": {
    "summary": "Dynamic action fired for the first segment of the requested portal path, before the SPA renders.",
    "details": "The placeholder is `$pathParts[0]` — the segment straight after the portal slug — so `/portal/checkout/x` fires `fluent_community/rendering_path_ssr_checkout`. It is the hook for server-rendering a route instead of handing it to the Vue app; the FluentCart checkout and Pro's sitemap generator both use it and end the request themselves. Like `fluent_community/portal_action_{action}` it fires before every access check, and the segment must also be registered through `fluent_community/app_route_paths` or the URL will not route to the portal at all on a root-mounted install.",
    "params": [
      {
        "name": "pathParts",
        "type": "array",
        "desc": "The requested path exploded on `/`, including the first segment."
      }
    ],
    "related": [
      "fluent_community/app_route_paths",
      "fluent_community/portal_action_{action}"
    ]
  },
  "fluent_community/report/after_delete": {
    "summary": "Fires immediately after a moderation report row has been deleted.",
    "details": "The model instance is still in memory and its attributes readable, but the row is gone, so relations will no longer resolve and nothing saved on it will persist. Only the report acted on is deleted; other reports filed against the same content remain. Pro-only.",
    "params": [
      {
        "name": "report",
        "type": "\\FluentCommunityPro\\App\\Models\\Moderation",
        "desc": "The deleted report, still populated in memory."
      }
    ],
    "related": [
      "fluent_community/report/before_delete"
    ]
  },
  "fluent_community/report/before_delete": {
    "summary": "Fires immediately before a moderation report row is deleted.",
    "details": "The last point at which the report and its relations can be read. Deleting a report does not touch the content it was filed against — an unpublished post stays unpublished — so this is purely about the moderation record. Pro-only.",
    "params": [
      {
        "name": "report",
        "type": "\\FluentCommunityPro\\App\\Models\\Moderation",
        "desc": "The report about to be deleted."
      }
    ],
    "related": [
      "fluent_community/report/after_delete"
    ]
  },
  "fluent_community/report/{status}": {
    "summary": "Dynamic action fired after a moderator sets the status of a report.",
    "details": "The placeholder is one of `published`, `unpublished`, `pending`, `rejected`, `flagged` or `ignored`, validated before the update. Only `unpublished` actually unpublishes the content — every other status publishes it — and Pro listens on `fluent_community/report/unpublished` to record a strike against the author. The status is applied to every report filed against the same content, not just the one being acted on. When approving content that had been held back, the ordinary creation hooks fire first, so a post can reach `fluent_community/feed/created` from here. This is Pro-only.",
    "params": [
      {
        "name": "report",
        "type": "\\FluentCommunityPro\\App\\Models\\Moderation",
        "desc": "The moderation record, saved with the new status and an `updated_by` in its meta."
      },
      {
        "name": "content",
        "type": "mixed",
        "desc": "The `Feed` or `Comment` the report is about. Can be `null` if the content has since been deleted."
      }
    ],
    "related": [
      "fluent_community/report/before_delete",
      "fluent_community/content_flagged"
    ]
  },
  "fluent_community/report_reasons": {
    "summary": "Filters the reasons a member can pick when reporting a post or comment.",
    "details": "Defaults to harassment, spam, offensive, incorrect space, against community rules, and other. Keys are stored verbatim in the moderation record's `reason` column, so renaming a key orphans the label on reports already filed under the old one. Labels are translated through the `fluent-community` text domain; translate additions yourself.",
    "params": [
      {
        "name": "reasons",
        "type": "array",
        "desc": "Reason keys mapped to translated labels."
      }
    ],
    "returns": "`array` — an associative map of stored key to display label.",
    "related": [
      "fluent_community/content_moderation/created"
    ]
  },
  "fluent_community/reserved_usernames": {
    "summary": "Filters the list of usernames members are not allowed to claim.",
    "details": "A large default list covering administrative, role-based and routing names. The check is a case-insensitive `in_array()` against a lowercased candidate, so add lowercase entries. It applies alongside a minimum length of three characters and a uniqueness check against existing WordPress logins. Removing entries is a real risk here: several of the defaults collide with portal route segments.",
    "params": [
      {
        "name": "reservedNames",
        "type": "array",
        "desc": "Lowercase reserved usernames."
      }
    ],
    "returns": "`array` — a flat list of lowercase strings."
  },
  "fluent_community/scheduled_posts_api_response": {
    "summary": "Filters the GET /scheduled-posts response.",
    "details": "Each feed in the paginated list has already been run through FeedsHelper::transformFeed(), so it carries the same shape as a normal feed listing.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a paginated `feeds` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/feed/rescheduled"
    ]
  },
  "fluent_community/section/before_deleted": {
    "summary": "Runs immediately before a course section is deleted.",
    "details": "Ordering differs between the two call sites. Deleting a course fires this before its lessons are removed; deleting a single section fires this, deletes the section row, and only then walks the lessons — so in that path the section no longer exists when the per-lesson hooks run. Pro uses it to unschedule drip notifications.",
    "params": [
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section about to be deleted."
      }
    ],
    "related": [
      "fluent_community/lesson/before_deleted"
    ]
  },
  "fluent_community/section/reactions_count_updated": {
    "summary": "Fires when the drip offset of a section on a structured course changes.",
    "details": "Nothing to do with reactions. Structured courses release each section a number of days after the student enrols, and that offset is stored in the section row's reused `reactions_count` column — hence the name. It is gated on `isDirty('reactions_count')` and the field is only accepted when the course type is `structured`. Setting a scheduled date clears this value and vice versa, so the two hooks rarely fire for the same save.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course the section belongs to."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section, already saved with the new offset."
      }
    ],
    "related": [
      "fluent_community/section/scheduled_at_updated"
    ]
  },
  "fluent_community/section/scheduled_at_updated": {
    "summary": "Fires when a section's release date changes on a scheduled course.",
    "details": "Gated on `isDirty('scheduled_at')`, so it only fires when the date actually moved. The field is only accepted at all when the course type is `scheduled`. Pro answers by unscheduling and re-scheduling the section's drip notification, but only if that section has email notifications enabled.",
    "params": [
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course the section belongs to."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section, already saved with the new date."
      }
    ],
    "related": [
      "fluent_community/section/reactions_count_updated",
      "fluent_community/section/update_data"
    ]
  },
  "fluent_community/section/update_data": {
    "summary": "Filters a section's attributes on save, and can reject the save outright.",
    "details": "Only `title` and `status` are accepted by default, joined by `scheduled_at` on scheduled courses or `reactions_count` — the drip offset — on structured ones; a field the course type does not accept never reaches the filter. Returning a `WP_Error` aborts the save and its messages are returned to the moderator, which is how Pro refuses to enable a section email that has no release date. Pro also uses it to fold the email subject and body into `meta` and to fire the schedule and unschedule actions as a side effect, so run at a later priority if you need the final array.",
    "params": [
      {
        "name": "sectionData",
        "type": "array",
        "desc": "The accepted fields: `title`, `status`, and `scheduled_at` or `reactions_count`."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course the section belongs to."
      },
      {
        "name": "section",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\CourseTopic",
        "desc": "The section before the new values are filled."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload, including any `meta` the form submitted."
      }
    ],
    "returns": "`array` — attributes to fill onto the section. Return a `WP_Error` to reject the save with a message.",
    "related": [
      "fluent_community/section/scheduled_at_updated",
      "fluent_community/section/reactions_count_updated"
    ]
  },
  "fluent_community/seo/ld_comment_limit": {
    "summary": "Filters how many comments are embedded in a post's JSON-LD structured data.",
    "details": "Defaults to 100 and is cast to int. It caps the comments serialized into the schema.org graph for SEO only — it has no effect on the comments the portal or the REST API return. Replies are nested under their parent within whatever the limit returns, so a low limit can orphan replies whose parent fell outside it.",
    "params": [
      {
        "name": "limit",
        "type": "int",
        "desc": "Maximum comments to embed, 100 by default."
      }
    ],
    "returns": "The comment limit as an integer.",
    "page": "rendering"
  },
  "fluent_community/settings_menu": {
    "summary": "Collects the entries shown in the sidebar's settings section.",
    "details": "Starts as an empty array and nothing in core adds to it, so the section is absent unless something hooks in. It is resolved once per sidebar build and reaches the portal as `settingsItems` inside `fluent_community/sidebar_menu_groups_config`. The user model is `null` for a logged-out visitor.",
    "params": [
      {
        "name": "settingsMenu",
        "type": "array",
        "desc": "The settings entries. Empty by default."
      },
      {
        "name": "userModel",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The current user, or `null` for a guest."
      }
    ],
    "returns": "`array` — the settings entries.",
    "related": [
      "fluent_community/sidebar_menu_groups_config",
      "fluent_community/main_menu_items"
    ]
  },
  "fluent_community/sidebar_link/after_delete": {
    "summary": "Fires after a custom portal sidebar link has been deleted.",
    "details": "The in-memory model is still passed, but the row is gone by this point.",
    "params": [
      {
        "name": "link",
        "type": "\\FluentCommunity\\App\\Models\\SidebarLink",
        "desc": "The deleted link."
      }
    ],
    "related": [
      "fluent_community/sidebar_link/before_delete"
    ]
  },
  "fluent_community/sidebar_link/before_delete": {
    "summary": "Fires just before a custom portal sidebar link is deleted.",
    "details": "The record is still readable here. There is no matching hook on save — only delete is instrumented.",
    "params": [
      {
        "name": "link",
        "type": "\\FluentCommunity\\App\\Models\\SidebarLink",
        "desc": "The link about to be deleted."
      }
    ],
    "related": [
      "fluent_community/sidebar_link/after_delete"
    ]
  },
  "fluent_community/sidebar_menu_groups_config": {
    "summary": "Filters the complete data set the portal sidebar is rendered from.",
    "details": "Applied by `Utility::getPortalSidebarData()`, which feeds both the server-rendered sidebar and the `menu_links_groups` payload in the app-vars endpoint, so a change here shows up in both. Several narrower filters have already run by this point — `fluent_community/main_menu_items` and `fluent_community/settings_menu` among them — and can be overridden from here. The second argument is the resolved user model and is `null` for guests.",
    "params": [
      {
        "name": "config",
        "type": "array",
        "desc": "Sidebar data: `primaryItems`, `spaceGroups`, `settingsItems`, `topInlineLinks`, `bottomLinkGroups`, `is_admin`, `has_color_scheme`, `context`."
      },
      {
        "name": "userModel",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The current user, or `null` for a guest."
      }
    ],
    "returns": "`array` — the sidebar data. The template reads every key, so merge rather than replace.",
    "related": [
      "fluent_community/will_render_default_sidebar_items",
      "fluent_community/main_menu_items"
    ]
  },
  "fluent_community/sidebar_menu_html_api_response": {
    "summary": "Filters the response of the endpoint that re-renders the sidebar HTML for the SPA.",
    "details": "The `sidebar_html` string is produced by firing `fluent_community/portal_sidebar` with the `ajax` context into an output buffer, which is why the sidebar wrapper hooks are skipped on that path. `auth_spaces` is the viewer's spaces keyed by slug, each already carrying `permissions`, `membership`, rendered description and topics; it is an empty object for guests.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "`sidebar_html` and `auth_spaces`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body. The SPA replaces the sidebar with `sidebar_html` verbatim.",
    "related": [
      "fluent_community/portal_sidebar",
      "fluent_community/app_vars_api_response"
    ]
  },
  "fluent_community/skip_no_conflict": {
    "summary": "Filters whether the lesson editor's stylesheet no-conflict pass is skipped.",
    "details": "Return `true` and no stylesheet is dequeued on the editor page, which is the escape hatch when a theme or plugin's CSS is genuinely needed inside the editor. The second argument is always the literal string `styles`; scripts are not covered here. To leave scripts alone, return `true` from `fluent_com_editor/skip_no_conflict`, which aborts the whole sweep before either pass is registered.",
    "params": [
      {
        "name": "isSkip",
        "type": "bool",
        "desc": "Whether to skip the dequeue pass. `false` by default."
      },
      {
        "name": "context",
        "type": "string",
        "desc": "Always `styles` at the only call site."
      }
    ],
    "returns": "`bool` — evaluated for truthiness.",
    "related": [
      "fluent_community/asset_listed_slugs"
    ]
  },
  "fluent_community/smartcode_fallback": {
    "summary": "Filters what an unresolvable smart code is replaced with.",
    "details": "Applied at three points, all of them structural failures rather than missing data: an empty placeholder, one with no dot separator, and one whose value key is empty. A placeholder with a valid group but an unknown group name goes to `fluent_community/smartcode_group_callback_{group}` instead. The default is the matched text itself, which is why an unrecognised code appears verbatim in the output; return an empty string to strip them instead. The user may be `null`.",
    "params": [
      {
        "name": "match",
        "type": "string",
        "desc": "The full matched placeholder, including its delimiters."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The user the codes are being parsed for, or `null`."
      }
    ],
    "returns": "`string` — the replacement text, inserted into the output as-is.",
    "related": [
      "fluent_community/smartcode_group_callback_{dataKey}"
    ]
  },
  "fluent_community/smartcode_group_callback_{dataKey}": {
    "summary": "Resolves smart codes belonging to a group core does not handle.",
    "details": "The suffix is the part before the first dot, so `{{crm.company}}` reaches `fluent_community/smartcode_group_callback_crm`. It is the default branch of the parser, so the built-in groups `site`, `user`, `community`, `section` and `course` never reach it. Note the first argument is the raw matched placeholder, not the default value — returning it unchanged leaves the code visible, and the supplied default arrives separately as the third argument. Any trailing transformer such as `ucfirst` is applied to whatever you return.",
    "params": [
      {
        "name": "match",
        "type": "string",
        "desc": "The full matched placeholder, including delimiters."
      },
      {
        "name": "valueKey",
        "type": "string",
        "desc": "The part after the group name and before any default or transformer."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "desc": "The fallback supplied in the placeholder after the first pipe. Empty when none was given."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The user the codes are being parsed for, or `null`."
      }
    ],
    "returns": "`string` — the resolved value. A falsy return skips the transformer step.",
    "related": [
      "fluent_community/smartcode_fallback"
    ]
  },
  "fluent_community/social_link_providers": {
    "summary": "Filters the social link providers members can add to their profile.",
    "details": "Keyed by provider slug, each entry carrying `title`, `icon_svg`, `placeholder`, `domain` and `enabled`. The keys are stored verbatim in `xprofile.meta.social_links`, so renaming one orphans links already saved under the old key. A separate stored option decides which providers are actually enabled, defaulting to Instagram, Twitter/X, YouTube, LinkedIn and Facebook when nothing has been saved, so adding a provider here does not by itself switch it on.",
    "params": [
      {
        "name": "links",
        "type": "array",
        "desc": "Provider definitions keyed by slug."
      }
    ],
    "returns": "`array` — the provider map. `icon_svg` is rendered as markup, so supply trusted SVG only.",
    "related": [
      "fluent_community/profile_link_providers_api_response",
      "fluent_community/update_profile_link_providers"
    ]
  },
  "fluent_community/space": {
    "summary": "Passes a formatted space by reference so its payload can be extended before it reaches the portal.",
    "details": "Fired with `do_action_ref_array()`, so declare the parameter as `&$space` and mutate the model in place. It runs on three paths — the single-space fetch, the all-spaces listing, and the sidebar build during portal render — always immediately after `formatSpaceData()`, which is what attaches `permissions`, `membership`, `topics`, `header_links` and, for non-admins, `lockscreen_config`. Because it is a listing hook as well, it can run dozens of times per request; keep callbacks free of queries.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The formatted space, passed by reference."
      }
    ],
    "related": [
      "fluent_community/space_api_response",
      "fluent_community/space_header_links"
    ]
  },
  "fluent_community/space/before_delete": {
    "summary": "Runs immediately before a space and its content are deleted.",
    "details": "The last point at which the space, its posts, comments, reactions and membership rows are all still queryable — the controller deletes them in bulk straight afterwards. Those bulk deletes bypass the per-item controllers, so no `fluent_community/feed/deleted` or `fluent_community/comment_deleted` fires for the content that goes with the space. Attached media is not cleaned up here either.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space about to be deleted."
      }
    ],
    "related": [
      "fluent_community/space/deleted"
    ]
  },
  "fluent_community/space/create_data": {
    "summary": "Filters the attributes a new space is about to be created from.",
    "details": "Applied before `Space::create()`, so anything you add must be a real column or a cast attribute. The incoming `settings` have already been sanitised and validated against the chosen privacy, and `serial` has been computed as the next position within the parent group. Note that this filter takes a single argument — the request payload is not passed, so read it from the request if you need it. Cover photo, logo and topics are attached after creation and are not part of this array.",
    "params": [
      {
        "name": "spaceData",
        "type": "array",
        "desc": "The attributes to create the space with: `title`, `slug`, `privacy`, `description`, `settings`, `parent_id`, `serial`."
      }
    ],
    "returns": "`array` — the attribute map.",
    "related": [
      "fluent_community/space/created",
      "fluent_community/space/update_data"
    ]
  },
  "fluent_community/space/created": {
    "summary": "Runs after a new space is created, its images claimed, its creator attached as admin and its topics synced.",
    "details": "Only fires for spaces created through `SpaceController::create()`; spaces produced by migrations, seeders or direct model writes do not reach it. The second argument is the sanitised request payload, which carries fields such as `topic_ids` and image URLs that are not columns on the model.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The newly created space."
      },
      {
        "name": "data",
        "type": "array",
        "desc": "The sanitised creation payload from the request."
      }
    ],
    "related": [
      "fluent_community/space/updated"
    ]
  },
  "fluent_community/space/deleted": {
    "summary": "Runs after a space row has been deleted, with only its ID.",
    "details": "The model and all its content are gone, so capture anything you need from `fluent_community/space/before_delete`. Deleting by ID delegates to the slug endpoint, so both routes fire it exactly once.",
    "params": [
      {
        "name": "spaceId",
        "type": "int",
        "desc": "ID of the deleted space."
      }
    ],
    "related": [
      "fluent_community/space/before_delete"
    ]
  },
  "fluent_community/space/join_requested": {
    "summary": "Fires when a member's request to join a non-public space is left pending approval.",
    "details": "The membership row already exists with `status = pending`, so the member is attached but not yet active. Only self-service joins reach it: an admin adding a member creates an active row and fires `fluent_community/space/joined` instead, as does the later approval of this request. Secret spaces reject the join outright before the hook. Core emails the space admins from here. The third argument is always `self` at the only call site.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space that was requested."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the requester."
      },
      {
        "name": "by",
        "type": "string",
        "desc": "How the request came about; `self` at the only current call site."
      }
    ],
    "related": [
      "fluent_community/space/joined",
      "fluent_community/space/join_status_for_private"
    ]
  },
  "fluent_community/space/join_status_for_private": {
    "summary": "Filters the membership status a self-service join produces for a non-public space.",
    "details": "Defaults to `pending`, which is what makes private spaces require approval. Return `active` to admit the member immediately — that is how paywall and automation integrations let a purchase grant instant access. The result is whitelisted: anything other than `pending` or `active` is coerced back to `pending`. The filter is skipped for community admins and moderators, who always join as active, and secret spaces are refused before it is reached. The status chosen here decides whether `fluent_community/space/join_requested` or `fluent_community/space/joined` fires.",
    "params": [
      {
        "name": "status",
        "type": "string",
        "desc": "`pending` by default."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space being joined."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The joining member."
      }
    ],
    "returns": "`string` — `pending` or `active`. Any other value is coerced to `pending`.",
    "related": [
      "fluent_community/space/join_requested",
      "fluent_community/space/joined"
    ]
  },
  "fluent_community/space/joined": {
    "summary": "Fires once a user holds an active membership row in a community space.",
    "details": "Course-type spaces never reach this hook — `Helper::addToSpace()` routes them to `fluent_community/course/enrolled` instead. It also does not fire for join requests that land in `pending`; those fire `fluent_community/space/join_requested`, and the later approval fires this hook. Only the `Helper::addToSpace()` path supplies the fourth argument, and only when a membership row was genuinely created, so treat `$created` as optional.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space that was joined."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the new member."
      },
      {
        "name": "by",
        "type": "string",
        "desc": "How the membership came about: `self`, `by_admin`, `automation`, or an integration key."
      },
      {
        "name": "created",
        "type": "\\FluentCommunity\\App\\Models\\SpaceUserPivot",
        "desc": "The newly created membership row. Optional — omitted when an existing pending or inactive row was reactivated."
      }
    ],
    "related": [
      "fluent_community/space/user_left",
      "fluent_community/course/enrolled"
    ]
  },
  "fluent_community/space/member/role_updated": {
    "page": "spaces",
    "summary": "Runs after an existing member's role within a space has been changed and saved.",
    "details": "Fires from the admin member-management endpoint only. When a pending member is approved with a non-default role, it fires straight after `fluent_community/space/joined` for the same user, so a promotion-on-approval reaches both hooks. The pivot is passed rather than the user, so read `$pivot->user_id` and `$pivot->role`.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space whose membership changed."
      },
      {
        "name": "pivot",
        "type": "\\FluentCommunity\\App\\Models\\SpaceUserPivot",
        "desc": "The membership row, already saved with the new role."
      }
    ],
    "related": [
      "fluent_community/space/joined"
    ]
  },
  "fluent_community/space/meta_fields": {
    "summary": "Collects extra settings sections to render on a space's settings screen.",
    "details": "Starts as an empty array; each contributor adds one entry keyed by a provider slug, containing `section_title`, a `settings` array of current values and a `fields` array of form field definitions. Saving posts the values back through `fluent_community/space/update_meta_settings_{provider}`, so the two must use the same key. Rather than filtering directly, prefer `FluentExtendApi::addMetaBox()`, which wires both sides up for you and works for spaces and courses at once. If nothing is added, the screen shows no additional settings at all.",
    "params": [
      {
        "name": "metaFields",
        "type": "array",
        "desc": "Settings sections keyed by provider slug. Empty by default."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space whose settings are being rendered."
      }
    ],
    "returns": "`array` — the sections map. Returning an empty array suppresses the meta settings response entirely.",
    "related": [
      "fluent_community/course/meta_fields"
    ]
  },
  "fluent_community/space/update_data": {
    "summary": "Filters the payload a space is about to be updated with.",
    "details": "Applied just before `BaseSpace::updateCustomData()`, after cover photo and logo URLs have been resolved to claimed media. The array is a request payload rather than a column map — it may carry `topic_ids` and image URLs alongside real columns — and the same array is passed on to `fluent_community/space/updated`. An empty `parent_id` is normalised to an empty string after this filter, so setting it to `null` here has no effect.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "The update payload, including non-column keys such as `topic_ids`, `cover_photo` and `logo`."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space as currently stored."
      }
    ],
    "returns": "`array` — the update payload.",
    "related": [
      "fluent_community/space/updated",
      "fluent_community/space/create_data"
    ]
  },
  "fluent_community/space/update_meta_settings_{metaProvider}": {
    "summary": "Delivers the submitted values for one extra settings section on a space.",
    "details": "The suffix is the provider slug used when the section was registered through `fluent_community/space/meta_fields`, and the two must match or the values are never delivered. It fires once per provider present in the request, after the space itself has been saved and `fluent_community/space/updated` has run. The values arrive exactly as submitted — sanitise them yourself. `FluentExtendApi::addMetaBox()` wires both halves up for you.",
    "params": [
      {
        "name": "metaData",
        "type": "array",
        "desc": "The submitted values for this provider's section, unsanitised."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space that was updated."
      }
    ],
    "related": [
      "fluent_community/space/meta_fields",
      "fluent_community/course/update_meta_settings_{metaProvider}"
    ]
  },
  "fluent_community/space/updated": {
    "summary": "Runs after a space is saved with changed values.",
    "details": "Two call sites with different second arguments: `SpaceController::update()` passes the filtered request payload, while `BaseSpace::updateCustomData()` passes the dirty attribute map. The model-level call is additionally gated on `type == 'community'`, so custom-data updates to courses, space groups and sidebar links stay silent. Check what you actually received before reading keys off the second argument.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space after saving."
      },
      {
        "name": "data",
        "type": "array",
        "desc": "Either the request payload or the changed attributes, depending on the call site."
      }
    ],
    "related": [
      "fluent_community/space/created"
    ]
  },
  "fluent_community/space/user_left": {
    "page": "spaces",
    "summary": "Fires after a membership row has been removed from a community space.",
    "details": "Covers self-leaves, admin removals and CRM-driven removals alike; the `$by` argument tells them apart. As with joining, course-type spaces are routed elsewhere — they fire `fluent_community/course/student_left`. The pivot row is already deleted and the user's cached space list rebuilt by the time callbacks run.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space the user left."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the departing member."
      },
      {
        "name": "by",
        "type": "string",
        "desc": "What triggered the removal: `self`, `by_admin`, or `automation`."
      }
    ],
    "related": [
      "fluent_community/space/joined"
    ]
  },
  "fluent_community/space_api_response": {
    "summary": "Filters the single-space response.",
    "details": "The space has been through `formatSpaceData()` and `fluent_community/space` before the filter runs, so it already carries `permissions`, `membership`, `topics`, `header_links` and — for anyone who is not a space admin — `lockscreen_config` and a link list narrowed to what the viewer may see. A secret space the viewer has no membership of returns a 404 indistinguishable from a missing space, so the filter never sees it.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `space` key."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/space",
      "fluent_community/spaces_api_response"
    ]
  },
  "fluent_community/space_document_title_label": {
    "summary": "Filters the \"Documents\" label in a space's header navigation.",
    "details": "Only reached for spaces whose permissions grant can_view_documents, i.e. where the space has document_library enabled. It renames the menu entry only — the route name and the API paths are unaffected.",
    "params": [
      {
        "name": "label",
        "type": "string",
        "desc": "Menu label, \"Documents\" by default."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space the header is being built for."
      }
    ],
    "returns": "The menu label string.",
    "related": [
      "fluent_community/space_media_title_label"
    ]
  },
  "fluent_community/space_feed/created": {
    "summary": "The space-scoped counterpart of `fluent_community/feed/created`, for posts that belong to a space.",
    "details": "Always fires immediately after `fluent_community/feed/created` and only when `$feed->space_id` is set; on the controller path a profile-only post fires `fluent_community/profile_feed/created` instead. Use it when your callback would otherwise have to guard on `$feed->space_id` — core hangs the space email notification off it.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The published post; `space_id` is guaranteed non-empty."
      }
    ],
    "related": [
      "fluent_community/feed/created"
    ]
  },
  "fluent_community/space_feed/email_notify_sub_query": {
    "summary": "Passes the recipient sub-query for space post emails by reference so extra recipients can be added.",
    "details": "Fired with `do_action_ref_array()` from two places that must stay in step: the cheap `exists()` probe that decides whether to queue the mail job at all, and the batch job that actually selects recipients. Adding recipients in only one of them either mails nobody or probes wrongly, so always register a single callback for both. The query at this point is an `orWhere`-friendly inner group over `User`; the surrounding query additionally requires an active space membership and an active profile, which your added recipients cannot escape.",
    "params": [
      {
        "name": "query",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Builder",
        "desc": "The recipient sub-query, passed by reference."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post being notified about."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space the post belongs to."
      },
      {
        "name": "types",
        "type": "array",
        "desc": "Notification type keys being matched, `np_by_member_mail` plus `np_by_admin_mail` when the author is a space admin or moderator."
      }
    ],
    "related": [
      "fluent_community/email_notify_new_posts"
    ]
  },
  "fluent_community/space_feed/updated": {
    "summary": "The space-scoped counterpart of `fluent_community/feed/updated`.",
    "details": "Fires directly after `fluent_community/feed/updated` when the edited post belongs to a space, and only from the full editor endpoint — `patchFeed()`, which toggles sticky, priority and comment locking, fires the generic hook alone. It carries no change set, so read `getChanges()` off the model or listen to the generic hook if you need the dirty map.",
    "params": [
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The post after saving; `space_id` is non-empty."
      }
    ],
    "related": [
      "fluent_community/feed/updated",
      "fluent_community/space_feed/created"
    ]
  },
  "fluent_community/space_groups_api_response": {
    "summary": "Filters the grouped space tree used by the admin space management screen.",
    "details": "Returns `groups`, each with its `spaces`, plus `orphaned_spaces` for community and course spaces that have no parent group. Community spaces in both lists have been through `formatSpaceData()`, while courses only get their topics attached. The `options_only` request variant returns a bare `groups` list of IDs and titles and is not filtered.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `groups` and `orphaned_spaces`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/all_spaces_api_response"
    ]
  },
  "fluent_community/space_header_links": {
    "summary": "Filters the tabs shown across the top of a space.",
    "details": "Built in `BaseSpace::formatSpaceData()`, so it runs once per space in every payload that formats spaces — the app-vars bootstrap included — rather than only on the space page. The defaults are Posts, and Members when the viewer may see them; Pro appends the media gallery at priority 0 and the document library at priority 1, both ahead of the default filter order. Each entry is a `title` plus a `route` array naming a Vue route, so a tab pointing at an unregistered route silently fails to navigate.",
    "params": [
      {
        "name": "headerLinks",
        "type": "array",
        "desc": "Ordered list of tabs, each with `title` and a `route` array."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space being formatted; permissions are already resolved on it."
      }
    ],
    "returns": "`array` — the tab list, rendered in order."
  },
  "fluent_community/space_media/api_response": {
    "summary": "Filters the media-gallery API response.",
    "details": "The payload always carries items, has_more and cursor; has_audio is present only on the first page (no cursor), because the audio tab visibility is resolved once rather than per page. Fires after fluent_community/space_media/viewed.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "Response payload: items, has_more, cursor, and has_audio on the first page."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space whose gallery was listed."
      },
      {
        "name": "type",
        "type": "string",
        "desc": "One of photos, videos, audios."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/space_media/query",
      "fluent_community/space_media/viewed"
    ]
  },
  "fluent_community/space_media/query": {
    "summary": "Filters the media-gallery query builder before it is paged.",
    "details": "Runs after the type filter has been applied — images for \"photos\", fluent_player media split by an audio token in settings for \"videos\" and \"audios\" — and before the cursor and per-page limits. This is the hook for adding constraints or eager loads; returning anything that is not a query builder will break the endpoint.",
    "params": [
      {
        "name": "query",
        "type": "\\FluentCommunity\\Framework\\Database\\Orm\\Builder",
        "desc": "The Media query for this space and tab."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space whose gallery is being listed."
      },
      {
        "name": "type",
        "type": "string",
        "desc": "One of photos, videos, audios."
      }
    ],
    "returns": "The query builder.",
    "related": [
      "fluent_community/space_media/api_response"
    ]
  },
  "fluent_community/space_media/transform_item": {
    "summary": "Filters one media item as it is shaped into the gallery API structure.",
    "details": "Runs once per row on every page of the gallery, so keep callbacks cheap and avoid per-item queries — the feed and its author are already eager-loaded on the model. The `kind` key is the gallery's own classification (image / video / audio) and is not the raw mime type, which is carried separately as media_type. `feed` is null for media not attached to a post.",
    "params": [
      {
        "name": "item",
        "type": "array",
        "desc": "The item payload: id, url, media_type, kind, settings, created_at, feed."
      },
      {
        "name": "media",
        "type": "\\FluentCommunity\\App\\Models\\Media",
        "desc": "The underlying media row."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space whose gallery is being listed."
      }
    ],
    "returns": "The item payload array.",
    "related": [
      "fluent_community/space_media/query",
      "fluent_community/space_media/api_response"
    ]
  },
  "fluent_community/space_media/viewed": {
    "summary": "Fires when a member loads a page of a space media gallery.",
    "details": "Fires once per request, including for each paged scroll, so it is a page-view signal rather than a first-visit signal. It runs only after the can_view_media permission check has passed.",
    "params": [
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\Space",
        "desc": "The space whose gallery was viewed."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The viewer, or null for a guest on a public space."
      },
      {
        "name": "type",
        "type": "string",
        "desc": "The tab viewed — photos, videos or audios."
      }
    ],
    "related": [
      "fluent_community/space_media/api_response"
    ]
  },
  "fluent_community/space_media_title_label": {
    "summary": "Filters the \"Media\" label in a space's header navigation.",
    "details": "Only reached for spaces whose permissions grant can_view_media, i.e. where the space has media_gallery enabled. It renames the menu entry only — the route name and the API path are unaffected. The media entry is added at priority 0, ahead of the documents entry at priority 1.",
    "params": [
      {
        "name": "label",
        "type": "string",
        "desc": "Menu label, \"Media\" by default."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space the header is being built for."
      }
    ],
    "returns": "The menu label string.",
    "related": [
      "fluent_community/space_document_title_label"
    ]
  },
  "fluent_community/space_members_api_response": {
    "summary": "Filters the member listing for one space.",
    "details": "Two call sites with the same payload shape but different contents: requesting `status=pending` returns pending join requests, and only for a viewer with `can_add_member`, while the default path returns active members. Both carry `pending_count`, which stays 0 for viewers who cannot add members. Rows are `SpaceUserPivot` models with `xprofile` eager-loaded, not profiles. The paginator is repeated as the second argument, with the request data third.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `members` paginator and `pending_count`."
      },
      {
        "name": "members",
        "type": "mixed",
        "desc": "The paginated membership rows, also present inside the payload."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/space_non_members_api_response",
      "fluent_community/members_api_response"
    ]
  },
  "fluent_community/space_non_members_api_response": {
    "summary": "Filters the list of site users who are not yet in a given space.",
    "details": "Backs the admin add-member picker. The result is doubly capped — an inner query takes at most 100 candidate IDs before the outer query paginates at 100 — so it is a search-as-you-type source rather than a complete directory, and an unsearched call returns an arbitrary hundred. On multisite it is narrowed to users with capabilities on the current blog. Rows are `User` models, not profiles.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a paginated `users` block."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `search`."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/space_members_api_response"
    ]
  },
  "fluent_community/spaces_api_response": {
    "summary": "Filters the listing of spaces the current member belongs to.",
    "details": "Two call sites with different payloads: the bare membership list returns just `spaces`, while the richer listing adds `execution_time` and per-space member counts, zeroed where a space hides them from non-members. Neither is the public directory — that is `fluent_community/all_spaces_api_response`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `spaces` collection, and `execution_time` on the richer listing."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/all_spaces_api_response",
      "fluent_community/space_api_response"
    ]
  },
  "fluent_community/storage_settings_response": {
    "summary": "Filters the media storage settings screen payload.",
    "details": "On a free install `config` is hard-coded to `['driver' => 'local']` without consulting anything, and the matching save endpoint refuses outright — so adding driver options here produces a form that cannot be saved. With Pro active the config comes from the cloud storage module and Pro appends its `s3_locations` map through this same filter. Saving is also blocked when the `FLUENT_COMMUNITY_CLOUD_STORAGE` constant is defined.",
    "params": [
      {
        "name": "response",
        "type": "array",
        "desc": "`config`, plus `s3_locations` when Pro is active."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request payload."
      }
    ],
    "returns": "`array` — the response body."
  },
  "fluent_community/suggested_colors": {
    "summary": "Filters the swatches offered in the portal colour customiser.",
    "details": "The defaults come from the active theme's `editor-color-palette` support, with CSS variables resolved to their hex fallback and anything unparseable dropped; a hard-coded eleven-colour list is used when the theme declares no palette. The list is convenience only — the customiser still accepts arbitrary colours, so removing entries restricts nothing. It reaches the front end as `portal_vars.suggestedColors`.",
    "params": [
      {
        "name": "colors",
        "type": "array",
        "desc": "A flat list of colour strings, normally six-digit hex."
      }
    ],
    "returns": "`array` — a flat, non-associative list.",
    "related": [
      "fluent_community/color_config_api_response"
    ]
  },
  "fluent_community/super_admin_capability": {
    "summary": "Filters the WordPress capability that identifies a FluentCommunity super admin.",
    "details": "Defaults to `manage_options` and is checked with `user_can()`. Returning an empty or falsy value makes `Helper::isSuperAdmin()` return `false` for everyone, which disables the super-admin escape hatch across the plugin — that is the supported way to switch it off, not an error. This is distinct from the community `admin` role, which is stored per member rather than derived from WordPress capabilities.",
    "params": [
      {
        "name": "capability",
        "type": "string",
        "desc": "The capability to test, `manage_options` by default."
      }
    ],
    "returns": "`string` — a WordPress capability name, or a falsy value to disable the super-admin check entirely.",
    "related": [
      "fluent_community/user/permissions"
    ]
  },
  "fluent_community/support_attachment_types": {
    "summary": "Filters the MIME types accepted by FluentCommunity's image upload endpoints.",
    "details": "Applied at two upload entry points whose defaults are not identical: `FeedsController::handleMediaUpload()` includes `image/heic` while `UploadHelper::uploadFiles()` does not, so a callback that rebuilds the array instead of appending will silently change behaviour on one path. The list is also mined for extensions eligible for WebP conversion, so adding a non-image MIME type here has effects beyond validation.",
    "params": [
      {
        "name": "mimeTypes",
        "type": "array",
        "desc": "Accepted MIME type strings, image types only by default."
      }
    ],
    "returns": "`array` — MIME type strings. They are joined into the validator's `mimetypes` rule, so return a flat, non-associative array.",
    "related": [
      "fluent_community/media_upload_data"
    ]
  },
  "fluent_community/support_audio_types": {
    "summary": "Filters the audio MIME types the FluentPlayer upload endpoint accepts.",
    "details": "Only applied when audio uploads are switched on in the FluentPlayer settings — with `enable_audio` off the allowed list is emptied before the filter would run, so a callback cannot enable audio uploads on its own. Defaults cover MP3, WAV, MP4 audio, AAC, Ogg and FLAC.",
    "params": [
      {
        "name": "audioTypes",
        "type": "array",
        "desc": "MIME type strings."
      }
    ],
    "returns": "`array` — a flat list of MIME types.",
    "related": [
      "fluent_community/support_video_types",
      "fluent_community/fluent_player/max_audios_per_post"
    ]
  },
  "fluent_community/support_video_types": {
    "summary": "Filters the video MIME types the FluentPlayer upload endpoint accepts.",
    "details": "Defaults to MP4, WebM and QuickTime. The list is deduplicated, joined into the validator's `mimetypes` rule and also used to build the upload control's accept list, so it is both the client hint and the server-side check. Adding a type here does not make WordPress accept the extension elsewhere, and the browser still has to be able to play it.",
    "params": [
      {
        "name": "videoTypes",
        "type": "array",
        "desc": "MIME type strings."
      }
    ],
    "returns": "`array` — a flat list of MIME types.",
    "related": [
      "fluent_community/support_audio_types",
      "fluent_community/video_upload_max_file_size"
    ]
  },
  "fluent_community/survey_config_response": {
    "summary": "Filters the survey configuration returned to the voter after a ballot is cast.",
    "details": "Applied to the response only — unlike `fluent_community/feed/updated_survey_config` nothing here is persisted. It runs after the reload that marks the current voter's own choices with `voted = true` on each matching option, so it is the right place to adjust what a voter is shown without changing the stored tallies. It only runs on the vote endpoint; a survey rendered as part of a normal feed fetch does not pass through it.",
    "params": [
      {
        "name": "surveyConfig",
        "type": "array",
        "desc": "The survey configuration with the voter's own `voted` flags applied."
      },
      {
        "name": "feed",
        "type": "\\FluentCommunity\\App\\Models\\Feed",
        "desc": "The survey post."
      },
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID of the voter."
      }
    ],
    "returns": "The survey configuration array, returned under a `survey_config` key.",
    "related": [
      "fluent_community/feed/updated_survey_config"
    ]
  },
  "fluent_community/survey_voters_api_response": {
    "summary": "Filters the list of members who voted for one survey option.",
    "details": "The option is identified by its slug, which is stored in the reaction's `object_type` column. Capped at 100 voters with no paging, and voters without a profile row are excluded. Access is checked against the parent post, not against the survey — anyone who can read the post can enumerate its voters.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `voters` collection."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/reactions_api_response"
    ]
  },
  "fluent_community/template_footer": {
    "summary": "Prints at the end of `<body>` in the WordPress theme frame templates, after `wp_footer()`.",
    "details": "Core renders the mobile bottom menu here. The Gutenberg community block also fires it, but indirectly — it defers the call into `wp_footer` at priority 99, so relative ordering against other footer output differs between the block and the frame templates.",
    "related": [
      "fluent_community/template_header",
      "fluent_community/portal_footer"
    ]
  },
  "fluent_community/template_header": {
    "summary": "Prints inside `<head>` of the WordPress theme frame templates, after `wp_head()`.",
    "details": "Applies to the `fluent-community-frame.php` and `fluent-community-frame-full.php` page templates — the theme-integrated portal, not the standalone SPA page. Pro registers PWA meta tags and custom CSS on this and on `fluent_community/portal_head` together, which is the usual pattern for head output that must appear on every portal variant.",
    "related": [
      "fluent_community/portal_head",
      "fluent_community/template_footer"
    ]
  },
  "fluent_community/template_slug": {
    "summary": "Filters the page template slug used to decide whether a WordPress page renders the community frame.",
    "details": "Applied in `TemplateLoader::maybeIncludeTemplate()` to the value from `get_page_template_slug()`, and matched against `fluent-community-frame.php` and `fluent-community-frame-full.php`. Returning one of those two names forces any page onto the frame; anything else falls through to the theme. It is skipped entirely on block themes, which take a separate branch keyed on `wp-custom-template-community-template`, and it only runs when a global `$post` is set.",
    "params": [
      {
        "name": "templateSlug",
        "type": "string",
        "desc": "The page's assigned template slug, often empty."
      }
    ],
    "returns": "`string` — a template file name. Only the two frame templates have any effect.",
    "related": [
      "fluent_community/is_supported_theme",
      "fluent_community/theme_content"
    ]
  },
  "fluent_community/terms_policy_url": {
    "summary": "Filters the URL linked from the signup form's terms checkbox.",
    "details": "Defaults to `get_privacy_policy_url()`, which is empty until a privacy page is set — and when it is empty the checkbox label degrades to plain unlinked text rather than linking nowhere. The URL is escaped into an `<a target=\"_blank\" rel=\"noopener\">`. It is only consulted when the administrator has not supplied a custom terms field in the auth settings, since a stored terms field replaces the generated label wholesale.",
    "params": [
      {
        "name": "policyUrl",
        "type": "string",
        "desc": "The terms or privacy policy URL. `get_privacy_policy_url()` by default."
      }
    ],
    "returns": "`string` — a URL, or an empty string to render the label without a link.",
    "related": [
      "fluent_community/auth/signup_fields"
    ]
  },
  "fluent_community/theme_body_atts": {
    "summary": "Prints extra attributes into the `<body>` tag of the theme frame templates.",
    "details": "Output is echoed raw into the opening tag directly after `body_class()`, so emit `key=\"value\"` pairs and escape them yourself; returning a value does nothing. Core uses it for Blocksy support, keyed off the theme name passed in.",
    "params": [
      {
        "name": "themeName",
        "type": "string",
        "desc": "The active theme's directory slug, from `get_option('template')`."
      }
    ],
    "related": [
      "fluent_community/theme_content"
    ]
  },
  "fluent_community/theme_content": {
    "summary": "Renders the WordPress page content area inside the community frame layout.",
    "details": "Core attaches `TemplateLoader::renderWpContent()` at priority 10, so callbacks added later append to the theme content. To take the region over entirely, remove the default first — the FluentCart checkout integration does exactly that with `remove_all_actions('fluent_community/theme_content', 10)`.",
    "params": [
      {
        "name": "themeName",
        "type": "string",
        "desc": "The active theme's directory slug."
      },
      {
        "name": "layout",
        "type": "string",
        "desc": "`default` for the standard frame, `full` for the full-width frame template."
      }
    ],
    "related": [
      "fluent_community/theme_body_atts"
    ]
  },
  "fluent_community/top_menu_right_items": {
    "summary": "Renders the right-hand group of the portal header — search, notifications, and the account menu.",
    "details": "Core attaches `PortalHandler::renderTopMenuRightItems()` at the default priority, so a callback added here appends beside the default block rather than replacing it; remove the core action to take the region over. For additions inside the default list use the finer-grained `fluent_community/before_header_right_menu_items` and `fluent_community/after_header_right_menu_items` instead.",
    "params": [
      {
        "name": "context",
        "type": "string",
        "desc": "Render context: `headless`, `wp`, or `block_editor`. The `headless` context suppresses the server-rendered notification bell, since the SPA draws its own."
      }
    ],
    "related": [
      "fluent_community/before_header_right_menu_items",
      "fluent_community/after_header_right_menu_items"
    ]
  },
  "fluent_community/track_activity": {
    "summary": "A no-argument ping that a user did something worth refreshing their last-seen timestamp for.",
    "details": "Fired after a post or comment activity row is written, and on every portal ticker poll. It carries no payload — the handler resolves the current profile itself, and debounces so `last_activity` is written at most once every five minutes. Do not treat it as a content event; use the specific content hooks for that.",
    "related": [
      "fluent_community/feed/created",
      "fluent_community/comment_added"
    ]
  },
  "fluent_community/track_activity_throttle_seconds": {
    "summary": "Filters how long a member's last-seen timestamp is left alone before it is written again.",
    "details": "Defaults to 300. The portal ticker polls every 45 to 75 seconds per session, and without this debounce every poll would issue a profile write, so lowering it materially increases database load on a busy community. Returning 0 disables the debounce entirely. The value also determines how stale `last_activity` may be, which in turn shifts the unread-post cut-off.",
    "params": [
      {
        "name": "throttleSeconds",
        "type": "int",
        "desc": "Minimum seconds between `last_activity` writes, 300 by default."
      }
    ],
    "returns": "`int` — seconds.",
    "related": [
      "fluent_community/track_activity",
      "fluent_community/last_activity_date_for_unread_feeds"
    ]
  },
  "fluent_community/unread_notifications_api_response": {
    "summary": "Filters the unread-notification response used by the header dropdown.",
    "details": "Distinct from the paginated listing: it returns at most 50 unread notifications with no paging, and its `unread_count` is a separate query that can therefore exceed the number of items returned. The type filter from the request applies to the list but not to the count.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload: `notifications` list and `unread_count`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters, including `notification_type`."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/notifications_api_response"
    ]
  },
  "fluent_community/update_auth_settings": {
    "summary": "Filters the portal authentication settings just before they are saved.",
    "details": "Runs after AuthenticationService::formatAuthSettings() has normalised the payload and before it is written to the option and primed into the week-long cache. The login and signup form field lists are attached to the response *after* this filter, so they are not visible to a callback.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "The formatted auth settings."
      }
    ],
    "returns": "The settings array to persist."
  },
  "fluent_community/update_course_welcome_banner_settings": {
    "summary": "Filters course welcome banner settings on save, just before they are persisted.",
    "details": "Runs after sanitisation and after each view's markdown description has been rendered into description_rendered. A callback that rewrites `description` here must render description_rendered itself, since that step has already happened.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "Sanitised banner settings keyed by view."
      },
      {
        "name": "course",
        "type": "\\FluentCommunity\\Modules\\Course\\Model\\Course",
        "desc": "The course."
      }
    ],
    "returns": "The settings array to persist.",
    "related": [
      "fluent_community/course/welcome_banner_updated"
    ]
  },
  "fluent_community/update_lockscreen_settings": {
    "summary": "Filters lockscreen (paywall) settings just before they are saved to a space or course.",
    "details": "Shared by both endpoints — PUT /spaces/{spaceSlug}/lockscreens and PUT /admin/courses/{course_id}/lockscreens — so the second argument is a Space on one path and a Course on the other. Branch on the model type if the two need different handling. Runs after LockscreenService::formatLockscreenFields().",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "The formatted lockscreen fields."
      },
      {
        "name": "target",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The Space or Course the lockscreen belongs to."
      }
    ],
    "returns": "The lockscreen settings array to persist."
  },
  "fluent_community/update_profile_data": {
    "summary": "Filters the profile attributes about to be saved from the profile edit form.",
    "details": "Runs early, on a payload narrowed to `first_name`, `last_name`, `short_description` and `website`, and before the moderator-only fields, the username change and the display name are resolved. That ordering matters: `display_name` and `short_description` are both overwritten from the request after this filter, so setting them here is pointless, while extra keys you add survive to the save. Pro uses it for custom profile fields and user moderation flags.",
    "params": [
      {
        "name": "updateData",
        "type": "array",
        "desc": "The attributes to save: `first_name`, `last_name`, `short_description`, `website`."
      },
      {
        "name": "data",
        "type": "array",
        "desc": "The full submitted form data, including `headline` and `social_links`."
      },
      {
        "name": "xProfile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The profile being edited."
      },
      {
        "name": "currentUser",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The acting user, who may be a moderator editing someone else. Optional — some Pro callbacks register for three arguments."
      }
    ],
    "returns": "`array` — the attribute map.",
    "related": [
      "fluent_community/profile_view_data"
    ]
  },
  "fluent_community/update_profile_link_providers": {
    "summary": "Delivers the set of social link providers an administrator has enabled.",
    "details": "The free plugin does not persist this itself — the endpoint validates the submitted keys against the known providers, fires the hook and returns a success message, and it is Pro that writes the `enabled_profile_link_keys` option from a callback. Without Pro the setting appears to save but has no effect. The payload is a re-indexed list of provider keys, not a map.",
    "params": [
      {
        "name": "config",
        "type": "array",
        "desc": "The enabled provider keys, filtered against the registered providers."
      }
    ],
    "related": [
      "fluent_community/social_link_providers",
      "fluent_community/profile_link_providers_api_response"
    ]
  },
  "fluent_community/update_welcome_banner_settings": {
    "summary": "Filters the welcome-banner settings on their way to storage.",
    "details": "Runs after sanitisation and after the markdown descriptions have been rendered into `description_rendered`, so if you change a `description` here you must render its HTML twin yourself. Whatever you return is written to the `welcome_banner_settings` option and cached for a week, and is also echoed back in the response. It takes a single argument — there is no request payload.",
    "params": [
      {
        "name": "settings",
        "type": "array",
        "desc": "The sanitised settings, keyed `login` and `logout`."
      }
    ],
    "returns": "The settings array, written verbatim to the option.",
    "related": [
      "fluent_community/get_welcome_banner_settings"
    ]
  },
  "fluent_community/upload_folder_name": {
    "summary": "Filters the folder, relative to the WordPress uploads base directory, that FluentCommunity writes media into.",
    "details": "Defaults to the `FLUENT_COMMUNITY_UPLOAD_DIR` constant and is applied in two places that must agree — the directory resolver and the custom upload-dir override — so filter it unconditionally rather than for one code path. On first use the directory is created with a hardening `.htaccess` and an `index.php`; a folder you point at that already exists will not get those files. Pro's Document Library filters it temporarily to redirect document uploads.",
    "params": [
      {
        "name": "folderName",
        "type": "string",
        "desc": "Path fragment appended to the uploads base directory, with a leading slash."
      }
    ],
    "returns": "`string` — the folder path fragment. Existing media is not migrated, so changing it orphans previously uploaded files."
  },
  "fluent_community/use_editor_block": {
    "summary": "Filters whether the Gutenberg community block module is registered.",
    "details": "Read once during module bootstrap, so it must be filtered from a plugin or a must-use file rather than from a theme. Returning `false` skips `Modules\\Gutenberg\\EditorBlock` entirely: the community block disappears from the block inserter and the block-based portal embed stops working. It does not affect the lesson block editor, which is wired up separately.",
    "params": [
      {
        "name": "useEditorBlock",
        "type": "bool",
        "desc": "Whether to register the Gutenberg block module. `true` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness at bootstrap time.",
    "related": [
      "fluent_community/block_editor_settings"
    ]
  },
  "fluent_community/user/password_changed": {
    "summary": "Fires after a member changes their own password from the portal profile settings.",
    "details": "Only the self-service change fires it; a password reset through WordPress or an administrator edit does not. It runs after `wp_set_password()` has destroyed every session and the controller has re-issued the auth cookie for the current one, so the user is still signed in and fresh REST and AJAX nonces are minted straight after. Only the user ID is passed.",
    "params": [
      {
        "name": "userId",
        "type": "int",
        "desc": "WordPress user ID whose password changed."
      }
    ]
  },
  "fluent_community/user/permissions": {
    "summary": "Filters the permission map derived from a user's community roles.",
    "details": "Applied at both ends of `User::getRolePermissions()`. Users with no community role reach the early branch and receive only `['read' => true]` with an empty `$roles` array, so a callback must cope with a map that has none of the usual keys. The result is cached per user for the request and is what the Vue app receives as `appVars.permissions`, so anything added here becomes visible to the front end.",
    "params": [
      {
        "name": "permissions",
        "type": "array",
        "desc": "Permission keys mapped to booleans, for example `community_admin`, `delete_any_feed`, `course_creator`."
      },
      {
        "name": "roles",
        "type": "array",
        "desc": "The user's community role slugs. Empty for users with no community role."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The user the permissions belong to."
      }
    ],
    "returns": "`array` — the permission map. Keep the existing keys unless you intend to revoke them; several controllers read them directly.",
    "related": [
      "fluent_community/super_admin_capability"
    ]
  },
  "fluent_community/user/space/permissions": {
    "summary": "Filters the permission map a user holds inside one particular space.",
    "details": "Distinct from the site-wide `fluent_community/user/permissions`: this is resolved per space and per role, and it is what the front end receives on each space object. Two very different maps reach it — non-members get a short read-only set, while members and moderators get the full one with `community_admin`, the `*_any_feed` and `*_any_comment` keys and the membership flags — so check for a key before relying on it. `is_member` is added just before the filter and is the reliable way to tell the two apart. Several controllers read these keys directly for authorisation, so removing one denies access rather than merely hiding a control.",
    "params": [
      {
        "name": "permissions",
        "type": "array",
        "desc": "Permission keys mapped to booleans for this space."
      },
      {
        "name": "space",
        "type": "\\FluentCommunity\\App\\Models\\BaseSpace",
        "desc": "The space the permissions apply to."
      },
      {
        "name": "role",
        "type": "string",
        "desc": "The user's role in the space: `admin`, `moderator`, `member`, `student`, or empty for a non-member."
      },
      {
        "name": "user",
        "type": "\\FluentCommunity\\App\\Models\\User",
        "desc": "The user the permissions belong to."
      }
    ],
    "returns": "`array` — the permission map.",
    "related": [
      "fluent_community/user/permissions"
    ]
  },
  "fluent_community/user_level_upgraded": {
    "summary": "Fires when a member's point total moves them into a higher leaderboard level.",
    "details": "Fires only on a genuine level change, not on every point change: the handler first checks that the new total exceeds the old level's ceiling and then that the level slug actually differs. Because it hangs off fluent_community/user_points_updated it can fire from the hourly point recalculation or the daily sync job, not only from live activity. It is one-directional — there is no downgrade action. Requires the leader_board_module feature to be enabled; FluentCRM automations use it as a trigger.",
    "params": [
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The member who levelled up, with the new total_points already saved."
      },
      {
        "name": "newLevel",
        "type": "array",
        "desc": "The new level — title, tagline, slug, level, min_points, max_points."
      },
      {
        "name": "oldLevel",
        "type": "array",
        "desc": "The previous level, same shape."
      }
    ],
    "related": [
      "fluent_community/leaderboard_api_response"
    ]
  },
  "fluent_community/user_points_updated": {
    "summary": "Fires after a member's total leaderboard points are recalculated to a different value.",
    "details": "Points are recalculated lazily and cached for an hour per user, so this fires at most once an hour per member under normal traffic, and not at all when the recalculated total matches the stored one. The profile is already saved with the new total; `$oldPoints` is the only way to see the delta. Pro's leaderboard listens here to detect level changes.",
    "params": [
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The member profile, already saved with the new total."
      },
      {
        "name": "oldPoints",
        "type": "int",
        "desc": "The point total before the recalculation."
      }
    ]
  },
  "fluent_community/verified_email_senders": {
    "summary": "Filters the sender addresses offered when configuring community emails.",
    "details": "Populated from FluentSMTP's configured sender mappings, and empty when FluentSMTP is not installed. It is a flat list of email addresses surfaced to the admin screen as `verified_email_senders`; it drives the selectable options only and enforces nothing at send time.",
    "params": [
      {
        "name": "verifiedSenders",
        "type": "array",
        "desc": "Email address strings."
      }
    ],
    "returns": "`array` — a flat list of email addresses."
  },
  "fluent_community/video_upload_max_file_size": {
    "summary": "Filters the size ceiling for FluentPlayer media uploads, in the unit set by the companion filter.",
    "details": "Defaults to 300 and is interpreted alongside `fluent_community/video_upload_max_file_unit`: with the default `MB` unit, the value is multiplied by 1024 into the kilobytes the validator expects. Any unit string other than `MB` or `GB` leaves the number unmultiplied, so it is read as kilobytes. This is only the plugin's own limit — PHP's `upload_max_filesize` and the web server still apply, and the endpoint checks for those separately.",
    "params": [
      {
        "name": "maxFileSize",
        "type": "int",
        "desc": "The numeric ceiling, 300 by default."
      }
    ],
    "returns": "`int` — a number in the configured unit; it also appears verbatim in the error message.",
    "related": [
      "fluent_community/video_upload_max_file_unit"
    ]
  },
  "fluent_community/video_upload_max_file_unit": {
    "summary": "Filters the unit the FluentPlayer upload size limit is expressed in.",
    "details": "Compared case-insensitively against `MB` and `GB`; anything else means the size is used as kilobytes unchanged, which is a quiet way to shrink the limit by a factor of 1024. The string is also shown to the user in the \"file must be less than…\" message, so return something readable.",
    "params": [
      {
        "name": "maxFileUnit",
        "type": "string",
        "desc": "`MB` by default; `GB` is also recognised."
      }
    ],
    "returns": "`string` — a unit label. Unrecognised values are treated as kilobytes.",
    "related": [
      "fluent_community/video_upload_max_file_size"
    ]
  },
  "fluent_community/welcome_banner_api_response": {
    "summary": "Filters the welcome-banner payload the portal fetches at runtime.",
    "details": "The scope is chosen from the session, not the request: a logged-in visitor gets the `login` banner and a guest gets the `logout` one. `welcome_banner` is `null` when the relevant banner is disabled. The value has already passed through `fluent_community/welcome_banner_for_logged_in` or `..._for_guests`.",
    "params": [
      {
        "name": "data",
        "type": "array",
        "desc": "Response payload with a `welcome_banner` key, possibly `null`."
      },
      {
        "name": "requestData",
        "type": "array",
        "desc": "The full request parameters."
      }
    ],
    "returns": "The response payload array.",
    "related": [
      "fluent_community/welcome_banner_for_logged_in",
      "fluent_community/welcome_banner_for_guests"
    ]
  },
  "fluent_community/welcome_banner_for_guests": {
    "summary": "Filters the welcome banner shown to logged-out visitors.",
    "details": "Only reached when the `logout` banner is enabled — a disabled banner returns `null` before the filter runs, so this is not the hook for adding a banner where none is configured. The raw markdown `description` has been removed by this point; the rendered HTML lives in `description_rendered`. When a custom URL is not in use the call-to-action link has already been rewritten to the portal auth URL.",
    "params": [
      {
        "name": "welcomeBanner",
        "type": "array",
        "desc": "The guest banner: `enabled`, `description_rendered`, `mediaType`, `bannerImage`, `bannerVideo`, `buttonLabel`, `buttonLink`."
      }
    ],
    "returns": "The banner array.",
    "related": [
      "fluent_community/welcome_banner_for_logged_in"
    ]
  },
  "fluent_community/welcome_banner_for_logged_in": {
    "summary": "Filters the welcome banner shown to signed-in members.",
    "details": "The `login` twin of the guest filter, with the same caveats: it is skipped entirely when the banner is disabled, and the raw `description` has been stripped in favour of `description_rendered`. The banner is global — there is no per-space or per-member variant, so scope it yourself if you need one.",
    "params": [
      {
        "name": "welcomeBanner",
        "type": "array",
        "desc": "The member banner: `enabled`, `description_rendered`, `mediaType`, `allowClose`, `bannerImage`, `bannerVideo`, `ctaButtons`."
      }
    ],
    "returns": "The banner array.",
    "related": [
      "fluent_community/welcome_banner_for_guests"
    ]
  },
  "fluent_community/will_render_default_sidebar_items": {
    "summary": "Filters whether the sidebar's built-in navigation is rendered at all.",
    "details": "Return `false` and `#fcom_sidebar_wrap` is emitted empty — the home links, space groups, custom link groups and the \"# Manage\" block are all skipped, while the wrapper and the surrounding hooks still fire, leaving you a clean container to fill from `fluent_community/before_sidebar_wrap` or `fluent_community/after_sidebar_wrap`. Core switches it off on the portal settings routes.",
    "params": [
      {
        "name": "willRender",
        "type": "bool",
        "desc": "Whether to draw the default sidebar contents. `true` by default."
      }
    ],
    "returns": "`bool` — evaluated for truthiness by the template.",
    "related": [
      "fluent_community/sidebar_menu_groups_config",
      "fluent_community/before_sidebar_wrap"
    ]
  },
  "fluent_community/wppayform__defaults": {
    "summary": "Filters the default settings for the Paymattic (WPPayForm) community integration on a form.",
    "details": "Supplies the starting values shown when the integration is first configured for a form — space and course assignment, auto-login, welcome email, the conditional-logic block, and the removal triggers for subscription cancellation and refund. Requires Paymattic to be active. It does not affect a form whose integration settings have already been saved.",
    "params": [
      {
        "name": "fields",
        "type": "array",
        "desc": "The default integration settings."
      },
      {
        "name": "formId",
        "type": "int",
        "desc": "The Paymattic form id."
      }
    ],
    "returns": "The default settings array."
  },
  "fluent_community/xprofile/badge": {
    "summary": "Filters the badge object exposed as XProfile::$badge.",
    "details": "Backs a model accessor, so it runs every time $xprofile->badge is read — including once per profile in any serialized member list. Nothing in core or Pro attaches a callback, and the default is null: this is an unimplemented extension point. Note that the shipped Pro badge feature does not go through it — those badges are stored per profile in xprofile meta under badge_slug and published to the portal separately via the user_badges portal var.",
    "params": [
      {
        "name": "badge",
        "type": "mixed",
        "desc": "Null by default."
      },
      {
        "name": "xprofile",
        "type": "\\FluentCommunity\\App\\Models\\XProfile",
        "desc": "The profile whose badge is being resolved."
      }
    ],
    "returns": "The badge value to expose on the profile, or null for none. Keep it cheap — this runs per profile, per render."
  },
  "fluent_community/xprofile_public_fields": {
    "summary": "Filters the profile columns selected whenever a member is embedded in another response.",
    "details": "Used as the `select()` list for the `xprofile` relation across posts, comments, reactions, member listings and notifications, so every entry must be a real column on `fcom_xprofile` or the query fails. The default set already varies with the privacy settings: `created_at` and `short_description` are added when profiles are viewable, `last_activity` when last-seen display is on. Adding columns here widens what is exposed everywhere at once.",
    "params": [
      {
        "name": "fields",
        "type": "array",
        "desc": "Column names on `fcom_xprofile`."
      }
    ],
    "returns": "`array` — a flat list of column names. Non-existent columns produce SQL errors rather than being ignored.",
    "related": [
      "fluent_community/profile_view_data"
    ]
  },
  "fluent_community/{scope}_color": {
    "summary": "Dynamic filter for a single resolved colour from the active colour scheme.",
    "details": "Two scopes are used in the shipped code: `theme`, which resolves the primary button colour and becomes the `<meta name=\"theme-color\">` value, and `theme_button_text`, the primary button text colour. Any other scope passed to `Utility::getThemeColor()` is treated as a direct key into the light skin's body selectors. The value is memoised in a static per scope, so the filter runs at most once per scope per request and later callbacks may not be reached. Only the light scheme is consulted — there is no dark variant of this hook.",
    "params": [
      {
        "name": "color",
        "type": "string",
        "desc": "The resolved colour, or the scope's default if the skin does not define it."
      }
    ],
    "returns": "`string` — a CSS colour value. It is escaped as an attribute where it is printed.",
    "related": [
      "fluent_community/color_schmea_config",
      "fluent_community/suggested_colors"
    ]
  },
  "fluent_community_daily_jobs": {
    "page": "settings",
    "summary": "Action Scheduler task that runs once every 24 hours for the plugin's daily maintenance.",
    "details": "Registered on activation and re-registered whenever a site administrator loads the portal, in the `fluent-community` Action Scheduler group. Core uses it to fire `fluent_community/remove_old_notifications` and to prune Action Scheduler logs older than seven days; Pro's leaderboard uses it to resync points. It takes no arguments and runs in a queue-runner request, so nothing about the current user is available.",
    "related": [
      "fluent_community_scheduled_hour_jobs"
    ]
  },
  "fluent_community_scheduled_hour_jobs": {
    "page": "settings",
    "summary": "Action Scheduler task that runs hourly for the plugin's short-interval maintenance.",
    "details": "Core uses it to re-evaluate the daily digest schedule and to fire `fluent_community/maybe_delete_draft_medias`. Like the daily job it is unscheduled on deactivation and takes no arguments. Hook here rather than to WP-Cron if you need work that must survive a page-load-free site.",
    "related": [
      "fluent_community_daily_jobs",
      "fluent_community_send_daily_digest"
    ]
  },
  "fluent_community_send_daily_digest": {
    "summary": "Fires when a batch of daily digest emails is due to be sent.",
    "details": "Not a once-per-day event. The scheduled `fluent_community_send_daily_digest_init` action fires it, and the core handler then walks recipients 100 at a time, re-scheduling this same action whenever it approaches its run-time budget — so it can fire many times for a single digest run. It takes no arguments; the handler tracks its position through the `last_digest_sent_user_id` option.",
    "related": [
      "fluent_community_scheduled_hour_jobs"
    ]
  },
  "fluent_community_send_daily_digest_init": {
    "summary": "Scheduled action that kicks off a digest run at the configured day and time.",
    "details": "Note the underscore-only naming. It is a one-shot Action Scheduler entry rather than a recurring one: the hourly maintenance job re-schedules the next occurrence, and unschedules it when digests are disabled globally and no member has opted in individually. Its only job is to fire `fluent_community_send_daily_digest`, which is where the batching happens, so hook that one for the actual send. It takes no arguments.",
    "related": [
      "fluent_community_send_daily_digest",
      "fluent_community_scheduled_hour_jobs"
    ]
  },
  "fluent_community_sync_user_points": {
    "summary": "Action Scheduler task that recalculates leaderboard points for a batch of members.",
    "details": "Pro-only, part of the leaderboard module, and note the underscore-only naming — it does not use the `fluent_community/` prefix. The handler walks members in batches, storing its cursor in the `last_leaderboard_synced_user_id` option, and re-queues itself when it runs out of time, so it fires repeatedly for one logical sync. It takes no arguments. Each recalculation that changes a total fires `fluent_community/user_points_updated`.",
    "related": [
      "fluent_community/user_points_updated",
      "fluent_community_daily_jobs"
    ]
  },
  "fluent_communuty/add_sitemap_provider": {
    "summary": "Filters whether FluentCommunity registers its WordPress sitemap provider.",
    "details": "Returning false on this filter stops wp_register_sitemap_provider() from running, which removes the community entries from the core WordPress sitemap — useful when a dedicated SEO plugin is already emitting them. It runs on `init`, so a callback has to be attached before that. Note the hook prefix is misspelled `fluent_communuty` in the source; the name is part of the public surface and is documented as written.",
    "params": [
      {
        "name": "shouldRegister",
        "type": "bool",
        "desc": "True by default."
      }
    ],
    "returns": "Boolean — false to skip registering the sitemap provider.",
    "page": "rendering"
  },
}
