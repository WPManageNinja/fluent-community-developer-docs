---
title: Benchmarks
description: Historical benchmark guidance carried over from the previous FluentCommunity docs.
---

# Benchmarks

This page keeps the benchmark section that existed in the earlier FluentCommunity docs. Treat the numbers as directional guidance rather than a guarantee for your exact stack.

## Reference Environment

The previous docs benchmarked FluentCommunity on a managed VPS-class setup with:

- 2 vCPU
- 4 GB RAM
- SSD storage
- Nginx
- WordPress 6.x
- PHP 8.x

## Historical Results Snapshot

| Scenario | Users | Posts | All Feeds | Space Posts | Members Index |
| --- | --- | --- | --- | --- | --- |
| Empty community | 0 | 0 | 1.2 / 360 ms | 1.7 / 328 ms | 1.3 / 344 ms |
| Growing community | 5,001 | 15,000 | 50.6 / 448 ms | 49.8 / 482 ms | 12.1 / 405 ms |
| Mid-size community | 10,001 | 30,000 | 92.6 / 501 ms | 60.1 / 754 ms | 21.8 / 425 ms |
| Large community | 30,001 | 50,000 | 175 / 600 ms | 126.1 / 563 ms | 61.0 / 547 ms |
| Very large community | 100,001 | 200,768 | 637 / 995 ms | 611.4 / 990 ms | 311.0 / 657 ms |

The value format is:

```text
server execution time / total observed response time
```

## How to Read the Results

- The first number reflects application and database execution.
- The second number includes network and request overhead.
- The members index tends to age differently from feed queries because the query mix is different.

## Capacity Planning Takeaway

- Communities in the low thousands usually run comfortably on a modest VPS.
- Once feeds, comments, and reactions climb into six or seven figures, Redis and remote media storage stop being optional.
- If your portal is slower than the reference tables at similar data sizes, inspect plugin load, scheduler backlog, and media strategy first.
