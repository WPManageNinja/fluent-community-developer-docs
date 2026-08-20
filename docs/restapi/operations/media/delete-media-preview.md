---
title: Delete Media Preview
description: "Clears the link preview image stored on a post, leaving the rest of the post untouched."
outline: false
aside: false
---

Clears the link preview image stored on a post, leaving the rest of the post untouched.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/feeds/{feed_id}/media-preview`
- **Edition:** Core
- **Controller:** `FeedsController@deleteMediaPreview`
- **Route source:** `fluent-community/app/Http/Routes/api.php:62`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Requires the same permission as deleting the post: the author, or the `delete_any_feed` permission globally or in the space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteMediaPreview" specUrl="/openapi/public/media/delete-media-preview.json" />
