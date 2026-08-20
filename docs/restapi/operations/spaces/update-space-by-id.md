---
title: Update Space By ID
description: "Updates a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint."
outline: false
aside: false
---

Updates a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint.

## Endpoint

- **Method:** `PUT`
- **Path:** `/spaces/{spaceId}/by-id`
- **Edition:** Core
- **Controller:** `SpaceController@patchById`
- **Route source:** `fluent-community/app/Http/Routes/api.php:12`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin access or the admin role in this space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateSpaceById" specUrl="/openapi/public/spaces/update-space-by-id.json" />
