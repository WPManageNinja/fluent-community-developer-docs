---
title: Delete Course
description: "Deletes a course together with all of its content and every trace of student participation in it."
outline: false
aside: false
---

Deletes a course together with all of its content and every trace of student participation in it.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/courses/{course_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@deleteCourse`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:27`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Destructive and cascading: reactions, comments, lessons, sections and every student enrolment record for the course are deleted along with it, and progress cannot be recovered.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteCourse" specUrl="/openapi/public/courses/delete-course.json" />
