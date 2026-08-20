---
title: Search Course Instructors
description: "Searches all WordPress users so one can be assigned as the course instructor."
outline: false
aside: false
---

Searches all WordPress users so one can be assigned as the course instructor.

Unlike the student picker this does not exclude existing course members, and it is capped at 100 results. Email addresses appear only for callers with the WordPress `list_users` capability.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/instructors/search`
- **Edition:** Core
- **Controller:** `CourseAdminController@getOtherInstructors`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:41`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="searchCourseInstructors" specUrl="/openapi/public/courses/search-course-instructors.json" />
