---
title: Get Profile Link Providers
description: "Returns the catalogue of social link providers members can add to their profile, including the ones currently disabled."
outline: false
aside: false
---

Returns the catalogue of social link providers members can add to their profile, including the ones currently disabled.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/profile-link-providers`
- **Edition:** Core
- **Controller:** `AdminController@getProfileLinkProviders`
- **Route source:** `fluent-community/app/Http/Routes/api.php:118`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getProfileLinkProviders" specUrl="/openapi/public/admin/get-profile-link-providers.json" />
