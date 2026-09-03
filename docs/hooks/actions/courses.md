---
title: Courses Actions
description: Courses action hooks for FluentCommunity.
---

# Courses Actions

34 unique action hooks currently map to this category, across 44 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/course`](#fluent-community-course) | Core | 2 | `fluent-community/app/Http/Controllers/ProfileController.php:662` |
| [`fluent_community/course/{courseType}/unschedule_notification`](#fluent-community-course-courseType-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:125` |
| [`fluent_community/course/{prevType}/unschedule_notification`](#fluent-community-course-prevType-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:115` |
| [`fluent_community/course/before_create`](#fluent-community-course-before-create) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:147` |
| [`fluent_community/course/before_delete`](#fluent-community-course-before-delete) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:409` |
| [`fluent_community/course/before_progress_reset`](#fluent-community-course-before-progress-reset) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:302` |
| [`fluent_community/course/completed`](#fluent-community-course-completed) | Core | 2 | `fluent-community/Modules/Course/Services/CourseHelper.php:278` |
| [`fluent_community/course/created`](#fluent-community-course-created) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:182` |
| [`fluent_community/course/deleted`](#fluent-community-course-deleted) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:442` |
| [`fluent_community/course/enrolled`](#fluent-community-course-enrolled) | Core | 2 | `fluent-community/app/Services/Helper.php:1761` |
| [`fluent_community/course/lesson_completed`](#fluent-community-course-lesson-completed) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:211` |
| [`fluent_community/course/lesson_marked_incomplete`](#fluent-community-course-lesson-marked-incomplete) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:195` |
| [`fluent_community/course/progress_reset`](#fluent-community-course-progress-reset) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:323` |
| [`fluent_community/course/published`](#fluent-community-course-published) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:329` |
| [`fluent_community/course/scheduled/init_notification`](#fluent-community-course-scheduled-init-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:228` |
| [`fluent_community/course/scheduled/send_notification_async`](#fluent-community-course-scheduled-send-notification-async) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:186` |
| [`fluent_community/course/scheduled/unschedule_notification`](#fluent-community-course-scheduled-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:227` |
| [`fluent_community/course/structured/init_notification`](#fluent-community-course-structured-init-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:238` |
| [`fluent_community/course/structured/send_notification_async`](#fluent-community-course-structured-send-notification-async) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:154` |
| [`fluent_community/course/structured/unschedule_notification`](#fluent-community-course-structured-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:237` |
| [`fluent_community/course/student_left`](#fluent-community-course-student-left) | Core | 1 | `fluent-community/app/Services/Helper.php:1831` |
| [`fluent_community/course/topic_completed`](#fluent-community-course-topic-completed) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:228` |
| [`fluent_community/course/update_meta_settings_{metaProvider}`](#fluent-community-course-update-meta-settings-metaProvider) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:343` |
| [`fluent_community/course/updated`](#fluent-community-course-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:327` |
| [`fluent_community/course/welcome_banner_updated`](#fluent-community-course-welcome-banner-updated) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:535` |
| [`fluent_community/lesson/additional_media_updated`](#fluent-community-lesson-additional-media-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1074` |
| [`fluent_community/lesson/before_deleted`](#fluent-community-lesson-before-deleted) | Core | 3 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:428` |
| [`fluent_community/lesson/duplicated`](#fluent-community-lesson-duplicated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1203` |
| [`fluent_community/lesson/updated`](#fluent-community-lesson-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1071` |
| [`fluent_community/lesson/video_watched`](#fluent-community-lesson-video-watched) | Core | 1 | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:158` |
| [`fluent_community/quiz/submitted`](#fluent-community-quiz-submitted) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:178` |
| [`fluent_community/section/before_deleted`](#fluent-community-section-before-deleted) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:425` |
| [`fluent_community/section/reactions_count_updated`](#fluent-community-section-reactions-count-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:835` |
| [`fluent_community/section/scheduled_at_updated`](#fluent-community-section-scheduled-at-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:832` |

<a id="fluent-community-course"></a>

## `fluent_community/course`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Passes each course by reference while a course list is being prepared for the front end.

Fired with `do_action_ref_array()`, so a callback declared as `function (&$course)` can attach or change properties in place — unusual for an action, and the reason it exists. It runs once per course in the course directory and in the profile "Courses" tab, after enrolment state, progress, cover photo fallback and the section, lesson and student counts have been set. Single-course responses take a different path and fire `fluent_community/course/processed` instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course, passed by reference. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:662` | `&$course` (Course) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:77` | `&$course` (Course) |

### Example

```php
add_action('fluent_community/course', function ($course) {
}, 10, 1);
```

**Related:** [`fluent_community/course/processed`](/hooks/filters/courses#fluent-community-course-processed) · [`fluent_community/courses_api_response`](/hooks/filters/courses#fluent-community-courses-api-response)

<a id="fluent-community-course-courseType-unschedule-notification"></a>

## `fluent_community/course/{courseType}/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Dynamic action asking the drip-email scheduler to drop any pending notification for a section.

The placeholder is the course type — `self_paced`, `scheduled` or `structured` — resolved by `Course::getCourseType()`. Only the `scheduled` and `structured` variants have listeners, so on a self-paced course the action fires into the void. Pro fires it from three places: when a section is about to be deleted, when a section's notification is switched off, and as the first half of the unschedule-then-reschedule pair used when a release date changes. Everything here is Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course the section belongs to. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section whose notification should be cancelled. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:125` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/{courseType}/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/course/{prevType}/unschedule_notification`](#fluent-community-course-prevType-unschedule-notification) · [`fluent_community/course/scheduled/send_notification_async`](#fluent-community-course-scheduled-send-notification-async)

<a id="fluent-community-course-prevType-unschedule-notification"></a>

## `fluent_community/course/{prevType}/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** The same unschedule action, fired against a course's previous type after the type is changed.

When a course switches between self-paced, scheduled and structured, the pending notifications belong to the old scheme, so Pro walks every section with notifications enabled, disables them, and fires the unschedule action with the *previous* type in the placeholder rather than the current one. Same signature and same listeners as `fluent_community/course/{courseType}/unschedule_notification` — a callback should handle both. Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course whose type just changed. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | A section that had notifications enabled; already saved with `email_enabled` set to `no`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:115` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/{prevType}/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/course/{courseType}/unschedule_notification`](#fluent-community-course-courseType-unschedule-notification) · [`fluent_community/course/updated`](#fluent-community-course-updated)

<a id="fluent-community-course-before-create"></a>

## `fluent_community/course/before_create`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires with the assembled course attributes just before a course row is written.

Two call sites behave differently. On the create endpoint the array is exactly what `Course::create()` is about to receive. On the duplicate endpoint the same hook fires with the source course's attributes plus the new title, slug, `draft` status and owner — but the copy is then made with `replicate()`, so the array you see is informational only. Since this is an action, not a filter, the attributes cannot be changed from here either way.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$courseData` | `array` | Course attributes: `title`, `slug`, `privacy`, `description`, `status`, `settings`, `serial`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:147` | `$courseData` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:363` | `$courseData` (mixed) |

### Example

```php
add_action('fluent_community/course/before_create', function ($courseData) {
}, 10, 1);
```

**Related:** [`fluent_community/course/created`](#fluent-community-course-created)

<a id="fluent-community-course-before-delete"></a>

## `fluent_community/course/before_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires before a course and everything attached to it is removed.

The last point at which the course's sections, lessons, comments, reactions and enrolments are all still readable. What follows is a cascade: reactions and comments are deleted, then each section fires `fluent_community/section/before_deleted` and each of its lessons fires `fluent_community/lesson/before_deleted`, then enrolments go, then the course row.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:409` | `$course` (Course) |

### Example

```php
add_action('fluent_community/course/before_delete', function ($course) {
}, 10, 1);
```

**Related:** [`fluent_community/course/deleted`](#fluent-community-course-deleted) · [`fluent_community/section/before_deleted`](#fluent-community-section-before-deleted)

<a id="fluent-community-course-before-progress-reset"></a>

## `fluent_community/course/before_progress_reset`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires before a student's progress in a course is wiped.

The completion and course-completed rows still exist here, so this is the point at which a record of what the student had finished can be captured. It fires before the transaction opens and runs even if the reset then fails, in which case `fluent_community/course/progress_reset` never follows.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course being reset. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:302` | `$course` (Course)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/before_progress_reset', function ($course, $userId) {
}, 10, 2);
```

**Related:** [`fluent_community/course/progress_reset`](#fluent-community-course-progress-reset)

<a id="fluent-community-course-completed"></a>

## `fluent_community/course/completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires when a student's progress in a course reaches 100 per cent.

Evaluated after each lesson completion and backed by a `course_completed` activity row, so it normally fires once per student per course. A second call site is meant to re-fire it when an already-completed course is finished again, but it gates on the lesson's `scheduled_at` being later than the activity timestamp — and nothing in the lesson editor ever writes that column — so in practice it does not trigger. It is registered as a FluentCRM automation trigger.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The completed course. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:278` | `$course` (Course)<br>`$userId` (int) |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:290` | `$course` (Course)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/completed', function ($course, $userId) {
}, 10, 2);
```

**Related:** [`fluent_community/course/lesson_completed`](#fluent-community-course-lesson-completed) · [`fluent_community/course/progress_reset`](#fluent-community-course-progress-reset)

<a id="fluent-community-course-created"></a>

## `fluent_community/course/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires after a new course row exists, its images claimed and its categories synced.

Covers both a fresh course and a duplicated one; on the duplicate path every section, lesson and attached document has already been copied by the time it runs. A course created with `status` of `published` straight away does not additionally fire `fluent_community/course/published` — that hook only observes transitions made through the update endpoint.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The new course. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:182` | `$course` (Course) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:397` | `$newCourse` (Course) |

### Example

```php
add_action('fluent_community/course/created', function ($course) {
}, 10, 1);
```

**Related:** [`fluent_community/course/before_create`](#fluent-community-course-before-create) · [`fluent_community/course/published`](#fluent-community-course-published)

<a id="fluent-community-course-deleted"></a>

## `fluent_community/course/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a course row and its associated records have been deleted.

Only the integer ID survives — the model is gone, so capture anything you need from `fluent_community/course/before_delete`. Enrolment rows are removed directly with a bulk delete on this path, so `fluent_community/course/student_left` does not fire for the students who lose access.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$courseId` | `int` | ID of the deleted course. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:442` | `$courseId` (int) |

### Example

```php
add_action('fluent_community/course/deleted', function ($courseId) {
}, 10, 1);
```

**Related:** [`fluent_community/course/before_delete`](#fluent-community-course-before-delete)

<a id="fluent-community-course-enrolled"></a>

## `fluent_community/course/enrolled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires once a user holds an active enrolment row in a course.

The course equivalent of `fluent_community/space/joined`; courses never fire the space hook. `Helper::addToSpace()` re-resolves the model to a `Course` before firing so that course relations are available, and only that path passes the fourth argument. Re-activating a lapsed enrolment fires the hook again with no `$created`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course that was joined. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |
| 3 | `$by` | `string` | How the enrolment came about: `self`, `by_admin`, `automation`, or an integration key. |
| 4 | `$created` | `\FluentCommunity\App\Models\SpaceUserPivot` | The newly created enrolment row. Optional — omitted when an existing row was reactivated. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1761` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1782` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed)<br>`$created` (mixed) |

### Example

```php
add_action('fluent_community/course/enrolled', function ($course, $userId, $by, $created) {
}, 10, 4);
```

**Related:** [`fluent_community/space/joined`](/hooks/actions/spaces#fluent-community-space-joined) · [`fluent_community/course/topic_completed`](#fluent-community-course-topic-completed)

<a id="fluent-community-course-lesson-completed"></a>

## `fluent_community/course/lesson_completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires the first time a student completes a lesson.

Tied to the creation of the completion record, not to the act of marking complete: a lesson that was completed, marked incomplete and completed again reuses the existing row and takes an early return, so this hook fires once per student per lesson for the lifetime of that row. Only a progress reset, which deletes the rows, makes it fire again. It is registered as a FluentCRM automation trigger.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The completed lesson. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:211` | `$lesson` (CourseLesson)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/lesson_completed', function ($lesson, $userId) {
}, 10, 2);
```

**Related:** [`fluent_community/course/topic_completed`](#fluent-community-course-topic-completed) · [`fluent_community/course/lesson_marked_incomplete`](#fluent-community-course-lesson-marked-incomplete)

<a id="fluent-community-course-lesson-marked-incomplete"></a>

## `fluent_community/course/lesson_marked_incomplete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a student un-completes a lesson they had previously completed.

The completion row is kept and its `type` flipped to `incomplete` rather than deleted, which is why completing the lesson again does not fire `fluent_community/course/lesson_completed`. Core listens to clear the video-watched record for gated lessons, so the student has to watch the video again before they can re-complete.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson marked incomplete. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:195` | `$lesson` (CourseLesson)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/lesson_marked_incomplete', function ($lesson, $userId) {
}, 10, 2);
```

**Related:** [`fluent_community/course/lesson_completed`](#fluent-community-course-lesson-completed) · [`fluent_community/is_allowed_to_complete_lesson`](/hooks/filters/courses#fluent-community-is-allowed-to-complete-lesson)

<a id="fluent-community-course-progress-reset"></a>

## `fluent_community/course/progress_reset`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a student's lesson completions and course-completion record have been deleted.

Only reached when the delete transaction succeeded. Both `completed` and `incomplete` completion rows are removed, so the student is genuinely back to nothing — which also means `fluent_community/course/lesson_completed` will fire again for lessons they had already finished. Core listens to clear video-watched records for the whole course.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course that was reset. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:323` | `$course` (Course)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/progress_reset', function ($course, $userId) {
}, 10, 2);
```

**Related:** [`fluent_community/course/before_progress_reset`](#fluent-community-course-before-progress-reset) · [`fluent_community/course/lesson_completed`](#fluent-community-course-lesson-completed)

<a id="fluent-community-course-published"></a>

## `fluent_community/course/published`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a course changes to published status through the admin editor.

Nested inside the dirty check, and fires immediately after `fluent_community/course/updated` for the same save. It observes a transition, so it only fires when the previous status was something other than `published`; re-saving an already published course is silent. A course created directly with a published status never reaches it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The newly published course. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:329` | `$course` (Course) |

### Example

```php
add_action('fluent_community/course/published', function ($course) {
}, 10, 1);
```

**Related:** [`fluent_community/course/updated`](#fluent-community-course-updated)

<a id="fluent-community-course-scheduled-init-notification"></a>

## `fluent_community/course/scheduled/init_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when drip email notifications are armed for a section of a scheduled-drip course.

Only reached for courses whose course_type is `scheduled` and for sections whose meta has email_enabled set to yes. Paired with the unschedule action — a settings change fires unschedule then init, so callbacks must be idempotent.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section whose notification is being armed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:228` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/scheduled/init_notification', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/course/scheduled/unschedule_notification`](#fluent-community-course-scheduled-unschedule-notification)

<a id="fluent-community-course-scheduled-send-notification-async"></a>

## `fluent_community/course/scheduled/send_notification_async`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Action Scheduler task that emails a scheduled course's section-release notification.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Queued in the `fluent-community` group for the section's release moment, converted to UTC, with the section ID as its only argument — one task per section, sent to every enrolled student. The handler walks recipients in batches and re-queues this same action when it nears its run-time budget, tracking its position in the section's `last_send_user_id` meta, so it can run many times for one release. Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$sectionId` | `int` | ID of the section being released. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:186` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:318` | No parameters |

### Example

```php
add_action('fluent_community/course/scheduled/send_notification_async', function ($sectionId) {
}, 10, 1);
```

**Related:** [`fluent_community/course/structured/send_notification_async`](#fluent-community-course-structured-send-notification-async)

<a id="fluent-community-course-scheduled-unschedule-notification"></a>

## `fluent_community/course/scheduled/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when drip email notifications are cancelled for a section of a scheduled-drip course.

Fires on an explicit cancel, on a settings reset (immediately before the matching init), and once per section when a course is switched away from the scheduled type — in that last case the handler has already flipped each section's email_enabled to no.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section whose notification is being cancelled. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:227` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/scheduled/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/course/scheduled/init_notification`](#fluent-community-course-scheduled-init-notification)

<a id="fluent-community-course-structured-init-notification"></a>

## `fluent_community/course/structured/init_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when drip email notifications are armed for a section of a structured course.

The structured counterpart. Structured courses schedule per enrolled student rather than per section date, so the per-student Action Scheduler jobs are keyed on both section id and user id.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section whose notification is being armed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:238` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/structured/init_notification', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/course/structured/unschedule_notification`](#fluent-community-course-structured-unschedule-notification)

<a id="fluent-community-course-structured-send-notification-async"></a>

## `fluent_community/course/structured/send_notification_async`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Action Scheduler task that emails one student the release notification for a structured section.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Structured courses drip relative to each student's enrolment date, so unlike the scheduled variant this is queued per student — the arguments are the section ID and the user ID, and the pair is what `as_unschedule_all_actions()` matches on when an enrolment ends or a notification is switched off. Tasks are queued when a student enrols and when a section's notification is enabled. Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$sectionId` | `int` | ID of the section being released. |
| 2 | `$userId` | `int` | WordPress user ID of the enrolled student. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:154` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:203` | No parameters |

### Example

```php
add_action('fluent_community/course/structured/send_notification_async', function ($sectionId, $userId) {
}, 10, 2);
```

**Related:** [`fluent_community/course/scheduled/send_notification_async`](#fluent-community-course-scheduled-send-notification-async) · [`fluent_community/course/enrolled`](#fluent-community-course-enrolled)

<a id="fluent-community-course-structured-unschedule-notification"></a>

## `fluent_community/course/structured/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when drip email notifications are cancelled for a section of a structured course.

Fires on an explicit cancel, on a settings reset immediately before the matching init, and once per section when a course is switched away from the structured type.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section whose notification is being cancelled. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:237` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/structured/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/course/structured/init_notification`](#fluent-community-course-structured-init-notification)

<a id="fluent-community-course-student-left"></a>

## `fluent_community/course/student_left`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a student's enrolment row is removed from a course.

The course-side counterpart of `fluent_community/space/user_left`; courses never fire the space hook. Deleting the course itself does not fire it, because enrolments are then removed with a bulk query. Pro listens to unschedule drip emails and to sync the CRM, and it is registered as a FluentCRM automation trigger.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course the student left. |
| 2 | `$userId` | `int` | WordPress user ID of the departing student. |
| 3 | `$by` | `string` | What triggered the removal: `self`, `by_admin`, or `automation`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1831` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |

### Example

```php
add_action('fluent_community/course/student_left', function ($course, $userId, $by) {
}, 10, 3);
```

**Related:** [`fluent_community/course/enrolled`](#fluent-community-course-enrolled) · [`fluent_community/space/user_left`](/hooks/actions/spaces#fluent-community-space-user-left)

<a id="fluent-community-course-topic-completed"></a>

## `fluent_community/course/topic_completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when completing a lesson brings every published lesson in its section to completed for that student.

Evaluated inside the lesson-completion routine, immediately after `fluent_community/course/lesson_completed`, and only counts lessons with status `published` — draft lessons in the section do not hold completion back. Marking a lesson incomplete and completing it again will fire this a second time; it is not a one-shot event per student.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$topic` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section (module) that is now fully complete. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |
| 3 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson whose completion closed out the section. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:228` | `$topic` (mixed)<br>`$userId` (int)<br>`$lesson` (CourseLesson) |

### Example

```php
add_action('fluent_community/course/topic_completed', function ($topic, $userId, $lesson) {
}, 10, 3);
```

**Related:** [`fluent_community/course/enrolled`](#fluent-community-course-enrolled)

<a id="fluent-community-course-update-meta-settings-metaProvider"></a>

## `fluent_community/course/update_meta_settings_{metaProvider}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Dynamic action that hands a provider its slice of the course settings form back for saving.

The placeholder is the provider slug used when the section was contributed through `fluent_community/course/meta_fields`, so registration and saving must agree on the key. It fires once per provider present in the request's `meta_settings` map, after the course itself has been saved, and the values arrive exactly as the form submitted them — sanitise before storing. `FluentExtendApi::addMetaBox()` wires both halves up for you.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$metaData` | `array` | The submitted values for this provider, unsanitised. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course being saved. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:343` | `$metaData` (mixed)<br>`$course` (Course) |

### Example

```php
add_action('fluent_community/course/update_meta_settings_{metaProvider}', function ($metaData, $course) {
}, 10, 2);
```

**Related:** [`fluent_community/course/meta_fields`](/hooks/filters/courses#fluent-community-course-meta-fields) · [`fluent_community/space/update_meta_settings_{metaProvider}`](/hooks/actions/spaces#fluent-community-space-update-meta-settings-metaProvider)

<a id="fluent-community-course-updated"></a>

## `fluent_community/course/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a course is saved from the admin editor with at least one changed column.

Guarded by a dirty check, so a no-op save is silent, and settings-only changes count because `settings` is a single column. The third argument is a `clone` of the model taken before the new values were filled, which is the only way to see what a value used to be — Pro compares `settings.course_type` across the two to unschedule drip notifications when the course type changes. Category syncing and the meta-settings actions run after this hook, not before.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course after saving. |
| 2 | `$dirtyFields` | `array` | Changed attributes keyed by column, from `getDirty()`. |
| 3 | `$prevCourse` | `\FluentCommunity\Modules\Course\Model\Course` | A clone of the course as it was before the update. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:327` | `$course` (Course)<br>`$dirtyFields` (mixed)<br>`$prevCourse` (Course) |

### Example

```php
add_action('fluent_community/course/updated', function ($course, $dirtyFields, $prevCourse) {
}, 10, 3);
```

**Related:** [`fluent_community/course/published`](#fluent-community-course-published) · [`fluent_community/course/created`](#fluent-community-course-created)

<a id="fluent-community-course-welcome-banner-updated"></a>

## `fluent_community/course/welcome_banner_updated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after course welcome banner settings have been saved.

Runs once the settings are persisted, so it is the right place to bust a cache. The settings passed are the post-filter, post-sanitisation values.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |
| 2 | `$settings` | `array` | The saved banner settings. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:535` | `$course` (Course)<br>`$settings` (mixed) |

### Example

```php
add_action('fluent_community/course/welcome_banner_updated', function ($course, $settings) {
}, 10, 2);
```

**Related:** [`fluent_community/update_course_welcome_banner_settings`](/hooks/filters/courses#fluent-community-update-course-welcome-banner-settings)

<a id="fluent-community-lesson-additional-media-updated"></a>

## `fluent_community/lesson/additional_media_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires at the end of a lesson save so integrations can persist media that is not a lesson column.

Fires on every save of the lesson editor, including ones where nothing changed and `fluent_community/lesson/updated` stayed silent. The first argument is the entire unsanitised request payload — which is the point, since attached documents and other add-on media travel outside the lesson attributes — so sanitise anything you read from it. `$updateData` is what was actually filled onto the model.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$requestData` | `array` | The full, unsanitised request payload. |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The saved lesson. |
| 3 | `$updateData` | `array` | The attributes that were filled onto the lesson: `title`, `status`, `meta`, and `message` when submitted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1074` | `$request->all()` (array)<br>`$lesson` (CourseLesson)<br>`$updateData` (mixed) |

### Example

```php
add_action('fluent_community/lesson/additional_media_updated', function ($requestData, $lesson, $updateData) {
}, 10, 3);
```

**Related:** [`fluent_community/lesson/updated`](#fluent-community-lesson-updated)

<a id="fluent-community-lesson-before-deleted"></a>

## `fluent_community/lesson/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Runs immediately before a lesson row is deleted, while its relations are still queryable.

Fires from three places: deleting a single lesson, deleting a section (once per contained lesson), and deleting a whole course (once per lesson in every section). Core uses it to drop lesson media and watched-video records, so a bulk course delete will fan this out across every lesson.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:428` | `$courseLesson` (CourseLesson) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:907` | `$lesson` (CourseLesson) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1144` | `$lesson` (CourseLesson) |

### Example

```php
add_action('fluent_community/lesson/before_deleted', function ($lesson) {
}, 10, 1);
```

**Related:** [`fluent_community/section/before_deleted`](#fluent-community-section-before-deleted)

<a id="fluent-community-lesson-duplicated"></a>

## `fluent_community/lesson/duplicated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a lesson has been copied within its section.

The copy is a full `replicate()` with a fresh slug, a unique "(Copy)" title and a priority placing it immediately after the original; sibling priorities have already been re-indexed and attached documents copied across by the time it runs. Note the argument order — the new lesson comes first.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$newLesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The duplicate, freshly reloaded from the database. |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson it was copied from. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1203` | `$newLesson` (CourseLesson)<br>`$lesson` (CourseLesson) |

### Example

```php
add_action('fluent_community/lesson/duplicated', function ($newLesson, $lesson) {
}, 10, 2);
```

**Related:** [`fluent_community/lesson/create_data`](/hooks/filters/courses#fluent-community-lesson-create-data)

<a id="fluent-community-lesson-updated"></a>

## `fluent_community/lesson/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a lesson is saved from the admin editor with at least one changed column.

Guarded by a dirty check, so a save that changes nothing is silent — but note the companion action `fluent_community/lesson/additional_media_updated` fires unconditionally straight after, even on a no-op save. The third argument saves you comparing statuses yourself: it is `true` only when this save moved the lesson to `published` from something else.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson after saving. |
| 2 | `$dirtyFields` | `array` | Changed attributes keyed by column, from `getDirty()`. |
| 3 | `$isNewlyPublished` | `bool` | Whether this save published a previously unpublished lesson. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1071` | `$lesson` (CourseLesson)<br>`$dirtyFields` (mixed)<br>`$isNewlyPublished` (mixed) |

### Example

```php
add_action('fluent_community/lesson/updated', function ($lesson, $dirtyFields, $isNewlyPublished) {
}, 10, 3);
```

**Related:** [`fluent_community/lesson/update_data`](/hooks/filters/courses#fluent-community-lesson-update-data) · [`fluent_community/lesson/additional_media_updated`](#fluent-community-lesson-additional-media-updated)

<a id="fluent-community-lesson-video-watched"></a>

## `fluent_community/lesson/video_watched`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires the first time a student watches enough of a gated lesson video to unlock completion.

Backed by a watched record, so it fires once per student per lesson; a student who re-watches, or whose existing record is merely reactivated, does not fire it again. Watching the video is not the same as completing the lesson — completion is a separate call that this hook only unblocks.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The gated lesson. |
| 2 | `$userId` | `int` | WordPress user ID of the student. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:158` | `$lesson` (CourseLesson)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/lesson/video_watched', function ($lesson, $userId) {
}, 10, 2);
```

**Related:** [`fluent_community/is_allowed_to_complete_lesson`](/hooks/filters/courses#fluent-community-is-allowed-to-complete-lesson) · [`fluent_community/lesson_video_gate/default_threshold`](/hooks/filters/courses#fluent-community-lesson-video-gate-default-threshold)

<a id="fluent-community-quiz-submitted"></a>

## `fluent_community/quiz/submitted`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after a student submits a quiz and the attempt has been scored and saved.

Fires on every submission, including re-attempts — the attempt counter lives in $quizResult->meta['attempts']. The row is already persisted, so $quizResult->score (0-100) and $quizResult->status are final. status is "passed"/"failed" only when the lesson has a passing score enabled, otherwise it is "published". If the lesson meta sets hide_result, $quizResult->message has already been scrubbed of the correct/incorrect flags before this action runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$quizResult` | `\FluentCommunityPro\App\Modules\Quiz\QuizModel` | The saved attempt (score, status, meta, per-question message map). |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The student who submitted. |
| 3 | `$quiz` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The quiz-type lesson that was answered. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:178` | `$quizResult` (mixed)<br>`$user` (User)<br>`$quiz` (mixed) |

### Example

```php
add_action('fluent_community/quiz/submitted', function ($quizResult, $user, $quiz) {
}, 10, 3);
```

**Related:** [`fluent_community/question_types`](/hooks/filters/courses#fluent-community-question-types)

<a id="fluent-community-section-before-deleted"></a>

## `fluent_community/section/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Runs immediately before a course section is deleted.

Ordering differs between the two call sites. Deleting a course fires this before its lessons are removed; deleting a single section fires this, deletes the section row, and only then walks the lessons — so in that path the section no longer exists when the per-lesson hooks run. Pro uses it to unschedule drip notifications.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:425` | `$courseTopic` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:897` | `$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/before_deleted', function ($section) {
}, 10, 1);
```

**Related:** [`fluent_community/lesson/before_deleted`](#fluent-community-lesson-before-deleted)

<a id="fluent-community-section-reactions-count-updated"></a>

## `fluent_community/section/reactions_count_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when the drip offset of a section on a structured course changes.

Nothing to do with reactions. Structured courses release each section a number of days after the student enrols, and that offset is stored in the section row's reused `reactions_count` column — hence the name. It is gated on `isDirty('reactions_count')` and the field is only accepted when the course type is `structured`. Setting a scheduled date clears this value and vice versa, so the two hooks rarely fire for the same save.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course the section belongs to. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section, already saved with the new offset. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:835` | `$course` (Course)<br>`$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/reactions_count_updated', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/section/scheduled_at_updated`](#fluent-community-section-scheduled-at-updated)

<a id="fluent-community-section-scheduled-at-updated"></a>

## `fluent_community/section/scheduled_at_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a section's release date changes on a scheduled course.

Gated on `isDirty('scheduled_at')`, so it only fires when the date actually moved. The field is only accepted at all when the course type is `scheduled`. Pro answers by unscheduling and re-scheduling the section's drip notification, but only if that section has email notifications enabled.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course the section belongs to. |
| 2 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section, already saved with the new date. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:832` | `$course` (Course)<br>`$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/scheduled_at_updated', function ($course, $section) {
}, 10, 2);
```

**Related:** [`fluent_community/section/reactions_count_updated`](#fluent-community-section-reactions-count-updated) · [`fluent_community/section/update_data`](/hooks/filters/courses#fluent-community-section-update-data)

