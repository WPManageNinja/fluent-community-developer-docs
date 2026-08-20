---
title: Save Leaderboard Levels
description: "Stores the leaderboard levels and the excluded-member list, recomputing every point boundary so the levels tile without gaps."
outline: false
aside: false
---

Stores the leaderboard levels and the excluded-member list, recomputing every point boundary so the levels tile without gaps.

Each submitted level carries a `title`, `tagline` and `min_points`. The submitted thresholds are used only to sort the levels; after sorting, every boundary is recalculated — the first level starts at zero, the last is open-ended, and each remaining level starts one point above the previous one ends. The three leaderboard caches are cleared afterwards.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/leaderboards/levels`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `LeaderBoardController@saveLevels`
- **Route source:** `fluent-community-pro/app/Modules/LeaderBoard/Http/leaderboard_api.php:13`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- Level slugs are reassigned by position as `level_1` upwards, so reordering levels by points silently changes which slug means which level. Anything keyed on a level slug, such as a badge award or a CRM trigger, shifts with it.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveLeaderboardLevels" specUrl="/openapi/public/leaderboard/save-leaderboard-levels.json" />
