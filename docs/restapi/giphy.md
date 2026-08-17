---
title: Giphy API
description: Giphy search and media discovery endpoints exposed by the Pro media integration.
---

# Giphy API

Giphy search and media discovery endpoints exposed by the Pro media integration.

<span class="pro-badge">PRO</span>

## Authentication

Giphy routes are portal routes and require an authenticated community user.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/giphy` | <span class="pro-badge">PRO</span> | [Search Giphy](/restapi/operations/giphy/search-giphy) | Proxies a Giphy search — or the trending feed when no query is given — and returns a trimmed list of GIFs carrying only the preview and medium renditions. |
