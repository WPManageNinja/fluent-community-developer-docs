---
title: Get Course Welcome Banner Settings
description: "Returns the two course welcome banner variants, one for enrolled students and one for visitors who have not enrolled."
outline: false
aside: false
---

Returns the two course welcome banner variants, one for enrolled students and one for visitors who have not enrolled.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/welcome-banner`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getCourseWelcomeBannerSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:67`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourseWelcomeBannerSettings" specUrl="/openapi/public/courses/get-course-welcome-banner-settings.json" />
