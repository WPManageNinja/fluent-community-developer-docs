---
title: Reindex Spaces
description: "Applies a new sidebar order to spaces within their group."
outline: false
aside: false
---

Applies a new sidebar order to spaces within their group.

Unlike the group variant, `indexes` here is an ordered array of space ids and the position in the array becomes the serial. An id that does not resolve to a space aborts the call.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/spaces/space_groups/re-index-spaces`
- **Edition:** Core
- **Controller:** `SpaceController@updateSpaceIndexes`
- **Route source:** `fluent-community/app/Http/Routes/api.php:37`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="reindexSpaces" specUrl="/openapi/public/spaces/reindex-spaces.json" />
