---
title: Code Snippets
description: Source-verified snippets for common FluentCommunity customizations.
---

# Code Snippets

These snippets are validated against the current core and Pro source trees. Use them in a small custom plugin or an MU plugin rather than editing FluentCommunity directly.

## Change the Portal Slug

`FluentCommunity\App\Services\Helper::getPortalSlug()` checks the saved setting first and then honors the `FLUENT_COMMUNITY_PORTAL_SLUG` constant.

```php
define('FLUENT_COMMUNITY_PORTAL_SLUG', 'community');
```

To serve the portal from the site root:

```php
define('FLUENT_COMMUNITY_PORTAL_SLUG', '');
```

Resave your WordPress permalinks after changing the slug so the rewrite rules are rebuilt.

## Add Custom CSS or JavaScript

The portal template fires `fluent_community/portal_head` and `fluent_community/portal_footer`.

```php
add_action('fluent_community/portal_head', function () {
    ?>
    <style>
        .fcom_header {
            background: #19283a;
        }
    </style>
    <?php
});
```

```php
add_action('fluent_community/portal_footer', function () {
    ?>
    <script>
        window.fcomDocsExample = true;
    </script>
    <?php
});
```

## Check Whether a Feature Module Is Enabled

```php
use FluentCommunity\App\Services\Helper;

if (Helper::isFeatureEnabled('course_module')) {
    // Course features are enabled.
}
```

Common feature keys seen in the current code and settings payloads include:

- `course_module`
- `leader_board_module`
- `giphy_module`
- `emoji_module`
- `cloud_storage`
- `user_badge`

## Add or Remove Space Memberships Programmatically

```php
use FluentCommunity\App\Services\Helper;

$spaceId = 12;
$userId = 34;

Helper::addToSpace($spaceId, $userId, 'member', 'by_admin');
Helper::removeFromSpace($spaceId, $userId, 'by_admin');
```

The built-in helper supports the `member`, `moderator`, and `admin` roles.

## Get a User's Space Memberships

```php
use FluentCommunity\App\Services\Helper;

$spaceIds = Helper::getUserSpaceIds($userId);
$spaces = Helper::getUserSpaces($userId);
```

`getUserSpaceIds()` returns plain IDs. `getUserSpaces()` returns the loaded space models.

## Inspect the Current Portal Base URL

```php
use FluentCommunity\App\Services\Helper;

$portalHome = Helper::baseUrl('/');
$spaceUrl = Helper::baseUrl('/space/general/home');
```

This is safer than concatenating the slug yourself because it respects hash/history routing and any slug override.
