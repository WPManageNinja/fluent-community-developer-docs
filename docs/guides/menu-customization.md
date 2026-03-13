---
title: Menu Customization
description: Add custom links to FluentCommunity header, space, and profile navigation.
---

# Menu Customization

FluentCommunity exposes three stable extension points for menu-style UI additions: a header action, a space-header filter, and a profile payload filter.

## Header Menu Items

`PortalHandler` fires `do_action('fluent_community/before_header_menu_items', $auth, $context)` before the right-side header items render.

```php
add_action('fluent_community/before_header_menu_items', function ($auth, $context) {
    if (!$auth) {
        return;
    }
    ?>
    <li class="top_menu_item fcom_icon_link">
        <a href="https://example.com/help" target="_blank" rel="noopener">
            <span>Help</span>
        </a>
    </li>
    <?php
}, 10, 2);
```

Use the second argument if you want different behavior for headless versus classic rendering contexts.

## Space Header Links

`BaseSpace::appendMetaData()` filters the space header links through `fluent_community/space_header_links`.

```php
add_filter('fluent_community/space_header_links', function ($links, $space) {
    if (!$space->membership) {
        return $links;
    }

    $links[] = [
        'title' => 'Playbook',
        'url'   => 'https://example.com/playbook',
    ];

    return $links;
}, 10, 2);
```

The current Pro document library uses the same filter, so append to the array instead of replacing it.

## Profile Action Links

`ProfileController@getProfile()` initializes `profile_nav_actions` and then passes the payload through `fluent_community/profile_view_data`.

```php
add_filter('fluent_community/profile_view_data', function ($data, $xprofile) {
    $data['profile_nav_actions'][] = [
        'css_class' => 'custom-profile-link',
        'title'     => 'Book a Call',
        'svg_icon'  => '<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="10" fill="currentColor" /></svg>',
        'url'       => 'https://example.com/call',
    ];

    return $data;
}, 10, 2);
```

Append to `profile_nav_actions` instead of overwriting it. Pro features such as followers and scheduled posts also populate this array.

## Admin-Side Menu Settings

FluentCommunity also exposes persisted menu settings through the settings API:

- [Get Menu Settings](/restapi/operations/settings/get-menu-settings)
- [Save Menu Settings](/restapi/operations/settings/save-menu-settings)

Use the hooks above when you need runtime, code-driven links. Use the settings endpoints for admin-managed navigation.
