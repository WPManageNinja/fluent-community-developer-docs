---
title: Profile API
description: Public profile retrieval plus profile edits, memberships, comments, spaces, and notification preferences.
---

# Profile API

Public profile retrieval plus profile edits, memberships, comments, spaces, and notification preferences.

## Authentication

Profile routes are portal routes. Mutating routes enforce ownership or moderation rules inside the controller.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/profile/{username}` | Core | [Get Profile](/restapi/operations/profile/get-profile) | `ProfileController@getProfile` |
| `POST` | `/profile/{username}` | Core | [Update Profile](/restapi/operations/profile/update-profile) | `ProfileController@updateProfile` |
| `PUT` | `/profile/{username}` | Core | [Patch Profile](/restapi/operations/profile/patch-profile) | `ProfileController@patchProfile` |
| `GET` | `/profile/{username}/spaces` | Core | [List Profile Spaces](/restapi/operations/profile/list-profile-spaces) | `ProfileController@getSpaces` |
| `GET` | `/profile/{username}/memberships` | Core | [List Profile Memberships](/restapi/operations/profile/list-profile-memberships) | `ProfileController@getAllMemberships` |
| `GET` | `/profile/{username}/notification-preferences` | Core | [Get Notification Preferences](/restapi/operations/profile/get-notification-preferences) | `ProfileController@getNotificationPreferance` |
| `POST` | `/profile/{username}/notification-preferences` | Core | [Save Notification Preferences](/restapi/operations/profile/save-notification-preferences) | `ProfileController@saveNotificationPreferance` |
| `GET` | `/profile/{username}/followers` | <span class="pro-badge">PRO</span> | [List Profile Followers](/restapi/operations/profile/list-profile-followers) | `FollowController@getFollowers` |
| `GET` | `/profile/{username}/followings` | <span class="pro-badge">PRO</span> | [List Profile Followings](/restapi/operations/profile/list-profile-followings) | `FollowController@getFollowings` |
| `GET` | `/profile/{username}/blocked-users` | <span class="pro-badge">PRO</span> | [List Profile Blocked Users](/restapi/operations/profile/list-profile-blocked-users) | `FollowController@getBlockedUsers` |
| `POST` | `/profile/{username}/follow` | <span class="pro-badge">PRO</span> | [Follow Profile User](/restapi/operations/profile/follow-profile-user) | `FollowController@follow` |
| `POST` | `/profile/{username}/unfollow` | <span class="pro-badge">PRO</span> | [Unfollow Profile User](/restapi/operations/profile/unfollow-profile-user) | `FollowController@unfollow` |
| `POST` | `/profile/{userId}/toggle-follow` | <span class="pro-badge">PRO</span> | [Toggle Profile Follow](/restapi/operations/profile/toggle-profile-follow) | `FollowController@toggleFollow` |
| `POST` | `/profile/{username}/block` | <span class="pro-badge">PRO</span> | [Block Profile User](/restapi/operations/profile/block-profile-user) | `FollowController@block` |
| `POST` | `/profile/{username}/unblock` | <span class="pro-badge">PRO</span> | [Unblock Profile User](/restapi/operations/profile/unblock-profile-user) | `FollowController@unblock` |
| `POST` | `/profile/{username}/notification` | <span class="pro-badge">PRO</span> | [Toggle Profile Notification](/restapi/operations/profile/toggle-profile-notification) | `FollowController@toggleNotification` |
