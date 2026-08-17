---
title: Media Actions
description: Media action hooks for FluentCommunity.
---

# Media Actions

7 unique action hooks currently map to this category, across 16 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/check_rate_limit/media_upload`](#fluent-community-check-rate-limit-media-upload) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:878` |
| [`fluent_community/delete_remote_media_{this}`](#fluent-community-delete-remote-media-this) | Core | 1 | `fluent-community/app/Models/Media.php:153` |
| [`fluent_community/document/local_file_access`](#fluent-community-document-local-file-access) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:288` |
| [`fluent_community/feed/media_deleted`](#fluent-community-feed-media-deleted) | Core <span class="edition-note">(also fired by Pro)</span> | 5 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:33` |
| [`fluent_community/maybe_delete_draft_medias`](#fluent-community-maybe-delete-draft-medias) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:17` |
| [`fluent_community/remove_medias_by_url`](#fluent-community-remove-medias-by-url) | Core <span class="edition-note">(also fired by Pro)</span> | 6 | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:84` |
| [`fluent_community/space_media/viewed`](#fluent-community-space-media-viewed) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Http/MediaGalleryController.php:51` |

<a id="fluent-community-check-rate-limit-media-upload"></a>

## `fluent_community/check_rate_limit/media_upload`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:878` | `$user` (User) |

### Example

```php
add_action('fluent_community/check_rate_limit/media_upload', function ($user) {
}, 10, 1);
```

<a id="fluent-community-delete-remote-media-this"></a>

## `fluent_community/delete_remote_media_{this}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:153` | `$this` (mixed) |

### Example

```php
add_action('fluent_community/delete_remote_media_{this}', function ($param1) {
}, 10, 1);
```

<a id="fluent-community-document-local-file-access"></a>

## `fluent_community/document/local_file_access`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires just before a locally stored document is streamed to the browser.

Runs after the permission check has passed, on the local-driver path only — documents on a cloud storage driver redirect to a signed URL and never reach this action. It fires for inline views as well as downloads, and headers have not been sent yet, so a callback can still short-circuit. Note this is a download of a document, not of a media-gallery item.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$document` | `\FluentCommunity\App\Models\Media` | The media row being served (object_source is space_document or lesson_document). |
| 2 | `$forceDownload` | `string` | The raw force_download request value; empty means serve PDFs and raster images inline. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:288` | `$document` (mixed)<br>`$forceDownload` (mixed) |

### Example

```php
add_action('fluent_community/document/local_file_access', function ($document, $forceDownload) {
}, 10, 2);
```

<a id="fluent-community-feed-media-deleted"></a>

## `fluent_community/feed/media_deleted`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 5
- **When it fires:** Signals that one or more media rows attached to a post should be detached and cleaned up.

Despite the name this is a request to clean up, not a notification that a delete already happened: core's `CleanupHandler::handleMediaDelete()` is what actually queues the files for removal, and lesson documents are routed to the lesson-specific path instead. The only live callers are in the Pro Document Library, which passes documents being replaced or removed; the one core call site in `FeedsController::deleteMediaPreview()` is commented out, so deleting a post's preview image does not currently fire it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$media` | `mixed` | Either a single `\FluentCommunity\App\Models\Media` model or a collection of them. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:33` | `$documents` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:159` | `$documents` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:175` | `$deletedDocuments` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:205` | `$media` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:857` | `$feed->media` (Feed) |

### Example

```php
add_action('fluent_community/feed/media_deleted', function ($media) {
}, 10, 1);
```

**Related:** [`fluent_community/remove_medias_by_url`](#fluent-community-remove-medias-by-url)

<a id="fluent-community-maybe-delete-draft-medias"></a>

## `fluent_community/maybe_delete_draft_medias`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:17` | No parameters |

### Example

```php
add_action('fluent_community/maybe_delete_draft_medias', function () {
}, 10, 0);
```

<a id="fluent-community-remove-medias-by-url"></a>

## `fluent_community/remove_medias_by_url`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 6
- **When it fires:** Requests deletion of media records matching a set of public URLs.

This is an action rather than a filter, and the work is done by core's `CleanupHandler`, which resolves the URLs to media rows and queues the files for removal. Fire it yourself when you replace an image that FluentCommunity owns — spaces, space groups, profiles, lockscreens and Pro quizzes all do. The optional `$wheres` array currently understands only `sub_object_id`, which scopes the lookup to one owning record and prevents deleting an identical URL used elsewhere; omit it and every matching row is removed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$mediaUrls` | `array` | Public media URLs to remove. An empty array is a no-op. |
| 2 | `$wheres` | `array` | Optional constraints. Only `sub_object_id` is honoured. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:84` | `$deleteMediaUrls` (mixed)<br>`[ 'sub_object_id' => $lessonId, ]` (array) |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:236` | `$deletedMedias` (mixed)<br>`array (2 keys: user_id, object_sources)` (array) |
| Core | `fluent-community/app/Models/BaseSpace.php:360` | `$deletePhotos` (mixed)<br>`[ 'sub_object_id' => $this->id, ]` (array) |
| Core | `fluent-community/app/Models/SpaceGroup.php:129` | `$deletePhotos` (mixed)<br>`[ 'sub_object_id' => $this->id, ]` (array) |
| Core | `fluent-community/app/Services/Helper.php:425` | `[$url]` (array)<br>`[ 'sub_object_id' => $subObjectId, ]` (array) |
| Core | `fluent-community/app/Services/LockscreenService.php:189` | `$deleteMediaUrls` (mixed)<br>`[ 'sub_object_id' => $spaceId, ]` (array) |

### Example

```php
add_action('fluent_community/remove_medias_by_url', function ($mediaUrls, $wheres) {
}, 10, 2);
```

**Related:** [`fluent_community/feed/media_deleted`](#fluent-community-feed-media-deleted)

<a id="fluent-community-space-media-viewed"></a>

## `fluent_community/space_media/viewed`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when a member loads a page of a space media gallery.

Fires once per request, including for each paged scroll, so it is a page-view signal rather than a first-visit signal. It runs only after the can_view_media permission check has passed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\Space` | The space whose gallery was viewed. |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The viewer, or null for a guest on a public space. |
| 3 | `$type` | `string` | The tab viewed — photos, videos or audios. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/MediaGallery/Http/MediaGalleryController.php:51` | `$space` (Space)<br>`$user` (User)<br>`$type` (mixed) |

### Example

```php
add_action('fluent_community/space_media/viewed', function ($space, $user, $type) {
}, 10, 3);
```

**Related:** [`fluent_community/space_media/api_response`](#fluent-community-space-media-api-response)

