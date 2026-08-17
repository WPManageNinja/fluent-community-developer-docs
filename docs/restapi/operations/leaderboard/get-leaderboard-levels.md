---
title: Get Leaderboard Levels
description: "Returns the leaderboard level definitions with their point thresholds, plus the members excluded from ranking."
outline: false
aside: false
---

Returns the leaderboard level definitions with their point thresholds, plus the members excluded from ranking.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/leaderboards/levels`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `LeaderBoardController@getLevels`
- **Route source:** `fluent-community-pro/app/Modules/LeaderBoard/Http/leaderboard_api.php:12`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; the excluded-member list includes email addresses.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getLeaderboardLevels" specUrl="/openapi/public/leaderboard/get-leaderboard-levels.json" />
