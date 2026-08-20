---
title: Delete Space By Slug
description: "Deletes a space along with everything posted in it and every membership record for it."
outline: false
aside: false
---

Deletes a space along with everything posted in it and every membership record for it.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/spaces/{spaceSlug}`
- **Edition:** Core
- **Controller:** `SpaceController@deleteBySlug`
- **Route source:** `fluent-community/app/Http/Routes/api.php:21`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin access or the admin role in this space.
- Destructive and cascading: comments, reactions, posts and all membership rows for the space are deleted first, then the space itself. None of it can be recovered.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteSpaceBySlug" specUrl="/openapi/public/spaces/delete-space-by-slug.json" />
