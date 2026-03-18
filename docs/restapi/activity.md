---
title: Activity API
description: Activity feed retrieval, including support for pinned and trending content.
---

# Activity API

Activity feed retrieval, including support for pinned and trending content.

## Authentication

Activity routes are portal routes and inherit portal access checks through `PortalPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/activities` | Core | [List Activities](/restapi/operations/activity/list-activities) | `ActivityController@getActivities` |
