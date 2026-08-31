---
title: Get Messaging Settings
description: "Returns the direct-messaging configuration alongside the realtime socket credentials used by the chat client."
outline: false
aside: false
---

Returns the direct-messaging configuration alongside the realtime socket credentials used by the chat client.

Fails with a message asking for an update when the installed Fluent Messaging plugin is too old to expose the config helper.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/messaging-setting`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getMessagingSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:19`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro and the Fluent Messaging plugin.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getMessagingSettings" specUrl="/openapi/public/admin/get-messaging-settings.json" />
