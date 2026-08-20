---
title: Options API
description: Portal bootstrap variables, server-rendered sidebar HTML, and menu item payloads.
---

# Options API

Portal bootstrap variables, server-rendered sidebar HTML, and menu item payloads.

## Authentication

Options routes are portal routes and are primarily used by the Vue portal shell.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/options/app-vars` | Core | [Get App Vars](/restapi/operations/options/get-app-vars) | Returns the bootstrap payload the portal SPA needs — current user, permissions, feature flags, branding and route configuration — together with the sidebar menu groups. |
| `GET` | `/options/sidebar-menu-html` | Core | [Get Sidebar Menu HTML](/restapi/operations/options/get-sidebar-menu-html) | Returns the server-rendered sidebar HTML together with the spaces the current user can act in, each carrying its resolved permissions, membership and topics. |
| `GET` | `/options/menu-items` | Core | [Get Menu Items](/restapi/operations/options/get-menu-items) | Returns the sidebar menu groups on their own, for refreshing navigation without refetching the full bootstrap payload. |
