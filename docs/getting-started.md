---
title: Getting Started
description: Setup, architecture, and navigation guidance for FluentCommunity developers.
---

# Getting Started

FluentCommunity is a WordPress community/forum plugin built on the WPFluent framework. This docs site is generated directly from the checked-out FluentCommunity core and Pro plugin source, so the counts, routes, hook names, and model references match the current code.

## What This Site Covers

- **Database layer:** 21 first-party models mapped to 17 tables and shared tables.
- **Hooks:** 154 unique action hooks and 224 unique filter hooks found across 505 call sites in the core and Pro `app/` and `Modules/` trees.
- **REST API:** 226 registered routes across core and Pro route files.

## Development Commands

```bash
yarn install
yarn docs:dev
yarn docs:build
```

## Source of Truth

| Concern | Source |
| --- | --- |
| Core routes | `fluent-community/app/Http/Routes/api.php` |
| Pro routes | `fluent-community-pro/app/Http/Routes/api.php`, `fluent-community-pro/app/Modules/**/Http/*_api.php`, and route-bearing Pro modules |
| Controllers | `fluent-community/app/Http/Controllers/`, `fluent-community/Modules/**/Controllers/`, and the matching Pro controller trees |
| Models | `fluent-community/app/Models/` plus Pro runtime models used by route responses |
| Migrations | `database/Migrations/` |
| Hooks | `do_action(...)` and `apply_filters(...)` calls across the core and Pro source trees |

## Authentication Notes

FluentCommunity uses WordPress REST infrastructure. In browser-driven portal flows, the plugin typically relies on cookie authentication and nonces. For server-to-server calls, WordPress Application Passwords are the most practical option for routes that are not intentionally public.

## REST Client Conventions

- The REST namespace is **`fluent-community/v2`**.
- Portal clients in the plugin send **PUT/PATCH/DELETE** requests as POST requests with the `X-HTTP-Method-Override` header.
- Space, admin, and portal permission checks are enforced by policy classes first and then by controller-level validation.

## Main Sections

- [Database Schema](/database/schema)
- [Model Reference](/database/models)
- [Action Hooks](/hooks/actions/)
- [Filter Hooks](/hooks/filters/)
- [REST API](/restapi/)
- [Extending FluentCommunity](/modules/extending)
