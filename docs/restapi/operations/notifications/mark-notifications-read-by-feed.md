---
title: Mark Notifications Read By Feed
description: "Marks every notification about one post read for the current user and returns the new unread count together with the remaining unread post ids."
outline: false
aside: false
---

Marks every notification about one post read for the current user and returns the new unread count together with the remaining unread post ids.

The `unread_feed_ids` list is what the portal uses to keep the unread dot on individual posts in the feed, so this response is directly usable to update the list in place.

## Endpoint

- **Method:** `POST`
- **Path:** `/notifications/mark-read/{feed_id}/by-feed-id`
- **Edition:** Core
- **Controller:** `NotificationsController@markAsReadByFeedId`
- **Route source:** `fluent-community/app/Http/Routes/api.php:141`
- **Controller source:** `fluent-community/app/Http/Controllers/NotificationsController.php`

- Requires a signed-in user.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="markNotificationsReadByFeed" specUrl="/openapi/public/notifications/mark-notifications-read-by-feed.json" />
