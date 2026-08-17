---
title: Add Space Member
description: "Adds an existing WordPress user to a space, approves their pending join request, or changes the role they already hold."
outline: false
aside: false
---

Adds an existing WordPress user to a space, approves their pending join request, or changes the role they already hold.

`user_id` is required and must resolve to a real user; their community profile is created on the fly. `role` accepts `member`, `moderator` or `admin` and falls back to `member`. The behaviour depends on the existing pivot: no membership adds one, a pending one is approved, and an active one has its role updated — or is rejected if the role is unchanged. The response message differs in each case.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/members`
- **Edition:** Core
- **Controller:** `SpaceController@addMember`
- **Route source:** `fluent-community/app/Http/Routes/api.php:19`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires the `can_add_member` permission in this space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="addSpaceMember" specUrl="/openapi/public/members/add-space-member.json" />
