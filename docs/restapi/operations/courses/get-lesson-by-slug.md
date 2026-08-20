---
title: Get Lesson By Slug
description: "Returns a single lesson by course and lesson slug, with its access decision resolved and its body parsed only when the caller may read it."
outline: false
aside: false
---

Returns a single lesson by course and lesson slug, with its access decision resolved and its body parsed only when the caller may read it.

Access folds together enrolment, the section unlock date for structured and scheduled courses, sequential lesson ordering, and the public-lesson-view setting that lets public self-paced courses be read without enrolling. When access is denied the lesson still comes back, but locked, carrying a `lock_type` and where relevant an `unlock_date`. Draft lessons are visible only to course admins.

## Endpoint

- **Method:** `GET`
- **Path:** `/courses/{course_slug}/lessons/{lesson_slug}/by-slug`
- **Edition:** Core
- **Controller:** `CourseController@getLessonBySlug`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:13`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

- Secret courses return an error unless the caller is enrolled or is a course admin.
- The `fluent_community/course/can_view_lesson` filter can override the decision, so integrations may widen or narrow access.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getLessonBySlug" specUrl="/openapi/public/courses/get-lesson-by-slug.json" />
