<DocStatusBanner />

# Server Requirements & Configuration ​

## Introduction ​

Fluent Community is built with performance in mind. This guide covers the recommended server configuration and requirements to ensure your community runs fast and efficiently.

## Why Fluent Community is Fast ​

Fluent Community was designed from the ground up for performance:

### Architecture Optimizations ​

**Single-Page Application (SPA)**
- Built with VueJS for a fast, responsive interface
- No page reloads when navigating between sections
- Instant transitions and smooth user experience

**Custom Database Schema**
- Optimized custom database tables (fcom_* prefix)
- Efficient indexing for fast queries
- [View Database Schema](/database/schema.md)

**Query Optimization**
- All database queries are optimized for performance
- Efficient use of indexes and relationships
- Minimal database round trips

**Smart Caching**
- Object caching for frequently used data (settings, configurations)
- Reduces database queries significantly
- Compatible with Redis, Memcached, and other object cache systems

**Lazy Loading**
- Images and assets load on demand
- Reduces initial page load time
- Improves perceived performance

**Background Job Processing**
- Long-running tasks (email notifications, etc.) run in background
- Users don't wait for jobs to complete
- Scheduled actions for efficient processing

**Optimized Media Handling**
- Automatic image resizing
- WebP conversion for smaller file sizes
- Significant bandwidth savings

---

## Recommended Server Software ​

### PHP Version ​

**Minimum:** PHP 7.4  
**Recommended:** PHP 8.1 or higher

::: tip
PHP 8.1+ provides significant performance improvements over PHP 7.x. We highly recommend upgrading to PHP 8.1 or 8.2 for the best performance.
:::

---

### Database ​

**MySQL:** Version 8.0 or greater  
**MariaDB:** Version 10.5 or greater

::: tip
MySQL 8.0 and MariaDB 10.5+ include performance improvements and better support for modern SQL features used by Fluent Community.
:::

---

### Web Server ​

**Recommended:** Nginx

**Alternative:** Apache with mod_rewrite enabled

::: tip Why Nginx?
Nginx is more efficient at handling concurrent connections and static file serving, making it ideal for community platforms with many simultaneous users.
:::

---

### Object Cache ​

**Highly Recommended:** Redis

**Alternatives:**
- Memcached
- APCu (for single-server setups)

::: tip
You don't need the Pro version of object caching plugins. The free version of Redis Object Cache plugin works perfectly with Fluent Community.
:::

**Installation:**
```bash
# Install Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# Install Redis PHP extension
sudo apt-get install php-redis

# Restart PHP-FPM
sudo service php8.1-fpm restart
```

---

## Server-Side CRON ​

Fluent Community processes notification emails and scheduled actions using WordPress CRON. For optimal performance, you should set up a server-side CRON job.

### Why Server-Side CRON? ​

- **Reliability:** Runs on schedule, not dependent on site traffic
- **Performance:** Doesn't slow down page loads
- **Efficiency:** Processes jobs at optimal times

### Setup Instructions ​

**1. Disable WordPress CRON in wp-config.php:**
```php
define('DISABLE_WP_CRON', true);
```

**2. Add server-side CRON job:**
```bash
# Edit crontab
crontab -e

# Add this line (runs every minute)
* * * * * wget -q -O - https://yourdomain.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1

# Alternative using curl
* * * * * curl -s https://yourdomain.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

::: tip
If you're using [xCloud.host](https://xcloud.host/) or similar modern hosting panels, server-side CRON is enabled by default.
:::

**Related Documentation:**
- [Setting up Server-Side CRON for WordPress](https://fluentcrm.com/docs/fluentcrm-cron-job-basics-and-checklist/)

---

## Media Storage ​

For active communities with lots of media files, we recommend using cloud storage.

### Recommended: Cloudflare R2 ​

**Benefits:**
- More cost-effective than Amazon S3
- Faster global delivery
- No egress fees
- S3-compatible API

[Configure Cloudflare R2](/guides/cloud-storage/cloudflare-r2.md)

### Alternative: Amazon S3 ​

**Benefits:**
- Reliable and proven
- Global infrastructure
- Extensive integration options

[Configure Amazon S3](/guides/cloud-storage/amazon-s3.md)

### Alternative: BunnyCDN ​

**Benefits:**
- Affordable pricing
- Fast global CDN
- Easy setup

[Configure BunnyCDN](/guides/cloud-storage/bunnycdn.md)

---

## Recommended Server Hardware ​

::: danger Avoid Shared Hosting
We strongly recommend using a VPS or Cloud server. Shared hosting is not suitable for Fluent Community or any modern WordPress site.
:::

### Minimum Requirements ​

- **CPU:** 2 Cores
- **RAM:** 4GB
- **Storage:** 50GB SSD
- **Bandwidth:** 1TB/month

### Recommended for Growing Communities ​

- **CPU:** 4 Cores
- **RAM:** 8GB
- **Storage:** 128GB NVMe SSD
- **Bandwidth:** 3TB/month

### Recommended for Large Communities ​

- **CPU:** 8+ Cores
- **RAM:** 16GB+
- **Storage:** 256GB+ NVMe SSD
- **Bandwidth:** 5TB+/month

::: tip Storage Type
Always use SSD storage, preferably NVMe SSD for the best performance. Traditional HDD storage is too slow for modern web applications.
:::

---

## Recommended Hosting Providers ​

### xCloud.host (Recommended) ​

We run our own community on [xCloud.host](https://xcloud.host/) and highly recommend them.

**Why xCloud?**
- Fast and reliable
- Great support
- Competitive pricing
- Redis enabled by default
- Object cache enabled by default
- Server-side CRON enabled by default
- Servers optimized for WordPress

**Pricing:** Starting at $30/month for Growing plan
- 4GB RAM
- 2 vCPU
- 128GB SSD
- 3TB Bandwidth

---

### Other Recommended Providers ​

**GridPane**
- Managed WordPress hosting
- Built for agencies and developers
- Advanced performance features

**RunCloud**
- Server management panel
- Great for developers
- Flexible configuration

**Cloudways**
- Managed cloud hosting
- Multiple cloud providers (AWS, Google Cloud, DigitalOcean)
- Easy to use

---

## Performance Checklist ​

Before launching your community, ensure:

- [ ] PHP 8.1+ is installed
- [ ] MySQL 8.0+ or MariaDB 10.5+ is configured
- [ ] Redis object cache is enabled
- [ ] Server-side CRON is configured
- [ ] NVMe SSD storage is used
- [ ] Cloud storage is configured (for media-heavy communities)
- [ ] SSL certificate is installed
- [ ] Gzip/Brotli compression is enabled
- [ ] HTTP/2 or HTTP/3 is enabled

---

## Related Documentation ​

- [Performance Optimization](/deployment/performance-optimization.md) - Advanced performance tuning
- [Benchmarks](/deployment/benchmarks.md) - Real-world performance data
- [Cloud Storage Configuration](/guides/cloud-storage/) - Setup guides for S3, R2, BunnyCDN

