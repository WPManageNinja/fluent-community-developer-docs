---
title: Post Mark Lesson Video Watched
description: "Records that the current user has watched enough of a gated lesson video to be allowed to mark the lesson complete."
outline: false
aside: false
---

Records that the current user has watched enough of a gated lesson video to be allowed to mark the lesson complete.

Send `watched_percent`; it must reach the lesson threshold or the call is rejected with the required figure. A lesson that is not video-gated returns `is_gated: false` and records nothing.

## Endpoint

- **Method:** `POST`
- **Path:** `/courses/{course_id}/lessons/{lesson_id}/video-watched`
- **Edition:** Core
- **Controller:** `CourseController@markLessonVideoWatched`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:16`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

- Requires a signed-in user who is enrolled in the course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postMarkLessonVideoWatched" specUrl="/openapi/public/courses/post-mark-lesson-video-watched.json" />
