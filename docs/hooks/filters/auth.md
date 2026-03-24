---
title: Auth Filters
description: Auth filter hooks for FluentCommunity.
---

# Auth Filters

18 unique filter hooks currently map to this category, across 19 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/allow_auto_login_by_url`](#fluent_communityallow_auto_login_by_url) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:54` |
| [`fluent_community/auth/after_login_redirect_url`](#fluent_communityauthafter_login_redirect_url) | Core | 2 | `fluent-community/Modules/Auth/AuthModdule.php:43` |
| [`fluent_community/auth/after_login_with_invitation`](#fluent_communityauthafter_login_with_invitation) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:618` |
| [`fluent_community/auth/after_signup_redirect_url`](#fluent_communityauthafter_signup_redirect_url) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:532` |
| [`fluent_community/auth/disable_rate_limit`](#fluent_communityauthdisable_rate_limit) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:395` |
| [`fluent_community/auth/invitation`](#fluent_communityauthinvitation) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:88` |
| [`fluent_community/auth/login_fields`](#fluent_communityauthlogin_fields) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:224` |
| [`fluent_community/auth/login_url`](#fluent_communityauthlogin_url) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1249` |
| [`fluent_community/auth/lost_password_url`](#fluent_communityauthlost_password_url) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:219` |
| [`fluent_community/auth/pre_content`](#fluent_communityauthpre_content) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:232` |
| [`fluent_community/auth/registration_enabled`](#fluent_communityauthregistration_enabled) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:257` |
| [`fluent_community/auth/settings`](#fluent_communityauthsettings) | Core | 1 | `fluent-community/app/Services/AuthenticationService.php:102` |
| [`fluent_community/auth/signup_fields`](#fluent_communityauthsignup_fields) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:156` |
| [`fluent_community/auth/signup_verification_email_body`](#fluent_communityauthsignup_verification_email_body) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:302` |
| [`fluent_community/auth/signup_verification_mail_subject`](#fluent_communityauthsignup_verification_mail_subject) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:290` |
| [`fluent_community/create_invitation_link`](#fluent_communitycreate_invitation_link) | Core | 1 | `fluent-community/Modules/Auth/Classes/InvitationController.php:134` |
| [`fluent_community/get_auth_settings`](#fluent_communityget_auth_settings) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:385` |
| [`fluent_community/update_auth_settings`](#fluent_communityupdate_auth_settings) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:379` |

<a id="fluent_communityallow_auto_login_by_url"></a>

## `fluent_community/allow_auto_login_by_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Allow Auto Login By URL hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:54` | `!user_can($tagetUser, 'delete_pages')` (mixed)<br>`$tagetUser` (mixed) |

### Example

```php
add_filter('fluent_community/allow_auto_login_by_url', function ($tagetUser, $tagetUser_2) {
    return $tagetUser;
}, 10, 2);
```

<a id="fluent_communityauthafter_login_redirect_url"></a>

## `fluent_community/auth/after_login_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Auth/After Login Redirect URL hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:43` | `$redirectUrl` (mixed)<br>`$user` (mixed) |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:633` | `$redirectUrl` (mixed)<br>`$user` (mixed) |

### Example

```php
add_filter('fluent_community/auth/after_login_redirect_url', function ($redirectUrl, $user) {
    return $redirectUrl;
}, 10, 2);
```

<a id="fluent_communityauthafter_login_with_invitation"></a>

## `fluent_community/auth/after_login_with_invitation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/After Login With Invitation hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:618` | `null` (mixed)<br>`$user` (mixed)<br>`$invitationToken` (mixed) |

### Example

```php
add_filter('fluent_community/auth/after_login_with_invitation', function ($param1, $user, $invitationToken) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityauthafter_signup_redirect_url"></a>

## `fluent_community/auth/after_signup_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/After Signup Redirect URL hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:532` | `$redirectUrl` (mixed)<br>`$user` (mixed)<br>`$_REQUEST` (array) |

### Example

```php
add_filter('fluent_community/auth/after_signup_redirect_url', function ($redirectUrl, $user, $_request) {
    return $redirectUrl;
}, 10, 3);
```

<a id="fluent_communityauthdisable_rate_limit"></a>

## `fluent_community/auth/disable_rate_limit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Disable Rate Limit hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:395` | `false` (mixed) |

### Example

```php
add_filter('fluent_community/auth/disable_rate_limit', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityauthinvitation"></a>

## `fluent_community/auth/invitation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Invitation hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:88` | `null` (mixed)<br>`$inivtationToken` (mixed) |

### Example

```php
add_filter('fluent_community/auth/invitation', function ($param1, $inivtationToken) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communityauthlogin_fields"></a>

## `fluent_community/auth/login_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Login Fields hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:224` | `[ 'username' => [ 'type' => 'text', 'placeholder' => __('Your account email address', 'fluent-community'), 'label' => __('Email Address', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_user' ], 'password' => [ 'type' => 'password', 'placeholder' => __('Your account password', 'fluent-community'), 'label' => __('Password', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ] ]` (array) |

### Example

```php
add_filter('fluent_community/auth/login_fields', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityauthlogin_url"></a>

## `fluent_community/auth/login_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Login URL hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1249` | `Helper::getAuthUrl()` (mixed) |

### Example

```php
add_filter('fluent_community/auth/login_url', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityauthlost_password_url"></a>

## `fluent_community/auth/lost_password_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Lost Password URL hook emitted from the current call site.

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

<a id="fluent_communityauthpre_content"></a>

## `fluent_community/auth/pre_content`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Pre Content hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:232` | `''` (mixed)<br>`$context` (mixed)<br>`$targetForm` (mixed)<br>`$frameData` (mixed) |

### Example

```php
add_filter('fluent_community/auth/pre_content', function ($param1, $context, $targetForm, $frameData) {
    return $param1;
}, 10, 4);
```

<a id="fluent_communityauthregistration_enabled"></a>

## `fluent_community/auth/registration_enabled`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Registration Enabled hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:257` | `$enabled` (mixed) |

### Example

```php
add_filter('fluent_community/auth/registration_enabled', function ($enabled) {
    return $enabled;
}, 10, 1);
```

<a id="fluent_communityauthsettings"></a>

## `fluent_community/auth/settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Settings hook emitted from the current call site.

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

<a id="fluent_communityauthsignup_fields"></a>

## `fluent_community/auth/signup_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Signup Fields hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:156` | `[ 'full_name' => [ 'label' => __('Full name', 'fluent-community'), 'placeholder' => __('Your first & last name', 'fluent-community'), 'type' => 'text', 'required' => true, 'value' => $invitation ? Arr::get($invitation->meta, 'invitee_name') : '', 'sanitize_callback' => 'sanitize_text_field' ], 'email' => [ 'type' => 'email', 'placeholder' => __('Your email address', 'fluent-community'), 'label' => __('Email Address', 'fluent-community'), 'required' => true, 'value' => $invitation ? $invitation->message : '', 'readonly' => $invitation && $invitation->message, 'sanitize_callback' => 'sanitize_email' ], 'username' => [ 'type' => 'text', 'placeholder' => __('No space or special characters', 'fluent-community'), 'label' => __('Username', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_user' ], 'password' => [ 'type' => 'password', 'placeholder' => __('Password', 'fluent-community'), 'label' => __('Account Password', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ], 'conf_password' => [ 'type' => 'password', 'placeholder' => __('Password Confirmation', 'fluent-community'), 'label' => __('Re-type Account Password', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ], 'terms' => [ 'type' => 'inline_checkbox', 'inline_label' => self::getTermsText(), 'required' => true ] ]` (array)<br>`$invitation` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_fields', function ($meta, $invitation) {
    return $meta;
}, 10, 2);
```

<a id="fluent_communityauthsignup_verification_email_body"></a>

## `fluent_community/auth/signup_verification_email_body`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Signup Verification Email Body hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:302` | `$message` (mixed)<br>`$verifcationCode` (mixed)<br>`$formData` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_verification_email_body', function ($message, $verifcationCode, $formData) {
    return $message;
}, 10, 3);
```

<a id="fluent_communityauthsignup_verification_mail_subject"></a>

## `fluent_community/auth/signup_verification_mail_subject`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Signup Verification Mail Subject hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:290` | `sprintf(__('Your registration verification code for %s', 'fluent-community'), Arr::get($generalSettings, 'site_title'))` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_verification_mail_subject', function ($generalSettings) {
    return $generalSettings;
}, 10, 1);
```

<a id="fluent_communitycreate_invitation_link"></a>

## `fluent_community/create_invitation_link`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Create Invitation Link hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationController.php:134` | `null` (mixed)<br>`$indivatationData` (mixed) |

### Example

```php
add_filter('fluent_community/create_invitation_link', function ($param1, $indivatationData) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communityget_auth_settings"></a>

## `fluent_community/get_auth_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Get Auth Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:385` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/get_auth_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

<a id="fluent_communityupdate_auth_settings"></a>

## `fluent_community/update_auth_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Update Auth Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:379` | `$formattedSettings` (mixed) |

### Example

```php
add_filter('fluent_community/update_auth_settings', function ($formattedSettings) {
    return $formattedSettings;
}, 10, 1);
```

