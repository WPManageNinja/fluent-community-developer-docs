---
title: Discover Spaces
description: "Returns the paginated set of spaces the current user could join or already belongs to, each with its active member count."
outline: false
aside: false
---

Returns the paginated set of spaces the current user could join or already belongs to, each with its active member count.

Public and private spaces are always listed; secret spaces appear only where the user holds an active membership. Filter with `search` and `type=joined`; sort with `sort_by` set to `alphabetical` (the default), `latest` or `oldest`. Spaces with `hide_members_count` report zero unless the caller may view their members.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/discover`
- **Edition:** Core
- **Controller:** `SpaceController@discover`
- **Route source:** `fluent-community/app/Http/Routes/api.php:30`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="discoverSpaces" specUrl="/openapi/public/spaces/discover-spaces.json" />
