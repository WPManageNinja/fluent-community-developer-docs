---
title: Create Course Lesson
description: "Creates an empty draft lesson at the end of a section."
outline: false
aside: false
---

Creates an empty draft lesson at the end of a section.

`title` and `section_id` are required, and the section must belong to this course. The lesson is always created as a draft and takes the next free priority within its section.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/lessons`
- **Edition:** Core
- **Controller:** `CourseAdminController@createLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:53`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createCourseLesson" specUrl="/openapi/public/courses/create-course-lesson.json" />
