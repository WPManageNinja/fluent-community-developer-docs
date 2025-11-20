---
prev:
  text: 'Lessons & Sections'
  link: '/hooks/actions/lessons'
next:
  text: 'Portal & UI'
  link: '/hooks/actions/portal'
---

# Integrations Actions

## Paywall Actions

### fluent_community/paywall_added

Fires when a paywall is added to content (space, course, or other protected content).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$paywall` | Paywall Object | The paywall configuration object |
| `$space` | Space Object | The space or content being protected |

**Paywall Object Properties:**
- `id` (int) - Paywall ID
- `object_id` (int) - Protected object ID (space, course, etc.)
- `object_type` (string) - Type of protected content
- `product_ids` (array) - Associated product IDs
- `settings` (array) - Paywall configuration
- `status` (string) - Paywall status ('active', 'inactive')
- `created_at` (string) - Creation timestamp

**Source Files:**
- `app-pro/Http/Controllers/PaywallController.php`

**Example Usage:**

```php
// Log paywall creation
add_action('fluent_community/paywall_added', function($paywall, $space) {
    error_log(sprintf(
        'Paywall %d added to %s %d',
        $paywall->id,
        $paywall->object_type,
        $paywall->object_id
    ));
}, 10, 2);

// Notify space members about paywall
add_action('fluent_community/paywall_added', function($paywall, $space) {
    if ($paywall->object_type !== 'space') {
        return;
    }
    
    $members = get_space_members($space->id);
    
    foreach ($members as $member) {
        send_notification($member->user_id, [
            'type' => 'space_paywall_added',
            'space_id' => $space->id,
            'paywall_id' => $paywall->id
        ]);
    }
}, 10, 2);

// Sync with external payment system
add_action('fluent_community/paywall_added', function($paywall, $space) {
    wp_remote_post('https://payment.example.com/api/paywalls', [
        'body' => json_encode([
            'paywall_id' => $paywall->id,
            'object_type' => $paywall->object_type,
            'object_id' => $paywall->object_id,
            'product_ids' => $paywall->product_ids
        ])
    ]);
}, 10, 2);

// Update space settings
add_action('fluent_community/paywall_added', function($paywall, $space) {
    if ($paywall->object_type === 'space') {
        // Mark space as premium
        update_post_meta($space->id, 'is_premium', true);
        update_post_meta($space->id, 'paywall_id', $paywall->id);
    }
}, 10, 2);
```

**Common Use Cases:**
- Notify existing members about new paywall
- Sync paywall data with external payment systems
- Update content metadata to reflect premium status
- Log paywall creation for analytics
- Trigger automated workflows for monetization
- Update access control lists

---

### fluent_community/paywall_removed

Fires when a paywall is removed from content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$paywall` | Paywall Object | The paywall being removed |
| `$space` | Space Object | The space or content being unprotected |

**Source Files:**
- `app-pro/Http/Controllers/PaywallController.php`

**Example Usage:**

```php
// Log paywall removal
add_action('fluent_community/paywall_removed', function($paywall, $space) {
    error_log(sprintf(
        'Paywall %d removed from %s %d',
        $paywall->id,
        $paywall->object_type,
        $paywall->object_id
    ));
}, 10, 2);

// Notify members about free access
add_action('fluent_community/paywall_removed', function($paywall, $space) {
    if ($paywall->object_type !== 'space') {
        return;
    }
    
    $members = get_space_members($space->id);
    
    foreach ($members as $member) {
        send_notification($member->user_id, [
            'type' => 'space_now_free',
            'space_id' => $space->id,
            'message' => 'This space is now free to access!'
        ]);
    }
}, 10, 2);

// Update space metadata
add_action('fluent_community/paywall_removed', function($paywall, $space) {
    if ($paywall->object_type === 'space') {
        delete_post_meta($space->id, 'is_premium');
        delete_post_meta($space->id, 'paywall_id');
    }
}, 10, 2);

// Sync with external system
add_action('fluent_community/paywall_removed', function($paywall, $space) {
    wp_remote_post('https://payment.example.com/api/paywalls/remove', [
        'body' => json_encode([
            'paywall_id' => $paywall->id,
            'object_id' => $paywall->object_id
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Notify members about free access
- Update content metadata
- Sync removal with external payment systems
- Clean up access restrictions
- Log paywall removal for analytics
- Trigger promotional campaigns for newly free content

---

## Product Integration Actions

### fluent_community/product_integration_feed_created

Fires when a feed is created through product integration (e.g., when a product purchase triggers content creation).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$integrationId` | int\|null | Community integration ID (may be null) |
| `$productId` | int | Product ID that triggered the feed creation |

**Source Files:**
- `app/FluentCart/Paywalls.php:83`

**Example Usage:**

```php
// Log product integration feed creation
add_action('fluent_community/product_integration_feed_created', function($integrationId, $productId) {
    error_log(sprintf(
        'Feed created via product integration. Integration: %s, Product: %d',
        $integrationId ?? 'none',
        $productId
    ));
}, 10, 2);

// Award bonus points for product-triggered content
add_action('fluent_community/product_integration_feed_created', function($integrationId, $productId) {
    if (!$integrationId) {
        return;
    }
    
    $integration = get_integration($integrationId);
    if ($integration && $integration->user_id) {
        $points = get_user_meta($integration->user_id, 'community_points', true) ?: 0;
        update_user_meta($integration->user_id, 'community_points', $points + 50);
    }
}, 10, 2);

// Sync with CRM
add_action('fluent_community/product_integration_feed_created', function($integrationId, $productId) {
    wp_remote_post('https://crm.example.com/api/events', [
        'body' => json_encode([
            'event' => 'product_feed_created',
            'integration_id' => $integrationId,
            'product_id' => $productId,
            'timestamp' => current_time('mysql')
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Track product-triggered content creation
- Award bonus points for integrated content
- Sync with CRM or analytics systems
- Trigger welcome workflows for new product customers
- Log integration activity

---

### fluent_community/product_integration_feed_updated

Fires when a product integration feed is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$integrationId` | int | Integration ID |
| `$spaceId` | int | Space ID where feed was updated |

**Source Files:**
- `app/FluentCart/Paywalls.php:56, 118`

**Example Usage:**

```php
// Log product integration feed updates
add_action('fluent_community/product_integration_feed_updated', function($integrationId, $spaceId) {
    error_log(sprintf(
        'Product integration feed updated. Integration: %d, Space: %d',
        $integrationId,
        $spaceId
    ));
}, 10, 2);

// Notify space moderators
add_action('fluent_community/product_integration_feed_updated', function($integrationId, $spaceId) {
    $moderators = get_space_moderators($spaceId);
    
    foreach ($moderators as $moderator) {
        send_notification($moderator->user_id, [
            'type' => 'integration_feed_updated',
            'space_id' => $spaceId,
            'integration_id' => $integrationId
        ]);
    }
}, 10, 2);

// Track integration activity
add_action('fluent_community/product_integration_feed_updated', function($integrationId, $spaceId) {
    $update_count = get_post_meta($integrationId, 'feed_update_count', true) ?: 0;
    update_post_meta($integrationId, 'feed_update_count', $update_count + 1);
    update_post_meta($integrationId, 'last_feed_update', current_time('mysql'));
}, 10, 2);

// Sync with external system
add_action('fluent_community/product_integration_feed_updated', function($integrationId, $spaceId) {
    wp_remote_post('https://api.example.com/integrations/feed-updated', [
        'body' => json_encode([
            'integration_id' => $integrationId,
            'space_id' => $spaceId,
            'timestamp' => current_time('mysql')
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Track integration feed updates
- Notify space moderators of changes
- Log integration activity
- Sync with external systems
- Monitor integration health

---

## See Also

- [Paywall Filters](/hooks/filters/integrations) - Modify paywall data
- [Space Actions](/hooks/actions/spaces) - Space-related actions
- [Course Actions](/hooks/actions/courses) - Course-related actions
- [Examples](/hooks/examples) - Real-world examples

