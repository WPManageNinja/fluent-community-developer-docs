---
title: Get Admin Course
description: "Returns one course in its editable form, with the lock screen configuration, the attached category ids and — when it has students — the completion count and average progress."
outline: false
aside: false
---

Returns one course in its editable form, with the lock screen configuration, the attached category ids and — when it has students — the completion count and average progress.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@findCourse`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:24`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getAdminCourse" specUrl="/openapi/public/courses/get-admin-course.json" />
