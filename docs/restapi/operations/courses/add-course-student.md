---
title: Add Course Student
description: "Enrols one existing WordPress user in the course on behalf of an administrator."
outline: false
aside: false
---

Enrols one existing WordPress user in the course on behalf of an administrator.

`user_id` is required and must reference a real user; their community profile is created on the fly if missing. Users whose profile is not active are rejected, as is a user who is already enrolled.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/students`
- **Edition:** Core
- **Controller:** `CourseAdminController@addStudent`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:30`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="addCourseStudent" specUrl="/openapi/public/courses/add-course-student.json" />
