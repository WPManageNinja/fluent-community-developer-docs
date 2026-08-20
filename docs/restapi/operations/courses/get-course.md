---
title: Get Course
description: "Returns one course by numeric id with its sections, the lessons the caller may see, per-lesson lock state and the current progress track."
outline: false
aside: false
---

Returns one course by numeric id with its sections, the lessons the caller may see, per-lesson lock state and the current progress track.

Sections with no visible lessons are omitted entirely. Lesson bodies are not parsed unless `intended_lesson_slug` matches, which is what makes the deep-link into a lesson render immediately while the rest lazy-load. Private courses the caller is not enrolled in come back with a `lockscreen_config` instead of content; secret courses return an error.

## Endpoint

- **Method:** `GET`
- **Path:** `/courses/{course_id}`
- **Edition:** Core
- **Controller:** `CourseController@getCourse`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:11`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

- Unpublished courses are visible only to their course admins.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourse" specUrl="/openapi/public/courses/get-course.json" />
