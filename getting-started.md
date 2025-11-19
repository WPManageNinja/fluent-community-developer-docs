# Fluent Community Developer Guide

## Fluent Community Core Complete Guide

Welcome to the complete developer guide for Fluent Community - the self-hosted community platform for WordPress. This comprehensive guide will take you from understanding the basics to building sophisticated integrations and custom functionality.

## What is Fluent Community?

Fluent Community is a Self-Hosted Community Platform for WordPress that helps businesses and organizations build thriving online communities. Unlike cloud-based solutions, Fluent Community runs entirely on your WordPress site, ensuring data privacy, unlimited members, and no monthly fees.

## Why Extend Fluent Community?

Fluent Community is designed to be highly extensible, allowing developers to customize and extend its functionality far beyond what the plugin offers out-of-the-box. Whether you're a business owner looking to customize your community or a developer hired to create specific integrations, Fluent Community provides the tools you need.

### 🔧 Built for Customization

- **Extensive hook system** - 200+ action and filter hooks for custom functionality
- **Modular architecture** - Clean separation allows safe modifications and additions
- **RESTful API** - Complete programmatic access to all community data and functionality
- **WordPress-native** - Follows WordPress coding standards and best practices

### 🏗️ Flexible Extension Points

- **Custom integrations** - Connect with external services and platforms
- **Custom modules** - Add specialized functionality and features
- **API extensions** - Build custom endpoints for mobile apps or external systems
- **UI customization** - Modify portal pages, profiles, and components

### 💼 Business Benefits

- **No vendor lock-in** - Your customizations stay with you, not dependent on external services
- **Unlimited scalability** - Extend functionality as your community needs grow
- **Cost-effective** - One-time development instead of ongoing SaaS fees
- **Complete control** - Modify any aspect to match your specific community needs

## Fluent Community Versions

### Fluent Community Core (Free)

The free version includes powerful core functionalities:

- ✅ **Feed Management** - Unlimited posts, discussions, and content
- ✅ **Space Management** - Organize content into spaces and categories
- ✅ **Member Management** - User profiles, activity tracking, and engagement
- ✅ **Comment System** - Threaded discussions and replies
- ✅ **Reaction System** - Likes, bookmarks, and custom reactions
- ✅ **Notification System** - Real-time notifications and alerts
- ✅ **Media Management** - File uploads and media attachments
- ✅ **Developer API** - Full access to hooks and REST API

### Fluent Community Pro (Premium)

The premium version adds advanced community features:

- 🚀 **Advanced Moderation** - Content moderation and reporting tools
- 🚀 **User Following** - Follow users and get personalized feeds
- 🚀 **Advanced Analytics** - Detailed engagement and performance analytics
- 🚀 **Custom Badges** - User badges and achievements
- 🚀 **Advanced Permissions** - Granular role and permission management
- 🚀 **Priority Support** - Dedicated support and assistance

## Core Development Concepts

### 📊 Data Architecture

Fluent Community follows WordPress conventions with a clean, normalized database structure:

**Core Tables & Relationships:**

- 🗣️ **Feeds (fcom_posts)** - Central hub for all community content
  - Stores posts, discussions, and updates
  - Links to comments, reactions, and media

- 👥 **Members (fcom_xprofile)** - Extended user profiles
  - User profiles, activity, and engagement metrics
  - Integration with WordPress users

- 🏢 **Spaces (fcom_spaces)** - Content organization
  - Space information, settings, and permissions
  - Space groups and hierarchies

- 💬 **Comments (fcom_post_comments)** - Discussion threads
  - Threaded comments and replies
  - Comment reactions and moderation

- 🔔 **Notifications (fcom_notifications)** - User notifications
  - Notification templates and delivery
  - User notification preferences

### 🔄 Community Workflow

The three-component community system:

1. **Content** - Feeds, comments, and media management
2. **Engagement** - Reactions, follows, and interactions
3. **Organization** - Spaces, topics, and categorization

### 🔌 Extension Points

Multiple ways to extend Fluent Community:

- **WordPress Hooks** - 200+ actions and filters for custom functionality
- **REST API** - Complete programmatic access to all features
- **Custom Modules** - Add new features and integrations
- **Custom Fields** - Extend feeds, spaces, and profiles with custom data
- **Template System** - Customize frontend templates and layouts

## Directory Structure

Understanding Fluent Community's organized codebase:

```
fluent-community/
├── app/                    # Core application logic
│   ├── Hooks/             # WordPress action/filter handlers
│   │   ├── Handlers/      # Hook handlers
│   │   ├── actions.php    # Action hooks
│   │   └── filters.php    # Filter hooks
│   ├── Http/              # Request handling and routing
│   │   ├── Controllers/   # API and admin controllers
│   │   ├── Middleware/    # Request middleware
│   │   └── Routes/        # API route definitions
│   ├── Models/            # Database models and relationships
│   │   ├── Feed.php       # Feed model
│   │   ├── User.php       # User model
│   │   ├── Space.php      # Space model
│   │   └── ...           # Additional models
│   ├── Services/          # Business logic and services
│   │   ├── Helper.php     # Core helper utilities
│   │   └── ...           # Additional services
│   ├── Views/            # PHP template files
│   └── Functions/        # Global helper functions
│
├── api/                   # REST API endpoints and utilities
│   ├── Routes/           # API route definitions
│   └── Classes/          # API classes
│
├── resources/           # Frontend assets and templates
│   ├── admin/          # Admin interface (Vue.js)
│   │   ├── Components/ # Vue components
│   │   └── Modules/    # Feature modules
│   ├── portal/         # Community portal (Vue.js)
│   │   ├── Components/ # Portal components
│   │   └── Views/      # Portal views
│   └── assets/         # CSS, JS, and images
│
├── boot/                # Plugin initialization
├── config/              # Configuration files
├── database/            # Database migrations and schema
│   └── Migrations/      # Database migration files
│
└── fluent-community.php # Plugin entry point
```

## Development Environment Setup

### Prerequisites

- **WordPress 5.8+** - Modern WordPress installation
- **PHP 7.4+** - Recent PHP version with required extensions
- **MySQL 5.6+** - Database with InnoDB support
- **Basic WordPress Development** - Understanding of hooks, plugins, and themes

### Development Tools

- **Code Editor** - VS Code, PhpStorm, or your preferred editor
- **Local Environment** - Laravel Herd, Local by Flywheel, XAMPP, or Docker
- **Version Control** - Git for tracking changes (optional but recommended)
- **API Testing** - Postman or Insomnia for REST API development

## Getting Started Checklist

### 📖 Read the Fundamentals

- [ ] Understand the database schema
- [ ] Review core models
- [ ] Explore global functions

### 🔍 Explore the Hooks

- [ ] Browse action hooks
- [ ] Study filter hooks
- [ ] Try event system

### 🏗️ Build Your First Extension

- [ ] Create a custom integration
- [ ] Add custom functionality with hooks
- [ ] Build a custom module

### 🌐 API Integration

- [ ] Set up REST API access
- [ ] Test feed management
- [ ] Explore webhook integration

## Quick Start Guide

### 1. Database & Models

Start by understanding Fluent Community's data structure:

- **Database Schema** - Complete table structure
- **Core Models** - Feed, User, Space, Comment models
- **Model Relationships** - How data connects

[Learn more →](/database/)

### 2. Developer Hooks

Learn how to extend Fluent Community functionality:

- **Action Hooks** - Trigger custom code on events
- **Filter Hooks** - Modify data and behavior

[Learn more →](/hooks/)

### 3. REST API

Build external integrations and applications:

- **Authentication** - API authentication methods
- **Endpoints** - Available API endpoints
- **Examples** - Code examples and use cases

[Learn more →](/rest-api/)

## Your First Extension

Let's create a simple extension that logs when a new feed post is created.

### Step 1: Create a Custom Plugin

Create a new file `wp-content/plugins/my-fluent-community-extension/my-fluent-community-extension.php`:

```php
<?php
/**
 * Plugin Name: My Fluent Community Extension
 * Description: Custom extension for Fluent Community
 * Version: 1.0.0
 * Author: Your Name
 */

// Ensure Fluent Community is active
if (!defined('FLUENT_COMMUNITY')) {
    return;
}

// Hook into feed creation
add_action('fluent_community/feed_created', function($feed) {
    // Log the new feed
    error_log('New feed created: ' . $feed->title);

    // You can add custom logic here:
    // - Send notifications to external services
    // - Update analytics
    // - Trigger workflows
    // - Integrate with other plugins

    // Example: Send to external API
    wp_remote_post('https://your-api.com/webhook', [
        'body' => [
            'event' => 'feed_created',
            'feed_id' => $feed->id,
            'title' => $feed->title,
            'author' => $feed->user_id
        ]
    ]);
}, 10, 1);

// Hook into comment creation
add_action('fluent_community/comment_added', function($comment) {
    error_log('New comment added on feed #' . $comment->post_id);
}, 10, 1);

// Modify feed content before display
add_filter('fluent_community/feed_content', function($content, $feed) {
    // Add custom content or modify existing
    return $content . '<p class="custom-footer">Custom footer text</p>';
}, 10, 2);
```

### Step 2: Activate Your Plugin

1. Go to WordPress Admin → Plugins
2. Find "My Fluent Community Extension"
3. Click "Activate"

### Step 3: Test Your Extension

1. Create a new feed post in your community
2. Check your WordPress debug log
3. You should see the log message with the feed title

**Congratulations!** 🎉 You've created your first Fluent Community extension.

## Core Concepts

### Feeds

Feeds are the primary content type in Fluent Community. They represent posts, updates, announcements, and discussions.

**Key Features:**
- Rich text content with media attachments
- Reactions (likes, bookmarks)
- Comments and threaded discussions
- Space organization
- Topic tagging

**Learn more:** [Feed Model](/database/models#feed-model)

### Spaces

Spaces are containers for organizing community content. Think of them as categories, groups, or forums.

**Key Features:**
- Public, private, or secret visibility
- Member management
- Custom settings and permissions
- Space groups for organization

**Learn more:** [Space Model](/database/models#space-model)

### Members (XProfile)

Members are community users with extended profiles, activity tracking, and engagement metrics.

**Key Features:**
- Extended user profiles
- Activity tracking
- Points and badges
- Social links and bio

**Learn more:** [XProfile Model](/database/models#xprofile-model)

### Comments

Comments enable discussions and replies on feed posts with threaded conversations.

**Key Features:**
- Threaded replies
- Reactions
- Mentions
- Moderation

**Learn more:** [Comment Model](/database/models#comment-model)

## Common Use Cases

### Building a Mobile App

Use the REST API to build native mobile applications for iOS and Android.

**What you'll need:**
- REST API authentication
- Feed and comment endpoints
- User profile management
- Real-time notifications

**Resources:**
- [REST API Documentation](/rest-api/)
- [Authentication Guide](/rest-api/authentication)

### Integrating with External Services

Connect Fluent Community with CRMs, email marketing tools, analytics platforms, or other services.

**What you'll need:**
- Action hooks for events
- REST API for data access
- Webhook support
- Custom integrations

**Resources:**
- [Action Hooks](/hooks/actions)
- [REST API](/rest-api/)

### Custom Community Features

Add unique functionality specific to your community needs like gamification, custom workflows, or specialized content types.

**What you'll need:**
- Filter hooks for customization
- Action hooks for events
- Database models for data
- Custom templates

**Resources:**
- [Filter Hooks](/hooks/filters)
- [Action Hooks](/hooks/actions)
- [Database Models](/database/models)

### Analytics and Reporting

Build custom analytics dashboards and reporting tools for community insights.

**What you'll need:**
- Database models for queries
- REST API for data access
- Activity tracking
- Custom reports

**Resources:**
- [Database Models](/database/models)
- [Activity Model](/database/models#activity-model)
- [REST API](/rest-api/)

## Community & Support

### 📚 Learning Resources

- **Official Documentation** - Complete user and developer reference
- **Code Examples** - Practical examples and tutorials
- **API Reference** - Complete API documentation

### 💬 Community

- **Official Support** - Technical support and assistance
- **Developer Community** - Connect with other developers
- **GitHub** - Report issues and contribute

### 🔗 Useful Links

- [Fluent Community Website](https://fluentcommunity.co)
- [User Documentation](https://fluentcommunity.co/docs)
- [Support Portal](https://fluentcommunity.co/support)

## Best Practices

### Development Guidelines

1. **Use Hooks Over Core Modifications** - Never modify core plugin files directly
2. **Follow WordPress Coding Standards** - Maintain code quality and consistency
3. **Test Thoroughly** - Always test in development before deploying to production
4. **Handle Errors Gracefully** - Implement proper error handling and logging
5. **Document Your Code** - Help future developers understand your work
6. **Keep Security in Mind** - Validate and sanitize all inputs and outputs

### Performance Optimization

1. **Use Caching** - Cache expensive queries and API responses
2. **Optimize Database Queries** - Use proper indexes and query optimization
3. **Lazy Load Resources** - Load assets only when needed
4. **Use Pagination** - Paginate large data sets
5. **Monitor Performance** - Track and optimize slow operations

### Security Best Practices

1. **Validate Input** - Always validate and sanitize user input
2. **Escape Output** - Escape all output to prevent XSS attacks
3. **Use Nonces** - Protect forms and AJAX requests with nonces
4. **Check Permissions** - Verify user capabilities before actions
5. **Secure API Access** - Use proper authentication and authorization

---

## Next Steps ​

Now that you understand the basics, explore these resources to start building:

### Core Documentation ​

- **[Database Schema](/database/schema.md)** - Understand the database structure
- **[Database Models](/database/models.md)** - Learn about available models and their methods
- **[Query Builder](/database/query-builder.md)** - Master database queries
- **[Helper Functions](/helpers/)** - Discover utility functions

### Practical Guides ​

- **[Code Snippets](/guides/code-snippets.md)** - Ready-to-use code examples
- **[Meta Settings API](/guides/meta-settings-api.md)** - Extend space and course settings
- **[Menu Customization](/guides/menu-customization.md)** - Add custom navigation items
- **[Theme Compatibility](/guides/theme-compatibility.md)** - Integrate with your theme

### Integration & Deployment ​

- **[Cloud Storage](/guides/cloud-storage/)** - Configure cloud storage providers
- **[Incoming Webhooks](/guides/incoming-webhooks.md)** - Connect external applications
- **[Performance Optimization](/deployment/performance-optimization.md)** - Optimize your setup
- **[Server Requirements](/deployment/server-requirements.md)** - Hosting recommendations

### Developer Hooks & API ​

- **[Action Hooks](/hooks/actions/)** - Available action hooks
- **[Filter Hooks](/hooks/filters/)** - Available filter hooks
- **[REST API](/rest-api/)** - Complete API reference

---

Ready to start building? Explore the documentation and dive in! 🚀
