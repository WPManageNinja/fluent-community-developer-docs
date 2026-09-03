---
title: Courses Filters
description: Courses filter hooks for FluentCommunity.
---

# Courses Filters

43 unique filter hooks currently map to this category, across 43 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/admin_course_comments_api_response`](#fluent-community-admin-course-comments-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:482` |
| [`fluent_community/admin_course_exportable_students_api_response`](#fluent-community-admin-course-exportable-students-api-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:970` |
| [`fluent_community/admin_course_lesson_api_response`](#fluent-community-admin-course-lesson-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:952` |
| [`fluent_community/admin_course_lessons_api_response`](#fluent-community-admin-course-lessons-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:936` |
| [`fluent_community/admin_course_non_members_api_response`](#fluent-community-admin-course-non-members-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1250` |
| [`fluent_community/admin_course_other_instructors_api_response`](#fluent-community-admin-course-other-instructors-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1313` |
| [`fluent_community/admin_course_section_api_response`](#fluent-community-admin-course-section-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:663` |
| [`fluent_community/admin_course_sections_api_response`](#fluent-community-admin-course-sections-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:646` |
| [`fluent_community/admin_course_students_api_response`](#fluent-community-admin-course-students-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:537` |
| [`fluent_community/admin_courses_api_response`](#fluent-community-admin-courses-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:66` |
| [`fluent_community/all_courses_api_response`](#fluent-community-all-courses-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:586` |
| [`fluent_community/all_space_courses_api_response`](#fluent-community-all-space-courses-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:590` |
| [`fluent_community/course_api_response`](#fluent-community-course-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:145` |
| [`fluent_community/course_info`](#fluent-community-course-info) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:210` |
| [`fluent_community/course_lesson_api_response`](#fluent-community-course-lesson-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:221` |
| [`fluent_community/course_lesson_fullscreen_default`](#fluent-community-course-lesson-fullscreen-default) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:735` |
| [`fluent_community/course_section_collapse_default`](#fluent-community-course-section-collapse-default) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:734` |
| [`fluent_community/course_smart_codes`](#fluent-community-course-smart-codes) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:250` |
| [`fluent_community/course_view_json_ld`](#fluent-community-course-view-json-ld) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1100` |
| [`fluent_community/course_welcome_banner`](#fluent-community-course-welcome-banner) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:306` |
| [`fluent_community/course/access_message_html`](#fluent-community-course-access-message-html) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:663` |
| [`fluent_community/course/can_view_lesson`](#fluent-community-course-can-view-lesson) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:35` |
| [`fluent_community/course/exportable_student_row`](#fluent-community-course-exportable-student-row) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:960` |
| [`fluent_community/course/lesson_access_info`](#fluent-community-course-lesson-access-info) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:36` |
| [`fluent_community/course/meta_fields`](#fluent-community-course-meta-fields) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1276` |
| [`fluent_community/course/processed`](#fluent-community-course-processed) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:253` |
| [`fluent_community/courses_api_response`](#fluent-community-courses-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:85` |
| [`fluent_community/default_course_email_notification`](#fluent-community-default-course-email-notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:262` |
| [`fluent_community/get_course_api_response`](#fluent-community-get-course-api-response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:107` |
| [`fluent_community/get_course_welcome_banner_settings`](#fluent-community-get-course-welcome-banner-settings) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:509` |
| [`fluent_community/is_allowed_to_complete_lesson`](#fluent-community-is-allowed-to-complete-lesson) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:417` |
| [`fluent_community/lesson_video_gate/auto_complete_delay`](#fluent-community-lesson-video-gate-auto-complete-delay) | Core | 1 | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:78` |
| [`fluent_community/lesson_video_gate/default_threshold`](#fluent-community-lesson-video-gate-default-threshold) | Core | 1 | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:85` |
| [`fluent_community/lesson/create_data`](#fluent-community-lesson-create-data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:987` |
| [`fluent_community/lesson/get_public_meta`](#fluent-community-lesson-get-public-meta) | Core | 1 | `fluent-community/Modules/Course/Model/CourseLesson.php:336` |
| [`fluent_community/lesson/sanitize_meta`](#fluent-community-lesson-sanitize-meta) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:472` |
| [`fluent_community/lesson/update_data`](#fluent-community-lesson-update-data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1063` |
| [`fluent_community/profile_courses_api_response`](#fluent-community-profile-courses-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:669` |
| [`fluent_community/question_types`](#fluent-community-question-types) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:12` |
| [`fluent_community/quiz/exportable_result_row`](#fluent-community-quiz-exportable-result-row) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:248` |
| [`fluent_community/quiz/exportable_result_rows`](#fluent-community-quiz-exportable-result-rows) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:260` |
| [`fluent_community/section/update_data`](#fluent-community-section-update-data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:818` |
| [`fluent_community/update_course_welcome_banner_settings`](#fluent-community-update-course-welcome-banner-settings) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:531` |

<a id="fluent-community-admin-course-comments-api-response"></a>

## `fluent_community/admin_course_comments_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the comment list on the course admin screen.

Comments come back paginated with their post and author profile loaded, `user_email` hidden on the user relation, and a `liked` flag set for comments the current administrator has reacted to. It covers comments left on the course's lessons.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `comments` key holding paginated comments. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:482` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_comments_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-admin-course-exportable-students-api-response"></a>

## `fluent_community/admin_course_exportable_students_api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the whole course student export payload after every row has been built.

Runs once, after fluent_community/course/exportable_student_row has run for each student.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload — a `students` key holding the list of rows. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$courseId` | `int` | Course the export was requested for. |

**Return:** The export payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:970` | `[ 'students' => $rows ]` (array)<br>`$request->all()` (array)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/admin_course_exportable_students_api_response', function ($data, $requestData, $courseId) {
    return $data;
}, 10, 3);
```

**Related:** [`fluent_community/course/exportable_student_row`](#fluent-community-course-exportable-student-row)

<a id="fluent-community-admin-course-lesson-api-response"></a>

## `fluent_community/admin_course_lesson_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters a single lesson as returned to the course editor.

The lesson comes back with its `topic` and `course` relations loaded and its meta unredacted — this is the editing view, so `fluent_community/lesson/get_public_meta` does not run on this path.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `lesson` key. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:952` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_lesson_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/course_lesson_api_response`](#fluent-community-course-lesson-api-response)

<a id="fluent-community-admin-course-lessons-api-response"></a>

## `fluent_community/admin_course_lessons_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the lesson list returned to the course editor.

Ordered by `priority` then ID, and optionally narrowed to one section with a `topic_id` parameter. Every status is included, so drafts and archived lessons are in the list. The lessons are raw models — the student-facing formatting and meta redaction do not apply.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `lessons` key. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:936` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_lessons_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/admin_course_lesson_api_response`](#fluent-community-admin-course-lesson-api-response)

<a id="fluent-community-admin-course-non-members-api-response"></a>

## `fluent_community/admin_course_non_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the list of users who could be enrolled in a course.

Feeds the "add student" picker. `user_email` is only among the selected columns when the current user has the `list_users` capability, so do not assume it is present. The result is paginated at 100 per page.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `users` key holding paginated user models. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1250` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_non_members_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/admin_course_students_api_response`](#fluent-community-admin-course-students-api-response)

<a id="fluent-community-admin-course-other-instructors-api-response"></a>

## `fluent_community/admin_course_other_instructors_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the candidate list for adding a co-instructor to a course.

A plain search across WordPress users capped at 100 rows, with no filtering by role or existing course involvement — the name notwithstanding, the list is not restricted to people who are already instructors elsewhere. As with the non-member picker, `user_email` is only selected when the viewer has `list_users`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `instructors` key. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1313` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_other_instructors_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/admin_course_non_members_api_response`](#fluent-community-admin-course-non-members-api-response)

<a id="fluent-community-admin-course-section-api-response"></a>

## `fluent_community/admin_course_section_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters a single section, with its lessons, as returned to the course editor.

The section is looked up by course and ID together, so it cannot be fetched across courses. Every lesson is loaded regardless of status. The payload key is `topic`, not `section` — sections are `CourseTopic` models internally.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `topic` key holding the section and its lessons. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:663` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_section_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/admin_course_sections_api_response`](#fluent-community-admin-course-sections-api-response)

<a id="fluent-community-admin-course-sections-api-response"></a>

## `fluent_community/admin_course_sections_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the section list returned to the course editor.

Which lessons are eager-loaded depends on the request: with `conditions` set, only published lessons come back; otherwise every lesson does, drafts included. `lockscreen` is added only when `with_lock_screen` was requested.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `sections`, each with its `lessons`, and optionally `lockscreen`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:646` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_sections_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/admin_course_section_api_response`](#fluent-community-admin-course-section-api-response)

<a id="fluent-community-admin-course-students-api-response"></a>

## `fluent_community/admin_course_students_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the enrolled-student list on the course admin screen.

Only rows whose membership role is `student` are joined in, so course admins and instructors do not appear. Each profile is limited to the public XProfile fields and carries a `progress` percentage resolved in one bulk query. Sorting is validated against a fixed column and direction list before the query runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `students` key holding paginated profiles. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:537` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_students_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/admin_course_non_members_api_response`](#fluent-community-admin-course-non-members-api-response)

<a id="fluent-community-admin-courses-api-response"></a>

## `fluent_community/admin_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the paginated course list on the admin courses screen.

Each course carries `students_count`, `sectionsCount`, `lessonsCount`, its owner and a placeholder cover photo where none is set. Drafts are included, and the `status` and `sortBy` request parameters have already been applied to the query. `course_categories` appears only when `with_categories` was requested.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `courses` (paginated) and `course_categories`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:66` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_courses_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/course_info`](#fluent-community-course-info)

<a id="fluent-community-all-courses-api-response"></a>

## `fluent_community/all_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response of the endpoint that lists every course with its full detail payload.

Unlike the directory listing, each entry here has been through `CourseController::processCourse()`, so sections, lessons and per-lesson access decisions are already resolved — an expensive response, and the reason `fluent_community/course/processed` fires once per course before this filter. `total` is the unpaginated count.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `courses` (fully processed) and `total`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:586` | `[ 'courses' => $formattedCourses, 'total' => $courses->total() ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_courses_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/courses_api_response`](#fluent-community-courses-api-response) · [`fluent_community/course/processed`](#fluent-community-course-processed)

<a id="fluent-community-all-space-courses-api-response"></a>

## `fluent_community/all_space_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the flat list of every space and course used by admin pickers.

Queried without global scopes and without any privacy or membership filtering, so secret spaces and unpublished courses are included — the endpoint is behind the admin policy for that reason. It is the data behind space and course selectors in the settings screens, ordered by `serial`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `all_spaces` key holding every `community` and `course` row. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:590` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_space_courses_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-course-api-response"></a>

## `fluent_community/course_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response for a course fetched by slug — the course landing page.

The by-slug endpoint does more than the by-ID one: unless the course hides the instructor view it also loads the creator, their total course count, optionally their total student count, and their rendered bio. Everything else is the shared `processCourse()` payload, so `fluent_community/course/processed` has already run.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The processed course payload: the course, its sections and lessons, and progress state. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:145` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/get_course_api_response`](#fluent-community-get-course-api-response) · [`fluent_community/course/processed`](#fluent-community-course-processed)

<a id="fluent-community-course-info"></a>

## `fluent_community/course_info`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the course model returned to the admin course editor.

Serves the admin single-course endpoint only, and the model has admin-only extras attached by then: `students_count`, `course_type` lifted out of settings, the lockscreen, `category_ids`, and — when there are students — the completed count and overall progress average. Pro's quiz module uses it to add the quiz route to the editor navigation.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course, with admin statistics attached. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `\FluentCommunity\Modules\Course\Model\Course` — the model; it is returned to the client under a `course` key.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:210` | `$course` (Course)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_info', function ($course, $requestData) {
    return $course;
}, 10, 2);
```

**Related:** [`fluent_community/admin_courses_api_response`](#fluent-community-admin-courses-api-response)

<a id="fluent-community-course-lesson-api-response"></a>

## `fluent_community/course_lesson_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response for a single lesson opened by slug.

The lesson has already been resolved against the drip schedule, the enrolment and the access filters, and formatted accordingly — its body is only parsed when the viewer may see it, and `is_locked`, `lock_type` and `unlock_date` describe the outcome. To change access itself use `fluent_community/course/lesson_access_info`, not this filter, which runs far too late.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `lesson` key holding the formatted lesson. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:221` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_lesson_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/course/lesson_access_info`](#fluent-community-course-lesson-access-info) · [`fluent_community/lesson/get_public_meta`](#fluent-community-lesson-get-public-meta)

<a id="fluent-community-course-lesson-fullscreen-default"></a>

## `fluent_community/course_lesson_fullscreen_default`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the lesson view opens in fullscreen mode by default.

Surfaces as `portal_vars.course_lesson_fullscreen` and is used only as the fallback for the viewer's stored `lesson_fs` preference — anyone who has already toggled fullscreen keeps their own setting, so this affects first-time viewers. Return the string `'yes'`; the comparison is against that literal.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fullscreen` | `string` | `yes` to default to fullscreen, `no` otherwise. `no` by default. |

**Return:** `string` — `'yes'` or `'no'`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:735` | `'no'` (string) |

### Example

```php
add_filter('fluent_community/course_lesson_fullscreen_default', function ($fullscreen) {
    return $fullscreen;
}, 10, 1);
```

**Related:** [`fluent_community/course_section_collapse_default`](#fluent-community-course-section-collapse-default)

<a id="fluent-community-course-section-collapse-default"></a>

## `fluent_community/course_section_collapse_default`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether course sections start collapsed in the course view.

Surfaces as `portal_vars.course_sections_collapsed`. The course view compares it loosely against `'yes'`, so return the string rather than a boolean. It sets the initial state only — once a viewer expands or collapses a section, their interaction wins for the rest of the visit.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$collapsed` | `string` | `yes` to start collapsed, `no` to start expanded. `no` by default. |

**Return:** `string` — `'yes'` or `'no'`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:734` | `'no'` (string) |

### Example

```php
add_filter('fluent_community/course_section_collapse_default', function ($collapsed) {
    return $collapsed;
}, 10, 1);
```

**Related:** [`fluent_community/course_lesson_fullscreen_default`](#fluent-community-course-lesson-fullscreen-default)

<a id="fluent-community-course-smart-codes"></a>

## `fluent_community/course_smart_codes`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the smart codes available in course drip notification emails.

A map of placeholder token to human label, used to populate the editor's insert menu. Registering a token here only advertises it — the replacement itself has to be wired separately, so an unresolved token will render literally in the email.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$smartCodes` | `array` | Map of "{​{token}​}" => label. |

**Return:** The smart code map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:250` | `array (6 keys: {&#8203;{section.title}&#8203;}, {&#8203;{section.url}&#8203;}, {&#8203;{course.title}&#8203;}, …)` (array) |

### Example

```php
add_filter('fluent_community/course_smart_codes', function ($smartCodes) {
    return $smartCodes;
}, 10, 1);
```

**Related:** [`fluent_community/default_course_email_notification`](#fluent-community-default-course-email-notification)

<a id="fluent-community-course-view-json-ld"></a>

## `fluent_community/course_view_json_ld`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the JSON-LD block emitted on a course landing page.

Starts empty, so no structured data is printed unless something fills it — Pro's sitemap module supplies a `Course` graph. It is only reached on the `course_view` route, only in headless rendering, and only when the space exists and is not `secret`. The result is encoded with `JSON_HEX_TAG` and friends, so markup in the values cannot break out of the script tag.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$jsonLd` | `array` | The structured-data graph. Empty by default. |
| 2 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The course, loaded as a base space. |
| 3 | `$data` | `array` | The render payload so far, including the resolved title, description and featured image. |

**Return:** `array` — JSON-encoded into a `application/ld+json` script tag. An empty array prints nothing.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1100` | `[]` (array)<br>`$space` (Space)<br>`$data` (mixed) |

### Example

```php
add_filter('fluent_community/course_view_json_ld', function ($jsonLd, $space, $data) {
    return $jsonLd;
}, 10, 3);
```

**Related:** [`fluent_community/feed_view_json_ld`](/hooks/filters/feeds#fluent-community-feed-view-json-ld) · [`fluent_community/portal_head_meta`](/hooks/actions/rendering#fluent-community-portal-head-meta)

<a id="fluent-community-course-welcome-banner"></a>

## `fluent_community/course_welcome_banner`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the welcome banner shown on a course, per audience.

Returns null before the filter runs when the banner for that view is not enabled, so callbacks only see enabled banners. The raw markdown `description` has already been stripped in favour of the rendered version, and for the not_enrolled view the allowClose flag is stripped too — a guest-facing banner cannot be dismissed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$banner` | `array` | The banner settings for this view. |
| 2 | `$view` | `string` | Either "enrolled" or "not_enrolled". |
| 3 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |

**Return:** The banner settings array, or null to render no banner.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:306` | `$banner` (mixed)<br>`$view` (mixed)<br>`$course` (Course) |

### Example

```php
add_filter('fluent_community/course_welcome_banner', function ($banner, $view, $course) {
    return $banner;
}, 10, 3);
```

**Related:** [`fluent_community/get_course_welcome_banner_settings`](#fluent-community-get-course-welcome-banner-settings) · [`fluent_community/update_course_welcome_banner_settings`](#fluent-community-update-course-welcome-banner-settings)

<a id="fluent-community-course-access-message-html"></a>

## `fluent_community/course/access_message_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the HTML shown in place of a lesson the current user cannot view.

The default markup is a `fcom_locker` block whose wording already varies by lock reason — sequential progression, a future unlock date, or plain lack of enrolment. `$config` carries `is_locked`, `lock_type` and `unlock_date`, which is the only way to tell those cases apart once the string is built. The return value is rendered as HTML, so escape any user-supplied text yourself.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$accessMessage` | `string` | The default locked-lesson HTML. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course being viewed. |
| 3 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The locked lesson. |
| 4 | `$config` | `array` | Lock context: `is_locked`, `lock_type` (for example `sequential`) and `unlock_date`. |

**Return:** `string` — HTML to render in place of the lesson body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:663` | `$accessMessage` (mixed)<br>`$course` (Course)<br>`$lesson` (CourseLesson)<br>`$config` (mixed) |

### Example

```php
add_filter('fluent_community/course/access_message_html', function ($accessMessage, $course, $lesson, $config) {
    return $accessMessage;
}, 10, 4);
```

**Related:** [`fluent_community/course/can_view_lesson`](#fluent-community-course-can-view-lesson)

<a id="fluent-community-course-can-view-lesson"></a>

## `fluent_community/course/can_view_lesson`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether a user may view a particular lesson.

Applied inside `CourseHelper::resolveLessonAccess()` before the companion `fluent_community/course/lesson_access_info` filter, which can still override the decision and attach a lock reason — so returning `true` here is a strong hint, not the final word. Pro attaches a callback that grants access to any lesson marked `is_free_preview`. Note that only three of the four arguments are used by that callback; add the ones you need with the right `$accepted_args` count.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$canView` | `bool` | The access decision computed from enrolment, drip schedule and sequential progress. |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson being requested. |
| 3 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course the lesson belongs to. |
| 4 | `$user` | `\FluentCommunity\App\Models\User` | The user requesting the lesson. |

**Return:** `bool` — `true` to grant access.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:35` | `$initialCanView` (mixed)<br>`$lesson` (CourseLesson)<br>`$course` (Course)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/course/can_view_lesson', function ($canView, $lesson, $course, $user) {
    return $canView;
}, 10, 4);
```

**Related:** [`fluent_community/course/access_message_html`](#fluent-community-course-access-message-html)

<a id="fluent-community-course-exportable-student-row"></a>

## `fluent_community/course/exportable_student_row`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters one row of the course student export.

Runs once per student. Keys are human-readable column headings — Name, Email, Username, Progress, Enrollment Date, Last Activity — so adding a key adds a column. The export is capped at 5000 students and progress is pre-computed in bulk, so a callback should avoid re-querying it per row.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$row` | `array` | Column heading => value map for one student. |
| 2 | `$student` | `\FluentCommunity\App\Models\XProfile` | The student profile, with user and space_pivot loaded. |
| 3 | `$progress` | `int` | Completion percentage for this course. |
| 4 | `$courseId` | `int` | Course the export was requested for. |

**Return:** The row map to write to the export.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:960` | `array (6 keys: Name, Email, Username, …)` (array)<br>`$student` (mixed)<br>`$progress` (mixed)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/course/exportable_student_row', function ($row, $student, $progress, $courseId) {
    return $row;
}, 10, 4);
```

**Related:** [`fluent_community/admin_course_exportable_students_api_response`](#fluent-community-admin-course-exportable-students-api-response)

<a id="fluent-community-course-lesson-access-info"></a>

## `fluent_community/course/lesson_access_info`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the final access decision for a lesson, together with the reason it is locked.

Runs immediately after `fluent_community/course/can_view_lesson` and has the last word: whatever that filter decided arrives here as `can_view`, and a callback may overturn it. Set `lock_type` to explain why — the value reaches the front end and drives the locked-lesson wording — but note that `lock_type` is forcibly cleared whenever `can_view` ends up truthy. Pro's sequential-progression lock is implemented here. `$ctx` tells you how the initial decision was reached without re-querying.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$access` | `array` | `can_view` (bool) and `lock_type` (string, empty by default). |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson being resolved. |
| 3 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course it belongs to. |
| 4 | `$user` | `\FluentCommunity\App\Models\User` | The viewer, or `null` for a guest. |
| 5 | `$ctx` | `array` | How the base decision was reached: `enrollment`, `is_admin`, `has_section_access`, `has_public_access`. |

**Return:** `array` — must keep the `can_view` and `lock_type` keys; both are read straight off the result.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:36` | `[ 'can_view' => $canView, 'lock_type' => '', ]` (array)<br>`$lesson` (CourseLesson)<br>`$course` (Course)<br>`$user` (User)<br>`$ctx` (mixed) |

### Example

```php
add_filter('fluent_community/course/lesson_access_info', function ($access, $lesson, $course, $user, $ctx) {
    return $access;
}, 10, 5);
```

**Related:** [`fluent_community/course/can_view_lesson`](#fluent-community-course-can-view-lesson) · [`fluent_community/course/access_message_html`](#fluent-community-course-access-message-html)

<a id="fluent-community-course-meta-fields"></a>

## `fluent_community/course/meta_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Collects extra settings sections to render on a course's settings screen.

The course-side twin of `fluent_community/space/meta_fields`, with the same section shape and the same paired save action, `fluent_community/course/update_meta_settings_{provider}`. It differs in passing a third argument, the raw request payload; `FluentExtendApi::addMetaBox()` registers its callback with only two, so declare the argument count you actually need.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$metaFields` | `array` | Settings sections keyed by provider slug. Empty by default. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course whose settings are being rendered. |
| 3 | `$requestData` | `array` | The full request payload. Optional in practice — omit it unless you need it. |

**Return:** `array` — the sections map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1276` | `[]` (array)<br>`$course` (Course)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course/meta_fields', function ($metaFields, $course, $requestData) {
    return $metaFields;
}, 10, 3);
```

**Related:** [`fluent_community/space/meta_fields`](/hooks/filters/spaces#fluent-community-space-meta-fields)

<a id="fluent-community-course-processed"></a>

## `fluent_community/course/processed`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters a single course after it has been prepared for a detail response.

Applied in `CourseController::processCourse()`, which serves the course page, the course-by-slug endpoint and each entry of the all-courses listing. It runs before the rendered course details and the section and lesson lists are attached, so those are not yet on the model. Pro uses it to add the welcome banner, choosing the enrolled or not-enrolled variant from the context array.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course, with `is_course_admin`, `can_self_enroll` and any lockscreen config already set. |
| 2 | `$context` | `array` | Currently just `is_enrolled`. |

**Return:** `\FluentCommunity\Modules\Course\Model\Course` — the model. The caller keeps using it as an object, so do not return an array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:253` | `$course` (Course)<br>`[ 'is_enrolled' => !!$enrollment, ]` (array) |

### Example

```php
add_filter('fluent_community/course/processed', function ($course, $context) {
    return $course;
}, 10, 2);
```

**Related:** [`fluent_community/course`](/hooks/actions/courses#fluent-community-course) · [`fluent_community/course_api_response`](#fluent-community-course-api-response)

<a id="fluent-community-courses-api-response"></a>

## `fluent_community/courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the course directory response shown to members.

Each course in the list has already been through the by-reference `fluent_community/course` action, which is the better place to change individual courses. `course_categories` is only populated when the request asked for it with `with_categories`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `courses` (a paginated set) and `course_categories`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:85` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/courses_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/course`](/hooks/actions/courses#fluent-community-course) · [`fluent_community/all_courses_api_response`](#fluent-community-all-courses-api-response)

<a id="fluent-community-default-course-email-notification"></a>

## `fluent_community/default_course_email_notification`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the default subject and body used for course drip notification emails.

Supplies the starting template for a section that has no saved notification of its own; a section with its own saved copy is unaffected. The default text uses the smart codes from fluent_community/course_smart_codes.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$notification` | `array` | Default template with `subject` and `message` keys. |

**Return:** The default notification array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:262` | `array (2 keys: subject, message)` (array) |

### Example

```php
add_filter('fluent_community/default_course_email_notification', function ($notification) {
    return $notification;
}, 10, 1);
```

**Related:** [`fluent_community/course_smart_codes`](#fluent-community-course-smart-codes)

<a id="fluent-community-get-course-api-response"></a>

## `fluent_community/get_course_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response for a course fetched by numeric ID.

The same `processCourse()` payload as the by-slug endpoint, minus the instructor block that only the by-slug path assembles. Both endpoints refuse an unpublished course to anyone who is not a course admin, so the filter is never reached in that case.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The processed course payload. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:107` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_course_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/course_api_response`](#fluent-community-course-api-response)

<a id="fluent-community-get-course-welcome-banner-settings"></a>

## `fluent_community/get_course_welcome_banner_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the course welcome banner settings returned to the admin editor.

The admin read path, not the render path — both the enrolled and not_enrolled views are always present here, already merged over the defaults, including views that are disabled.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | Banner settings keyed by view. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |
| 3 | `$requestData` | `array` | The full request parameters. |

**Return:** The settings array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:509` | `$settings` (mixed)<br>`$course` (Course)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_course_welcome_banner_settings', function ($settings, $course, $requestData) {
    return $settings;
}, 10, 3);
```

**Related:** [`fluent_community/course_welcome_banner`](#fluent-community-course-welcome-banner)

<a id="fluent-community-is-allowed-to-complete-lesson"></a>

## `fluent_community/is_allowed_to_complete_lesson`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the current student may change a lesson's completion state.

Covers both directions — the third argument is `completed` or `incomplete` — so a callback that only means to block completion must let `incomplete` through, as core's video gate does. Core attaches the video-watch gate at priority 11 and Pro attaches the quiz requirement at 10, both of which can veto. Returning `false` produces a 422; the controller adds a `video_watch_required` code and the threshold to the error when the video gate is the reason, so a custom refusal is reported generically.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$isAllowed` | `bool` | Whether the change is permitted. `true` by default. |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The published lesson being marked. |
| 3 | `$state` | `string` | `completed` or `incomplete`. |

**Return:** `bool` — `false` rejects the request with a 422.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:417` | `true` (bool)<br>`$lesson` (CourseLesson)<br>`$state` (mixed) |

### Example

```php
add_filter('fluent_community/is_allowed_to_complete_lesson', function ($isAllowed, $lesson, $state) {
    return $isAllowed;
}, 10, 3);
```

**Related:** [`fluent_community/course/lesson_completed`](/hooks/actions/courses#fluent-community-course-lesson-completed) · [`fluent_community/lesson_video_gate/default_threshold`](#fluent-community-lesson-video-gate-default-threshold)

<a id="fluent-community-lesson-video-gate-auto-complete-delay"></a>

## `fluent_community/lesson_video_gate/auto_complete_delay`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how many seconds pass after a video ends before the lesson auto-completes.

Defaults to 3 and only matters on lessons that both enable the media block with a FluentPlayer video and turn on `auto_complete_on_video_end`. The value is cast with `(int)`; a negative return reverts to the default, while `0` is honoured and completes the lesson immediately. It is consumed by the browser-side tracker, so changes take effect on the next page load.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$delay` | `int` | Delay in seconds, 3 by default. |

**Return:** `int` — cast to an integer; negative values fall back to 3.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:78` | `self::AUTO_COMPLETE_DELAY` (mixed) |

### Example

```php
add_filter('fluent_community/lesson_video_gate/auto_complete_delay', function ($delay) {
    return $delay;
}, 10, 1);
```

**Related:** [`fluent_community/lesson_video_gate/default_threshold`](#fluent-community-lesson-video-gate-default-threshold)

<a id="fluent-community-lesson-video-gate-default-threshold"></a>

## `fluent_community/lesson_video_gate/default_threshold`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the percentage of a video a student must watch when a lesson sets no threshold of its own.

Defaults to 80. The return value is cast with `(int)`, then clamped: anything at or below zero falls back to 80, and anything above 100 becomes 100. A per-lesson `video_completion_threshold` always wins over this. The resolved figure is used both by the server-side gate and by the front-end tracker, which reads it from the injected `fcomLessonVideoGate` variables.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$threshold` | `int` | Watch percentage required, 80 by default. |

**Return:** `int` — cast and clamped to 1–100; non-positive values revert to the 80 default.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/LessonVideoGateService.php:85` | `self::DEFAULT_THRESHOLD` (mixed) |

### Example

```php
add_filter('fluent_community/lesson_video_gate/default_threshold', function ($threshold) {
    return $threshold;
}, 10, 1);
```

**Related:** [`fluent_community/lesson_video_gate/auto_complete_delay`](#fluent-community-lesson-video-gate-auto-complete-delay) · [`fluent_community/is_allowed_to_complete_lesson`](#fluent-community-is-allowed-to-complete-lesson)

<a id="fluent-community-lesson-create-data"></a>

## `fluent_community/lesson/create_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the attributes a new lesson is created with.

The default payload is deliberately thin — title, section, course and a `draft` status, plus a priority one past the current maximum in the section. The second argument is the whole request object, not an array, which is how Pro's quiz module detects that the new lesson should be a quiz and adds its own attributes. Anything you add must be fillable on `CourseLesson` or it is dropped by `create()`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lessonData` | `array` | `title`, `parent_id`, `space_id`, `status`, `priority`. |
| 2 | `$request` | `\FluentCommunity\Framework\Http\Request\Request` | The request object itself, not an array. |

**Return:** `array` — attributes passed to `CourseLesson::create()`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:987` | `$lessonData` (mixed)<br>`$request` (array) |

### Example

```php
add_filter('fluent_community/lesson/create_data', function ($lessonData, $request) {
    return $lessonData;
}, 10, 2);
```

**Related:** [`fluent_community/lesson/update_data`](#fluent-community-lesson-update-data)

<a id="fluent-community-lesson-get-public-meta"></a>

## `fluent_community/lesson/get_public_meta`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the lesson meta exposed to a student viewing the lesson.

The read-side counterpart of `fluent_community/lesson/sanitize_meta`. Core has already rewritten document entries into signed download URLs and — when the viewer may not see the lesson — emptied the document lists and removed the media block, so a callback must not put privileged data back without checking. Two callbacks ship: the video gate appends the watch state, and Pro's quiz module strips answers. Note the filter does not receive the `canView` flag, only the already-redacted array.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$meta` | `array` | The lesson meta, redacted for the viewer. |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson being rendered. |

**Return:** `array` — the meta sent to the front end. Do not add anything a locked-out viewer should not see.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Model/CourseLesson.php:336` | `$meta` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/lesson/get_public_meta', function ($meta, $lesson) {
    return $meta;
}, 10, 2);
```

**Related:** [`fluent_community/lesson/sanitize_meta`](#fluent-community-lesson-sanitize-meta) · [`fluent_community/course/lesson_access_info`](#fluent-community-course-lesson-access-info)

<a id="fluent-community-lesson-sanitize-meta"></a>

## `fluent_community/lesson/sanitize_meta`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the lesson meta payload after core has sanitised it and before it is saved.

Core has already normalised the known keys by this point: the media block is emptied unless `enable_media` is `yes`, `video_length`, `passing_score` and `video_completion_threshold` are forced through `absint()`, and a non-zero threshold is clamped to 1–100. Unknown keys survive untouched, which is what makes this the hook for validating your own lesson meta — Pro's quiz module sanitises its question data here. Nothing downstream re-sanitises what you return.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$meta` | `array` | The sanitised lesson meta. |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson being saved. |

**Return:** `array` — merged over the lesson's existing meta by the caller.

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

**Related:** [`fluent_community/lesson/get_public_meta`](#fluent-community-lesson-get-public-meta) · [`fluent_community/lesson/update_data`](#fluent-community-lesson-update-data)

<a id="fluent-community-lesson-update-data"></a>

## `fluent_community/lesson/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the attributes about to be written when a lesson is saved.

The array has already been through `array_filter()`, so empty values were dropped — with one deliberate exception, `message`, which is added afterwards precisely so that clearing a lesson body still saves. The `meta` value has already passed through `fluent_community/lesson/sanitize_meta` and been merged over the lesson's existing meta. What you return determines the dirty check, and therefore whether `fluent_community/lesson/updated` fires at all.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$updateData` | `array` | `title`, `status`, `meta`, and `message` when the request supplied one. |
| 2 | `$lesson` | `\FluentCommunity\Modules\Course\Model\CourseLesson` | The lesson before the new values are filled. |

**Return:** `array` — attributes filled onto the model.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1063` | `$updateData` (mixed)<br>`$lesson` (CourseLesson) |

### Example

```php
add_filter('fluent_community/lesson/update_data', function ($updateData, $lesson) {
    return $updateData;
}, 10, 2);
```

**Related:** [`fluent_community/lesson/sanitize_meta`](#fluent-community-lesson-sanitize-meta) · [`fluent_community/lesson/updated`](/hooks/actions/courses#fluent-community-lesson-updated)

<a id="fluent-community-profile-courses-api-response"></a>

## `fluent_community/profile_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the courses listed on a member's public profile.

Scoped to public and private courses — secret ones are excluded by the query, so they cannot be added back by broadening the response. Enrolment and progress are computed for the profile owner rather than the viewer, and each course passes through the by-reference `fluent_community/course` action first.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `courses` key. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:669` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_courses_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/course`](/hooks/actions/courses#fluent-community-course) · [`fluent_community/courses_api_response`](#fluent-community-courses-api-response)

<a id="fluent-community-question-types"></a>

## `fluent_community/question_types`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the list of quiz question types offered in the lesson editor.

The default list holds only single_choice and multiple_choice. This list drives the editor UI only — it is published to the portal as appVars.question_types and is never consulted when grading. The grader independently understands a third type, written_answer (with grading_mode of open or exact_match), so adding an entry here does not by itself teach the grader anything, and omitting one does not stop an already-saved question of that type from being graded.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$types` | `array` | List of [ value, label ] maps. |

**Return:** The list of question types, each an array with `value` and `label` keys.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:12` | `array (2 keys: [ 'value', [ 'value')` (array) |

### Example

```php
add_filter('fluent_community/question_types', function ($types) {
    return $types;
}, 10, 1);
```

**Related:** [`fluent_community/quiz/submitted`](/hooks/actions/courses#fluent-community-quiz-submitted)

<a id="fluent-community-quiz-exportable-result-row"></a>

## `fluent_community/quiz/exportable_result_row`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters one row of the course quiz-results export.

Runs once per attempt in GET /admin/courses/{course_id}/export/quiz-results. Keys are human-readable column headings, not slugs — Student Name, Email, Username, Quiz, Score, Grade, Total Attempts, Submitted At — so adding a key adds a column. The export is capped at 5000 attempts.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$row` | `array` | Column heading => value map for one attempt. |
| 2 | `$result` | `\FluentCommunityPro\App\Modules\Quiz\QuizModel` | The attempt, with xprofile, user and lesson eager-loaded. |
| 3 | `$courseId` | `int` | Course the export was requested for. |

**Return:** The row map to write to the export.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:248` | `array (8 keys: Student Name, Email, Username, …)` (array)<br>`$result` (mixed)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/quiz/exportable_result_row', function ($row, $result, $courseId) {
    return $row;
}, 10, 3);
```

**Related:** [`fluent_community/quiz/exportable_result_rows`](#fluent-community-quiz-exportable-result-rows)

<a id="fluent-community-quiz-exportable-result-rows"></a>

## `fluent_community/quiz/exportable_result_rows`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the whole quiz-results export payload after every row has been built.

Runs once, after fluent_community/quiz/exportable_result_row has run for each attempt. Use this one to reorder, append or drop rows wholesale; use the singular filter to reshape a row.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload — a `results` key holding the list of rows. |
| 2 | `$results` | `\FluentCommunity\Framework\Database\Orm\Collection` | The underlying QuizModel collection the rows were built from. |
| 3 | `$courseId` | `int` | Course the export was requested for. |

**Return:** The export payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:260` | `[ 'results' => $rows ]` (array)<br>`$results` (mixed)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/quiz/exportable_result_rows', function ($data, $results, $courseId) {
    return $data;
}, 10, 3);
```

**Related:** [`fluent_community/quiz/exportable_result_row`](#fluent-community-quiz-exportable-result-row)

<a id="fluent-community-section-update-data"></a>

## `fluent_community/section/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters a section's attributes on save, and can reject the save outright.

Only `title` and `status` are accepted by default, joined by `scheduled_at` on scheduled courses or `reactions_count` — the drip offset — on structured ones; a field the course type does not accept never reaches the filter. Returning a `WP_Error` aborts the save and its messages are returned to the moderator, which is how Pro refuses to enable a section email that has no release date. Pro also uses it to fold the email subject and body into `meta` and to fire the schedule and unschedule actions as a side effect, so run at a later priority if you need the final array.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$sectionData` | `array` | The accepted fields: `title`, `status`, and `scheduled_at` or `reactions_count`. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course the section belongs to. |
| 3 | `$section` | `\FluentCommunity\Modules\Course\Model\CourseTopic` | The section before the new values are filled. |
| 4 | `$requestData` | `array` | The full request payload, including any `meta` the form submitted. |

**Return:** `array` — attributes to fill onto the section. Return a `WP_Error` to reject the save with a message.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:818` | `$topicData` (mixed)<br>`$course` (Course)<br>`$topic` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/section/update_data', function ($sectionData, $course, $section, $requestData) {
    return $sectionData;
}, 10, 4);
```

**Related:** [`fluent_community/section/scheduled_at_updated`](/hooks/actions/courses#fluent-community-section-scheduled-at-updated) · [`fluent_community/section/reactions_count_updated`](/hooks/actions/courses#fluent-community-section-reactions-count-updated)

<a id="fluent-community-update-course-welcome-banner-settings"></a>

## `fluent_community/update_course_welcome_banner_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters course welcome banner settings on save, just before they are persisted.

Runs after sanitisation and after each view's markdown description has been rendered into description_rendered. A callback that rewrites `description` here must render description_rendered itself, since that step has already happened.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | Sanitised banner settings keyed by view. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course. |

**Return:** The settings array to persist.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:531` | `$settings` (mixed)<br>`$course` (Course) |

### Example

```php
add_filter('fluent_community/update_course_welcome_banner_settings', function ($settings, $course) {
    return $settings;
}, 10, 2);
```

**Related:** [`fluent_community/course/welcome_banner_updated`](/hooks/actions/courses#fluent-community-course-welcome-banner-updated)

