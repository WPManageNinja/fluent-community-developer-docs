---
title: Move Course Lesson
description: "Moves a lesson into a different section of the same course."
outline: false
aside: false
---

Moves a lesson into a different section of the same course.

Send `lesson_id` and `section_id`; both must already belong to the course in the path. The lesson keeps its existing priority value, so a reindex call usually follows.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/courses/{course_id}/move-lesson`
- **Edition:** Core
- **Controller:** `CourseAdminController@moveLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:55`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="moveCourseLesson" specUrl="/openapi/public/courses/move-course-lesson.json" />
