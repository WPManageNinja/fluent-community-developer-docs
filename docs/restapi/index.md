---
title: REST API Overview
description: Source-verified overview for the FluentCommunity REST API.
---

# FluentCommunity REST API

This reference covers 252 routes registered in the FluentCommunity core and module route files.

## Base URL

`https://your-site.com/wp-json/fluent-community/v2`

## Authentication

Every route runs behind a WordPress REST authentication check and then a
FluentCommunity policy. Authenticate the request the way you would any WordPress
REST call:

- **Server to server:** a [WordPress Application Password](https://wordpress.org/documentation/article/application-passwords/) sent as HTTP Basic auth. The interactive examples on these pages use this.
- **In the browser:** the logged-in cookie plus an `X-WP-Nonce` header carrying a `wp_rest` nonce. This is what the portal itself uses.

## Authorization

Authentication only establishes *who* you are. Each route group then applies a
policy, and the policy is what decides whether the call is allowed:

| Policy | Applies to | Requirement |
| --- | --- | --- |
| `PortalPolicy` | Feeds, comments, reactions, members, notifications, profile, activity, options | An active member profile with portal access. Anything other than `GET` also requires a logged-in user. |
| `SpacePolicy` | Spaces | Portal access, plus per-space membership and role checks inside each method. |
| `AdminPolicy` | Admin and settings routes | Community administrator. |
| `CourseAdminPolicy` | Course administration | Course-creator access, and management rights over the course named in the path. |
| `ModerationPolicy` | Moderation reports | Community moderator access; the `content_moderation` feature must also be enabled for the listing routes. |
| `TopicPolicy` | Topic management | Space-manage access, with a narrow read-only exception for course creators fetching topic options. |
| `InvitationPolicy` | Invitations | Any logged-in user with portal access; per-space moderator rights are then checked inside each method. |

::: warning Community administrator is not a WordPress administrator
`AdminPolicy` checks FluentCommunity's own `community_admin` permission (or a
super admin), not the WordPress `manage_options` capability. A community
administrator is a role FluentCommunity delegates, and it can be granted to users
who have no elevated WordPress capabilities at all. Treat these routes as
privileged, but do not assume the caller is a site administrator.
:::

A route may also be gated by a feature flag (`Helper::isFeatureEnabled('…')`) or
by the Pro plugin being active. Where that applies it is called out on the
operation's own page.

## Conventions

- **Method override:** the portal frontend sends `PUT`, `PATCH` and `DELETE` as `POST` with an `X-HTTP-Method-Override` header. Direct API clients can use the real verbs.
- **Pagination:** list endpoints return a paginator object (`data`, `total`, `per_page`, `current_page`, `last_page`) and accept `page` and `per_page`.
- **Errors:** most failures return a JSON body with a `message` key. Note that several endpoints report a *business* failure as HTTP 200 with only a `message` — check the body, not just the status.

## Modules

| Module | Edition | Route Count | Description |
| --- | --- | --- | --- |
| [Feeds API](/restapi/feeds) | Core <span class="edition-note">(extended by Pro)</span> | 19 | Feed creation, retrieval, discovery, ticker updates, bookmarks, and markdown preview. |
| [Spaces API](/restapi/spaces) | Core <span class="edition-note">(extended by Pro)</span> | 23 | Space discovery, lifecycle management, joins/leaves, lock screen configuration, and group organization. |
| [Members API](/restapi/members) | Core <span class="edition-note">(extended by Pro)</span> | 8 | Global member listing plus space-scoped membership management endpoints. |
| [Comments API](/restapi/comments) | Core | 8 | Feed comment listing, creation, updates, deletes, and single comment retrieval. |
| [Reactions API](/restapi/reactions) | Core | 7 | Feed/comment reactions plus survey vote and survey voter endpoints. |
| [Notifications API](/restapi/notifications) | Core | 5 | Read, unread, mark-as-read, and mark-all-read notification workflows. |
| [Activity API](/restapi/activity) | Core | 1 | Activity feed retrieval, including support for pinned and trending content. |
| [Profile API](/restapi/profile) | Core <span class="edition-note">(extended by Pro)</span> | 19 | Public profile retrieval plus profile edits, memberships, comments, spaces, and notification preferences. |
| [Media API](/restapi/media) | Core <span class="edition-note">(extended by Pro)</span> | 6 | Feed media uploads, media preview cleanup, and Fluent Player video upload/content endpoints. |
| [Settings API](/restapi/settings) | Core <span class="edition-note">(extended by Pro)</span> | 19 | Feature flags, menu configuration, customization settings, privacy settings, and Fluent Player settings. |
| [Admin API](/restapi/admin) | Core <span class="edition-note">(extended by Pro)</span> | 44 | General admin settings, email/storage configuration, onboarding, profile links, and course discovery. |
| [Options API](/restapi/options) | Core | 3 | Portal bootstrap variables, server-rendered sidebar HTML, and menu item payloads. |
| [Courses API](/restapi/courses) | Core <span class="edition-note">(extended by Pro)</span> | 51 | Portal course consumption endpoints and the full course administration surface. |
| [Migrations API](/restapi/migrations) | Core | 4 | BuddyBoss and BuddyPress migration discovery, execution, and status polling. |
| [Invitations API](/restapi/invitations) | Core | 5 | Invitation listing, creation, resend, delete, and link-generation endpoints. |
| [Cart Integration API](/restapi/cart) | Core | 5 | FluentCart-backed paywall search, creation, retrieval, and removal for spaces. |
| [Reports API](/restapi/reports) | <span class="pro-badge">PRO</span> | 17 | Analytics, moderation reporting, and Pro reporting endpoints for administrators. |
| [Documents API](/restapi/documents) | <span class="pro-badge">PRO</span> | 4 | Document library upload, listing, update, delete, and download-related portal endpoints. |
| [Giphy API](/restapi/giphy) | <span class="pro-badge">PRO</span> | 1 | Giphy search and media discovery endpoints exposed by the Pro media integration. |
| [Leaderboard API](/restapi/leaderboard) | <span class="pro-badge">PRO</span> | 3 | Public leaderboard retrieval plus administrator level configuration endpoints. |
