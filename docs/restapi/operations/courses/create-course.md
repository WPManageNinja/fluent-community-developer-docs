---
title: Create Course
description: "Creates a course in draft state, with its type, privacy, layout and lock screen behaviour set from the submitted settings."
outline: false
aside: false
---

Creates a course in draft state, with its type, privacy, layout and lock screen behaviour set from the submitted settings.

`title`, `description`, `privacy` (`public`, `private` or `secret`) and `course_type` (`self_paced`, `structured` or `scheduled`) are all required. A custom lock screen is only honoured on private courses, and the `redirect` variant additionally requires a valid `settings.onboard_redirect_url`. `public_lesson_view` is only stored for public self-paced courses. A colliding slug gets a timestamp suffix rather than failing.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses`
- **Edition:** Core
- **Controller:** `CourseAdminController@createCourse`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:23`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createCourse" specUrl="/openapi/public/courses/create-course.json" />
