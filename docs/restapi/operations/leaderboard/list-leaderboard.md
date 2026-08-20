---
title: List Leaderboard
description: "Returns the three leaderboards — last 7 days, last 30 days and all time — each with its top ten members and their profiles attached."
outline: false
aside: false
---

Returns the three leaderboards — last 7 days, last 30 days and all time — each with its top ten members and their profiles attached.

No parameters are read; the ranking size and windows are fixed. Results are cached for five minutes, so a member who has only now earned points may not move immediately.

## Endpoint

- **Method:** `GET`
- **Path:** `/leaderboard`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `LeaderBoardController@getLeaders`
- **Route source:** `fluent-community-pro/app/Modules/LeaderBoard/Http/leaderboard_api.php:8`

- Requires FluentCommunity Pro; visibility is governed by the `leaderboard_members_visibility` privacy setting, which can open it to everyone, restrict it to signed-in members, or limit it to moderators.
- This read endpoint writes: where a stored profile point total is behind the calculated one it is corrected and `fluent_community/user_points_updated` fires, which can trigger a level upgrade and any automation listening on it.
- The routes are registered even when the `leader_board_module` feature is switched off, though the scoring that feeds them is not.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listLeaderboard" specUrl="/openapi/public/leaderboard/list-leaderboard.json" />
