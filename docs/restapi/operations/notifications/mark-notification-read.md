---
title: Mark Notification Read
description: "Marks one notification read for the current user and returns the recalculated unread count."
outline: false
aside: false
---

Marks one notification read for the current user and returns the recalculated unread count.

When the notification is tied to a post, every other notification for that same post is marked read at the same time, so opening one item clears the whole thread rather than a single row.

## Endpoint

- **Method:** `POST`
- **Path:** `/notifications/mark-read/{notification_id}`
- **Edition:** Core
- **Controller:** `NotificationsController@markAsRead`
- **Route source:** `fluent-community/app/Http/Routes/api.php:137`
- **Controller source:** `fluent-community/app/Http/Controllers/NotificationsController.php`

- Requires a signed-in user; only the caller own subscriber rows are touched.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="markNotificationRead" specUrl="/openapi/public/notifications/mark-notification-read.json" />
