---
title: Update Course Links
description: "Replaces the sidebar link list shown on a course with the submitted set."
outline: false
aside: false
---

Replaces the sidebar link list shown on a course with the submitted set.

Each link is sanitised individually. The submitted array replaces the stored one wholesale.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/links`
- **Edition:** Core
- **Controller:** `CourseAdminController@updateLinks`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:37`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateCourseLinks" specUrl="/openapi/public/courses/update-course-links.json" />
