---
title: Courses Actions
description: Courses action hooks for FluentCommunity.
---

# Courses Actions

15 unique action hooks currently map to this category, across 22 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/course/before_create`](#fluent_communitycoursebefore_create) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:131` |
| [`fluent_community/course/before_delete`](#fluent_communitycoursebefore_delete) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:387` |
| [`fluent_community/course/completed`](#fluent_communitycoursecompleted) | Core | 2 | `fluent-community/Modules/Course/Services/CourseHelper.php:260` |
| [`fluent_community/course/created`](#fluent_communitycoursecreated) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:166` |
| [`fluent_community/course/deleted`](#fluent_communitycoursedeleted) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:420` |
| [`fluent_community/course/enrolled`](#fluent_communitycourseenrolled) | Core | 2 | `fluent-community/app/Services/Helper.php:1615` |
| [`fluent_community/course/lesson_completed`](#fluent_communitycourselesson_completed) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:193` |
| [`fluent_community/course/published`](#fluent_communitycoursepublished) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:310` |
| [`fluent_community/course/student_left`](#fluent_communitycoursestudent_left) | Core | 1 | `fluent-community/app/Services/Helper.php:1685` |
| [`fluent_community/course/updated`](#fluent_communitycourseupdated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:308` |
| [`fluent_community/lesson/before_deleted`](#fluent_communitylessonbefore_deleted) | Core | 3 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:406` |
| [`fluent_community/lesson/updated`](#fluent_communitylessonupdated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:976` |
| [`fluent_community/quiz/submitted`](#fluent_communityquizsubmitted) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:153` |
| [`fluent_community/section/before_deleted`](#fluent_communitysectionbefore_deleted) | Core | 2 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:403` |
| [`fluent_community/section/scheduled_at_updated`](#fluent_communitysectionscheduled_at_updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:752` |

<a id="fluent_communitycoursebefore_create"></a>

## `fluent_community/course/before_create`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Course/Before Create hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:131` | `$courseData` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:344` | `$courseData` (mixed) |

### Example

```php
add_action('fluent_community/course/before_create', function ($courseData) {
}, 10, 1);
```

<a id="fluent_communitycoursebefore_delete"></a>

## `fluent_community/course/before_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Before Delete hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:387` | `$course` (mixed) |

### Example

```php
add_action('fluent_community/course/before_delete', function ($course) {
}, 10, 1);
```

<a id="fluent_communitycoursecompleted"></a>

## `fluent_community/course/completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Course/Completed hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:260` | `$course` (mixed)<br>`$userId` (mixed) |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:272` | `$course` (mixed)<br>`$userId` (mixed) |

### Example

```php
add_action('fluent_community/course/completed', function ($course, $userId) {
}, 10, 2);
```

<a id="fluent_communitycoursecreated"></a>

## `fluent_community/course/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Course/Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:166` | `$course` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:375` | `$newCourse` (mixed) |

### Example

```php
add_action('fluent_community/course/created', function ($course) {
}, 10, 1);
```

<a id="fluent_communitycoursedeleted"></a>

## `fluent_community/course/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:420` | `$courseId` (mixed) |

### Example

```php
add_action('fluent_community/course/deleted', function ($courseId) {
}, 10, 1);
```

<a id="fluent_communitycourseenrolled"></a>

## `fluent_community/course/enrolled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Course/Enrolled hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1615` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`$by` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1636` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`$by` (mixed)<br>`$created` (mixed) |

### Example

```php
add_action('fluent_community/course/enrolled', function ($space, $userId, $by) {
}, 10, 3);
```

<a id="fluent_communitycourselesson_completed"></a>

## `fluent_community/course/lesson_completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Lesson Completed hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:193` | `$lesson` (mixed)<br>`$userId` (mixed) |

### Example

```php
add_action('fluent_community/course/lesson_completed', function ($lesson, $userId) {
}, 10, 2);
```

<a id="fluent_communitycoursepublished"></a>

## `fluent_community/course/published`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Published hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:310` | `$course` (mixed) |

### Example

```php
add_action('fluent_community/course/published', function ($course) {
}, 10, 1);
```

<a id="fluent_communitycoursestudent_left"></a>

## `fluent_community/course/student_left`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Student Left hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1685` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`$by` (mixed) |

### Example

```php
add_action('fluent_community/course/student_left', function ($space, $userId, $by) {
}, 10, 3);
```

<a id="fluent_communitycourseupdated"></a>

## `fluent_community/course/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:308` | `$course` (mixed)<br>`$dirtyFields` (mixed)<br>`$prevCourse` (mixed) |

### Example

```php
add_action('fluent_community/course/updated', function ($course, $dirtyFields, $prevCourse) {
}, 10, 3);
```

<a id="fluent_communitylessonbefore_deleted"></a>

## `fluent_community/lesson/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Lesson/Before Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:406` | `$courseLesson` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:824` | `$lesson` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1026` | `$lesson` (mixed) |

### Example

```php
add_action('fluent_community/lesson/before_deleted', function ($courseLesson) {
}, 10, 1);
```

<a id="fluent_communitylessonupdated"></a>

## `fluent_community/lesson/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lesson/Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:976` | `$lesson` (mixed)<br>`$dirtyFields` (mixed)<br>`$isNewlyPublished` (mixed) |

### Example

```php
add_action('fluent_community/lesson/updated', function ($lesson, $dirtyFields, $isNewlyPublished) {
}, 10, 3);
```

<a id="fluent_communityquizsubmitted"></a>

## `fluent_community/quiz/submitted`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Quiz/Submitted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/Http/Controllers/QuizController.php:153` | `$quizResult` (mixed)<br>`$user` (mixed)<br>`$quiz` (mixed) |

### Example

```php
add_action('fluent_community/quiz/submitted', function ($quizResult, $user, $quiz) {
}, 10, 3);
```

<a id="fluent_communitysectionbefore_deleted"></a>

## `fluent_community/section/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Section/Before Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:403` | `$courseTopic` (mixed) |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:814` | `$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/before_deleted', function ($courseTopic) {
}, 10, 1);
```

<a id="fluent_communitysectionscheduled_at_updated"></a>

## `fluent_community/section/scheduled_at_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Section/Scheduled At Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:752` | `$course` (mixed)<br>`$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/scheduled_at_updated', function ($course, $topic) {
}, 10, 2);
```

