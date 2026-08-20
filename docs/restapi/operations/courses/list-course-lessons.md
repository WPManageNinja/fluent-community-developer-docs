---
title: List Course Lessons
description: "Returns the lessons of a course in display order, optionally narrowed to one section."
outline: false
aside: false
---

Returns the lessons of a course in display order, optionally narrowed to one section.

Pass `topic_id` to restrict the list to a single section. The response is not paginated.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/lessons`
- **Edition:** Core
- **Controller:** `CourseAdminController@getLessons`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:52`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listCourseLessons" specUrl="/openapi/public/courses/list-course-lessons.json" />
