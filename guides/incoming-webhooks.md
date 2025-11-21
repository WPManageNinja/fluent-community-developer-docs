<DocStatusBanner />

# Incoming Webhooks ​

## Introduction ​

Incoming Webhooks allow you to integrate external applications with Fluent Community by automatically creating users and managing their space/course memberships. This is perfect for connecting your community with external systems like CRMs, payment processors, or custom applications.

::: tip Use Cases
- Automatically add users to spaces when they purchase a product
- Sync user memberships from external systems
- Create community accounts from form submissions
- Integrate with third-party platforms (Zapier, Make, etc.)
:::

---

## How Incoming Webhooks Work ​

When an external application sends a POST request to your webhook URL:

1. **User Lookup:** Fluent Community checks if a user with the provided email exists
2. **User Creation:** If the user doesn't exist, a new WordPress user is created
3. **Space Management:** User is added to or removed from specified spaces
4. **Course Management:** User is enrolled in or removed from specified courses
5. **Welcome Email:** Optionally sends WordPress default welcome email

---

## Creating an Incoming Webhook ​

### Step 1: Access Webhook Settings ​

1. Go to your FluentCommunity admin panel
2. Navigate to **Settings → Incoming Webhooks**
3. Click **"Add New Webhook"**

### Step 2: Configure Webhook ​

**Webhook Name:**
- Give it a descriptive name (e.g., "Product Purchase Integration")
- This is for your reference only

**Add to Spaces:**
- Select spaces to add the user to when webhook is triggered
- Multiple spaces can be selected
- User will be added as a member

**Remove from Spaces:**
- Select spaces to remove the user from
- Useful for downgrade scenarios
- User will be removed as a member

**Add to Courses:**
- Select courses to enroll the user in
- Multiple courses can be selected
- User will be enrolled automatically

**Remove from Courses:**
- Select courses to unenroll the user from
- Useful for access revocation
- User will be removed from course

**Send Welcome Email:**
- Check this to send WordPress default welcome email
- Only applies to newly created users
- Existing users won't receive the email

### Step 3: Save and Get URL ​

1. Click **"Save"**
2. Copy the generated webhook URL
3. **⚠️ Treat this URL as a password** - anyone with this URL can create users and manage memberships

::: danger Security Warning
Keep your webhook URL secret! Anyone with access to this URL can create users and modify memberships in your community.
:::

---

## Sending Requests to Webhook ​

### Request Format ​

**Method:** `POST`  
**Content-Type:** `multipart/form-data` or `application/x-www-form-urlencoded`  
**URL:** Your webhook URL from Step 3

### Required Fields ​

| Field | Required | Description |
|-------|----------|-------------|
| `email` | ✅ Yes | User's email address |
| `first_name` | ❌ No | User's first name (new users only) |
| `last_name` | ❌ No | User's last name (new users only) |
| `user_login` | ❌ No | Username (new users only) |
| `user_pass` | ❌ No | Password (new users only) |

::: tip
Only `email` is required. Other fields are optional and only used when creating new users.
:::

---

## Example Requests ​

### Using cURL ​

**Basic Request (Email Only):**
```bash
curl --request POST \
  --url 'https://yourdomain.com/wp-json/fluent-community/v2/webhook/abc123...' \
  --header 'Content-Type: multipart/form-data' \
  --form email=user@example.com
```

**Complete Request (All Fields):**
```bash
curl --request POST \
  --url 'https://yourdomain.com/wp-json/fluent-community/v2/webhook/abc123...' \
  --header 'Content-Type: multipart/form-data' \
  --form email=user@example.com \
  --form first_name=John \
  --form last_name=Doe \
  --form user_login=johndoe \
  --form user_pass=SecurePassword123
```

---

### Using PHP ​

```php
$webhookUrl = 'https://yourdomain.com/wp-json/fluent-community/v2/webhook/abc123...';

$data = [
    'email'      => 'user@example.com',
    'first_name' => 'John',
    'last_name'  => 'Doe',
    'user_login' => 'johndoe',
    'user_pass'  => 'SecurePassword123'
];

$response = wp_remote_post($webhookUrl, [
    'body' => $data
]);

if (is_wp_error($response)) {
    // Handle error
    error_log('Webhook failed: ' . $response->get_error_message());
} else {
    // Success
    $body = wp_remote_retrieve_body($response);
    $result = json_decode($body, true);
}
```

---

### Using JavaScript (Node.js) ​

```javascript
const axios = require('axios');
const FormData = require('form-data');

const webhookUrl = 'https://yourdomain.com/wp-json/fluent-community/v2/webhook/abc123...';

const formData = new FormData();
formData.append('email', 'user@example.com');
formData.append('first_name', 'John');
formData.append('last_name', 'Doe');
formData.append('user_login', 'johndoe');
formData.append('user_pass', 'SecurePassword123');

axios.post(webhookUrl, formData, {
    headers: formData.getHeaders()
})
.then(response => {
    console.log('Success:', response.data);
})
.catch(error => {
    console.error('Error:', error.response.data);
});
```

---

### Using Python ​

```python
import requests

webhook_url = 'https://yourdomain.com/wp-json/fluent-community/v2/webhook/abc123...'

data = {
    'email': 'user@example.com',
    'first_name': 'John',
    'last_name': 'Doe',
    'user_login': 'johndoe',
    'user_pass': 'SecurePassword123'
}

response = requests.post(webhook_url, data=data)

if response.status_code == 200:
    print('Success:', response.json())
else:
    print('Error:', response.text)
```

---

## Response Format ​

### Success Response ​

**Status Code:** `200 OK`

```json
{
    "success": true,
    "message": "User created and added to spaces/courses successfully",
    "user_id": 123
}
```

### Error Response ​

**Status Code:** `400 Bad Request` or `500 Internal Server Error`

```json
{
    "success": false,
    "message": "Error description here"
}
```

---

## User Behavior ​

### New User ​

When the email doesn't exist in WordPress:

1. ✅ New WordPress user is created
2. ✅ Uses provided `first_name`, `last_name`, `user_login`, `user_pass`
3. ✅ If `user_login` not provided, generated from email
4. ✅ If `user_pass` not provided, random password generated
5. ✅ User added to specified spaces
6. ✅ User enrolled in specified courses
7. ✅ Welcome email sent (if enabled)

### Existing User ​

When the email already exists in WordPress:

1. ✅ Existing user is used
2. ❌ `first_name`, `last_name`, `user_login`, `user_pass` are **ignored**
3. ✅ User added to specified spaces (if not already a member)
4. ✅ User enrolled in specified courses (if not already enrolled)
5. ✅ User removed from specified spaces (if configured)
6. ✅ User removed from specified courses (if configured)
7. ❌ No welcome email sent

---

## Common Use Cases ​

### 1. E-commerce Integration ​

**Scenario:** Add users to premium space when they purchase a product

**Setup:**
1. Create webhook with "Premium Members" space in "Add to Spaces"
2. Configure your e-commerce platform to send webhook on purchase
3. Send user's email in webhook payload

**Example (WooCommerce):**
```php
add_action('woocommerce_order_status_completed', function($order_id) {
    $order = wc_get_order($order_id);
    $email = $order->get_billing_email();
    
    $webhookUrl = 'https://yourdomain.com/wp-json/fluent-community/v2/webhook/abc123...';
    
    wp_remote_post($webhookUrl, [
        'body' => ['email' => $email]
    ]);
});
```

---

### 2. Membership Downgrade ​

**Scenario:** Remove users from premium space when subscription expires

**Setup:**
1. Create webhook with "Premium Members" space in "Remove from Spaces"
2. Configure your membership plugin to send webhook on cancellation
3. Send user's email in webhook payload

---

### 3. Course Enrollment ​

**Scenario:** Enroll users in course when they complete a form

**Setup:**
1. Create webhook with course in "Add to Courses"
2. Configure your form plugin to send webhook on submission
3. Send user's email and details in webhook payload

---

### 4. Zapier Integration ​

**Scenario:** Connect any Zapier-supported app to Fluent Community

**Setup:**
1. Create webhook in Fluent Community
2. In Zapier, create a Zap with "Webhooks by Zapier" action
3. Configure POST request with webhook URL
4. Map fields from trigger app to webhook payload

---

### 5. Make (Integromat) Integration ​

**Scenario:** Automate user management from any Make-supported service

**Setup:**
1. Create webhook in Fluent Community
2. In Make, add "HTTP" module with "Make a request" action
3. Set method to POST and URL to webhook URL
4. Map data from previous modules to form fields

---

## Security Best Practices ​

### 1. Keep Webhook URL Secret ​

- ❌ Don't commit webhook URLs to version control
- ❌ Don't share webhook URLs publicly
- ✅ Store webhook URLs in environment variables
- ✅ Rotate webhook URLs if compromised

### 2. Validate Requests ​

If you need additional security, use filters to validate requests:

```php
add_filter('fluent_community/incoming_webhook_validation', function($isValid, $data, $webhook) {
    // Add custom validation logic
    // For example, check IP address or custom token
    
    $allowedIPs = ['123.456.789.0', '98.765.432.1'];
    $clientIP = $_SERVER['REMOTE_ADDR'];
    
    if (!in_array($clientIP, $allowedIPs)) {
        return false;
    }
    
    return $isValid;
}, 10, 3);
```

### 3. Monitor Webhook Activity ​

Regularly check webhook logs to detect unusual activity:

1. Go to **Settings → Incoming Webhooks**
2. Click on webhook name
3. Review recent activity

### 4. Use HTTPS Only ​

Always use HTTPS for webhook URLs to encrypt data in transit.

---

## Troubleshooting ​

### Webhook Not Working ​

**Check:**
1. ✅ Webhook URL is correct
2. ✅ Request method is POST
3. ✅ Content-Type header is set
4. ✅ Email field is included in payload
5. ✅ Server can reach your WordPress site

### User Not Created ​

**Possible Causes:**
- Email already exists (user will be updated instead)
- Invalid email format
- WordPress user creation disabled
- Insufficient permissions

### User Not Added to Space/Course ​

**Possible Causes:**
- Space/course doesn't exist
- Space/course is private and requires approval
- User already a member
- Insufficient permissions

### Welcome Email Not Sent ​

**Possible Causes:**
- User already exists (welcome email only for new users)
- "Send Welcome Email" option not enabled
- WordPress email not configured properly
- Email blocked by spam filter

---

## Advanced Customization ​

### Modify Webhook Behavior ​

```php
// Customize user creation
add_filter('fluent_community/incoming_webhook_user_data', function($userData, $payload, $webhook) {
    // Add custom user meta
    $userData['meta_input'] = [
        'custom_field' => $payload['custom_value'] ?? ''
    ];
    
    return $userData;
}, 10, 3);

// After webhook processed
add_action('fluent_community/incoming_webhook_processed', function($user, $webhook, $payload) {
    // Custom logic after webhook is processed
    // For example, send custom notification
    
    do_action('my_custom_webhook_notification', $user->ID);
}, 10, 3);
```

---

## Related Documentation ​

- [Code Snippets](/guides/code-snippets.md) - More integration examples
- [Filter Hooks](/hooks/filters/) - Customize webhook behavior
- [REST API](/rest-api/) - Alternative integration method

