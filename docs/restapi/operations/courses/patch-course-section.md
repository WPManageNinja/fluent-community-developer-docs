---
title: Patch Course Section
description: "Applies a partial update to a section, accepting the drip fields that match the course type."
outline: false
aside: false
---

Applies a partial update to a section, accepting the drip fields that match the course type.

Beyond `title` and `status`, a scheduled course also accepts `scheduled_at` and a structured course accepts `reactions_count`, which stores the drip delay in days. The two are mutually exclusive: setting a schedule clears the delay and vice versa. Changing either fires its own hook so drip notifications can be rescheduled.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/admin/courses/{course_id}/sections/{section_id}`
- **Edition:** Core
- **Controller:** `CourseAdminController@patchSection`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:48`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="patchCourseSection" specUrl="/openapi/public/courses/patch-course-section.json" />
