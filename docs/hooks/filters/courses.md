---
title: Courses Filters
description: Courses filter hooks for FluentCommunity.
---

# Courses Filters

47 unique filter hooks currently map to this category, across 47 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/admin_course_comments_api_response`](#fluent-community-admin-course-comments-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:482` |
| [`fluent_community/admin_course_exportable_students_api_response`](#fluent-community-admin-course-exportable-students-api-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:924` |
| [`fluent_community/admin_course_lesson_api_response`](#fluent-community-admin-course-lesson-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:952` |
| [`fluent_community/admin_course_lessons_api_response`](#fluent-community-admin-course-lessons-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:936` |
| [`fluent_community/admin_course_non_members_api_response`](#fluent-community-admin-course-non-members-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1244` |
| [`fluent_community/admin_course_other_instructors_api_response`](#fluent-community-admin-course-other-instructors-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1307` |
| [`fluent_community/admin_course_section_api_response`](#fluent-community-admin-course-section-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:663` |
| [`fluent_community/admin_course_sections_api_response`](#fluent-community-admin-course-sections-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:646` |
| [`fluent_community/admin_course_students_api_response`](#fluent-community-admin-course-students-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:537` |
| [`fluent_community/admin_courses_api_response`](#fluent-community-admin-courses-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:66` |
| [`fluent_community/all_courses_api_response`](#fluent-community-all-courses-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:586` |
| [`fluent_community/all_space_courses_api_response`](#fluent-community-all-space-courses-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:542` |
| [`fluent_community/comment_notification/email_sections`](#fluent-community-comment-notification-email-sections) | Core | 1 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:353` |
| [`fluent_community/course_api_response`](#fluent-community-course-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:145` |
| [`fluent_community/course_info`](#fluent-community-course-info) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:210` |
| [`fluent_community/course_lesson_api_response`](#fluent-community-course-lesson-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:221` |
| [`fluent_community/course_lesson_fullscreen_default`](#fluent-community-course-lesson-fullscreen-default) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:735` |
| [`fluent_community/course_section_collapse_default`](#fluent-community-course-section-collapse-default) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:734` |
| [`fluent_community/course_smart_codes`](#fluent-community-course-smart-codes) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:181` |
| [`fluent_community/course_view_json_ld`](#fluent-community-course-view-json-ld) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1097` |
| [`fluent_community/course_welcome_banner`](#fluent-community-course-welcome-banner) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:237` |
| [`fluent_community/course/access_message_html`](#fluent-community-course-access-message-html) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:642` |
| [`fluent_community/course/can_view_lesson`](#fluent-community-course-can-view-lesson) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:35` |
| [`fluent_community/course/exportable_student_row`](#fluent-community-course-exportable-student-row) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:914` |
| [`fluent_community/course/lesson_access_info`](#fluent-community-course-lesson-access-info) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:36` |
| [`fluent_community/course/meta_fields`](#fluent-community-course-meta-fields) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1270` |
| [`fluent_community/course/processed`](#fluent-community-course-processed) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:253` |
| [`fluent_community/courses_api_response`](#fluent-community-courses-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:85` |
| [`fluent_community/default_course_email_notification`](#fluent-community-default-course-email-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:193` |
| [`fluent_community/digest_notification/email_sections`](#fluent-community-digest-notification-email-sections) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:106` |
| [`fluent_community/get_course_api_response`](#fluent-community-get-course-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:107` |
| [`fluent_community/get_course_welcome_banner_settings`](#fluent-community-get-course-welcome-banner-settings) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:463` |
| [`fluent_community/is_allowed_to_complete_lesson`](#fluent-community-is-allowed-to-complete-lesson) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:417` |
| [`fluent_community/lesson_video_gate/auto_complete_delay`](#fluent-community-lesson-video-gate-auto-complete-delay) | Core | 1 | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:78` |
| [`fluent_community/lesson_video_gate/default_threshold`](#fluent-community-lesson-video-gate-default-threshold) | Core | 1 | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:85` |
| [`fluent_community/lesson/create_data`](#fluent-community-lesson-create-data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:984` |
| [`fluent_community/lesson/get_public_meta`](#fluent-community-lesson-get-public-meta) | Core | 1 | `fluent-community/Modules/Course/Model/CourseLesson.php:336` |
| [`fluent_community/lesson/sanitize_meta`](#fluent-community-lesson-sanitize-meta) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:472` |
| [`fluent_community/lesson/update_data`](#fluent-community-lesson-update-data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1057` |
| [`fluent_community/new_feed_everybody_notification/email_sections`](#fluent-community-new-feed-everybody-notification-email-sections) | Core | 1 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:471` |
| [`fluent_community/new_feed_notification/email_sections`](#fluent-community-new-feed-notification-email-sections) | Core | 1 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:192` |
| [`fluent_community/profile_courses_api_response`](#fluent-community-profile-courses-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:664` |
| [`fluent_community/question_types`](#fluent-community-question-types) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:12` |
| [`fluent_community/quiz/exportable_result_row`](#fluent-community-quiz-exportable-result-row) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:246` |
| [`fluent_community/quiz/exportable_result_rows`](#fluent-community-quiz-exportable-result-rows) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:258` |
| [`fluent_community/section/update_data`](#fluent-community-section-update-data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:818` |
| [`fluent_community/update_course_welcome_banner_settings`](#fluent-community-update-course-welcome-banner-settings) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:485` |

<a id="fluent-community-admin-course-comments-api-response"></a>

## `fluent_community/admin_course_comments_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:482` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_comments_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-exportable-students-api-response"></a>

## `fluent_community/admin_course_exportable_students_api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:924` | `[ 'students' => $rows ]` (array)<br>`$request->all()` (array)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/admin_course_exportable_students_api_response', function ($rows, $all, $courseId) {
    return $rows;
}, 10, 3);
```

<a id="fluent-community-admin-course-lesson-api-response"></a>

## `fluent_community/admin_course_lesson_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:952` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_lesson_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-lessons-api-response"></a>

## `fluent_community/admin_course_lessons_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:936` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_lessons_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-non-members-api-response"></a>

## `fluent_community/admin_course_non_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1244` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_non_members_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-other-instructors-api-response"></a>

## `fluent_community/admin_course_other_instructors_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1307` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_other_instructors_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-section-api-response"></a>

## `fluent_community/admin_course_section_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:663` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_section_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-sections-api-response"></a>

## `fluent_community/admin_course_sections_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:646` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_sections_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-students-api-response"></a>

## `fluent_community/admin_course_students_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:537` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_students_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-courses-api-response"></a>

## `fluent_community/admin_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:66` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_courses_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-all-courses-api-response"></a>

## `fluent_community/all_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:586` | `[ 'courses' => $formattedCourses, 'total' => $courses->total() ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_courses_api_response', function ($total, $all) {
    return $total;
}, 10, 2);
```

<a id="fluent-community-all-space-courses-api-response"></a>

## `fluent_community/all_space_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:542` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_space_courses_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-comment-notification-email-sections"></a>

## `fluent_community/comment_notification/email_sections`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:353` | `[ 'before_content' => '', 'after_content' => '' ]` (array)<br>`$user` (User)<br>`$comment` (Comment) |

### Example

```php
add_filter('fluent_community/comment_notification/email_sections', function ($param1, $user, $comment) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-course-api-response"></a>

## `fluent_community/course_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:145` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-course-info"></a>

## `fluent_community/course_info`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:210` | `$course` (Course)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_info', function ($course, $all) {
    return $course;
}, 10, 2);
```

<a id="fluent-community-course-lesson-api-response"></a>

## `fluent_community/course_lesson_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:221` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_lesson_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-course-lesson-fullscreen-default"></a>

## `fluent_community/course_lesson_fullscreen_default`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:735` | `'no'` (string) |

### Example

```php
add_filter('fluent_community/course_lesson_fullscreen_default', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-course-section-collapse-default"></a>

## `fluent_community/course_section_collapse_default`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:734` | `'no'` (string) |

### Example

```php
add_filter('fluent_community/course_section_collapse_default', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-course-smart-codes"></a>

## `fluent_community/course_smart_codes`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:181` | `array (6 keys: {&#8203;{section.title}&#8203;}, {&#8203;{section.url}&#8203;}, {&#8203;{course.title}&#8203;}, …)` (array) |

### Example

```php
add_filter('fluent_community/course_smart_codes', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-course-view-json-ld"></a>

## `fluent_community/course_view_json_ld`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1097` | `[]` (array)<br>`$space` (Space)<br>`$data` (mixed) |

### Example

```php
add_filter('fluent_community/course_view_json_ld', function ($param1, $space, $data) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-course-welcome-banner"></a>

## `fluent_community/course_welcome_banner`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:237` | `$banner` (mixed)<br>`$view` (mixed)<br>`$course` (Course) |

### Example

```php
add_filter('fluent_community/course_welcome_banner', function ($banner, $view, $course) {
    return $banner;
}, 10, 3);
```

<a id="fluent-community-course-access-message-html"></a>

## `fluent_community/course/access_message_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:642` | `$accessMessage` (mixed)<br>`$course` (Course)<br>`$lesson` (CourseLesson)<br>`$config` (mixed) |

### Example

```php
add_filter('fluent_community/course/access_message_html', function ($accessMessage, $course, $lesson, $config) {
    return $accessMessage;
}, 10, 4);
```

<a id="fluent-community-course-can-view-lesson"></a>

## `fluent_community/course/can_view_lesson`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:35` | `$initialCanView` (mixed)<br>`$lesson` (CourseLesson)<br>`$course` (Course)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/course/can_view_lesson', function ($initialCanView, $lesson, $course, $user) {
    return $initialCanView;
}, 10, 4);
```

<a id="fluent-community-course-exportable-student-row"></a>

## `fluent_community/course/exportable_student_row`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:914` | `array (6 keys: Name, Email, Username, …)` (array)<br>`$student` (mixed)<br>`$progress` (mixed)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/course/exportable_student_row', function ($display_name, $student, $progress, $courseId) {
    return $display_name;
}, 10, 4);
```

<a id="fluent-community-course-lesson-access-info"></a>

## `fluent_community/course/lesson_access_info`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:36` | `[ 'can_view' => $canView, 'lock_type' => '', ]` (array)<br>`$lesson` (CourseLesson)<br>`$course` (Course)<br>`$user` (User)<br>`$ctx` (mixed) |

### Example

```php
add_filter('fluent_community/course/lesson_access_info', function ($canView, $lesson, $course, $user, $ctx) {
    return $canView;
}, 10, 5);
```

<a id="fluent-community-course-meta-fields"></a>

## `fluent_community/course/meta_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1270` | `[]` (array)<br>`$course` (Course)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course/meta_fields', function ($param1, $course, $all) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-course-processed"></a>

## `fluent_community/course/processed`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:253` | `$course` (Course)<br>`[ 'is_enrolled' => !!$enrollment, ]` (array) |

### Example

```php
add_filter('fluent_community/course/processed', function ($course, $enrollment) {
    return $course;
}, 10, 2);
```

<a id="fluent-community-courses-api-response"></a>

## `fluent_community/courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:85` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/courses_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-default-course-email-notification"></a>

## `fluent_community/default_course_email_notification`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:193` | `array (2 keys: subject, message)` (array) |

### Example

```php
add_filter('fluent_community/default_course_email_notification', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-digest-notification-email-sections"></a>

## `fluent_community/digest_notification/email_sections`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:106` | `[ 'before_content' => '', 'after_content' => '' ]` (array)<br>`$this->user` (User) |

### Example

```php
add_filter('fluent_community/digest_notification/email_sections', function ($param1, $user) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-get-course-api-response"></a>

## `fluent_community/get_course_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:107` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_course_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-get-course-welcome-banner-settings"></a>

## `fluent_community/get_course_welcome_banner_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:463` | `$settings` (mixed)<br>`$course` (Course)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_course_welcome_banner_settings', function ($settings, $course, $all) {
    return $settings;
}, 10, 3);
```

<a id="fluent-community-is-allowed-to-complete-lesson"></a>

## `fluent_community/is_allowed_to_complete_lesson`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:417` | `true` (bool)<br>`$lesson` (CourseLesson)<br>`$state` (mixed) |

### Example

```php
add_filter('fluent_community/is_allowed_to_complete_lesson', function ($param1, $lesson, $state) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-lesson-video-gate-auto-complete-delay"></a>

## `fluent_community/lesson_video_gate/auto_complete_delay`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:78` | `self::AUTO_COMPLETE_DELAY` (mixed) |

### Example

```php
add_filter('fluent_community/lesson_video_gate/auto_complete_delay', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-lesson-video-gate-default-threshold"></a>

## `fluent_community/lesson_video_gate/default_threshold`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:85` | `self::DEFAULT_THRESHOLD` (mixed) |

### Example

```php
add_filter('fluent_community/lesson_video_gate/default_threshold', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-lesson-create-data"></a>

## `fluent_community/lesson/create_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:984` | `$lessonData` (mixed)<br>`$request` (array) |

### Example

```php
add_filter('fluent_community/lesson/create_data', function ($lessonData, $request) {
    return $lessonData;
}, 10, 2);
```

<a id="fluent-community-lesson-get-public-meta"></a>

## `fluent_community/lesson/get_public_meta`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Model/CourseLesson.php:336` | `$meta` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/lesson/get_public_meta', function ($meta, $param2) {
    return $meta;
}, 10, 2);
```

<a id="fluent-community-lesson-sanitize-meta"></a>

## `fluent_community/lesson/sanitize_meta`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:472` | `$meta` (mixed)<br>`$lesson` (CourseLesson) |

### Example

```php
add_filter('fluent_community/lesson/sanitize_meta', function ($meta, $lesson) {
    return $meta;
}, 10, 2);
```

<a id="fluent-community-lesson-update-data"></a>

## `fluent_community/lesson/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1057` | `$updateData` (mixed)<br>`$lesson` (CourseLesson) |

### Example

```php
add_filter('fluent_community/lesson/update_data', function ($updateData, $lesson) {
    return $updateData;
}, 10, 2);
```

<a id="fluent-community-new-feed-everybody-notification-email-sections"></a>

## `fluent_community/new_feed_everybody_notification/email_sections`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:471` | `[ 'before_content' => '', 'after_content' => '' ]` (array)<br>`$user` (User)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/new_feed_everybody_notification/email_sections', function ($param1, $user, $feed) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-new-feed-notification-email-sections"></a>

## `fluent_community/new_feed_notification/email_sections`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:192` | `[ 'before_content' => '', 'after_content' => '' ]` (array)<br>`$user` (User)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/new_feed_notification/email_sections', function ($param1, $user, $feed) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-profile-courses-api-response"></a>

## `fluent_community/profile_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:664` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_courses_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-question-types"></a>

## `fluent_community/question_types`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:12` | `array (2 keys: [ 'value', [ 'value')` (array) |

### Example

```php
add_filter('fluent_community/question_types', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-quiz-exportable-result-row"></a>

## `fluent_community/quiz/exportable_result_row`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:246` | `array (8 keys: Student Name, Email, Username, …)` (array)<br>`$result` (mixed)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/quiz/exportable_result_row', function ($display_name, $result, $courseId) {
    return $display_name;
}, 10, 3);
```

<a id="fluent-community-quiz-exportable-result-rows"></a>

## `fluent_community/quiz/exportable_result_rows`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:258` | `[ 'results' => $rows ]` (array)<br>`$results` (mixed)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/quiz/exportable_result_rows', function ($rows, $results, $courseId) {
    return $rows;
}, 10, 3);
```

<a id="fluent-community-section-update-data"></a>

## `fluent_community/section/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:818` | `$topicData` (mixed)<br>`$course` (Course)<br>`$topic` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/section/update_data', function ($topicData, $course, $topic, $all) {
    return $topicData;
}, 10, 4);
```

<a id="fluent-community-update-course-welcome-banner-settings"></a>

## `fluent_community/update_course_welcome_banner_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:485` | `$settings` (mixed)<br>`$course` (Course) |

### Example

```php
add_filter('fluent_community/update_course_welcome_banner_settings', function ($settings, $course) {
    return $settings;
}, 10, 2);
```

