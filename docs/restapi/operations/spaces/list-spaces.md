---
title: List Spaces
description: "Returns every space the current user has a membership row for, in alphabetical order, without pagination."
outline: false
aside: false
---

Returns every space the current user has a membership row for, in alphabetical order, without pagination.

The membership status is not checked, so a space the user has only requested to join is included alongside the ones they are active in. This is the lightweight lookup used to decide where a member may post; use the discovery endpoint for a browsable list.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces`
- **Edition:** Core
- **Controller:** `SpaceController@get`
- **Route source:** `fluent-community/app/Http/Routes/api.php:8`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listSpaces" specUrl="/openapi/public/spaces/list-spaces.json" />
