---
title: List Profile Spaces
description: "Returns the spaces a member actively belongs to, each with its member count."
outline: false
aside: false
---

Returns the spaces a member actively belongs to, each with its member count.

Secret spaces are only included when the caller is the profile owner or a community moderator. Spaces with `hide_members_count` report zero unless the caller may view their members.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/spaces`
- **Edition:** Core
- **Controller:** `ProfileController@getSpaces`
- **Route source:** `fluent-community/app/Http/Routes/api.php:90`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Gated by the `user_space_visibility` privacy setting; failure comes back carrying `permission_failed`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listProfileSpaces" specUrl="/openapi/public/profile/list-profile-spaces.json" />
