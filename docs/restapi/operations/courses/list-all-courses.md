---
title: List All Courses
description: "Returns the paginated course catalogue with each course fully expanded — sections, per-lesson lock state and the current user progress track — in a single call."
outline: false
aside: false
---

Returns the paginated course catalogue with each course fully expanded — sections, per-lesson lock state and the current user progress track — in a single call.

This is markedly heavier than `list-courses` because every course is run through the same processing as the single-course endpoint. Non-moderators see public and private courses plus any course they are enrolled in or created; moderators see everything published.

## Endpoint

- **Method:** `GET`
- **Path:** `/courses/all-courses`
- **Edition:** Core
- **Controller:** `CourseController@getAllCourses`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:18`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

- Requires the `course_module` feature to be enabled.
- Expect a slow response on large catalogues; prefer `list-courses` for listing screens.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listAllCourses" specUrl="/openapi/public/courses/list-all-courses.json" />
