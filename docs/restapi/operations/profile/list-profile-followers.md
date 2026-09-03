---
title: List Profile Followers
description: "Returns the paginated list of members following this profile, each annotated with whether the current user follows them back."
outline: false
aside: false
---

Returns the paginated list of members following this profile, each annotated with whether the current user follows them back.

Filter with `search` over display name and username; pass `sort_by=alphabetical` for name order, otherwise newest first. Blocked relationships are excluded.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/followers`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@getFollowers`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:131`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.
- Visibility is governed by the followers privacy settings, so a restricted profile returns an error.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listProfileFollowers" specUrl="/openapi/public/profile/list-profile-followers.json" />
