---
title: Admin API
description: General admin settings, email/storage configuration, onboarding, profile links, and course discovery.
---

# Admin API

General admin settings, email/storage configuration, onboarding, profile links, and course discovery.

## Authentication

All admin endpoints are protected by `AdminPolicy`.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/admin/general` | Core | [Get General Settings](/restapi/operations/admin/get-general-settings) | Returns the portal-wide settings record together with the list of WordPress roles that can be granted portal access and whether open registration is enabled on the site. |
| `POST` | `/admin/general` | Core | [Save General Settings](/restapi/operations/admin/save-general-settings) | Persists the portal-wide settings record — branding, access level, auth copy and redirects, and the portal slug. |
| `GET` | `/admin/email-settings` | Core | [Get Email Settings](/restapi/operations/admin/get-email-settings) | Returns the global email notification settings — digest schedule, sender details and template branding — falling back to the portal logo when no email-specific logo is set. |
| `POST` | `/admin/email-settings` | Core | [Save Email Settings](/restapi/operations/admin/save-email-settings) | Merges the submitted email notification settings over the stored ones and saves the result. |
| `GET` | `/admin/push-settings` | Core | [Get Push Settings](/restapi/operations/admin/get-push-settings) | Get Push Settings for the FluentCommunity Admin API. |
| `POST` | `/admin/push-settings` | Core | [Post Save Push Settings](/restapi/operations/admin/post-save-push-settings) | Post Save Push Settings for the FluentCommunity Admin API. |
| `GET` | `/admin/storage-settings` | Core | [Get Storage Settings](/restapi/operations/admin/get-storage-settings) | Returns the media storage driver configuration, with secrets masked; without the Pro plugin it always reports the local driver. |
| `POST` | `/admin/storage-settings` | Core | [Save Storage Settings](/restapi/operations/admin/save-storage-settings) | Validates and stores the media storage driver configuration, testing the connection before saving anything for remote drivers. |
| `GET` | `/admin/welcome-banner` | Core | [Get Admin Welcome Banner](/restapi/operations/admin/get-admin-welcome-banner) | Returns the two portal welcome banner variants — one shown to signed-in members, one to logged-out visitors — as stored, before rendering. |
| `POST` | `/admin/welcome-banner` | Core | [Save Admin Welcome Banner](/restapi/operations/admin/save-admin-welcome-banner) | Stores both welcome banner variants and pre-renders their Markdown descriptions to HTML so the portal does not have to parse them per request. |
| `GET` | `/admin/auth-settings` | Core | [Get Auth Settings](/restapi/operations/admin/get-auth-settings) | Returns the login and signup configuration together with the resolved form field definitions the auth screens render. |
| `GET` | `/admin/on-boardings` | Core | [Get Onboarding Settings](/restapi/operations/admin/get-onboarding-settings) | Returns the general settings plus everything the setup wizard needs: which sibling Fluent plugins are already installed and the current user name and email to prefill. |
| `GET` | `/admin/profile-link-providers` | Core | [Get Profile Link Providers](/restapi/operations/admin/get-profile-link-providers) | Returns the catalogue of social link providers members can add to their profile, including the ones currently disabled. |
| `POST` | `/admin/profile-link-providers` | Core | [Save Profile Link Providers](/restapi/operations/admin/save-profile-link-providers) | Records which social link providers are offered on the profile editor, discarding any submitted key that is not a known provider. |
| `GET` | `/admin/all_space_courses` | Core | [List All Space Courses](/restapi/operations/admin/list-all-space-courses) | Returns every space and course row in serial order, ignoring privacy and membership, for use in admin pickers and mapping screens. |
| `POST` | `/admin/on-boardings` | Core | [Save Onboarding Settings](/restapi/operations/admin/save-onboarding-settings) | Applies the setup wizard answers — site title, logo, portal slug and starter content — and kicks off the optional plugin installs. |
| `POST` | `/admin/on-boardings/change-slug` | Core | [Change Portal Slug](/restapi/operations/admin/change-portal-slug) | Changes the URL segment the portal is served from and rebuilds the WordPress rewrite rules so the new path resolves immediately. |
| `GET` | `/admin/managers` | <span class="pro-badge">PRO</span> | [List Admin Managers](/restapi/operations/admin/list-admin-managers) | Returns the paginated list of members who hold a FluentCommunity management role, with their role set and profile attached. |
| `POST` | `/admin/managers` | <span class="pro-badge">PRO</span> | [Save Admin Manager](/restapi/operations/admin/save-admin-manager) | Grants or replaces the FluentCommunity role set for one WordPress user, creating their community profile if they do not have one yet. |
| `DELETE` | `/admin/managers/{user_id}` | <span class="pro-badge">PRO</span> | [Delete Admin Manager](/restapi/operations/admin/delete-admin-manager) | Revokes every FluentCommunity management role from a user, leaving their WordPress account and community profile intact. |
| `GET` | `/admin/users` | <span class="pro-badge">PRO</span> | [Search Admin Users](/restapi/operations/admin/search-admin-users) | Searches WordPress users for the admin pickers, returning a paginated list matched on name, login and email. |
| `POST` | `/admin/auth-settings` | <span class="pro-badge">PRO</span> | [Save Auth Settings](/restapi/operations/admin/save-auth-settings) | Normalises and stores the login and signup configuration, then returns it with the recalculated form field definitions. |
| `GET` | `/admin/license` | <span class="pro-badge">PRO</span> | [Get License Status](/restapi/operations/admin/get-license-status) | Returns the current Pro licence state, including expiry and a renewal URL when the licence has lapsed. |
| `GET` | `/admin/messaging-setting` | <span class="pro-badge">PRO</span> | [Get Messaging Settings](/restapi/operations/admin/get-messaging-settings) | Returns the direct-messaging configuration alongside the realtime socket credentials used by the chat client. |
| `POST` | `/admin/messaging-setting` | <span class="pro-badge">PRO</span> | [Save Messaging Settings](/restapi/operations/admin/save-messaging-settings) | Merges the submitted messaging settings over the stored ones and saves the realtime socket credentials when realtime chat is switched on. |
| `GET` | `/admin/custom-profile-fields` | <span class="pro-badge">PRO</span> | [Get Custom Profile Fields](/restapi/operations/admin/get-custom-profile-fields) | Returns the custom profile field configuration — the field groups, the field definitions and whether the feature is switched on. |
| `POST` | `/admin/custom-profile-fields` | <span class="pro-badge">PRO</span> | [Post Save Custom Profile Fields](/restapi/operations/admin/post-save-custom-profile-fields) | Replaces the whole custom profile field configuration and keeps the \`custom_profile_fields\` feature flag in step with the submitted \`is_enabled\` value. |
| `GET` | `/admin/courses/{course_id}/export/students` | <span class="pro-badge">PRO</span> | [Get Exportable Students](/restapi/operations/admin/get-exportable-students) | Returns a flattened, spreadsheet-shaped list of a course roster — name, email, username, progress percentage, enrolment date and last activity. |
| `POST` | `/admin/license` | <span class="pro-badge">PRO</span> | [Save License Key](/restapi/operations/admin/save-license-key) | Activates a Pro licence key against the remote licensing service and stores the returned licence data. |
| `DELETE` | `/admin/license` | <span class="pro-badge">PRO</span> | [Deactivate License Key](/restapi/operations/admin/deactivate-license-key) | Releases the Pro licence activation for this site so the key can be used elsewhere. |
| `GET` | `/admin/topics` | <span class="pro-badge">PRO</span> | [List Topics](/restapi/operations/admin/list-topics) | Returns the post topics defined for the community, along with every space they can be attached to. |
| `POST` | `/admin/topics` | <span class="pro-badge">PRO</span> | [Save Topics](/restapi/operations/admin/save-topics) | Creates a topic or updates an existing one, and reconciles which spaces the topic is available in. |
| `POST` | `/admin/topics/reorder` | <span class="pro-badge">PRO</span> | [Post Reorder Topics](/restapi/operations/admin/post-reorder-topics) | Post Reorder Topics for the FluentCommunity Admin API. |
| `POST` | `/admin/topics/config` | <span class="pro-badge">PRO</span> | [Save Topic Config](/restapi/operations/admin/save-topic-config) | Stores the community-wide topic limits — how many topics a post and a space may carry, and whether topics appear on post cards. |
| `DELETE` | `/admin/topics/{topic_id}` | <span class="pro-badge">PRO</span> | [Delete Topic](/restapi/operations/admin/delete-topic) | Deletes a post topic and every space relation recorded for it. |
| `GET` | `/admin/webhooks` | <span class="pro-badge">PRO</span> | [List Webhooks](/restapi/operations/admin/list-webhooks) | Returns the paginated list of inbound webhooks, and on the first page also the spaces and courses available as enrolment targets. |
| `POST` | `/admin/webhooks` | <span class="pro-badge">PRO</span> | [Save Webhook](/restapi/operations/admin/save-webhook) | Creates or updates an inbound webhook that adds or removes the resolved user from a set of spaces and courses when it is called. |
| `DELETE` | `/admin/webhooks/{id}` | <span class="pro-badge">PRO</span> | [Delete Webhook](/restapi/operations/admin/delete-webhook) | Deletes an inbound webhook so its URL stops accepting calls. |
| `POST` | `/admin/links` | <span class="pro-badge">PRO</span> | [Save Sidebar Link](/restapi/operations/admin/save-sidebar-link) | Creates or updates a custom sidebar link inside a space group, including its icon, target and visibility rule. |
| `DELETE` | `/admin/links/{id}` | <span class="pro-badge">PRO</span> | [Delete Sidebar Link](/restapi/operations/admin/delete-sidebar-link) | Removes a custom sidebar link from the portal navigation. |
| `GET` | `/admin/pwa-settings` | <span class="pro-badge">PRO</span> | [Get Settings](/restapi/operations/admin/get-settings) | Returns the Progressive Web App settings — app name, short name, icon source, theme colour and install prompt position. |
| `POST` | `/admin/pwa-settings` | <span class="pro-badge">PRO</span> | [Post Save Settings](/restapi/operations/admin/post-save-settings) | Validates and stores the Progressive Web App settings, marking a custom icon as permanent media and recording its pixel dimensions. |
| `GET` | `/admin/user-badges` | <span class="pro-badge">PRO</span> | [List User Badges](/restapi/operations/admin/list-user-badges) | Returns the badge definitions available to award to member profiles. |
| `POST` | `/admin/user-badges` | <span class="pro-badge">PRO</span> | [Save User Badges](/restapi/operations/admin/save-user-badges) | Replaces the whole badge catalogue with the submitted list, keying each badge by its slug and marking any uploaded logo as permanent media. |
