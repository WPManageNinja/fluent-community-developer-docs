# Error Handling

Understanding and handling errors properly is crucial for building robust applications with the Fluent Community REST API.

## Error Response Format

All API errors follow a consistent format:

```json
{
  "code": "error_code",
  "message": "Human-readable error message",
  "data": {
    "status": 400,
    "errors": {
      "field_name": "Field-specific error message"
    }
  }
}
```

### Error Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Machine-readable error code |
| `message` | string | Human-readable error message |
| `data.status` | integer | HTTP status code |
| `data.errors` | object | Field-specific validation errors (optional) |

---

## HTTP Status Codes

### 2xx Success

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request successful, no content to return |

### 4xx Client Errors

| Code | Status | Description |
|------|--------|-------------|
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |

### 5xx Server Errors

| Code | Status | Description |
|------|--------|-------------|
| 500 | Internal Server Error | Server error occurred |
| 503 | Service Unavailable | Service temporarily unavailable |

---

## Common Error Codes

### Authentication Errors

#### `rest_not_logged_in`

User is not authenticated.

```json
{
  "code": "rest_not_logged_in",
  "message": "You are not currently logged in.",
  "data": {
    "status": 401
  }
}
```

**Solution**: Provide valid authentication credentials.

---

#### `rest_forbidden`

User lacks required permissions.

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to do that.",
  "data": {
    "status": 403
  }
}
```

**Solution**: Ensure the user has the required capabilities.

---

#### `invalid_token`

Authentication token is invalid or expired.

```json
{
  "code": "invalid_token",
  "message": "Invalid or expired authentication token.",
  "data": {
    "status": 401
  }
}
```

**Solution**: Refresh or obtain a new authentication token.

---

### Resource Errors

#### `post_not_found`

Requested post does not exist.

```json
{
  "code": "post_not_found",
  "message": "Post not found.",
  "data": {
    "status": 404
  }
}
```

**Solution**: Verify the post ID is correct.

---

#### `user_not_found`

Requested user does not exist.

```json
{
  "code": "user_not_found",
  "message": "User not found.",
  "data": {
    "status": 404
  }
}
```

**Solution**: Verify the user ID is correct.

---

#### `space_not_found`

Requested space does not exist.

```json
{
  "code": "space_not_found",
  "message": "Space not found.",
  "data": {
    "status": 404
  }
}
```

**Solution**: Verify the space ID is correct.

---

### Validation Errors

#### `invalid_data`

Request data failed validation.

```json
{
  "code": "invalid_data",
  "message": "Invalid data provided.",
  "data": {
    "status": 400,
    "errors": {
      "title": "Title is required",
      "content": "Content must be at least 10 characters",
      "space_id": "Invalid space ID"
    }
  }
}
```

**Solution**: Fix the validation errors and retry.

---

#### `missing_required_field`

Required field is missing.

```json
{
  "code": "missing_required_field",
  "message": "Required field is missing.",
  "data": {
    "status": 400,
    "field": "content"
  }
}
```

**Solution**: Include all required fields in the request.

---

### Rate Limiting Errors

#### `rate_limit_exceeded`

Too many requests in a short time.

```json
{
  "code": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Please try again later.",
  "data": {
    "status": 429,
    "retry_after": 60
  }
}
```

**Solution**: Wait for the specified time before retrying.

---

### File Upload Errors

#### `invalid_file_type`

Uploaded file type is not allowed.

```json
{
  "code": "invalid_file_type",
  "message": "File type not allowed.",
  "data": {
    "status": 400,
    "allowed_types": ["image/jpeg", "image/png", "image/gif"]
  }
}
```

**Solution**: Upload a file with an allowed type.

---

#### `file_too_large`

Uploaded file exceeds size limit.

```json
{
  "code": "file_too_large",
  "message": "File size exceeds the maximum allowed size.",
  "data": {
    "status": 413,
    "max_size": "5MB",
    "file_size": "7MB"
  }
}
```

**Solution**: Reduce file size or compress before uploading.

---

## Error Handling Best Practices

### 1. Always Check Response Status

```javascript
fetch('https://your-site.com/wp-json/fluent-community/v1/posts', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
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

---

### 2. Handle Specific Error Codes

```javascript
fetch('https://your-site.com/wp-json/fluent-community/v1/posts/123')
  .then(response => response.json())
  .then(data => {
    if (data.code) {
      // Handle error
      switch (data.code) {
        case 'post_not_found':
          console.error('Post not found');
          break;
        case 'rest_forbidden':
          console.error('Access denied');
          break;
        case 'rest_not_logged_in':
          console.error('Please log in');
          break;
        default:
          console.error('An error occurred:', data.message);
      }
    } else {
      // Handle success
      console.log('Post:', data.data);
    }
  });
```

---

### 3. Display User-Friendly Messages

```javascript
const errorMessages = {
  'rest_not_logged_in': 'Please log in to continue.',
  'rest_forbidden': 'You don\'t have permission to do that.',
  'post_not_found': 'The post you\'re looking for doesn\'t exist.',
  'invalid_data': 'Please check your input and try again.',
  'rate_limit_exceeded': 'Too many requests. Please wait a moment.'
};

function handleError(error) {
  const message = errorMessages[error.code] || error.message || 'An error occurred';
  alert(message);
}
```

---

### 4. Implement Retry Logic

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        // Rate limited, wait and retry
        const retryAfter = response.headers.get('Retry-After') || 60;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

---

### 5. Log Errors for Debugging

```javascript
function logError(error, context) {
  console.error('API Error:', {
    code: error.code,
    message: error.message,
    status: error.data?.status,
    context: context,
    timestamp: new Date().toISOString()
  });
  
  // Send to error tracking service
  // trackError(error);
}
```

---

## Validation Error Handling

When handling validation errors, display field-specific messages:

```javascript
function displayValidationErrors(errors) {
  Object.keys(errors).forEach(field => {
    const errorMessage = errors[field];
    const fieldElement = document.querySelector(`[name="${field}"]`);
    
    if (fieldElement) {
      // Display error next to field
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      fieldElement.parentNode.appendChild(errorDiv);
    }
  });
}

// Usage
fetch('https://your-site.com/wp-json/fluent-community/v1/posts', {
  method: 'POST',
  body: JSON.stringify(postData)
})
  .then(response => response.json())
  .then(data => {
    if (data.code === 'invalid_data' && data.data.errors) {
      displayValidationErrors(data.data.errors);
    }
  });
```

---

## Testing Error Scenarios

Test your error handling by simulating different error conditions:

```javascript
// Test 401 Unauthorized
fetch('/wp-json/fluent-community/v1/posts', {
  // No authentication
})

// Test 404 Not Found
fetch('/wp-json/fluent-community/v1/posts/999999')

// Test 400 Bad Request
fetch('/wp-json/fluent-community/v1/posts', {
  method: 'POST',
  body: JSON.stringify({}) // Missing required fields
})
```

---

## Need Help?

- [Getting Started Guide](./getting-started.md)
- [Authentication Guide](./authentication.md)
- [Code Examples](./examples.md)

