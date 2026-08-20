---
title: Delete Feed
description: "Deletes a post from the community."
outline: false
aside: false
---

Deletes a post from the community.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/feeds/{feed_id}`
- **Edition:** Core
- **Controller:** `FeedsController@deleteFeed`
- **Route source:** `fluent-community/app/Http/Routes/api.php:61`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- The post author can always delete; anyone else needs the `delete_any_feed` permission globally or in the space.
- Destructive: the post row is removed and the `fluent_community/feed/deleted` action runs, which is what cleans up its comments, reactions and activity entries.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteFeed" specUrl="/openapi/public/feeds/delete-feed.json" />
