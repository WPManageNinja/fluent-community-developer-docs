---
title: Update Course
description: "Updates a course record and its settings block, firing the course-published hook the first time its status crosses into `published`."
outline: false
aside: false
---

Updates a course record and its settings block, firing the course-published hook the first time its status crosses into `published`.

The same required fields as creation apply, plus `status` (`draft`, `published` or `archived`). Cover photo and logo are cleared when their fields are empty, so omitting them removes the images. Reassigning `created_by` is only honoured for community admins. Hooks fire only when something actually changed.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/courses/{course_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@updateCourse`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:25`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateCourse" specUrl="/openapi/public/courses/update-course.json" />
