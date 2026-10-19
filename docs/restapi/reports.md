---
title: Reports API
description: Moderation reporting endpoints for administrators. The old analytics endpoints that also lived here were replaced by the Insights API.
---

# Reports API

Moderation reporting endpoints for administrators. The old analytics endpoints that also lived here were replaced by the Insights API.

<span class="pro-badge">PRO</span>

## Authentication

Reports routes are primarily administrator-only and are protected by `AdminPolicy` or moderation-specific policies.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `POST` | `/moderation/report` | <span class="pro-badge">PRO</span> | [Create Moderation Report](/restapi/operations/reports/create-moderation-report) | Files a moderation report against a post or a comment and returns the report together with the reported content. |
| `GET` | `/moderation/reports` | <span class="pro-badge">PRO</span> | [List Moderation Reports](/restapi/operations/reports/list-moderation-reports) | Returns the paginated moderation queue, newest first, with the reported post or comment, its author and the reporting member attached. |
| `PUT` | `/moderation/reports/{report_id}` | <span class="pro-badge">PRO</span> | [Update Moderation Report](/restapi/operations/reports/update-moderation-report) | Resolves a moderation report by setting its status, and publishes or unpublishes the reported content to match. |
| `DELETE` | `/moderation/reports/{report_id}` | <span class="pro-badge">PRO</span> | [Delete Moderation Report](/restapi/operations/reports/delete-moderation-report) | Removes a single moderation report from the queue. |
| `POST` | `/moderation/config` | <span class="pro-badge">PRO</span> | [Save Moderation Config](/restapi/operations/reports/save-moderation-config) | Stores the content moderation configuration and keeps the \`content_moderation\` feature flag in step with its \`is_enabled\` value. |
