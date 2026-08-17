---
title: Get Course Comments
description: "Returns a paginated, newest-first list of every comment left on lessons within one course, for the course management screen."
outline: false
aside: false
---

Returns a paginated, newest-first list of every comment left on lessons within one course, for the course management screen.

Each row carries the author profile, a trimmed parent lesson reference and a `liked` flag for the current user. Member email addresses are explicitly hidden. Pending comments appear only when content moderation is enabled and the caller can moderate.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/comments`
- **Edition:** Core
- **Controller:** `CourseAdminController@getCourseComments`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:28`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourseComments" specUrl="/openapi/public/comments/get-course-comments.json" />
