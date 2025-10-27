# Fluent Community REST API

Welcome to the Fluent Community REST API documentation. This API allows you to interact with your Fluent Community site programmatically.

## Overview

The Fluent Community REST API provides endpoints for managing community content, users, spaces, and more. It follows RESTful principles and returns JSON responses.

## Base URL

All API requests should be made to:

```
https://your-site.com/wp-json/fluent-community/v1/
```

## API Namespace

Fluent Community uses the following namespaces:

- **Free Version**: `fluent-community/v1`
- **Pro Version**: `fluent-community-pro/v1`

## Quick Start

Here's a simple example of making an API request:

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v1/posts" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Key Features

- **RESTful Architecture**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **JSON Responses**: All responses are returned in JSON format
- **Authentication**: Multiple authentication methods supported
- **Pagination**: Large result sets are paginated
- **Error Handling**: Consistent error response format
- **Rate Limiting**: API rate limits to ensure fair usage

## API Resources

The Fluent Community API provides access to the following resources:

### Core Resources

- [**Posts**](./posts.md) - Create, read, update, and delete community posts
- [**Comments**](./comments.md) - Manage comments on posts
- [**Users**](./users.md) - User management and profiles
- [**Spaces**](./spaces.md) - Community spaces and groups
- [**Reactions**](./reactions.md) - Reactions and likes on content
- [**Media**](./media.md) - Upload and manage media files

### Additional Resources

- [**Notifications**](./notifications.md) - User notifications
- [**Bookmarks**](./bookmarks.md) - Saved posts and bookmarks
- [**Feeds**](./feeds.md) - Activity feeds and timelines
- [**Search**](./search.md) - Search across community content
- [**Settings**](./settings.md) - Community settings and configuration

## Authentication

Before making API requests, you'll need to authenticate. See the [Authentication Guide](./authentication.md) for detailed information on available authentication methods.

## Common Concepts

### Pagination

Most list endpoints support pagination using the following parameters:

- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 20, max: 100)

Example:
```bash
GET /posts?page=2&per_page=50
```

### Filtering

Many endpoints support filtering using query parameters:

```bash
GET /posts?space_id=123&status=published
```

### Sorting

Use the `orderby` and `order` parameters to sort results:

```bash
GET /posts?orderby=created_at&order=desc
```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "data": {
    // Response data here
  },
  "message": "Success message"
}
```

### Error Response

```json
{
  "code": "error_code",
  "message": "Human-readable error message",
  "data": {
    "status": 400
  }
}
```

## HTTP Status Codes

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity (validation error)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Rate Limiting

API requests are rate-limited to ensure fair usage and system stability. Rate limit information is included in response headers:

- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Remaining requests in current window
- `X-RateLimit-Reset` - Time when the rate limit resets

## Versioning

The API is versioned to ensure backward compatibility. The current version is `v1`. Always include the version in your API requests.

## Need Help?

- [Authentication Guide](./authentication.md)
- [Error Handling](./errors.md)
- [Code Examples](./examples.md)
- [Changelog](./changelog.md)

## Next Steps

1. [Set up authentication](./authentication.md)
2. [Make your first API request](./getting-started.md)
3. [Explore API resources](#api-resources)

