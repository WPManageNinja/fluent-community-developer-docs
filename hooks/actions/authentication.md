---
prev:
  text: 'Users & Members'
  link: '/hooks/actions/users'
next:
  text: 'Media'
  link: '/hooks/actions/media'
---

<DocStatusBanner />

# Authentication Actions

## Registration Form Hooks

### fluent_community/before_registration_form

Fires before the registration form is rendered.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| None | - | No parameters |

**Example Usage:**

```php
// Add custom content before registration form
add_action('fluent_community/before_registration_form', function() {
    echo '<div class="custom-notice">';
    echo '<p>Join our community and get access to exclusive content!</p>';
    echo '</div>';
}, 10, 0);

// Add custom CSS/JS for registration
add_action('fluent_community/before_registration_form', function() {
    wp_enqueue_style('custom-registration-style', get_stylesheet_directory_uri() . '/registration.css');
    wp_enqueue_script('custom-registration-script', get_stylesheet_directory_uri() . '/registration.js');
}, 10, 0);
```

**Common Use Cases:**
- Add promotional content
- Display terms and conditions
- Add custom styling
- Load custom scripts
- Show registration benefits

---

### fluent_community/after_registration_form

Fires after the registration form is rendered.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| None | - | No parameters |

**Example Usage:**

```php
// Add custom content after registration form
add_action('fluent_community/after_registration_form', function() {
    echo '<div class="registration-help">';
    echo '<p>Need help? <a href="/contact">Contact Support</a></p>';
    echo '</div>';
}, 10, 0);

// Add social login buttons
add_action('fluent_community/after_registration_form', function() {
    ?>
    <div class="social-registration">
        <p>Or register with:</p>
        <button class="social-btn google">Google</button>
        <button class="social-btn facebook">Facebook</button>
    </div>
    <?php
}, 10, 0);
```

---

## Authentication Form Hooks

### fluent_community/before_auth_form_header

Fires before the authentication form header.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$formType` | string | Type of form ('login', 'register', etc.) |

**Example Usage:**

```php
// Add custom header content
add_action('fluent_community/before_auth_form_header', function($formType) {
    if ($formType === 'login') {
        echo '<div class="login-banner">';
        echo '<h2>Welcome Back!</h2>';
        echo '</div>';
    }
}, 10, 1);

// Add branding
add_action('fluent_community/before_auth_form_header', function($formType) {
    echo '<div class="auth-branding">';
    echo '<img src="' . get_site_icon_url() . '" alt="Logo">';
    echo '<h1>' . get_bloginfo('name') . '</h1>';
    echo '</div>';
}, 10, 1);
```

---

### fluent_community/auth/before_auth_page_process

Fires before the authentication page is processed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$currentUserId` | int\|null | Current user ID if logged in |
| `$invitation` | object\|null | Invitation object if present |

**Example Usage:**

```php
// Redirect logged-in users
add_action('fluent_community/auth/before_auth_page_process', function($currentUserId, $invitation) {
    if ($currentUserId && !$invitation) {
        wp_redirect(home_url('/community'));
        exit;
    }
}, 10, 2);

// Log authentication attempts
add_action('fluent_community/auth/before_auth_page_process', function($currentUserId, $invitation) {
    error_log(sprintf(
        'Auth page accessed - User: %s, Invitation: %s',
        $currentUserId ? $currentUserId : 'guest',
        $invitation ? $invitation->id : 'none'
    ));
}, 10, 2);

// Check IP restrictions
add_action('fluent_community/auth/before_auth_page_process', function($currentUserId, $invitation) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $blocked_ips = get_option('blocked_ips', []);
    
    if (in_array($ip, $blocked_ips)) {
        wp_die('Access denied from your location.');
    }
}, 10, 2);
```

---

## Invitation Hooks

### fluent_community/invitation_created

Fires when a new invitation is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$invitation` | object | Invitation object |

**Example Usage:**

```php
// Send custom invitation email
add_action('fluent_community/invitation_created', function($invitation) {
    $inviter = get_user_by('id', $invitation->created_by);
    
    wp_mail(
        $invitation->email,
        'You\'ve been invited!',
        sprintf(
            "Hi,\n\n%s has invited you to join our community.\n\nClick here to accept: %s",
            $inviter->display_name,
            $invitation->invitation_url
        )
    );
}, 10, 1);

// Log invitation
add_action('fluent_community/invitation_created', function($invitation) {
    error_log(sprintf(
        'Invitation created: ID=%d, Email=%s, By=%d',
        $invitation->id,
        $invitation->email,
        $invitation->created_by
    ));
}, 10, 1);

// Track invitation metrics
add_action('fluent_community/invitation_created', function($invitation) {
    $count = get_option('total_invitations', 0);
    update_option('total_invitations', $count + 1);
    
    // Track by user
    $user_invites = get_user_meta($invitation->created_by, 'invitations_sent', true) ?: 0;
    update_user_meta($invitation->created_by, 'invitations_sent', $user_invites + 1);
}, 10, 1);
```

---

### fluent_community/invitation_link_created

Fires when an invitation link is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$invitation` | object | Invitation object with link |

**Example Usage:**

```php
// Log invitation link creation
add_action('fluent_community/invitation_link_created', function($invitation) {
    error_log(sprintf(
        'Invitation link created: %s',
        $invitation->invitation_url
    ));
}, 10, 1);

// Share invitation link
add_action('fluent_community/invitation_link_created', function($invitation) {
    // Post to Slack/Discord
    wp_remote_post('https://hooks.slack.com/services/YOUR/WEBHOOK/URL', [
        'body' => json_encode([
            'text' => sprintf(
                'New invitation link created: %s',
                $invitation->invitation_url
            )
        ])
    ]);
}, 10, 1);
```

---

### fluent_community/auth/show_invitation_for_user

Fires when showing an invitation to a user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$invitation` | object | Invitation object |
| `$frameData` | array | Frame/context data |

**Example Usage:**

```php
// Customize invitation display
add_action('fluent_community/auth/show_invitation_for_user', function($invitation, $frameData) {
    // Add custom welcome message
    echo '<div class="invitation-welcome">';
    echo '<h3>Special Invitation</h3>';
    echo '<p>You\'ve been personally invited to join our exclusive community!</p>';
    echo '</div>';
}, 10, 2);

// Track invitation views
add_action('fluent_community/auth/show_invitation_for_user', function($invitation, $frameData) {
    $views = get_post_meta($invitation->id, 'invitation_views', true) ?: 0;
    update_post_meta($invitation->id, 'invitation_views', $views + 1);
    update_post_meta($invitation->id, 'last_viewed', current_time('mysql'));
}, 10, 2);
```

---

## Best Practices

### 1. Check Context

```php
add_action('fluent_community/before_auth_form_header', function($formType) {
    // Only run for specific form types
    if ($formType !== 'login') {
        return;
    }
    
    // Your code here
}, 10, 1);
```

### 2. Validate Data

```php
add_action('fluent_community/invitation_created', function($invitation) {
    if (!$invitation || !isset($invitation->email)) {
        return;
    }
    
    // Safe to proceed
}, 10, 1);
```

### 3. Use Proper Escaping

```php
add_action('fluent_community/before_registration_form', function() {
    $message = get_option('registration_message');
    echo '<div>' . wp_kses_post($message) . '</div>';
}, 10, 0);
```

### 4. Handle Errors Gracefully

```php
add_action('fluent_community/invitation_created', function($invitation) {
    try {
        // Send to external API
        $response = wp_remote_post('https://api.example.com/invitations', [
            'body' => json_encode($invitation)
        ]);
        
        if (is_wp_error($response)) {
            error_log('Failed to sync invitation: ' . $response->get_error_message());
        }
    } catch (Exception $e) {
        error_log('Invitation sync error: ' . $e->getMessage());
    }
}, 10, 1);
```

---

## Notes

**Important:** Fluent Community uses WordPress's built-in authentication system. For actual login/logout events, use WordPress core hooks:

- `wp_login` - Fires after user login
- `wp_logout` - Fires before user logout  
- `user_register` - Fires after user registration

**Example:**

```php
// Track Fluent Community user logins
add_action('wp_login', function($user_login, $user) {
    // Check if user has community profile
    $profile = \FluentCommunity\App\Models\XProfile::where('user_id', $user->ID)->first();
    
    if ($profile) {
        update_user_meta($user->ID, 'last_community_login', current_time('mysql'));
    }
}, 10, 2);
```

