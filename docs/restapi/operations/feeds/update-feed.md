---
title: Update Feed
description: "Replaces the body and metadata of an existing post, re-renders it, reconciles its media and topics, and records an edit history entry."
outline: false
aside: false
---

Replaces the body and metadata of an existing post, re-renders it, reconciles its media and topics, and records an edit history entry.

Only posts in `published`, `unlisted`, `scheduled` or `pending` state can be edited. The last five edits are kept in post meta. Survey posts are checked so existing options cannot be removed out from under voters. Passing `new_space_id` moves the post — and its activity rows — into another space, which requires community-admin rights in the destination and the author being a member of it; `move_to_profile` does the reverse. Sending `media_images` at all deactivates any media row not in the list.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}`
- **Edition:** Core
- **Controller:** `FeedsController@update`
- **Route source:** `fluent-community/app/Http/Routes/api.php:44`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- The post author can always edit; anyone else needs the `edit_any_feed` permission globally or in the space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateFeed" specUrl="/openapi/public/feeds/update-feed.json" />
