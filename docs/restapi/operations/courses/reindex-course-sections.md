---
title: Reindex Course Sections
description: "Applies a new display order to a course outline by writing the submitted priority for each section."
outline: false
aside: false
---

Applies a new display order to a course outline by writing the submitted priority for each section.

Send `indexes` as a map of section id to priority. Ids that do not belong to this course are ignored, so a malformed payload silently reorders nothing.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/admin/courses/{course_id}/sections/indexes`
- **Edition:** Core
- **Controller:** `CourseAdminController@resetSectionIndexes`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:45`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="reindexCourseSections" specUrl="/openapi/public/courses/reindex-course-sections.json" />
