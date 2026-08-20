---
title: List All Spaces
description: "Returns the paginated list of spaces with each one formatted for display, including the current user permissions and membership within it."
outline: false
aside: false
---

Returns the paginated list of spaces with each one formatted for display, including the current user permissions and membership within it.

Community moderators receive every space; everyone else sees public and private spaces plus any secret space they actively belong to. Heavier than the discovery endpoint because every space is run through the full formatter.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/all-spaces`
- **Edition:** Core
- **Controller:** `SpaceController@getAllSpaces`
- **Route source:** `fluent-community/app/Http/Routes/api.php:31`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listAllSpaces" specUrl="/openapi/public/spaces/list-all-spaces.json" />
