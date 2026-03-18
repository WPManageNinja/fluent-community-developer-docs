---
title: Media Actions
description: Media action hooks for FluentCommunity.
---

# Media Actions

6 unique action hooks currently map to this category, across 11 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/check_rate_limit/media_upload`](#fluent_communitycheck_rate_limitmedia_upload) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:923` |
| [`fluent_community/delete_remote_media_{this}`](#fluent_communitydelete_remote_media_this) | Core | 1 | `fluent-community/app/Models/Media.php:132` |
| [`fluent_community/document/local_file_access`](#fluent_communitydocumentlocal_file_access) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:263` |
| [`fluent_community/lesson/additional_media_updated`](#fluent_communitylessonadditional_media_updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:970` |
| [`fluent_community/maybe_delete_draft_medias`](#fluent_communitymaybe_delete_draft_medias) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:17` |
| [`fluent_community/remove_medias_by_url`](#fluent_communityremove_medias_by_url) | Core + <span class="pro-badge">PRO</span> | 6 | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:83` |

<a id="fluent_communitycheck_rate_limitmedia_upload"></a>

## `fluent_community/check_rate_limit/media_upload`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Check Rate Limit/Media Upload hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:923` | `$user` (mixed) |

### Example

```php
add_action('fluent_community/check_rate_limit/media_upload', function ($user) {
}, 10, 1);
```

<a id="fluent_communitydelete_remote_media_this"></a>

## `fluent_community/delete_remote_media_{this}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Delete Remote Media {This} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Media.php:132` | `$this` (mixed) |

### Example

```php
add_action('fluent_community/delete_remote_media_{this}', function ($param1) {
}, 10, 1);
```

<a id="fluent_communitydocumentlocal_file_access"></a>

## `fluent_community/document/local_file_access`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Document/Local File Access hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:263` | `$document` (mixed)<br>`$forceDownload` (mixed) |

### Example

```php
add_action('fluent_community/document/local_file_access', function ($document, $forceDownload) {
}, 10, 2);
```

<a id="fluent_communitylessonadditional_media_updated"></a>

## `fluent_community/lesson/additional_media_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lesson/Additional Media Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:970` | `$request->all()` (array)<br>`$lesson` (mixed)<br>`$updateData` (mixed) |

### Example

```php
add_action('fluent_community/lesson/additional_media_updated', function ($all, $lesson, $updateData) {
}, 10, 3);
```

<a id="fluent_communitymaybe_delete_draft_medias"></a>

## `fluent_community/maybe_delete_draft_medias`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Maybe Delete Draft Medias hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:17` | No parameters |

### Example

```php
add_action('fluent_community/maybe_delete_draft_medias', function () {
}, 10, 0);
```

<a id="fluent_communityremove_medias_by_url"></a>

## `fluent_community/remove_medias_by_url`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 6
- **When it fires:** Remove Medias By URL hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Quiz/QuizHelper.php:83` | `$deleteMediaUrls` (mixed)<br>`[ 'sub_object_id' => $lessonId, ]` (array) |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:212` | `$deletedMedias` (mixed)<br>`[ 'user_id' => $xprofile->user_id, 'object_sources' => ['user_avatar', 'user_cover_photo'] ]` (array) |
| Core | `fluent-community/app/Models/BaseSpace.php:302` | `$deletePhotos` (mixed)<br>`[ 'sub_object_id' => $this->id, ]` (array) |
| Core | `fluent-community/app/Models/SpaceGroup.php:111` | `$deletePhotos` (mixed)<br>`[ 'sub_object_id' => $this->id, ]` (array) |
| Core | `fluent-community/app/Services/Helper.php:329` | `[$url]` (array)<br>`[ 'sub_object_id' => $subObjectId, ]` (array) |
| Core | `fluent-community/app/Services/LockscreenService.php:188` | `$deleteMediaUrls` (mixed)<br>`[ 'sub_object_id' => $spaceId, ]` (array) |

### Example

```php
add_action('fluent_community/remove_medias_by_url', function ($deleteMediaUrls, $lessonId) {
}, 10, 2);
```

