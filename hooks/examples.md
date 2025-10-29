# Examples & Use Cases

Real-world examples of using Fluent Community hooks to extend and customize your community.

## Browse Hooks

- 📋 **[All Actions](/hooks/actions/)** - Browse all 182 action hooks by module
- 🔧 **[All Filters](/hooks/filters/)** - Browse all 180 filter hooks by module
- 📖 **[Quick Reference](/hooks/quick-reference)** - Alphabetical listing of all hooks
- 🏠 **[Hooks Overview](/hooks/)** - Return to hooks home

---

## Table of Contents

- [Integration Examples](#integration-examples)
- [Validation & Security](#validation-security)
- [Gamification & Points](#gamification-points)
- [Custom Notifications](#custom-notifications)
- [Content Moderation](#content-moderation)
- [User Management](#user-management)
- [Analytics & Tracking](#analytics-tracking)
- [Third-Party Integrations](#third-party-integrations)

---

## Integration Examples

### Send Data to External CRM

Send user data to your CRM when someone registers:

```php
add_action('fluent_community/user_registered', function($user, $profile) {
    // Send to CRM API
    wp_remote_post('https://crm.example.com/api/contacts', [
        'headers' => ['Authorization' => 'Bearer YOUR_API_KEY'],
        'body' => json_encode([
            'email' => $user->user_email,
            'name' => $profile->display_name,
            'source' => 'community',
            'tags' => ['community-member']
        ])
    ]);
}, 10, 2);
```

### Sync with Mailchimp

Add users to Mailchimp list when they join a space:

```php
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    $user = get_user_by('id', $userId);
    
    // Add to Mailchimp
    $mailchimp = new \MailchimpMarketing\ApiClient();
    $mailchimp->setConfig([
        'apiKey' => 'YOUR_API_KEY',
        'server' => 'us1'
    ]);
    
    try {
        $mailchimp->lists->addListMember('LIST_ID', [
            'email_address' => $user->user_email,
            'status' => 'subscribed',
            'merge_fields' => [
                'FNAME' => $user->first_name,
                'SPACE' => $space->title
            ]
        ]);
    } catch (Exception $e) {
        error_log('Mailchimp error: ' . $e->getMessage());
    }
}, 10, 3);
```

### Webhook Integration

Send webhooks for important events:

```php
function send_community_webhook($event, $data) {
    $webhook_url = get_option('community_webhook_url');
    
    if (!$webhook_url) {
        return;
    }
    
    wp_remote_post($webhook_url, [
        'headers' => ['Content-Type' => 'application/json'],
        'body' => json_encode([
            'event' => $event,
            'data' => $data,
            'timestamp' => current_time('mysql')
        ])
    ]);
}

// Hook into multiple events
add_action('fluent_community/feed/created', function($feed) {
    send_community_webhook('feed.created', [
        'feed_id' => $feed->id,
        'user_id' => $feed->user_id,
        'type' => $feed->type
    ]);
}, 10, 1);

add_action('fluent_community/space/joined', function($space, $userId) {
    send_community_webhook('space.joined', [
        'space_id' => $space->id,
        'user_id' => $userId
    ]);
}, 10, 2);
```

---

## Validation & Security

### Prevent Spam Content

Block posts containing spam keywords:

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $spam_keywords = ['viagra', 'casino', 'lottery', 'click here'];
    $content = strtolower($data['message'] ?? '');
    
    foreach ($spam_keywords as $keyword) {
        if (stripos($content, $keyword) !== false) {
            return new WP_Error(
                'spam_detected',
                'Your post contains prohibited content.',
                ['status' => 403]
            );
        }
    }
    
    return $data;
}, 10, 2);
```

### Require Minimum Post Length

Enforce minimum character count for posts:

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $min_length = 50;
    $message = strip_tags($data['message'] ?? '');
    
    if (strlen($message) < $min_length) {
        return new WP_Error(
            'post_too_short',
            sprintf('Post must be at least %d characters long.', $min_length),
            ['status' => 400]
        );
    }
    
    return $data;
}, 10, 2);
```

### Validate URLs in Posts

Check and validate URLs before allowing posts:

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $message = $data['message'] ?? '';
    
    // Extract URLs
    preg_match_all('#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#', $message, $matches);
    
    $blocked_domains = ['spam.com', 'malicious.net'];
    
    foreach ($matches[0] as $url) {
        $host = parse_url($url, PHP_URL_HOST);
        
        if (in_array($host, $blocked_domains)) {
            return new WP_Error(
                'blocked_url',
                'Your post contains a blocked URL.',
                ['status' => 403]
            );
        }
    }
    
    return $data;
}, 10, 2);
```

### Restrict File Upload Types

Limit media uploads to specific file types:

```php
add_filter('fluent_community/support_attachment_types', function($types) {
    // Only allow images and PDFs
    return [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf'
    ];
}, 10, 1);
```

---

## Gamification & Points

### Award Points for Activities

Create a complete points system:

```php
// Award points for creating posts
add_action('fluent_community/feed/created', function($feed) {
    award_points($feed->user_id, 10, 'post_created');
}, 10, 1);

// Award points for comments
add_action('fluent_community/comment_added', function($comment, $feed) {
    award_points($comment->user_id, 5, 'comment_added');
}, 10, 2);

// Award points for joining spaces
add_action('fluent_community/space/joined', function($space, $userId) {
    award_points($userId, 15, 'space_joined');
}, 10, 2);

// Award points for completing courses
add_action('fluent_community/course/completed', function($course, $userId) {
    award_points($userId, 100, 'course_completed');
}, 10, 2);

// Helper function
function award_points($userId, $points, $reason) {
    $current_points = (int) get_user_meta($userId, 'community_points', true);
    $new_points = $current_points + $points;
    
    update_user_meta($userId, 'community_points', $new_points);
    
    // Log the transaction
    global $wpdb;
    $wpdb->insert($wpdb->prefix . 'community_points_log', [
        'user_id' => $userId,
        'points' => $points,
        'reason' => $reason,
        'created_at' => current_time('mysql')
    ]);
}
```

### Achievement Badges

Award badges based on activity:

```php
add_action('fluent_community/feed/created', function($feed) {
    $user_id = $feed->user_id;
    $post_count = get_user_meta($user_id, 'total_posts', true) ?: 0;
    $post_count++;
    
    update_user_meta($user_id, 'total_posts', $post_count);
    
    // Award badges at milestones
    $badges = [
        10 => 'contributor',
        50 => 'active_member',
        100 => 'super_contributor',
        500 => 'community_legend'
    ];
    
    if (isset($badges[$post_count])) {
        $user_badges = get_user_meta($user_id, 'community_badges', true) ?: [];
        $user_badges[] = [
            'badge' => $badges[$post_count],
            'earned_at' => current_time('mysql')
        ];
        update_user_meta($user_id, 'community_badges', $user_badges);
        
        // Send notification
        do_action('fluent_community/badge_earned', $user_id, $badges[$post_count]);
    }
}, 10, 1);
```

### Leaderboard Integration

Display points in user profiles:

```php
add_filter('fluent_community/user_profile_widgets', function($widgets, $user) {
    $points = get_user_meta($user->ID, 'community_points', true) ?: 0;
    $badges = get_user_meta($user->ID, 'community_badges', true) ?: [];
    
    $widgets['gamification'] = [
        'title' => 'Community Stats',
        'content' => sprintf(
            '<div class="community-stats">
                <div class="points">🏆 %d Points</div>
                <div class="badges">🎖️ %d Badges</div>
            </div>',
            $points,
            count($badges)
        ),
        'priority' => 5
    ];
    
    return $widgets;
}, 10, 2);
```

---

## Custom Notifications

### Custom Email Notifications

Send custom emails for specific events:

```php
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    $user = get_user_by('id', $userId);
    $space_admins = get_space_admins($space->id);
    
    foreach ($space_admins as $admin) {
        wp_mail(
            $admin->user_email,
            sprintf('New member joined %s', $space->title),
            sprintf(
                'Hi %s,\n\n%s has joined your space "%s".\n\nView their profile: %s',
                $admin->display_name,
                $user->display_name,
                $space->title,
                get_author_posts_url($userId)
            )
        );
    }
}, 10, 3);

function get_space_admins($space_id) {
    // Your logic to get space admins
    return [];
}
```

### Slack Notifications

Send notifications to Slack:

```php
add_action('fluent_community/feed/created', function($feed) {
    $webhook_url = 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL';
    
    $user = get_user_by('id', $feed->user_id);
    
    wp_remote_post($webhook_url, [
        'body' => json_encode([
            'text' => sprintf(
                '🎉 New post by %s: %s',
                $user->display_name,
                wp_trim_words($feed->message, 20)
            ),
            'attachments' => [[
                'color' => '#36a64f',
                'fields' => [
                    [
                        'title' => 'Author',
                        'value' => $user->display_name,
                        'short' => true
                    ],
                    [
                        'title' => 'Type',
                        'value' => $feed->type,
                        'short' => true
                    ]
                ]
            ]]
        ]),
        'headers' => ['Content-Type' => 'application/json']
    ]);
}, 10, 1);
```

### Discord Webhooks

Post to Discord channels:

```php
add_action('fluent_community/course/completed', function($course, $userId) {
    $webhook_url = 'https://discord.com/api/webhooks/YOUR/WEBHOOK';
    
    $user = get_user_by('id', $userId);
    
    wp_remote_post($webhook_url, [
        'body' => json_encode([
            'embeds' => [[
                'title' => '🎓 Course Completed!',
                'description' => sprintf(
                    '%s has completed the course: **%s**',
                    $user->display_name,
                    $course->title
                ),
                'color' => 5814783,
                'timestamp' => date('c')
            ]]
        ]),
        'headers' => ['Content-Type' => 'application/json']
    ]);
}, 10, 2);
```

---

## Content Moderation

### Auto-Moderate New Users

Hold posts from new users for review:

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $user_id = get_current_user_id();
    $user = get_user_by('id', $user_id);
    
    // Check if user registered less than 7 days ago
    $registered = strtotime($user->user_registered);
    $days_since_registration = (time() - $registered) / DAY_IN_SECONDS;
    
    if ($days_since_registration < 7) {
        // Set status to pending
        $data['status'] = 'pending';
        
        // Notify moderators
        do_action('fluent_community/new_user_post_pending', $data, $user);
    }
    
    return $data;
}, 10, 2);
```

### Flag Content with AI

Use AI to detect inappropriate content:

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $message = $data['message'] ?? '';
    
    // Call AI moderation API (example with OpenAI)
    $response = wp_remote_post('https://api.openai.com/v1/moderations', [
        'headers' => [
            'Authorization' => 'Bearer YOUR_API_KEY',
            'Content-Type' => 'application/json'
        ],
        'body' => json_encode(['input' => $message])
    ]);
    
    if (!is_wp_error($response)) {
        $body = json_decode(wp_remote_retrieve_body($response), true);
        
        if ($body['results'][0]['flagged'] ?? false) {
            return new WP_Error(
                'content_flagged',
                'Your content was flagged by our moderation system.',
                ['status' => 403]
            );
        }
    }
    
    return $data;
}, 10, 2);
```

### Auto-Delete Spam Comments

Automatically remove comments with spam patterns:

```php
add_action('fluent_community/comment_added', function($comment, $feed) {
    $spam_patterns = [
        '/\b(buy|cheap|discount)\s+(viagra|cialis)/i',
        '/\b(click here|visit now)\b/i',
        '/\b\d{10,}\b/' // Long numbers (phone/card)
    ];
    
    foreach ($spam_patterns as $pattern) {
        if (preg_match($pattern, $comment->message)) {
            // Delete the comment
            wp_delete_comment($comment->id, true);
            
            // Log the action
            error_log(sprintf(
                'Spam comment deleted: ID %d, User %d',
                $comment->id,
                $comment->user_id
            ));
            
            break;
        }
    }
}, 10, 2);
```

---

## User Management

### Auto-Assign Users to Spaces

Automatically add users to spaces based on criteria:

```php
add_action('fluent_community/user_registered', function($user, $profile) {
    // Get user's role or metadata
    $user_role = $user->roles[0] ?? '';
    
    // Map roles to spaces
    $role_space_map = [
        'subscriber' => 123, // Space ID for subscribers
        'contributor' => 456, // Space ID for contributors
        'author' => 789 // Space ID for authors
    ];
    
    if (isset($role_space_map[$user_role])) {
        $space_id = $role_space_map[$user_role];
        
        // Add user to space
        do_action('fluent_community/space/add_member', $space_id, $user->ID);
    }
}, 10, 2);
```

### Sync User Meta

Sync custom user metadata:

```php
add_action('fluent_community/profile_updated', function($user, $profile, $oldProfile) {
    // Sync to WordPress user meta
    update_user_meta($user->ID, 'company', $profile->meta['company'] ?? '');
    update_user_meta($user->ID, 'job_title', $profile->meta['job_title'] ?? '');
    
    // Sync to external system
    wp_remote_post('https://api.example.com/users/' . $user->ID, [
        'body' => json_encode([
            'display_name' => $profile->display_name,
            'bio' => $profile->bio,
            'company' => $profile->meta['company'] ?? ''
        ])
    ]);
}, 10, 3);
```

---

## Analytics & Tracking

### Track User Activity

Log user activities for analytics:

```php
function log_community_activity($user_id, $action, $object_type, $object_id) {
    global $wpdb;
    
    $wpdb->insert($wpdb->prefix . 'community_activity_log', [
        'user_id' => $user_id,
        'action' => $action,
        'object_type' => $object_type,
        'object_id' => $object_id,
        'created_at' => current_time('mysql')
    ]);
}

// Track various activities
add_action('fluent_community/feed/created', function($feed) {
    log_community_activity($feed->user_id, 'created', 'feed', $feed->id);
}, 10, 1);

add_action('fluent_community/comment_added', function($comment) {
    log_community_activity($comment->user_id, 'commented', 'feed', $comment->post_id);
}, 10, 1);

add_action('fluent_community/space/joined', function($space, $userId) {
    log_community_activity($userId, 'joined', 'space', $space->id);
}, 10, 2);
```

### Google Analytics Integration

Send events to Google Analytics:

```php
add_action('fluent_community/feed/created', function($feed) {
    // Send to Google Analytics 4
    wp_remote_post('https://www.google-analytics.com/mp/collect', [
        'body' => json_encode([
            'client_id' => $feed->user_id,
            'events' => [[
                'name' => 'community_post_created',
                'params' => [
                    'feed_type' => $feed->type,
                    'feed_id' => $feed->id
                ]
            ]]
        ]),
        'headers' => ['Content-Type' => 'application/json']
    ]);
}, 10, 1);
```

---

## Third-Party Integrations

### WooCommerce Integration

Award points that can be used as store credit:

```php
// Award points for purchases
add_action('woocommerce_order_status_completed', function($order_id) {
    $order = wc_get_order($order_id);
    $user_id = $order->get_user_id();
    
    if ($user_id) {
        $points = floor($order->get_total() / 10); // 1 point per $10
        award_points($user_id, $points, 'purchase');
    }
});

// Allow points redemption
add_filter('woocommerce_cart_totals_coupon_html', function($coupon_html, $coupon, $discount_amount_html) {
    $user_id = get_current_user_id();
    $points = get_user_meta($user_id, 'community_points', true) ?: 0;
    
    if ($points > 0) {
        $coupon_html .= sprintf(
            '<br><small>You have %d community points available</small>',
            $points
        );
    }
    
    return $coupon_html;
}, 10, 3);
```

### BuddyPress Sync

Sync with BuddyPress activities:

```php
add_action('fluent_community/feed/created', function($feed) {
    if (function_exists('bp_activity_add')) {
        bp_activity_add([
            'user_id' => $feed->user_id,
            'action' => sprintf('%s posted in the community', bp_core_get_userlink($feed->user_id)),
            'content' => $feed->message,
            'type' => 'community_post',
            'item_id' => $feed->id
        ]);
    }
}, 10, 1);
```

---

::: tip Best Practices
1. Always validate and sanitize data
2. Use proper error handling
3. Test in development first
4. Log important actions
5. Consider performance impact
:::

::: warning Security
Never trust user input. Always validate and sanitize data before processing or storing it.
:::

## Need More Examples?

Check out these resources:
- [All Actions](/hooks/actions/) - Complete actions reference
- [All Filters](/hooks/filters/) - Complete filters reference
- [Quick Reference](/hooks/quick-reference) - All hooks at a glance

