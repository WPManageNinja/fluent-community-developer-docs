---
title: Spaces Actions
description: Spaces action hooks for FluentCommunity.
---

# Spaces Actions

10 unique action hooks currently map to this category, across 22 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/space`](#fluent-community-space) | Core | 3 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:420` |
| [`fluent_community/space/before_delete`](#fluent-community-space-before-delete) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:567` |
| [`fluent_community/space/created`](#fluent-community-space-created) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:142` |
| [`fluent_community/space/deleted`](#fluent-community-space-deleted) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:584` |
| [`fluent_community/space/join_requested`](#fluent-community-space-join-requested) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:518` |
| [`fluent_community/space/joined`](#fluent-community-space-joined) | Core <span class="edition-note">(also fired by Pro)</span> | 6 | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:245` |
| [`fluent_community/space/member/role_updated`](#fluent-community-space-member-role-updated) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:637` |
| [`fluent_community/space/update_meta_settings_{metaProvider}`](#fluent-community-space-update-meta-settings-metaProvider) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:372` |
| [`fluent_community/space/updated`](#fluent-community-space-updated) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:366` |
| [`fluent_community/space/user_left`](#fluent-community-space-user-left) | Core <span class="edition-note">(also fired by Pro)</span> | 4 | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:365` |

<a id="fluent-community-space"></a>

## `fluent_community/space`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:420` | `&$space` (Space) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:242` | `&$space` (Space) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:267` | `&$space` (Space) |

### Example

```php
add_action('fluent_community/space', function (&$space) {
}, 10, 1);
```

<a id="fluent-community-space-before-delete"></a>

## `fluent_community/space/before_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:567` | `$space` (Space) |

### Example

```php
add_action('fluent_community/space/before_delete', function ($space) {
}, 10, 1);
```

<a id="fluent-community-space-created"></a>

## `fluent_community/space/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs after a new space is created, its images claimed, its creator attached as admin and its topics synced.

Only fires for spaces created through `SpaceController::create()`; spaces produced by migrations, seeders or direct model writes do not reach it. The second argument is the sanitised request payload, which carries fields such as `topic_ids` and image URLs that are not columns on the model.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\Space` | The newly created space. |
| 2 | `$data` | `array` | The sanitised creation payload from the request. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:142` | `$space` (Space)<br>`$data` (mixed) |

### Example

```php
add_action('fluent_community/space/created', function ($space, $data) {
}, 10, 2);
```

**Related:** [`fluent_community/space/updated`](#fluent-community-space-updated)

<a id="fluent-community-space-deleted"></a>

## `fluent_community/space/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:584` | `$spaceId` (int) |

### Example

```php
add_action('fluent_community/space/deleted', function ($spaceId) {
}, 10, 1);
```

<a id="fluent-community-space-join-requested"></a>

## `fluent_community/space/join_requested`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:518` | `$space` (Space)<br>`$user->ID` (int)<br>`'self'` (string) |

### Example

```php
add_action('fluent_community/space/join_requested', function ($space, $id, $param3) {
}, 10, 3);
```

<a id="fluent-community-space-joined"></a>

## `fluent_community/space/joined`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 6
- **When it fires:** Fires once a user holds an active membership row in a community space.

Course-type spaces never reach this hook — `Helper::addToSpace()` routes them to `fluent_community/course/enrolled` instead. It also does not fire for join requests that land in `pending`; those fire `fluent_community/space/join_requested`, and the later approval fires this hook. Only the `Helper::addToSpace()` path supplies the fourth argument, and only when a membership row was genuinely created, so treat `$created` as optional.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\Space` | The space that was joined. |
| 2 | `$userId` | `int` | WordPress user ID of the new member. |
| 3 | `$by` | `string` | How the membership came about: `self`, `by_admin`, `automation`, or an integration key. |
| 4 | `$created` | `\FluentCommunity\App\Models\SpaceUserPivot` | The newly created membership row. Optional — omitted when an existing pending or inactive row was reactivated. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:245` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:520` | `$space` (Space)<br>`$user->ID` (int)<br>`'self'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:651` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:669` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Services/Helper.php:1757` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1781` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed)<br>`$created` (mixed) |

### Example

```php
add_action('fluent_community/space/joined', function ($space, $userId, $by, $created) {
}, 10, 4);
```

**Related:** [`fluent_community/space/user_left`](#fluent-community-space-user-left) · [`fluent_community/course/enrolled`](#fluent-community-course-enrolled)

<a id="fluent-community-space-member-role-updated"></a>

## `fluent_community/space/member/role_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Runs after an existing member's role within a space has been changed and saved.

Fires from the admin member-management endpoint only. When a pending member is approved with a non-default role, it fires straight after `fluent_community/space/joined` for the same user, so a promotion-on-approval reaches both hooks. The pivot is passed rather than the user, so read `$pivot->user_id` and `$pivot->role`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\Space` | The space whose membership changed. |
| 2 | `$pivot` | `\FluentCommunity\App\Models\SpaceUserPivot` | The membership row, already saved with the new role. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:637` | `$space` (Space)<br>`$pivot` (mixed) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:654` | `$space` (Space)<br>`$pivot` (mixed) |

### Example

```php
add_action('fluent_community/space/member/role_updated', function ($space, $pivot) {
}, 10, 2);
```

**Related:** [`fluent_community/space/joined`](#fluent-community-space-joined)

<a id="fluent-community-space-update-meta-settings-metaProvider"></a>

## `fluent_community/space/update_meta_settings_{metaProvider}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:372` | `$metaData` (mixed)<br>`$space` (Space) |

### Example

```php
add_action('fluent_community/space/update_meta_settings_{metaProvider}', function ($metaData, $space) {
}, 10, 2);
```

<a id="fluent-community-space-updated"></a>

## `fluent_community/space/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Runs after a space is saved with changed values.

Two call sites with different second arguments: `SpaceController::update()` passes the filtered request payload, while `BaseSpace::updateCustomData()` passes the dirty attribute map. The model-level call is additionally gated on `type == 'community'`, so custom-data updates to courses, space groups and sidebar links stay silent. Check what you actually received before reading keys off the second argument.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\Space` | The space after saving. |
| 2 | `$data` | `array` | Either the request payload or the changed attributes, depending on the call site. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:366` | `$space` (Space)<br>`$data` (mixed) |
| Core | `fluent-community/app/Models/BaseSpace.php:370` | `$this` (mixed)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/space/updated', function ($space, $data) {
}, 10, 2);
```

**Related:** [`fluent_community/space/created`](#fluent-community-space-created)

<a id="fluent-community-space-user-left"></a>

## `fluent_community/space/user_left`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 4
- **When it fires:** Fires after a membership row has been removed from a community space.

Covers self-leaves, admin removals and CRM-driven removals alike; the `$by` argument tells them apart. As with joining, course-type spaces are routed elsewhere — they fire `fluent_community/course/student_left`. The pivot row is already deleted and the user's cached space list rebuilt by the time callbacks run.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\Space` | The space the user left. |
| 2 | `$userId` | `int` | WordPress user ID of the departing member. |
| 3 | `$by` | `string` | What triggered the removal: `self`, `by_admin`, or `automation`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:365` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/RemoveFromSpaceAction.php:87` | `$space` (Space)<br>`$user->ID` (int)<br>`'automation'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:706` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Services/Helper.php:1831` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |

### Example

```php
add_action('fluent_community/space/user_left', function ($space, $userId, $by) {
}, 10, 3);
```

**Related:** [`fluent_community/space/joined`](#fluent-community-space-joined)

