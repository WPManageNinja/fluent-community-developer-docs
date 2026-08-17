---
title: Get Buddypress Migration Config
description: "Returns everything the migration wizard needs before it starts: the BuddyPress groups with their member counts and migrated state, the source data statistics, and any previously saved progress."
outline: false
aside: false
---

Returns everything the migration wizard needs before it starts: the BuddyPress groups with their member counts and migrated state, the source data statistics, and any previously saved progress.

`has_previous` tells the client whether a partially completed run already exists, so it can offer to resume or reset.

## Endpoint

- **Method:** `GET`
- **Path:** `/migrations/buddypress/config`
- **Edition:** Core
- **Controller:** `BPMigrationController@getMigrationConfig`
- **Route source:** `fluent-community/Modules/Migrations/Http/migration_api.php:14`
- **Controller source:** `fluent-community/Modules/Migrations/Http/Controllers/BPMigrationController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="getBuddypressMigrationConfig" specUrl="/openapi/public/migrations/get-buddypress-migration-config.json" />
