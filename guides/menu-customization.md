<DocStatusBanner />

# Menu Customization ​

## Introduction ​

Fluent Community allows you to add custom links and menu items to various parts of the community interface. This is useful for integrating external tools, adding custom pages, or enhancing navigation.

::: tip Use Cases
- Add links to external resources or documentation
- Integrate third-party tools (chat, support, etc.)
- Add custom navigation items
- Create shortcuts to important pages
:::

---

## Available Menu Locations ​

Fluent Community provides several locations where you can add custom menu items:

1. **Header Menu** - Top navigation bar (right side icons)
2. **Space Menu** - Space-specific navigation
3. **User Profile Menu** - Profile page actions

---

## Header Menu Customization ​

Add custom links to the top navigation bar (right side, next to notifications and user menu).

### Basic Example ​

```php
add_action('fluent_community/before_header_menu_items', function ($currentProfile) {
    ?>
    <li class="top_menu_item">
        <a href="https://example.com" target="_blank">
            <div class="chat_icon">
                <i class="el-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                </i>
            </div>
        </a>
    </li>
    <?php
});
```

### Conditional Display ​

Show menu items only for specific users:

```php
add_action('fluent_community/before_header_menu_items', function ($currentProfile) {
    // Show only for logged-in users
    if (!$currentProfile) {
        return;
    }
    
    ?>
    <li class="top_menu_item">
        <a href="https://members.example.com">
            <div class="chat_icon">
                <i class="el-icon">
                    <!-- Your SVG icon -->
                </i>
            </div>
        </a>
    </li>
    <?php
});
```

### Show Only for Non-Logged-In Users ​

```php
add_action('fluent_community/before_header_menu_items', function ($currentProfile) {
    // Show only for non-logged-in users
    if ($currentProfile) {
        return;
    }
    
    ?>
    <li class="top_menu_item">
        <a href="/register">
            <div class="chat_icon">
                <span>Sign Up</span>
            </div>
        </a>
    </li>
    <?php
});
```

### Show Only for Admins ​

```php
add_action('fluent_community/before_header_menu_items', function ($currentProfile) {
    if (!$currentProfile || !$currentProfile->is_admin) {
        return;
    }
    
    ?>
    <li class="top_menu_item">
        <a href="/wp-admin">
            <div class="chat_icon">
                <i class="el-icon">
                    <!-- Admin icon SVG -->
                </i>
            </div>
        </a>
    </li>
    <?php
});
```

---

## Space Menu Customization ​

Add custom links to space navigation menus.

### Basic Example ​

```php
add_filter('fluent_community/space_header_links', function ($links, $space) {
    $links[] = [
        'title' => 'Custom Link',
        'url'   => 'https://example.com'
    ];
    
    return $links;
}, 10, 2);
```

### Check Space Membership ​

```php
add_filter('fluent_community/space_header_links', function ($links, $space) {
    // $space->membership will be null if user is not a member
    if (!$space->membership) {
        return $links; // Don't add link for non-members
    }
    
    $links[] = [
        'title' => 'Members Only Resource',
        'url'   => 'https://example.com/members'
    ];
    
    return $links;
}, 10, 2);
```

### Add Multiple Links ​

```php
add_filter('fluent_community/space_header_links', function ($links, $space) {
    // Add documentation link
    $links[] = [
        'title' => 'Documentation',
        'url'   => 'https://docs.example.com'
    ];
    
    // Add support link
    $links[] = [
        'title' => 'Support',
        'url'   => 'https://support.example.com'
    ];
    
    // Add external community link
    $links[] = [
        'title' => 'Discord',
        'url'   => 'https://discord.gg/example'
    ];
    
    return $links;
}, 10, 2);
```

### Space-Specific Links ​

```php
add_filter('fluent_community/space_header_links', function ($links, $space) {
    // Add different links based on space
    if ($space->slug === 'developers') {
        $links[] = [
            'title' => 'API Docs',
            'url'   => 'https://api.example.com'
        ];
    } elseif ($space->slug === 'support') {
        $links[] = [
            'title' => 'Submit Ticket',
            'url'   => 'https://support.example.com/new'
        ];
    }
    
    return $links;
}, 10, 2);
```

---

## User Profile Menu Customization ​

Add custom action links to user profile pages.

### Basic Example ​

```php
add_filter('fluent_community/profile_view_data', function ($data, $xprofile) {
    $data['profile_nav_actions'][] = [
        'css_class' => 'custom-profile-link',
        'title'     => 'Custom Link',
        'svg_icon'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>',
        'url'       => 'https://example.com',
    ];
    
    return $data;
}, 10, 2);
```

### Without Icon ​

```php
add_filter('fluent_community/profile_view_data', function ($data, $xprofile) {
    $data['profile_nav_actions'][] = [
        'css_class' => 'custom-link',
        'title'     => 'View Portfolio',
        'url'       => 'https://portfolio.example.com/' . $xprofile->username,
    ];
    
    return $data;
}, 10, 2);
```

### Conditional Display ​

```php
add_filter('fluent_community/profile_view_data', function ($data, $xprofile) {
    // Only show for verified users
    if ($xprofile->is_verified) {
        $data['profile_nav_actions'][] = [
            'css_class' => 'verified-badge',
            'title'     => 'Verified Profile',
            'svg_icon'  => '<svg><!-- Verified icon --></svg>',
            'url'       => '/verified-members',
        ];
    }
    
    return $data;
}, 10, 2);
```

### Add Multiple Actions ​

```php
add_filter('fluent_community/profile_view_data', function ($data, $xprofile) {
    // Add website link if available
    if (!empty($xprofile->meta['website'])) {
        $data['profile_nav_actions'][] = [
            'css_class' => 'website-link',
            'title'     => 'Visit Website',
            'svg_icon'  => '<svg><!-- Globe icon --></svg>',
            'url'       => $xprofile->meta['website'],
        ];
    }
    
    // Add LinkedIn link if available
    if (!empty($xprofile->meta['social_links']['linkedin'])) {
        $data['profile_nav_actions'][] = [
            'css_class' => 'linkedin-link',
            'title'     => 'LinkedIn',
            'svg_icon'  => '<svg><!-- LinkedIn icon --></svg>',
            'url'       => 'https://linkedin.com/in/' . $xprofile->meta['social_links']['linkedin'],
        ];
    }
    
    return $data;
}, 10, 2);
```

---

## Common SVG Icons ​

Here are some commonly used SVG icons you can use in your menu items:

### External Link Icon ​

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
</svg>
```

### Chat/Message Icon ​

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
</svg>
```

### Help/Support Icon ​

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
</svg>
```

### Document Icon ​

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
</svg>
```

---

## Complete Examples ​

### Example 1: Add Support Chat Link ​

```php
add_action('fluent_community/before_header_menu_items', function ($currentProfile) {
    if (!$currentProfile) {
        return; // Only for logged-in users
    }
    ?>
    <li class="top_menu_item">
        <a href="https://support.example.com/chat" target="_blank" title="Live Support">
            <div class="chat_icon">
                <i class="el-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                </i>
            </div>
        </a>
    </li>
    <?php
});
```

### Example 2: Add Space Resources ​

```php
add_filter('fluent_community/space_header_links', function ($links, $space) {
    // Only for members
    if (!$space->membership) {
        return $links;
    }
    
    // Add space-specific resources
    $resources = [
        'developers' => [
            ['title' => 'API Documentation', 'url' => 'https://api.example.com'],
            ['title' => 'Code Examples', 'url' => 'https://examples.example.com'],
            ['title' => 'GitHub', 'url' => 'https://github.com/example']
        ],
        'support' => [
            ['title' => 'Knowledge Base', 'url' => 'https://kb.example.com'],
            ['title' => 'Submit Ticket', 'url' => 'https://support.example.com/new']
        ]
    ];
    
    if (isset($resources[$space->slug])) {
        $links = array_merge($links, $resources[$space->slug]);
    }
    
    return $links;
}, 10, 2);
```

### Example 3: Add Social Profile Links ​

```php
add_filter('fluent_community/profile_view_data', function ($data, $xprofile) {
    $socialLinks = $xprofile->meta['social_links'] ?? [];
    
    $socialPlatforms = [
        'twitter' => [
            'title' => 'Twitter',
            'icon' => '<svg><!-- Twitter icon --></svg>',
            'url_prefix' => 'https://twitter.com/'
        ],
        'github' => [
            'title' => 'GitHub',
            'icon' => '<svg><!-- GitHub icon --></svg>',
            'url_prefix' => 'https://github.com/'
        ],
        'linkedin' => [
            'title' => 'LinkedIn',
            'icon' => '<svg><!-- LinkedIn icon --></svg>',
            'url_prefix' => 'https://linkedin.com/in/'
        ]
    ];
    
    foreach ($socialPlatforms as $platform => $config) {
        if (!empty($socialLinks[$platform])) {
            $data['profile_nav_actions'][] = [
                'css_class' => $platform . '-link',
                'title'     => $config['title'],
                'svg_icon'  => $config['icon'],
                'url'       => $config['url_prefix'] . $socialLinks[$platform],
            ];
        }
    }
    
    return $data;
}, 10, 2);
```

---

## Styling Custom Menu Items ​

You can add custom CSS to style your menu items:

```php
add_action('fluent_community/portal_head', function() {
    ?>
    <style>
        .custom-profile-link {
            color: #4CAF50;
        }
        .custom-profile-link:hover {
            color: #45a049;
        }
        .top_menu_item .chat_icon {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
    <?php
});
```

---

## Best Practices ​

### 1. Use Descriptive Titles ​

```php
// Good
'title' => 'View Documentation'

// Bad
'title' => 'Click Here'
```

### 2. Add Target Attribute for External Links ​

```php
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
```

### 3. Check User Permissions ​

```php
if (!$currentProfile || !$currentProfile->is_admin) {
    return; // Don't show admin-only links
}
```

### 4. Use Meaningful CSS Classes ​

```php
'css_class' => 'documentation-link' // Good
'css_class' => 'link1' // Bad
```

### 5. Provide Icons for Better UX ​

Always include SVG icons for visual clarity, especially in header menus.

---

## Related Documentation ​

- [Filter Hooks](/hooks/filters/) - All available filter hooks
- [Action Hooks](/hooks/actions/) - All available action hooks
- [Code Snippets](/guides/code-snippets.md) - More practical examples
- [Helper Functions](/helpers/helper-class.md) - Utility functions

