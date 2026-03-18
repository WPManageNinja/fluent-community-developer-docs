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

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/analytics/overview/widget` | <span class="pro-badge">PRO</span> | [Get Overview Widget Report](/restapi/operations/reports/get-overview-widget-report) | `ReportsController@getOverviewWidget` |
| `GET` | `/analytics/overview/activity` | <span class="pro-badge">PRO</span> | [Get Overview Activity Report](/restapi/operations/reports/get-overview-activity-report) | `ReportsController@activityReport` |
| `GET` | `/analytics/overview/popular-day-time` | <span class="pro-badge">PRO</span> | [Get Popular Day Time Report](/restapi/operations/reports/get-popular-day-time-report) | `ReportsController@popularDayTimeReport` |
| `GET` | `/analytics/members/widget` | <span class="pro-badge">PRO</span> | [Get Member Widget Report](/restapi/operations/reports/get-member-widget-report) | `MembersReportsController@widget` |
| `GET` | `/analytics/members/activity` | <span class="pro-badge">PRO</span> | [Get Member Activity Report](/restapi/operations/reports/get-member-activity-report) | `MembersReportsController@activity` |
| `GET` | `/analytics/members/top-members` | <span class="pro-badge">PRO</span> | [List Top Members Report](/restapi/operations/reports/list-top-members-report) | `MembersReportsController@getTopMembers` |
| `GET` | `/analytics/members/top-post-starters` | <span class="pro-badge">PRO</span> | [List Top Post Starters Report](/restapi/operations/reports/list-top-post-starters-report) | `MembersReportsController@topPostStarter` |
| `GET` | `/analytics/members/top-commenters` | <span class="pro-badge">PRO</span> | [List Top Commenters Report](/restapi/operations/reports/list-top-commenters-report) | `MembersReportsController@topCommenters` |
| `GET` | `/analytics/spaces/widget` | <span class="pro-badge">PRO</span> | [Get Space Widget Report](/restapi/operations/reports/get-space-widget-report) | `SpacesReportsController@widget` |
| `GET` | `/analytics/spaces/activity` | <span class="pro-badge">PRO</span> | [Get Space Activity Report](/restapi/operations/reports/get-space-activity-report) | `SpacesReportsController@activity` |
| `GET` | `/analytics/spaces/popular` | <span class="pro-badge">PRO</span> | [List Popular Spaces Report](/restapi/operations/reports/list-popular-spaces-report) | `SpacesReportsController@getTopSpaces` |
| `GET` | `/analytics/spaces/search` | <span class="pro-badge">PRO</span> | [Search Report Spaces](/restapi/operations/reports/search-report-spaces) | `SpacesReportsController@searchSpace` |
| `POST` | `/moderation/report` | <span class="pro-badge">PRO</span> | [Create Moderation Report](/restapi/operations/reports/create-moderation-report) | `ModerationController@create` |
| `GET` | `/moderation/reports` | <span class="pro-badge">PRO</span> | [List Moderation Reports](/restapi/operations/reports/list-moderation-reports) | `ModerationController@get` |
| `PUT` | `/moderation/reports/{report_id}` | <span class="pro-badge">PRO</span> | [Update Moderation Report](/restapi/operations/reports/update-moderation-report) | `ModerationController@update` |
| `DELETE` | `/moderation/reports/{report_id}` | <span class="pro-badge">PRO</span> | [Delete Moderation Report](/restapi/operations/reports/delete-moderation-report) | `ModerationController@delete` |
| `POST` | `/moderation/config` | <span class="pro-badge">PRO</span> | [Save Moderation Config](/restapi/operations/reports/save-moderation-config) | `ModerationController@saveConfig` |
