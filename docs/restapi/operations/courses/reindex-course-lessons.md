---
title: Reindex Course Lessons
description: "Applies a new display order to the lessons inside one section."
outline: false
aside: false
---

Applies a new display order to the lessons inside one section.

Send `indexes` as a map of lesson id to priority. Only lessons that belong to both this course and this section are updated.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/admin/courses/{course_id}/sections/{section_id}/indexes`
- **Edition:** Core
- **Controller:** `CourseAdminController@resetLessonIndexes`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:50`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="reindexCourseLessons" specUrl="/openapi/public/courses/reindex-course-lessons.json" />
