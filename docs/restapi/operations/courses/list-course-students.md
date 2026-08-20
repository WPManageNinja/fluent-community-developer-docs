---
title: List Course Students
description: "Returns the paginated roster of a course, each student carrying their enrolment pivot and their completion percentage."
outline: false
aside: false
---

Returns the paginated roster of a course, each student carrying their enrolment pivot and their completion percentage.

Filter with `search`; sort with `sort_by` set to `created_at` (enrolment date, the default), `display_name` or `last_activity`, and `sort_dir`. Progress is resolved for the whole page in one bulk query.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/students`
- **Edition:** Core
- **Controller:** `CourseAdminController@getCourseStudents`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:29`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listCourseStudents" specUrl="/openapi/public/courses/list-course-students.json" />
