---
title: Duplicate Course
description: "Copies a course, its sections, its lessons and their attached documents into a new draft owned by the current user."
outline: false
aside: false
---

Copies a course, its sections, its lessons and their attached documents into a new draft owned by the current user.

The copy takes the original title with a "(Copy)" suffix and a timestamped slug, and is always created as a draft regardless of the source status. Students, enrolments and progress are not copied.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/duplicate`
- **Edition:** Core
- **Controller:** `CourseAdminController@duplicateCourse`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:26`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="duplicateCourse" specUrl="/openapi/public/courses/duplicate-course.json" />
