---
prev:
  text: 'Moderation Filters'
  link: '/hooks/filters/moderation'
next:
  text: 'Filter Hooks Overview'
  link: '/hooks/filters'
---

# Followers Filters

## Status

**Documentation Status:** 📝 In Progress

This section is currently being documented. Filter hooks for the followers system include:

- Follower data modification
- Follow/unfollow behavior customization
- Follower list filtering
- Follower count calculations
- Follower notification settings
- Follower privacy controls

## Coming Soon

Detailed documentation for follower filters will include:

- **Follower Data Filters** - Modify follower information and relationships
- **Follow Action Filters** - Customize follow/unfollow behavior
- **Follower Query Filters** - Filter follower lists and queries
- **Follower Display Filters** - Customize follower UI elements
- **Follower Permission Filters** - Control who can follow whom
- **Follower Notification Filters** - Customize follower notifications

## Temporary Reference

For now, you can explore follower-related filters by searching the codebase:

```bash
# Search for follower filters in the plugin
grep -r "apply_filters.*fluent_community.*follow" wp-content/plugins/fluent-community-pro/
```

## Related Documentation

- [Action Hooks - Followers](/hooks/actions/followers) - Follower action hooks
- [Users Filters](/hooks/filters/users) - User-related filters
- [Notifications Filters](/hooks/filters/notifications) - Notification filters

## Need Help?

If you need specific follower filter documentation urgently, please:

1. Check the [Action Hooks - Followers](/hooks/actions/followers) section
2. Review the source code in `fluent-community-pro/app/Services/FollowerService.php`
3. Contact support for specific use cases

---

**Last Updated:** 2025-11-20
**Status:** Documentation in progress
