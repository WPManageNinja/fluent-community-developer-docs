---
title: Reports API
description: Analytics, moderation reporting, and Pro reporting endpoints for administrators.
---

# Reports API

Analytics, moderation reporting, and Pro reporting endpoints for administrators.

<span class="pro-badge">PRO</span>

## Authentication

Reports routes are primarily administrator-only and are protected by `AdminPolicy` or moderation-specific policies.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/analytics/overview/widget` | <span class="pro-badge">PRO</span> | [Get Overview Widget Report](/restapi/operations/reports/get-overview-widget-report) | Returns the four headline community counters — members, posts, comments and spaces — each with a period-over-period comparison. |
| `GET` | `/analytics/overview/activity` | <span class="pro-badge">PRO</span> | [Get Overview Activity Report](/restapi/operations/reports/get-overview-activity-report) | Returns a gap-filled time series of one activity type across the community, ready to plot without client-side interpolation. |
| `GET` | `/analytics/overview/popular-day-time` | <span class="pro-badge">PRO</span> | [Get Popular Day Time Report](/restapi/operations/reports/get-popular-day-time-report) | Returns a day-of-week by time-of-day heatmap of community activity, as a fixed grid of six four-hour blocks against the seven weekdays. |
| `GET` | `/analytics/members/widget` | <span class="pro-badge">PRO</span> | [Get Member Widget Report](/restapi/operations/reports/get-member-widget-report) | Returns the member counters for a date range — total, active, new and pending — each with a period-over-period comparison. |
| `GET` | `/analytics/members/activity` | <span class="pro-badge">PRO</span> | [Get Member Activity Report](/restapi/operations/reports/get-member-activity-report) | Returns a gap-filled time series of member signups across the requested range. |
| `GET` | `/analytics/members/top-members` | <span class="pro-badge">PRO</span> | [List Top Members Report](/restapi/operations/reports/list-top-members-report) | Returns ten member profiles ordered by lifetime points, drawn from those who joined within the requested range. |
| `GET` | `/analytics/members/top-post-starters` | <span class="pro-badge">PRO</span> | [List Top Post Starters Report](/restapi/operations/reports/list-top-post-starters-report) | Returns the ten members who published the most posts within the requested range, each with their post count. |
| `GET` | `/analytics/members/top-commenters` | <span class="pro-badge">PRO</span> | [List Top Commenters Report](/restapi/operations/reports/list-top-commenters-report) | Returns the ten members who wrote the most comments within the requested range, each with their comment count. |
| `GET` | `/analytics/spaces/widget` | <span class="pro-badge">PRO</span> | [Get Space Widget Report](/restapi/operations/reports/get-space-widget-report) | Returns the space counters for a date range — spaces, posts, comments and members — optionally narrowed to one space. |
| `GET` | `/analytics/spaces/activity` | <span class="pro-badge">PRO</span> | [Get Space Activity Report](/restapi/operations/reports/get-space-activity-report) | Returns a gap-filled time series of posts, optionally narrowed to one space with \`space_id\`. |
| `GET` | `/analytics/spaces/popular` | <span class="pro-badge">PRO</span> | [List Popular Spaces Report](/restapi/operations/reports/list-popular-spaces-report) | Returns a ranked table of the busiest spaces, or — when \`space_id\` is supplied — the busiest posts inside that one space. |
| `GET` | `/analytics/spaces/search` | <span class="pro-badge">PRO</span> | [Search Report Spaces](/restapi/operations/reports/search-report-spaces) | Searches community spaces by title, returning id and title pairs for the analytics space picker. |
| `POST` | `/moderation/report` | <span class="pro-badge">PRO</span> | [Create Moderation Report](/restapi/operations/reports/create-moderation-report) | Files a moderation report against a post or a comment and returns the report together with the reported content. |
| `GET` | `/moderation/reports` | <span class="pro-badge">PRO</span> | [List Moderation Reports](/restapi/operations/reports/list-moderation-reports) | Returns the paginated moderation queue, newest first, with the reported post or comment, its author and the reporting member attached. |
| `PUT` | `/moderation/reports/{report_id}` | <span class="pro-badge">PRO</span> | [Update Moderation Report](/restapi/operations/reports/update-moderation-report) | Resolves a moderation report by setting its status, and publishes or unpublishes the reported content to match. |
| `DELETE` | `/moderation/reports/{report_id}` | <span class="pro-badge">PRO</span> | [Delete Moderation Report](/restapi/operations/reports/delete-moderation-report) | Removes a single moderation report from the queue. |
| `POST` | `/moderation/config` | <span class="pro-badge">PRO</span> | [Save Moderation Config](/restapi/operations/reports/save-moderation-config) | Stores the content moderation configuration and keeps the \`content_moderation\` feature flag in step with its \`is_enabled\` value. |
