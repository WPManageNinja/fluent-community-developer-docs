---
title: Search Space Users
description: "Searches for WordPress users who are not yet members of a space, for the add-member picker."
outline: false
aside: false
---

Searches for WordPress users who are not yet members of a space, for the add-member picker.

`space_id` is required and must reference a real space. The search is limited to 100 candidates. Email addresses are only included for community moderators who also hold the WordPress `list_users` capability. On multisite the search is restricted to users with capabilities on the current site.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/users/search`
- **Edition:** Core
- **Controller:** `SpaceController@getOtherUsers`
- **Route source:** `fluent-community/app/Http/Routes/api.php:29`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires the `can_add_member` permission in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="searchSpaceUsers" specUrl="/openapi/public/spaces/search-space-users.json" />
