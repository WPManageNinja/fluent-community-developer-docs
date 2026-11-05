---
title: "Search API"
description: "One endpoint behind the portal search palette, answering across posts, comments, spaces, courses and members."
---

# Search API

One endpoint behind the portal search palette, answering across posts, comments, spaces, courses and members.

## Authentication

Registered with `PortalPolicy`, so the caller must be a portal user. Each result type is filtered again for that user, so a search never reveals a private space or an unpublished post the caller cannot already open.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/search` | Core | [Get Search](/restapi/operations/search/get-search) | Searches posts, comments, members, spaces and courses in one request, and returns a block of results per type. |
