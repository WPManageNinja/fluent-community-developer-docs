---
prev:
  text: 'Rate Limiting Filters'
  link: '/hooks/filters/rate-limiting'
next:
  text: 'Miscellaneous Filters'
  link: '/hooks/filters/miscellaneous'
---

<DocStatusBanner />


# Integrations Filters

## Fluent Forms Integration

### fluent_community/fluentform__defaults ​

Filters default settings for Fluent Forms integration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$defaults` | array | Default integration settings |

**Return:** `array` - Modified defaults

**Example Usage:**

```php
// Configure Fluent Forms integration
add_filter('fluent_community/fluentform__defaults', function($defaults) {
    $defaults['auto_create_space'] = true;
    $defaults['default_space_id'] = 5;
    $defaults['assign_role'] = 'member';
    $defaults['send_welcome_email'] = true;
    
    return $defaults;
});

// Map form fields to user profile
add_filter('fluent_community/fluentform__defaults', function($defaults) {
    $defaults['field_mapping'] = [
        'first_name'      => 'names.first_name',
        'last_name'       => 'names.last_name',
        'email'           => 'email',
        'phone'           => 'phone',
        'company'         => 'custom.company',
        'job_title'       => 'custom.job_title',
        'bio'             => 'description'
    ];
    
    return $defaults;
});

// Configure post-submission actions
add_filter('fluent_community/fluentform__defaults', function($defaults) {
    $defaults['actions'] = [
        'create_feed_post' => true,
        'notify_admins'    => true,
        'add_to_group'     => true,
        'assign_badge'     => 'new_member'
    ];
    
    return $defaults;
});

// Set up conditional logic
add_filter('fluent_community/fluentform__defaults', function($defaults) {
    $defaults['conditional_logic'] = [
        'enabled' => true,
        'rules'   => [
            [
                'field'    => 'membership_type',
                'operator' => 'equals',
                'value'    => 'premium',
                'action'   => 'assign_role',
                'target'   => 'premium_member'
            ]
        ]
    ];
    
    return $defaults;
});
```

**Common Use Cases:**
- Form integration setup
- Field mapping
- Post-submission actions
- Conditional logic
- Role assignment

---

## WP Payment Form Integration

### fluent_community/wppayform__defaults ​

Filters default settings for WP Payment Form integration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$defaults` | array | Default integration settings |

**Return:** `array` - Modified defaults

**Example Usage:**

```php
// Configure payment form integration
add_filter('fluent_community/wppayform__defaults', function($defaults) {
    $defaults['auto_upgrade_role'] = true;
    $defaults['premium_space_access'] = [5, 10, 15];
    $defaults['payment_required_message'] = 'Please complete payment to access premium features.';
    
    return $defaults;
});

// Map payment plans to community roles
add_filter('fluent_community/wppayform__defaults', function($defaults) {
    $defaults['plan_role_mapping'] = [
        'basic_plan'     => 'basic_member',
        'premium_plan'   => 'premium_member',
        'enterprise_plan' => 'enterprise_member'
    ];
    
    return $defaults;
});

// Configure subscription actions
add_filter('fluent_community/wppayform__defaults', function($defaults) {
    $defaults['subscription_actions'] = [
        'on_payment_success' => [
            'grant_access'     => true,
            'send_welcome'     => true,
            'assign_badge'     => 'paid_member',
            'add_to_spaces'    => [5, 10]
        ],
        'on_payment_failed' => [
            'revoke_access'    => true,
            'send_notification' => true
        ],
        'on_subscription_cancelled' => [
            'downgrade_role'   => 'free_member',
            'remove_from_spaces' => [5, 10]
        ]
    ];
    
    return $defaults;
});

// Set up trial period handling
add_filter('fluent_community/wppayform__defaults', function($defaults) {
    $defaults['trial_settings'] = [
        'enabled'           => true,
        'duration_days'     => 14,
        'trial_role'        => 'trial_member',
        'trial_spaces'      => [5],
        'convert_on_payment' => true
    ];
    
    return $defaults;
});
```

**Common Use Cases:**
- Payment integration
- Role upgrades
- Subscription management
- Trial periods
- Access control

---

## Invitation Links

### fluent_community/create_invitation_link ​

Filters the invitation link creation process.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$link` | string | Generated invitation link |
| `$data` | array | Invitation data |

**Return:** `string` - Modified link

**Example Usage:**

```php
// Customize invitation link format
add_filter('fluent_community/create_invitation_link', function($link, $data) {
    // Add custom parameters
    $link = add_query_arg([
        'ref'    => $data['inviter_id'],
        'source' => 'email',
        'campaign' => 'member_invite'
    ], $link);
    
    return $link;
}, 10, 2);

// Use custom domain for invitation links
add_filter('fluent_community/create_invitation_link', function($link, $data) {
    $custom_domain = 'https://join.mycommunity.com';
    
    // Replace default domain
    $link = str_replace(home_url(), $custom_domain, $link);
    
    return $link;
}, 10, 2);

// Add tracking parameters
add_filter('fluent_community/create_invitation_link', function($link, $data) {
    $tracking_params = [
        'utm_source'   => 'community',
        'utm_medium'   => 'invitation',
        'utm_campaign' => 'member_referral',
        'utm_content'  => $data['space_id'] ?? 'general'
    ];
    
    $link = add_query_arg($tracking_params, $link);
    
    return $link;
}, 10, 2);

// Shorten invitation links
add_filter('fluent_community/create_invitation_link', function($link, $data) {
    // Use URL shortener service
    $short_link = shorten_url($link);
    
    if ($short_link) {
        // Store mapping for analytics
        store_link_mapping($short_link, $link, $data);
        return $short_link;
    }
    
    return $link;
}, 10, 2);

// Add expiration to link
add_filter('fluent_community/create_invitation_link', function($link, $data) {
    $expires = time() + (7 * DAY_IN_SECONDS); // 7 days
    
    $link = add_query_arg([
        'expires' => $expires,
        'token'   => wp_create_nonce('invite_' . $data['code'] . '_' . $expires)
    ], $link);
    
    return $link;
}, 10, 2);
```

**Common Use Cases:**
- Link customization
- Custom domains
- Tracking parameters
- URL shortening
- Expiration handling

---

## Support & Documentation Links

### fluent_community_pro/community_support_url ​

Filters the community support URL.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | string | Support URL |

**Return:** `string` - Modified URL

**Example Usage:**

```php
// Set custom support URL
add_filter('fluent_community_pro/community_support_url', function($url) {
    return 'https://support.mycommunity.com';
});

// Dynamic support URL based on user role
add_filter('fluent_community_pro/community_support_url', function($url) {
    $user = wp_get_current_user();
    
    if (in_array('premium_member', $user->roles)) {
        return 'https://support.mycommunity.com/premium';
    }
    
    return 'https://support.mycommunity.com/general';
});

// Localized support URLs
add_filter('fluent_community_pro/community_support_url', function($url) {
    $locale = get_user_locale();
    
    $support_urls = [
        'en_US' => 'https://support.mycommunity.com/en',
        'es_ES' => 'https://support.mycommunity.com/es',
        'fr_FR' => 'https://support.mycommunity.com/fr',
        'de_DE' => 'https://support.mycommunity.com/de'
    ];
    
    return $support_urls[$locale] ?? $url;
});

// Add context parameters
add_filter('fluent_community_pro/community_support_url', function($url) {
    $context = [
        'page'    => $_GET['page'] ?? '',
        'section' => $_GET['section'] ?? '',
        'user_id' => get_current_user_id()
    ];
    
    return add_query_arg($context, $url);
});
```

**Common Use Cases:**
- Custom support URLs
- Role-based support
- Localization
- Context parameters

---

### fluent_community_pro/docs_url ​

Filters the documentation URL.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | string | Documentation URL |

**Return:** `string` - Modified URL

**Example Usage:**

```php
// Set custom documentation URL
add_filter('fluent_community_pro/docs_url', function($url) {
    return 'https://docs.mycommunity.com';
});

// Context-aware documentation
add_filter('fluent_community_pro/docs_url', function($url) {
    $current_page = get_current_screen();
    
    $doc_mapping = [
        'spaces'  => 'https://docs.mycommunity.com/spaces',
        'feeds'   => 'https://docs.mycommunity.com/feeds',
        'members' => 'https://docs.mycommunity.com/members',
        'courses' => 'https://docs.mycommunity.com/courses'
    ];
    
    if (isset($doc_mapping[$current_page->id])) {
        return $doc_mapping[$current_page->id];
    }
    
    return $url;
});

// Localized documentation
add_filter('fluent_community_pro/docs_url', function($url) {
    $locale = get_user_locale();
    
    $docs_urls = [
        'en_US' => 'https://docs.mycommunity.com/en',
        'es_ES' => 'https://docs.mycommunity.com/es',
        'fr_FR' => 'https://docs.mycommunity.com/fr',
        'de_DE' => 'https://docs.mycommunity.com/de'
    ];
    
    return $docs_urls[$locale] ?? $url;
});

// Version-specific documentation
add_filter('fluent_community_pro/docs_url', function($url) {
    $version = get_plugin_version('fluent-community');
    
    return add_query_arg('version', $version, $url);
});
```

**Common Use Cases:**
- Custom documentation URLs
- Context-aware docs
- Localization
- Version-specific docs

---

## Best Practices

### 1. Validate Integration Settings

```php
add_filter('fluent_community/fluentform__defaults', function($defaults) {
    // Validate space IDs exist
    if (isset($defaults['default_space_id'])) {
        $space = get_space($defaults['default_space_id']);
        if (!$space) {
            $defaults['default_space_id'] = null;
        }
    }
    
    return $defaults;
});
```

### 2. Secure External Links

```php
add_filter('fluent_community/create_invitation_link', function($link, $data) {
    // Always use HTTPS
    $link = str_replace('http://', 'https://', $link);
    
    // Add security token
    $token = wp_create_nonce('invite_' . $data['code']);
    $link = add_query_arg('token', $token, $link);
    
    return $link;
}, 10, 2);
```

### 3. Cache External URLs

```php
add_filter('fluent_community_pro/docs_url', function($url) {
    $cache_key = 'docs_url_' . get_user_locale();
    $cached_url = wp_cache_get($cache_key);
    
    if (false !== $cached_url) {
        return $cached_url;
    }
    
    // Build URL
    $url = build_localized_docs_url();
    
    wp_cache_set($cache_key, $url, '', 3600);
    
    return $url;
});
```

### 4. Provide Fallbacks

```php
add_filter('fluent_community_pro/community_support_url', function($url) {
    $custom_url = get_option('custom_support_url');
    
    // Use custom URL if set, otherwise use default
    return !empty($custom_url) ? $custom_url : $url;
});
```

---

## Related Documentation

- [Settings Filters](/hooks/filters/settings)
- [Authentication Filters](/hooks/filters/authentication)
- [Users Filters](/hooks/filters/users)
- [Code Snippets](/guides/code-snippets)

