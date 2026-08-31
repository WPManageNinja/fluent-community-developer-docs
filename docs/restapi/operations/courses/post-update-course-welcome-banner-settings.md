---
title: Post Update Course Welcome Banner Settings
description: "Stores both course welcome banner variants and pre-renders their Markdown descriptions to HTML."
outline: false
aside: false
---

Stores both course welcome banner variants and pre-renders their Markdown descriptions to HTML.

Only the `enrolled` and `not_enrolled` views are recognised. The banner is displayed only while the course `show_welcome_banner` setting is on, which is saved through the course update endpoint rather than here.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/welcome-banner`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@updateCourseWelcomeBannerSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:68`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postUpdateCourseWelcomeBannerSettings" specUrl="/openapi/public/courses/post-update-course-welcome-banner-settings.json" />
