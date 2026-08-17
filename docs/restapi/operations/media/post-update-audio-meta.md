---
title: Post Update Audio Meta
description: "Updates the display title and poster thumbnail stored on an uploaded audio media item."
outline: false
aside: false
---

Updates the display title and poster thumbnail stored on an uploaded audio media item.

Sending an empty `posterSrc` clears the custom poster and returns the player to its default no-thumbnail layout. Media that is not FluentPlayer audio is rejected with a 422.

## Endpoint

- **Method:** `POST`
- **Path:** `/fluent-player/audio-media/{media_id}`
- **Edition:** Core
- **Controller:** `MediaController@updateAudioMeta`
- **Route source:** `fluent-community/Modules/Integrations/FluentPlayer/Http/player_api.php:15`
- **Controller source:** `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php`

- The route only requires a signed-in user; ownership is enforced in the controller, so only the uploader, a community moderator or a community admin may edit.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="postUpdateAudioMeta" specUrl="/openapi/public/media/post-update-audio-meta.json" />
