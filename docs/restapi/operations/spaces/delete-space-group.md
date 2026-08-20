---
title: Delete Space Group
description: "Deletes an empty space group."
outline: false
aside: false
---

Deletes an empty space group.

A group that still contains spaces is refused, so no space is ever orphaned by this call.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/spaces/space_groups/{id}`
- **Edition:** Core
- **Controller:** `SpaceController@deleteSpaceGroup`
- **Route source:** `fluent-community/app/Http/Routes/api.php:35`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteSpaceGroup" specUrl="/openapi/public/spaces/delete-space-group.json" />
