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

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/leaderboard` | <span class="pro-badge">PRO</span> | [List Leaderboard](/restapi/operations/leaderboard/list-leaderboard) | `LeaderBoardController@getLeaders` |
| `GET` | `/admin/leaderboards/levels` | <span class="pro-badge">PRO</span> | [Get Leaderboard Levels](/restapi/operations/leaderboard/get-leaderboard-levels) | `LeaderBoardController@getLevels` |
| `POST` | `/admin/leaderboards/levels` | <span class="pro-badge">PRO</span> | [Save Leaderboard Levels](/restapi/operations/leaderboard/save-leaderboard-levels) | `LeaderBoardController@saveLevels` |
