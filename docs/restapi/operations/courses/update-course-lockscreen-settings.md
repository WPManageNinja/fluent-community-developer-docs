---
title: Update Course Lockscreen Settings
description: "Stores the lock screen a private course shows to visitors who are not enrolled — its copy, imagery and call to action."
outline: false
aside: false
---

Stores the lock screen a private course shows to visitors who are not enrolled — its copy, imagery and call to action.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/courses/{course_id}/lockscreens`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@updateCourseLockscreenSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:66`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateCourseLockscreenSettings" specUrl="/openapi/public/courses/update-course-lockscreen-settings.json" />
