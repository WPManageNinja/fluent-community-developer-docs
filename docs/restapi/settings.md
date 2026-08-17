---
title: Settings API
description: Feature flags, menu configuration, customization settings, privacy settings, and Fluent Player settings.
---

# Settings API

Feature flags, menu configuration, customization settings, privacy settings, and Fluent Player settings.

## Authentication

Settings routes are guarded by `AdminPolicy` and intended for administrators or site managers.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/settings/features` | Core | [Get Feature Settings](/restapi/operations/settings/get-feature-settings) | Returns the feature flag configuration together with the add-on catalogue and whether each companion plugin is installed. |
| `POST` | `/settings/features` | Core | [Save Feature Settings](/restapi/operations/settings/save-feature-settings) | Saves the feature flag configuration, merging the submitted flags over the stored ones. |
| `GET` | `/settings/menu-settings` | Core | [Get Menu Settings](/restapi/operations/settings/get-menu-settings) | Returns the portal navigation configuration — the main menu, the profile dropdown, the pre-community items and the custom footer link groups. |
| `POST` | `/settings/menu-settings` | Core | [Save Menu Settings](/restapi/operations/settings/save-menu-settings) | Replaces the portal navigation configuration, preserving the protected attributes of built-in menu entries. |
| `POST` | `/settings/install_plugin` | Core | [Install Plugin](/restapi/operations/settings/install-plugin) | Installs and activates one of the companion Fluent plugins from the add-on catalogue, in the background. |
| `GET` | `/settings/customization-settings` | Core | [Get Customization Settings](/restapi/operations/settings/get-customization-settings) | Returns the portal appearance settings — dark mode, header and sidebar behaviour, post modal, and the powered-by line. |
| `POST` | `/settings/customization-settings` | Core | [Save Customization Settings](/restapi/operations/settings/save-customization-settings) | Stores the portal appearance settings, coercing each field to its expected shape. |
| `GET` | `/settings/privacy-settings` | Core | [Get Privacy Settings](/restapi/operations/settings/get-privacy-settings) | Returns the privacy configuration that governs who can see the members directory, member profiles and member space lists, and what members may change about their own account. |
| `POST` | `/settings/privacy-settings` | Core | [Save Privacy Settings](/restapi/operations/settings/save-privacy-settings) | Stores the privacy configuration. |
| `GET` | `/settings/color-config` | Core | [Get Color Config](/restapi/operations/settings/get-color-config) | Returns the active light and dark colour schema selection alongside the full catalogue of available schemas. |
| `GET` | `/settings/crm-tagging-config` | Core | [Get CRM Tagging Config](/restapi/operations/settings/get-crm-tagging-config) | Returns the FluentCRM tagging configuration together with every space and course that can be mapped, and the CRM tag list to map them onto. |
| `GET` | `/settings/fluent-player-settings` | Core | [Get Fluent Player Settings](/restapi/operations/settings/get-fluent-player-settings) | Returns the FluentPlayer integration settings used for lesson and post video playback. |
| `POST` | `/settings/fluent-player-settings` | Core | [Save Fluent Player Settings](/restapi/operations/settings/save-fluent-player-settings) | Stores the FluentPlayer integration settings and returns the normalised result. |
| `POST` | `/settings/color-config` | <span class="pro-badge">PRO</span> | [Save Color Config](/restapi/operations/settings/save-color-config) | Selects the light and dark colour schemas, and compiles the resulting CSS once so the portal can serve it without regenerating per request. |
| `POST` | `/settings/crm-tagging-config` | <span class="pro-badge">PRO</span> | [Save CRM Tagging Config](/restapi/operations/settings/save-crm-tagging-config) | Stores the mapping between FluentCRM tags and spaces or courses, and keeps the \`has_crm_sync\` feature flag in step. |
| `GET` | `/settings/snippets-settings` | <span class="pro-badge">PRO</span> | [Get Snippets Settings](/restapi/operations/settings/get-snippets-settings) | Returns the custom CSS and custom JavaScript injected into the portal. |
| `POST` | `/settings/snippets-settings` | <span class="pro-badge">PRO</span> | [Save Snippets Settings](/restapi/operations/settings/save-snippets-settings) | Stores the custom CSS and, for callers allowed to post unfiltered HTML, the custom JavaScript injected into the portal. |
| `GET` | `/settings/followers/config` | <span class="pro-badge">PRO</span> | [Get Followers Settings](/restapi/operations/settings/get-followers-settings) | Returns the followers module configuration, including who may see a member follower and following lists. |
| `POST` | `/settings/followers/config` | <span class="pro-badge">PRO</span> | [Save Followers Settings](/restapi/operations/settings/save-followers-settings) | Stores the followers module configuration and returns the normalised result. |
