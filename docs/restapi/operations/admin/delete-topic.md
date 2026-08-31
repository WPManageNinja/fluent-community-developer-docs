---
title: Delete Topic
description: "Deletes a post topic and every space relation recorded for it."
outline: false
aside: false
---

Deletes a post topic and every space relation recorded for it.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/topics/{topic_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@deleteTopic`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:51`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin) — a narrower role than the endpoints that create topics.
- Requires FluentCommunity Pro.
- Destructive: the topic term and its space relations are removed; posts previously tagged with it lose the tag.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteTopic" specUrl="/openapi/public/admin/delete-topic.json" />
