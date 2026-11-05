---
title: "Certificates Actions"
description: "Certificates action hooks for FluentCommunity."
---

# Certificates Actions

9 unique action hooks currently map to this category, across 12 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/certificate/{action}`](#fluent-community-certificate-action) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` |
| [`fluent_community/certificate/issue_failed`](#fluent-community-certificate-issue-failed) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:56` |
| [`fluent_community/certificate/issued`](#fluent-community-certificate-issued) | <span class="pro-badge">PRO</span> | 3 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:165` |
| [`fluent_community/certificate/manual_updated`](#fluent-community-certificate-manual-updated) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/ManualCertificates.php:311` |
| [`fluent_community/certificate/reinstated`](#fluent-community-certificate-reinstated) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` |
| [`fluent_community/certificate/reissued`](#fluent-community-certificate-reissued) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:234` |
| [`fluent_community/certificate/revoked`](#fluent-community-certificate-revoked) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` |
| [`fluent_community/certificate/suspended`](#fluent-community-certificate-suspended) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` |
| [`fluent_community/certificate/user_certificates_deleted`](#fluent-community-certificate-user-certificates-deleted) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/CertificatePrivacy.php:48` |

<a id="fluent-community-certificate-action"></a>

## `fluent_community/certificate/{action}`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** The runtime-assembled name behind the suspended, reinstated and revoked actions.

Pro fires `'fluent_community/certificate/' . $action` from one place, where `$action` is `suspended`, `reinstated` or `revoked`. Hook the concrete names rather than this placeholder — it exists to explain why grepping the source for those three names finds nothing.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The certificate whose status changed. |
| 2 | `$byUserId` | `int` | The administrator who changed it. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` | `$certificate` (mixed)<br>`$byUserId` (int) |

### Example

```php
add_action('fluent_community/certificate/{action}', function ($certificate, $byUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/certificate/suspended`](#fluent-community-certificate-suspended) · [`fluent_community/certificate/reinstated`](#fluent-community-certificate-reinstated) · [`fluent_community/certificate/revoked`](#fluent-community-certificate-revoked)

<a id="fluent-community-certificate-issue-failed"></a>

## `fluent_community/certificate/issue_failed`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when an automatic issue on course completion did not produce a certificate.

A notification hook only: nothing reads the result and there is no retry. The error code says what happened — no published template, an invalid member, a block from `fluent_community/certificate/can_issue`, or the issuing lock being busy. The case where the member already holds a certificate, or holds a revoked one, is deliberately excluded, so a repeat completion stays silent. It fires only for automatic issuing on completion: backfills, manual issues and direct calls receive the error as a return value instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$result` | `\WP_Error` | Why the issue failed. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The completed course. |
| 3 | `$userId` | `int` | The member it would have been issued to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:56` | `$result` (mixed)<br>`$course` (Course)<br>`$userId` (int) |

### Example

```php
add_action('fluent_community/certificate/issue_failed', function ($result, $course, $userId) {
}, 10, 3);
```

**Related:** [`fluent_community/certificate/can_issue`](/hooks/filters/certificates#fluent-community-certificate-can-issue)

<a id="fluent-community-certificate-issued"></a>

## `fluent_community/certificate/issued`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 3
- **When it fires:** Fires after a certificate row has been written, for a course completion, a manual issue or a backfill.

::: info Resolved name
The source assembles this name at runtime from `fluent_community/certificate/{action}`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::

The certificate is saved and has its credential ID, serial and frozen merge values by the time this runs, and the global issuing lock has already been released. No email has been sent yet and no Open Badge exists — badges are built on demand. Core listeners clear the Open Badge status-list cache and queue the holder's notification email, the latter only when the certificate asked to notify and the site setting allows it. It does not fire when the member already holds a certificate for that course, so it is not a reliable "course completed" signal.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The saved certificate. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course&#124;null` | The course, or null for a manual certificate issued without one. |
| 3 | `$userId` | `int` | The holder, or 0 for a manual certificate with no account. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:165` | `$certificate` (mixed)<br>`$course` (Course)<br>`$userId` (int) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` | `$certificate` (mixed)<br>`$byUserId` (int) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/ManualCertificates.php:176` | `$certificate` (mixed)<br>`$data['course']` (array)<br>`(int) $data['user_id']` (array) |

### Example

```php
add_action('fluent_community/certificate/issued', function ($certificate, $course, $userId) {
}, 10, 3);
```

**Related:** [`fluent_community/certificate/reissued`](#fluent-community-certificate-reissued) · [`fluent_community/certificate/issued_email`](/hooks/filters/certificates#fluent-community-certificate-issued-email) · [`fluent_community/certificate/can_issue`](/hooks/filters/certificates#fluent-community-certificate-can-issue)

<a id="fluent-community-certificate-manual-updated"></a>

## `fluent_community/certificate/manual_updated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after an administrator has edited a manual certificate.

The changed list names the areas that actually moved, drawn from `name`, `email`, `account`, `privacy`, `expiry`, `template_version` and `values`. It does not fire when the submitted values matched what was stored, so it marks a real change rather than a save. Course certificates and revoked certificates are refused earlier and never reach it. The credential ID, serial and issue date cannot change here, which is why the Open Badge status-list cache is not cleared.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The updated certificate. |
| 2 | `$changed` | `string[]` | Which areas changed. |
| 3 | `$byUserId` | `int` | The administrator who made the change. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/ManualCertificates.php:311` | `$certificate` (mixed)<br>`$changed` (mixed)<br>`(int) $byUserId` (int) |

### Example

```php
add_action('fluent_community/certificate/manual_updated', function ($certificate, $changed, $byUserId) {
}, 10, 3);
```

**Related:** [`fluent_community/certificate/before_manual_issue`](/hooks/filters/certificates#fluent-community-certificate-before-manual-issue)

<a id="fluent-community-certificate-reinstated"></a>

## `fluent_community/certificate/reinstated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when a suspended certificate has been returned to force.

::: info Resolved name
The source assembles this name at runtime from `fluent_community/certificate/{action}`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::

Only a suspended certificate reaches this point, so the hook marks the one path back. The stored reason has been cleared and the Open Badge status-list cache is dropped by core's listener. Revoked certificates never arrive here: that state is final.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The reinstated certificate. |
| 2 | `$byUserId` | `int` | The administrator who reinstated it. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` | `$certificate` (mixed)<br>`$byUserId` (int) |

### Example

```php
add_action('fluent_community/certificate/reinstated', function ($certificate, $byUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/certificate/suspended`](#fluent-community-certificate-suspended) · [`fluent_community/certificate/{action}`](#fluent-community-certificate-action)

<a id="fluent-community-certificate-reissued"></a>

## `fluent_community/certificate/reissued`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Fires after a course certificate has been rebuilt onto the current template version.

::: info Resolved name
The source assembles this name at runtime from `fluent_community/certificate/{action}`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::

Merge values, template version and the reissue stamps are saved by the time this runs, and the cached preview image has been cleared. The credential ID, serial, issue date, expiry and status are all unchanged, so a listener must not treat this as a new credential. It never fires for a manual certificate or a revoked one, both of which are refused earlier.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The reissued certificate, refreshed from the saved row. |
| 2 | `$byUserId` | `int` | The administrator who reissued it. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:234` | `$certificate` (mixed)<br>`$byUserId` (int) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` | `$certificate` (mixed)<br>`$byUserId` (int) |

### Example

```php
add_action('fluent_community/certificate/reissued', function ($certificate, $byUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/certificate/issued`](#fluent-community-certificate-issued)

<a id="fluent-community-certificate-revoked"></a>

## `fluent_community/certificate/revoked`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when a certificate has been revoked, which cannot be undone.

::: info Resolved name
The source assembles this name at runtime from `fluent_community/certificate/{action}`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::

The status and the reason are saved, and core clears the Open Badge status-list cache. Revoking is terminal in two senses: no endpoint reinstates it, and the course will not issue that holder a replacement even if they complete it again. The public status list cannot distinguish a revoked certificate from a suspended one, so a listener that needs the difference should read the certificate.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The revoked certificate. |
| 2 | `$byUserId` | `int` | The administrator who revoked it. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` | `$certificate` (mixed)<br>`$byUserId` (int) |

### Example

```php
add_action('fluent_community/certificate/revoked', function ($certificate, $byUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/certificate/suspended`](#fluent-community-certificate-suspended) · [`fluent_community/certificate/{action}`](#fluent-community-certificate-action)

<a id="fluent-community-certificate-suspended"></a>

## `fluent_community/certificate/suspended`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when a certificate has been suspended, which is reversible.

::: info Resolved name
The source assembles this name at runtime from `fluent_community/certificate/{action}`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::

The status, the reason and who changed it are saved by the time this runs, and the per-certificate lock has been released. It only fires on a real transition — the precondition is re-checked against a freshly read row, so a stale caller gets an error and no action. Core clears the Open Badge status-list cache here. A suspended certificate also blocks the course from issuing that holder a new one until it is reinstated.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The suspended certificate. |
| 2 | `$byUserId` | `int` | The administrator who suspended it. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:317` | `$certificate` (mixed)<br>`$byUserId` (int) |

### Example

```php
add_action('fluent_community/certificate/suspended', function ($certificate, $byUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/certificate/reinstated`](#fluent-community-certificate-reinstated) · [`fluent_community/certificate/revoked`](#fluent-community-certificate-revoked) · [`fluent_community/certificate/{action}`](#fluent-community-certificate-action)

<a id="fluent-community-certificate-user-certificates-deleted"></a>

## `fluent_community/certificate/user_certificates_deleted`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after every certificate belonging to a member has been deleted, for an account deletion or a privacy erasure.

The rows are already gone by the time this runs, so their verification URLs answer 404 and the WordPress user no longer exists — a listener cannot look either of them up. Core drops every Open Badge status-list cache here, because the deleted IDs are no longer known. This is the one certificate hook that still fires when the certificates module is switched off, so a listener must not assume the module's services are registered. It does not fire when the member had no certificates, and an erasure that matches an account-less holder by email deletes those certificates on a separate path that does not fire it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$userId` | `int` | The member whose certificates were deleted. |
| 2 | `$count` | `int` | How many rows were deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/CertificatePrivacy.php:48` | `$userId` (int)<br>`$count` (mixed) |

### Example

```php
add_action('fluent_community/certificate/user_certificates_deleted', function ($userId, $count) {
}, 10, 2);
```

**Related:** [`fluent_community/certificate/revoked`](#fluent-community-certificate-revoked)

