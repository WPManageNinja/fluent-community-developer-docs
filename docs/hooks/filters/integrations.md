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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:220` | `array (5 keys: content_timeout_ms, script_timeout_ms, script_grace_ms, …)` (array) |

### Example

```php
add_filter('fluent_community/fluent_player/fallback_timings', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-fluent-player-max-audios-per-post"></a>

## `fluent_community/fluent_player/max_audios_per_post`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:295` | `10` (int) |

### Example

```php
add_filter('fluent_community/fluent_player/max_audios_per_post', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-fluentform--defaults"></a>

## `fluent_community/fluentform__defaults`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-support-audio-types"></a>

## `fluent_community/support_audio_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:183` | `array (6 items)` (array) |

### Example

```php
add_filter('fluent_community/support_audio_types', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-support-video-types"></a>

## `fluent_community/support_video_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Bootstrap.php:173` | `[ 'video/mp4', 'video/webm', 'video/quicktime' ]` (array) |

### Example

```php
add_filter('fluent_community/support_video_types', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-video-upload-max-file-size"></a>

## `fluent_community/video_upload_max_file_size`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:61` | `300` (int) |

### Example

```php
add_filter('fluent_community/video_upload_max_file_size', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-video-upload-max-file-unit"></a>

## `fluent_community/video_upload_max_file_unit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:60` | `'MB'` (string) |

### Example

```php
add_filter('fluent_community/video_upload_max_file_unit', function ($param1) {
    return $param1;
}, 10, 1);
```

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

