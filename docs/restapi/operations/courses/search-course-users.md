---
title: Search Course Users
description: "Searches for WordPress users who are not yet enrolled in the course, for the add-student picker."
outline: false
aside: false
---

Searches for WordPress users who are not yet enrolled in the course, for the add-student picker.

Limited to 100 candidates. Email addresses are only included for callers with the WordPress `list_users` capability. On multisite the search is restricted to users with capabilities on the current site.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/users/search`
- **Edition:** Core
- **Controller:** `CourseAdminController@getOtherUsers`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:35`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="searchCourseUsers" specUrl="/openapi/public/courses/search-course-users.json" />
