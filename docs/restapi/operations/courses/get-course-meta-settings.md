---
title: Get Course Meta Settings
description: "Returns the extra course settings panels contributed by integrations, or `null` when nothing has registered any."
outline: false
aside: false
---

Returns the extra course settings panels contributed by integrations, or `null` when nothing has registered any.

The panels come entirely from the `fluent_community/course/meta_fields` filter, so the response is empty on a stock install.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/meta-settings`
- **Edition:** Core
- **Controller:** `CourseAdminController@getMetaSettings`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:39`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires the course-creator permission and management access to this course.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourseMetaSettings" specUrl="/openapi/public/courses/get-course-meta-settings.json" />
