---
title: Save Admin Welcome Banner
description: "Stores both welcome banner variants and pre-renders their Markdown descriptions to HTML so the portal does not have to parse them per request."
outline: false
aside: false
---

Stores both welcome banner variants and pre-renders their Markdown descriptions to HTML so the portal does not have to parse them per request.

Rendering happens only for a variant whose `enabled` flag is `yes`. When the logged-out variant has a button label and `useCustomUrl` is not `yes`, its link is replaced with the portal auth URL. The result is written to the options table and cached for a week.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/welcome-banner`
- **Edition:** Core
- **Controller:** `AdminController@updateWelcomeBannerSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:110`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveAdminWelcomeBanner" specUrl="/openapi/public/admin/save-admin-welcome-banner.json" />
