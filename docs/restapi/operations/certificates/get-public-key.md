---
title: "Get Public Key"
description: "Returns the public half of the site's badge signing key as a JWK."
outline: false
aside: false
---

Returns the public half of the site's badge signing key as a JWK.

A verifier reads the key ID from a badge's JWS header, fetches it here and checks the signature. The response is the bare JWK — key type, modulus, exponent, key ID, algorithm and use — and never contains the private part.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/open-badges/keys/{kid}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `OpenBadgeController@publicKey`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:56`

- There is one key per site and no rotation, so there is no key set endpoint either; the key ID is a thumbprint of the key itself.
- A request with an unknown key ID answers 404, but it still generates and stores the key first if the site does not have one yet.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getPublicKey" specUrl="/openapi/public/certificates/get-public-key.json" />
