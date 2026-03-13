---
title: Performance Optimization
description: Operational tuning guidance for FluentCommunity production sites.
---

# Performance Optimization

FluentCommunity already ships as a Vue SPA with custom tables and Action Scheduler-backed background work. The biggest gains usually come from the surrounding WordPress environment.

## Start with the High-Impact Wins

1. Use server cron for WP-Cron so scheduled emails, digests, and async jobs do not depend on traffic.
2. Enable an object cache such as Redis.
3. Offload user-uploaded media to remote storage if uploads are frequent.
4. Keep the active plugin set on the portal lean.

## Understand the Scheduler Load

Core and Pro both schedule background work heavily:

- notification fan-out
- daily digests
- scheduled post publication
- moderation and follower notifications

If Action Scheduler is lagging, users feel it as delayed notifications or slow admin tools long before the portal itself looks broken.

## Media Offload

Remote storage reduces I/O pressure on the main WordPress server and keeps the portal node focused on PHP, database, and API work.

- [Cloud Storage Overview](/guides/cloud-storage/) <span class="pro-badge">PRO</span>

## Advanced: Trim Plugin Load for FluentCommunity REST Requests

On plugin-heavy sites, a small MU plugin that narrows the loaded plugin set for `wp-json/fluent-community/v2` requests can help materially. This is an advanced technique and should be tested carefully because integrations that rely on normal plugin boot order can break.

```php
<?php
defined('ABSPATH') || exit;

add_filter('option_active_plugins', function ($plugins) {
    $requestUrl = $_SERVER['REQUEST_URI'] ?? '';

    if (strpos($requestUrl, 'wp-json/fluent-community/v2') === false) {
        return $plugins;
    }

    $allowList = [
        'fluent-community/fluent-community.php',
        'fluent-community-pro/fluent-community-pro.php',
        'fluent-smtp/fluent-smtp.php',
        'fluent-crm/fluent-crm.php',
        'easy-code-manager/easy-code-manager.php',
    ];

    return array_values(array_intersect($plugins, $allowList));
});
```

Use this only when you understand the dependencies of the features you expose through the portal and REST API.
