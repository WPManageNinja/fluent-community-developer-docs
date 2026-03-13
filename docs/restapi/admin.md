---
title: Admin API
description: General admin settings, email/storage configuration, onboarding, profile links, and course discovery.
---

# Admin API

General admin settings, email/storage configuration, onboarding, profile links, and course discovery.

## Authentication

All admin endpoints are protected by `AdminPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/admin/general` | Core | [Get General Settings](/restapi/operations/admin/get-general-settings) | `AdminController@getGeneralSettings` |
| `POST` | `/admin/general` | Core | [Save General Settings](/restapi/operations/admin/save-general-settings) | `AdminController@saveGeneralSettings` |
| `GET` | `/admin/email-settings` | Core | [Get Email Settings](/restapi/operations/admin/get-email-settings) | `AdminController@getEmailSettings` |
| `POST` | `/admin/email-settings` | Core | [Save Email Settings](/restapi/operations/admin/save-email-settings) | `AdminController@saveEmailSettings` |
| `GET` | `/admin/storage-settings` | Core | [Get Storage Settings](/restapi/operations/admin/get-storage-settings) | `AdminController@getStorageSettings` |
| `POST` | `/admin/storage-settings` | Core | [Save Storage Settings](/restapi/operations/admin/save-storage-settings) | `AdminController@updateStorageSettings` |
| `GET` | `/admin/welcome-banner` | Core | [Get Admin Welcome Banner](/restapi/operations/admin/get-admin-welcome-banner) | `AdminController@getWelcomeBannerSettings` |
| `POST` | `/admin/welcome-banner` | Core | [Save Admin Welcome Banner](/restapi/operations/admin/save-admin-welcome-banner) | `AdminController@updateWelcomeBannerSettings` |
| `GET` | `/admin/auth-settings` | Core | [Get Auth Settings](/restapi/operations/admin/get-auth-settings) | `AdminController@getAuthSettings` |
| `GET` | `/admin/on-boardings` | Core | [Get Onboarding Settings](/restapi/operations/admin/get-onboarding-settings) | `AdminController@getOnboardingSettings` |
| `POST` | `/admin/on-boardings` | Core | [Save Onboarding Settings](/restapi/operations/admin/save-onboarding-settings) | `AdminController@saveOnboardingSettings` |
| `POST` | `/admin/on-boardings/change-slug` | Core | [Change Portal Slug](/restapi/operations/admin/change-portal-slug) | `AdminController@changePortalSlug` |
| `GET` | `/admin/profile-link-providers` | Core | [Get Profile Link Providers](/restapi/operations/admin/get-profile-link-providers) | `AdminController@getProfileLinkProviders` |
| `POST` | `/admin/profile-link-providers` | Core | [Save Profile Link Providers](/restapi/operations/admin/save-profile-link-providers) | `AdminController@updateProfileLinkProviders` |
| `GET` | `/admin/all_space_courses` | Core | [List All Space Courses](/restapi/operations/admin/list-all-space-courses) | `AdminController@getAllSpaceCourses` |
| `GET` | `/admin/managers` | <span class="pro-badge">PRO</span> | [List Admin Managers](/restapi/operations/admin/list-admin-managers) | `ProAdminController@getManagers` |
| `POST` | `/admin/managers` | <span class="pro-badge">PRO</span> | [Save Admin Manager](/restapi/operations/admin/save-admin-manager) | `ProAdminController@addOrUpdateManager` |
| `DELETE` | `/admin/managers/{user_id}` | <span class="pro-badge">PRO</span> | [Delete Admin Manager](/restapi/operations/admin/delete-admin-manager) | `ProAdminController@deleteManager` |
| `GET` | `/admin/users` | <span class="pro-badge">PRO</span> | [Search Admin Users](/restapi/operations/admin/search-admin-users) | `ProAdminController@getUsers` |
| `POST` | `/admin/auth-settings` | <span class="pro-badge">PRO</span> | [Save Auth Settings](/restapi/operations/admin/save-auth-settings) | `ProAdminController@saveAuthSettings` |
| `GET` | `/admin/license` | <span class="pro-badge">PRO</span> | [Get License Status](/restapi/operations/admin/get-license-status) | `LicenseController@getStatus` |
| `POST` | `/admin/license` | <span class="pro-badge">PRO</span> | [Save License Key](/restapi/operations/admin/save-license-key) | `LicenseController@saveLicense` |
| `DELETE` | `/admin/license` | <span class="pro-badge">PRO</span> | [Deactivate License Key](/restapi/operations/admin/deactivate-license-key) | `LicenseController@deactivateLicense` |
| `GET` | `/admin/messaging-setting` | <span class="pro-badge">PRO</span> | [Get Messaging Settings](/restapi/operations/admin/get-messaging-settings) | `ProAdminController@getMessagingSettings` |
| `POST` | `/admin/messaging-setting` | <span class="pro-badge">PRO</span> | [Save Messaging Settings](/restapi/operations/admin/save-messaging-settings) | `ProAdminController@updateMessagingSettings` |
| `GET` | `/admin/topics` | <span class="pro-badge">PRO</span> | [List Topics](/restapi/operations/admin/list-topics) | `ProAdminController@getTopics` |
| `POST` | `/admin/topics` | <span class="pro-badge">PRO</span> | [Save Topics](/restapi/operations/admin/save-topics) | `ProAdminController@saveTopics` |
| `POST` | `/admin/topics/config` | <span class="pro-badge">PRO</span> | [Save Topic Config](/restapi/operations/admin/save-topic-config) | `ProAdminController@updateTopicConfig` |
| `DELETE` | `/admin/topics/{topic_id}` | <span class="pro-badge">PRO</span> | [Delete Topic](/restapi/operations/admin/delete-topic) | `ProAdminController@deleteTopic` |
| `GET` | `/admin/webhooks` | <span class="pro-badge">PRO</span> | [List Webhooks](/restapi/operations/admin/list-webhooks) | `ProAdminController@getWebhooks` |
| `POST` | `/admin/webhooks` | <span class="pro-badge">PRO</span> | [Save Webhook](/restapi/operations/admin/save-webhook) | `ProAdminController@saveWebhook` |
| `DELETE` | `/admin/webhooks/{id}` | <span class="pro-badge">PRO</span> | [Delete Webhook](/restapi/operations/admin/delete-webhook) | `ProAdminController@deleteWebhook` |
| `POST` | `/admin/links` | <span class="pro-badge">PRO</span> | [Save Sidebar Link](/restapi/operations/admin/save-sidebar-link) | `ProAdminController@saveSidebarLink` |
| `DELETE` | `/admin/links/{id}` | <span class="pro-badge">PRO</span> | [Delete Sidebar Link](/restapi/operations/admin/delete-sidebar-link) | `ProAdminController@deleteSidebarLink` |
| `GET` | `/admin/user-badges` | <span class="pro-badge">PRO</span> | [List User Badges](/restapi/operations/admin/list-user-badges) | `UserBadgeController@getBadges` |
| `POST` | `/admin/user-badges` | <span class="pro-badge">PRO</span> | [Save User Badges](/restapi/operations/admin/save-user-badges) | `UserBadgeController@saveBadges` |
