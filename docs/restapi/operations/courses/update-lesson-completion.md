---
title: Update Lesson Completion
description: "Marks a lesson complete or incomplete for the current user and returns the recalculated course progress track."
outline: false
aside: false
---

Marks a lesson complete or incomplete for the current user and returns the recalculated course progress track.

`state` must be `completed` or `incomplete`. The caller must already be enrolled, and both the course and the lesson must be published. When the update takes progress to 100 per cent the course completion routine runs and `is_completed` comes back true. A lesson gated behind a video watch threshold returns an error with a `video_watch_required` code and the required percentage.

## Endpoint

- **Method:** `PUT`
- **Path:** `/courses/{course_id}/lessons/{lesson_id}/completion`
- **Edition:** Core
- **Controller:** `CourseController@updateCompletionLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:15`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateLessonCompletion" specUrl="/openapi/public/courses/update-lesson-completion.json" />
