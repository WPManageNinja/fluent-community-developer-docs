---
title: Enroll Course
description: "Enrols the current user in a course and returns their freshly initialised progress track."
outline: false
aside: false
---

Enrols the current user in a course and returns their freshly initialised progress track.

Self-enrolment only works on published, public courses; course admins may enrol themselves in their own unpublished courses. Calling it again on an existing enrolment is not an error — it returns the current track with an already-enrolled message.

## Endpoint

- **Method:** `POST`
- **Path:** `/courses/{course_id}/enroll`
- **Edition:** Core
- **Controller:** `CourseController@enrollCourse`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:14`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

- Requires a signed-in user; private and secret courses must be joined through an admin or a paywall.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="enrollCourse" specUrl="/openapi/public/courses/enroll-course.json" />
