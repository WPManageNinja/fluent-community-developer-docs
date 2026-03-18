---
title: Migrations API
description: BuddyBoss and BuddyPress migration discovery, execution, and status polling.
---

# Migrations API

BuddyBoss and BuddyPress migration discovery, execution, and status polling.

## Authentication

Migration routes are registered under `AdminPolicy` and should be treated as administrator-only operations.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/migrations` | Core | [List Available Migrations](/restapi/operations/migrations/list-available-migrations) | `MigrationController@getAvailableMigrations` |
| `GET` | `/migrations/buddypress/config` | Core | [Get Buddypress Migration Config](/restapi/operations/migrations/get-buddypress-migration-config) | `BPMigrationController@getMigrationConfig` |
| `POST` | `/migrations/buddypress/start` | Core | [Start Buddypress Migration](/restapi/operations/migrations/start-buddypress-migration) | `BPMigrationController@startMigration` |
| `GET` | `/migrations/buddypress/status` | Core | [Get Buddypress Migration Status](/restapi/operations/migrations/get-buddypress-migration-status) | `BPMigrationController@getPollingStatus` |
