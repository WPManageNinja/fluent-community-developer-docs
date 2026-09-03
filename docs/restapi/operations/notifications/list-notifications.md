---
title: List Notifications
description: "Returns the paginated notification history for the current user, newest activity first, with the unread total alongside it."
outline: false
aside: false
---

Returns the paginated notification history for the current user, newest activity first, with the unread total alongside it.

Filter with `status` (for example `unread`) and `notification_type`, which defaults to `all`. Each row carries the actor profile and the per-user subscriber record that holds the read flag. Ordering is by `updated_at`, so a notification that gets new activity moves back to the top.

## Endpoint

- **Method:** `GET`
- **Path:** `/notifications`
- **Edition:** Core
- **Controller:** `NotificationsController@getNotifications`
- **Route source:** `fluent-community/app/Http/Routes/api.php:138`
- **Controller source:** `fluent-community/app/Http/Controllers/NotificationsController.php`

- Requires a signed-in user; a caller only ever sees their own notifications.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listNotifications" specUrl="/openapi/public/notifications/list-notifications.json" />
