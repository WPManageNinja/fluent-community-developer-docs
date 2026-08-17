---
title: Delete Moderation Report
description: "Removes a single moderation report from the queue."
outline: false
aside: false
---

Removes a single moderation report from the queue.

Only the one report is deleted, not the whole group of reports against the same content, and the report count stored on the content is left as it was — so the content can keep showing a reported badge.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/moderation/reports/{report_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ModerationController@delete`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:100`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ModerationController.php`

- Requires a community moderator, or the admin or moderator role in the space holding the reported content.
- Destructive: the report and its related notification rows are deleted. The reported post or comment is untouched, and content already auto-unpublished stays hidden.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteModerationReport" specUrl="/openapi/public/reports/delete-moderation-report.json" />
