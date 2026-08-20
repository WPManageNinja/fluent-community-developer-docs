---
title: Remove Course Student
description: "Unenrols a student from the course."
outline: false
aside: false
---

Unenrols a student from the course.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/courses/{course_id}/students/{student_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@removeStudent`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:31`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Destructive: removing the enrolment also removes the progress tied to it, so re-adding the student does not restore their completions.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="removeCourseStudent" specUrl="/openapi/public/courses/remove-course-student.json" />
