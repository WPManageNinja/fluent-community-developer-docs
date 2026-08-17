---
title: Members API
description: Global member listing plus space-scoped membership management endpoints.
---

# Members API

Global member listing plus space-scoped membership management endpoints.

## Authentication

Member routes require an authenticated portal user and, for write actions, the relevant space or moderation capability.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/spaces/{spaceSlug}/members` | Core | [List Space Members](/restapi/operations/members/list-space-members) | Returns the paginated active membership of a space, each entry carrying the member profile and their role, plus the count of outstanding join requests. |
| `POST` | `/spaces/{spaceSlug}/members` | Core | [Add Space Member](/restapi/operations/members/add-space-member) | Adds an existing WordPress user to a space, approves their pending join request, or changes the role they already hold. |
| `POST` | `/spaces/{spaceSlug}/members/remove` | Core | [Remove Space Member](/restapi/operations/members/remove-space-member) | Removes a member from a space and refreshes their cached space access list. |
| `GET` | `/members` | Core | [List Members](/restapi/operations/members/list-members) | Returns a paginated directory of community members in the requested sort order, or the trimmed candidate list the mention autocomplete uses. |
| `PATCH` | `/members/{user_id}` | Core | [Update Member](/restapi/operations/members/update-member) | Changes the community status of one member, moving them between active, pending and blocked. |
| `POST` | `/spaces/{spaceSlug}/members/bulk-add` | <span class="pro-badge">PRO</span> | [Post Bulk Add Members](/restapi/operations/members/post-bulk-add-members) | Adds many users to a space in one call, either from an explicit id list or by copying the membership of another space or course in batches. |
| `POST` | `/spaces/{spaceSlug}/members/bulk-import` | <span class="pro-badge">PRO</span> | [Post Bulk Import Members](/restapi/operations/members/post-bulk-import-members) | Imports members into a space from submitted rows, creating WordPress users for addresses that do not yet exist. |
| `POST` | `/spaces/{spaceSlug}/members/resolve-crm-tag` | <span class="pro-badge">PRO</span> | [Post Resolve CRM Tag Space](/restapi/operations/members/post-resolve-crm-tag-space) | Resolves a FluentCRM tag into a page of contacts to add to the space, optionally creating WordPress users for contacts that do not have one. |
