---
title: Update Course Lesson
description: "Saves the full lesson record — title, status, body and metadata — and reconciles the featured image media."
outline: false
aside: false
---

Saves the full lesson record — title, status, body and metadata — and reconciles the featured image media.

The payload is nested under `lesson`, and `title`, `parent_id` and a `status` of `draft`, `published` or `archived` are required. An empty `message` is honoured, so the body can be cleared deliberately. Removing the featured image detaches the underlying media row. Attached document ids are preserved from the stored metadata rather than taken from the request.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/courses/{course_id}/lessons/{lesson_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@updateLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:57`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateCourseLesson" specUrl="/openapi/public/courses/update-course-lesson.json" />
