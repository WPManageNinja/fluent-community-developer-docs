---
title: Leaderboard API
description: Public leaderboard retrieval plus administrator level configuration endpoints.
---

# Leaderboard API

Public leaderboard retrieval plus administrator level configuration endpoints.

<span class="pro-badge">PRO</span>

## Authentication

Leaderboard routes are split between `PortalPolicy` for public reads and `AdminPolicy` for configuration.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/leaderboard` | <span class="pro-badge">PRO</span> | [List Leaderboard](/restapi/operations/leaderboard/list-leaderboard) | Returns the three leaderboards — last 7 days, last 30 days and all time — each with its top ten members and their profiles attached. |
| `GET` | `/admin/leaderboards/levels` | <span class="pro-badge">PRO</span> | [Get Leaderboard Levels](/restapi/operations/leaderboard/get-leaderboard-levels) | Returns the leaderboard level definitions with their point thresholds, plus the members excluded from ranking. |
| `POST` | `/admin/leaderboards/levels` | <span class="pro-badge">PRO</span> | [Save Leaderboard Levels](/restapi/operations/leaderboard/save-leaderboard-levels) | Stores the leaderboard levels and the excluded-member list, recomputing every point boundary so the levels tile without gaps. |
