---
title: Extending FluentCommunity
description: Practical extension patterns for modules, routes, controllers, and hooks.
---

# Extending FluentCommunity

FluentCommunity is structured around WPFluent service providers, route files, controller classes, policies, and WordPress hooks.

## Common Extension Points

### Add a new module

1. Create a module directory in `Modules/`.
2. Register it from the module bootstrap used by FluentCommunity.
3. Add any REST routes via a module-specific `*_api.php` file or module bootstrap.
4. Reuse the existing policy classes or add a module-specific policy when the module needs its own access layer.

### Add routes and controllers

- Core routes live in `app/Http/Routes/api.php`.
- Module routes live alongside the module, for example `Modules/Course/Http/course_api.php`.
- Controllers should sanitize input with WordPress helpers and validate request data before persisting it.

### Add hooks

- Use the `fluent_community/` prefix for new hooks.
- Prefer action hooks for lifecycle events and filter hooks for payload customization.
- Keep parameter lists stable because the hook reference pages are generated from the actual call sites.

## Existing Modules

| Module | Purpose |
| --- | --- |
| `Auth` | Invitation, signup, and login flows. |
| `Course` | Courses, sections, lessons, and learner progress. |
| `Gutenberg` | Frontend rendering inside WordPress blocks. |
| `Integrations` | FluentCRM, FluentCart, Fluent Forms, and Fluent Player bridges. |
| `Migrations` | BuddyBoss/BuddyPress migration tooling. |
| `PushNotification` | Notification fan-out for supported events. |
| `Theming` | Theme wrappers and headless portal rendering. |
