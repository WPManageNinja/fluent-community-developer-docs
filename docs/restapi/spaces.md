---
title: Spaces API
description: Space discovery, lifecycle management, joins/leaves, lock screen configuration, and group organization.
---

# Spaces API

Space discovery, lifecycle management, joins/leaves, lock screen configuration, and group organization.

## Authentication

Most space routes are protected by `SpacePolicy`, which combines portal access with space-specific permissions.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/spaces` | Core | [List Spaces](/restapi/operations/spaces/list-spaces) | Returns every space the current user has a membership row for, in alphabetical order, without pagination. |
| `POST` | `/spaces` | Core | [Create Space](/restapi/operations/spaces/create-space) | Creates a space, makes the caller its first admin, and attaches the submitted cover photo, logo and topics. |
| `GET` | `/spaces/{spaceSlug}/by-slug` | Core | [Get Space By Slug](/restapi/operations/spaces/get-space-by-slug) | Returns one space with its settings, topics, the current user membership and the permissions they hold inside it. |
| `PUT` | `/spaces/{spaceSlug}/by-slug` | Core | [Update Space By Slug](/restapi/operations/spaces/update-space-by-slug) | Updates a space record and its settings, and returns a redirect URL when the change altered its slug. |
| `PUT` | `/spaces/{spaceId}/by-id` | Core | [Update Space By ID](/restapi/operations/spaces/update-space-by-id) | Updates a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint. |
| `POST` | `/spaces/{spaceSlug}/join` | Core | [Join Space](/restapi/operations/spaces/join-space) | Joins the current user to a space, or lodges a join request when the space requires approval, and returns the resulting membership. |
| `POST` | `/spaces/{spaceSlug}/leave` | Core | [Leave Space](/restapi/operations/spaces/leave-space) | Removes the current user membership of a space and refreshes their cached space access. |
| `GET` | `/spaces/{spaceSlug}/meta-settings` | Core | [Get Space Meta Settings](/restapi/operations/spaces/get-space-meta-settings) | Returns the extra space settings panels contributed by integrations, or \`null\` when nothing has registered any. |
| `DELETE` | `/spaces/{spaceSlug}` | Core | [Delete Space By Slug](/restapi/operations/spaces/delete-space-by-slug) | Deletes a space along with everything posted in it and every membership record for it. |
| `DELETE` | `/spaces/{spaceId}/by-id` | Core | [Delete Space By ID](/restapi/operations/spaces/delete-space-by-id) | Deletes a space addressed by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint. |
| `GET` | `/spaces/{spaceSlug}/lockscreens` | Core | [Get Space Lockscreens](/restapi/operations/spaces/get-space-lockscreens) | Returns the lock screen configuration a space shows to visitors who are not members — its copy, imagery and call to action. |
| `POST` | `/spaces/{spaceSlug}/links` | Core | [Update Space Links](/restapi/operations/spaces/update-space-links) | Replaces the sidebar link list shown on a space with the submitted set. |
| `GET` | `/spaces/users/search` | Core | [Search Space Users](/restapi/operations/spaces/search-space-users) | Searches for WordPress users who are not yet members of a space, for the add-member picker. |
| `GET` | `/spaces/discover` | Core | [Discover Spaces](/restapi/operations/spaces/discover-spaces) | Returns the paginated set of spaces the current user could join or already belongs to, each with its active member count. |
| `GET` | `/spaces/all-spaces` | Core | [List All Spaces](/restapi/operations/spaces/list-all-spaces) | Returns the paginated list of spaces with each one formatted for display, including the current user permissions and membership within it. |
| `GET` | `/spaces/space_groups` | Core | [List Space Groups](/restapi/operations/spaces/list-space-groups) | Returns the space groups with their spaces expanded, plus any space or course that has not been assigned to a group. |
| `POST` | `/spaces/space_groups` | Core | [Create Space Group](/restapi/operations/spaces/create-space-group) | Creates a space group to hold spaces in the sidebar. |
| `PUT` | `/spaces/space_groups/{id}` | Core | [Update Space Group](/restapi/operations/spaces/update-space-group) | Updates the title, description and expansion behaviour of a space group. |
| `DELETE` | `/spaces/space_groups/{id}` | Core | [Delete Space Group](/restapi/operations/spaces/delete-space-group) | Deletes an empty space group. |
| `PATCH` | `/spaces/space_groups/re-index` | Core | [Reindex Space Groups](/restapi/operations/spaces/reindex-space-groups) | Applies a new sidebar order to the space groups. |
| `PATCH` | `/spaces/space_groups/re-index-spaces` | Core | [Reindex Spaces](/restapi/operations/spaces/reindex-spaces) | Applies a new sidebar order to spaces within their group. |
| `PATCH` | `/spaces/space_groups/move-space` | Core | [Move Space](/restapi/operations/spaces/move-space) | Moves a space into a different space group. |
| `PUT` | `/spaces/{spaceSlug}/lockscreens` | <span class="pro-badge">PRO</span> | [Update Space Lockscreen Settings](/restapi/operations/spaces/update-space-lockscreen-settings) | Stores the lock screen configuration a space shows to non-members. |
