---
title: Save General Settings
description: "Persists the portal-wide settings record — branding, access level, auth copy and redirects, and the portal slug."
outline: false
aside: false
---

Persists the portal-wide settings record — branding, access level, auth copy and redirects, and the portal slug.

Only keys that already exist in the stored settings are accepted, so unknown fields are dropped silently. Logo, white-logo and featured-image URLs are resolved against the media table and the matching media rows are marked active so the cleanup cron does not remove them. Changing `slug` flushes the rewrite rules and returns a `redirect_url`; the slug is ignored when the `FLUENT_COMMUNITY_PORTAL_SLUG` constant is defined.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/general`
- **Edition:** Core
- **Controller:** `AdminController@saveGeneralSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:102`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveGeneralSettings" specUrl="/openapi/public/admin/save-general-settings.json" />
