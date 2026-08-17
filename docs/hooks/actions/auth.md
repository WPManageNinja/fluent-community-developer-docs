---
title: Auth Actions
description: Auth action hooks for FluentCommunity.
---

# Auth Actions

5 unique action hooks currently map to this category, across 5 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/auth/before_auth_page_process`](#fluent-community-auth-before-auth-page-process) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:128` |
| [`fluent_community/auth/show_invitation_for_user`](#fluent-community-auth-show-invitation-for-user) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:270` |
| [`fluent_community/invitation_created`](#fluent-community-invitation-created) | Core | 1 | `fluent-community/Modules/Auth/Classes/InvitationService.php:193` |
| [`fluent_community/invitation_link_created`](#fluent-community-invitation-link-created) | Core | 1 | `fluent-community/Modules/Auth/Classes/InvitationService.php:211` |
| [`fluent_community/user/password_changed`](#fluent-community-user-password-changed) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:530` |

<a id="fluent-community-auth-before-auth-page-process"></a>

## `fluent_community/auth/before_auth_page_process`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:128` | `$currentUserId` (int)<br>`$inviation` (mixed) |

### Example

```php
add_action('fluent_community/auth/before_auth_page_process', function ($currentUserId, $inviation) {
}, 10, 2);
```

<a id="fluent-community-auth-show-invitation-for-user"></a>

## `fluent_community/auth/show_invitation_for_user`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:270` | `$inviation` (mixed)<br>`$frameData` (mixed) |

### Example

```php
add_action('fluent_community/auth/show_invitation_for_user', function ($inviation, $frameData) {
}, 10, 2);
```

<a id="fluent-community-invitation-created"></a>

## `fluent_community/invitation_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationService.php:193` | `$inviation` (mixed) |

### Example

```php
add_action('fluent_community/invitation_created', function ($inviation) {
}, 10, 1);
```

<a id="fluent-community-invitation-link-created"></a>

## `fluent_community/invitation_link_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationService.php:211` | `$inviation` (mixed) |

### Example

```php
add_action('fluent_community/invitation_link_created', function ($inviation) {
}, 10, 1);
```

<a id="fluent-community-user-password-changed"></a>

## `fluent_community/user/password_changed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:530` | `$user->ID` (int) |

### Example

```php
add_action('fluent_community/user/password_changed', function ($id) {
}, 10, 1);
```

