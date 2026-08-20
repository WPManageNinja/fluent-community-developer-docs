---
title: Migrations API
description: BuddyBoss and BuddyPress migration discovery, execution, and status polling.
---

# Migrations API

BuddyBoss and BuddyPress migration discovery, execution, and status polling.

## Authentication

Migration routes are registered under `AdminPolicy` and should be treated as administrator-only operations.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/migrations` | Core | [List Available Migrations](/restapi/operations/migrations/list-available-migrations) | Returns the migration sources detected on this site — BuddyBoss or BuddyPress — as an empty list when neither is installed. |
| `GET` | `/migrations/buddypress/config` | Core | [Get Buddypress Migration Config](/restapi/operations/migrations/get-buddypress-migration-config) | Returns everything the migration wizard needs before it starts: the BuddyPress groups with their member counts and migrated state, the source data statistics, and any previously saved progress. |
| `POST` | `/migrations/buddypress/start` | Core | [Start Buddypress Migration](/restapi/operations/migrations/start-buddypress-migration) | Begins a BuddyPress or BuddyBoss migration by importing the groups as spaces and returns the progress record plus the maximum source ids the polling loop needs. |
| `GET` | `/migrations/buddypress/status` | Core | [Get Buddypress Migration Status](/restapi/operations/migrations/get-buddypress-migration-status) | Advances the migration by one time-boxed batch and returns the updated progress record — this endpoint does the work, it does not merely report on it. |
