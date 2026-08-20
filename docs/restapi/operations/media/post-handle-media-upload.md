---
title: Post Handle Media Upload
description: "Uploads an image for use in a post or comment, optionally resizing and converting it to WebP, and returns the media URL and key."
outline: false
aside: false
---

Uploads an image for use in a post or comment, optionally resizing and converting it to WebP, and returns the media URL and key.

Accepts JPEG, PNG, GIF, WebP and HEIC by default, up to 100 MB, both adjustable by filter. Conversion to WebP happens unless `disable_convert=yes` is sent, and passing `resize` with `max_width` downscales oversized images first. The returned `media_key` is what identifies the upload when it is later attached to a post or comment.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/media-upload`
- **Edition:** Core
- **Controller:** `FeedsController@handleMediaUpload`
- **Route source:** `fluent-community/app/Http/Routes/api.php:46`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Requires a signed-in user; uploads are rate limited through the `fluent_community/check_rate_limit/media_upload` hook.
- Uploaded media starts inactive and is deleted by the cleanup cron if it is never attached to anything.
- HEIC uploads fail unless the server has Imagick built with HEIC support.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="postHandleMediaUpload" specUrl="/openapi/public/media/post-handle-media-upload.json" />
