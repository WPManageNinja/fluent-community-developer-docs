---
title: "Get Status List"
description: "Returns the signed bitstring status list a verifier checks to see whether a badge is still in force."
outline: false
aside: false
---

Returns the signed bitstring status list a verifier checks to see whether a badge is still in force.

This one does not return JSON: the compact JWS is sent as `application/vc+jwt` with a five-minute cache header. The payload is a `BitstringStatusListCredential` whose encoded list covers 131,072 certificates, one bit each.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/open-badges/status/{listNumber}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `OpenBadgeController@statusList`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:57`

- The bits read the opposite way round to the obvious one: every bit starts set, and a bit is cleared for a certificate that is currently issued. A set bit therefore means suspended, revoked or deleted.
- The purpose is suspension only, so a revoked certificate shows the same bit as a suspended one. The verification endpoint is where the two differ.
- Expired certificates are not in the list at all — expiry travels in the badge's own validity dates instead.
- Answers are cached for ten minutes on the server as well, and that cache is cleared when a certificate is issued, reissued, suspended, reinstated or revoked.
- Only list 0 exists on any normal site; a higher number answers 404 so the URL cannot be used to make the site sign arbitrarily many lists.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getStatusList" specUrl="/openapi/public/certificates/get-status-list.json" />
