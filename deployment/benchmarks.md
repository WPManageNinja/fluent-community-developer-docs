# Performance Benchmarks ​

## Introduction ​

This page provides real-world performance benchmarks for Fluent Community under various conditions and data volumes. These benchmarks help you understand what to expect as your community grows.

::: tip Live Demo
You can test the live benchmark site yourself: [https://fluentcommunity-test1.wp1.site/](https://fluentcommunity-test1.wp1.site/)
:::

---

## Test Environment ​

### Server Configuration ​

**Hosting Provider:** xCloud Managed  
**Package:** Growing - xCloud (Managed)  
**Monthly Cost:** $30

**Server Specifications:**
- **RAM:** 4 GB
- **Storage:** 128 GB SSD
- **vCPU:** 2 Cores
- **Bandwidth:** 3 TB/month
- **Location:** US (New Jersey)

**Software Stack:**
- **PHP Version:** 8.1
- **MySQL Version:** 8.0.40
- **WordPress Version:** 6.7.1
- **Web Server:** Nginx

**Network:**
- **Average Ping (from Asia):** 38.65ms

---

## Benchmark 1: Minimal Setup ​

### Configuration ​

**Theme:** Twenty Twenty-Five (default WordPress theme)

**Plugins:**
- Fluent Community (free)
- Fluent Community Pro

**Caching:**
- Object Cache: ❌ Disabled
- Page Caching: ❌ Disabled

**WordPress Content:**
- Posts/CPT Count: 3 (default posts only)

---

### Results ​

| # | Users | Posts | Post Reactions | Comments | Comment Reactions | All Feeds (ms) | Space Posts (ms) | Members Index (ms) |
|---|-------|-------|----------------|----------|-------------------|----------------|------------------|-------------------|
| 1 | 0 | 0 | 0 | 0 | 0 | 1.2 / 360 | 1.7 / 328 | 1.3 / 344 |
| 2 | 5,001 | 15,000 | 75,000 | 75,000 | 225,000 | 50.6 / 448 | 49.8 / 482 | 12.1 / 405 |
| 3 | 10,001 | 30,000 | 150,000 | 150,000 | 450,000 | 92.6 / 501 | 60.1 / 754 | 21.8 / 425 |
| 4 | 30,001 | 50,000 | 500,000 | 300,000 | 720,000 | 175 / 600 | 126.1 / 563 | 61.0 / 547 |
| 5 | 100,001 | 200,768 | 500,004 | 500,000 | 1,000,850 | 637 / 995 | 611.4 / 990 | 311.0 / 657 |

---

### Response Time Explanation ​

Response times are shown as: **Execution Time / Total Time**

**Example:** `611.4 / 990`
- **611.4ms** - Server execution time (PHP + Database)
- **990ms** - Total time including network latency + execution

**What This Means:**
- First number: How long the server took to process the request
- Second number: How long the user waited (includes network travel time)

---

### Key Insights ​

**Empty Community (Row 1):**
- Lightning fast: ~1-2ms execution time
- Total response under 400ms (including network)

**Small Community - 5K Users (Row 2):**
- Execution time: ~50ms
- Total response: ~450ms
- Excellent performance with 15K posts and 300K reactions

**Medium Community - 10K Users (Row 3):**
- Execution time: ~60-93ms
- Total response: ~500-750ms
- Still very responsive with 30K posts and 600K reactions

**Large Community - 30K Users (Row 4):**
- Execution time: ~61-175ms
- Total response: ~547-600ms
- Good performance with 50K posts and 1.2M reactions

**Very Large Community - 100K Users (Row 5):**
- Execution time: ~311-637ms
- Total response: ~657-995ms
- Acceptable performance with 200K posts and 1.5M reactions
- Consider enabling Redis cache at this scale

---

## Benchmark 2: Real-World Setup ​

### Configuration ​

**Theme:** Kadence + Child Theme

**Plugins:**
- Fluent Community & Fluent Community Pro
- FluentCRM
- FluentSMTP
- FluentForms
- WooCommerce
  - 1,000 Orders
  - 30 Demo Products
  - Associated order and product data
- LifterLMS (6 courses)

**WordPress Content:**
- Regular Posts: 286
- Published Pages: 10

**Caching:**
- Object Cache: ❌ Disabled
- Page Caching: ❌ Disabled

---

### Results ​

| # | Users | Posts | Post Reactions | Comments | Comment Reactions | All Feeds (ms) | Space Posts (ms) | Members Index (ms) |
|---|-------|-------|----------------|----------|-------------------|----------------|------------------|-------------------|
| 1 | 100,001 | 200,768 | 500,004 | 500,000 | 1,000,850 | 648 / 1190 | 577 / 1050 | 200.1 / 711 |

---

### Key Insights ​

**Impact of Additional Plugins:**
- Execution time increased by ~11ms (637ms → 648ms)
- Total response time increased by ~195ms (995ms → 1190ms)
- Members index actually improved (311ms → 200ms)

**Conclusion:**
Even with multiple heavy plugins (WooCommerce, LifterLMS, FluentCRM), the performance impact is minimal. The increase is primarily in network/overhead, not core execution.

::: tip Optimization Opportunity
With [REST API Performance Tuning](/deployment/performance-optimization.md#rest-api-performance-tuning), you can reduce this overhead by loading only required plugins for API requests.
:::

---

## Performance Recommendations by Scale ​

### Small Community (0-5,000 users) ​

**Expected Performance:**
- Execution time: <100ms
- Total response: <500ms

**Recommended Setup:**
- Basic VPS (2 CPU, 4GB RAM)
- No caching required
- Standard configuration

---

### Medium Community (5,000-30,000 users) ​

**Expected Performance:**
- Execution time: 100-200ms
- Total response: 500-800ms

**Recommended Setup:**
- VPS (4 CPU, 8GB RAM)
- Redis object cache recommended
- Consider cloud storage for media

---

### Large Community (30,000-100,000 users) ​

**Expected Performance:**
- Execution time: 200-400ms
- Total response: 600-1000ms

**Recommended Setup:**
- Dedicated server (8 CPU, 16GB RAM)
- Redis object cache required
- Cloud storage (S3/R2) required
- Consider CDN for static assets

---

### Very Large Community (100,000+ users) ​

**Expected Performance:**
- Execution time: 400-700ms
- Total response: 800-1500ms

**Recommended Setup:**
- High-performance dedicated server (16+ CPU, 32GB+ RAM)
- Redis object cache required
- Cloud storage (S3/R2) required
- CDN required
- Consider database read replicas
- Implement REST API optimization

---

## Optimization Impact ​

### With Redis Object Cache ​

Expected improvements:
- **Execution time:** 30-50% faster
- **Database queries:** 60-80% reduction
- **Memory usage:** 20-30% reduction

**Example:**
- Before: 637ms execution
- After: 320-445ms execution (estimated)

---

### With REST API Optimization ​

Expected improvements:
- **Execution time:** 40-60% faster
- **Memory usage:** 50-70% reduction
- **Plugin load time:** 80-90% reduction

**Example:**
- Before: 648ms execution (with 20+ plugins)
- After: 260-390ms execution (with 5-8 plugins)

---

### With Both Optimizations ​

Expected improvements:
- **Execution time:** 60-75% faster
- **Total response:** 50-65% faster
- **Server load:** 70-80% reduction

**Example:**
- Before: 648 / 1190ms
- After: 160-260 / 420-595ms (estimated)

---

## Testing Methodology ​

### How We Measured ​

**Tools Used:**
- Chrome DevTools Network Inspector
- Server-side timing logs
- Multiple test runs for accuracy

**Measurement Process:**
1. Clear all caches
2. Make 5 identical requests
3. Discard first request (warm-up)
4. Average the remaining 4 requests
5. Record both execution and total time

**Timing Breakdown:**
- **Execution Time:** Server-side PHP + Database processing
- **Network Latency:** Time for data to travel to/from server
- **Total Time:** Execution + Network (what user experiences)

---

## Important Notes ​

::: warning Test Conditions
- Benchmarks conducted without live traffic
- Server configured with xCloud default settings
- No caching plugins configured
- Results may vary based on server location and network conditions
- Average of 5 requests taken for each measurement
:::

### Factors Affecting Performance ​

**Server-Side:**
- CPU speed and core count
- Available RAM
- Storage type (HDD vs SSD vs NVMe)
- Database optimization
- PHP version and configuration

**Network-Side:**
- Geographic distance to server
- Network quality and latency
- ISP routing
- CDN usage

**Application-Side:**
- Number of active plugins
- Theme complexity
- Caching configuration
- Database size and optimization

---

## Try It Yourself ​

Visit our live benchmark site and test the performance:

**Live URL:** [https://fluentcommunity-test1.wp1.site/](https://fluentcommunity-test1.wp1.site/)

**Test Data:**
- 100,001 users
- 200,768 posts
- 500,004 post reactions
- 500,000 comments
- 1,000,850 comment reactions

Feel free to browse, search, and interact with the community to experience the performance firsthand!

---

## Related Documentation ​

- [Server Requirements](/deployment/server-requirements.md) - Recommended server configuration
- [Performance Optimization](/deployment/performance-optimization.md) - Advanced optimization techniques
- [Database Schema](/database/schema.md) - Understanding the database structure

