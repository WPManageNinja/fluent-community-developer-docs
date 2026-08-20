---
title: Save Messaging Settings
description: "Merges the submitted messaging settings over the stored ones and saves the realtime socket credentials when realtime chat is switched on."
outline: false
aside: false
---

Merges the submitted messaging settings over the stored ones and saves the realtime socket credentials when realtime chat is switched on.

Keys not already present in the stored config are discarded. `socket_config` is only written when `realtime_enabled` is `yes` in the merged result.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/messaging-setting`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@updateMessagingSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:22`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro and the Fluent Messaging plugin.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveMessagingSettings" specUrl="/openapi/public/admin/save-messaging-settings.json" />
