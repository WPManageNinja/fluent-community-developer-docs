---
title: "Post Update Lists"
description: "Attaches and detaches FluentCRM lists on a member's contact."
outline: false
aside: false
---

Attaches and detaches FluentCRM lists on a member's contact.

The same delta behaviour as the tags endpoint, against the contact's lists. Lists carry no space or course mapping, so a list change never moves anybody between spaces.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/crm-contact/lists`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CrmProfileController@updateLists`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:125`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/CrmProfileController.php`

- Attaching or detaching fires FluentCRM's own list hooks, which can start an automation.
- A member with no FluentCRM contact answers 404, and no contact is created.
- Writing needs FluentCRM's manage permission.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUpdateLists" specUrl="/openapi/public/profile/post-update-lists.json" />
