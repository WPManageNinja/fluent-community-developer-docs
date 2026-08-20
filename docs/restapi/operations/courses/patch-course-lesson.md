---
title: Patch Course Lesson
description: "Applies a partial update to a lesson, accepting only `title`, `status`, `slug` and `message`."
outline: false
aside: false
---

Applies a partial update to a lesson, accepting only `title`, `status`, `slug` and `message`.

Empty values are dropped so a blank field cannot wipe an existing one, but `message` bypasses that guard so a lesson body can be emptied on purpose. Publishing a lesson that has never been published stamps `scheduled_at` with the current time, which is what drip and notification logic reads.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/admin/courses/{course_id}/lessons/{lesson_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@patchLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:58`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="patchCourseLesson" specUrl="/openapi/public/courses/patch-course-lesson.json" />
