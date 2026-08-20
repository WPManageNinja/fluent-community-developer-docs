---
title: Reindex Space Groups
description: "Applies a new sidebar order to the space groups."
outline: false
aside: false
---

Applies a new sidebar order to the space groups.

Send `indexes` as a map of group id to zero-based position; each group serial is stored as the position plus one. An id that does not resolve to a group aborts the call.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/spaces/space_groups/re-index`
- **Edition:** Core
- **Controller:** `SpaceController@updateSpaceGroupIndexes`
- **Route source:** `fluent-community/app/Http/Routes/api.php:36`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="reindexSpaceGroups" specUrl="/openapi/public/spaces/reindex-space-groups.json" />
