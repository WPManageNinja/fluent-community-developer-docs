---
title: Settings API
description: Feature flags, menu configuration, customization settings, privacy settings, and Fluent Player settings.
---

# Settings API

Feature flags, menu configuration, customization settings, privacy settings, and Fluent Player settings.

## Authentication

Settings routes are guarded by `AdminPolicy` and intended for administrators or site managers.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/settings/features` | Core | [Get Feature Settings](/restapi/operations/settings/get-feature-settings) | `SettingController@getFeatures` |
| `POST` | `/settings/features` | Core | [Save Feature Settings](/restapi/operations/settings/save-feature-settings) | `SettingController@setFeatures` |
| `GET` | `/settings/menu-settings` | Core | [Get Menu Settings](/restapi/operations/settings/get-menu-settings) | `SettingController@getMenuSettings` |
| `POST` | `/settings/menu-settings` | Core | [Save Menu Settings](/restapi/operations/settings/save-menu-settings) | `SettingController@saveMenuSettings` |
| `POST` | `/settings/install_plugin` | Core | [Install Plugin](/restapi/operations/settings/install-plugin) | `SettingController@installPlugin` |
| `GET` | `/settings/customization-settings` | Core | [Get Customization Settings](/restapi/operations/settings/get-customization-settings) | `SettingController@getCustomizationSettings` |
| `POST` | `/settings/customization-settings` | Core | [Save Customization Settings](/restapi/operations/settings/save-customization-settings) | `SettingController@updateCustomizationSettings` |
| `GET` | `/settings/privacy-settings` | Core | [Get Privacy Settings](/restapi/operations/settings/get-privacy-settings) | `SettingController@getPrivacySettings` |
| `POST` | `/settings/privacy-settings` | Core | [Save Privacy Settings](/restapi/operations/settings/save-privacy-settings) | `SettingController@updatePrivacySettings` |
| `GET` | `/settings/color-config` | Core | [Get Color Config](/restapi/operations/settings/get-color-config) | `SettingController@getColorConfig` |
| `GET` | `/settings/crm-tagging-config` | Core | [Get CRM Tagging Config](/restapi/operations/settings/get-crm-tagging-config) | `SettingController@getCrmTaggingConfig` |
| `GET` | `/settings/fluent-player-settings` | Core | [Get Fluent Player Settings](/restapi/operations/settings/get-fluent-player-settings) | `SettingController@getFluentPlayerSettings` |
| `POST` | `/settings/fluent-player-settings` | Core | [Save Fluent Player Settings](/restapi/operations/settings/save-fluent-player-settings) | `SettingController@updateFluentPlayerSettings` |
| `POST` | `/settings/color-config` | <span class="pro-badge">PRO</span> | [Save Color Config](/restapi/operations/settings/save-color-config) | `ProAdminController@saveColorConfig` |
| `POST` | `/settings/crm-tagging-config` | <span class="pro-badge">PRO</span> | [Save CRM Tagging Config](/restapi/operations/settings/save-crm-tagging-config) | `ProAdminController@saveCrmTaggingConfig` |
| `GET` | `/settings/snippets-settings` | <span class="pro-badge">PRO</span> | [Get Snippets Settings](/restapi/operations/settings/get-snippets-settings) | `ProAdminController@getSnippetsSettings` |
| `POST` | `/settings/snippets-settings` | <span class="pro-badge">PRO</span> | [Save Snippets Settings](/restapi/operations/settings/save-snippets-settings) | `ProAdminController@updateSnippetsSettings` |
| `POST` | `/settings/moderation-config` | <span class="pro-badge">PRO</span> | [Save Settings Moderation Config](/restapi/operations/settings/save-settings-moderation-config) | `FluentCommunityPro\App\Http\Controllers\ModerationController@saveModerationConfig` |
| `GET` | `/settings/followers/config` | <span class="pro-badge">PRO</span> | [Get Followers Settings](/restapi/operations/settings/get-followers-settings) | `ProAdminController@getFollowersSettings` |
| `POST` | `/settings/followers/config` | <span class="pro-badge">PRO</span> | [Save Followers Settings](/restapi/operations/settings/save-followers-settings) | `ProAdminController@saveFollowersSettings` |
