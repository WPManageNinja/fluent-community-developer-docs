---
title: Save User Badges
description: "Replaces the whole badge catalogue with the submitted list, keying each badge by its slug and marking any uploaded logo as permanent media."
outline: false
aside: false
---

Replaces the whole badge catalogue with the submitted list, keying each badge by its slug and marking any uploaded logo as permanent media.

Every badge needs a `title`; a missing `slug` is derived from it. SVG shapes and emoji are sanitised, and a badge with neither falls back to an empty emoji. Because the set is stored whole, a badge left out of the payload is removed.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/user-badges`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `UserBadgeController@saveBadges`
- **Route source:** `fluent-community-pro/app/Modules/UserBadge/UserBadgeModule.php:20`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- Removing a badge here does not clear the badge slug already stored on member profiles.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveUserBadges" specUrl="/openapi/public/admin/save-user-badges.json" />
