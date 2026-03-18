---
title: Getting Started
description: Architecture overview, key concepts, and first steps for FluentCommunity developers.
---

# Getting Started

FluentCommunity is a WordPress community plugin built on the WPFluent framework. It ships a Vue 3 single-page app at `/portal` and exposes a full REST API under the `fluent-community/v2` namespace.

This docs site is generated directly from the plugin source code, so route names, hook signatures, model references, and counts always match the current codebase.

## Architecture at a Glance

| Layer | Stack | Details |
| --- | --- | --- |
| **Backend** | PHP, WPFluent Framework | Eloquent-style ORM, policy-based authorization, Action Scheduler for background jobs |
| **Frontend** | Vue 3, Pinia, Element Plus | Options API, Milkdown editor, Vite build with HMR |
| **REST API** | `fluent-community/v2` | 226 routes across 18 modules, cookie + Application Password auth |
| **Database** | Custom tables (`fcom_` prefix) | 13 migrations, 21 models, shared multi-type tables |

## Key Concepts

### Portal

The community frontend is a Vue SPA mounted at the `/portal` URL (configurable). It uses WordPress cookie auth with nonces for browser sessions.

```php
// Change the portal URL slug
define('FLUENT_COMMUNITY_PORTAL_SLUG', 'community');
```

### Spaces

Spaces are the primary content containers. The `fcom_spaces` table is a shared multi-type table that stores Spaces, SpaceGroups, and SidebarLinks — each filtered by a `type` global scope on the model.

### REST Method Override

The Vue frontend sends PUT, PATCH, and DELETE requests as POST with the `X-HTTP-Method-Override` header. Keep this in mind when testing endpoints.

### Policy-Based Authorization

Destructive controller actions require a matching policy method. If no policy exists, the controller falls back to `verifyRequest()`, which is a weaker check. Always define policies for sensitive operations.

## Authentication

FluentCommunity uses WordPress REST infrastructure with two auth modes:

- **Browser sessions** — Cookie auth + nonce. This is what the portal SPA uses.
- **Server-to-server** — [WordPress Application Passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) sent as Basic auth. Best for external integrations and API scripts.

```bash
# Example: fetch feeds with Application Passwords
curl -u "admin:xxxx xxxx xxxx xxxx xxxx xxxx" \
  https://your-site.com/wp-json/fluent-community/v2/spaces/1/feeds
```

## Where to Go Next

<div class="getting-started-grid">

<a href="/restapi/" class="getting-started-card">
  <strong>REST API Reference</strong>
  <span>Browse all 226 endpoints with parameters, auth requirements, and response shapes.</span>
</a>

<a href="/database/schema" class="getting-started-card">
  <strong>Database Schema</strong>
  <span>ER diagrams, table inventory, and the 21 Eloquent-style models.</span>
</a>

<a href="/hooks/actions/" class="getting-started-card">
  <strong>Action Hooks</strong>
  <span>154 action hooks for feeds, spaces, members, notifications, and more.</span>
</a>

<a href="/hooks/filters/" class="getting-started-card">
  <strong>Filter Hooks</strong>
  <span>224 filter hooks for permissions, settings, content, and rendering.</span>
</a>

<a href="/guides/code-snippets" class="getting-started-card">
  <strong>Code Snippets</strong>
  <span>Copy-paste recipes for portal slug, custom CSS, role checks, and common tasks.</span>
</a>

<a href="/deployment/" class="getting-started-card">
  <strong>Deployment Guide</strong>
  <span>Server requirements, performance optimization, and production rollout.</span>
</a>

</div>

## Source Files Reference

If you're reading the plugin source alongside these docs, here are the key entry points:

| Concern | Path |
| --- | --- |
| Core routes | `app/Http/Routes/api.php` |
| Controllers | `app/Http/Controllers/` |
| Models | `app/Models/` |
| Migrations | `database/Migrations/` |
| Hook handlers | `app/Hooks/` |
| Vue app entry | `src/app.js` (portal), `src/admin_app.js` (admin) |
| Pinia stores | `src/stores/` |
| Pro modules | `Modules/` (Auth, Courses, Gutenberg, Integrations, etc.) |
