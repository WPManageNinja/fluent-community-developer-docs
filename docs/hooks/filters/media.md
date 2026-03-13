---
title: Media Filters
description: Media filter hooks for FluentCommunity.
---

# Media Filters

13 unique filter hooks currently map to this category, across 22 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/generated_upload_file_name`](#fluent_communitygenerated_upload_file_name) | Core | 1 | `fluent-community/app/Services/Libs/FileSystem.php:158` |
| [`fluent_community/handle_remove_bulk_media`](#fluent_communityhandle_remove_bulk_media) | Core | 2 | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:138` |
| [`fluent_community/media_public_url_{this}`](#fluent_communitymedia_public_url_this) | Core | 1 | `fluent-community/app/Models/Media.php:117` |
| [`fluent_community/media_signed_public_url_{this}`](#fluent_communitymedia_signed_public_url_this) | Core | 1 | `fluent-community/app/Models/Media.php:122` |
| [`fluent_community/media_upload_data`](#fluent_communitymedia_upload_data) | Core + <span class="pro-badge">PRO</span> | 4 | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:253` |
| [`fluent_community/media_upload_max_file_size`](#fluent_communitymedia_upload_max_file_size) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:939` |
| [`fluent_community/media_upload_max_file_unit`](#fluent_communitymedia_upload_max_file_unit) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:938` |
| [`fluent_community/media_upload_max_width_{context}`](#fluent_communitymedia_upload_max_width_context) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:978` |
| [`fluent_community/media_upload_resize`](#fluent_communitymedia_upload_resize) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:975` |
| [`fluent_community/rate_limit/media_upload_per_minute`](#fluent_communityrate_limitmedia_upload_per_minute) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:67` |
| [`fluent_community/upload_folder_name`](#fluent_communityupload_folder_name) | Core | 2 | `fluent-community/app/Services/Libs/FileSystem.php:26` |
| [`fluent_community/video_upload_max_file_size`](#fluent_communityvideo_upload_max_file_size) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:55` |
| [`fluent_community/video_upload_max_file_unit`](#fluent_communityvideo_upload_max_file_unit) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:54` |

<a id="fluent_communitygenerated_upload_file_name"></a>

## `fluent_community/generated_upload_file_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Generated Upload File Name hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:158` | `$file['name']` (array)<br>`$originalName` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/generated_upload_file_name', function ($file, $originalName, $file_3) {
    return $file;
}, 10, 3);
```

<a id="fluent_communityhandle_remove_bulk_media"></a>

## `fluent_community/handle_remove_bulk_media`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Handle Remove Bulk Media hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:138` | `false` (mixed)<br>`$media` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/CleanupHandler.php:171` | `false` (mixed)<br>`$media` (mixed) |

### Example

```php
add_filter('fluent_community/handle_remove_bulk_media', function ($param1, $media) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitymedia_public_url_this"></a>

## `fluent_community/media_public_url_{this}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Media Public URL {This} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:117` | `$this->media_url` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/media_public_url_{this}', function ($media_url, $param2) {
    return $media_url;
}, 10, 2);
```

<a id="fluent_communitymedia_signed_public_url_this"></a>

## `fluent_community/media_signed_public_url_{this}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Media Signed Public URL {This} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:122` | `$this->media_url` (mixed)<br>`$this` (mixed)<br>`$time` (mixed) |

### Example

```php
add_filter('fluent_community/media_signed_public_url_{this}', function ($media_url, $param2, $time) {
    return $media_url;
}, 10, 3);
```

<a id="fluent_communitymedia_upload_data"></a>

## `fluent_community/media_upload_data`

- **Type:** filter
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 4
- **When it fires:** Media Upload Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:253` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1073` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:182` | `$mediaData` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:93` | `$mediaData` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_data', function ($mediaData, $file) {
    return $mediaData;
}, 10, 2);
```

<a id="fluent_communitymedia_upload_max_file_size"></a>

## `fluent_community/media_upload_max_file_size`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Media Upload Max File Size hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:939` | `100` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:40` | `$options['max_size']` (array) |

### Example

```php
add_filter('fluent_community/media_upload_max_file_size', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitymedia_upload_max_file_unit"></a>

## `fluent_community/media_upload_max_file_unit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Media Upload Max File Unit hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:938` | `'MB'` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:39` | `$options['size_unit']` (array) |

### Example

```php
add_filter('fluent_community/media_upload_max_file_unit', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitymedia_upload_max_width_context"></a>

## `fluent_community/media_upload_max_width_{context}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Media Upload Max Width {Context} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:978` | `$maxWidth` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:87` | `$maxWidth` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_max_width_{context}', function ($maxWidth, $file) {
    return $maxWidth;
}, 10, 2);
```

<a id="fluent_communitymedia_upload_resize"></a>

## `fluent_community/media_upload_resize`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Media Upload Resize hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:975` | `$willResize` (mixed)<br>`$file` (mixed) |
| Core | `fluent-community/app/Services/UploadHelper.php:84` | `$willResize` (mixed)<br>`$file` (mixed) |

### Example

```php
add_filter('fluent_community/media_upload_resize', function ($willResize, $file) {
    return $willResize;
}, 10, 2);
```

<a id="fluent_communityrate_limitmedia_upload_per_minute"></a>

## `fluent_community/rate_limit/media_upload_per_minute`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Rate Limit/Media Upload Per Minute hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:67` | `10` (mixed) |

### Example

```php
add_filter('fluent_community/rate_limit/media_upload_per_minute', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityupload_folder_name"></a>

## `fluent_community/upload_folder_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Upload Folder Name hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:26` | `FLUENT_COMMUNITY_UPLOAD_DIR` (mixed) |
| Core | `fluent-community/app/Services/Libs/FileSystem.php:125` | `FLUENT_COMMUNITY_UPLOAD_DIR` (mixed) |

### Example

```php
add_filter('fluent_community/upload_folder_name', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityvideo_upload_max_file_size"></a>

## `fluent_community/video_upload_max_file_size`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Video Upload Max File Size hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:55` | `300` (mixed) |

### Example

```php
add_filter('fluent_community/video_upload_max_file_size', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityvideo_upload_max_file_unit"></a>

## `fluent_community/video_upload_max_file_unit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Video Upload Max File Unit hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:54` | `'MB'` (mixed) |

### Example

```php
add_filter('fluent_community/video_upload_max_file_unit', function ($param1) {
    return $param1;
}, 10, 1);
```

