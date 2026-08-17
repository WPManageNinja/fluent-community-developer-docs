---
title: Start Buddypress Migration
description: "Begins a BuddyPress or BuddyBoss migration by importing the groups as spaces and returns the progress record plus the maximum source ids the polling loop needs."
outline: false
aside: false
---

Begins a BuddyPress or BuddyBoss migration by importing the groups as spaces and returns the progress record plus the maximum source ids the polling loop needs.

Send `config` as a map of BuddyPress group id to the destination space group. `reset_migration=yes` clears any saved progress before starting. After this call the migration advances by repeatedly polling the status endpoint.

## Endpoint

- **Method:** `POST`
- **Path:** `/migrations/buddypress/start`
- **Edition:** Core
- **Controller:** `BPMigrationController@startMigration`
- **Route source:** `fluent-community/Modules/Migrations/Http/migration_api.php:15`
- **Controller source:** `fluent-community/Modules/Migrations/Http/Controllers/BPMigrationController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Highly destructive when `delete_current_data=yes` is sent: the feeds, comments, reactions, media, activity and profile tables are truncated, every community space is deleted, and the whole `uploads/fluent-community` directory is removed from disk. There is no confirmation step and nothing can be recovered.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="startBuddypressMigration" specUrl="/openapi/public/migrations/start-buddypress-migration.json" />
