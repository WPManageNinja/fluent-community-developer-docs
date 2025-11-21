---
prev:
  text: 'Managers Filters'
  link: '/hooks/filters/managers'
next:
  text: 'Followers Filters'
  link: '/hooks/filters/followers'
---

<DocStatusBanner />


# Moderation Filters

## Available Filters

### fluent_community/report_reasons

Filters the available report reasons shown to users when reporting content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$reasons` | array | Array of report reason options |

**Return:** `array` - Modified report reasons

**Default Reasons:**
- Spam or misleading
- Harassment or hate speech
- Violence or dangerous content
- Inappropriate content
- Copyright violation
- Other

**Example Usage:**

```php
// Add custom report reasons
add_filter('fluent_community/report_reasons', function($reasons) {
    $reasons['custom_violation'] = [
        'label' => 'Community Guidelines Violation',
        'description' => 'Content violates our community guidelines'
    ];

    $reasons['off_topic'] = [
        'label' => 'Off-Topic Content',
        'description' => 'Content is not relevant to this space'
    ];

    return $reasons;
}, 10, 1);

// Remove specific report reasons
add_filter('fluent_community/report_reasons', function($reasons) {
    // Remove copyright violation option
    unset($reasons['copyright']);

    return $reasons;
}, 10, 1);

// Customize reason labels
add_filter('fluent_community/report_reasons', function($reasons) {
    if (isset($reasons['spam'])) {
        $reasons['spam']['label'] = 'Spam or Scam Content';
        $reasons['spam']['description'] = 'This content appears to be spam or a scam';
    }

    return $reasons;
}, 10, 1);
```

---

## Status

**Documentation Status:** 📝 In Progress

Additional moderation filters are currently being documented, including:

- Report data modification
- Moderation action filters
- Spam detection customization
- Auto-moderation rules
- Moderation queue filtering
- Moderator permission filters

## Coming Soon

Detailed documentation for additional moderation filters will include:

- **Report Processing Filters** - Modify report handling and workflow
- **Spam Detection Filters** - Customize spam detection algorithms
- **Auto-Moderation Filters** - Control automatic moderation actions
- **Moderation Queue Filters** - Filter and sort moderation queue items
- **Moderator Action Filters** - Customize moderator capabilities
- **Content Flagging Filters** - Control content flagging behavior

## Temporary Reference

For now, you can explore moderation-related filters by searching the codebase:

```bash
# Search for moderation filters in the plugin
grep -r "apply_filters.*fluent_community.*moderat\|report" wp-content/plugins/fluent-community-pro/
```

## Related Documentation

- [Action Hooks - Moderation](/hooks/actions/moderation) - Moderation action hooks
- [Permissions Filters](/hooks/filters/permissions) - Permission-related filters
- [Users Filters](/hooks/filters/users) - User moderation filters

## Need Help?

If you need specific moderation filter documentation urgently, please:

1. Check the [Action Hooks - Moderation](/hooks/actions/moderation) section
2. Review the source code in `fluent-community-pro/app/Services/ModerationService.php`
3. Contact support for specific use cases

---

**Last Updated:** 2025-11-20
**Status:** Partial documentation available
