# Code Examples

Practical code examples for common tasks using the Fluent Community REST API.

## Table of Contents

- [JavaScript Examples](#javascript-examples)
- [Python Examples](#python-examples)
- [PHP Examples](#php-examples)
- [cURL Examples](#curl-examples)

---

## JavaScript Examples

### Fetch Posts with Pagination

```javascript
async function fetchPosts(page = 1, perPage = 20) {
  const response = await fetch(
    `https://your-site.com/wp-json/fluent-community/v2/posts?page=${page}&per_page=${perPage}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  const data = await response.json();
  return data;
}

// Usage
fetchPosts(1, 10).then(result => {
  console.log('Posts:', result.data);
  console.log('Total:', result.meta.total);
});
```

---

### Create a Post

```javascript
async function createPost(postData) {
  const response = await fetch(
    'https://your-site.com/wp-json/fluent-community/v2/posts',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return await response.json();
}

// Usage
createPost({
  title: 'My New Post',
  content: 'This is the content',
  space_id: 5
})
  .then(result => console.log('Created:', result.data))
  .catch(error => console.error('Error:', error));
```

---

### Add a Comment

```javascript
async function addComment(postId, content) {
  const response = await fetch(
    'https://your-site.com/wp-json/fluent-community/v2/comments',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id: postId,
        content: content
      })
    }
  );
  
  return await response.json();
}

// Usage
addComment(123, 'Great post!')
  .then(result => console.log('Comment added:', result.data));
```

---

### React Hook Example

```javascript
import { useState, useEffect } from 'react';

function usePosts(spaceId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://your-site.com/wp-json/fluent-community/v2/posts?space_id=${spaceId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        const data = await response.json();
        setPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, [spaceId]);
  
  return { posts, loading, error };
}

// Usage in component
function PostsList({ spaceId }) {
  const { posts, loading, error } = usePosts(spaceId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

---

## Python Examples

### Fetch Posts

```python
import requests
from requests.auth import HTTPBasicAuth

def fetch_posts(base_url, username, app_password, space_id=None):
    url = f"{base_url}/wp-json/fluent-community/v2/posts"
    params = {}
    
    if space_id:
        params['space_id'] = space_id
    
    response = requests.get(
        url,
        params=params,
        auth=HTTPBasicAuth(username, app_password)
    )
    
    response.raise_for_status()
    return response.json()

# Usage
posts = fetch_posts(
    'https://your-site.com',
    'your_username',
    'xxxx xxxx xxxx xxxx',
    space_id=5
)

print(f"Found {len(posts['data'])} posts")
```

---

### Create a Post

```python
import requests
from requests.auth import HTTPBasicAuth

def create_post(base_url, username, app_password, post_data):
    url = f"{base_url}/wp-json/fluent-community/v2/posts"
    
    response = requests.post(
        url,
        json=post_data,
        auth=HTTPBasicAuth(username, app_password)
    )
    
    response.raise_for_status()
    return response.json()

# Usage
new_post = create_post(
    'https://your-site.com',
    'your_username',
    'xxxx xxxx xxxx xxxx',
    {
        'title': 'My Python Post',
        'content': 'Created via Python',
        'space_id': 5
    }
)

print(f"Created post ID: {new_post['data']['id']}")
```

---

### Upload Media

```python
import requests
from requests.auth import HTTPBasicAuth

def upload_media(base_url, username, app_password, file_path):
    url = f"{base_url}/wp-json/fluent-community/v2/media"
    
    with open(file_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(
            url,
            files=files,
            auth=HTTPBasicAuth(username, app_password)
        )
    
    response.raise_for_status()
    return response.json()

# Usage
media = upload_media(
    'https://your-site.com',
    'your_username',
    'xxxx xxxx xxxx xxxx',
    '/path/to/image.jpg'
)

print(f"Uploaded: {media['data']['url']}")
```

---

### Python Class Wrapper

```python
import requests
from requests.auth import HTTPBasicAuth

class FluentCommunityAPI:
    def __init__(self, base_url, username, app_password):
        self.base_url = base_url
        self.auth = HTTPBasicAuth(username, app_password)
        self.api_base = f"{base_url}/wp-json/fluent-community/v1"
    
    def _request(self, method, endpoint, **kwargs):
        url = f"{self.api_base}/{endpoint}"
        response = requests.request(method, url, auth=self.auth, **kwargs)
        response.raise_for_status()
        return response.json()
    
    def get_posts(self, **params):
        return self._request('GET', 'posts', params=params)
    
    def create_post(self, post_data):
        return self._request('POST', 'posts', json=post_data)
    
    def get_post(self, post_id):
        return self._request('GET', f'posts/{post_id}')
    
    def update_post(self, post_id, post_data):
        return self._request('PUT', f'posts/{post_id}', json=post_data)
    
    def delete_post(self, post_id):
        return self._request('DELETE', f'posts/{post_id}')

# Usage
api = FluentCommunityAPI(
    'https://your-site.com',
    'your_username',
    'xxxx xxxx xxxx xxxx'
)

posts = api.get_posts(space_id=5, per_page=10)
print(posts)
```

---

## PHP Examples

### Fetch Posts

```php
<?php
function fetch_posts($base_url, $username, $app_password, $space_id = null) {
    $url = $base_url . '/wp-json/fluent-community/v2/posts';
    
    if ($space_id) {
        $url .= '?space_id=' . $space_id;
    }
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$app_password");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code !== 200) {
        throw new Exception("API request failed with code: $http_code");
    }
    
    return json_decode($response, true);
}

// Usage
$posts = fetch_posts(
    'https://your-site.com',
    'your_username',
    'xxxx xxxx xxxx xxxx',
    5
);

echo "Found " . count($posts['data']) . " posts\n";
?>
```

---

### Create a Post

```php
<?php
function create_post($base_url, $username, $app_password, $post_data) {
    $url = $base_url . '/wp-json/fluent-community/v2/posts';
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$app_password");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data));
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Usage
$new_post = create_post(
    'https://your-site.com',
    'your_username',
    'xxxx xxxx xxxx xxxx',
    [
        'title' => 'My PHP Post',
        'content' => 'Created via PHP',
        'space_id' => 5
    ]
);

echo "Created post ID: " . $new_post['data']['id'] . "\n";
?>
```

---

## cURL Examples

### Get Posts

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/posts?space_id=5&per_page=10" \
  --user "username:xxxx xxxx xxxx xxxx"
```

---

### Create Post

```bash
curl -X POST "https://your-site.com/wp-json/fluent-community/v2/posts" \
  --user "username:xxxx xxxx xxxx xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "content": "Post content here",
    "space_id": 5
  }'
```

---

### Update Post

```bash
curl -X PUT "https://your-site.com/wp-json/fluent-community/v2/posts/123" \
  --user "username:xxxx xxxx xxxx xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'
```

---

### Delete Post

```bash
curl -X DELETE "https://your-site.com/wp-json/fluent-community/v2/posts/123" \
  --user "username:xxxx xxxx xxxx xxxx"
```

---

### Upload Media

```bash
curl -X POST "https://your-site.com/wp-json/fluent-community/v2/media" \
  --user "username:xxxx xxxx xxxx xxxx" \
  -F "file=@/path/to/image.jpg" \
  -F "title=My Image"
```

---

## More Examples

For more examples and use cases, check out:

- [Getting Started Guide](./getting-started.md)
- [Authentication Guide](./authentication.md)
- [Error Handling](./errors.md)

