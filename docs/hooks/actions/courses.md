---
title: Courses Actions
description: Courses action hooks for FluentCommunity.
---

# Courses Actions

32 unique action hooks currently map to this category, across 40 call sites.

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
| [`fluent_community/course/scheduled/unschedule_notification`](#fluent-community-course-scheduled-unschedule-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:226` |
| [`fluent_community/course/structured/init_notification`](#fluent-community-course-structured-init-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:237` |
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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1755` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1776` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed)<br>`$created` (mixed) |

### Example

```php
add_action('fluent_community/course/enrolled', function ($space, $userId, $by, $created) {
}, 10, 4);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:227` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/scheduled/init_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent-community-course-scheduled-unschedule-notification"></a>

## `fluent_community/course/scheduled/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:226` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/scheduled/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent-community-course-structured-init-notification"></a>

## `fluent_community/course/structured/init_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:237` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/structured/init_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent-community-course-structured-unschedule-notification"></a>

## `fluent_community/course/structured/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:236` | `$course` (Course)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/structured/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:228` | `$topic` (mixed)<br>`$userId` (int)<br>`$lesson` (CourseLesson) |

### Example

```php
add_action('fluent_community/course/topic_completed', function ($topic, $userId, $lesson) {
}, 10, 3);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:489` | `$course` (Course)<br>`$settings` (mixed) |

### Example

```php
add_action('fluent_community/course/welcome_banner_updated', function ($course, $settings) {
}, 10, 2);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:428` | `$courseLesson` (CourseLesson) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:907` | `$lesson` (CourseLesson) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1138` | `$lesson` (CourseLesson) |

### Example

```php
add_action('fluent_community/lesson/before_deleted', function ($courseLesson) {
}, 10, 1);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:177` | `$quizResult` (mixed)<br>`$user` (User)<br>`$quiz` (mixed) |

### Example

```php
add_action('fluent_community/quiz/submitted', function ($quizResult, $user, $quiz) {
}, 10, 3);
```

<a id="fluent-community-section-before-deleted"></a>

## `fluent_community/section/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:425` | `$courseTopic` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:897` | `$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/before_deleted', function ($courseTopic) {
}, 10, 1);
```

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

