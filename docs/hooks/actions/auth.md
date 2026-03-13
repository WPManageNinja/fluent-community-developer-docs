---
title: Auth Actions
description: Auth action hooks for FluentCommunity.
---

# Auth Actions

4 unique action hooks currently map to this category, across 6 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/auth/before_auth_page_process`](#fluent_communityauthbefore_auth_page_process) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:125` |
| [`fluent_community/before_auth_form_header`](#fluent_communitybefore_auth_form_header) | Core | 3 | `fluent-community/app/Views/auth/login_form.php:3` |
| [`fluent_community/invitation_created`](#fluent_communityinvitation_created) | Core | 1 | `fluent-community/Modules/Auth/Classes/InvitationService.php:193` |
| [`fluent_community/invitation_link_created`](#fluent_communityinvitation_link_created) | Core | 1 | `fluent-community/Modules/Auth/Classes/InvitationService.php:211` |

<a id="fluent_communityauthbefore_auth_page_process"></a>

## `fluent_community/auth/before_auth_page_process`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Before Auth Page Process hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:125` | `$currentUserId` (mixed)<br>`$inviation` (mixed) |

### Example

```php
add_action('fluent_community/auth/before_auth_page_process', function ($currentUserId, $inviation) {
}, 10, 2);
```

<a id="fluent_communitybefore_auth_form_header"></a>

## `fluent_community/before_auth_form_header`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Before Auth Form Header hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/login_form.php:3` | `'login'` (mixed) |
| Core | `fluent-community/app/Views/auth/user_invitation.php:4` | `'signup'` (mixed) |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:705` | `'login'` (mixed) |

### Example

```php
add_action('fluent_community/before_auth_form_header', function ($param1) {
}, 10, 1);
```

<a id="fluent_communityinvitation_created"></a>

## `fluent_community/invitation_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Invitation Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationService.php:193` | `$inviation` (mixed) |

### Example

```php
add_action('fluent_community/invitation_created', function ($inviation) {
}, 10, 1);
```

<a id="fluent_communityinvitation_link_created"></a>

## `fluent_community/invitation_link_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Invitation Link Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationService.php:211` | `$inviation` (mixed) |

### Example

```php
add_action('fluent_community/invitation_link_created', function ($inviation) {
}, 10, 1);
```

