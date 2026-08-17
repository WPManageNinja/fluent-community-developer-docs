---
title: Media API
description: Feed media uploads, media preview cleanup, and Fluent Player video upload/content endpoints.
---

# Media API

Feed media uploads, media preview cleanup, and Fluent Player video upload/content endpoints.

## Authentication

Media routes are split across `PortalPolicy` and the Fluent Player integration routes.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `POST` | `/feeds/media-upload` | Core | [Post Handle Media Upload](/restapi/operations/media/post-handle-media-upload) | Uploads an image for use in a post or comment, optionally resizing and converting it to WebP, and returns the media URL and key. |
| `DELETE` | `/feeds/{feed_id}/media-preview` | Core | [Delete Media Preview](/restapi/operations/media/delete-media-preview) | Clears the link preview image stored on a post, leaving the rest of the post untouched. |
| `POST` | `/fluent-player/video-upload` | Core | [Upload Video](/restapi/operations/media/upload-video) | Uploads a video or audio file for FluentPlayer playback and returns the media record with the settings the player needs. |
| `GET` | `/fluent-player/video-content/{media_id}` | Core | [Get Video Content](/restapi/operations/media/get-video-content) | Renders the FluentPlayer markup for one media item, including the scoped CSS that applies the portal theme colours to the player. |
| `POST` | `/fluent-player/audio-media/{media_id}` | Core | [Post Update Audio Meta](/restapi/operations/media/post-update-audio-meta) | Updates the display title and poster thumbnail stored on an uploaded audio media item. |
| `GET` | `/media-gallery/{spaceSlug}` | <span class="pro-badge">PRO</span> | [Get Index](/restapi/operations/media/get-index) | Returns a cursor-paginated page of the photos, videos or audio shared in one space, each item carrying the post and author it came from. |
