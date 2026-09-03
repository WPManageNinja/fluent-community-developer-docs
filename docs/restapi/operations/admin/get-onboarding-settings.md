---
title: Get Onboarding Settings
description: "Returns the general settings plus everything the setup wizard needs: which sibling Fluent plugins are already installed and the current user name and email to prefill."
outline: false
aside: false
---

Returns the general settings plus everything the setup wizard needs: which sibling Fluent plugins are already installed and the current user name and email to prefill.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/on-boardings`
- **Edition:** Core
- **Controller:** `AdminController@getOnBoardingSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:115`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getOnboardingSettings" specUrl="/openapi/public/admin/get-onboarding-settings.json" />
