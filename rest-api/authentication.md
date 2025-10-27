# Authentication

The Fluent Community REST API supports multiple authentication methods to secure your API requests.

## Authentication Methods

### 1. WordPress Cookie Authentication

This method is used when making requests from the same site (e.g., from JavaScript in the WordPress admin or frontend).

**Requirements:**
- User must be logged into WordPress
- Include the WordPress nonce in the request header

**Example:**

```javascript
fetch('/wp-json/fluent-community/v1/posts', {
  method: 'GET',
  headers: {
    'X-WP-Nonce': wpApiSettings.nonce
  }
})
```

**Pros:**
- Simple for same-site requests
- No additional setup required

**Cons:**
- Only works for same-site requests
- Not suitable for external applications

---

### 2. Application Passwords

WordPress Application Passwords allow you to authenticate API requests without exposing your main password.

**Setup:**

1. Go to **Users → Profile** in WordPress admin
2. Scroll to **Application Passwords** section
3. Enter an application name and click **Add New Application Password**
4. Copy the generated password (you won't be able to see it again)

**Usage:**

Use HTTP Basic Authentication with your WordPress username and the application password:

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v1/posts" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

**JavaScript Example:**

```javascript
const username = 'your_username';
const appPassword = 'xxxx xxxx xxxx xxxx xxxx xxxx';
const credentials = btoa(`${username}:${appPassword}`);

fetch('https://your-site.com/wp-json/fluent-community/v1/posts', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${credentials}`
  }
})
```

**Pros:**
- Secure - doesn't expose main password
- Can be revoked anytime
- Works for external applications

**Cons:**
- Requires WordPress 5.6+
- Must be enabled on the site

---

### 3. JWT (JSON Web Tokens)

JWT authentication provides a token-based authentication system ideal for mobile apps and SPAs.

**Setup:**

Install and configure a JWT authentication plugin (e.g., JWT Authentication for WP REST API).

**Getting a Token:**

```bash
curl -X POST "https://your-site.com/wp-json/jwt-auth/v1/token" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'
```

**Response:**

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_email": "user@example.com",
  "user_nicename": "username",
  "user_display_name": "Display Name"
}
```

**Using the Token:**

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v1/posts" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

**JavaScript Example:**

```javascript
// Get token
const response = await fetch('https://your-site.com/wp-json/jwt-auth/v1/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'your_username',
    password: 'your_password'
  })
});

const { token } = await response.json();

// Use token for API requests
const posts = await fetch('https://your-site.com/wp-json/fluent-community/v1/posts', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**Pros:**
- Stateless authentication
- Ideal for mobile apps and SPAs
- Tokens can have expiration times

**Cons:**
- Requires additional plugin
- More complex setup

---

### 4. OAuth 2.0

OAuth 2.0 is recommended for third-party applications that need to access user data.

**Setup:**

Install and configure an OAuth 2.0 plugin for WordPress.

**Flow:**

1. Register your application to get Client ID and Client Secret
2. Redirect user to authorization URL
3. User grants permission
4. Receive authorization code
5. Exchange code for access token
6. Use access token for API requests

**Example Authorization URL:**

```
https://your-site.com/oauth/authorize?
  response_type=code&
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  scope=read write
```

**Pros:**
- Industry standard
- Secure for third-party apps
- Fine-grained permissions

**Cons:**
- Complex implementation
- Requires OAuth plugin

---

## Checking Authentication

You can verify your authentication by making a request to the current user endpoint:

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v1/auth/user" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response:**

```json
{
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "display_name": "Admin User",
    "roles": ["administrator"]
  }
}
```

## Authentication Errors

### 401 Unauthorized

```json
{
  "code": "rest_not_logged_in",
  "message": "You are not currently logged in.",
  "data": {
    "status": 401
  }
}
```

### 403 Forbidden

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to do that.",
  "data": {
    "status": 403
  }
}
```

## Best Practices

1. **Never expose credentials in client-side code**
2. **Use HTTPS** for all API requests
3. **Store tokens securely** (e.g., in environment variables)
4. **Implement token refresh** for long-lived applications
5. **Revoke unused application passwords** regularly
6. **Use appropriate authentication method** for your use case

## Security Considerations

- Always use HTTPS in production
- Implement rate limiting on authentication endpoints
- Use short-lived tokens when possible
- Monitor for suspicious authentication attempts
- Implement proper CORS policies

## Next Steps

- [Make your first API request](./getting-started.md)
- [Explore API resources](./index.md#api-resources)
- [Handle errors properly](./errors.md)

