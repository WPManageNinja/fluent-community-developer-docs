---
title: Options API
description: Portal bootstrap variables, server-rendered sidebar HTML, and menu item payloads.
---

# Options API

Portal bootstrap variables, server-rendered sidebar HTML, and menu item payloads.

## Authentication

Options routes are portal routes and are primarily used by the Vue portal shell.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/options/app-vars` | Core | [Get App Vars](/restapi/operations/options/get-app-vars) | `OptionController@getAppVars` |
| `GET` | `/options/sidebar-menu-html` | Core | [Get Sidebar Menu HTML](/restapi/operations/options/get-sidebar-menu-html) | `OptionController@getSidebarMenuHtml` |
| `GET` | `/options/menu-items` | Core | [Get Menu Items](/restapi/operations/options/get-menu-items) | `OptionController@getMenuItems` |
