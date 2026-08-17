---
title: Get Comments
description: "Returns a paginated list of the comments one member has written, each with the full parent post eager-loaded so the post can open without a second request."
outline: false
aside: false
---

Returns a paginated list of the comments one member has written, each with the full parent post eager-loaded so the post can open without a second request.

Despite living under the comments group this is a profile endpoint, addressed by `{username}`. Viewing another member list is restricted to posts that member can see and to plain text posts; the profile owner and community moderators see everything.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/comments`
- **Edition:** Core
- **Controller:** `ProfileController@getComments`
- **Route source:** `fluent-community/app/Http/Routes/api.php:93`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getComments" specUrl="/openapi/public/comments/get-comments.json" />
