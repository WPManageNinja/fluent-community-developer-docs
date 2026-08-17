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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:411` | `$newSyncIndexes` (mixed)<br>`$feed` (Feed)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/feed/cast_survey_vote', function ($newSyncIndexes, $feed, $userId) {
}, 10, 3);
```

