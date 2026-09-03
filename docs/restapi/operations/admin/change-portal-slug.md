---
title: Change Portal Slug
description: "Changes the URL segment the portal is served from and rebuilds the WordPress rewrite rules so the new path resolves immediately."
outline: false
aside: false
---

Changes the URL segment the portal is served from and rebuilds the WordPress rewrite rules so the new path resolves immediately.

The submitted slug passes through `sanitize_title()` and must not be empty. Rewrite rules are flushed and the cached `rewrite_rules` option is deleted, so the first request after this call is slower than usual. Requests are rejected when the `FLUENT_COMMUNITY_PORTAL_SLUG` constant pins the slug in code.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/on-boardings/change-slug`
- **Edition:** Core
- **Controller:** `AdminController@changePortalSlug`
- **Route source:** `fluent-community/app/Http/Routes/api.php:129`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Every existing portal URL changes; links held elsewhere will 404 until they are updated.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="changePortalSlug" specUrl="/openapi/public/admin/change-portal-slug.json" />
