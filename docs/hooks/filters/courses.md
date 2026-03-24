---
title: Courses Filters
description: Courses filter hooks for FluentCommunity.
---

# Courses Filters

24 unique filter hooks currently map to this category, across 25 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/admin_course_lesson_api_response`](#fluent_communityadmin_course_lesson_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:859` |
| [`fluent_community/admin_course_lessons_api_response`](#fluent_communityadmin_course_lessons_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:843` |
| [`fluent_community/admin_course_other_instructors_api_response`](#fluent_communityadmin_course_other_instructors_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1119` |
| [`fluent_community/admin_course_section_api_response`](#fluent_communityadmin_course_section_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:594` |
| [`fluent_community/admin_course_sections_api_response`](#fluent_communityadmin_course_sections_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:577` |
| [`fluent_community/admin_course_students_api_response`](#fluent_communityadmin_course_students_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:493` |
| [`fluent_community/admin_courses_api_response`](#fluent_communityadmin_courses_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:51` |
| [`fluent_community/all_courses_api_response`](#fluent_communityall_courses_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:443` |
| [`fluent_community/course_api_response`](#fluent_communitycourse_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:139` |
| [`fluent_community/course_info`](#fluent_communitycourse_info) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:192` |
| [`fluent_community/course_lesson_api_response`](#fluent_communitycourse_lesson_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:207` |
| [`fluent_community/course_smart_codes`](#fluent_communitycourse_smart_codes) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:166` |
| [`fluent_community/course_view_json_ld`](#fluent_communitycourse_view_json_ld) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1053` |
| [`fluent_community/course/access_message_html`](#fluent_communitycourseaccess_message_html) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:576` |
| [`fluent_community/course/can_view_lesson`](#fluent_communitycoursecan_view_lesson) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:194` |
| [`fluent_community/course/meta_fields`](#fluent_communitycoursemeta_fields) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1091` |
| [`fluent_community/courses_api_response`](#fluent_communitycourses_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:77` |
| [`fluent_community/get_course_api_response`](#fluent_communityget_course_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:99` |
| [`fluent_community/is_allowed_to_complete_lesson`](#fluent_communityis_allowed_to_complete_lesson) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:380` |
| [`fluent_community/lesson/create_data`](#fluent_communitylessoncreate_data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:891` |
| [`fluent_community/lesson/get_public_meta`](#fluent_communitylessonget_public_meta) | Core | 1 | `fluent-community/Modules/Course/Model/CourseLesson.php:307` |
| [`fluent_community/lesson/sanitize_meta`](#fluent_communitylessonsanitize_meta) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:413` |
| [`fluent_community/lesson/update_data`](#fluent_communitylessonupdate_data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:959` |
| [`fluent_community/section/update_data`](#fluent_communitysectionupdate_data) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:737` |

<a id="fluent_communityadmin_course_lesson_api_response"></a>

## `fluent_community/admin_course_lesson_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Course Lesson API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:859` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_lesson_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityadmin_course_lessons_api_response"></a>

## `fluent_community/admin_course_lessons_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Course Lessons API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:843` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_lessons_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityadmin_course_other_instructors_api_response"></a>

## `fluent_community/admin_course_other_instructors_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Course Other Instructors API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1119` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_other_instructors_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityadmin_course_section_api_response"></a>

## `fluent_community/admin_course_section_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Course Section API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:594` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_section_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityadmin_course_sections_api_response"></a>

## `fluent_community/admin_course_sections_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Course Sections API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:577` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_sections_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityadmin_course_students_api_response"></a>

## `fluent_community/admin_course_students_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Course Students API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:493` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_students_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityadmin_courses_api_response"></a>

## `fluent_community/admin_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Courses API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:51` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_courses_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityall_courses_api_response"></a>

## `fluent_community/all_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** All Courses API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:443` | `[ 'courses' => $formattedCourses, 'total' => $courses->total() ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_courses_api_response', function ($total, $all) {
    return $total;
}, 10, 2);
```

<a id="fluent_communitycourse_api_response"></a>

## `fluent_community/course_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:139` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitycourse_info"></a>

## `fluent_community/course_info`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course Info hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:192` | `$course` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_info', function ($course, $all) {
    return $course;
}, 10, 2);
```

<a id="fluent_communitycourse_lesson_api_response"></a>

## `fluent_community/course_lesson_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course Lesson API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:207` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course_lesson_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitycourse_smart_codes"></a>

## `fluent_community/course_smart_codes`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Course Smart Codes hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:166` | `[ '{&#8203;{section.title}&#8203;}' => __('Section Title', 'fluent-community'), '{&#8203;{section.url}&#8203;}' => __('Section URL', 'fluent-community-pro'), '{&#8203;{course.title}&#8203;}' => __('Course Title', 'fluent-community-pro'), '{&#8203;{user.display_name}&#8203;}' => __('User Name', 'fluent-community-pro'), '{&#8203;{community.name}&#8203;}' => __('Site Name', 'fluent-community-pro'), '{&#8203;{community.name_with_url}&#8203;}' => __('Site Name with URL', 'fluent-community-pro') ]` (array) |

### Example

```php
add_filter('fluent_community/course_smart_codes', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitycourse_view_json_ld"></a>

## `fluent_community/course_view_json_ld`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course View JSON Ld hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1053` | `[]` (array)<br>`$space` (Space|mixed)<br>`$data` (mixed) |

### Example

```php
add_filter('fluent_community/course_view_json_ld', function ($param1, $space, $data) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communitycourseaccess_message_html"></a>

## `fluent_community/course/access_message_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Access Message HTML hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:576` | `$accessMessage` (mixed)<br>`$course` (mixed)<br>`$lesson` (mixed)<br>`$config` (mixed) |

### Example

```php
add_filter('fluent_community/course/access_message_html', function ($accessMessage, $course, $lesson, $config) {
    return $accessMessage;
}, 10, 4);
```

<a id="fluent_communitycoursecan_view_lesson"></a>

## `fluent_community/course/can_view_lesson`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Course/Can View Lesson hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:194` | `$canViewLesson` (mixed)<br>`$lesson` (mixed)<br>`$course` (mixed)<br>`$this->getUser()` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:267` | `$canViewLesson` (mixed)<br>`$lesson` (mixed)<br>`$course` (mixed)<br>`$this->getUser()` (mixed) |

### Example

```php
add_filter('fluent_community/course/can_view_lesson', function ($canViewLesson, $lesson, $course, $getUser) {
    return $canViewLesson;
}, 10, 4);
```

<a id="fluent_communitycoursemeta_fields"></a>

## `fluent_community/course/meta_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Meta Fields hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1091` | `[]` (array)<br>`$course` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/course/meta_fields', function ($param1, $course, $all) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communitycourses_api_response"></a>

## `fluent_community/courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Courses API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:77` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/courses_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityget_course_api_response"></a>

## `fluent_community/get_course_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Get Course API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:99` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_course_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityis_allowed_to_complete_lesson"></a>

## `fluent_community/is_allowed_to_complete_lesson`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Is Allowed To Complete Lesson hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseController.php:380` | `true` (mixed)<br>`$lesson` (mixed) |

### Example

```php
add_filter('fluent_community/is_allowed_to_complete_lesson', function ($param1, $lesson) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitylessoncreate_data"></a>

## `fluent_community/lesson/create_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lesson/Create Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:891` | `$lessonData` (mixed)<br>`$request` (array) |

### Example

```php
add_filter('fluent_community/lesson/create_data', function ($lessonData, $request) {
    return $lessonData;
}, 10, 2);
```

<a id="fluent_communitylessonget_public_meta"></a>

## `fluent_community/lesson/get_public_meta`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lesson/Get Public Meta hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Model/CourseLesson.php:307` | `$meta` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/lesson/get_public_meta', function ($meta, $param2) {
    return $meta;
}, 10, 2);
```

<a id="fluent_communitylessonsanitize_meta"></a>

## `fluent_community/lesson/sanitize_meta`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lesson/Sanitize Meta hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:413` | `$meta` (mixed)<br>`$lesson` (mixed) |

### Example

```php
add_filter('fluent_community/lesson/sanitize_meta', function ($meta, $lesson) {
    return $meta;
}, 10, 2);
```

<a id="fluent_communitylessonupdate_data"></a>

## `fluent_community/lesson/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lesson/Update Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:959` | `$updateData` (mixed)<br>`$lesson` (mixed) |

### Example

```php
add_filter('fluent_community/lesson/update_data', function ($updateData, $lesson) {
    return $updateData;
}, 10, 2);
```

<a id="fluent_communitysectionupdate_data"></a>

## `fluent_community/section/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Section/Update Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:737` | `$topicData` (mixed)<br>`$course` (mixed)<br>`$topic` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/section/update_data', function ($topicData, $course, $topic, $all) {
    return $topicData;
}, 10, 4);
```

