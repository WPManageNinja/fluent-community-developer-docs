---
title: Save Topic Config
description: "Stores the community-wide topic limits — how many topics a post and a space may carry, and whether topics appear on post cards."
outline: false
aside: false
---

Stores the community-wide topic limits — how many topics a post and a space may carry, and whether topics appear on post cards.

Only keys that already exist in the stored config are accepted. The cached config is cleared so the new limits apply to the next post save.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/topics/config`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@updateTopicConfig`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:48`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires a community admin, a course admin, or the admin role in the space named by `space_id`.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveTopicConfig" specUrl="/openapi/public/admin/save-topic-config.json" />
