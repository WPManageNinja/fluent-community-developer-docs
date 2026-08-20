---
title: Move Space
description: "Moves a space into a different space group."
outline: false
aside: false
---

Moves a space into a different space group.

Send `space_id` and `group_id`; both must resolve. The space keeps its existing serial, so a reindex call usually follows to place it correctly within the new group.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/spaces/space_groups/move-space`
- **Edition:** Core
- **Controller:** `SpaceController@moveSpace`
- **Route source:** `fluent-community/app/Http/Routes/api.php:38`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin access, or the admin role in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="moveSpace" specUrl="/openapi/public/spaces/move-space.json" />
