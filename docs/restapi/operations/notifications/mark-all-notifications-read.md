---
title: Mark All Notifications Read
description: "Marks every unread notification read for the current user in a single update."
outline: false
aside: false
---

Marks every unread notification read for the current user in a single update.

## Endpoint

- **Method:** `POST`
- **Path:** `/notifications/mark-all-read`
- **Edition:** Core
- **Controller:** `NotificationsController@markAllRead`
- **Route source:** `fluent-community/app/Http/Routes/api.php:139`
- **Controller source:** `fluent-community/app/Http/Controllers/NotificationsController.php`

- Requires a signed-in user; the unread count is not returned, so refetch it if you display one.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="markAllNotificationsRead" specUrl="/openapi/public/notifications/mark-all-notifications-read.json" />
