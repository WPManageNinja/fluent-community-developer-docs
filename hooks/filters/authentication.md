---
prev:
  text: 'Portal Filters'
  link: '/hooks/filters/portal'
next:
  text: 'Users Filters'
  link: '/hooks/filters/users'
---

# Authentication Filters ​

Filters for customizing authentication, registration, login, and user verification in Fluent Community.

## Overview ​

Authentication filters control user registration, login flows, email verification, redirects, and authentication settings. These filters are essential for customizing the user onboarding experience.

**Total Filters:** 18

---

## Login Filters

### fluent_community/auth/login_fields ​

Filters the login form fields configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$fields` | array | Array of login field configurations |

**Return:** `array` - Modified login fields

**Example Usage:**

```php
// Add custom field to login form
add_filter('fluent_community/auth/login_fields', function($fields) {
    $fields['remember_me'] = [
        'type'        => 'checkbox',
        'label'       => 'Remember Me',
        'placeholder' => '',
        'required'    => false
    ];
    
    return $fields;
});

// Modify existing fields
add_filter('fluent_community/auth/login_fields', function($fields) {
    // Change username label
    $fields['username']['label'] = 'Email or Username';
    
    // Add help text
    $fields['password']['help_text'] = 'Forgot your password? Click here.';
    
    return $fields;
});

// Remove fields
add_filter('fluent_community/auth/login_fields', function($fields) {
    // Remove username, only allow email
    unset($fields['username']);
    
    return $fields;
});
```

**Common Use Cases:**
- Add custom fields
- Modify field labels
- Add help text
- Customize form layout

**Related Filters:**
- `fluent_community/auth/signup_fields`

---

### fluent_community/auth/after_login_redirect_url ​

Filters the redirect URL after successful login.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$redirectUrl` | string | Default redirect URL |
| `$user` | WP_User | Logged in user object |

**Return:** `string` - Modified redirect URL

**Example Usage:**

```php
// Redirect to custom page
add_filter('fluent_community/auth/after_login_redirect_url', function($redirectUrl, $user) {
    return home_url('/community/welcome');
}, 10, 2);

// Role-based redirect
add_filter('fluent_community/auth/after_login_redirect_url', function($redirectUrl, $user) {
    if (in_array('administrator', $user->roles)) {
        return admin_url();
    }
    
    if (in_array('premium_member', $user->roles)) {
        return home_url('/community/premium');
    }
    
    return home_url('/community/feeds');
}, 10, 2);

// First-time login redirect
add_filter('fluent_community/auth/after_login_redirect_url', function($redirectUrl, $user) {
    $login_count = get_user_meta($user->ID, 'login_count', true);
    
    if (!$login_count || $login_count == 1) {
        return home_url('/community/onboarding');
    }
    
    return $redirectUrl;
}, 10, 2);
```

**Common Use Cases:**
- Custom landing pages
- Role-based redirects
- First-time user onboarding
- Conditional redirects

**Related Filters:**
- `fluent_community/auth/after_signup_redirect_url`
- `fluent_community/default_redirect_url`

---

### fluent_community/auth/login_url ​

Filters the login page URL.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$loginUrl` | string | Default login URL |

**Return:** `string` - Modified login URL

**Example Usage:**

```php
// Use custom login page
add_filter('fluent_community/auth/login_url', function($loginUrl) {
    return home_url('/custom-login');
});

// Use WordPress login
add_filter('fluent_community/auth/login_url', function($loginUrl) {
    return wp_login_url();
});
```

**Common Use Cases:**
- Custom login pages
- Third-party authentication
- SSO integration

---

### fluent_community/auth/lost_password_url ​

Filters the lost password/reset password URL.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | string | Default lost password URL |

**Return:** `string` - Modified URL

**Example Usage:**

```php
// Use custom password reset page
add_filter('fluent_community/auth/lost_password_url', function($url) {
    return home_url('/reset-password');
});

// Use WordPress default
add_filter('fluent_community/auth/lost_password_url', function($url) {
    return wp_lostpassword_url();
});
```

**Common Use Cases:**
- Custom password reset pages
- Third-party password management
- Custom reset flows

---

## Registration Filters

### fluent_community/auth/signup_fields ​

Filters the registration form fields configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$fields` | array | Array of signup field configurations |

**Return:** `array` - Modified signup fields

**Example Usage:**

```php
// Add custom fields
add_filter('fluent_community/auth/signup_fields', function($fields) {
    $fields['phone'] = [
        'type'        => 'tel',
        'label'       => 'Phone Number',
        'placeholder' => 'Enter your phone',
        'required'    => true,
        'validation'  => 'phone'
    ];
    
    $fields['company'] = [
        'type'        => 'text',
        'label'       => 'Company Name',
        'placeholder' => 'Your company',
        'required'    => false
    ];
    
    return $fields;
});

// Modify existing fields
add_filter('fluent_community/auth/signup_fields', function($fields) {
    // Make username optional
    $fields['username']['required'] = false;
    
    // Add password strength indicator
    $fields['password']['help_text'] = 'Use at least 8 characters with letters and numbers';
    
    return $fields;
});

// Add terms acceptance
add_filter('fluent_community/auth/signup_fields', function($fields) {
    $fields['accept_terms'] = [
        'type'     => 'checkbox',
        'label'    => 'I accept the Terms and Conditions',
        'required' => true
    ];
    
    return $fields;
});
```

**Common Use Cases:**
- Collect additional user data
- Add terms acceptance
- Custom validation
- Multi-step registration

**Related Filters:**
- `fluent_community/auth/login_fields`

---

### fluent_community/auth/registration_enabled ​

Filters whether user registration is enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$enabled` | bool | Whether registration is enabled |

**Return:** `bool` - Modified registration status

**Example Usage:**

```php
// Disable registration
add_filter('fluent_community/auth/registration_enabled', function($enabled) {
    return false;
});

// Conditional registration
add_filter('fluent_community/auth/registration_enabled', function($enabled) {
    // Only allow registration during business hours
    $hour = (int) current_time('H');
    return ($hour >= 9 && $hour <= 17);
});

// Invitation-only registration
add_filter('fluent_community/auth/registration_enabled', function($enabled) {
    return isset($_GET['invitation_code']);
});
```

**Common Use Cases:**
- Disable public registration
- Invitation-only communities
- Time-based registration
- Conditional access

---

### fluent_community/auth/after_signup_redirect_url ​

Filters the redirect URL after successful registration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$redirectUrl` | string | Default redirect URL |
| `$user` | WP_User | Newly registered user |
| `$request` | array | Registration request data |

**Return:** `string` - Modified redirect URL

**Example Usage:**

```php
// Redirect to welcome page
add_filter('fluent_community/auth/after_signup_redirect_url', function($redirectUrl, $user, $request) {
    return home_url('/community/welcome');
}, 10, 3);

// Redirect based on registration source
add_filter('fluent_community/auth/after_signup_redirect_url', function($redirectUrl, $user, $request) {
    $source = $request['source'] ?? 'direct';
    
    if ($source === 'invitation') {
        return home_url('/community/invited-welcome');
    }
    
    return home_url('/community/onboarding');
}, 10, 3);
```

**Common Use Cases:**
- Welcome pages
- Onboarding flows
- Email verification prompts
- Profile completion

---

## Email Verification Filters

### fluent_community/auth/signup_verification_mail_subject ​

Filters the email verification mail subject line.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$subject` | string | Default email subject |
| `$siteName` | string | Site name |

**Return:** `string` - Modified email subject

**Example Usage:**

```php
// Custom subject
add_filter('fluent_community/auth/signup_verification_mail_subject', function($subject, $siteName) {
    return "Welcome to {$siteName}! Verify your email";
}, 10, 2);

// Branded subject
add_filter('fluent_community/auth/signup_verification_mail_subject', function($subject, $siteName) {
    return "🎉 Verify your {$siteName} account";
}, 10, 2);
```

**Common Use Cases:**
- Custom email subjects
- Branding
- Multi-language support

---

### fluent_community/auth/signup_verification_email_body ​

Filters the email verification email body content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$message` | string | Default email body (HTML) |
| `$verificationCode` | string | Verification code |
| `$formData` | array | Registration form data |

**Return:** `string` - Modified email body

**Example Usage:**

```php
// Custom email template
add_filter('fluent_community/auth/signup_verification_email_body', function($message, $code, $formData) {
    $name = $formData['first_name'] ?? 'there';
    
    return "
        <h2>Welcome {$name}!</h2>
        <p>Thanks for joining our community.</p>
        <p>Your verification code is: <strong>{$code}</strong></p>
        <p>Enter this code to activate your account.</p>
    ";
}, 10, 3);

// Add custom branding
add_filter('fluent_community/auth/signup_verification_email_body', function($message, $code, $formData) {
    $logo = get_option('site_logo_url');
    
    return "
        <div style='text-align: center;'>
            <img src='{$logo}' alt='Logo' style='max-width: 200px;'>
        </div>
        {$message}
        <hr>
        <p style='color: #666; font-size: 12px;'>
            This is an automated message. Please do not reply.
        </p>
    ";
}, 10, 3);
```

**Common Use Cases:**
- Custom email templates
- Branding
- Additional instructions
- Multi-language content

---

## Invitation Filters

### fluent_community/auth/invitation ​

Filters invitation data during registration with invitation code.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$invitation` | object\|null | Invitation object or null |
| `$invitationToken` | string | Invitation token from URL |

**Return:** `object|null` - Modified invitation object

**Example Usage:**

```php
// Validate custom invitation
add_filter('fluent_community/auth/invitation', function($invitation, $token) {
    // Check custom invitation table
    $customInvitation = get_custom_invitation($token);
    
    if ($customInvitation && $customInvitation->is_valid) {
        return $customInvitation;
    }
    
    return $invitation;
}, 10, 2);

// Add invitation metadata
add_filter('fluent_community/auth/invitation', function($invitation, $token) {
    if ($invitation) {
        $invitation->metadata = [
            'invited_at' => current_time('mysql'),
            'source'     => 'email_campaign'
        ];
    }
    
    return $invitation;
}, 10, 2);
```

**Common Use Cases:**
- Custom invitation systems
- Invitation validation
- Track invitation sources
- Invitation metadata

---

### fluent_community/auth/after_login_with_invitation ​

Filters redirect URL after login with invitation code.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$redirectUrl` | string\|null | Redirect URL or null |
| `$user` | WP_User | User object |
| `$invitationToken` | string | Invitation token |

**Return:** `string|null` - Modified redirect URL

**Example Usage:**

```php
// Redirect invited users to specific space
add_filter('fluent_community/auth/after_login_with_invitation', function($redirectUrl, $user, $token) {
    $invitation = get_invitation_by_token($token);
    
    if ($invitation && $invitation->space_id) {
        return home_url("/community/spaces/{$invitation->space_id}");
    }
    
    return $redirectUrl;
}, 10, 3);
```

**Common Use Cases:**
- Space-specific invitations
- Custom onboarding for invited users
- Track invitation conversions

---

## Security & Rate Limiting

### fluent_community/auth/disable_rate_limit ​

Filters whether authentication rate limiting is disabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$disabled` | bool | Whether rate limiting is disabled (default: false) |

**Return:** `bool` - Modified rate limit status

**Example Usage:**

```php
// Disable rate limiting for development
add_filter('fluent_community/auth/disable_rate_limit', function($disabled) {
    return defined('WP_DEBUG') && WP_DEBUG;
});

// Disable for specific IPs
add_filter('fluent_community/auth/disable_rate_limit', function($disabled) {
    $trusted_ips = ['192.168.1.1', '10.0.0.1'];
    $user_ip = $_SERVER['REMOTE_ADDR'];
    
    return in_array($user_ip, $trusted_ips);
});
```

**Common Use Cases:**
- Development environments
- Trusted IP addresses
- Testing
- Admin access

---

## Configuration Filters

### fluent_community/auth/settings ​

Filters authentication settings configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Authentication settings array |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Modify auth settings
add_filter('fluent_community/auth/settings', function($settings) {
    $settings['require_email_verification'] = true;
    $settings['allow_social_login'] = true;
    $settings['min_password_length'] = 12;
    
    return $settings;
});

// Add custom settings
add_filter('fluent_community/auth/settings', function($settings) {
    $settings['custom'] = [
        'enable_2fa'           => true,
        'session_timeout'      => 3600,
        'max_login_attempts'   => 5
    ];
    
    return $settings;
});
```

**Common Use Cases:**
- Configure authentication behavior
- Add custom settings
- Security policies
- Feature flags

---

### fluent_community/get_auth_settings ​

Filters retrieved authentication settings (read operation).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Retrieved authentication settings |

**Return:** `array` - Modified settings

---

### fluent_community/update_auth_settings ​

Filters authentication settings before saving (write operation).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Settings to be saved |

**Return:** `array` - Modified settings

---

## Additional Filters

### fluent_community/auth/pre_content ​

Filters content displayed before authentication forms.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$content` | string | Pre-content HTML |
| `$context` | string | Context ('login', 'signup', etc.) |
| `$targetForm` | string | Target form identifier |
| `$frameData` | array | Frame data |

**Return:** `string` - Modified content

**Example Usage:**

```php
// Add notice before login
add_filter('fluent_community/auth/pre_content', function($content, $context, $targetForm, $frameData) {
    if ($context === 'login') {
        $content .= '<div class="notice">Welcome back! Please log in.</div>';
    }
    
    return $content;
}, 10, 4);
```

---

### fluent_community/allow_auto_login_by_url ​

Filters whether auto-login via URL parameter is allowed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$allowed` | bool | Whether auto-login is allowed |

**Return:** `bool` - Modified permission

**Example Usage:**

```php
// Enable auto-login for development
add_filter('fluent_community/allow_auto_login_by_url', function($allowed) {
    return defined('WP_DEBUG') && WP_DEBUG;
});
```

---

### fluent_community/autg/password_confirmation ​

Filters password confirmation requirements.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$required` | bool | Whether password confirmation is required |
| `$context` | string | Context (signup, password_reset, etc.) |

**Return:** `bool` - Modified requirement

**Example Usage:**

```php
// Require password confirmation on signup
add_filter('fluent_community/autg/password_confirmation', function($required, $context) {
    if ($context === 'signup') {
        return true;
    }

    return $required;
}, 10, 2);

// Skip confirmation for social login
add_filter('fluent_community/autg/password_confirmation', function($required, $context) {
    if ($context === 'social_login') {
        return false;
    }

    return $required;
}, 10, 2);

// Always require confirmation
add_filter('fluent_community/autg/password_confirmation', function($required, $context) {
    return true;
}, 10, 2);
```

**Common Use Cases:**
- Security requirements
- Context-specific rules
- User experience optimization

---

## Related Documentation

- [Authentication Actions](/hooks/actions/authentication)
- [User Filters](/hooks/filters/users)
- [Code Snippets](/guides/code-snippets)

