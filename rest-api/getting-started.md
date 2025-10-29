# Getting Started

This guide will help you make your first API request to the Fluent Community REST API.

## Prerequisites

Before you begin, make sure you have:

1. A WordPress site with Fluent Community installed
2. API access enabled (usually enabled by default)
3. Authentication credentials (see [Authentication Guide](./authentication.md))
4. A tool to make HTTP requests (cURL, Postman, or your preferred HTTP client)

## Step 1: Verify API Access

First, verify that the API is accessible by making a request to the API root:

```bash
curl https://your-site.com/wp-json/fluent-community/v2/
```

**Expected Response:**

```json
{
  "namespace": "fluent-community/v1",
  "routes": {
    "/fluent-community/v2/posts": {
      "methods": ["GET", "POST"]
    },
    // ... other routes
  }
}
```

If you receive this response, the API is working correctly!

## Step 2: Set Up Authentication

Choose an authentication method based on your use case:

### For Testing (Application Passwords)

1. Go to your WordPress admin → **Users → Profile**
2. Scroll to **Application Passwords**
3. Create a new application password
4. Save the credentials

```bash
# Set your credentials
USERNAME="your_username"
APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
```

### For Production (JWT or OAuth)

See the [Authentication Guide](./authentication.md) for detailed setup instructions.

## Step 3: Make Your First Request

Let's fetch a list of community posts:

### Using cURL

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/posts" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

### Using JavaScript (Fetch API)

```javascript
const username = 'your_username';
const appPassword = 'xxxx xxxx xxxx xxxx xxxx xxxx';
const credentials = btoa(`${username}:${appPassword}`);

fetch('https://your-site.com/wp-json/fluent-community/v2/posts', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Python (Requests)

```python
import requests
from requests.auth import HTTPBasicAuth

url = 'https://your-site.com/wp-json/fluent-community/v2/posts'
username = 'your_username'
app_password = 'xxxx xxxx xxxx xxxx xxxx xxxx'

response = requests.get(
    url,
    auth=HTTPBasicAuth(username, app_password)
)

print(response.json())
```

### Using PHP

```php
<?php
$url = 'https://your-site.com/wp-json/fluent-community/v2/posts';
$username = 'your_username';
$app_password = 'xxxx xxxx xxxx xxxx xxxx xxxx';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$app_password");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);
?>
```

## Step 4: Create a New Post

Now let's create a new community post:

```bash
curl -X POST "https://your-site.com/wp-json/fluent-community/v2/posts" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First API Post",
    "content": "This post was created via the REST API!",
    "space_id": 1,
    "status": "published"
  }'
```

**Expected Response:**

```json
{
  "data": {
    "id": 123,
    "title": "My First API Post",
    "content": "This post was created via the REST API!",
    "space_id": 1,
    "status": "published",
    "author_id": 1,
    "created_at": "2025-10-27T10:30:00",
    "updated_at": "2025-10-27T10:30:00"
  },
  "message": "Post created successfully"
}
```

## Step 5: Update a Post

Update the post you just created:

```bash
curl -X PUT "https://your-site.com/wp-json/fluent-community/v2/posts/123" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Updated API Post",
    "content": "This post was updated via the REST API!"
  }'
```

## Step 6: Delete a Post

Delete the post:

```bash
curl -X DELETE "https://your-site.com/wp-json/fluent-community/v2/posts/123" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

## Common Patterns

### Pagination

Fetch paginated results:

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/posts?page=2&per_page=20" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

### Filtering

Filter posts by space:

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/posts?space_id=5" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

### Sorting

Sort posts by date:

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/posts?orderby=created_at&order=desc" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

### Including Related Data

Include author information:

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/posts?include=author" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

## Error Handling

Always handle errors in your API requests:

```javascript
fetch('https://your-site.com/wp-json/fluent-community/v2/posts', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${credentials}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## Testing with Postman

1. **Import Collection**: Download our [Postman Collection](./postman-collection.json)
2. **Set Variables**: Configure your base URL and credentials
3. **Test Endpoints**: Try different API endpoints
4. **Save Requests**: Build your own collection

## Next Steps

Now that you've made your first API requests, explore:

- [Posts API](./posts.md) - Complete posts documentation
- [Users API](./users.md) - User management
- [Spaces API](./spaces.md) - Community spaces
- [Comments API](./comments.md) - Comments and replies
- [Error Handling](./errors.md) - Handle errors properly

## Troubleshooting

### 401 Unauthorized Error

- Verify your credentials are correct
- Check that application passwords are enabled
- Ensure you're using the correct authentication method

### 404 Not Found Error

- Verify the API endpoint URL is correct
- Check that Fluent Community is installed and activated
- Ensure permalinks are set up correctly

### CORS Errors

- Configure CORS headers on your server
- Use a proxy for development
- Check WordPress CORS settings

## Need Help?

- Check the [Authentication Guide](./authentication.md)
- Review [Error Codes](./errors.md)
- See [Code Examples](./examples.md)

