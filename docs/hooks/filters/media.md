---
title: Media Filters
description: Media filter hooks for FluentCommunity.
---

# Media Filters

21 unique filter hooks currently map to this category, across 32 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/convert_image_to_webp`](#fluent-community-convert-image-to-webp) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:949` |
| [`fluent_community/generated_upload_file_name`](#fluent-community-generated-upload-file-name) | Core | 1 | `fluent-community/app/Services/Libs/FileSystem.php:169` |
| [`fluent_community/handle_remove_bulk_media`](#fluent-community-handle-remove-bulk-media) | Core | 2 | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:134` |
| [`fluent_community/has_inline_image_upload`](#fluent-community-has-inline-image-upload) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:517` |
| [`fluent_community/has_video_embeder`](#fluent-community-has-video-embeder) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:516` |
| [`fluent_community/media_public_url_{this}`](#fluent-community-media-public-url-this) | Core | 1 | `fluent-community/app/Models/Media.php:138` |
| [`fluent_community/media_signed_public_url_{this}`](#fluent-community-media-signed-public-url-this) | Core | 1 | `fluent-community/app/Models/Media.php:143` |
| [`fluent_community/media_upload_data`](#fluent-community-media-upload-data) | Core <span class="edition-note">(also fired by Pro)</span> | 4 | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:262` |
| [`fluent_community/media_upload_max_file_size`](#fluent-community-media-upload-max-file-size) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:909` |
| [`fluent_community/media_upload_max_file_unit`](#fluent-community-media-upload-max-file-unit) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:908` |
| [`fluent_community/media_upload_max_width_{context}`](#fluent-community-media-upload-max-width-context) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:956` |
| [`fluent_community/media_upload_resize`](#fluent-community-media-upload-resize) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:953` |
| [`fluent_community/preview_metadata_pre_fetch`](#fluent-community-preview-metadata-pre-fetch) | Core | 1 | `fluent-community/app/Services/RemoteUrlParser.php:184` |
| [`fluent_community/rate_limit/media_upload_per_minute`](#fluent-community-rate-limit-media-upload-per-minute) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:67` |
| [`fluent_community/space_document_title_label`](#fluent-community-space-document-title-label) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:58` |
| [`fluent_community/space_media_title_label`](#fluent-community-space-media-title-label) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/MediaGalleryModule.php:31` |
| [`fluent_community/space_media/api_response`](#fluent-community-space-media-api-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Http/MediaGalleryController.php:53` |
| [`fluent_community/space_media/query`](#fluent-community-space-media-query) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Services/MediaGalleryService.php:148` |
| [`fluent_community/space_media/transform_item`](#fluent-community-space-media-transform-item) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Services/MediaGalleryService.php:56` |
| [`fluent_community/support_attachment_types`](#fluent-community-support-attachment-types) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:880` |
| [`fluent_community/upload_folder_name`](#fluent-community-upload-folder-name) | Core | 2 | `fluent-community/app/Services/Libs/FileSystem.php:37` |

<a id="fluent-community-convert-image-to-webp"></a>

## `fluent_community/convert_image_to_webp`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:949` | `$willWebPConvert` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:80` | `$willWebPConvert` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/convert_image_to_webp', function ($willWebPConvert, $file) {
    return $willWebPConvert;
}, 10, 2);
```

<a id="fluent-community-generated-upload-file-name"></a>

## `fluent_community/generated_upload_file_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:169` | `$file['name']` (array)<br>`$originalName` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/generated_upload_file_name', function ($file, $originalName, $file_3) {
    return $file;
}, 10, 3);
```

<a id="fluent-community-handle-remove-bulk-media"></a>

## `fluent_community/handle_remove_bulk_media`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:134` | `false` (bool)<br>`$media` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:167` | `false` (bool)<br>`$media` (mixed) |

### Example

```php
add_filter('fluent_community/handle_remove_bulk_media', function ($param1, $media) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-has-inline-image-upload"></a>

## `fluent_community/has_inline_image_upload`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:517` | `'yes'` (string) |

### Example

```php
add_filter('fluent_community/has_inline_image_upload', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-has-video-embeder"></a>

## `fluent_community/has_video_embeder`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:516` | `true` (bool) |

### Example

```php
add_filter('fluent_community/has_video_embeder', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-media-public-url-this"></a>

## `fluent_community/media_public_url_{this}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:138` | `$this->media_url` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/media_public_url_{this}', function ($media_url, $param2) {
    return $media_url;
}, 10, 2);
```

<a id="fluent-community-media-signed-public-url-this"></a>

## `fluent_community/media_signed_public_url_{this}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:143` | `$this->media_url` (mixed)<br>`$this` (mixed)<br>`$time` (mixed) |

### Example

```php
add_filter('fluent_community/media_signed_public_url_{this}', function ($media_url, $param2, $time) {
    return $media_url;
}, 10, 3);
```

<a id="fluent-community-media-upload-data"></a>

## `fluent_community/media_upload_data`

- **Type:** filter
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 4

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:262` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1049` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:182` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:101` | `$mediaData` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_data', function ($mediaData, $file) {
    return $mediaData;
}, 10, 2);
```

<a id="fluent-community-media-upload-max-file-size"></a>

## `fluent_community/media_upload_max_file_size`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:909` | `100` (int) |
| Core | `fluent-community/app/Services/UploadHelper.php:40` | `$options['max_size']` (array) |

### Example

```php
add_filter('fluent_community/media_upload_max_file_size', function ($options) {
    return $options;
}, 10, 1);
```

<a id="fluent-community-media-upload-max-file-unit"></a>

## `fluent_community/media_upload_max_file_unit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:908` | `'MB'` (string) |
| Core | `fluent-community/app/Services/UploadHelper.php:39` | `$options['size_unit']` (array) |

### Example

```php
add_filter('fluent_community/media_upload_max_file_unit', function ($options) {
    return $options;
}, 10, 1);
```

<a id="fluent-community-media-upload-max-width-context"></a>

## `fluent_community/media_upload_max_width_{context}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:956` | `$maxWidth` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:87` | `$maxWidth` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_max_width_{context}', function ($maxWidth, $file) {
    return $maxWidth;
}, 10, 2);
```

<a id="fluent-community-media-upload-resize"></a>

## `fluent_community/media_upload_resize`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:953` | `$willResize` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:84` | `$willResize` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_resize', function ($willResize, $file) {
    return $willResize;
}, 10, 2);
```

<a id="fluent-community-preview-metadata-pre-fetch"></a>

## `fluent_community/preview_metadata_pre_fetch`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/RemoteUrlParser.php:184` | `null` (mixed)<br>`$url` (mixed) |

### Example

```php
add_filter('fluent_community/preview_metadata_pre_fetch', function ($param1, $url) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-rate-limit-media-upload-per-minute"></a>

## `fluent_community/rate_limit/media_upload_per_minute`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:67` | `10` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/media_upload_per_minute', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-space-document-title-label"></a>

## `fluent_community/space_document_title_label`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:58` | `__('Documents', 'fluent-community-pro')` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space_document_title_label', function ($param1, $space) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-space-media-title-label"></a>

## `fluent_community/space_media_title_label`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/MediaGallery/MediaGalleryModule.php:31` | `__('Media', 'fluent-community-pro')` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space_media_title_label', function ($param1, $space) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-space-media-api-response"></a>

## `fluent_community/space_media/api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

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

<a id="fluent-community-space-media-query"></a>

## `fluent_community/space_media/query`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

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

<a id="fluent-community-space-media-transform-item"></a>

## `fluent_community/space_media/transform_item`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/MediaGallery/Services/MediaGalleryService.php:56` | `array (7 keys: id, url, media_type, …)` (array)<br>`$m` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space_media/transform_item', function ($id, $m, $space) {
    return $id;
}, 10, 3);
```

<a id="fluent-community-support-attachment-types"></a>

## `fluent_community/support_attachment_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:880` | `array (6 items)` (array) |
| Core | `fluent-community/app/Services/UploadHelper.php:28` | `array (7 items)` (array) |

### Example

```php
add_filter('fluent_community/support_attachment_types', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-upload-folder-name"></a>

## `fluent_community/upload_folder_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:37` | `FLUENT_COMMUNITY_UPLOAD_DIR` (mixed) |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:136` | `FLUENT_COMMUNITY_UPLOAD_DIR` (mixed) |

### Example

```php
add_filter('fluent_community/upload_folder_name', function ($param1) {
    return $param1;
}, 10, 1);
```

