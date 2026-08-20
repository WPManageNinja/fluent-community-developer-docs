---
title: Create Moderation Report
description: "Files a moderation report against a post or a comment and returns the report together with the reported content."
outline: false
aside: false
---

Files a moderation report against a post or a comment and returns the report together with the reported content.

`content_type` must be `post` or `comment`, `post_id` is required, and a comment report additionally needs the comment id in `parent_id`. `reason` is capped at 255 characters and the optional `explanation` at 1000. A member can only report the same content once. The running report count is written onto the reported content, and `fluent_community/content_moderation/created` fires — the listeners on that hook are what notify moderators and can auto-unpublish content once the configured threshold is reached.

## Endpoint

- **Method:** `POST`
- **Path:** `/moderation/report`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ModerationController@create`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:93`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ModerationController.php`

- Requires an active portal user; unlike the rest of the moderation group this endpoint is not gated on the `content_moderation` feature flag, so reports can still be filed while the feature is off even though no screen lists them.
- The guard that stops members reporting a moderator applies to posts only, not to comments.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createModerationReport" specUrl="/openapi/public/reports/create-moderation-report.json" />
