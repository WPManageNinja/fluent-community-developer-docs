# Authentication Actions

Actions related to user login, logout, registration, and authentication flows in Fluent Community.

## Overview

These actions allow you to hook into authentication events, customize login/logout behavior, and integrate with external authentication systems.

**Total Actions:** 15

---

## Login Events

### fluent_community/after_user_login

Fires immediately after a user successfully logs in.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | Logged in user object |
| `$remember` | bool | Whether "remember me" was checked |

**Example Usage:**

```php
// Log login activity
add_action('fluent_community/after_user_login', function($user, $remember) {
    update_user_meta($user->ID, 'last_login', current_time('mysql'));
    update_user_meta($user->ID, 'login_count', get_user_meta($user->ID, 'login_count', true) + 1);
    
    error_log(sprintf(
        'User %d (%s) logged in. Remember: %s',
        $user->ID,
        $user->user_email,
        $remember ? 'yes' : 'no'
    ));
}, 10, 2);

// Track login IP
add_action('fluent_community/after_user_login', function($user, $remember) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $login_ips = get_user_meta($user->ID, 'login_ips', true) ?: [];
    
    if (!in_array($ip, $login_ips)) {
        $login_ips[] = $ip;
        update_user_meta($user->ID, 'login_ips', $login_ips);
        
        // Alert user of new IP
        wp_mail(
            $user->user_email,
            'New Login Location Detected',
            sprintf('Your account was accessed from a new IP: %s', $ip)
        );
    }
}, 10, 2);

// Award daily login bonus
add_action('fluent_community/after_user_login', function($user, $remember) {
    $last_login = get_user_meta($user->ID, 'last_login_date', true);
    $today = date('Y-m-d');
    
    if ($last_login !== $today) {
        // Award points for daily login
        $points = get_user_meta($user->ID, 'community_points', true) ?: 0;
        update_user_meta($user->ID, 'community_points', $points + 10);
        update_user_meta($user->ID, 'last_login_date', $today);
        
        // Track streak
        $streak = get_user_meta($user->ID, 'login_streak', true) ?: 0;
        update_user_meta($user->ID, 'login_streak', $streak + 1);
    }
}, 10, 2);

// Sync to external system
add_action('fluent_community/after_user_login', function($user, $remember) {
    wp_remote_post('https://analytics.example.com/api/events', [
        'body' => json_encode([
            'event' => 'user_login',
            'user_id' => $user->ID,
            'email' => $user->user_email,
            'timestamp' => current_time('mysql'),
            'remember' => $remember
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Log login activity
- Track login locations
- Award daily bonuses
- Send notifications
- Sync with analytics
- Update user status

---

### fluent_community/before_user_logout

Fires before a user logs out.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User about to logout |

**Example Usage:**

```php
// Log logout
add_action('fluent_community/before_user_logout', function($user) {
    error_log(sprintf('User %d logging out', $user->ID));
    
    // Track session duration
    $login_time = get_user_meta($user->ID, 'current_session_start', true);
    if ($login_time) {
        $duration = time() - strtotime($login_time);
        update_user_meta($user->ID, 'last_session_duration', $duration);
    }
}, 10, 1);

// Clear user cache
add_action('fluent_community/before_user_logout', function($user) {
    wp_cache_delete('user_permissions_' . $user->ID);
    wp_cache_delete('user_spaces_' . $user->ID);
}, 10, 1);
```

---

### fluent_community/after_user_logout

Fires after a user has logged out.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | ID of logged out user |

**Example Usage:**

```php
add_action('fluent_community/after_user_logout', function($userId) {
    // Clean up temporary data
    delete_user_meta($userId, 'current_session_start');
    delete_user_meta($userId, 'temp_session_data');
}, 10, 1);
```

---

## Registration Events

### fluent_community/before_user_registration

Fires before a new user is registered.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Registration data |

**Data Structure:**
```php
[
    'username' => 'johndoe',
    'email' => 'john@example.com',
    'password' => 'hashed_password',
    'first_name' => 'John',
    'last_name' => 'Doe',
    'display_name' => 'John Doe'
]
```

**Example Usage:**

```php
// Validate registration data
add_action('fluent_community/before_user_registration', function($data) {
    // Check email domain
    $allowed_domains = ['company.com', 'partner.com'];
    $email_domain = substr(strrchr($data['email'], '@'), 1);
    
    if (!in_array($email_domain, $allowed_domains)) {
        wp_send_json_error([
            'message' => 'Registration is only allowed for company email addresses'
        ], 403);
    }
}, 10, 1);

// Check invitation code
add_action('fluent_community/before_user_registration', function($data) {
    $invite_code = $_POST['invite_code'] ?? '';
    
    if (empty($invite_code) || !is_valid_invite_code($invite_code)) {
        wp_send_json_error([
            'message' => 'Valid invitation code required'
        ], 403);
    }
}, 10, 1);

// Rate limit registrations
add_action('fluent_community/before_user_registration', function($data) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $recent_registrations = get_transient('registrations_from_' . md5($ip));
    
    if ($recent_registrations && $recent_registrations >= 3) {
        wp_send_json_error([
            'message' => 'Too many registration attempts. Please try again later.'
        ], 429);
    }
    
    set_transient('registrations_from_' . md5($ip), ($recent_registrations ?: 0) + 1, HOUR_IN_SECONDS);
}, 10, 1);
```

---

### fluent_community/after_user_registration

Fires after a new user is successfully registered.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | Newly registered user |
| `$data` | array | Registration data |

**Example Usage:**

```php
// Send welcome email
add_action('fluent_community/after_user_registration', function($user, $data) {
    wp_mail(
        $user->user_email,
        'Welcome to Our Community!',
        sprintf(
            "Hi %s,\n\nThank you for joining our community!\n\nYour username: %s\n\nGet started: %s",
            $user->display_name,
            $user->user_login,
            home_url('/community')
        )
    );
}, 10, 2);

// Create welcome post
add_action('fluent_community/after_user_registration', function($user, $data) {
    do_action('fluent_community/feed/create', [
        'user_id' => $user->ID,
        'type' => 'feed',
        'message' => sprintf('Welcome %s to our community! 👋', $user->display_name),
        'privacy' => 'public',
        'status' => 'published'
    ]);
}, 10, 2);

// Assign to onboarding course
add_action('fluent_community/after_user_registration', function($user, $data) {
    $onboarding_course_id = 123;
    do_action('fluent_community/course/enroll_user', $onboarding_course_id, $user->ID);
}, 10, 2);

// Sync to mailing list
add_action('fluent_community/after_user_registration', function($user, $data) {
    // Add to Mailchimp/FluentCRM
    if (function_exists('FluentCrmApi')) {
        FluentCrmApi('contacts')->createOrUpdate([
            'email' => $user->user_email,
            'first_name' => $data['first_name'] ?? '',
            'last_name' => $data['last_name'] ?? '',
            'tags' => ['community-member']
        ]);
    }
}, 10, 2);
```

---

## Password Management

### fluent_community/before_password_reset

Fires before a password reset is processed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User requesting reset |

**Example Usage:**

```php
add_action('fluent_community/before_password_reset', function($user) {
    // Log password reset request
    error_log(sprintf('Password reset requested for user %d', $user->ID));
    
    // Check for suspicious activity
    $recent_resets = get_user_meta($user->ID, 'password_reset_count', true) ?: 0;
    if ($recent_resets > 5) {
        // Alert admin
        wp_mail(
            get_option('admin_email'),
            'Suspicious Password Reset Activity',
            sprintf('User %d has requested %d password resets', $user->ID, $recent_resets)
        );
    }
}, 10, 1);
```

---

### fluent_community/after_password_reset

Fires after a password has been successfully reset.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User whose password was reset |

**Example Usage:**

```php
add_action('fluent_community/after_password_reset', function($user) {
    // Send confirmation email
    wp_mail(
        $user->user_email,
        'Password Changed',
        'Your password has been successfully changed. If you did not make this change, please contact support immediately.'
    );
    
    // Log password change
    update_user_meta($user->ID, 'last_password_change', current_time('mysql'));
    
    // Invalidate all sessions except current
    $sessions = WP_Session_Tokens::get_instance($user->ID);
    $sessions->destroy_others(wp_get_session_token());
}, 10, 1);
```

---

### fluent_community/password_changed

Fires when a user changes their password.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User who changed password |

---

## Email Verification

### fluent_community/email_verification_sent

Fires when an email verification is sent.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User receiving verification |
| `$verificationCode` | string | Verification code |

**Example Usage:**

```php
add_action('fluent_community/email_verification_sent', function($user, $verificationCode) {
    // Log verification sent
    error_log(sprintf('Verification email sent to user %d', $user->ID));
    
    // Track in analytics
    do_action('track_event', 'email_verification_sent', [
        'user_id' => $user->ID,
        'email' => $user->user_email
    ]);
}, 10, 2);
```

---

### fluent_community/email_verified

Fires when a user's email is verified.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User whose email was verified |

**Example Usage:**

```php
add_action('fluent_community/email_verified', function($user) {
    // Award verification bonus
    $points = get_user_meta($user->ID, 'community_points', true) ?: 0;
    update_user_meta($user->ID, 'community_points', $points + 50);
    
    // Send congratulations
    wp_mail(
        $user->user_email,
        'Email Verified!',
        'Your email has been verified. You now have full access to all community features!'
    );
    
    // Unlock features
    update_user_meta($user->ID, 'can_create_spaces', true);
    update_user_meta($user->ID, 'can_upload_media', true);
}, 10, 1);
```

---

## Social Login

### fluent_community/social_login_success

Fires after successful social login.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | Logged in user |
| `$provider` | string | Social provider (google, facebook, etc.) |
| `$profileData` | array | Social profile data |

**Example Usage:**

```php
add_action('fluent_community/social_login_success', function($user, $provider, $profileData) {
    // Log social login
    error_log(sprintf('User %d logged in via %s', $user->ID, $provider));
    
    // Update profile from social data
    if (!empty($profileData['avatar'])) {
        update_user_meta($user->ID, 'social_avatar_' . $provider, $profileData['avatar']);
    }
    
    // Track provider usage
    $providers = get_user_meta($user->ID, 'social_providers', true) ?: [];
    if (!in_array($provider, $providers)) {
        $providers[] = $provider;
        update_user_meta($user->ID, 'social_providers', $providers);
    }
}, 10, 3);
```

---

### fluent_community/social_login_failed

Fires when social login fails.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$provider` | string | Social provider |
| `$error` | WP_Error | Error object |

**Example Usage:**

```php
add_action('fluent_community/social_login_failed', function($provider, $error) {
    error_log(sprintf(
        'Social login failed for %s: %s',
        $provider,
        $error->get_error_message()
    ));
}, 10, 2);
```

---

## Two-Factor Authentication

### fluent_community/2fa_enabled

Fires when two-factor authentication is enabled for a user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User who enabled 2FA |
| `$method` | string | 2FA method (app, sms, email) |

**Example Usage:**

```php
add_action('fluent_community/2fa_enabled', function($user, $method) {
    // Send confirmation
    wp_mail(
        $user->user_email,
        'Two-Factor Authentication Enabled',
        sprintf('2FA has been enabled for your account using %s method.', $method)
    );
    
    // Award security bonus
    $points = get_user_meta($user->ID, 'community_points', true) ?: 0;
    update_user_meta($user->ID, 'community_points', $points + 100);
}, 10, 2);
```

---

### fluent_community/2fa_disabled

Fires when two-factor authentication is disabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User who disabled 2FA |

---

### fluent_community/2fa_verified

Fires when a 2FA code is successfully verified.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User who verified 2FA |
| `$method` | string | 2FA method used |

---

## Session Management

### fluent_community/session_started

Fires when a new user session is started.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User starting session |
| `$sessionId` | string | Session identifier |

---

### fluent_community/session_expired

Fires when a user session expires.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | User whose session expired |
| `$sessionId` | string | Expired session ID |

---

## Best Practices

### 1. Security First

```php
add_action('fluent_community/after_user_login', function($user, $remember) {
    // Always validate user exists
    if (!$user || !$user->ID) {
        return;
    }
    
    // Use nonces for sensitive operations
    // Log security events
}, 10, 2);
```

### 2. Handle Errors Gracefully

```php
add_action('fluent_community/before_user_registration', function($data) {
    try {
        // Validation logic
    } catch (Exception $e) {
        error_log('Registration validation error: ' . $e->getMessage());
        wp_send_json_error(['message' => 'Registration failed'], 500);
    }
}, 10, 1);
```

### 3. Use Transients for Rate Limiting

```php
add_action('fluent_community/before_password_reset', function($user) {
    $key = 'password_reset_' . $user->ID;
    
    if (get_transient($key)) {
        wp_send_json_error(['message' => 'Please wait before requesting another reset'], 429);
    }
    
    set_transient($key, true, 5 * MINUTE_IN_SECONDS);
}, 10, 1);
```

---

## See Also

- [Authentication Filters](/hooks/filters/authentication) - Modify auth behavior
- [User Actions](/hooks/actions/users) - User lifecycle hooks
- [Examples](/hooks/examples) - Real-world examples

