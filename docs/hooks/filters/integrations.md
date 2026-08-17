---
title: Integrations Filters
description: Integrations filter hooks for FluentCommunity.
---

# Integrations Filters

9 unique filter hooks currently map to this category, across 9 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/fluent_player/fallback_timings`](#fluent-community-fluent-player-fallback-timings) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:220` |
| [`fluent_community/fluent_player/max_audios_per_post`](#fluent-community-fluent-player-max-audios-per-post) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:295` |
| [`fluent_community/fluentform__defaults`](#fluent-community-fluentform--defaults) | Core | 1 | `fluent-community/Modules/Integrations/FluentForms/Bootstrap.php:58` |
| [`fluent_community/fluentplayer_defaults_settings`](#fluent-community-fluentplayer-defaults-settings) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:619` |
| [`fluent_community/support_audio_types`](#fluent-community-support-audio-types) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:183` |
| [`fluent_community/support_video_types`](#fluent-community-support-video-types) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:173` |
| [`fluent_community/video_upload_max_file_size`](#fluent-community-video-upload-max-file-size) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:61` |
| [`fluent_community/video_upload_max_file_unit`](#fluent-community-video-upload-max-file-unit) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:60` |
| [`fluent_community/wppayform__defaults`](#fluent-community-wppayform--defaults) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Integrations/Paymattic/Bootstrap.php:65` |

<a id="fluent-community-fluent-player-fallback-timings"></a>

## `fluent_community/fluent_player/fallback_timings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the timeouts the front end uses to decide the FluentPlayer embed has failed.

All five values are milliseconds and they govern the fallback path only — how long the portal waits for the player content, its script and its initialisation before giving up and rendering a plain link. They are only added to the payload when FluentPlayer is active and are read once at page load, so changes apply on the next render. Raising them hides genuine failures for longer; lowering them risks false negatives on slow connections.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$timings` | `array` | `content_timeout_ms`, `script_timeout_ms`, `script_grace_ms`, `init_timeout_ms`, `stall_timeout_ms`. |

**Return:** `array` — the timing map; the front end reads each key by name.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:220` | `array (5 keys: content_timeout_ms, script_timeout_ms, script_grace_ms, …)` (array) |

### Example

```php
add_filter('fluent_community/fluent_player/fallback_timings', function ($timings) {
    return $timings;
}, 10, 1);
```

**Related:** [`fluent_community/fluentplayer_defaults_settings`](#fluent-community-fluentplayer-defaults-settings)

<a id="fluent-community-fluent-player-max-audios-per-post"></a>

## `fluent_community/fluent_player/max_audios_per_post`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how many audio items may be attached to one post.

Defaults to 10 and is clamped to 1–50 after the filter, so a callback cannot lift the ceiling above 50 or disable audio by returning 0 — the clamp exists to bound the sanitisation and database work, and is documented as such at the call site. The resolved figure both trims the submitted list server-side and reaches the composer as `features.fluent_player.max_audios_per_post`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxAudios` | `int` | Audio items allowed per post, 10 by default. |

**Return:** `int` — cast to an integer and clamped to between 1 and 50.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:295` | `10` (int) |

### Example

```php
add_filter('fluent_community/fluent_player/max_audios_per_post', function ($maxAudios) {
    return $maxAudios;
}, 10, 1);
```

**Related:** [`fluent_community/support_audio_types`](#fluent-community-support-audio-types)

<a id="fluent-community-fluentform--defaults"></a>

## `fluent_community/fluentform__defaults`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the default configuration of a Fluent Forms integration feed for FluentCommunity.

Supplies the initial state of the feed form an administrator sees when connecting a Fluent Forms form to the community — it is the shape of a new, unsaved feed, not the settings of a saved one. Field mapping keys such as `Email` and `username` hold Fluent Forms shortcodes once configured. The double underscore in the hook name is not a typo.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fields` | `array` | Feed defaults: `name`, `space_ids`, `Email`, `username`, `enableAutoLogin`, `sendEmailToNewUser`, `conditionals`, `enabled`. |
| 2 | `$formId` | `int` | The Fluent Forms form being connected. |

**Return:** `array` — the feed defaults, rendered into the integration settings form.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentForms/Bootstrap.php:58` | `$fields` (mixed)<br>`$formId` (int) |

### Example

```php
add_filter('fluent_community/fluentform__defaults', function ($fields, $formId) {
    return $fields;
}, 10, 2);
```

<a id="fluent-community-fluentplayer-defaults-settings"></a>

## `fluent_community/fluentplayer_defaults_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the default player settings applied to a FluentPlayer embed.

Applied last, after the plugin defaults have been merged with the stored FluentPlayer settings and after the iOS Safari compatibility pass has forced `playsinline` and `preload` — so a callback can undo those corrections, which is rarely what you want. Note `loadStrategy` is deliberately set to `idle` because the portal is a single-page app; changing it can leave players uninitialised after client-side navigation.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | Player settings such as `viewType`, `brandColor`, `aspectRatio`, `playsInline`, `loadStrategy`, and any stored overrides. |

**Return:** `array` — the settings map handed to the player.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:619` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/fluentplayer_defaults_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

**Related:** [`fluent_community/fluent_player/fallback_timings`](#fluent-community-fluent-player-fallback-timings)

<a id="fluent-community-support-audio-types"></a>

## `fluent_community/support_audio_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the audio MIME types the FluentPlayer upload endpoint accepts.

Only applied when audio uploads are switched on in the FluentPlayer settings — with `enable_audio` off the allowed list is emptied before the filter would run, so a callback cannot enable audio uploads on its own. Defaults cover MP3, WAV, MP4 audio, AAC, Ogg and FLAC.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$audioTypes` | `array` | MIME type strings. |

**Return:** `array` — a flat list of MIME types.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:183` | `array (6 items)` (array) |

### Example

```php
add_filter('fluent_community/support_audio_types', function ($audioTypes) {
    return $audioTypes;
}, 10, 1);
```

**Related:** [`fluent_community/support_video_types`](#fluent-community-support-video-types) · [`fluent_community/fluent_player/max_audios_per_post`](#fluent-community-fluent-player-max-audios-per-post)

<a id="fluent-community-support-video-types"></a>

## `fluent_community/support_video_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the video MIME types the FluentPlayer upload endpoint accepts.

Defaults to MP4, WebM and QuickTime. The list is deduplicated, joined into the validator's `mimetypes` rule and also used to build the upload control's accept list, so it is both the client hint and the server-side check. Adding a type here does not make WordPress accept the extension elsewhere, and the browser still has to be able to play it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$videoTypes` | `array` | MIME type strings. |

**Return:** `array` — a flat list of MIME types.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:173` | `[ 'video/mp4', 'video/webm', 'video/quicktime' ]` (array) |

### Example

```php
add_filter('fluent_community/support_video_types', function ($videoTypes) {
    return $videoTypes;
}, 10, 1);
```

**Related:** [`fluent_community/support_audio_types`](#fluent-community-support-audio-types) · [`fluent_community/video_upload_max_file_size`](#fluent-community-video-upload-max-file-size)

<a id="fluent-community-video-upload-max-file-size"></a>

## `fluent_community/video_upload_max_file_size`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the size ceiling for FluentPlayer media uploads, in the unit set by the companion filter.

Defaults to 300 and is interpreted alongside `fluent_community/video_upload_max_file_unit`: with the default `MB` unit, the value is multiplied by 1024 into the kilobytes the validator expects. Any unit string other than `MB` or `GB` leaves the number unmultiplied, so it is read as kilobytes. This is only the plugin's own limit — PHP's `upload_max_filesize` and the web server still apply, and the endpoint checks for those separately.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxFileSize` | `int` | The numeric ceiling, 300 by default. |

**Return:** `int` — a number in the configured unit; it also appears verbatim in the error message.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:61` | `300` (int) |

### Example

```php
add_filter('fluent_community/video_upload_max_file_size', function ($maxFileSize) {
    return $maxFileSize;
}, 10, 1);
```

**Related:** [`fluent_community/video_upload_max_file_unit`](#fluent-community-video-upload-max-file-unit)

<a id="fluent-community-video-upload-max-file-unit"></a>

## `fluent_community/video_upload_max_file_unit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the unit the FluentPlayer upload size limit is expressed in.

Compared case-insensitively against `MB` and `GB`; anything else means the size is used as kilobytes unchanged, which is a quiet way to shrink the limit by a factor of 1024. The string is also shown to the user in the "file must be less than…" message, so return something readable.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxFileUnit` | `string` | `MB` by default; `GB` is also recognised. |

**Return:** `string` — a unit label. Unrecognised values are treated as kilobytes.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:60` | `'MB'` (string) |

### Example

```php
add_filter('fluent_community/video_upload_max_file_unit', function ($maxFileUnit) {
    return $maxFileUnit;
}, 10, 1);
```

**Related:** [`fluent_community/video_upload_max_file_size`](#fluent-community-video-upload-max-file-size)

<a id="fluent-community-wppayform--defaults"></a>

## `fluent_community/wppayform__defaults`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the default settings for the Paymattic (WPPayForm) community integration on a form.

Supplies the starting values shown when the integration is first configured for a form — space and course assignment, auto-login, welcome email, the conditional-logic block, and the removal triggers for subscription cancellation and refund. Requires Paymattic to be active. It does not affect a form whose integration settings have already been saved.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fields` | `array` | The default integration settings. |
| 2 | `$formId` | `int` | The Paymattic form id. |

**Return:** The default settings array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Integrations/Paymattic/Bootstrap.php:65` | `$fields` (mixed)<br>`$formId` (int) |

### Example

```php
add_filter('fluent_community/wppayform__defaults', function ($fields, $formId) {
    return $fields;
}, 10, 2);
```

