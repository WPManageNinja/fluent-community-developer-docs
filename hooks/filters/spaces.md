---
prev:
  text: 'Comments Filters'
  link: '/hooks/filters/comments'
next:
  text: 'Users & Profiles Filters'
  link: '/hooks/filters/users'
---

<DocStatusBanner />


# Spaces Filters

## Space Data Filters

### fluent_community/space/create_data ​

Filters the data used to create a new space before it's saved to the database.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Space creation data (title, slug, privacy, description, etc.) |

**Return:** `array` - Modified space creation data

**Example Usage:**

```php
// Auto-set custom settings for all new spaces
add_filter('fluent_community/space/create_data', function($data) {
    // Add custom default settings
    if (!isset($data['settings'])) {
        $data['settings'] = [];
    }

    $data['settings']['custom_welcome_message'] = 'Welcome to our community!';
    $data['settings']['auto_approve_posts'] = true;

    return $data;
});

// Force all new spaces to be public
add_filter('fluent_community/space/create_data', function($data) {
    $data['privacy'] = 'public';
    return $data;
});

// Add custom slug prefix
add_filter('fluent_community/space/create_data', function($data) {
    if (!empty($data['slug'])) {
        $data['slug'] = 'community-' . $data['slug'];
    }
    return $data;
});
```

**Common Use Cases:**
- Set default space settings
- Enforce privacy policies
- Add custom metadata
- Modify slug generation
- Set default descriptions

**Related Filters:**
- `fluent_community/space/update_data`
- `fluent_community/space/meta_fields`

---

### fluent_community/space/update_data ​

Filters the data used to update an existing space before changes are saved.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Space update data |
| `$space` | Space | The space object being updated |

**Return:** `array` - Modified space update data

**Example Usage:**

```php
// Prevent changing space privacy after creation
add_filter('fluent_community/space/update_data', function($data, $space) {
    // Remove privacy from update data
    unset($data['privacy']);
    return $data;
}, 10, 2);

// Log space title changes
add_filter('fluent_community/space/update_data', function($data, $space) {
    if (isset($data['title']) && $data['title'] !== $space->title) {
        error_log(sprintf(
            'Space %d title changed from "%s" to "%s"',
            $space->id,
            $space->title,
            $data['title']
        ));
    }
    return $data;
}, 10, 2);

// Sanitize custom fields
add_filter('fluent_community/space/update_data', function($data, $space) {
    if (isset($data['settings']['custom_field'])) {
        $data['settings']['custom_field'] = sanitize_text_field(
            $data['settings']['custom_field']
        );
    }
    return $data;
}, 10, 2);
```

**Common Use Cases:**
- Prevent certain field updates
- Log space changes
- Sanitize custom data
- Enforce business rules
- Validate update data

**Related Filters:**
- `fluent_community/space/create_data`

---

## Membership Filters

### fluent_community/space/join_status_for_private ​

Filters the membership status when a user joins a private space. Use this to auto-approve members or implement custom approval logic.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$status` | string | Default status ('pending') |
| `$space` | Space | The space being joined |
| `$user` | User | The user joining the space |

**Return:** `string` - Membership status ('pending' or 'active')

**Example Usage:**

```php
// Auto-approve users with specific role
add_filter('fluent_community/space/join_status_for_private', function($status, $space, $user) {
    // Auto-approve administrators
    if ($user->isAdmin()) {
        return 'active';
    }
    return $status;
}, 10, 3);

// Auto-approve based on email domain
add_filter('fluent_community/space/join_status_for_private', function($status, $space, $user) {
    $email = $user->user_email;
    $allowedDomains = ['company.com', 'partner.com'];

    foreach ($allowedDomains as $domain) {
        if (str_ends_with($email, '@' . $domain)) {
            return 'active';
        }
    }

    return $status;
}, 10, 3);

// Auto-approve for specific spaces
add_filter('fluent_community/space/join_status_for_private', function($status, $space, $user) {
    $autoApproveSpaces = [1, 5, 10]; // Space IDs

    if (in_array($space->id, $autoApproveSpaces)) {
        return 'active';
    }

    return $status;
}, 10, 3);
```

**Common Use Cases:**
- Auto-approve trusted users
- Implement custom approval logic
- Domain-based auto-approval
- Role-based membership
- Space-specific rules

**Related Actions:**
- `fluent_community/space/joined`
- `fluent_community/space/join_requested`

---

## Space Meta & Settings

### fluent_community/space/meta_fields ​

Filters the custom meta fields available for a space. Use this to add custom settings fields to space settings.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$metaFields` | array | Array of meta field definitions |
| `$space` | Space | The space object |

**Return:** `array` - Modified meta fields array

**Example Usage:**

```php
// Add custom meta fields to space settings
add_filter('fluent_community/space/meta_fields', function($metaFields, $space) {
    $metaFields[] = [
        'key'         => 'welcome_message',
        'label'       => 'Welcome Message',
        'type'        => 'textarea',
        'placeholder' => 'Enter welcome message for new members',
        'help'        => 'This message will be shown to new members'
    ];

    $metaFields[] = [
        'key'     => 'require_approval',
        'label'   => 'Require Post Approval',
        'type'    => 'checkbox',
        'help'    => 'All posts must be approved by moderators'
    ];

    return $metaFields;
}, 10, 2);

// Add conditional fields based on space type
add_filter('fluent_community/space/meta_fields', function($metaFields, $space) {
    if ($space->type === 'course') {
        $metaFields[] = [
            'key'     => 'course_duration',
            'label'   => 'Course Duration (hours)',
            'type'    => 'number',
            'default' => 10
        ];
    }

    return $metaFields;
}, 10, 2);
```

**Common Use Cases:**
- Add custom space settings
- Extend space configuration
- Add conditional fields
- Implement custom features
- Store space-specific data

**Related Filters:**
- `fluent_community/course/meta_fields`

**See Also:**
- [Meta Settings API Guide](/guides/meta-settings-api)

---

### fluent_community/space_header_links ​

Filters the custom links displayed in the space header menu.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$headerLinks` | array | Array of header link objects |
| `$space` | Space | The space object |

**Return:** `array` - Modified header links array

**Example Usage:**

```php
// Add custom link to space header
add_filter('fluent_community/space_header_links', function($links, $space) {
    $links[] = [
        'title' => 'Resources',
        'url'   => 'https://example.com/resources/' . $space->slug
    ];

    return $links;
}, 10, 2);

// Add member-only links
add_filter('fluent_community/space_header_links', function($links, $space) {
    // Only show for space members
    if ($space->membership && $space->membership->status === 'active') {
        $links[] = [
            'title' => 'Members Area',
            'url'   => '/members-area/' . $space->slug
        ];
    }

    return $links;
}, 10, 2);

// Add conditional links based on space settings
add_filter('fluent_community/space_header_links', function($links, $space) {
    $settings = $space->settings;

    if (!empty($settings['external_forum_url'])) {
        $links[] = [
            'title' => 'Forum',
            'url'   => $settings['external_forum_url']
        ];
    }

    return $links;
}, 10, 2);
```

**Common Use Cases:**
- Add external resource links
- Add member-only links
- Link to related content
- Add custom navigation
- Integrate external tools

**See Also:**
- [Menu Customization Guide](/guides/menu-customization)

---

## API Response Filters

### fluent_community/space_members_api_response ​

Filters the API response data for space members list.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Response data (members, pending_count) |
| `$spaceMembers` | Collection | Paginated members collection |
| `$requestData` | array | Request parameters |

**Return:** `array` - Modified API response

**Example Usage:**

```php
// Add custom data to members response
add_filter('fluent_community/space_members_api_response', function($response, $members, $request) {
    $response['total_active'] = $members->where('status', 'active')->count();
    $response['custom_stats'] = [
        'admins'     => $members->where('role', 'admin')->count(),
        'moderators' => $members->where('role', 'moderator')->count(),
        'members'    => $members->where('role', 'member')->count()
    ];

    return $response;
}, 10, 3);

// Filter members based on custom criteria
add_filter('fluent_community/space_members_api_response', function($response, $members, $request) {
    // Add verified members count
    $verifiedCount = 0;
    foreach ($members as $member) {
        if ($member->xprofile && $member->xprofile->is_verified) {
            $verifiedCount++;
        }
    }

    $response['verified_members_count'] = $verifiedCount;

    return $response;
}, 10, 3);
```

**Common Use Cases:**
- Add custom statistics
- Include additional member data
- Add computed fields
- Modify response structure
- Add metadata

---

## Permission Filters

### fluent_community/user/space/permissions ​

Filters user permissions within a specific space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$permissions` | array | Array of permission flags |
| `$space` | Space | The space object |
| `$role` | string | User's role in space (admin, moderator, member, student) |
| `$user` | User | The user object |

**Return:** `array` - Modified permissions array

**Example Usage:**

```php
// Grant custom permissions based on role
add_filter('fluent_community/user/space/permissions', function($permissions, $space, $role, $user) {
    // Allow moderators to manage courses
    if ($role === 'moderator') {
        $permissions['can_manage_courses'] = true;
    }

    return $permissions;
}, 10, 4);

// Add custom permission checks
add_filter('fluent_community/user/space/permissions', function($permissions, $space, $role, $user) {
    // Check if user has completed onboarding
    $hasCompletedOnboarding = get_user_meta($user->ID, 'completed_onboarding', true);
    $permissions['can_create_posts'] = $hasCompletedOnboarding ? true : false;

    return $permissions;
}, 10, 4);

// Space-specific permissions
add_filter('fluent_community/user/space/permissions', function($permissions, $space, $role, $user) {
    // Restrict certain actions in specific spaces
    if ($space->slug === 'announcements-only') {
        $permissions['can_create_feed'] = ($role === 'admin');
    }

    return $permissions;
}, 10, 4);
```

**Common Use Cases:**
- Customize role permissions
- Implement custom permission logic
- Space-specific restrictions
- Feature gating
- Access control

**Related Filters:**
- `fluent_community/user/permissions`

---

### fluent_community/space_document_title_label ​

Filters the document title label for space pages.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$title` | string | Document title |
| `$space` | Space | Space object |

**Return:** `string` - Modified title

**Example Usage:**

```php
// Custom space title format
add_filter('fluent_community/space_document_title_label', function($title, $space) {
    return $space->title . ' - Community Space';
}, 10, 2);

// Add member count to title
add_filter('fluent_community/space_document_title_label', function($title, $space) {
    $member_count = count_space_members($space->id);
    return sprintf('%s (%d members)', $space->title, $member_count);
}, 10, 2);

// SEO-optimized titles
add_filter('fluent_community/space_document_title_label', function($title, $space) {
    $site_name = get_bloginfo('name');
    return sprintf('%s | %s Community', $space->title, $site_name);
}, 10, 2);
```

**Common Use Cases:**
- SEO optimization
- Custom title formats
- Branding
- Dynamic titles

---

## Related Documentation

- [Space Actions](/hooks/actions/spaces)
- [Menu Customization Guide](/guides/menu-customization)
- [Meta Settings API](/guides/meta-settings-api)
- [Code Snippets](/guides/code-snippets)
