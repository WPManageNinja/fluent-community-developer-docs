---
prev:
  text: 'Integrations Filters'
  link: '/hooks/filters/integrations'
next:
  text: 'Moderation Filters'
  link: '/hooks/filters/moderation'
---

<DocStatusBanner />


# Managers Filters

## Status

**Documentation Status:** 📝 In Progress

This section is currently being documented. Filter hooks for the managers system include:

- Manager data modification
- Manager permission customization
- Manager role filtering
- Manager assignment rules
- Manager capability checks
- Manager UI customization

## Coming Soon

Detailed documentation for manager filters will include:

- **Manager Data Filters** - Modify manager information and roles
- **Manager Permission Filters** - Customize manager capabilities
- **Manager Query Filters** - Filter manager lists and queries
- **Manager Assignment Filters** - Control manager assignment logic
- **Manager Display Filters** - Customize manager UI elements
- **Manager Action Filters** - Control what managers can do

## Temporary Reference

For now, you can explore manager-related filters by searching the codebase:

```bash
# Search for manager filters in the plugin
grep -r "apply_filters.*fluent_community.*manager" wp-content/plugins/fluent-community/
```

## Common Use Cases

While detailed documentation is being prepared, here are common manager filter use cases:

### Custom Manager Roles

```php
// Example: Add custom manager role levels
add_filter('fluent_community/manager_roles', function($roles) {
    $roles['senior_moderator'] = [
        'label' => 'Senior Moderator',
        'capabilities' => ['moderate', 'edit_posts', 'manage_members']
    ];

    return $roles;
}, 10, 1);
```

### Manager Permission Checks

```php
// Example: Customize manager permissions
add_filter('fluent_community/manager_can', function($can, $capability, $manager, $space) {
    // Custom permission logic
    if ($capability === 'delete_posts' && $manager->role === 'moderator') {
        // Only allow if manager has been active for 30+ days
        $can = $manager->days_active >= 30;
    }

    return $can;
}, 10, 4);
```

### Manager Data Modification

```php
// Example: Add custom manager metadata
add_filter('fluent_community/manager_data', function($managerData, $manager) {
    $managerData['custom_badge'] = get_manager_badge($manager->id);
    $managerData['total_actions'] = count_manager_actions($manager->id);

    return $managerData;
}, 10, 2);
```

## Related Documentation

- [Action Hooks - Managers](/hooks/actions/managers) - Manager action hooks
- [Spaces Filters](/hooks/filters/spaces) - Space-related filters
- [Permissions Filters](/hooks/filters/permissions) - Permission filters
- [Users Filters](/hooks/filters/users) - User-related filters

## Need Help?

If you need specific manager filter documentation urgently, please:

1. Check the [Action Hooks - Managers](/hooks/actions/managers) section
2. Review the source code in `fluent-community/app/Services/SpaceUserService.php`
3. Look for manager-related methods in space controllers
4. Contact support for specific use cases

---

**Last Updated:** 2025-11-20
**Status:** Documentation in progress
