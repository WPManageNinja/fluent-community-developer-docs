---
title: List Available Migrations
description: "Returns the migration sources detected on this site — BuddyBoss or BuddyPress — as an empty list when neither is installed."
outline: false
aside: false
---

Returns the migration sources detected on this site — BuddyBoss or BuddyPress — as an empty list when neither is installed.

Detection is by constant, and BuddyBoss takes precedence, so only ever one source is reported.

## Endpoint

- **Method:** `GET`
- **Path:** `/migrations`
- **Edition:** Core
- **Controller:** `MigrationController@getAvailableMigrations`
- **Route source:** `fluent-community/Modules/Migrations/Http/migration_api.php:13`
- **Controller source:** `fluent-community/Modules/Migrations/Http/Controllers/MigrationController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- The whole migrations route group is only registered when BuddyPress or BuddyBoss is installed; otherwise every path in it returns 404.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="listAvailableMigrations" specUrl="/openapi/public/migrations/list-available-migrations.json" />
