---
title: Contact Model
description: ORM reference for FluentCommunity\App\Models\Contact.
---

# Contact Model

Bridges FluentCommunity users to FluentCRM contact records when FluentCRM is installed.

## Table

- **Table:** `fc_subscribers`
- **Primary key:** `id`
- **Schema ownership:** FluentCRM table. It is referenced by FluentCommunity when FluentCRM is installed.
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `hash` | `string` | Yes | `—` | Hash stored for this record. |
| `prefix` | `string` | Yes | `—` | Prefix stored for this record. |
| `first_name` | `string` | Yes | `—` | First Name stored for this record. |
| `last_name` | `string` | Yes | `—` | Last Name stored for this record. |
| `user_id` | `integer` | Yes | `—` | WordPress user ID associated with the row. |
| `company_id` | `integer` | Yes | `—` | Company ID stored for this record. |
| `email` | `string` | Yes | `—` | Email stored for this record. |
| `status` | `string` | Yes | `—` | Lifecycle or moderation status. |
| `contact_type` | `string` | Yes | `—` | Contact Type stored for this record. |
| `address_line_1` | `string` | Yes | `—` | Address Line 1 stored for this record. |
| `address_line_2` | `string` | Yes | `—` | Address Line 2 stored for this record. |
| `postal_code` | `string` | Yes | `—` | Postal Code stored for this record. |
| `city` | `string` | Yes | `—` | City stored for this record. |
| `state` | `string` | Yes | `—` | State stored for this record. |
| `country` | `integer` | Yes | `—` | Country stored for this record. |
| `phone` | `string` | Yes | `—` | Phone stored for this record. |
| `timezone` | `string` | Yes | `—` | Timezone stored for this record. |
| `date_of_birth` | `datetime` | Yes | `—` | Date Of Birth stored for this record. |
| `source` | `string` | Yes | `—` | Source stored for this record. |
| `life_time_value` | `string` | Yes | `—` | Life Time Value stored for this record. |
| `last_activity` | `string` | Yes | `—` | Timestamp of the last tracked user activity. |
| `total_points` | `string` | Yes | `—` | Accumulated profile points used for rankings and badges. |
| `latitude` | `string` | Yes | `—` | Latitude stored for this record. |
| `longitude` | `string` | Yes | `—` | Longitude stored for this record. |
| `ip` | `string` | Yes | `—` | Ip stored for this record. |
| `created_at` | `datetime` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `datetime` | Yes | `—` | Update timestamp maintained by the ORM. |
| `avatar` | `string` | Yes | `—` | Avatar URL for the profile or user. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| — | — | — | No relationships are declared on this model. |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| — | — | No custom scopes are declared on this model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\Contact;

$records = Contact::query()
    
    ->limit(10)
    ->get();

$first = Contact::query()->first();
```
