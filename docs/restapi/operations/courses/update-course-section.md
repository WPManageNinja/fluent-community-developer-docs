---
title: Update Course Section
description: "Replaces the title and status of a section."
outline: false
aside: false
---

Replaces the title and status of a section.

`title` and a `status` of `draft`, `published` or `archived` are both required.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/courses/{course_id}/sections/{section_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@updateSection`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:47`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateCourseSection" specUrl="/openapi/public/courses/update-course-section.json" />
