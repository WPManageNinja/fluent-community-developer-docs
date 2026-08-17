---
title: Auth Filters
description: Auth filter hooks for FluentCommunity.
---

# Auth Filters

23 unique filter hooks currently map to this category, across 24 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/allow_auto_login_by_url`](#fluent-community-allow-auto-login-by-url) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:51` |
| [`fluent_community/autg/password_confirmation`](#fluent-community-autg-password-confirmation) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:244` |
| [`fluent_community/auth/after_login_redirect_url`](#fluent-community-auth-after-login-redirect-url) | Core | 2 | `fluent-community/Modules/Auth/AuthModdule.php:40` |
| [`fluent_community/auth/after_login_with_invitation`](#fluent-community-auth-after-login-with-invitation) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:635` |
| [`fluent_community/auth/after_signup_redirect_url`](#fluent-community-auth-after-signup-redirect-url) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:543` |
| [`fluent_community/auth/disable_rate_limit`](#fluent-community-auth-disable-rate-limit) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:417` |
| [`fluent_community/auth/invitation`](#fluent-community-auth-invitation) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:87` |
| [`fluent_community/auth/login_fields`](#fluent-community-auth-login-fields) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:224` |
| [`fluent_community/auth/login_url`](#fluent-community-auth-login-url) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1295` |
| [`fluent_community/auth/lost_password_url`](#fluent-community-auth-lost-password-url) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:219` |
| [`fluent_community/auth/password_confirmation`](#fluent-community-auth-password-confirmation) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:246` |
| [`fluent_community/auth/pre_content`](#fluent-community-auth-pre-content) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:235` |
| [`fluent_community/auth/registration_enabled`](#fluent-community-auth-registration-enabled) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:259` |
| [`fluent_community/auth/settings`](#fluent-community-auth-settings) | Core | 1 | `fluent-community/app/Services/AuthenticationService.php:102` |
| [`fluent_community/auth/signup_fields`](#fluent-community-auth-signup-fields) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:156` |
| [`fluent_community/auth/signup_verification_email_body`](#fluent-community-auth-signup-verification-email-body) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:307` |
| [`fluent_community/auth/signup_verification_mail_subject`](#fluent-community-auth-signup-verification-mail-subject) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:295` |
| [`fluent_community/auth/two_factor_enabled`](#fluent-community-auth-two-factor-enabled) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:267` |
| [`fluent_community/create_invitation_link`](#fluent-community-create-invitation-link) | Core | 1 | `fluent-community/Modules/Auth/Classes/InvitationController.php:133` |
| [`fluent_community/default_redirect_url`](#fluent-community-default-redirect-url) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:711` |
| [`fluent_community/get_auth_settings`](#fluent-community-get-auth-settings) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:376` |
| [`fluent_community/terms_policy_url`](#fluent-community-terms-policy-url) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:143` |
| [`fluent_community/update_auth_settings`](#fluent-community-update-auth-settings) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:399` |

<a id="fluent-community-allow-auto-login-by-url"></a>

## `fluent_community/allow_auto_login_by_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:51` | `!user_can($tagetUser, 'delete_pages')` (mixed)<br>`$tagetUser` (User) |

### Example

```php
add_filter('fluent_community/allow_auto_login_by_url', function ($tagetUser, $tagetUser_2) {
    return $tagetUser;
}, 10, 2);
```

<a id="fluent-community-autg-password-confirmation"></a>

## `fluent_community/autg/password_confirmation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

::: warning Deprecated
This hook is fired through `apply_filters_deprecated()` as of 2.7.8. Use `fluent_community/auth/password_confirmation` instead.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:244` | `true` (bool) |

### Example

```php
add_filter('fluent_community/autg/password_confirmation', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-auth-after-login-redirect-url"></a>

## `fluent_community/auth/after_login_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:40` | `$redirectUrl` (mixed)<br>`$user` (User) |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:650` | `$redirectUrl` (mixed)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/auth/after_login_redirect_url', function ($redirectUrl, $user) {
    return $redirectUrl;
}, 10, 2);
```

<a id="fluent-community-auth-after-login-with-invitation"></a>

## `fluent_community/auth/after_login_with_invitation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:635` | `null` (mixed)<br>`$user` (User)<br>`$invitationToken` (mixed) |

### Example

```php
add_filter('fluent_community/auth/after_login_with_invitation', function ($param1, $user, $invitationToken) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-auth-after-signup-redirect-url"></a>

## `fluent_community/auth/after_signup_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:543` | `$redirectUrl` (mixed)<br>`$user` (User)<br>`$_REQUEST` (array) |

### Example

```php
add_filter('fluent_community/auth/after_signup_redirect_url', function ($redirectUrl, $user, $_request) {
    return $redirectUrl;
}, 10, 3);
```

<a id="fluent-community-auth-disable-rate-limit"></a>

## `fluent_community/auth/disable_rate_limit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:417` | `false` (bool) |

### Example

```php
add_filter('fluent_community/auth/disable_rate_limit', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-auth-invitation"></a>

## `fluent_community/auth/invitation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:87` | `null` (mixed)<br>`$inivtationToken` (mixed) |

### Example

```php
add_filter('fluent_community/auth/invitation', function ($param1, $inivtationToken) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-auth-login-fields"></a>

## `fluent_community/auth/login_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:224` | `array (2 keys: username, password)` (array) |

### Example

```php
add_filter('fluent_community/auth/login_fields', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-auth-login-url"></a>

## `fluent_community/auth/login_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1295` | `Helper::getAuthUrl()` (mixed) |

### Example

```php
add_filter('fluent_community/auth/login_url', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-auth-lost-password-url"></a>

## `fluent_community/auth/lost_password_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:219` | `$url` (mixed) |

### Example

```php
add_filter('fluent_community/auth/lost_password_url', function ($url) {
    return $url;
}, 10, 1);
```

<a id="fluent-community-auth-password-confirmation"></a>

## `fluent_community/auth/password_confirmation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:246` | `$isRequired` (mixed) |

### Example

```php
add_filter('fluent_community/auth/password_confirmation', function ($isRequired) {
    return $isRequired;
}, 10, 1);
```

<a id="fluent-community-auth-pre-content"></a>

## `fluent_community/auth/pre_content`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:235` | `''` (string)<br>`$context` (mixed)<br>`$targetForm` (mixed)<br>`$frameData` (mixed) |

### Example

```php
add_filter('fluent_community/auth/pre_content', function ($param1, $context, $targetForm, $frameData) {
    return $param1;
}, 10, 4);
```

<a id="fluent-community-auth-registration-enabled"></a>

## `fluent_community/auth/registration_enabled`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:259` | `$enabled` (mixed) |

### Example

```php
add_filter('fluent_community/auth/registration_enabled', function ($enabled) {
    return $enabled;
}, 10, 1);
```

<a id="fluent-community-auth-settings"></a>

## `fluent_community/auth/settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/AuthenticationService.php:102` | `$authSettings` (mixed) |

### Example

```php
add_filter('fluent_community/auth/settings', function ($authSettings) {
    return $authSettings;
}, 10, 1);
```

<a id="fluent-community-auth-signup-fields"></a>

## `fluent_community/auth/signup_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:156` | `array (6 keys: full_name, email, username, …)` (array)<br>`$invitation` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_fields', function ($param1, $invitation) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-auth-signup-verification-email-body"></a>

## `fluent_community/auth/signup_verification_email_body`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:307` | `$message` (mixed)<br>`$verifcationCode` (mixed)<br>`$formData` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_verification_email_body', function ($message, $verifcationCode, $formData) {
    return $message;
}, 10, 3);
```

<a id="fluent-community-auth-signup-verification-mail-subject"></a>

## `fluent_community/auth/signup_verification_mail_subject`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:295` | `sprintf(__('Your registration verification code for %s', 'fluent-community'),…` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_verification_mail_subject', function ($generalSettings) {
    return $generalSettings;
}, 10, 1);
```

<a id="fluent-community-auth-two-factor-enabled"></a>

## `fluent_community/auth/two_factor_enabled`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:267` | `$enabled` (mixed) |

### Example

```php
add_filter('fluent_community/auth/two_factor_enabled', function ($enabled) {
    return $enabled;
}, 10, 1);
```

<a id="fluent-community-create-invitation-link"></a>

## `fluent_community/create_invitation_link`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationController.php:133` | `null` (mixed)<br>`$indivatationData` (mixed) |

### Example

```php
add_filter('fluent_community/create_invitation_link', function ($param1, $indivatationData) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-default-redirect-url"></a>

## `fluent_community/default_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:711` | `Helper::baseUrl()` (mixed) |

### Example

```php
add_filter('fluent_community/default_redirect_url', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-get-auth-settings"></a>

## `fluent_community/get_auth_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:376` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/get_auth_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

<a id="fluent-community-terms-policy-url"></a>

## `fluent_community/terms_policy_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:143` | `get_privacy_policy_url()` (mixed) |

### Example

```php
add_filter('fluent_community/terms_policy_url', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-update-auth-settings"></a>

## `fluent_community/update_auth_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the portal authentication settings just before they are saved.

Runs after AuthenticationService::formatAuthSettings() has normalised the payload and before it is written to the option and primed into the week-long cache. The login and signup form field lists are attached to the response *after* this filter, so they are not visible to a callback.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | The formatted auth settings. |

**Return:** The settings array to persist.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:399` | `$formattedSettings` (mixed) |

### Example

```php
add_filter('fluent_community/update_auth_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

