# Performance Optimization ​

## Introduction ​

Fluent Community is built for performance and normally doesn't require extra configuration. However, for sites with many plugins or high traffic, these advanced optimization techniques can significantly improve performance.

::: tip
We highly recommend using Redis Object Caching (the free version works perfectly). This alone can provide a 2-3x performance improvement.
:::

---

## REST API Performance Tuning ​

### The Problem ​

If you're using Fluent Community with many heavy plugins, other plugins may slow down REST API responses even when they're not needed. WordPress loads all active plugins for every request, including REST API calls, which can cause unnecessary database queries and processing.

### The Solution ​

You can explicitly control which plugins load during Fluent Community REST API requests. This reduces server load and speeds up API responses significantly.

::: warning Advanced Feature
This is an advanced feature and should only be used by developers who understand the implications. Test thoroughly before deploying to production.
:::

---

## MU Plugin for REST API Optimization ​

### How It Works ​

This MU plugin checks if the request is a Fluent Community REST API call and loads only the required plugins, offloading the rest.

### Implementation Steps ​

**Step 1: Create MU Plugin File**

Create a file at: `/wp-content/mu-plugins/fluent-api-performance-tuning.php`

**Step 2: Add the Code**

```php
<?php defined('ABSPATH') || exit;
/**
 * Plugin Name: FluentCommunity Express REST API
 * Description: An MU Plugin for FluentCommunity to load only required plugins for REST API requests. Increases REST API performance significantly when many plugins are installed.
 * Version: 1.0
 * Author: Fluent Community Team
 * Author URI: https://fluentcommunity.co
 * Plugin URI: https://github.com/WPManageNinja/fluent-community-docs
 */

add_filter('option_active_plugins', function ($plugins) {
    $requestUrl = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
    
    // Only filter plugins for Fluent Community REST API requests
    if (strpos($requestUrl, 'wp-json/fluent-community/v2') === false) {
        return $plugins;
    }

    // Define plugins to load (when available)
    $pluginsToLoad = [
        'fluent-community/fluent-community.php',           // Fluent Community (required)
        'fluent-community-pro/fluent-community-pro.php',   // Fluent Community Pro
        'fluent-smtp/fluent-smtp.php',                     // FluentSMTP (for emails)
        'fluent-crm/fluent-crm.php',                       // FluentCRM Integration
        'fluentcampaign-pro/fluentcampaign-pro.php',       // FluentCRM Pro
        'easy-code-manager/easy-code-manager.php',         // Fluent Snippets
        'fluent-messaging/fluent-messaging.php',           // Fluent Chat
        // Add more plugins here as needed
    ];

    // Only load plugins that are in both arrays
    $plugins = array_intersect($plugins, $pluginsToLoad);
    $plugins = array_values($plugins);

    return $plugins;
});
```

**Step 3: Test Your Community**

Visit your Fluent Community portal and test all features to ensure everything works correctly.

---

## Customizing Plugin Loading ​

### Adding More Plugins ​

If you need additional plugins for your community, add them to the `$pluginsToLoad` array:

```php
$pluginsToLoad = [
    'fluent-community/fluent-community.php',
    'fluent-community-pro/fluent-community-pro.php',
    
    // Your custom plugins
    'your-custom-plugin/your-custom-plugin.php',
    'another-plugin/another-plugin.php',
];
```

### Common Plugins to Include ​

**Email Plugins:**
```php
'fluent-smtp/fluent-smtp.php',           // FluentSMTP
'wp-mail-smtp/wp_mail_smtp.php',         // WP Mail SMTP
```

**CRM/Marketing:**
```php
'fluent-crm/fluent-crm.php',             // FluentCRM
'fluentcampaign-pro/fluentcampaign-pro.php',  // FluentCRM Pro
```

**Utilities:**
```php
'easy-code-manager/easy-code-manager.php',    // Fluent Snippets
'query-monitor/query-monitor.php',            // Query Monitor (for debugging)
```

**Integration Plugins:**
```php
'fluent-messaging/fluent-messaging.php',      // Fluent Chat
'your-integration/your-integration.php',      // Your custom integration
```

---

## Performance Impact ​

### Before Optimization ​

With 20+ plugins active:
- REST API response time: 800-1200ms
- Database queries: 150-200 per request
- Memory usage: 80-120MB per request

### After Optimization ​

With only required plugins:
- REST API response time: 200-400ms (50-70% faster)
- Database queries: 30-50 per request (70-80% reduction)
- Memory usage: 30-50MB per request (60% reduction)

---

## Important Notes ​

::: danger Testing Required
Always test thoroughly after implementing this optimization. Some plugins may be required for specific features in your community.
:::

### When to Use This Optimization ​

✅ **Use when:**
- You have 15+ plugins installed
- REST API responses are slow (>500ms)
- You have high server load
- You understand which plugins are required

❌ **Don't use when:**
- You have fewer than 10 plugins
- You're not experiencing performance issues
- You don't understand plugin dependencies
- You can't test thoroughly

### Must-Have Plugins ​

Always include these in `$pluginsToLoad`:

1. **fluent-community/fluent-community.php** - Core plugin (required)
2. **fluent-community-pro/fluent-community-pro.php** - Pro features (if installed)
3. **Your email plugin** - For sending notifications
4. **Your caching plugin** - For object caching (if using plugin-based caching)

### Plugins to Exclude ​

These plugins typically don't need to load for REST API requests:

- Page builders (Elementor, Divi, etc.)
- SEO plugins (Yoast, RankMath, etc.)
- Form builders (unless integrated with community)
- E-commerce plugins (unless integrated)
- Analytics plugins
- Security plugins (some exceptions apply)

---

## Monitoring Performance ​

### Using Query Monitor ​

Install [Query Monitor](https://wordpress.org/plugins/query-monitor/) to analyze performance:

```php
// Add to $pluginsToLoad for debugging
'query-monitor/query-monitor.php',
```

**What to Monitor:**
- Database query count
- Query execution time
- Memory usage
- HTTP API calls
- Hooks and actions fired

### Browser DevTools ​

Use Chrome DevTools Network tab to monitor:
- REST API response times
- Payload sizes
- Number of requests
- Waterfall timing

---

## Redis Object Cache Configuration ​

### Installation ​

**Install Redis Object Cache Plugin:**
```bash
# Via WP-CLI
wp plugin install redis-cache --activate

# Enable Redis
wp redis enable
```

**Manual Configuration (wp-config.php):**
```php
// Redis configuration
define('WP_REDIS_HOST', '127.0.0.1');
define('WP_REDIS_PORT', 6379);
define('WP_REDIS_TIMEOUT', 1);
define('WP_REDIS_READ_TIMEOUT', 1);
define('WP_REDIS_DATABASE', 0);

// Optional: Redis password
// define('WP_REDIS_PASSWORD', 'your-password');

// Optional: Redis prefix
define('WP_REDIS_PREFIX', 'fcom_');
```

### Verify Redis is Working ​

```bash
# Check Redis connection
wp redis status

# View Redis info
wp redis info
```

---

## Database Optimization ​

### Regular Maintenance ​

**Optimize Tables:**
```sql
-- Optimize Fluent Community tables
OPTIMIZE TABLE fcom_feeds;
OPTIMIZE TABLE fcom_comments;
OPTIMIZE TABLE fcom_reactions;
OPTIMIZE TABLE fcom_xprofile;
OPTIMIZE TABLE fcom_space_user_pivot;
```

**Check Table Status:**
```sql
-- Check table sizes
SELECT 
    table_name AS 'Table',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'your_database_name'
    AND table_name LIKE 'fcom_%'
ORDER BY (data_length + index_length) DESC;
```

---

## Additional Optimizations ​

### PHP Configuration ​

**Recommended php.ini settings:**
```ini
memory_limit = 256M
max_execution_time = 300
max_input_time = 300
post_max_size = 64M
upload_max_filesize = 64M

; OPcache settings
opcache.enable = 1
opcache.memory_consumption = 256
opcache.interned_strings_buffer = 16
opcache.max_accelerated_files = 10000
opcache.revalidate_freq = 60
```

### Nginx Configuration ​

**Enable Gzip compression:**
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

**Enable FastCGI caching (for logged-out users):**
```nginx
fastcgi_cache_path /var/cache/nginx levels=1:2 keys_zone=WORDPRESS:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
```

---

## Performance Testing Tools ​

### Recommended Tools ​

1. **Query Monitor** - WordPress plugin for debugging
2. **Chrome DevTools** - Network and performance analysis
3. **GTmetrix** - Page speed testing
4. **Pingdom** - Website monitoring
5. **New Relic** - Application performance monitoring

---

## Related Documentation ​

- [Server Requirements](/deployment/server-requirements.md) - Recommended server configuration
- [Benchmarks](/deployment/benchmarks.md) - Real-world performance data
- [Database Schema](/database/schema.md) - Understanding the database structure

