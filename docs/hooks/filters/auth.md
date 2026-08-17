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
- **When it fires:** This filter is documented in wp-includes/user.php */ $illegal_user_logins = (array)apply_filters('illegal_user_logins', array()); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound if (in_array(strtolower($sanitized_user_login), array_map('strtolower', $illegal_user_logins), true)) { $errors->add('invalid_username', __('<strong>Error</strong>: Sorry, that username is not allowed.', 'fluent-community')); } } // Check the email address. if ('' === $user_email) { $errors->add('empty_email', __('<strong>Error</strong>: Please type your email address.', 'fluent-community')); } elseif (!is_email($user_email)) { $errors->add('invalid_email', __('<strong>Error</strong>: The email address is not correct.', 'fluent-community')); $user_email = ''; } elseif (email_exists($user_email)) { $errors->add( 'email_exists', __('<strong>Error:</strong> This email address is already registered. Please login or try resetting your password.', 'fluent-community') ); } do_action('register_post', $sanitized_user_login, $user_email, $errors); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound if ($errors->has_errors()) { return $errors; } if (!$user_pass) { $user_pass = wp_generate_password(8, false); } $data = [ 'user_login' => wp_slash($sanitized_user_login), 'user_email' => wp_slash($user_email), 'user_pass' => $user_pass ]; if (!empty($extraData['first_name'])) { $data['first_name'] = sanitize_text_field($extraData['first_name']); } if (!empty($extraData['last_name'])) { $data['last_name'] = sanitize_text_field($extraData['last_name']); } if (!empty($extraData['full_name']) && empty($extraData['first_name']) && empty($extraData['last_name'])) { $extraData['full_name'] = sanitize_text_field($extraData['full_name']); // extract the names $fullNameArray = explode(' ', $extraData['full_name']); $data['first_name'] = array_shift($fullNameArray); if ($fullNameArray) { $data['last_name'] = implode(' ', $fullNameArray); } else { $data['last_name'] = ''; } } if (!empty($extraData['description'])) { $data['description'] = sanitize_textarea_field($extraData['description']); } if (!empty($extraData['user_url']) && filter_var($extraData['user_url'], FILTER_VALIDATE_URL)) { $data['user_url'] = sanitize_url($extraData['user_url']); } if (!empty($extraData['role'])) { $data['role'] = $extraData['role']; } $user_id = wp_insert_user($data); if (!$user_id || is_wp_error($user_id)) { $errors->add('registerfail', __('<strong>Error</strong>: Could not register you. Please contact the site admin!', 'fluent-community') ); return $errors; } if (!empty($_COOKIE['wp_lang'])) { $wp_lang = sanitize_text_field(wp_unslash($_COOKIE['wp_lang'])); if (in_array($wp_lang, get_available_languages(), true)) { update_user_meta($user_id, 'locale', $wp_lang); // Set user locale if defined on registration. } } do_action('register_new_user', $user_id); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound return $user_id; } public static function makeLogin($user) { wp_clear_auth_cookie(); wp_set_current_user($user->ID, $user->user_login); wp_set_auth_cookie($user->ID, true, is_ssl()); $user = get_user_by('ID', $user->ID); if ($user) { do_action('wp_login', $user->user_login, $user); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound } return $user; } public static function isFluentAuthAvailable() { if (defined('FLUENT_AUTH_VERSION') && FLUENT_AUTH_VERSION) { return (new \FluentAuth\App\Hooks\Handlers\CustomAuthHandler())->isEnabled(); } return false; } public static function getTermsText() { $policyUrl = apply_filters('fluent_community/terms_policy_url', get_privacy_policy_url()); $termsText = __('I agree to the terms and conditions', 'fluent-community'); if ($policyUrl) { /* translators: %1$s is replaced by the text "terms and conditions", %2$s is replaced by the text "to the terms and conditions" */ $termsText = sprintf(__('I agree to the %1$s terms and conditions %2$s', 'fluent-community'), '<a rel="noopener" href="' . esc_url($policyUrl) . '" target="_blank">', '</a>'); } return $termsText; } public static function getFormFields($invitation = null) { $fields = apply_filters('fluent_community/auth/signup_fields', [ 'full_name' => [ 'label' => __('Full name', 'fluent-community'), 'placeholder' => __('Your first & last name', 'fluent-community'), 'type' => 'text', 'required' => true, 'value' => $invitation ? Arr::get($invitation->meta, 'invitee_name') : '', 'sanitize_callback' => 'sanitize_text_field' ], 'email' => [ 'type' => 'email', 'placeholder' => __('Your email address', 'fluent-community'), 'label' => __('Email Address', 'fluent-community'), 'required' => true, 'value' => $invitation ? $invitation->message : '', 'readonly' => $invitation && $invitation->message, 'sanitize_callback' => 'sanitize_email' ], 'username' => [ 'type' => 'text', 'placeholder' => __('No space or special characters', 'fluent-community'), 'label' => __('Username', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_user' ], 'password' => [ 'type' => 'password', 'placeholder' => __('Password', 'fluent-community'), 'label' => __('Account Password', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ], 'conf_password' => [ 'type' => 'password', 'placeholder' => __('Password Confirmation', 'fluent-community'), 'label' => __('Re-type Account Password', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ], 'terms' => [ 'type' => 'inline_checkbox', 'inline_label' => self::getTermsText(), 'required' => true ] ], $invitation); if (!self::isPasswordConfRequired()) { unset($fields['conf_password']); } return $fields; } public static function getLostPasswordUrl($redirectUrl = '') { if (self::isFluentAuthAvailable()) { $url = add_query_arg([ 'form' => 'reset_password' ], Helper::getAuthUrl()); } else { $url = wp_lostpassword_url($redirectUrl);; } return apply_filters('fluent_community/auth/lost_password_url', $url); } public static function getLoginFormFields() { return apply_filters('fluent_community/auth/login_fields', [ 'username' => [ 'type' => 'text', 'placeholder' => __('Your account email address', 'fluent-community'), 'label' => __('Email Address', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_user' ], 'password' => [ 'type' => 'password', 'placeholder' => __('Your account password', 'fluent-community'), 'label' => __('Password', 'fluent-community'), 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ] ]); } public static function isPasswordConfRequired() { $isRequired = apply_filters_deprecated('fluent_community/autg/password_confirmation', [true], '2.7.8', 'fluent_community/auth/password_confirmation'); return apply_filters('fluent_community/auth/password_confirmation', $isRequired); } public static function isRegistrationEnabled() { $enabled = !!get_option('users_can_register'); if (!$enabled) { $generalSettinsg = Helper::generalSettings(); $enabled = $generalSettinsg['explicit_registration'] !== 'no'; } return apply_filters('fluent_community/auth/registration_enabled', $enabled); } public static function isTwoFactorEnabled() { // fluent_auth/verify_signup_email is kept for backward compatibility with FluentAuth-targeted snippets $enabled = apply_filters('fluent_auth/verify_signup_email', true); return apply_filters('fluent_community/auth/two_factor_enabled', $enabled); } public static function get2FaRegistrationCodeForm($formData) { $generalSettings = Helper::generalSettings(); try { $verifcationCode = str_pad((string) random_int(100123, 900987), 6, '0', STR_PAD_LEFT); } catch (\Exception $e) { $verifcationCode = str_pad((string) wp_rand(100123, 900987), 6, '0', STR_PAD_LEFT); } // Hash the code $codeHash = wp_hash_password($verifcationCode); // Create a token with the email and code hash $data = [ 'email' => $formData['email'], 'code_hash' => $codeHash, 'expires' => time() + 600 // 10 minutes expiry ]; $token = base64_encode(json_encode($data)); // Sign the token $signature = hash_hmac('sha256', $token, SECURE_AUTH_KEY); $signedToken = $token . '.' . $signature; /* translators: %s is replaced by the title of the site

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

