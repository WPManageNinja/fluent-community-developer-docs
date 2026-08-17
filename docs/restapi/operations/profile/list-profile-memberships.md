---
title: List Profile Memberships
description: "Returns only the space ids a member actively belongs to — the cheap lookup used to decide what to show on their profile."
outline: false
aside: false
---

Returns only the space ids a member actively belongs to — the cheap lookup used to decide what to show on their profile.

Secret spaces are excluded unless the caller is the profile owner or a community moderator.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/memberships`
- **Edition:** Core
- **Controller:** `ProfileController@getAllMemberships`
- **Route source:** `fluent-community/app/Http/Routes/api.php:92`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Gated by the `user_space_visibility` privacy setting.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listProfileMemberships" specUrl="/openapi/public/profile/list-profile-memberships.json" />
