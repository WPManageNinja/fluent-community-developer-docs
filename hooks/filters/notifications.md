---
prev:
  text: 'API Responses Filters'
  link: '/hooks/filters/api-responses'
next:
  text: 'Reactions Filters'
  link: '/hooks/filters/reactions'
---

<DocStatusBanner />


# Email & Notifications Filters

## Authentication Emails

### fluent_community/auth/signup_verification_email_body ​

Filters the email body for signup verification emails.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$emailBody` | string | Email body HTML |
| `$user` | User | User object |
| `$verificationUrl` | string | Verification URL |

**Return:** `string` - Modified email body

**Example Usage:**

```php
// Custom verification email
add_filter('fluent_community/auth/signup_verification_email_body', function($emailBody, $user, $verificationUrl) {
    $html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';
    $html .= '<h2>Welcome to Our Community, ' . esc_html($user->display_name) . '!</h2>';
    $html .= '<p>Thank you for signing up. Please verify your email address to get started.</p>';
    $html .= '<p style="text-align: center; margin: 30px 0;">';
    $html .= '<a href="' . esc_url($verificationUrl) . '" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Verify Email Address</a>';
    $html .= '</p>';
    $html .= '<p style="color: #666; font-size: 14px;">If the button doesn\'t work, copy and paste this link:</p>';
    $html .= '<p style="color: #666; font-size: 12px; word-break: break-all;">' . esc_url($verificationUrl) . '</p>';
    $html .= '</div>';

    return $html;
}, 10, 3);

// Add branding
add_filter('fluent_community/auth/signup_verification_email_body', function($emailBody, $user, $verificationUrl) {
    $logo_url = get_option('community_logo_url');

    $html = '<div style="text-align: center; margin-bottom: 20px;">';
    $html .= '<img src="' . esc_url($logo_url) . '" alt="Logo" style="max-width: 200px;">';
    $html .= '</div>';
    $html .= $emailBody;

    return $html;
}, 10, 3);

// Add social links
add_filter('fluent_community/auth/signup_verification_email_body', function($emailBody, $user, $verificationUrl) {
    $footer = '<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">';
    $footer .= '<p>Follow us on:</p>';
    $footer .= '<a href="https://twitter.com/yourhandle">Twitter</a> | ';
    $footer .= '<a href="https://facebook.com/yourpage">Facebook</a> | ';
    $footer .= '<a href="https://linkedin.com/company/yourcompany">LinkedIn</a>';
    $footer .= '</div>';

    return $emailBody . $footer;
}, 10, 3);
```

**Common Use Cases:**
- Custom email design
- Branding
- Additional information
- Social links
- Terms & conditions

---

### fluent_community/auth/signup_verification_mail_subject ​

Filters the email subject for signup verification emails.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$subject` | string | Email subject |
| `$user` | User | User object |

**Return:** `string` - Modified subject

**Example Usage:**

```php
// Custom subject
add_filter('fluent_community/auth/signup_verification_mail_subject', function($subject, $user) {
    return 'Welcome to ' . get_bloginfo('name') . ' - Verify Your Email';
}, 10, 2);

// Personalized subject
add_filter('fluent_community/auth/signup_verification_mail_subject', function($subject, $user) {
    return sprintf('Hi %s! Verify your email to join our community', $user->display_name);
}, 10, 2);

// Multilingual subject
add_filter('fluent_community/auth/signup_verification_mail_subject', function($subject, $user) {
    $locale = get_user_locale($user->ID);

    $subjects = [
        'en_US' => 'Verify Your Email Address',
        'es_ES' => 'Verifica tu dirección de correo electrónico',
        'fr_FR' => 'Vérifiez votre adresse e-mail',
        'de_DE' => 'Bestätigen Sie Ihre E-Mail-Adresse'
    ];

    return $subjects[$locale] ?? $subject;
}, 10, 2);
```

**Common Use Cases:**
- Custom subjects
- Personalization
- Branding
- Multilingual support

---

## Digest Emails

### fluent_community/digest_email_body ​

Filters the digest email body content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$emailBody` | string | Email body HTML |
| `$digestData` | array | Digest data (posts, comments, etc.) |
| `$user` | User | Recipient user object |

**Return:** `string` - Modified email body

**Example Usage:**

```php
// Custom digest layout
add_filter('fluent_community/digest_email_body', function($emailBody, $digestData, $user) {
    $html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';

    // Header
    $html .= '<h2>Your Weekly Community Digest</h2>';
    $html .= '<p>Hi ' . esc_html($user->display_name) . ', here\'s what happened this week:</p>';

    // Top Posts
    if (!empty($digestData['top_posts'])) {
        $html .= '<h3>🔥 Top Posts</h3>';
        foreach ($digestData['top_posts'] as $post) {
            $html .= '<div style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">';
            $html .= '<h4><a href="' . esc_url($post['url']) . '">' . esc_html($post['title']) . '</a></h4>';
            $html .= '<p>' . wp_trim_words($post['content'], 30) . '</p>';
            $html .= '<small>' . $post['reactions_count'] . ' reactions • ' . $post['comments_count'] . ' comments</small>';
            $html .= '</div>';
        }
    }

    // New Members
    if (!empty($digestData['new_members'])) {
        $html .= '<h3>👋 New Members</h3>';
        $html .= '<p>' . count($digestData['new_members']) . ' new members joined this week!</p>';
    }

    // Statistics
    $html .= '<div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 5px;">';
    $html .= '<h3>📊 Community Stats</h3>';
    $html .= '<p>Total Posts: ' . ($digestData['stats']['total_posts'] ?? 0) . '</p>';
    $html .= '<p>Total Comments: ' . ($digestData['stats']['total_comments'] ?? 0) . '</p>';
    $html .= '<p>Active Members: ' . ($digestData['stats']['active_members'] ?? 0) . '</p>';
    $html .= '</div>';

    $html .= '</div>';

    return $html;
}, 10, 3);

// Add personalized recommendations
add_filter('fluent_community/digest_email_body', function($emailBody, $digestData, $user) {
    $recommendations = get_user_recommendations($user->ID);

    if (!empty($recommendations)) {
        $section = '<div style="margin-top: 30px;">';
        $section .= '<h3>💡 Recommended for You</h3>';

        foreach ($recommendations as $item) {
            $section .= '<div style="margin-bottom: 15px;">';
            $section .= '<a href="' . esc_url($item['url']) . '">' . esc_html($item['title']) . '</a>';
            $section .= '</div>';
        }

        $section .= '</div>';

        $emailBody .= $section;
    }

    return $emailBody;
}, 10, 3);

// Add unsubscribe link
add_filter('fluent_community/digest_email_body', function($emailBody, $digestData, $user) {
    $unsubscribe_url = add_query_arg([
        'action' => 'unsubscribe_digest',
        'user_id' => $user->ID,
        'token' => wp_create_nonce('unsubscribe_' . $user->ID)
    ], home_url());

    $footer = '<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">';
    $footer .= '<p>Don\'t want to receive these emails? <a href="' . esc_url($unsubscribe_url) . '">Unsubscribe</a></p>';
    $footer .= '</div>';

    return $emailBody . $footer;
}, 10, 3);
```

**Common Use Cases:**
- Custom digest layout
- Personalized content
- Statistics
- Recommendations
- Unsubscribe links

---

### fluent_community/digest_email_subject ​

Filters the digest email subject line.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$subject` | string | Email subject |
| `$digestData` | array | Digest data |
| `$user` | User | Recipient user object |

**Return:** `string` - Modified subject

**Example Usage:**

```php
// Dynamic subject with stats
add_filter('fluent_community/digest_email_subject', function($subject, $digestData, $user) {
    $post_count = count($digestData['top_posts'] ?? []);

    return sprintf('Your Weekly Digest: %d new posts you might have missed', $post_count);
}, 10, 3);

// Personalized subject
add_filter('fluent_community/digest_email_subject', function($subject, $digestData, $user) {
    return sprintf('Hi %s! Here\'s your community update', $user->display_name);
}, 10, 3);

// Time-based subject
add_filter('fluent_community/digest_email_subject', function($subject, $digestData, $user) {
    $period = $digestData['period'] ?? 'weekly';

    $subjects = [
        'daily'   => 'Your Daily Community Digest',
        'weekly'  => 'Your Weekly Community Roundup',
        'monthly' => 'Your Monthly Community Highlights'
    ];

    return $subjects[$period] ?? $subject;
}, 10, 3);

// Add emoji for engagement
add_filter('fluent_community/digest_email_subject', function($subject, $digestData, $user) {
    $has_mentions = !empty($digestData['mentions']);

    if ($has_mentions) {
        return '🔔 ' . $subject . ' (You were mentioned!)';
    }

    return '📬 ' . $subject;
}, 10, 3);
```

**Common Use Cases:**
- Dynamic subjects
- Personalization
- Statistics in subject
- Emoji for engagement
- Time period context

---

## Course Notifications

### fluent_community/default_course_email_notification ​

Filters default course email notification settings.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$notification` | array | Email notification configuration |

**Return:** `array` - Modified notification settings

**Example Usage:**

```php
// Customize course notification emails
add_filter('fluent_community/default_course_email_notification', function($notification) {
    $notification['enrollment_confirmation'] = [
        'enabled' => true,
        'subject' => 'Welcome to {{course.title}}!',
        'body'    => 'Hi {{user.name}},<br><br>You\'re now enrolled in {{course.title}}.<br><br>Start learning: {{course.url}}'
    ];

    $notification['lesson_completed'] = [
        'enabled' => true,
        'subject' => 'Great job! Lesson completed',
        'body'    => 'You completed {{lesson.title}}. Keep up the great work!'
    ];

    $notification['course_completed'] = [
        'enabled' => true,
        'subject' => '🎉 Congratulations! You completed {{course.title}}',
        'body'    => 'Amazing work! You\'ve completed all lessons.<br><br>Download your certificate: {{certificate.url}}'
    ];

    return $notification;
});

// Add milestone notifications
add_filter('fluent_community/default_course_email_notification', function($notification) {
    $notification['milestone_25'] = [
        'enabled' => true,
        'subject' => 'You\'re 25% through {{course.title}}!',
        'body'    => 'Great progress! Keep going!',
        'trigger' => 'course_25_percent_complete'
    ];

    $notification['milestone_50'] = [
        'enabled' => true,
        'subject' => 'Halfway there! 50% complete',
        'body'    => 'You\'re halfway through {{course.title}}. Don\'t stop now!',
        'trigger' => 'course_50_percent_complete'
    ];

    $notification['milestone_75'] = [
        'enabled' => true,
        'subject' => 'Almost done! 75% complete',
        'body'    => 'Just a few more lessons to go!',
        'trigger' => 'course_75_percent_complete'
    ];

    return $notification;
});

// Disable specific notifications
add_filter('fluent_community/default_course_email_notification', function($notification) {
    // Disable lesson completion emails
    $notification['lesson_completed']['enabled'] = false;

    return $notification;
});

// Add custom smart codes
add_filter('fluent_community/default_course_email_notification', function($notification) {
    // Add footer to all course emails
    $footer = '<br><br><hr><p style="color: #666; font-size: 12px;">Need help? <a href="{{support.url}}">Contact Support</a></p>';

    foreach ($notification as $key => &$config) {
        if (isset($config['body'])) {
            $config['body'] .= $footer;
        }
    }

    return $notification;
});
```

**Common Use Cases:**
- Course email customization
- Milestone notifications
- Certificate delivery
- Engagement emails
- Progress tracking

---

## Best Practices

### 1. Always Escape Output

```php
add_filter('fluent_community/digest_email_body', function($emailBody, $digestData, $user) {
    // Always escape user-generated content
    $html = '<h2>Hi ' . esc_html($user->display_name) . '</h2>';

    foreach ($digestData['posts'] as $post) {
        $html .= '<a href="' . esc_url($post['url']) . '">';
        $html .= esc_html($post['title']);
        $html .= '</a>';
    }

    return $html;
}, 10, 3);
```

### 2. Provide Plain Text Alternative

```php
add_filter('fluent_community/digest_email_body', function($emailBody, $digestData, $user) {
    // Some email clients prefer plain text
    // Consider adding a plain text version

    return $emailBody;
}, 10, 3);
```

### 3. Test Email Rendering

```php
add_filter('fluent_community/auth/signup_verification_email_body', function($emailBody, $user, $verificationUrl) {
    // Use inline CSS for better email client compatibility
    $html = '<div style="font-family: Arial, sans-serif;">';
    $html .= '<table width="100%" cellpadding="0" cellspacing="0">';
    $html .= '<tr><td style="padding: 20px;">';
    $html .= 'Content here';
    $html .= '</td></tr>';
    $html .= '</table>';
    $html .= '</div>';

    return $html;
}, 10, 3);
```

### 4. Respect User Preferences

```php
add_filter('fluent_community/digest_email_body', function($emailBody, $digestData, $user) {
    // Check user notification preferences
    $preferences = get_user_meta($user->ID, 'email_preferences', true);

    if (!empty($preferences['hide_stats'])) {
        // Remove stats section if user prefers
    }

    return $emailBody;
}, 10, 3);
```

---

## Related Documentation

- [Authentication Filters](/hooks/filters/authentication)
- [Courses Filters](/hooks/filters/courses)
- [Settings Filters](/hooks/filters/settings)
- [Code Snippets](/guides/code-snippets)

