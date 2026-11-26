---
title: Extending FluentCommunity
description: Practical extension patterns for modules, routes, controllers, and hooks.
---

# Extending FluentCommunity

FluentCommunity is structured around WPFluent service providers, route files, controller classes, policies, and WordPress hooks.

## Common Extension Points

### Add a new module

1. Create a module directory in `Modules/`.
2. Register it from the module bootstrap used by FluentCommunity.
3. Add any REST routes via a module-specific `*_api.php` file or module bootstrap.
4. Reuse the existing policy classes or add a module-specific policy when the module needs its own access layer.

### Add routes and controllers

- Core routes live in `app/Http/Routes/api.php`.
- Module routes live alongside the module, for example `Modules/Course/Http/course_api.php`.
- Controllers should sanitize input with WordPress helpers and validate request data before persisting it.

### Add hooks

- Use the `fluent_community/` prefix for new hooks.
- Prefer action hooks for lifecycle events and filter hooks for payload customization.
- Keep parameter lists stable because the hook reference pages are generated from the actual call sites.

## Existing Modules

| Module | Purpose |
| --- | --- |
| `Auth` | Invitation, signup, and login flows. |
| `Course` | Courses, sections, lessons, and learner progress. |
| `Gutenberg` | Frontend rendering inside WordPress blocks. |
| `Integrations` | FluentCRM, FluentCart, Fluent Forms, and Fluent Player bridges. |
| `Mcp` | An MCP server exposing community tools to AI agents, off until an administrator switches it on. |
| `Migrations` | BuddyBoss/BuddyPress migration tooling. |
| `PushNotification` | Notification fan-out for supported events. |
| `Theming` | Theme wrappers and headless portal rendering. |

## Pro Modules

The Pro plugin keeps its modules in `app/Modules/`, and each extends this plugin through the
same hooks an add-on would use. Most are gated by a feature switch, so a module being present
does not mean it is running.

| Module | Purpose |
| --- | --- |
| `Certificates` | Course certificates: templates, issuing on completion, manual issuing, public verification and Open Badges. |
| `CloudStorage` | Uploads pushed to S3-compatible storage, with signed URLs for private files. |
| `CourseReview` | Student reviews and ratings on courses, with moderation and the aggregate shown on course cards. |
| `DocumentLibrary` | Document posts and their downloads, including signed links for stored files. |
| `Emoji` | The emoji picker and its assets in the portal composer. |
| `Followers` | Member following, and the feeds and counts that follow from it. |
| `Giphy` | GIF search in the composer, rate limited per member. |
| `Integrations` | Paymattic and the other commerce bridges that gate paid access. |
| `LeaderBoard` | Point scoring, leaderboard periods and the ranking screens. |
| `Mcp` | Pro's tools on the free plugin's MCP server, handed over through `fluent_community/mcp/tools`. |
| `MediaGallery` | A space's photo, video and audio gallery, built from what members already posted. |
| `Pwa` | The installable progressive web app: manifest, service worker and install prompts. |
| `Quiz` | Quiz lessons: question types, attempt and time limits, scoring and instructor grading. |
| `SeoSiteMap` | Sitemaps, structured data and server-rendered pages for crawlers. |
| `SpacePages` | Static, admin-authored pages inside a space, written in the block editor. |
| `UserBadge` | Badges on member profiles and posts. |
| `Webhooks` | Incoming webhooks that grant or revoke access from another system. |

