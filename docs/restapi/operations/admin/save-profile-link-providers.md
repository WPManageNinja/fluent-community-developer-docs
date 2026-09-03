---
title: Save Profile Link Providers
description: "Records which social link providers are offered on the profile editor, discarding any submitted key that is not a known provider."
outline: false
aside: false
---

Records which social link providers are offered on the profile editor, discarding any submitted key that is not a known provider.

The filtered list is handed to the `fluent_community/update_profile_link_providers` action; persistence is done by the handler listening on that hook rather than by the controller itself.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/profile-link-providers`
- **Edition:** Core
- **Controller:** `AdminController@updateProfileLinkProviders`
- **Route source:** `fluent-community/app/Http/Routes/api.php:121`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveProfileLinkProviders" specUrl="/openapi/public/admin/save-profile-link-providers.json" />
