---
title: "Put Update Visibility"
description: "Switches one of the caller's own certificates between public and private."
outline: false
aside: false
---

Switches one of the caller's own certificates between public and private.

Private means the public verification endpoint confirms only that the ID exists and whether it is valid, and the certificate stops appearing on the member's profile to other people. Sent as POST with `X-HTTP-Method-Override: PUT` by the plugin's own client.

## Endpoint

- **Method:** `PUT`
- **Path:** `/certificates/{credential}/visibility`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateController@updateVisibility`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:51`

- The check is a single comparison against the exact string `private`. Anything else — a missing field, `Private`, `0`, `null` — sets the certificate to public.
- Unlike the detail endpoint this one does not check status, so a suspended or revoked certificate can still have its visibility changed.
- Privacy is not part of the Open Badge or the status list, so neither changes here.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="putUpdateVisibility" specUrl="/openapi/public/certificates/put-update-visibility.json" />
