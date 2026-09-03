---
title: Install Plugin
description: "Installs and activates one of the companion Fluent plugins from the add-on catalogue, in the background."
outline: false
aside: false
---

Installs and activates one of the companion Fluent plugins from the add-on catalogue, in the background.

Only slugs present in the add-on catalogue are accepted. Repository plugins are fetched from WordPress.org; FluentCommunity Chat and FluentPlayer are installed through their own hooks and require the Pro plugin.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/install_plugin`
- **Edition:** Core
- **Controller:** `SettingController@installPlugin`
- **Route source:** `fluent-community/app/Http/Routes/api.php:165`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the WordPress `install_plugins` capability in addition to the community-admin permission.
- Writes to the plugins directory and activates code on the site.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="installPlugin" specUrl="/openapi/public/settings/install-plugin.json" />
