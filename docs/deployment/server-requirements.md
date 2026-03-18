---
title: Server Requirements
description: Minimum and recommended infrastructure guidance for FluentCommunity deployments.
---

# Server Requirements

## Minimum Supported Versions

The current plugin metadata declares:

- **WordPress:** 6.0+
- **PHP:** 7.3+

Those values come from the shipped plugin readme files for both core and Pro.

## Recommended Baseline

For production sites, treat the metadata above as the floor rather than the target:

- **PHP:** 8.1+
- **MySQL / MariaDB:** modern supported versions with InnoDB enabled
- **Object cache:** Redis if the community is active
- **Storage:** SSD or NVMe

## Background Jobs

FluentCommunity ships with WooCommerce Action Scheduler and registers recurring jobs such as:

- `fluent_community_scheduled_hour_jobs`
- `fluent_community_daily_jobs`

It also schedules async notification and digest work through Action Scheduler. For reliable delivery, use a real server cron instead of relying only on traffic-driven WP-Cron.

### Recommended wp-config.php Setting

```php
define('DISABLE_WP_CRON', true);
```

### Example Server Cron

```bash
* * * * * curl -s https://your-site.test/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

## Media Strategy

If members upload a meaningful amount of media, move to remote storage early:

- [Cloudflare R2](/guides/cloud-storage/cloudflare-r2) <span class="pro-badge">PRO</span>
- [Amazon S3](/guides/cloud-storage/amazon-s3) <span class="pro-badge">PRO</span>
- [BunnyCDN](/guides/cloud-storage/bunnycdn) <span class="pro-badge">PRO</span>

## Practical Sizing

| Community size | Suggested baseline |
| --- | --- |
| Early-stage or internal | 2 CPU / 4 GB RAM |
| Growing public community | 4 CPU / 8 GB RAM |
| High-traffic or media-heavy | 8+ CPU / 16+ GB RAM |

The right answer depends on how many plugins you run, how much media you serve, and whether you offload uploads and cache aggressively.
