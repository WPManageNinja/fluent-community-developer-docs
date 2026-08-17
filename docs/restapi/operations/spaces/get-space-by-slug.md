---
title: Get Space By Slug
description: "Returns one space with its settings, topics, the current user membership and the permissions they hold inside it."
outline: false
aside: false
---

Returns one space with its settings, topics, the current user membership and the permissions they hold inside it.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/{spaceSlug}/by-slug`
- **Edition:** Core
- **Controller:** `SpaceController@getBySlug`
- **Route source:** `fluent-community/app/Http/Routes/api.php:10`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- A secret space the caller is neither a member nor an admin of returns exactly the same 404 as a space that does not exist, so its existence cannot be probed by slug.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSpaceBySlug" specUrl="/openapi/public/spaces/get-space-by-slug.json" />
