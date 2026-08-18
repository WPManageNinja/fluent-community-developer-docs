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
| [`fluent_community/auth/after_login_with_invitation`](#fluent-community-auth-after-login-with-invitation) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:638` |
| [`fluent_community/auth/after_signup_redirect_url`](#fluent-community-auth-after-signup-redirect-url) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:546` |
| [`fluent_community/auth/disable_rate_limit`](#fluent-community-auth-disable-rate-limit) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:411` |
| [`fluent_community/auth/invitation`](#fluent-community-auth-invitation) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:87` |
| [`fluent_community/auth/login_fields`](#fluent-community-auth-login-fields) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:224` |
| [`fluent_community/auth/login_url`](#fluent-community-auth-login-url) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1307` |
| [`fluent_community/auth/lost_password_url`](#fluent-community-auth-lost-password-url) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:219` |
| [`fluent_community/auth/password_confirmation`](#fluent-community-auth-password-confirmation) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:246` |
| [`fluent_community/auth/pre_content`](#fluent-community-auth-pre-content) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:235` |
| [`fluent_community/auth/registration_enabled`](#fluent-community-auth-registration-enabled) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:259` |
| [`fluent_community/auth/settings`](#fluent-community-auth-settings) | Core | 1 | `fluent-community/app/Services/AuthenticationService.php:102` |
| [`fluent_community/auth/signup_fields`](#fluent-community-auth-signup-fields) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:156` |
| [`fluent_community/auth/signup_verification_email_body`](#fluent-community-auth-signup-verification-email-body) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:303` |
| [`fluent_community/auth/signup_verification_mail_subject`](#fluent-community-auth-signup-verification-mail-subject) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:291` |
| [`fluent_community/auth/two_factor_enabled`](#fluent-community-auth-two-factor-enabled) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:267` |
| [`fluent_community/create_invitation_link`](#fluent-community-create-invitation-link) | Core | 1 | `fluent-community/Modules/Auth/Classes/InvitationController.php:133` |
| [`fluent_community/default_redirect_url`](#fluent-community-default-redirect-url) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:714` |
| [`fluent_community/get_auth_settings`](#fluent-community-get-auth-settings) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:376` |
| [`fluent_community/terms_policy_url`](#fluent-community-terms-policy-url) | Core | 1 | `fluent-community/Modules/Auth/AuthHelper.php:143` |
| [`fluent_community/update_auth_settings`](#fluent-community-update-auth-settings) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:399` |

<a id="fluent-community-allow-auto-login-by-url"></a>

## `fluent_community/allow_auto_login_by_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether a signed URL may log its recipient in automatically.

Signed links are what notification and digest emails use: they carry `fcom_action=signed_url` and a hashed, expiring token that resolves to a user. The default deliberately refuses accounts that can `delete_pages` — editors and administrators — so a forwarded email cannot hand over a privileged session. Returning `true` unconditionally removes that protection. The visitor is redirected with the parameters stripped whether or not the login happened.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$willAutoLogin` | `bool` | Whether to sign the user in; `false` for users who can `delete_pages`. |
| 2 | `$targetUser` | `\WP_User` | The user the signed URL resolved to. |

**Return:** `bool` — evaluated for truthiness.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:51` | `!user_can($tagetUser, 'delete_pages')` (mixed)<br>`$tagetUser` (User) |

### Example

```php
add_filter('fluent_community/allow_auto_login_by_url', function ($willAutoLogin, $targetUser) {
    return $willAutoLogin;
}, 10, 2);
```

**Related:** [`fluent_community/portal_action_{action}`](/hooks/actions/rendering#fluent-community-portal-action-action)

<a id="fluent-community-autg-password-confirmation"></a>

## `fluent_community/autg/password_confirmation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Deprecated misspelling of `fluent_community/auth/password_confirmation`.

::: warning Deprecated
This hook is fired through `apply_filters_deprecated()` as of 2.7.8. Use `fluent_community/auth/password_confirmation` instead.
:::

Kept alive through `apply_filters_deprecated()` and marked deprecated since 2.7.8, so a callback still runs but raises a deprecation notice when `WP_DEBUG` is on. Its return value becomes the input to the correctly spelled filter, which therefore has the final say. Move existing callbacks across.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$isRequired` | `bool` | Whether password confirmation is required. `true` by default. |

**Return:** `bool` — passed on as the default for `fluent_community/auth/password_confirmation`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:244` | `true` (bool) |

### Example

```php
add_filter('fluent_community/autg/password_confirmation', function ($isRequired) {
    return $isRequired;
}, 10, 1);
```

**Related:** [`fluent_community/auth/password_confirmation`](#fluent-community-auth-password-confirmation)

<a id="fluent-community-auth-after-login-redirect-url"></a>

## `fluent_community/auth/after_login_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters where a member lands after signing in through the community auth page.

Applied at two call sites that reach different sign-in flows: the plugin's own AJAX login handler, and a bridge on `fluent_auth/login_redirect_url` that only fires when the request carries `is_fcom_auth` and `fcom_redirect`. Logins that happen anywhere else on the site never reach it. The incoming value has already been through `wp_validate_redirect()` against the portal base, but your return value is not re-validated on the AJAX path — it is handed to the browser as-is.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$redirectUrl` | `string` | The resolved destination, the portal base by default. |
| 2 | `$user` | `\WP_User` | The user who signed in. |

**Return:** `string` — an absolute URL.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:40` | `$redirectUrl` (mixed)<br>`$user` (User) |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:653` | `$redirectUrl` (mixed)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/auth/after_login_redirect_url', function ($redirectUrl, $user) {
    return $redirectUrl;
}, 10, 2);
```

**Related:** [`fluent_community/auth/after_signup_redirect_url`](#fluent-community-auth-after-signup-redirect-url) · [`fluent_community/auth/after_login_with_invitation`](#fluent-community-auth-after-login-with-invitation)

<a id="fluent-community-auth-after-login-with-invitation"></a>

## `fluent_community/auth/after_login_with_invitation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters where a member is sent after logging in with an invitation token attached.

Core's handler does the real work here: it validates the token, adds the user to the invited space as `member` or `student`, marks the invitation accepted and returns the space permalink. The result is only adopted when it is truthy and not a `WP_Error`, so returning `null` leaves the ordinary redirect in place. It runs before `fluent_community/auth/after_login_redirect_url`, which sees the resulting URL and can still change it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$redirectUrl` | `mixed` | `null` on entry. |
| 2 | `$user` | `\WP_User` | The user who just signed in. |
| 3 | `$invitationToken` | `string` | The submitted invitation token. |

**Return:** `string` — a URL, or `null`/`WP_Error` to fall back to the default redirect.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:638` | `null` (mixed)<br>`$user` (User)<br>`$invitationToken` (mixed) |

### Example

```php
add_filter('fluent_community/auth/after_login_with_invitation', function ($redirectUrl, $user, $invitationToken) {
    return $redirectUrl;
}, 10, 3);
```

**Related:** [`fluent_community/auth/after_login_redirect_url`](#fluent-community-auth-after-login-redirect-url) · [`fluent_community/auth/invitation`](#fluent-community-auth-invitation)

<a id="fluent-community-auth-after-signup-redirect-url"></a>

## `fluent_community/auth/after_signup_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters where a new member lands after completing registration.

Core attaches the invitation handler here, which — when the request carried a valid `invitation_token` — enrols the new account in the invited space, marks the invitation accepted and redirects to the space instead. The third argument is the raw `$_REQUEST` array, unsanitised. The URL is returned to the front end both as `redirect_url` and inside the success HTML, so it is used twice.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$redirectUrl` | `string` | The destination, the portal base or a validated `redirect_to`. |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The newly registered user, with an XProfile already synced. |
| 3 | `$postedData` | `array` | The raw `$_REQUEST` payload, including `invitation_token` when present. |

**Return:** `string` — an absolute URL.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:546` | `$redirectUrl` (mixed)<br>`$user` (User)<br>`$_REQUEST` (array) |

### Example

```php
add_filter('fluent_community/auth/after_signup_redirect_url', function ($redirectUrl, $user, $postedData) {
    return $redirectUrl;
}, 10, 3);
```

**Related:** [`fluent_community/auth/after_login_redirect_url`](#fluent-community-auth-after-login-redirect-url)

<a id="fluent-community-auth-disable-rate-limit"></a>

## `fluent_community/auth/disable_rate_limit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the login and signup rate limit is bypassed for this request.

The limit is ten attempts per IP address per five minutes, tracked in a transient and shared between the login and registration endpoints. Returning `true` skips the check and the counter increment entirely, so it also stops the request contributing to a later limit. Nothing about the request is passed — inspect `$_SERVER` or the request yourself if you want to scope the exemption.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$disabled` | `bool` | Whether to skip rate limiting. `false` by default. |

**Return:** `bool` — evaluated for truthiness.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:411` | `false` (bool) |

### Example

```php
add_filter('fluent_community/auth/disable_rate_limit', function ($disabled) {
    return $disabled;
}, 10, 1);
```

<a id="fluent-community-auth-invitation"></a>

## `fluent_community/auth/invitation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Resolves an invitation token from the URL into an invitation record.

Starts as `null`; core's `InvitationHandler` answers it with the matching `pending` or `active` row. Whatever is returned must expose `isValid()` — the caller invokes it immediately and discards anything that fails, then reads `message` (the invited email) and `post_id` (the space) off it. This is the hook for backing invitations with your own storage.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$invitation` | `mixed` | The resolved invitation, `null` before core answers. |
| 2 | `$token` | `string` | The raw `invitation_token` query parameter. |

**Return:** `\FluentCommunity\Modules\Auth\Classes\Invitation` or `null` — an object with an `isValid()` method, or `null` for an unknown token.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:87` | `null` (mixed)<br>`$inivtationToken` (mixed) |

### Example

```php
add_filter('fluent_community/auth/invitation', function ($invitation, $token) {
    return $invitation;
}, 10, 2);
```

**Related:** [`fluent_community/auth/show_invitation_for_user`](/hooks/actions/auth#fluent-community-auth-show-invitation-for-user) · [`fluent_community/auth/after_login_with_invitation`](#fluent-community-auth-after-login-with-invitation)

<a id="fluent-community-auth-login-fields"></a>

## `fluent_community/auth/login_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the field definitions for the plugin's own login form.

Narrower than it looks: the built-in login form is only used when FluentAuth is not active, since otherwise the page renders the `[fluent_auth_login]` shortcode instead. The fields also reach the admin settings screen through `fluent_community/get_auth_settings`. Unlike the signup fields these are not used to derive validation — the handler validates `log` and `pwd` from the WordPress login form directly.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fields` | `array` | Field definitions keyed by name: `username` and `password`. |

**Return:** `array` — the field map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:224` | `array (2 keys: username, password)` (array) |

### Example

```php
add_filter('fluent_community/auth/login_fields', function ($fields) {
    return $fields;
}, 10, 1);
```

**Related:** [`fluent_community/auth/signup_fields`](#fluent-community-auth-signup-fields)

<a id="fluent-community-auth-login-url"></a>

## `fluent_community/auth/login_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the URL the portal's login and signup buttons point at.

Wraps `Helper::getAuthUrl()`, which already honours the administrator-configured custom auth URL. It feeds the header login button, the header data and the logged-out redirect, so it changes where visitors are sent but not which pages are protected — the gate itself is `Helper::isPublicAccessible()`. Pointing it back into the portal risks a redirect loop; core guards against that only for the stored setting, not for this filter.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$authUrl` | `string` | The resolved auth page URL. |

**Return:** `string` — an absolute URL.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1307` | `Helper::getAuthUrl()` (mixed) |

### Example

```php
add_filter('fluent_community/auth/login_url', function ($authUrl) {
    return $authUrl;
}, 10, 1);
```

**Related:** [`fluent_community/portal/not_logged_in`](/hooks/actions/rendering#fluent-community-portal-not-logged-in) · [`fluent_community/auth/lost_password_url`](#fluent-community-auth-lost-password-url)

<a id="fluent-community-auth-lost-password-url"></a>

## `fluent_community/auth/lost_password_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the "Lost your password?" destination on the community login form.

The default depends on FluentAuth: with it active the link stays on the community auth page with `form=reset_password`, otherwise it is `wp_lostpassword_url()` with a redirect back. Note the redirect argument is only applied on the WordPress branch — the FluentAuth URL carries no redirect. The native login template renders `wp_lostpassword_url()` directly and does not use this filter.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$url` | `string` | The reset-password URL for the current configuration. |

**Return:** `string` — an absolute URL.

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

**Related:** [`fluent_community/auth/login_url`](#fluent-community-auth-login-url)

<a id="fluent-community-auth-password-confirmation"></a>

## `fluent_community/auth/password_confirmation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the registration form asks for the password twice.

Returning `false` drops the `conf_password` field from the form and relaxes the validation rule on `password` accordingly, so the two stay in step. The value passed in is itself the result of the deprecated `fluent_community/autg/password_confirmation` filter, which still runs first.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$isRequired` | `bool` | Whether confirmation is required. `true` by default. |

**Return:** `bool` — evaluated for truthiness.

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

**Related:** [`fluent_community/autg/password_confirmation`](#fluent-community-autg-password-confirmation) · [`fluent_community/auth/signup_fields`](#fluent-community-auth-signup-fields)

<a id="fluent-community-auth-pre-content"></a>

## `fluent_community/auth/pre_content`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Replaces the body of the auth page with your own rendering.

The return value is never printed. The callback that renders the auth forms applies this filter first and, if the result is non-empty, returns without drawing anything — so a truthy return is a veto, and your markup has to be echoed from inside the filter callback itself. Returning an empty string leaves the built-in login, signup, reset and invitation screens in place.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$preContent` | `string` | Empty string on entry. |
| 2 | `$context` | `string` | The `$scope` from the headless page; `user_registration`. |
| 3 | `$targetForm` | `string` | The form about to render: `login`, `register`, `reset_password` or `accept_invitation`. |
| 4 | `$frameData` | `array` | Frame data: `logo`, `title`, `description`, `button_label`. |

**Return:** `string` — any non-empty value suppresses the default auth markup; the string itself is discarded, so echo your own output.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:235` | `''` (string)<br>`$context` (mixed)<br>`$targetForm` (mixed)<br>`$frameData` (mixed) |

### Example

```php
add_filter('fluent_community/auth/pre_content', function ($preContent, $context, $targetForm, $frameData) {
    return $preContent;
}, 10, 4);
```

**Related:** [`fluent_community/headless/content`](/hooks/actions/rendering#fluent-community-headless-content)

<a id="fluent-community-auth-registration-enabled"></a>

## `fluent_community/auth/registration_enabled`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether members may register themselves.

The base value is the WordPress `users_can_register` option, widened by the plugin's own `explicit_registration` setting when that option is off. It governs the signup form, the "Login / Signup" button label and the server-side guard in the registration endpoint alike. A valid invitation bypasses it on every one of those paths, so returning `false` closes public registration without breaking invitations.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$enabled` | `bool` | Whether self-registration is open. |

**Return:** `bool` — evaluated for truthiness; callers cast it with `!!`.

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

**Related:** [`fluent_community/auth/signup_fields`](#fluent-community-auth-signup-fields)

<a id="fluent-community-auth-settings"></a>

## `fluent_community/auth/settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the stored login and signup screen configuration.

Applied in `AuthenticationService::getAuthSettings()`, which every consumer goes through, so this is the authoritative place to change the auth screens. The array has a `login` and a `signup` branch, each with a `banner` block (logo, title, description, colours, background) and a `form` block (title, description, button label and colours). The terms field is backfilled into `signup.form.fields.terms` before the filter runs if it is missing. For the admin editing screen only, `fluent_community/get_auth_settings` runs afterwards.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$authSettings` | `array` | The full auth configuration, merged over the shipped defaults. |

**Return:** `array` — the configuration. Consumers read nested keys directly, so preserve the `login`/`signup` shape.

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

**Related:** [`fluent_community/get_auth_settings`](#fluent-community-get-auth-settings) · [`fluent_community/auth/signup_fields`](#fluent-community-auth-signup-fields)

<a id="fluent-community-auth-signup-fields"></a>

## `fluent_community/auth/signup_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the field definitions used to build and validate the registration form.

Both sides of registration read this: the form builder renders it, and the AJAX handler derives the accepted request keys, the required-field rules and the per-field `sanitize_callback` from it — so a field added here is accepted by the endpoint, and one removed here is silently dropped from the request. Core already filters it in `app/Hooks/filters.php`. `conf_password` is unset afterwards when password confirmation is disabled, and the stored terms field overrides the `terms` entry. Do not rename `full_name`, `email`, `username` or `password`: the handler references them by name.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fields` | `array` | Field definitions keyed by name, each with `type`, `label`, `placeholder`, `required` and `sanitize_callback`. |
| 2 | `$invitation` | `\FluentCommunity\Modules\Auth\Classes\Invitation` | The invitation being accepted, or `null` for an ordinary signup. |

**Return:** `array` — the field map, rendered in order.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:156` | `array (6 keys: full_name, email, username, …)` (array)<br>`$invitation` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_fields', function ($fields, $invitation) {
    return $fields;
}, 10, 2);
```

**Related:** [`fluent_community/auth/login_fields`](#fluent-community-auth-login-fields) · [`fluent_community/auth/password_confirmation`](#fluent-community-auth-password-confirmation)

<a id="fluent-community-auth-signup-verification-email-body"></a>

## `fluent_community/auth/signup_verification_email_body`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the body of the registration verification code email.

The filtered HTML is the inner content only; it is wrapped in the shared `email.template` view with the community logo and footer afterwards, so return a fragment rather than a whole document. The plain code is passed separately, which is the supported way to rebuild the message around it — the code itself is stored only as a hash in the signed token, so this is the one place it can be read.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$message` | `string` | The default HTML body, already containing the code. |
| 2 | `$verificationCode` | `string` | The six-digit code, in clear. |
| 3 | `$formData` | `array` | The submitted registration data, including `email`, `first_name` and `last_name`. |

**Return:** `string` — an HTML fragment.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:303` | `$message` (mixed)<br>`$verifcationCode` (mixed)<br>`$formData` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_verification_email_body', function ($message, $verificationCode, $formData) {
    return $message;
}, 10, 3);
```

**Related:** [`fluent_community/auth/signup_verification_mail_subject`](#fluent-community-auth-signup-verification-mail-subject) · [`fluent_community/auth/two_factor_enabled`](#fluent-community-auth-two-factor-enabled)

<a id="fluent-community-auth-signup-verification-mail-subject"></a>

## `fluent_community/auth/signup_verification_mail_subject`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the subject line of the registration verification code email.

Only fires when two-factor signup verification is active. It receives just the default subject — no user or form data — so anything dynamic has to be resolved in the callback. The matching body filter does get the form data.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$subject` | `string` | The default subject, naming the site title. |

**Return:** `string` — the subject line, passed to the mailer unescaped.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:291` | `sprintf(__('Your registration verification code for %s', 'fluent-community'),…` (mixed) |

### Example

```php
add_filter('fluent_community/auth/signup_verification_mail_subject', function ($subject) {
    return $subject;
}, 10, 1);
```

**Related:** [`fluent_community/auth/signup_verification_email_body`](#fluent-community-auth-signup-verification-email-body)

<a id="fluent-community-auth-two-factor-enabled"></a>

## `fluent_community/auth/two_factor_enabled`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether registration requires an emailed verification code.

The value handed in is the result of `fluent_auth/verify_signup_email`, kept for compatibility with FluentAuth snippets, and defaults to on. When it is enabled the signup endpoint responds with a verification form instead of creating the account, and the account is only created once the code checks out. Core disables it for invitations that carry a fixed email address, on the grounds that the address is already proven.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$enabled` | `bool` | Whether to require email verification during signup. `true` by default. |

**Return:** `bool` — evaluated for truthiness.

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

**Related:** [`fluent_community/auth/signup_verification_mail_subject`](#fluent-community-auth-signup-verification-mail-subject) · [`fluent_community/auth/signup_verification_email_body`](#fluent-community-auth-signup-verification-email-body)

<a id="fluent-community-create-invitation-link"></a>

## `fluent_community/create_invitation_link`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Creates the invitation record behind a shareable space invite link.

Core supplies no default — the filter starts at `null` and the free plugin has no callback, so the "create invite link" endpoint returns "Something went wrong" unless Pro is active. Pro answers at priority 1 with `InvitationService::createLinkInvite()`. Returning a `WP_Error` surfaces its message to the moderator; anything falsy produces the generic error. The controller then reads `getAccessUrl()` off whatever you return.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$invitation` | `mixed` | The invitation to create; `null` on entry. |
| 2 | `$invitationData` | `array` | Sanitised payload: `email` (empty), `user_id`, `space_id`, `title`, `limit`, `expire_date`. |

**Return:** `\FluentCommunity\Modules\Auth\Classes\Invitation` — a saved record exposing `getAccessUrl()`. Return a `WP_Error` to fail with a message, or a falsy value to fail generically.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/Classes/InvitationController.php:133` | `null` (mixed)<br>`$indivatationData` (mixed) |

### Example

```php
add_filter('fluent_community/create_invitation_link', function ($invitation, $invitationData) {
    return $invitation;
}, 10, 2);
```

**Related:** [`fluent_community/invitation_link_created`](/hooks/actions/auth#fluent-community-invitation-link-created)

<a id="fluent-community-default-redirect-url"></a>

## `fluent_community/default_redirect_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the fallback destination written into the FluentAuth login form.

Narrow scope: it applies only when FluentAuth renders the login form and the request carries no `redirect_to`. The value is escaped into a hidden `fcom_redirect` field, which the login bridge later validates with `wp_validate_redirect()` against the portal base — so an off-site URL will be discarded downstream rather than honoured.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$redirectUrl` | `string` | The default destination, the portal base URL. |

**Return:** `string` — a URL; it is validated against the portal base before use.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:714` | `Helper::baseUrl()` (mixed) |

### Example

```php
add_filter('fluent_community/default_redirect_url', function ($redirectUrl) {
    return $redirectUrl;
}, 10, 1);
```

**Related:** [`fluent_community/auth/after_login_redirect_url`](#fluent-community-auth-after-login-redirect-url)

<a id="fluent-community-get-auth-settings"></a>

## `fluent_community/get_auth_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the auth settings as returned to the admin settings screen.

A thin wrapper over `fluent_community/auth/settings` that runs only in `AdminController::getAuthSettings()`, after the live login and signup field definitions have been injected into `login.form.fields` and `signup.form.fields`. Filter it to change what an administrator sees or can edit; filter `fluent_community/auth/settings` to change what is actually used at render time.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | The auth configuration with `form.fields` populated for both branches. |

**Return:** `array` — returned to the admin app under a `settings` key.

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

**Related:** [`fluent_community/auth/settings`](#fluent-community-auth-settings)

<a id="fluent-community-terms-policy-url"></a>

## `fluent_community/terms_policy_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the URL linked from the signup form's terms checkbox.

Defaults to `get_privacy_policy_url()`, which is empty until a privacy page is set — and when it is empty the checkbox label degrades to plain unlinked text rather than linking nowhere. The URL is escaped into an `<a target="_blank" rel="noopener">`. It is only consulted when the administrator has not supplied a custom terms field in the auth settings, since a stored terms field replaces the generated label wholesale.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$policyUrl` | `string` | The terms or privacy policy URL. `get_privacy_policy_url()` by default. |

**Return:** `string` — a URL, or an empty string to render the label without a link.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthHelper.php:143` | `get_privacy_policy_url()` (mixed) |

### Example

```php
add_filter('fluent_community/terms_policy_url', function ($policyUrl) {
    return $policyUrl;
}, 10, 1);
```

**Related:** [`fluent_community/auth/signup_fields`](#fluent-community-auth-signup-fields)

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

