---
title: Get Buddypress Migration Status
description: "Advances the migration by one time-boxed batch and returns the updated progress record — this endpoint does the work, it does not merely report on it."
outline: false
aside: false
---

Advances the migration by one time-boxed batch and returns the updated progress record — this endpoint does the work, it does not merely report on it.

Each call processes group members, posts and comments, or user profiles depending on the stage recorded in the progress record, stopping when it approaches the server maximum run time. The client is expected to poll it until the stage reaches `completed`. A progress record in an unrecognised stage returns an error asking for the migration to be restarted.

## Endpoint

- **Method:** `GET`
- **Path:** `/migrations/buddypress/status`
- **Edition:** Core
- **Controller:** `BPMigrationController@getPollingStatus`
- **Route source:** `fluent-community/Modules/Migrations/Http/migration_api.php:16`
- **Controller source:** `fluent-community/Modules/Migrations/Http/Controllers/BPMigrationController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Despite its name this is a write endpoint: calling it creates spaces, members, posts and profiles.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="getBuddypressMigrationStatus" specUrl="/openapi/public/migrations/get-buddypress-migration-status.json" />
