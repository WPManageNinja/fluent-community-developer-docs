---
title: Create Course Section
description: "Adds a published section to the end of a course outline."
outline: false
aside: false
---

Adds a published section to the end of a course outline.

`title` is required. The new section takes the next free priority, so it always appears last.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/sections`
- **Edition:** Core
- **Controller:** `CourseAdminController@createSection`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:44`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createCourseSection" specUrl="/openapi/public/courses/create-course-section.json" />
