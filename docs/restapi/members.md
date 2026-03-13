---
title: Members API
description: Global member listing plus space-scoped membership management endpoints.
---

# Members API

Global member listing plus space-scoped membership management endpoints.

## Authentication

Member routes require an authenticated portal user and, for write actions, the relevant space or moderation capability.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/spaces/{spaceSlug}/members` | Core | [List Space Members](/restapi/operations/members/list-space-members) | `SpaceController@getMembers` |
| `POST` | `/spaces/{spaceSlug}/members` | Core | [Add Space Member](/restapi/operations/members/add-space-member) | `SpaceController@addMember` |
| `POST` | `/spaces/{spaceSlug}/members/remove` | Core | [Remove Space Member](/restapi/operations/members/remove-space-member) | `SpaceController@removeMember` |
| `GET` | `/members` | Core | [List Members](/restapi/operations/members/list-members) | `MembersController@getMembers` |
| `PATCH` | `/members/{user_id}` | Core | [Update Member](/restapi/operations/members/update-member) | `MembersController@patchMember` |
