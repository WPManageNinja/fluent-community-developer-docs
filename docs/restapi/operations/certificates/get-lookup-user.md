---
title: "Get Lookup User"
description: "Looks up a member by exact email, so the manual issue form can offer to link an account."
outline: false
aside: false
---

Looks up a member by exact email, so the manual issue form can offer to link an account.

Returns the account or `null`. An invalid email short-circuits to `null` without a query.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/certificates/users/lookup`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ManualCertificateController@lookupUser`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:36`

- Exact email match only — no partial or name search.
- `null` is the normal answer for "no account", never an error status.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getLookupUser" specUrl="/openapi/public/certificates/get-lookup-user.json" />
