---
title: Get App Vars
description: "Returns the bootstrap payload the portal SPA needs — current user, permissions, feature flags, branding and route configuration — together with the sidebar menu groups."
outline: false
aside: false
---

Returns the bootstrap payload the portal SPA needs — current user, permissions, feature flags, branding and route configuration — together with the sidebar menu groups.

The `rest` block is deliberately stripped, because the client already holds its own REST configuration. Content varies by caller: a signed-out visitor gets a much smaller payload than a community admin.

## Endpoint

- **Method:** `GET`
- **Path:** `/options/app-vars`
- **Edition:** Core
- **Controller:** `OptionController@getAppVars`
- **Route source:** `fluent-community/app/Http/Routes/api.php:148`
- **Controller source:** `fluent-community/app/Http/Controllers/OptionController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getAppVars" specUrl="/openapi/public/options/get-app-vars.json" />
