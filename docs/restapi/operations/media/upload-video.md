---
title: Upload Video
description: "Uploads a video or audio file for FluentPlayer playback and returns the media record with the settings the player needs."
outline: false
aside: false
---

Uploads a video or audio file for FluentPlayer playback and returns the media record with the settings the player needs.

Send `media_kind` as `video` or `audio`; audio uploads additionally require the `enable_audio` player setting. The size limit is 300 MB by default and adjustable by filter, and the accepted MIME types come from the FluentPlayer settings.

## Endpoint

- **Method:** `POST`
- **Path:** `/fluent-player/video-upload`
- **Edition:** Core
- **Controller:** `MediaController@uploadVideo`
- **Route source:** `fluent-community/Modules/Integrations/FluentPlayer/Http/player_api.php:13`
- **Controller source:** `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php`

- Requires a signed-in user, the FluentPlayer plugin to be active, and the `video_upload` player setting to be on.
- Who may upload is governed by the `video_upload_role` player setting — community admins only, admins and moderators, or everyone.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="uploadVideo" specUrl="/openapi/public/media/upload-video.json" />
