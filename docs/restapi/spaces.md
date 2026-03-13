---
title: Spaces API
description: Space discovery, lifecycle management, joins/leaves, lock screen configuration, and group organization.
---

# Spaces API

Space discovery, lifecycle management, joins/leaves, lock screen configuration, and group organization.

## Authentication

Most space routes are protected by `SpacePolicy`, which combines portal access with space-specific permissions.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/spaces` | Core | [List Spaces](/restapi/operations/spaces/list-spaces) | `SpaceController@get` |
| `POST` | `/spaces` | Core | [Create Space](/restapi/operations/spaces/create-space) | `SpaceController@create` |
| `GET` | `/spaces/{spaceSlug}/by-slug` | Core | [Get Space By Slug](/restapi/operations/spaces/get-space-by-slug) | `SpaceController@getBySlug` |
| `PUT` | `/spaces/{spaceSlug}/by-slug` | Core | [Update Space By Slug](/restapi/operations/spaces/update-space-by-slug) | `SpaceController@patchBySlug` |
| `PUT` | `/spaces/{spaceId}/by-id` | Core | [Update Space By ID](/restapi/operations/spaces/update-space-by-id) | `SpaceController@patchById` |
| `POST` | `/spaces/{spaceSlug}/join` | Core | [Join Space](/restapi/operations/spaces/join-space) | `SpaceController@join` |
| `POST` | `/spaces/{spaceSlug}/leave` | Core | [Leave Space](/restapi/operations/spaces/leave-space) | `SpaceController@leave` |
| `GET` | `/spaces/{spaceSlug}/meta-settings` | Core | [Get Space Meta Settings](/restapi/operations/spaces/get-space-meta-settings) | `SpaceController@getMetaSettings` |
| `DELETE` | `/spaces/{spaceSlug}` | Core | [Delete Space By Slug](/restapi/operations/spaces/delete-space-by-slug) | `SpaceController@deleteBySlug` |
| `DELETE` | `/spaces/{spaceId}/by-id` | Core | [Delete Space By ID](/restapi/operations/spaces/delete-space-by-id) | `SpaceController@deleteById` |
| `GET` | `/spaces/{spaceSlug}/lockscreens` | Core | [Get Space Lockscreens](/restapi/operations/spaces/get-space-lockscreens) | `SpaceController@getLockScreenSettings` |
| `POST` | `/spaces/{spaceSlug}/links` | Core | [Update Space Links](/restapi/operations/spaces/update-space-links) | `SpaceController@updateLinks` |
| `GET` | `/spaces/users/search` | Core | [Search Space Users](/restapi/operations/spaces/search-space-users) | `SpaceController@getOtherUsers` |
| `GET` | `/spaces/discover` | Core | [Discover Spaces](/restapi/operations/spaces/discover-spaces) | `SpaceController@discover` |
| `GET` | `/spaces/all-spaces` | Core | [List All Spaces](/restapi/operations/spaces/list-all-spaces) | `SpaceController@getAllSpaces` |
| `GET` | `/spaces/space_groups` | Core | [List Space Groups](/restapi/operations/spaces/list-space-groups) | `SpaceController@getSpaceGroups` |
| `POST` | `/spaces/space_groups` | Core | [Create Space Group](/restapi/operations/spaces/create-space-group) | `SpaceController@createSpaceGroup` |
| `PUT` | `/spaces/space_groups/{id}` | Core | [Update Space Group](/restapi/operations/spaces/update-space-group) | `SpaceController@updateSpaceGroup` |
| `DELETE` | `/spaces/space_groups/{id}` | Core | [Delete Space Group](/restapi/operations/spaces/delete-space-group) | `SpaceController@deleteSpaceGroup` |
| `PATCH` | `/spaces/space_groups/re-index` | Core | [Reindex Space Groups](/restapi/operations/spaces/reindex-space-groups) | `SpaceController@updateSpaceGroupIndexes` |
| `PATCH` | `/spaces/space_groups/re-index-spaces` | Core | [Reindex Spaces](/restapi/operations/spaces/reindex-spaces) | `SpaceController@updateSpaceIndexes` |
| `PATCH` | `/spaces/space_groups/move-space` | Core | [Move Space](/restapi/operations/spaces/move-space) | `SpaceController@moveSpace` |
| `PUT` | `/spaces/{spaceSlug}/lockscreens` | <span class="pro-badge">PRO</span> | [Update Space Lockscreen Settings](/restapi/operations/spaces/update-space-lockscreen-settings) | `ProAdminController@updateSpaceLockscreenSettings` |
