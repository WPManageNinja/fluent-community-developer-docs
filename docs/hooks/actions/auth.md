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
- **When it fires:** Fires on the auth page after the redirect shortcuts have been evaluated but before a form is chosen.

By the time it runs, an already-signed-in visitor without an invitation has been redirected away and an auto-accepted invitation has been handled, so reaching this hook means a form is about to be rendered. It is the earliest place to short-circuit the auth page with a redirect and an `exit()` of your own. Both arguments can be empty: `$currentUserId` is `0` for a guest and `$invitation` is `null` unless a valid `invitation_token` was supplied.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$currentUserId` | `int` | The signed-in user ID, or `0`. |
| 2 | `$invitation` | `\FluentCommunity\Modules\Auth\Classes\Invitation` | The resolved, still-valid invitation, or `null`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:128` | `$currentUserId` (int)<br>`$inviation` (mixed) |

### Example

```php
add_action('fluent_community/auth/before_auth_page_process', function ($currentUserId, $invitation) {
}, 10, 2);
```

**Related:** [`fluent_community/auth/pre_content`](/hooks/filters/auth#fluent-community-auth-pre-content) · [`fluent_community/auth/invitation`](/hooks/filters/auth#fluent-community-auth-invitation)

<a id="fluent-community-auth-show-invitation-for-user"></a>

## `fluent_community/auth/show_invitation_for_user`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Renders the accept-invitation screen for a signed-in user who arrived with a valid invitation.

Reached only when the visitor is already logged in, the invitation is valid, and either it carries no email or its email matches the signed-in account. Core attaches `InvitationHandler::showCommunityOnBoard()`, so a callback of your own appends to that screen rather than replacing it. Output is echoed; it is drawn inside the auth page body from `fluent_community/headless/content`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$invitation` | `\FluentCommunity\Modules\Auth\Classes\Invitation` | The invitation being accepted. |
| 2 | `$frameData` | `array` | Auth page frame data: `logo`, `title`, `description`, `button_label`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:270` | `$inviation` (mixed)<br>`$frameData` (mixed) |

### Example

```php
add_action('fluent_community/auth/show_invitation_for_user', function ($invitation, $frameData) {
}, 10, 2);
```

**Related:** [`fluent_community/auth/invitation`](/hooks/filters/auth#fluent-community-auth-invitation) · [`fluent_community/headless/content`](/hooks/actions/rendering#fluent-community-headless-content)

<a id="fluent-community-invitation-created"></a>

## `fluent_community/invitation_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after an email invitation to a space or course has been stored.

Fired from `InvitationService::invite()` once every duplicate and membership check has passed, and before the invitation email is sent — so a callback that throws will leave a stored invitation with no email behind it. The invitee's address is in `message` and the token in `message_rendered`. Link invitations take a different path and fire `fluent_community/invitation_link_created` instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$invitation` | `\FluentCommunity\Modules\Auth\Classes\Invitation` | The stored invitation; `status` is `pending`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationService.php:193` | `$inviation` (mixed) |

### Example

```php
add_action('fluent_community/invitation_created', function ($invitation) {
}, 10, 1);
```

**Related:** [`fluent_community/invitation_link_created`](#fluent-community-invitation-link-created) · [`fluent_community/create_invitation_link`](/hooks/filters/auth#fluent-community-create-invitation-link)

<a id="fluent-community-invitation-link-created"></a>

## `fluent_community/invitation_link_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a shareable invitation link has been created for a space.

Link invitations differ from email ones: `message` is empty, `status` is `active` rather than `pending`, and `meta` carries the `title`, `limit` and `expire_date` chosen by the moderator. No email is sent. The redemption counter is kept in the row's `reactions_count` column, which is incremented each time someone signs up through the link.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$invitation` | `\FluentCommunity\Modules\Auth\Classes\Invitation` | The stored link invitation. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationService.php:211` | `$inviation` (mixed) |

### Example

```php
add_action('fluent_community/invitation_link_created', function ($invitation) {
}, 10, 1);
```

**Related:** [`fluent_community/invitation_created`](#fluent-community-invitation-created) · [`fluent_community/create_invitation_link`](/hooks/filters/auth#fluent-community-create-invitation-link)

<a id="fluent-community-user-password-changed"></a>

## `fluent_community/user/password_changed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a member changes their own password from the portal profile settings.

Only the self-service change fires it; a password reset through WordPress or an administrator edit does not. It runs after `wp_set_password()` has destroyed every session and the controller has re-issued the auth cookie for the current one, so the user is still signed in and fresh REST and AJAX nonces are minted straight after. Only the user ID is passed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$userId` | `int` | WordPress user ID whose password changed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:530` | `$user->ID` (int) |

### Example

```php
add_action('fluent_community/user/password_changed', function ($userId) {
}, 10, 1);
```

