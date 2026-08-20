---
title: Reactions Actions
description: Reactions action hooks for FluentCommunity.
---

# Reactions Actions

1 unique action hook currently map to this category, across 1 call site.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/feed/cast_survey_vote`](#fluent-community-feed-cast-survey-vote) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:411` |

<a id="fluent-community-feed-cast-survey-vote"></a>

## `fluent_community/feed/cast_survey_vote`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a member casts one or more new votes in a survey post.

Only fires when the ballot contains at least one option the member had not already voted for — changing a vote fires it, withdrawing every vote does not. The `Reaction` rows are already written, but the tallies in the post's `meta.survey_config` are updated afterwards, so re-reading the post inside a callback gives stale counts. The first argument holds only the newly added option slugs, not the full ballot.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$newSyncIndexes` | `array` | Option slugs newly voted for; already-held votes are excluded. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The survey post. |
| 3 | `$userId` | `int` | WordPress user ID of the voter. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:411` | `$newSyncIndexes` (mixed)<br>`$feed` (Feed)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/feed/cast_survey_vote', function ($newSyncIndexes, $feed, $userId) {
}, 10, 3);
```

**Related:** [`fluent_community/feed/updated_survey_config`](/hooks/filters/reactions#fluent-community-feed-updated-survey-config) · [`fluent_community/survey_config_response`](/hooks/filters/reactions#fluent-community-survey-config-response)

