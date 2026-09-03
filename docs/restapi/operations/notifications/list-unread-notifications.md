---
title: List Unread Notifications
description: "Returns up to 50 unread notifications for the current user with the unread total, for the notification dropdown."
outline: false
aside: false
---

Returns up to 50 unread notifications for the current user with the unread total, for the notification dropdown.

Not paginated. `notification_type` narrows the list; it defaults to `all`.

## Endpoint

- **Method:** `GET`
- **Path:** `/notifications/unread`
- **Edition:** Core
- **Controller:** `NotificationsController@getUnreadNotifications`
- **Route source:** `fluent-community/app/Http/Routes/api.php:139`
- **Controller source:** `fluent-community/app/Http/Controllers/NotificationsController.php`

- Requires a signed-in user.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listUnreadNotifications" specUrl="/openapi/public/notifications/list-unread-notifications.json" />
