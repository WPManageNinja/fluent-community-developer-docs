---
title: Save Onboarding Settings
description: "Applies the setup wizard answers — site title, logo, portal slug and starter content — and kicks off the optional plugin installs."
outline: false
aside: false
---

Applies the setup wizard answers — site title, logo, portal slug and starter content — and kicks off the optional plugin installs.

Passing a `template` creates the matching starter spaces. Any of `install_fluentcrm`, `install_fluentsmtp` and `install_fluentcart` set to `yes` triggers a background install of that plugin from the WordPress.org repository. The slug is only applied when it has not already been fixed. Rewrite rules are flushed at the end.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/on-boardings`
- **Edition:** Core
- **Controller:** `AdminController@saveOnBoardingSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:115`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Installs plugins on the site and can opt the submitted email address into the FluentCommunity newsletter.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveOnboardingSettings" specUrl="/openapi/public/admin/save-onboarding-settings.json" />
