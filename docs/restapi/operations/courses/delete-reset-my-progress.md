---
title: Delete Reset My Progress
description: "Clears the current user own completion records for a course and returns an empty progress track, leaving the enrolment in place."
outline: false
aside: false
---

Clears the current user own completion records for a course and returns an empty progress track, leaving the enrolment in place.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/courses/{course_id}/progress`
- **Edition:** Core
- **Controller:** `CourseController@resetMyProgress`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:17`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

- Requires the caller to be enrolled in a published course.
- Destructive: every completed-lesson record for this user in this course is removed and cannot be restored.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteResetMyProgress" specUrl="/openapi/public/courses/delete-reset-my-progress.json" />
