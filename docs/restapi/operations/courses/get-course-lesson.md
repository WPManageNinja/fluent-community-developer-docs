---
title: Get Course Lesson
description: "Returns one lesson in its editable form with its section and course attached."
outline: false
aside: false
---

Returns one lesson in its editable form with its section and course attached.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/lessons/{lesson_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@getLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:56`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourseLesson" specUrl="/openapi/public/courses/get-course-lesson.json" />
