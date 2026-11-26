---
title: "Post Update Tags"
description: "Attaches and detaches FluentCRM tags on a member's contact."
outline: false
aside: false
---

Attaches and detaches FluentCRM tags on a member's contact.

A delta rather than a replacement: `attach_ids` and `detach_ids` are each compared against what the contact already has, and anything not named is left alone — including a tag an automation added a moment ago. The response carries the contact as it now stands.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/crm-contact/tags`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CrmProfileController@updateTags`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:124`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/CrmProfileController.php`

- Attaching a tag fires FluentCRM's own hooks, so it can start an automation.
- With CRM sync switched on, a tag change can add the member to, or remove them from, spaces and courses. That is why each tag lists the spaces it carries.
- A member with no FluentCRM contact answers 404 here, while the read endpoint answers 200 with null. This endpoint never creates a contact.
- There is no replace-everything mode, so a client working from a stale view leaves stray tags behind.
- Writing needs FluentCRM's manage permission, not only its read permission.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUpdateTags" specUrl="/openapi/public/profile/post-update-tags.json" />
