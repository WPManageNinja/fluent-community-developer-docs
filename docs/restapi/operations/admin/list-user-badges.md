---
title: List User Badges
description: "Returns the badge definitions available to award to member profiles."
outline: false
aside: false
---

Returns the badge definitions available to award to member profiles.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/user-badges`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `UserBadgeController@getBadges`
- **Route source:** `fluent-community-pro/app/Modules/UserBadge/UserBadgeModule.php:19`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listUserBadges" specUrl="/openapi/public/admin/list-user-badges.json" />
