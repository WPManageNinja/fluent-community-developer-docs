---
title: REST API Overview
description: Source-verified overview for the FluentCommunity REST API.
---

# FluentCommunity REST API

This reference covers 226 routes registered in the FluentCommunity core and module route files.

## Base URL

`https://your-site.com/wp-json/fluent-community/v2`

## Authentication

- **Admin and settings routes:** typically used with WordPress Application Passwords.
- **Portal routes:** typically use cookie authentication plus a nonce in browser contexts.
- **Method override:** the FluentCommunity frontend sends PUT, PATCH, and DELETE requests as POST requests with `X-HTTP-Method-Override`.

## Modules

| Module | Edition | Route Count | Description |
| --- | --- | --- | --- |
| [Feeds API](/restapi/feeds) | Core + <span class="pro-badge">PRO</span> | 19 | Feed creation, retrieval, discovery, ticker updates, bookmarks, and markdown preview. |
| [Spaces API](/restapi/spaces) | Core + <span class="pro-badge">PRO</span> | 23 | Space discovery, lifecycle management, joins/leaves, lock screen configuration, and group organization. |
| [Members API](/restapi/members) | Core | 5 | Global member listing plus space-scoped membership management endpoints. |
| [Comments API](/restapi/comments) | Core | 8 | Feed comment listing, creation, updates, deletes, and single comment retrieval. |
| [Reactions API](/restapi/reactions) | Core | 6 | Feed/comment reactions plus survey vote and survey voter endpoints. |
| [Notifications API](/restapi/notifications) | Core | 5 | Read, unread, mark-as-read, and mark-all-read notification workflows. |
| [Activity API](/restapi/activity) | Core | 1 | Activity feed retrieval, including support for pinned and trending content. |
| [Profile API](/restapi/profile) | Core + <span class="pro-badge">PRO</span> | 16 | Public profile retrieval plus profile edits, memberships, comments, spaces, and notification preferences. |
| [Media API](/restapi/media) | Core | 4 | Feed media uploads, media preview cleanup, and Fluent Player video upload/content endpoints. |
| [Settings API](/restapi/settings) | Core + <span class="pro-badge">PRO</span> | 20 | Feature flags, menu configuration, customization settings, privacy settings, and Fluent Player settings. |
| [Admin API](/restapi/admin) | Core + <span class="pro-badge">PRO</span> | 36 | General admin settings, email/storage configuration, onboarding, profile links, and course discovery. |
| [Options API](/restapi/options) | Core | 3 | Portal bootstrap variables, server-rendered sidebar HTML, and menu item payloads. |
| [Courses API](/restapi/courses) | Core + <span class="pro-badge">PRO</span> | 41 | Portal course consumption endpoints and the full course administration surface. |
| [Migrations API](/restapi/migrations) | Core | 4 | BuddyBoss and BuddyPress migration discovery, execution, and status polling. |
| [Invitations API](/restapi/invitations) | Core | 5 | Invitation listing, creation, resend, delete, and link-generation endpoints. |
| [Cart Integration API](/restapi/cart) | Core | 5 | FluentCart-backed paywall search, creation, retrieval, and removal for spaces. |
| [Reports API](/restapi/reports) | <span class="pro-badge">PRO</span> | 17 | Analytics, moderation reporting, and Pro reporting endpoints for administrators. |
| [Documents API](/restapi/documents) | <span class="pro-badge">PRO</span> | 4 | Document library upload, listing, update, delete, and download-related portal endpoints. |
| [Giphy API](/restapi/giphy) | <span class="pro-badge">PRO</span> | 1 | Giphy search and media discovery endpoints exposed by the Pro media integration. |
| [Leaderboard API](/restapi/leaderboard) | <span class="pro-badge">PRO</span> | 3 | Public leaderboard retrieval plus administrator level configuration endpoints. |
