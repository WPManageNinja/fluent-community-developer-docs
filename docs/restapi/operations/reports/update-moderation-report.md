---
title: Update Moderation Report
description: "Resolves a moderation report by setting its status, and publishes or unpublishes the reported content to match."
outline: false
aside: false
---

Resolves a moderation report by setting its status, and publishes or unpublishes the reported content to match.

`status` accepts `published`, `unpublished`, `pending`, `rejected`, `flagged` or `ignored`. Every sibling report against the same content is updated at once, and the report count on the content is reset to zero. Where the content was being held pending approval, releasing it replays the normal creation hooks, so notifications and announcement emails are sent at this point.

## Endpoint

- **Method:** `PUT`
- **Path:** `/moderation/reports/{report_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ModerationController@update`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:102`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ModerationController.php`

- Requires a community moderator, or the admin or moderator role in the space holding the reported content.
- Only `unpublished` hides the content — every other status, including `rejected` and `flagged`, publishes it. Choosing `rejected` to reject the content does the opposite of what the word suggests.
- The `unpublished` outcome can also flag the reported member account, depending on the auto-flag thresholds in the moderation config.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateModerationReport" specUrl="/openapi/public/reports/update-moderation-report.json" />
