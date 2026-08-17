---
title: Update Feed Links
description: "Replaces the feed sidebar link list with the submitted set."
outline: false
aside: false
---

Replaces the feed sidebar link list with the submitted set.

Each link is sanitised individually and the submitted array replaces the stored one wholesale.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/links`
- **Edition:** Core
- **Controller:** `FeedsController@updateLinks`
- **Route source:** `fluent-community/app/Http/Routes/api.php:71`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateFeedLinks" specUrl="/openapi/public/feeds/update-feed-links.json" />
