---
title: Media API
description: Feed media uploads, media preview cleanup, and Fluent Player video upload/content endpoints.
---

# Media API

Feed media uploads, media preview cleanup, and Fluent Player video upload/content endpoints.

## Authentication

Media routes are split across `PortalPolicy` and the Fluent Player integration routes.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `POST` | `/feeds/media-upload` | Core | [Post Handle Media Upload](/restapi/operations/media/post-handle-media-upload) | `FeedsController@handleMediaUpload` |
| `DELETE` | `/feeds/{feed_id}/media-preview` | Core | [Delete Delete Media Preview](/restapi/operations/media/delete-delete-media-preview) | `FeedsController@deleteMediaPreview` |
| `POST` | `/fluent-player/video-upload` | Core | [Upload Video](/restapi/operations/media/upload-video) | `MediaController@uploadVideo` |
| `GET` | `/fluent-player/video-content/{media_id}` | Core | [Get Video Content](/restapi/operations/media/get-video-content) | `MediaController@getFluentPlayerContent` |
