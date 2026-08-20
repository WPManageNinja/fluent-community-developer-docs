---
title: Get Course Section
description: "Returns one section of a course with its lessons."
outline: false
aside: false
---

Returns one section of a course with its lessons.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/sections/{section_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@getSection`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:46`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourseSection" specUrl="/openapi/public/courses/get-course-section.json" />
