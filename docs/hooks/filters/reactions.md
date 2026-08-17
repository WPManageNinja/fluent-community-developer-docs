---
title: Reactions Filters
description: Reactions filter hooks for FluentCommunity.
---

# Reactions Filters

4 unique filter hooks currently map to this category, across 5 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/feed/updated_survey_config`](#fluent-community-feed-updated-survey-config) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:428` |
| [`fluent_community/reactions_api_response`](#fluent-community-reactions-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/ReactionController.php:39` |
| [`fluent_community/survey_config_response`](#fluent-community-survey-config-response) | Core | 1 | `fluent-community/app/Http/Controllers/ReactionController.php:196` |
| [`fluent_community/survey_voters_api_response`](#fluent-community-survey-voters-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ReactionController.php:223` |

<a id="fluent-community-feed-updated-survey-config"></a>

## `fluent_community/feed/updated_survey_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:428` | `$surveyConfig` (mixed)<br>`$feed` (Feed)<br>`$userId` (int) |

### Example

```php
add_filter('fluent_community/feed/updated_survey_config', function ($surveyConfig, $feed, $userId) {
    return $surveyConfig;
}, 10, 3);
```

<a id="fluent-community-reactions-api-response"></a>

## `fluent_community/reactions_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:39` | `[ 'reactions' => $reactions ]` (array)<br>`$reactions` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:72` | `[ 'reactions' => $reactions ]` (array)<br>`$reactions` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/reactions_api_response', function ($param1, $reactions, $all) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-survey-config-response"></a>

## `fluent_community/survey_config_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:196` | `$surveyConfig` (mixed)<br>`$feed` (Feed)<br>`$userId` (int) |

### Example

```php
add_filter('fluent_community/survey_config_response', function ($surveyConfig, $feed, $userId) {
    return $surveyConfig;
}, 10, 3);
```

<a id="fluent-community-survey-voters-api-response"></a>

## `fluent_community/survey_voters_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:223` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/survey_voters_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

