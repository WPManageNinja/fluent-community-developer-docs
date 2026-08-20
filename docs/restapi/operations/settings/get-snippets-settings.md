---
title: Get Snippets Settings
description: "Returns the custom CSS and custom JavaScript injected into the portal."
outline: false
aside: false
---

Returns the custom CSS and custom JavaScript injected into the portal.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/snippets-settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getSnippetsSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:33`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSnippetsSettings" specUrl="/openapi/public/settings/get-snippets-settings.json" />
