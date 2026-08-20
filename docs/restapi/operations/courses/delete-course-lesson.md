---
title: Delete Course Lesson
description: "Deletes a single lesson from a course."
outline: false
aside: false
---

Deletes a single lesson from a course.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/courses/{course_id}/lessons/{lesson_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@deleteLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:59`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.
- Destructive: student completion records for the lesson go with it, which shifts every enrolled student overall course progress.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteCourseLesson" specUrl="/openapi/public/courses/delete-course-lesson.json" />
