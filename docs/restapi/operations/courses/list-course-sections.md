---
title: List Course Sections
description: "Returns the sections of a course in display order, with their lessons attached."
outline: false
aside: false
---

Returns the sections of a course in display order, with their lessons attached.

Pass `conditions[]=only_published` to restrict both sections and lessons to published records. Pass `with_lock_screen` to receive the course lock screen settings in the same response.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/sections`
- **Edition:** Core
- **Controller:** `CourseAdminController@getSections`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:43`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listCourseSections" specUrl="/openapi/public/courses/list-course-sections.json" />
