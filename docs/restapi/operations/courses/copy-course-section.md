---
title: Copy Course Section
description: "Copies a section, its lessons and their attached documents from one course into another, appended to the end of the destination outline."
outline: false
aside: false
---

Copies a section, its lessons and their attached documents from one course into another, appended to the end of the destination outline.

Send `section_id` and `from_course_id`; the caller must administer the source course as well as the destination one, which the route policy alone does not enforce. Student progress is not copied.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/courses/{course_id}/copy-section`
- **Edition:** Core
- **Controller:** `CourseAdminController@copySection`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:54`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires course-admin access to both the source and the destination course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="copyCourseSection" specUrl="/openapi/public/courses/copy-course-section.json" />
