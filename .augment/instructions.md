## API Version

All API endpoints are prefixed with `/wp-json/fluent-community/v2/` and require authentication.

## Authentication

All API endpoints require Basic Authentication. Include the following header in your requests:
```
Authorization: Basic <base64_encoded_credentials>
```

## Documentation Structure

Each API section has its own directory with documentation files containing:
- Endpoint descriptions
- Request/response formats
- Authentication requirements
- Example requests and responses
- Error handling

## Error Handling

Error responses include:
- Error code
- Error message
- Additional error details when available

Example error response:
```json
{
    "code": "rest_no_route",
    "message": "No route was found matching the URL and request method.",
    "data": {
        "status": 404,
        "wpfluent": {
            "env": "dev",
            "method": "GET",
            "request_url": "https://community.lab/wp-json/fluent-community/v2/feeds",
            "route_params": [],
            "query_params": [],
            "body_params": []
        }
    }
}
```


## Pagination

List endpoints support pagination with the following query parameters:
- `page` (integer): Page number
- `per_page` (integer): Number of items per page


## Contributing
1. Place documentation in the appropriate section directory
2. Use README.md files for main documentation
3. Include example requests and responses
4. Document all parameters and response fields
5. Add error handling examples

## User Profile Information

Many endpoints include user profile information in the `xprofile` field:
```json
{
    "user_id": 1,
    "total_points": 6425,
    "is_verified": 1,
    "status": "active",
    "display_name": "User Name",
    "username": "username",
    "avatar": "avatar_url",
    "created_at": "2024-03-05 16:37:02",
    "short_description": "User description",
    "meta": {
        "website": "website_url",
        "cover_photo": "cover_photo_url",
        "social_links": {
            "twitter": "@handle",
            "youtube": "@handle",
            "linkedin": "handle",
            "fb": "handle",
            "instagram": "handle"
        },
        "badge_slug": ["badge1", "badge2"]
    },
    "badge": null
}
```

## Plugin Source
- /Users/hasanmisbah/Sites/community/wp-content/plugins/fluent-community
- /Users/hasanmisbah/Sites/community/wp-content/plugins/fluent-community-pro


## API Credentials

REST API Username: hasan
REST API Password: 1wLq paG4 lvL3 OYPg nf4A 9E1y
REST API URL: https://community.test/wp-json/fluent-community/v2/

Authorization: USERNAME:PASSWORD
