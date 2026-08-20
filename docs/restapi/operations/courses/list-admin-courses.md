---
title: List Admin Courses
description: "Returns the paginated list of courses the current user may manage, each with its student count and its section and lesson totals."
outline: false
aside: false
---

Returns the paginated list of courses the current user may manage, each with its student count and its section and lesson totals.

Unlike the portal listing this includes drafts. Filter with `search`, `topic_slug` and `status` (`published` or `draft`); sort with `sort_by=alphabetical`, otherwise newest first. Pass `with_categories` to receive the category list too.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses`
- **Edition:** Core
- **Controller:** `CourseAdminController@getCourses`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:22`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission; the list is scoped to courses the caller administers.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listAdminCourses" specUrl="/openapi/public/courses/list-admin-courses.json" />
