---
title: Courses Actions
description: Courses action hooks for FluentCommunity.
---

# Courses Actions

34 unique action hooks currently map to this category, across 44 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/course`](#fluent-community-course) | Core | 2 | `fluent-community/app/Http/Controllers/ProfileController.php:657` |
| [`fluent_community/course/{courseType}/unschedule_notification`](#fluent-community-course-courseType-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:124` |
| [`fluent_community/course/{prevType}/unschedule_notification`](#fluent-community-course-prevType-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:114` |
| [`fluent_community/course/before_create`](#fluent-community-course-before-create) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:147` |
| [`fluent_community/course/before_delete`](#fluent-community-course-before-delete) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:409` |
| [`fluent_community/course/before_progress_reset`](#fluent-community-course-before-progress-reset) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:302` |
| [`fluent_community/course/completed`](#fluent-community-course-completed) | Core | 2 | `fluent-community/Modules/Course/Services/CourseHelper.php:278` |
| [`fluent_community/course/created`](#fluent-community-course-created) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:182` |
| [`fluent_community/course/deleted`](#fluent-community-course-deleted) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:442` |
| [`fluent_community/course/enrolled`](#fluent-community-course-enrolled) | Core | 2 | `fluent-community/app/Services/Helper.php:1755` |
| [`fluent_community/course/lesson_completed`](#fluent-community-course-lesson-completed) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:211` |
| [`fluent_community/course/lesson_marked_incomplete`](#fluent-community-course-lesson-marked-incomplete) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:195` |
| [`fluent_community/course/progress_reset`](#fluent-community-course-progress-reset) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:323` |
| [`fluent_community/course/published`](#fluent-community-course-published) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:329` |
| [`fluent_community/course/scheduled/init_notification`](#fluent-community-course-scheduled-init-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:227` |
| [`fluent_community/course/scheduled/send_notification_async`](#fluent-community-course-scheduled-send-notification-async) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:185` |
| [`fluent_community/course/scheduled/unschedule_notification`](#fluent-community-course-scheduled-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:226` |
| [`fluent_community/course/structured/init_notification`](#fluent-community-course-structured-init-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:237` |
| [`fluent_community/course/structured/send_notification_async`](#fluent-community-course-structured-send-notification-async) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:153` |
| [`fluent_community/course/structured/unschedule_notification`](#fluent-community-course-structured-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:236` |
| [`fluent_community/course/student_left`](#fluent-community-course-student-left) | Core | 1 | `fluent-community/app/Services/Helper.php:1825` |
| [`fluent_community/course/topic_completed`](#fluent-community-course-topic-completed) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:228` |
| [`fluent_community/course/update_meta_settings_{metaProvider}`](#fluent-community-course-update-meta-settings-metaProvider) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:343` |
| [`fluent_community/course/updated`](#fluent-community-course-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:327` |
| [`fluent_community/course/welcome_banner_updated`](#fluent-community-course-welcome-banner-updated) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:489` |
| [`fluent_community/lesson/additional_media_updated`](#fluent-community-lesson-additional-media-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1068` |
| [`fluent_community/lesson/before_deleted`](#fluent-community-lesson-before-deleted) | Core | 3 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:428` |
| [`fluent_community/lesson/duplicated`](#fluent-community-lesson-duplicated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1197` |
| [`fluent_community/lesson/updated`](#fluent-community-lesson-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1065` |
| [`fluent_community/lesson/video_watched`](#fluent-community-lesson-video-watched) | Core | 1 | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:158` |
| [`fluent_community/quiz/submitted`](#fluent-community-quiz-submitted) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:177` |
| [`fluent_community/section/before_deleted`](#fluent-community-section-before-deleted) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:425` |
| [`fluent_community/section/reactions_count_updated`](#fluent-community-section-reactions-count-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:835` |
| [`fluent_community/section/scheduled_at_updated`](#fluent-community-section-scheduled-at-updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:832` |

<a id="fluent-community-course"></a>

## `fluent_community/course`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:657` | `&$course` (Course) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:77` | `&$course` (Course) |

### Example

```php
add_action('fluent_community/course', function (&$course) {
}, 10, 1);
```

<a id="fluent-community-course-courseType-unschedule-notification"></a>

## `fluent_community/course/{courseType}/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:124` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/{courseType}/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent-community-course-prevType-unschedule-notification"></a>

## `fluent_community/course/{prevType}/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:114` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/{prevType}/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent-community-course-before-create"></a>

## `fluent_community/course/before_create`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

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

<a id="fluent-community-course-before-delete"></a>

## `fluent_community/course/before_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:409` | `$course` (Course) |

### Example

```php
add_action('fluent_community/course/before_delete', function ($course) {
}, 10, 1);
```

<a id="fluent-community-course-before-progress-reset"></a>

## `fluent_community/course/before_progress_reset`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:302` | `$course` (Course)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/before_progress_reset', function ($course, $userId) {
}, 10, 2);
```

<a id="fluent-community-course-completed"></a>

## `fluent_community/course/completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

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

<a id="fluent-community-course-created"></a>

## `fluent_community/course/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

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

<a id="fluent-community-course-deleted"></a>

## `fluent_community/course/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:442` | `$courseId` (int) |

### Example

```php
add_action('fluent_community/course/deleted', function ($courseId) {
}, 10, 1);
```

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
| Core | `fluent-community/app/Services/Helper.php:1755` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1776` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed)<br>`$created` (mixed) |

### Example

```php
add_action('fluent_community/course/enrolled', function ($course, $userId, $by, $created) {
}, 10, 4);
```

**Related:** [`fluent_community/space/joined`](#fluent-community-space-joined) · [`fluent_community/course/topic_completed`](#fluent-community-course-topic-completed)

<a id="fluent-community-course-lesson-completed"></a>

## `fluent_community/course/lesson_completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:211` | `$lesson` (CourseLesson)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/lesson_completed', function ($lesson, $userId) {
}, 10, 2);
```

<a id="fluent-community-course-lesson-marked-incomplete"></a>

## `fluent_community/course/lesson_marked_incomplete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:195` | `$lesson` (CourseLesson)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/lesson_marked_incomplete', function ($lesson, $userId) {
}, 10, 2);
```

<a id="fluent-community-course-progress-reset"></a>

## `fluent_community/course/progress_reset`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:323` | `$course` (Course)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/course/progress_reset', function ($course, $userId) {
}, 10, 2);
```

<a id="fluent-community-course-published"></a>

## `fluent_community/course/published`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:329` | `$course` (Course) |

### Example

```php
add_action('fluent_community/course/published', function ($course) {
}, 10, 1);
```

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:227` | `$course` (Course)<br>`$section` (mixed) |

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

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:185` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:311` | No parameters |

### Example

```php
add_action('fluent_community/course/scheduled/send_notification_async', function () {
}, 10, 0);
```

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:226` | `$course` (Course)<br>`$section` (mixed) |

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:237` | `$course` (Course)<br>`$section` (mixed) |

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

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:153` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:202` | No parameters |

### Example

```php
add_action('fluent_community/course/structured/send_notification_async', function () {
}, 10, 0);
```

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:236` | `$course` (Course)<br>`$section` (mixed) |

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1825` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |

### Example

```php
add_action('fluent_community/course/student_left', function ($space, $userId, $by) {
}, 10, 3);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:343` | `$metaData` (mixed)<br>`$course` (Course) |

### Example

```php
add_action('fluent_community/course/update_meta_settings_{metaProvider}', function ($metaData, $course) {
}, 10, 2);
```

<a id="fluent-community-course-updated"></a>

## `fluent_community/course/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:327` | `$course` (Course)<br>`$dirtyFields` (mixed)<br>`$prevCourse` (Course) |

### Example

```php
add_action('fluent_community/course/updated', function ($course, $dirtyFields, $prevCourse) {
}, 10, 3);
```

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:489` | `$course` (Course)<br>`$settings` (mixed) |

### Example

```php
add_action('fluent_community/course/welcome_banner_updated', function ($course, $settings) {
}, 10, 2);
```

**Related:** [`fluent_community/update_course_welcome_banner_settings`](#fluent-community-update-course-welcome-banner-settings)

<a id="fluent-community-lesson-additional-media-updated"></a>

## `fluent_community/lesson/additional_media_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1068` | `$request->all()` (array)<br>`$lesson` (CourseLesson)<br>`$updateData` (mixed) |

### Example

```php
add_action('fluent_community/lesson/additional_media_updated', function ($all, $lesson, $updateData) {
}, 10, 3);
```

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
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1138` | `$lesson` (CourseLesson) |

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1197` | `$newLesson` (CourseLesson)<br>`$lesson` (CourseLesson) |

### Example

```php
add_action('fluent_community/lesson/duplicated', function ($newLesson, $lesson) {
}, 10, 2);
```

<a id="fluent-community-lesson-updated"></a>

## `fluent_community/lesson/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1065` | `$lesson` (CourseLesson)<br>`$dirtyFields` (mixed)<br>`$isNewlyPublished` (mixed) |

### Example

```php
add_action('fluent_community/lesson/updated', function ($lesson, $dirtyFields, $isNewlyPublished) {
}, 10, 3);
```

<a id="fluent-community-lesson-video-watched"></a>

## `fluent_community/lesson/video_watched`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:158` | `$lesson` (CourseLesson)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/lesson/video_watched', function ($lesson, $userId) {
}, 10, 2);
```

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:177` | `$quizResult` (mixed)<br>`$user` (User)<br>`$quiz` (mixed) |

### Example

```php
add_action('fluent_community/quiz/submitted', function ($quizResult, $user, $quiz) {
}, 10, 3);
```

**Related:** [`fluent_community/question_types`](#fluent-community-question-types)

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:835` | `$course` (Course)<br>`$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/reactions_count_updated', function ($course, $topic) {
}, 10, 2);
```

<a id="fluent-community-section-scheduled-at-updated"></a>

## `fluent_community/section/scheduled_at_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:832` | `$course` (Course)<br>`$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/scheduled_at_updated', function ($course, $topic) {
}, 10, 2);
```

