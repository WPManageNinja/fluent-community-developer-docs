---
title: Get Course By Slug
description: "Returns one course by slug with everything `get-course` returns, plus the instructor block — the creator profile, their total course count and optionally their total student count."
outline: false
aside: false
---

Returns one course by slug with everything `get-course` returns, plus the instructor block — the creator profile, their total course count and optionally their total student count.

The instructor block is omitted when the course has `hide_instructor_view` set, and the student total is only calculated when `show_instructor_students_count` is on. As with the id variant, pass `intended_lesson_slug` to have that one lesson body rendered eagerly.

## Endpoint

- **Method:** `GET`
- **Path:** `/courses/{course_slug}/by-slug`
- **Edition:** Core
- **Controller:** `CourseController@getCourseBySlug`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:12`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourseBySlug" specUrl="/openapi/public/courses/get-course-by-slug.json" />
