---
title: Profile API
description: Public profile retrieval plus profile edits, memberships, comments, spaces, and notification preferences.
---

# Profile API

Public profile retrieval plus profile edits, memberships, comments, spaces, and notification preferences.

## Authentication

Profile routes are portal routes. Mutating routes enforce ownership or moderation rules inside the controller.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/profile/{username}` | Core | [Get Profile](/restapi/operations/profile/get-profile) | Returns one member public profile by username, with the navigation tabs the portal should render for that member. |
| `POST` | `/profile/{username}` | Core | [Update Profile](/restapi/operations/profile/update-profile) | Saves the editable profile fields — names, bio, headline, website and social links — and mirrors the display name onto the WordPress user record. |
| `PUT` | `/profile/{username}` | Core | [Patch Profile](/restapi/operations/profile/patch-profile) | Applies a targeted profile change — swapping the avatar or cover photo, or deactivating the account. |
| `POST` | `/profile/{username}/change-password` | Core | [Post Change Password](/restapi/operations/profile/post-change-password) | Changes the account password after verifying the current one, and returns freshly minted nonces so the open session keeps working. |
| `GET` | `/profile/{username}/spaces` | Core | [List Profile Spaces](/restapi/operations/profile/list-profile-spaces) | Returns the spaces a member actively belongs to, each with its member count. |
| `GET` | `/profile/{username}/courses` | Core | [Get Courses](/restapi/operations/profile/get-courses) | Returns the published courses a member is enrolled in, each with their progress, cover image and section, lesson and student counts. |
| `GET` | `/profile/{username}/memberships` | Core | [List Profile Memberships](/restapi/operations/profile/list-profile-memberships) | Returns only the space ids a member actively belongs to — the cheap lookup used to decide what to show on their profile. |
| `GET` | `/profile/{username}/notification-preferences` | Core | [Get Notification Preferences](/restapi/operations/profile/get-notification-preferences) | Returns the email notification preferences for a member — the global toggles, the per-space post preferences grouped by space group, and the digest send day. |
| `POST` | `/profile/{username}/notification-preferences` | Core | [Save Notification Preferences](/restapi/operations/profile/save-notification-preferences) | Stores the email notification preferences for a member, translating the per-space choices into the underlying subscription rows. |
| `GET` | `/profile/{username}/followers` | <span class="pro-badge">PRO</span> | [List Profile Followers](/restapi/operations/profile/list-profile-followers) | Returns the paginated list of members following this profile, each annotated with whether the current user follows them back. |
| `GET` | `/profile/{username}/followings` | <span class="pro-badge">PRO</span> | [List Profile Followings](/restapi/operations/profile/list-profile-followings) | Returns the paginated list of members this profile follows, each annotated with whether the current user follows them too. |
| `GET` | `/profile/{username}/blocked-users` | <span class="pro-badge">PRO</span> | [List Profile Blocked Users](/restapi/operations/profile/list-profile-blocked-users) | Returns the paginated list of members this profile has blocked. |
| `POST` | `/profile/{username}/follow` | <span class="pro-badge">PRO</span> | [Follow Profile User](/restapi/operations/profile/follow-profile-user) | Creates a follow relationship from the current user to the named member. |
| `POST` | `/profile/{username}/unfollow` | <span class="pro-badge">PRO</span> | [Unfollow Profile User](/restapi/operations/profile/unfollow-profile-user) | Removes the follow relationship from the current user to the named member. |
| `POST` | `/profile/{userId}/toggle-follow` | <span class="pro-badge">PRO</span> | [Toggle Profile Follow](/restapi/operations/profile/toggle-profile-follow) | Follows the named member if not already followed, and unfollows them if they are — addressed by numeric user id rather than username. |
| `POST` | `/profile/{username}/block` | <span class="pro-badge">PRO</span> | [Block Profile User](/restapi/operations/profile/block-profile-user) | Blocks a member, converting any existing follow relationship into a block rather than creating a second row. |
| `POST` | `/profile/{username}/unblock` | <span class="pro-badge">PRO</span> | [Unblock Profile User](/restapi/operations/profile/unblock-profile-user) | Lifts a block, deleting the relationship row entirely rather than reverting it to a follow. |
| `POST` | `/profile/{username}/notification` | <span class="pro-badge">PRO</span> | [Toggle Profile Notification](/restapi/operations/profile/toggle-profile-notification) | Turns notifications about a member you already follow on or off, without changing the follow itself. |
