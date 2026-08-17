---
title: Delete Space By ID
description: "Deletes a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint."
outline: false
aside: false
---

Deletes a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/spaces/{spaceId}/by-id`
- **Edition:** Core
- **Controller:** `SpaceController@deleteById`
- **Route source:** `fluent-community/app/Http/Routes/api.php:22`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin access or the admin role in this space.
- Destructive and cascading: comments, reactions, posts and all membership rows for the space are deleted along with it.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteSpaceById" specUrl="/openapi/public/spaces/delete-space-by-id.json" />
