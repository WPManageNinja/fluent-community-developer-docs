---
title: Media Actions
description: Media action hooks for FluentCommunity.
---

# Media Actions

8 unique action hooks currently map to this category, across 17 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/check_rate_limit/media_upload`](#fluent-community-check-rate-limit-media-upload) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:909` |
| [`fluent_community/delete_remote_media_{this}`](#fluent-community-delete-remote-media-this) | Core | 1 | `fluent-community/app/Models/Media.php:153` |
| [`fluent_community/document/local_file_access`](#fluent-community-document-local-file-access) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:288` |
| [`fluent_community/feed/media_deleted`](#fluent-community-feed-media-deleted) | Core <span class="edition-note">(also fired by Pro)</span> | 5 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:33` |
| [`fluent_community/maybe_delete_draft_medias`](#fluent-community-maybe-delete-draft-medias) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:17` |
| [`fluent_community/remote_media_delete_failed`](#fluent-community-remote-media-delete-failed) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/CloudStorage/CloudStorageModule.php:68` |
| [`fluent_community/remove_medias_by_url`](#fluent-community-remove-medias-by-url) | Core <span class="edition-note">(also fired by Pro)</span> | 6 | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:84` |
| [`fluent_community/space_media/viewed`](#fluent-community-space-media-viewed) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/MediaGallery/Http/MediaGalleryController.php:51` |

<a id="fluent-community-check-rate-limit-media-upload"></a>

## `fluent_community/check_rate_limit/media_upload`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs before an upload is validated so rate limiters can abort the request.

Core attaches `RateLimitHandler::maybeLimitMediaUpload()`, which throws once the member has created more media rows than `fluent_community/rate_limit/media_upload_per_minute` allows in the last 60 seconds. It runs after the PHP upload-size sanity check but before MIME validation, so nothing about the file is available yet. Site administrators are exempted inside the callback.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$user` | `\FluentCommunity\App\Models\User` | The uploading member. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:909` | `$user` (User) |

### Example

```php
add_action('fluent_community/check_rate_limit/media_upload', function ($user) {
}, 10, 1);
```

**Related:** [`fluent_community/rate_limit/media_upload_per_minute`](/hooks/filters/media#fluent-community-rate-limit-media-upload-per-minute)

<a id="fluent-community-delete-remote-media-this"></a>

## `fluent_community/delete_remote_media_{this}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Asks the owning storage driver to delete a media file it holds, named after the driver.

The suffix is `$media->driver`, so the live name is `fluent_community/delete_remote_media_s3` for Pro's cloud storage. It is the else-branch of `Media::deleteFile()`: local files are unlinked directly and never reach a hook. Nothing verifies that a handler exists, so a media row on an unhandled driver has its database row removed while the remote object is left behind.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$media` | `\FluentCommunity\App\Models\Media` | The media row whose remote file should be removed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:153` | `$this` (mixed) |

### Example

```php
add_action('fluent_community/delete_remote_media_{this}', function ($media) {
}, 10, 1);
```

**Related:** [`fluent_community/media_public_url_{this}`](/hooks/filters/media#fluent-community-media-public-url-this) · [`fluent_community/handle_remove_bulk_media`](/hooks/filters/media#fluent-community-handle-remove-bulk-media)

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
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:888` | `$feed->media` (Feed) |

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
- **When it fires:** Fires hourly to clean up media that was uploaded but never attached to anything.

Dispatched from the `fluent_community_scheduled_hour_jobs` handler. The core callback removes at most 30 inactive media rows older than two hours per run, so a large backlog drains over several hours. The two-hour grace period is what lets a member leave a composer open without losing their upload. It takes no arguments.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:17` | No parameters |

### Example

```php
add_action('fluent_community/maybe_delete_draft_medias', function () {
}, 10, 0);
```

**Related:** [`fluent_community_scheduled_hour_jobs`](/hooks/actions/settings#fluent-community-scheduled-hour-jobs) · [`fluent_community/handle_remove_bulk_media`](/hooks/filters/media#fluent-community-handle-remove-bulk-media)

<a id="fluent-community-remote-media-delete-failed"></a>

## `fluent_community/remote_media_delete_failed`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/CloudStorage/CloudStorageModule.php:68` | `$media` (mixed)<br>`$result` (mixed) |

### Example

```php
add_action('fluent_community/remote_media_delete_failed', function ($media, $result) {
}, 10, 2);
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
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:237` | `$deletedMedias` (mixed)<br>`array (2 keys: user_id, object_sources)` (array) |
| Core | `fluent-community/app/Models/BaseSpace.php:360` | `$deletePhotos` (mixed)<br>`[ 'sub_object_id' => $this->id, ]` (array) |
| Core | `fluent-community/app/Models/SpaceGroup.php:129` | `$deletePhotos` (mixed)<br>`[ 'sub_object_id' => $this->id, ]` (array) |
| Core | `fluent-community/app/Services/Helper.php:426` | `[$url]` (array)<br>`[ 'sub_object_id' => $subObjectId, ]` (array) |
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

**Related:** [`fluent_community/space_media/api_response`](/hooks/filters/media#fluent-community-space-media-api-response)

