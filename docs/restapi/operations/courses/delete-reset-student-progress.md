---
title: Delete Reset Student Progress
description: "Clears one student completion records for the course while leaving them enrolled."
outline: false
aside: false
---

Clears one student completion records for the course while leaving them enrolled.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/courses/{course_id}/students/{student_id}/progress`
- **Edition:** Core
- **Controller:** `CourseAdminController@resetStudentProgress`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:32`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Destructive: the completion history is removed and cannot be restored.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteResetStudentProgress" specUrl="/openapi/public/courses/delete-reset-student-progress.json" />
