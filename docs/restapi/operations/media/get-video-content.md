---
title: Get Video Content
description: "Renders the FluentPlayer markup for one media item, including the scoped CSS that applies the portal theme colours to the player."
outline: false
aside: false
---

Renders the FluentPlayer markup for one media item, including the scoped CSS that applies the portal theme colours to the player.

A `media_id` that resolves to a stored media row is access-checked against its parent post, and an empty `html` string comes back when the caller may not view it. An id that matches nothing is treated as an external embed and the player is built from the allowlisted `url`, `title`, `image`, `provider` and `type` query values instead. Returns empty markup when FluentPlayer is not installed.

## Endpoint

- **Method:** `GET`
- **Path:** `/fluent-player/video-content/{media_id}`
- **Edition:** Core
- **Controller:** `MediaController@getFluentPlayerContent`
- **Route source:** `fluent-community/Modules/Integrations/FluentPlayer/Http/player_api.php:14`
- **Controller source:** `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php`

- Failure is signalled by an empty `html` string with a 200 status, not by an HTTP error.
- This route has no logged-in requirement of its own, so on a portal whose access level is public anonymous visitors can call it.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getVideoContent" specUrl="/openapi/public/media/get-video-content.json" />
