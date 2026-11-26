---
title: "Reactions Filters"
description: "Reactions filter hooks for FluentCommunity."
---

# Reactions Filters

5 unique filter hooks currently map to this category, across 6 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/feed/updated_survey_config`](#fluent-community-feed-updated-survey-config) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:563` |
| [`fluent_community/reaction_notification/enabled`](#fluent-community-reaction-notification-enabled) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:229` |
| [`fluent_community/reactions_api_response`](#fluent-community-reactions-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/ReactionController.php:47` |
| [`fluent_community/survey_config_response`](#fluent-community-survey-config-response) | Core | 1 | `fluent-community/app/Http/Controllers/ReactionController.php:270` |
| [`fluent_community/survey_voters_api_response`](#fluent-community-survey-voters-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ReactionController.php:303` |

<a id="fluent-community-feed-updated-survey-config"></a>

## `fluent_community/feed/updated_survey_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters a survey's configuration after vote tallies have been recalculated but before it is stored.

The returned array is written straight into the post's `meta.survey_config` and saved, so this is the persistence-side hook — mutating `options[*].vote_counts` here changes the stored tallies. It runs on every ballot submission, including one that only withdraws votes. For a display-only change use `fluent_community/survey_config_response`, which runs afterwards and is not persisted.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$surveyConfig` | `array` | The survey configuration, including `options` with recalculated `vote_counts`, and `end_date`. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The survey post. |
| 3 | `$userId` | `int` | WordPress user ID of the voter. |

**Return:** `array` — the configuration, written verbatim to `meta.survey_config`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:563` | `$surveyConfig` (mixed)<br>`$feed` (Feed)<br>`$userId` (int) |

### Example

```php
add_filter('fluent_community/feed/updated_survey_config', function ($surveyConfig, $feed, $userId) {
    return $surveyConfig;
}, 10, 3);
```

**Related:** [`fluent_community/survey_config_response`](#fluent-community-survey-config-response) · [`fluent_community/feed/cast_survey_vote`](/hooks/actions/reactions#fluent-community-feed-cast-survey-vote)

<a id="fluent-community-reaction-notification-enabled"></a>

## `fluent_community/reaction_notification/enabled`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Decides whether a reaction creates a notification for the author.

Defaults to true and is cast to bool, so a string like `no` is truthy and does not block. It fires once per reaction, for the one member who would be notified, after the reaction itself has been stored and counted — so blocking affects the notification only, never the reaction. It never fires when somebody reacts to their own content.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$enabled` | `bool` | Whether to notify. True by default. |
| 2 | `$recipientId` | `int` | The author who would be notified. |
| 3 | `$react` | `\FluentCommunity\App\Models\Reaction` | The new reaction. |
| 4 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post, or the post holding the comment. |
| 5 | `$comment` | `\FluentCommunity\App\Models\Comment&#124;null` | The comment reacted to, or null for a reaction on a post. |

**Return:** `bool` — cast from whatever is returned.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:229` | `true` (bool)<br>`(int) $recipientId` (int)<br>`$react` (mixed)<br>`$feed` (Feed)<br>`$comment` (Comment) |

### Example

```php
add_filter('fluent_community/reaction_notification/enabled', function ($enabled, $recipientId, $react, $feed, $comment) {
    return $enabled;
}, 10, 5);
```

<a id="fluent-community-reactions-api-response"></a>

## `fluent_community/reactions_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the list of members who liked a post or a comment.

One filter for both endpoints: `GET /feeds/{id}/reactions` and `GET /comments/{id}/reactions`. Nothing in the arguments distinguishes them, so inspect the reactions themselves if you need to. Only `like` reactions are returned, capped at 100 rows with no paging, and reactions whose profile is missing are excluded.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `reactions` collection. |
| 2 | `$reactions` | `\FluentCommunity\Framework\Database\Orm\Collection` | The reactions, with `xprofile` eager-loaded. |
| 3 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:47` | `[ 'reactions' => $reactions, ]` (array)<br>`$reactions` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:91` | `[ 'reactions' => $reactions, ]` (array)<br>`$reactions` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/reactions_api_response', function ($data, $reactions, $requestData) {
    return $data;
}, 10, 3);
```

**Related:** [`fluent_community/survey_voters_api_response`](#fluent-community-survey-voters-api-response)

<a id="fluent-community-survey-config-response"></a>

## `fluent_community/survey_config_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the survey configuration returned to the voter after a ballot is cast.

Applied to the response only — unlike `fluent_community/feed/updated_survey_config` nothing here is persisted. It runs after the reload that marks the current voter's own choices with `voted = true` on each matching option, so it is the right place to adjust what a voter is shown without changing the stored tallies. It only runs on the vote endpoint; a survey rendered as part of a normal feed fetch does not pass through it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$surveyConfig` | `array` | The survey configuration with the voter's own `voted` flags applied. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The survey post. |
| 3 | `$userId` | `int` | WordPress user ID of the voter. |

**Return:** The survey configuration array, returned under a `survey_config` key.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:270` | `$surveyConfig` (mixed)<br>`$feed` (Feed)<br>`$userId` (int) |

### Example

```php
add_filter('fluent_community/survey_config_response', function ($surveyConfig, $feed, $userId) {
    return $surveyConfig;
}, 10, 3);
```

**Related:** [`fluent_community/feed/updated_survey_config`](#fluent-community-feed-updated-survey-config)

<a id="fluent-community-survey-voters-api-response"></a>

## `fluent_community/survey_voters_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the list of members who voted for one survey option.

The option is identified by its slug, which is stored in the reaction's `object_type` column. Capped at 100 voters with no paging, and voters without a profile row are excluded. Access is checked against the parent post, not against the survey — anyone who can read the post can enumerate its voters.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `voters` collection. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:303` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/survey_voters_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/reactions_api_response`](#fluent-community-reactions-api-response)

