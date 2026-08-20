---
title: List Courses
description: "Returns the paginated course catalogue visible to the current user, each entry carrying its enrolment state, progress, section and lesson counts."
outline: false
aside: false
---

Returns the paginated course catalogue visible to the current user, each entry carrying its enrolment state, progress, section and lesson counts.

Only published courses are listed, except that course creators also see their own drafts. Secret courses appear only if the caller is enrolled. Filter with `search`, `topic_slug` and `type=enrolled`; sort with `sort_by` set to `alphabetical` (default), `latest` or `oldest`. Pass `with_categories` to receive the category list alongside the courses.

## Endpoint

- **Method:** `GET`
- **Path:** `/courses`
- **Edition:** Core
- **Controller:** `CourseController@getCourses`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:10`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseController.php`

- Courses with `hide_members_count` enabled report a `studentsCount` of zero rather than omitting it.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listCourses" specUrl="/openapi/public/courses/list-courses.json" />
