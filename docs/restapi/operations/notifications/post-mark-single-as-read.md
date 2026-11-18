---
title: "Post Mark Single As Read"
description: "Marks one notification as read for the calling member, and returns their new unread count."
outline: false
aside: false
---

Marks one notification as read for the calling member, and returns their new unread count.

The difference from the other mark-read route is the point of this one: it marks only the notification named in the path, leaving the rest of the thread alone. The other route also marks every notification that shares the same post.

## Endpoint

- **Method:** `POST`
- **Path:** `/notifications/mark-read/{notification_id}/single`
- **Edition:** Core
- **Controller:** `NotificationsController@markSingleAsRead`
- **Route source:** `fluent-community/app/Http/Routes/api.php:155`
- **Controller source:** `fluent-community/app/Http/Controllers/NotificationsController.php`

- The path takes a notification ID, not the ID of the member's own subscription row.
- There is no 404: an unknown ID, or one belonging to somebody else, updates nothing and still answers 200 with the current count. A mistyped ID therefore looks like success.
- Repeating the call is harmless.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postMarkSingleAsRead" specUrl="/openapi/public/notifications/post-mark-single-as-read.json" />
