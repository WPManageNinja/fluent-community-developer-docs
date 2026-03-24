---
title: Feeds Actions
description: Feeds action hooks for FluentCommunity.
---

# Feeds Actions

27 unique action hooks currently map to this category, across 46 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/check_rate_limit/create_post`](#fluent_communitycheck_rate_limitcreate_post) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:359` |
| [`fluent_community/comment_added_{feed}`](#fluent_communitycomment_added_feed) | Core + <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:197` |
| [`fluent_community/comment_deleted_{feed}`](#fluent_communitycomment_deleted_feed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:576` |
| [`fluent_community/comment_updated_{feed}`](#fluent_communitycomment_updated_feed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:253` |
| [`fluent_community/feed_mentioned`](#fluent_communityfeed_mentioned) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:466` |
| [`fluent_community/feed_mentioned_user_ids`](#fluent_communityfeed_mentioned_user_ids) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:598` |
| [`fluent_community/feed/before_deleted`](#fluent_communityfeedbefore_deleted) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:886` |
| [`fluent_community/feed/cast_survey_vote`](#fluent_communityfeedcast_survey_vote) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:374` |
| [`fluent_community/feed/created`](#fluent_communityfeedcreated) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:92` |
| [`fluent_community/feed/deleted`](#fluent_communityfeeddeleted) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:889` |
| [`fluent_community/feed/just_created_type_{formContentType}`](#fluent_communityfeedjust_created_type_formContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:470` |
| [`fluent_community/feed/media_deleted`](#fluent_communityfeedmedia_deleted) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:31` |
| [`fluent_community/feed/new_feed_{feed}`](#fluent_communityfeednew_feed_feed) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:504` |
| [`fluent_community/feed/react_added`](#fluent_communityfeedreact_added) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:537` |
| [`fluent_community/feed/react_removed`](#fluent_communityfeedreact_removed) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:507` |
| [`fluent_community/feed/rescheduled`](#fluent_communityfeedrescheduled) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:131` |
| [`fluent_community/feed/scheduled`](#fluent_communityfeedscheduled) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:492` |
| [`fluent_community/feed/scheduling_everyone_tag`](#fluent_communityfeedscheduling_everyone_tag) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:644` |
| [`fluent_community/feed/updated`](#fluent_communityfeedupdated) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:700` |
| [`fluent_community/feed/updating_content_type_old_{existingContentType}`](#fluent_communityfeedupdating_content_type_old_existingContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:600` |
| [`fluent_community/feeds_query`](#fluent_communityfeeds_query) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:158` |
| [`fluent_community/product_integration_feed_created`](#fluent_communityproduct_integration_feed_created) | Core | 1 | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:83` |
| [`fluent_community/product_integration_feed_updated`](#fluent_communityproduct_integration_feed_updated) | Core | 2 | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:56` |
| [`fluent_community/profile_feed/created`](#fluent_communityprofile_feedcreated) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:519` |
| [`fluent_community/space_feed/created`](#fluent_communityspace_feedcreated) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:95` |
| [`fluent_community/space_feed/email_notify_sub_query`](#fluent_communityspace_feedemail_notify_sub_query) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:65` |
| [`fluent_community/space_feed/updated`](#fluent_communityspace_feedupdated) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:702` |

<a id="fluent_communitycheck_rate_limitcreate_post"></a>

## `fluent_community/check_rate_limit/create_post`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Check Rate Limit/Create Post hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:359` | `$user` (mixed) |

### Example

```php
add_action('fluent_community/check_rate_limit/create_post', function ($user) {
}, 10, 1);
```

<a id="fluent_communitycomment_added_feed"></a>

## `fluent_community/comment_added_{feed}`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Comment Added {Feed} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:197` | `$content` (mixed)<br>`$feed` (Feed|mixed) |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:167` | `$comment` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment_added_{feed}', function ($content, $feed) {
}, 10, 2);
```

<a id="fluent_communitycomment_deleted_feed"></a>

## `fluent_community/comment_deleted_{feed}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment Deleted {Feed} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:576` | `$commentId` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment_deleted_{feed}', function ($commentId, $feed) {
}, 10, 2);
```

<a id="fluent_communitycomment_updated_feed"></a>

## `fluent_community/comment_updated_{feed}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment Updated {Feed} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:253` | `$comment` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment_updated_{feed}', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent_communityfeed_mentioned"></a>

## `fluent_community/feed_mentioned`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed Mentioned hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:466` | `$feed` (Feed|mixed)<br>`Arr::get($mentions, 'users')` (array) |
| Core | `fluent-community/app/Services/FeedsHelper.php:478` | `$feed` (Feed|mixed)<br>`$mentions['users']` (array) |

### Example

```php
add_action('fluent_community/feed_mentioned', function ($feed, $mentions) {
}, 10, 2);
```

<a id="fluent_communityfeed_mentioned_user_ids"></a>

## `fluent_community/feed_mentioned_user_ids`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed Mentioned User Ids hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:598` | `$feed` (Feed|mixed)<br>`$mentionedUserIds` (array) |

### Example

```php
add_action('fluent_community/feed_mentioned_user_ids', function ($feed, $mentionedUserIds) {
}, 10, 2);
```

<a id="fluent_communityfeedbefore_deleted"></a>

## `fluent_community/feed/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Before Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:886` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/before_deleted', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityfeedcast_survey_vote"></a>

## `fluent_community/feed/cast_survey_vote`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Cast Survey Vote hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:374` | `$newSyncIndexes` (mixed)<br>`$feed` (Feed|mixed)<br>`$userId` (mixed) |

### Example

```php
add_action('fluent_community/feed/cast_survey_vote', function ($newSyncIndexes, $feed, $userId) {
}, 10, 3);
```

<a id="fluent_communityfeedcreated"></a>

## `fluent_community/feed/created`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 5
- **When it fires:** Feed/Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:92` | `$feed` (Feed|mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:200` | `$content` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:76` | `$feed` (Feed|mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:514` | `$feed` (Feed|mixed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:490` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/created', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityfeeddeleted"></a>

## `fluent_community/feed/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:889` | `$feed_id` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/deleted', function ($feed_id) {
}, 10, 1);
```

<a id="fluent_communityfeedjust_created_type_formContentType"></a>

## `fluent_community/feed/just_created_type_{formContentType}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Just Created Type {FormContentType} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:470` | `$feed` (Feed|mixed)<br>`$requestData` (array) |

### Example

```php
add_action('fluent_community/feed/just_created_type_{formContentType}', function ($feed, $requestData) {
}, 10, 2);
```

<a id="fluent_communityfeedmedia_deleted"></a>

## `fluent_community/feed/media_deleted`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 5
- **When it fires:** Feed/Media Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:31` | `$documents` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:148` | `$documents` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:164` | `$deletedDocuments` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/Http/DocumentController.php:203` | `$media` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:902` | `$feed->media` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/media_deleted', function ($documents) {
}, 10, 1);
```

<a id="fluent_communityfeednew_feed_feed"></a>

## `fluent_community/feed/new_feed_{feed}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/New Feed {Feed} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:504` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/new_feed_{feed}', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityfeedreact_added"></a>

## `fluent_community/feed/react_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed/React Added hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:537` | `$react` (mixed)<br>`$feed` (Feed|mixed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:125` | `$react` (mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/react_added', function ($react, $feed) {
}, 10, 2);
```

<a id="fluent_communityfeedreact_removed"></a>

## `fluent_community/feed/react_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed/React Removed hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:507` | `$feed` (Feed|mixed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:96` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/react_removed', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityfeedrescheduled"></a>

## `fluent_community/feed/rescheduled`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Feed/Rescheduled hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:131` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/rescheduled', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityfeedscheduled"></a>

## `fluent_community/feed/scheduled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Scheduled hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:492` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/scheduled', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityfeedscheduling_everyone_tag"></a>

## `fluent_community/feed/scheduling_everyone_tag`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Scheduling Everyone Tag hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:644` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/feed/scheduling_everyone_tag', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityfeedupdated"></a>

## `fluent_community/feed/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed/Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:700` | `$existingFeed` (Feed|mixed)<br>`$dirty` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:761` | `$feed` (Feed|mixed)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/feed/updated', function ($existingFeed, $dirty) {
}, 10, 2);
```

<a id="fluent_communityfeedupdating_content_type_old_existingContentType"></a>

## `fluent_community/feed/updating_content_type_old_{existingContentType}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Updating Content Type Old {ExistingContentType} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:600` | `$existingFeed` (Feed|mixed)<br>`$newContentType` (mixed)<br>`$requestData` (array) |

### Example

```php
add_action('fluent_community/feed/updating_content_type_old_{existingContentType}', function ($existingFeed, $newContentType, $requestData) {
}, 10, 3);
```

<a id="fluent_communityfeeds_query"></a>

## `fluent_community/feeds_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feeds Query hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:158` | `[&$feedsQuery, $request->all(), $queryArgs]` (array) |

### Example

```php
add_action('fluent_community/feeds_query', function ($all) {
}, 10, 1);
```

<a id="fluent_communityproduct_integration_feed_created"></a>

## `fluent_community/product_integration_feed_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Product Integration Feed Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:83` | `$communityIntegration->id ?? null` (mixed)<br>`$productId` (mixed) |

### Example

```php
add_action('fluent_community/product_integration_feed_created', function ($id, $productId) {
}, 10, 2);
```

<a id="fluent_communityproduct_integration_feed_updated"></a>

## `fluent_community/product_integration_feed_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Product Integration Feed Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:56` | `$integration->id` (mixed)<br>`$space->id` (Space|mixed) |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:118` | `$integration->id` (mixed)<br>`$space->id` (Space|mixed) |

### Example

```php
add_action('fluent_community/product_integration_feed_updated', function ($id, $id_2) {
}, 10, 2);
```

<a id="fluent_communityprofile_feedcreated"></a>

## `fluent_community/profile_feed/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile Feed/Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:519` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/profile_feed/created', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityspace_feedcreated"></a>

## `fluent_community/space_feed/created`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 5
- **When it fires:** Space Feed/Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:95` | `$feed` (Feed|mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:202` | `$content` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:79` | `$feed` (Feed|mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:517` | `$feed` (Feed|mixed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:493` | `$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/space_feed/created', function ($feed) {
}, 10, 1);
```

<a id="fluent_communityspace_feedemail_notify_sub_query"></a>

## `fluent_community/space_feed/email_notify_sub_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Space Feed/Email Notify Sub Query hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:65` | `[&$query, $feed, $space, $types]` (array) |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:119` | `[&$query, $feed, $space, $types]` (array) |

### Example

```php
add_action('fluent_community/space_feed/email_notify_sub_query', function ($query) {
}, 10, 1);
```

<a id="fluent_communityspace_feedupdated"></a>

## `fluent_community/space_feed/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space Feed/Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:702` | `$existingFeed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/space_feed/updated', function ($existingFeed) {
}, 10, 1);
```

