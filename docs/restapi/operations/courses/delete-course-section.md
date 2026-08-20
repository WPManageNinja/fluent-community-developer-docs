---
title: Delete Course Section
description: "Deletes a section and every lesson inside it."
outline: false
aside: false
---

Deletes a section and every lesson inside it.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/courses/{course_id}/sections/{section_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@deleteSection`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:49`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.
- Destructive and cascading: all lessons in the section are deleted with it, along with student progress against them.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteCourseSection" specUrl="/openapi/public/courses/delete-course-section.json" />
