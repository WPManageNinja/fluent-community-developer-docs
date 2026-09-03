---
title: Media Filters
description: Media filter hooks for FluentCommunity.
---

# Media Filters

22 unique filter hooks currently map to this category, across 33 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/convert_image_to_webp`](#fluent-community-convert-image-to-webp) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:997` |
| [`fluent_community/generated_upload_file_name`](#fluent-community-generated-upload-file-name) | Core | 1 | `fluent-community/app/Services/Libs/FileSystem.php:170` |
| [`fluent_community/handle_remove_bulk_media`](#fluent-community-handle-remove-bulk-media) | Core | 2 | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:134` |
| [`fluent_community/has_inline_image_upload`](#fluent-community-has-inline-image-upload) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:517` |
| [`fluent_community/has_video_embeder`](#fluent-community-has-video-embeder) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:516` |
| [`fluent_community/media_public_url_{this}`](#fluent-community-media-public-url-this) | Core | 1 | `fluent-community/app/Models/Media.php:138` |
| [`fluent_community/media_signed_public_url_{this}`](#fluent-community-media-signed-public-url-this) | Core | 1 | `fluent-community/app/Models/Media.php:143` |
| [`fluent_community/media_upload_data`](#fluent-community-media-upload-data) | Core <span class="edition-note">(also fired by Pro)</span> | 4 | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:262` |
| [`fluent_community/media_upload_max_file_size`](#fluent-community-media-upload-max-file-size) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:943` |
| [`fluent_community/media_upload_max_file_unit`](#fluent-community-media-upload-max-file-unit) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:942` |
| [`fluent_community/media_upload_max_width_{context}`](#fluent-community-media-upload-max-width-context) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:1004` |
| [`fluent_community/media_upload_resize`](#fluent-community-media-upload-resize) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:1001` |
| [`fluent_community/preview_metadata_pre_fetch`](#fluent-community-preview-metadata-pre-fetch) | Core | 1 | `fluent-community/app/Services/RemoteUrlParser.php:184` |
| [`fluent_community/rate_limit/media_upload_per_minute`](#fluent-community-rate-limit-media-upload-per-minute) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:68` |
| [`fluent_community/rate_limit/oembed_per_minute`](#fluent-community-rate-limit-oembed-per-minute) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:81` |
| [`fluent_community/space_document_title_label`](#fluent-community-space-document-title-label) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:58` |
| [`fluent_community/space_media_title_label`](#fluent-community-space-media-title-label) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/MediaGalleryModule.php:31` |
| [`fluent_community/space_media/api_response`](#fluent-community-space-media-api-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Http/MediaGalleryController.php:53` |
| [`fluent_community/space_media/query`](#fluent-community-space-media-query) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Services/MediaGalleryService.php:148` |
| [`fluent_community/space_media/transform_item`](#fluent-community-space-media-transform-item) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Services/MediaGalleryService.php:56` |
| [`fluent_community/support_attachment_types`](#fluent-community-support-attachment-types) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:914` |
| [`fluent_community/upload_folder_name`](#fluent-community-upload-folder-name) | Core | 2 | `fluent-community/app/Services/Libs/FileSystem.php:37` |

<a id="fluent-community-convert-image-to-webp"></a>

## `fluent_community/convert_image_to_webp`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters whether an uploaded image is converted to WebP.

Defaults to true unless the request asked for `disable_convert=yes`. Conversion only actually happens when the image is also being resized and exceeds the width limit — the flag is read inside that branch — so returning `true` does not convert a small image on its own. Two call sites carry this filter, but `UploadHelper::processUpload()` has no callers anywhere in either plugin, so in practice only the media upload endpoint reaches it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$willWebPConvert` | `bool` | Whether conversion is permitted. True unless the request disabled it. |
| 2 | `$file` | `array` | The uploaded file descriptor: `file`, `url`, `type`. |

**Return:** `bool` — `false` keeps the original format.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:997` | `$willWebPConvert` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:86` | `$willWebPConvert` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/convert_image_to_webp', function ($willWebPConvert, $file) {
    return $willWebPConvert;
}, 10, 2);
```

**Related:** [`fluent_community/media_upload_resize`](#fluent-community-media-upload-resize) · [`fluent_community/media_upload_max_width_{context}`](#fluent-community-media-upload-max-width-context)

<a id="fluent-community-generated-upload-file-name"></a>

## `fluent_community/generated_upload_file_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the randomised filename given to an upload before it is written to disk.

The default is the original name prefixed with `fluentcom-`, 32 random characters, and `-fluentcom-`. That sandwich is not decorative: the surrounding code relies on it to recover the original name, so removing the markers breaks download filenames. The second argument gives you the pre-prefix name. Applied to every FluentCommunity upload, including avatars, covers and lesson documents.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$name` | `string` | The prefixed filename. |
| 2 | `$originalName` | `string` | The filename as submitted by the client. |
| 3 | `$file` | `array` | The full file descriptor being uploaded. |

**Return:** `string` — the filename to write. It is not re-sanitised, so escape path separators yourself.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:170` | `$file['name']` (array)<br>`$originalName` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/generated_upload_file_name', function ($name, $originalName, $file) {
    return $name;
}, 10, 3);
```

<a id="fluent-community-handle-remove-bulk-media"></a>

## `fluent_community/handle_remove_bulk_media`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Lets a storage driver take over deletion of a whole collection of media rows.

Applied at two points in the cleanup handler — the queue path, which unlinks local files and merely deactivates remote ones, and the hard-delete path, which removes every row. Returning `true` short-circuits both, so your callback becomes solely responsible for deleting the rows and the underlying files; nothing else runs afterwards. It is only reached for collections, never for a single media model, and never for an empty collection.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$handled` | `bool` | Whether deletion has been taken over. `false` by default. |
| 2 | `$media` | `\FluentCommunity\Framework\Database\Orm\Collection` | The media rows to remove. |

**Return:** `bool` — `true` to suppress the built-in deletion entirely.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:134` | `false` (bool)<br>`$media` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:167` | `false` (bool)<br>`$media` (mixed) |

### Example

```php
add_filter('fluent_community/handle_remove_bulk_media', function ($handled, $media) {
    return $handled;
}, 10, 2);
```

**Related:** [`fluent_community/delete_remote_media_{this}`](/hooks/actions/media#fluent-community-delete-remote-media-this) · [`fluent_community/comment/media_deleted`](/hooks/actions/comments#fluent-community-comment-media-deleted)

<a id="fluent-community-has-inline-image-upload"></a>

## `fluent_community/has_inline_image_upload`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether images can be uploaded inline from within the editor toolbar.

A string flag, not a boolean: it surfaces as `features.has_inline_image_upload` and the Vue app compares it strictly against `'yes'`, so returning `true` disables the feature just as effectively as returning `'no'`. It controls the in-editor upload affordance only; the separate attachment control governed by `fluent_community/max_media_per_post` is unaffected.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$hasInlineImageUpload` | `string` | `yes` to allow inline uploads, anything else to disable. `yes` by default. |

**Return:** `string` — return the literal string `'yes'` to keep the feature on.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:517` | `'yes'` (string) |

### Example

```php
add_filter('fluent_community/has_inline_image_upload', function ($hasInlineImageUpload) {
    return $hasInlineImageUpload;
}, 10, 1);
```

**Related:** [`fluent_community/max_media_per_post`](/hooks/filters/feeds#fluent-community-max-media-per-post)

<a id="fluent-community-has-video-embeder"></a>

## `fluent_community/has_video_embeder`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the video embed control appears in the post composer.

Surfaces as `features.video_embeder` in `portal_vars` and defaults to `true`. The Vue app tests it for truthiness only, so return the boolean `false` to hide the control — the string `'no'` is truthy and will leave it visible. The control is additionally gated on the composer's own `videoApp` config, so it only ever appears in the create-post composer, and hiding it does not block video embeds submitted through the API.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$hasVideoEmbeder` | `bool` | Whether the embed control is offered, `true` by default. |

**Return:** `bool` — return a falsy value, ideally `false`, to hide the control.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:516` | `true` (bool) |

### Example

```php
add_filter('fluent_community/has_video_embeder', function ($hasVideoEmbeder) {
    return $hasVideoEmbeder;
}, 10, 1);
```

**Related:** [`fluent_community/portal_vars`](/hooks/filters/rendering#fluent-community-portal-vars) · [`fluent_community/has_inline_image_upload`](#fluent-community-has-inline-image-upload)

<a id="fluent-community-media-public-url-this"></a>

## `fluent_community/media_public_url_{this}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the public URL of a media item, named after its storage driver.

The suffix is `$media->driver`, giving `fluent_community/media_public_url_local` and `fluent_community/media_public_url_s3`. It backs the `public_url` accessor, so it runs every time a media URL is read — several times per post in a feed listing — and must stay free of network calls and queries. Nothing in either plugin registers on it by default; the signed variant is the one Pro cloud storage uses.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$mediaUrl` | `string` | The stored URL. |
| 2 | `$media` | `\FluentCommunity\App\Models\Media` | The media row. |

**Return:** `string` — an absolute URL.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:138` | `$this->media_url` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/media_public_url_{this}', function ($mediaUrl, $media) {
    return $mediaUrl;
}, 10, 2);
```

**Related:** [`fluent_community/media_signed_public_url_{this}`](#fluent-community-media-signed-public-url-this)

<a id="fluent-community-media-signed-public-url-this"></a>

## `fluent_community/media_signed_public_url_{this}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the time-limited URL of a media item, named after its storage driver.

The suffix is `$media->driver`; Pro's cloud storage registers `fluent_community/media_signed_public_url_s3` to mint a pre-signed S3 URL. Unlike the plain public URL this is only requested where a temporary link is wanted, such as document downloads. The default expiry is an hour and arrives as the third argument in seconds; with no handler the unsigned stored URL is returned unchanged, which means no expiry at all.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$mediaUrl` | `string` | The stored URL. |
| 2 | `$media` | `\FluentCommunity\App\Models\Media` | The media row. |
| 3 | `$time` | `int` | Requested validity in seconds, 3600 by default. |

**Return:** `string` — an absolute URL.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:143` | `$this->media_url` (mixed)<br>`$this` (mixed)<br>`$time` (mixed) |

### Example

```php
add_filter('fluent_community/media_signed_public_url_{this}', function ($mediaUrl, $media, $time) {
    return $mediaUrl;
}, 10, 3);
```

**Related:** [`fluent_community/media_public_url_{this}`](#fluent-community-media-public-url-this)

<a id="fluent-community-media-upload-data"></a>

## `fluent_community/media_upload_data`

- **Type:** filter
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 4
- **When it fires:** Filters the attributes used to create a media row just before it is written.

The last point at which an upload can be redirected or rejected — Pro's Cloud Storage module rewrites `driver`, `media_path` and `media_url` here to push the file offsite. Returning a `WP_Error` surfaces its message to the uploader, and returning anything falsy aborts the upload with a generic error, so this doubles as an upload veto. It is applied by four separate upload endpoints (feed media, generic uploads, FluentPlayer and Pro documents), which all pass the same shape.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$mediaData` | `array` | Attributes for the new media row: `media_type`, `driver`, `media_path`, `media_url`, `settings`. |
| 2 | `$file` | `array` | The processed upload, including `path`, `url`, `type` and a `meta` array of image dimensions. |

**Return:** `array` — the attributes to create the media row with. Return a `WP_Error` to reject the upload with a message, or a falsy value to reject it generically.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:262` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1097` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:188` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:101` | `$mediaData` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_data', function ($mediaData, $file) {
    return $mediaData;
}, 10, 2);
```

**Related:** [`fluent_community/support_attachment_types`](#fluent-community-support-attachment-types) · [`fluent_community/upload_folder_name`](#fluent-community-upload-folder-name)

<a id="fluent-community-media-upload-max-file-size"></a>

## `fluent_community/media_upload_max_file_size`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the numeric part of the upload size limit.

Paired with `fluent_community/media_upload_max_file_unit`, which supplies `MB` or `GB`; the two are multiplied into a kilobyte figure for the validator, so changing one without the other silently rescales the limit. The default is 100 at the media upload endpoint. A second call site in `UploadHelper::processUpload()` passes a caller-supplied default of 10, but that method has no callers in either plugin. This is only FluentCommunity's own check — the PHP and server upload limits still apply first.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxFileSize` | `int` | The size number, 100 at the live call site. |

**Return:** `int` — the size, interpreted in the unit returned by `fluent_community/media_upload_max_file_unit`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:943` | `100` (int) |
| Core | `fluent-community/app/Services/UploadHelper.php:40` | `$options['max_size']` (array) |

### Example

```php
add_filter('fluent_community/media_upload_max_file_size', function ($maxFileSize) {
    return $maxFileSize;
}, 10, 1);
```

**Related:** [`fluent_community/media_upload_max_file_unit`](#fluent-community-media-upload-max-file-unit)

<a id="fluent-community-media-upload-max-file-unit"></a>

## `fluent_community/media_upload_max_file_unit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the unit the upload size limit is expressed in.

Compared case-insensitively against `MB` and `GB`; anything else is treated as kilobytes, since the size is passed to the validator unmultiplied. The returned string is also interpolated into the error message shown to the member, so it should stay short. Defaults to `MB` at the live call site.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxFileUnit` | `string` | `MB` by default. |

**Return:** `string` — `MB`, `GB`, or any other value to have the size read as kilobytes.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:942` | `'MB'` (string) |
| Core | `fluent-community/app/Services/UploadHelper.php:39` | `$options['size_unit']` (array) |

### Example

```php
add_filter('fluent_community/media_upload_max_file_unit', function ($maxFileUnit) {
    return $maxFileUnit;
}, 10, 1);
```

**Related:** [`fluent_community/media_upload_max_file_size`](#fluent-community-media-upload-max-file-size)

<a id="fluent-community-media-upload-max-width-context"></a>

## `fluent_community/media_upload_max_width_{context}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the maximum width an uploaded image is resized to, scoped to the upload context.

The suffix is the `context` sent with the upload request — the portal uses values such as `avatar`, `cover_photo` and `feed` — and the filter is skipped entirely when no context is supplied. It only takes effect when resizing is on and the source image is genuinely wider than the returned value; a width of 0 disables resizing for that context. Resized images are re-saved at quality 90.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxWidth` | `int` | The width from the request, often empty. |
| 2 | `$file` | `array` | The uploaded file descriptor. |

**Return:** `int` — the maximum width in pixels. 0 or a falsy value skips resizing.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1004` | `$maxWidth` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:93` | `$maxWidth` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_max_width_{context}', function ($maxWidth, $file) {
    return $maxWidth;
}, 10, 2);
```

**Related:** [`fluent_community/media_upload_resize`](#fluent-community-media-upload-resize) · [`fluent_community/convert_image_to_webp`](#fluent-community-convert-image-to-webp)

<a id="fluent-community-media-upload-resize"></a>

## `fluent_community/media_upload_resize`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters whether an uploaded image is resized at all.

The two call sites disagree on the default, which is worth knowing before you write a callback. At the media upload endpoint the incoming value is the request's raw `resize` parameter, so it is falsy unless the client asked for resizing; in `UploadHelper::processUpload()` it is the inverse of the `resize` option, so it is true by default — but that method has no callers in either plugin. Resizing also requires a non-zero max width, and WebP conversion only happens as part of a resize.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$willResize` | `mixed` | The request's `resize` value at the live call site; not cast to bool. |
| 2 | `$file` | `array` | The uploaded file descriptor. |

**Return:** Truthy to permit resizing. The value is only tested for truthiness, so a non-empty string works.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1001` | `$willResize` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:90` | `$willResize` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_resize', function ($willResize, $file) {
    return $willResize;
}, 10, 2);
```

**Related:** [`fluent_community/media_upload_max_width_{context}`](#fluent-community-media-upload-max-width-context) · [`fluent_community/convert_image_to_webp`](#fluent-community-convert-image-to-webp)

<a id="fluent-community-preview-metadata-pre-fetch"></a>

## `fluent_community/preview_metadata_pre_fetch`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lets a callback supply link-preview metadata instead of fetching the remote page.

Returning an array short-circuits the HTTP request entirely, and the value is written into the same object-cache entry the real fetch would have populated, for an hour by default. Only arrays are honoured: anything else, including a `WP_Error`, is ignored and the fetch proceeds. Use the same shape the parser produces — `title`, `image`, `description`, `icon`, `type`, `url` — since it is stored verbatim as the post's `meta.media_preview`. The cache is checked before this filter, so it does not run for a URL already cached.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$preempted` | `mixed` | `null` by default. |
| 2 | `$url` | `string` | The URL being previewed, with any trailing slash removed. |

**Return:** An `array` of metadata to bypass the remote fetch, or `null` to let it proceed. Non-array values are ignored.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/RemoteUrlParser.php:184` | `null` (mixed)<br>`$url` (mixed) |

### Example

```php
add_filter('fluent_community/preview_metadata_pre_fetch', function ($preempted, $url) {
    return $preempted;
}, 10, 2);
```

**Related:** [`fluent_community/feed_oembed_api_response`](/hooks/filters/feeds#fluent-community-feed-oembed-api-response)

<a id="fluent-community-rate-limit-media-upload-per-minute"></a>

## `fluent_community/rate_limit/media_upload_per_minute`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how many files a member may upload in a rolling one-minute window.

Defaults to 10. The comparison is `count > limit` over media rows created in the last 60 seconds, so the effective allowance is one more than the number returned. It counts media rows rather than requests, and inactive draft uploads count too. Site administrators are exempt before the filter is consulted, and exceeding the limit throws rather than returning a structured error.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$limitPerMinute` | `int` | Uploads allowed per rolling minute, 10 by default. |

**Return:** `int` — the limit.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:68` | `10` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/media_upload_per_minute', function ($limitPerMinute) {
    return $limitPerMinute;
}, 10, 1);
```

**Related:** [`fluent_community/check_rate_limit/media_upload`](/hooks/actions/media#fluent-community-check-rate-limit-media-upload) · [`fluent_community/rate_limit/posts_per_5_minutes`](/hooks/filters/feeds#fluent-community-rate-limit-posts-per-5-minutes)

<a id="fluent-community-rate-limit-oembed-per-minute"></a>

## `fluent_community/rate_limit/oembed_per_minute`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:81` | `20` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/oembed_per_minute', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-space-document-title-label"></a>

## `fluent_community/space_document_title_label`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the "Documents" label in a space's header navigation.

Only reached for spaces whose permissions grant can_view_documents, i.e. where the space has document_library enabled. It renames the menu entry only — the route name and the API paths are unaffected.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$label` | `string` | Menu label, "Documents" by default. |
| 2 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space the header is being built for. |

**Return:** The menu label string.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:58` | `__('Documents', 'fluent-community-pro')` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space_document_title_label', function ($label, $space) {
    return $label;
}, 10, 2);
```

**Related:** [`fluent_community/space_media_title_label`](#fluent-community-space-media-title-label)

<a id="fluent-community-space-media-title-label"></a>

## `fluent_community/space_media_title_label`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the "Media" label in a space's header navigation.

Only reached for spaces whose permissions grant can_view_media, i.e. where the space has media_gallery enabled. It renames the menu entry only — the route name and the API path are unaffected. The media entry is added at priority 0, ahead of the documents entry at priority 1.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$label` | `string` | Menu label, "Media" by default. |
| 2 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space the header is being built for. |

**Return:** The menu label string.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/MediaGallery/MediaGalleryModule.php:31` | `__('Media', 'fluent-community-pro')` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space_media_title_label', function ($label, $space) {
    return $label;
}, 10, 2);
```

**Related:** [`fluent_community/space_document_title_label`](#fluent-community-space-document-title-label)

<a id="fluent-community-space-media-api-response"></a>

## `fluent_community/space_media/api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the media-gallery API response.

The payload always carries items, has_more and cursor; has_audio is present only on the first page (no cursor), because the audio tab visibility is resolved once rather than per page. Fires after fluent_community/space_media/viewed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Response payload: items, has_more, cursor, and has_audio on the first page. |
| 2 | `$space` | `\FluentCommunity\App\Models\Space` | The space whose gallery was listed. |
| 3 | `$type` | `string` | One of photos, videos, audios. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/MediaGallery/Http/MediaGalleryController.php:53` | `$response` (mixed)<br>`$space` (Space)<br>`$type` (mixed) |

### Example

```php
add_filter('fluent_community/space_media/api_response', function ($response, $space, $type) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/space_media/query`](#fluent-community-space-media-query) · [`fluent_community/space_media/viewed`](/hooks/actions/media#fluent-community-space-media-viewed)

<a id="fluent-community-space-media-query"></a>

## `fluent_community/space_media/query`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the media-gallery query builder before it is paged.

Runs after the type filter has been applied — images for "photos", fluent_player media split by an audio token in settings for "videos" and "audios" — and before the cursor and per-page limits. This is the hook for adding constraints or eager loads; returning anything that is not a query builder will break the endpoint.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$query` | `\FluentCommunity\Framework\Database\Orm\Builder` | The Media query for this space and tab. |
| 2 | `$space` | `\FluentCommunity\App\Models\Space` | The space whose gallery is being listed. |
| 3 | `$type` | `string` | One of photos, videos, audios. |

**Return:** The query builder.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/MediaGallery/Services/MediaGalleryService.php:148` | `$query` (mixed)<br>`$space` (Space)<br>`$type` (mixed) |

### Example

```php
add_filter('fluent_community/space_media/query', function ($query, $space, $type) {
    return $query;
}, 10, 3);
```

**Related:** [`fluent_community/space_media/api_response`](#fluent-community-space-media-api-response)

<a id="fluent-community-space-media-transform-item"></a>

## `fluent_community/space_media/transform_item`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters one media item as it is shaped into the gallery API structure.

Runs once per row on every page of the gallery, so keep callbacks cheap and avoid per-item queries — the feed and its author are already eager-loaded on the model. The `kind` key is the gallery's own classification (image / video / audio) and is not the raw mime type, which is carried separately as media_type. `feed` is null for media not attached to a post.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$item` | `array` | The item payload: id, url, media_type, kind, settings, created_at, feed. |
| 2 | `$media` | `\FluentCommunity\App\Models\Media` | The underlying media row. |
| 3 | `$space` | `\FluentCommunity\App\Models\Space` | The space whose gallery is being listed. |

**Return:** The item payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/MediaGallery/Services/MediaGalleryService.php:56` | `array (7 keys: id, url, media_type, …)` (array)<br>`$m` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space_media/transform_item', function ($item, $media, $space) {
    return $item;
}, 10, 3);
```

**Related:** [`fluent_community/space_media/query`](#fluent-community-space-media-query) · [`fluent_community/space_media/api_response`](#fluent-community-space-media-api-response)

<a id="fluent-community-support-attachment-types"></a>

## `fluent_community/support_attachment_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the MIME types accepted by FluentCommunity's image upload endpoints.

Applied at two upload entry points whose defaults are not identical: `FeedsController::handleMediaUpload()` includes `image/heic` while `UploadHelper::uploadFiles()` does not, so a callback that rebuilds the array instead of appending will silently change behaviour on one path. The list is also mined for extensions eligible for WebP conversion, so adding a non-image MIME type here has effects beyond validation.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$mimeTypes` | `array` | Accepted MIME type strings, image types only by default. |

**Return:** `array` — MIME type strings. They are joined into the validator's `mimetypes` rule, so return a flat, non-associative array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:914` | `array (6 items)` (array) |
| Core | `fluent-community/app/Services/UploadHelper.php:28` | `array (7 items)` (array) |

### Example

```php
add_filter('fluent_community/support_attachment_types', function ($mimeTypes) {
    return $mimeTypes;
}, 10, 1);
```

**Related:** [`fluent_community/media_upload_data`](#fluent-community-media-upload-data)

<a id="fluent-community-upload-folder-name"></a>

## `fluent_community/upload_folder_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the folder, relative to the WordPress uploads base directory, that FluentCommunity writes media into.

Defaults to the `FLUENT_COMMUNITY_UPLOAD_DIR` constant and is applied in two places that must agree — the directory resolver and the custom upload-dir override — so filter it unconditionally rather than for one code path. On first use the directory is created with a hardening `.htaccess` and an `index.php`; a folder you point at that already exists will not get those files. Pro's Document Library filters it temporarily to redirect document uploads.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$folderName` | `string` | Path fragment appended to the uploads base directory, with a leading slash. |

**Return:** `string` — the folder path fragment. Existing media is not migrated, so changing it orphans previously uploaded files.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:37` | `FLUENT_COMMUNITY_UPLOAD_DIR` (mixed) |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:137` | `FLUENT_COMMUNITY_UPLOAD_DIR` (mixed) |

### Example

```php
add_filter('fluent_community/upload_folder_name', function ($folderName) {
    return $folderName;
}, 10, 1);
```

