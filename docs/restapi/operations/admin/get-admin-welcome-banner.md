---
title: Get Admin Welcome Banner
description: "Returns the two portal welcome banner variants — one shown to signed-in members, one to logged-out visitors — as stored, before rendering."
outline: false
aside: false
---

Returns the two portal welcome banner variants — one shown to signed-in members, one to logged-out visitors — as stored, before rendering.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/welcome-banner`
- **Edition:** Core
- **Controller:** `AdminController@getWelcomeBannerSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:109`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getAdminWelcomeBanner" specUrl="/openapi/public/admin/get-admin-welcome-banner.json" />
