---
title: List Moderation Reports
description: "Returns the paginated moderation queue, newest first, with the reported post or comment, its author and the reporting member attached."
outline: false
aside: false
---

Returns the paginated moderation queue, newest first, with the reported post or comment, its author and the reporting member attached.

Filter with `post_id`, `parent_id`, `status` and `content_type`. The reported content `title` is replaced with a 160-character excerpt of its body so the queue can be scanned without loading full posts.

## Endpoint

- **Method:** `GET`
- **Path:** `/moderation/reports`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ModerationController@get`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:101`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ModerationController.php`

- Requires a community moderator, or the admin or moderator role in the space named by `space_id`.
- The listing is not scoped to a space: a space moderator who passes `space_id` to satisfy the policy still receives reports from every space, including ones they do not moderate.
- The route only exists while the `content_moderation` feature is enabled; with the flag off it returns 404 rather than a permission error.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listModerationReports" specUrl="/openapi/public/reports/list-moderation-reports.json" />
