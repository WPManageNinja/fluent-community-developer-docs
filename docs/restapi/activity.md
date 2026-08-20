---
title: Activity API
description: Activity feed retrieval, including support for pinned and trending content.
---

# Activity API

Activity feed retrieval, including support for pinned and trending content.

## Authentication

Activity routes are portal routes and inherit portal access checks through `PortalPolicy`.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/activities` | Core | [List Activities](/restapi/operations/activity/list-activities) | Returns the most recent post-published and comment-added events, collapsed to one entry per post per action, with a pre-rendered message and a portal route for each. |
