#!/usr/bin/env python3
"""
Turn raw captured REST responses into publishable OpenAPI examples.

The dev site is a copy of production, so every captured payload may contain
real member data. This rewrites all identity and free-text fields to a stable
cast of fictional people and a fixed corpus of sample content, rewrites the
host, and trims long collections so the examples stay readable.

Usage: anonymize.py <captured-dir> <out-file.json>
"""

import json
import os
import re
import sys
import glob
import hashlib

# ---------------------------------------------------------------------------
# Fictional cast
# ---------------------------------------------------------------------------
PERSONAS = [
    ("Alex Rivera", "alex_rivera", "Community builder. Helping members get the most out of the platform."),
    ("Jordan Blake", "jordan_blake", "Product designer, occasional writer, full-time coffee drinker."),
    ("Sam Chen", "sam_chen", "Developer advocate. I write about APIs and automation."),
    ("Priya Nair", "priya_nair", "Course creator focused on practical, hands-on lessons."),
    ("Marcus Hale", "marcus_hale", "Moderator. Ask me about the community guidelines."),
    ("Elena Duarte", "elena_duarte", "Marketing lead. I share what works and what does not."),
    ("Tomas Novak", "tomas_novak", "Backend engineer. Long-time member, occasional lurker."),
    ("Aisha Bello", "aisha_bello", "Support specialist. Happy to help with onboarding questions."),
    ("Noah Fischer", "noah_fischer", "Freelancer building sites for small businesses."),
    ("Mei Tanaka", "mei_tanaka", "Designer and illustrator. I post work-in-progress shots."),
    ("Lucas Moreau", "lucas_moreau", "Agency owner. Interested in workflow automation."),
    ("Zara Ahmed", "zara_ahmed", "Content strategist and part-time course student."),
    ("Ivan Petrov", "ivan_petrov", "Systems administrator. I care about performance."),
    ("Grace Okafor", "grace_okafor", "Community manager. I run the weekly office hours."),
    ("Diego Santos", "diego_santos", "Product manager. I lurk more than I post."),
    ("Hannah Lindqvist", "hannah_lindqvist", "Educator. I build courses for non-technical teams."),
    ("Omar Haddad", "omar_haddad", "Consultant. I help teams migrate their communities."),
    ("Ruby Callahan", "ruby_callahan", "Front-end developer with a soft spot for CSS."),
    ("Kenji Watanabe", "kenji_watanabe", "Data analyst. I like dashboards a little too much."),
    ("Sofia Rossi", "sofia_rossi", "Founder. Building in public, learning in public."),
]

# Free-text replacements, keyed by a hash of the original so the same source
# string always maps to the same sample string.
POST_TITLES = [
    "Welcome to the community",
    "How we plan our release cycle",
    "Weekly office hours are back",
    "Three things I learned this month",
    "Share your workflow setup",
    "New tutorial: getting started with the API",
    "Feature request round-up",
    "Community guidelines refresh",
]

POST_BODIES = [
    "Welcome aboard! Introduce yourself in the comments and let us know what you are working on.",
    "We ship on a two-week cadence. Here is how we decide what makes the cut, and how you can influence it.",
    "Office hours run every Thursday. Bring your questions — no topic is too small.",
    "A short write-up of what worked, what did not, and what I would do differently next time.",
    "Post a screenshot of your setup. I am always curious how other people organise their work.",
    "A step-by-step walkthrough covering authentication, pagination, and error handling.",
    "Thanks for all the suggestions this month. Here is what we picked up and what we parked.",
    "We have tightened up a couple of the guidelines. Nothing dramatic — details inside.",
]

SPACE_DESCRIPTIONS = [
    "A place to introduce yourself and meet other members.",
    "Product announcements, release notes, and roadmap discussion.",
    "Questions, answers, and troubleshooting help from the community.",
    "Share what you are building and get feedback from other members.",
]

COMMENT_BODIES = [
    "This is really helpful, thanks for writing it up.",
    "Great point — I ran into the same thing last week.",
    "Following. I would love to see a worked example of this.",
    "Just tried it and it works exactly as described.",
]

# Content authored by the capture harness itself is already fictional and
# describes the endpoint well, so it is preserved verbatim.
SANDBOX_LITERALS = {
    'Docs Sandbox Space', 'Docs Sandbox Group', 'Docs Sandbox Course',
    'Docs Sandbox Topic', 'Docs Sandbox Link', 'Docs Sandbox Webhook',
    'Docs Scratch Space', 'Docs Scratch Space Two', 'Docs Scratch Course',
    'Docs Scratch Group', 'Docs Scratch Topic', 'Scratch Section',
    'Getting Started', 'Getting Started (updated)', 'Advanced Topics',
    'Welcome to the course', 'Scratch Lesson', 'Movable Lesson',
    'Sample announcement post', 'Sample announcement post (updated)',
    'Scratch post', 'Second scratch post', 'Feature poll',
    'Upcoming announcement', 'Which feature should we build next?',
    'Better search', 'Dark mode', 'Mobile app',
    'Community handbook', 'Space guidelines', 'Course syllabus',
    'Members only', 'Enrol to continue', 'Enrol now', 'Join now',
    'Temporary space used to capture API documentation samples.',
    'Temporary space used to capture API documentation samples (updated).',
    'Temporary space group used to capture API documentation samples.',
    'Temporary space group (updated).',
    'Temporary course used to capture API documentation samples.',
    'Temporary course used to capture API documentation samples (updated).',
    'Temporary topic for documentation samples.',
    'Second sandbox course used for duplicate and delete samples.',
    'Introductory module.',
    'Join this space to see the discussions.',
    'This course is available to enrolled students.',
    'Start with the first lesson.',
    'Sample moderation report created for the API docs.',
    'Join our sandbox space!',
}

# The harness names its throwaway rows "Docs Sandbox …"; published examples read
# better with ordinary community naming, so those literals are renamed on the way out.
SANDBOX_RENAMES = [
    ('Docs Sandbox Space', 'General Discussion'),
    ('Docs Scratch Space Two', 'Product Feedback'),
    ('Docs Scratch Space', 'Announcements'),
    ('Docs Sandbox Group', 'Community'),
    ('Docs Scratch Group', 'Resources'),
    ('Docs Sandbox Course', 'Getting Started with the Platform'),
    ('Docs Scratch Course', 'Advanced Workflows'),
    ('Docs Sandbox Topic', 'Product Updates'),
    ('Docs Scratch Topic', 'Tips and Tricks'),
    ('Docs Sandbox Link', 'Help Centre'),
    ('Docs Sandbox Webhook', 'CRM Sync'),
    ('docs-sandbox-space', 'general-discussion'),
    ('docs-scratch-space-2', 'product-feedback'),
    ('docs-scratch-space', 'announcements'),
    ('docs-sandbox-group', 'community'),
    ('docs-scratch-group', 'resources'),
    ('docs-sandbox-course', 'getting-started-with-the-platform'),
    ('docs-scratch-course', 'advanced-workflows'),
    ('docs-sandbox-topic', 'product-updates'),
    ('docs-scratch-topic', 'tips-and-tricks'),
    ('docs-sandbox-link', 'help-centre'),
    ('Temporary space used to capture API documentation samples.',
     'A place to introduce yourself and meet other members.'),
    ('Temporary space used to capture API documentation samples (updated).',
     'A place to introduce yourself and meet other members.'),
    ('Temporary space group used to capture API documentation samples.',
     'Spaces for everyday community conversation.'),
    ('Temporary space group (updated).', 'Spaces for everyday community conversation.'),
    ('Temporary course used to capture API documentation samples.',
     'Everything you need to get productive in your first week.'),
    ('Temporary course used to capture API documentation samples (updated).',
     'Everything you need to get productive in your first week.'),
    ('Temporary topic for documentation samples.', 'News and release notes.'),
    ('Second sandbox course used for duplicate and delete samples.',
     'Deeper patterns for teams already using the basics.'),
    ('Sample moderation report created for the API docs.',
     'This post looks like spam.'),
    ('Join our sandbox space!', 'Come and join the discussion.'),
    ('Scratch post', 'Roadmap update'),
    ('Second scratch post', 'Community poll results'),
    ('Scratch Section', 'Wrapping Up'),
    ('Scratch Lesson', 'Course Recap'),
    ('Movable Lesson', 'Next Steps'),
    ('Sample announcement post (updated)', 'Welcome to the community'),
    ('Sample announcement post', 'Welcome to the community'),
    ('sample-announcement-post', 'welcome-to-the-community'),
]

SITE_HOST = 'community.lab'
DOC_HOST = 'yourwebsite.com'
# Domains belonging to the install this was captured from, genericised for publication.
BRAND_HOSTS = ['wpmanageninja.com']
BRAND_NAMES = [
    ('WPManageNinja Community', 'Your Community'),
    ('WPManageNinja', 'Your Company'),
    ('wpmanageninja', 'your-company'),
]
AVATAR = 'https://{host}/wp-content/uploads/fluent-community/avatars/{slug}.png'

IDENTITY_NAME_KEYS = {'display_name', 'full_name', 'name', 'user_name', 'author_name'}
LOGIN_KEYS = {'user_login', 'user_nicename', 'login', 'nicename', 'slug_name'}
EMAIL_KEYS = {'user_email', 'email', 'author_email', 'invitee_email'}
AVATAR_KEYS = {'avatar', 'photo', 'user_avatar', 'author_avatar'}
BIO_KEYS = {'short_description', 'short_description_rendered', 'bio', 'about'}
TITLE_KEYS = {'title', 'post_title', 'heading'}
BODY_KEYS = {'message', 'message_rendered', 'content', 'post_content', 'excerpt',
             'description', 'description_rendered', 'explanation', 'note'}

# Usernames that are ordinary words would, once added to the redaction table,
# rewrite unrelated text ("admin" appearing as a badge slug, a role, a menu key).
GENERIC_USERNAMES = {
    'admin', 'administrator', 'user', 'users', 'test', 'tester', 'demo', 'guest',
    'support', 'team', 'info', 'hello', 'contact', 'staff', 'moderator', 'mod',
    'owner', 'member', 'members', 'editor', 'author', 'me', 'community', 'default',
}

# Values that vary run to run and add noise to a published example.
VOLATILE_NUMERIC_KEYS = {'execution_time', 'query_time', 'duration', 'elapsed'}

MAX_LIST_ITEMS = 3
MAX_STRING_CHARS = 400
MAX_DICT_KEYS = 24
# A dict keyed by slug/id whose values are all objects is a collection, not a
# settings blob — sample it like a list rather than printing every entry.
MAX_KEYED_COLLECTION = 2
KEYED_COLLECTION_MIN = 6
TRUNCATION_MARKER = '__truncated__'


def stable_pick(value, pool):
    h = hashlib.md5(str(value).encode('utf-8')).hexdigest()
    return pool[int(h[:8], 16) % len(pool)]


class Anonymiser:
    def __init__(self):
        self.by_username = {}
        self.order = []
        self.redactions = []   # (compiled regex, replacement) for known real identifiers
        self.real_names = {}   # real display name -> persona

    # -- pass 1 -------------------------------------------------------------
    def learn(self, node):
        if isinstance(node, dict):
            uname = node.get('username') or node.get('user_login')
            if isinstance(uname, str) and uname and uname not in self.by_username:
                idx = len(self.order)
                name, slug, bio = PERSONAS[idx % len(PERSONAS)]
                suffix = '' if idx < len(PERSONAS) else '_%d' % (idx // len(PERSONAS) + 1)
                persona = {
                    'name': name,
                    'username': slug + suffix,
                    'email': (slug + suffix).replace('_', '.') + '@example.com',
                    'bio': bio,
                    'avatar': AVATAR.format(host=DOC_HOST, slug=slug + suffix),
                }
                self.by_username[uname] = persona
                self.order.append(uname)
            if isinstance(uname, str) and uname in self.by_username:
                dn = node.get('display_name') or node.get('full_name') or node.get('name')
                if isinstance(dn, str) and len(dn) > 2:
                    self.real_names.setdefault(dn, self.by_username[uname])
            for v in node.values():
                self.learn(v)
        elif isinstance(node, list):
            for v in node:
                self.learn(v)

    def build_redactions(self):
        pairs = []
        for uname, persona in self.by_username.items():
            if len(uname) > 2 and uname.lower() not in GENERIC_USERNAMES:
                pairs.append((uname, persona['username'], False))
        for name, persona in self.real_names.items():
            pairs.append((name, persona['name'], False))
            for part in name.split():
                if len(part) > 3 and part[:1].isupper():
                    pairs.append((part, persona['name'].split()[0], True))
        # longest first so full names win over their parts
        pairs = [(p[0], p[1], p[2] if len(p) > 2 else False) for p in pairs]
        pairs.sort(key=lambda p: -len(p[0]))
        seen = set()
        for src, dst, case_sensitive in pairs:
            if src in seen or src.lower() == dst.lower():
                continue
            seen.add(src)
            flags = 0 if case_sensitive else re.IGNORECASE
            # \b alone would also rewrite a URL authority (https://<name>), which
            # produces nonsense hosts, so only the scheme position is excluded.
            pattern = re.compile(r'(?<!://)\b%s\b' % re.escape(src), flags)
            self.redactions.append((pattern, dst))

    def redact_known(self, value):
        if not isinstance(value, str) or not value:
            return value
        for pattern, replacement in self.redactions:
            value = pattern.sub(replacement, value)
        return value

    def persona_for(self, node):
        if not isinstance(node, dict):
            return None
        uname = node.get('username') or node.get('user_login')
        if isinstance(uname, str) and uname in self.by_username:
            return self.by_username[uname]
        return None

    # -- pass 2 -------------------------------------------------------------
    def scrub_text(self, key, value):
        if not isinstance(value, str) or not value.strip():
            return value
        if value in SANDBOX_LITERALS:
            return self.rewrite_urls(value)

        if key in TITLE_KEYS:
            if len(value) < 3 or value.lower() in ('yes', 'no'):
                return value
            return stable_pick(value, POST_TITLES)
        if key in BODY_KEYS:
            if len(value) < 3:
                return value
            if key.startswith('description'):
                out = stable_pick(value, SPACE_DESCRIPTIONS)
            elif len(value) < 120:
                out = stable_pick(value, COMMENT_BODIES)
            else:
                out = stable_pick(value, POST_BODIES)
            if key.endswith('_rendered'):
                out = '<p>%s</p>' % out
            return out
        return self.rewrite_urls(value)

    def rewrite_urls(self, value):
        if not isinstance(value, str):
            return value
        for src, dst in SANDBOX_RENAMES:
            if src in value:
                value = value.replace(src, dst)
        value = value.replace('cdn.' + SITE_HOST, 'cdn.' + DOC_HOST)
        value = value.replace(SITE_HOST, DOC_HOST)
        for host in BRAND_HOSTS:
            value = value.replace(host, 'example.com')
        for brand, generic in BRAND_NAMES:
            value = value.replace(brand, generic)
        value = value.replace('wpmn_community/', 'uploads/')
        value = re.sub(r'fluentcom-[0-9a-f]{8,}-fluentcom-', '', value)
        value = re.sub(r'https://secure\.gravatar\.com/avatar/[^"\s]+',
                       'https://%s/wp-content/uploads/fluent-community/avatars/member.png' % DOC_HOST,
                       value)
        return self.redact_known(value)

    def walk(self, node, persona=None, key=None):
        if isinstance(node, dict):
            local = self.persona_for(node) or persona
            items = list(node.items())
            trimmed = None
            if len(items) > MAX_DICT_KEYS and all(isinstance(v, str) for _, v in items):
                trimmed = len(items) - MAX_DICT_KEYS
                items = items[:MAX_DICT_KEYS]
            elif len(items) >= KEYED_COLLECTION_MIN and all(
                isinstance(v, dict) and v for _, v in items
            ):
                trimmed = len(items) - MAX_KEYED_COLLECTION
                items = items[:MAX_KEYED_COLLECTION]
            out = {}
            for k, v in items:
                ok = self.rewrite_urls(k) if isinstance(k, str) else k
                out[ok] = self.field(k, v, local)
            if trimmed:
                out[TRUNCATION_MARKER] = '%d further keys omitted from this sample' % trimmed
            return out
        if isinstance(node, list):
            trimmed = node[:MAX_LIST_ITEMS]
            return [self.field(key, v, persona) if not isinstance(v, (dict, list))
                    else self.walk(v, persona, key)
                    for v in trimmed]
        if isinstance(node, str):
            return self.field(key, node, persona)
        return node

    def field(self, k, v, persona):
        if isinstance(v, (dict, list)):
            if k == 'social_links' and isinstance(v, dict) and persona:
                handle = persona['username'].replace('_', '')
                return {sk: (handle if isinstance(sv, str) and sv.strip() else sv)
                        for sk, sv in v.items()}
            return self.walk(v, persona, k)

        if isinstance(v, float) and k in VOLATILE_NUMERIC_KEYS:
            return round(v, 3)

        if not isinstance(v, str):
            return v

        if persona:
            if k == 'username' or k in LOGIN_KEYS:
                return persona['username']
            if k in IDENTITY_NAME_KEYS and not k.endswith('_id'):
                return persona['name']
            if k in EMAIL_KEYS:
                return persona['email']
            if k in AVATAR_KEYS:
                return persona['avatar']
            if k in BIO_KEYS:
                out = persona['bio']
                return '<p>%s</p>' % out if k.endswith('_rendered') else out
            if k == 'permalink' and '/u/' in v:
                return 'https://%s/portal/u/%s' % (DOC_HOST, persona['username'])

        if k in EMAIL_KEYS:
            return 'member@example.com'
        if k in AVATAR_KEYS:
            return AVATAR.format(host=DOC_HOST, slug='member')
        if k == 'cover_photo' and v.strip():
            return 'https://%s/wp-content/uploads/fluent-community/covers/cover.jpg' % DOC_HOST
        if k in ('website', 'user_url', 'site_url', 'blog_url') and v.strip():
            return 'https://example.com'
        if k in IDENTITY_NAME_KEYS and re.match(r'^[A-Z][a-z]+ [A-Z]', v or ''):
            return stable_pick(v, [p[0] for p in PERSONAS])
        if k == 'username' or k in LOGIN_KEYS:
            return stable_pick(v, [p[1] for p in PERSONAS])
        if '@' in v and re.search(r'[\w.+-]+@[\w-]+\.[\w.]+', v):
            v = re.sub(r'[\w.+-]+@[\w-]+\.[\w.]+', 'member@example.com', v)

        return self.truncate(self.scrub_text(k, v))

    @staticmethod
    def truncate(value):
        if isinstance(value, str) and len(value) > MAX_STRING_CHARS:
            return value[:MAX_STRING_CHARS].rstrip() + ' …'
        return value


def main():
    src, dest = sys.argv[1], sys.argv[2]
    files = sorted(f for f in glob.glob(os.path.join(src, '**', '*.json'), recursive=True)
                   if '_failures' not in f and not f.endswith('_log.json'))

    raw = []
    for f in files:
        rel = os.path.relpath(f, src)[:-5]
        module, slug = rel.split(os.sep, 1)
        if slug.startswith('_'):
            continue
        raw.append((module, slug, json.load(open(f))))

    an = Anonymiser()
    for _, _, rec in raw:
        an.learn(rec.get('response'))
    an.build_redactions()

    out = {}
    for module, slug, rec in raw:
        status = rec.get('status')
        if not isinstance(status, int) or status < 200 or status >= 300:
            continue
        entry = {
            'method': rec['method'],
            'path': an.rewrite_urls(rec['path']),
            'status': status,
            'response': an.walk(rec.get('response')),
        }
        if rec.get('requestBody'):
            entry['request'] = an.walk(rec['requestBody'])
        if rec.get('query') and rec['query'] != {}:
            entry['query'] = an.walk(rec['query'])
        out.setdefault(module, {})[slug] = entry

    payload = {
        '_comment': (
            'Real REST responses captured from a live FluentCommunity install and '
            'anonymised. Regenerate with dev-docs-repo/scripts/capture/ — do not hand-edit.'
        ),
        'modules': out,
    }
    with open(dest, 'w') as fh:
        json.dump(payload, fh, indent=2, ensure_ascii=False, sort_keys=True)
        fh.write('\n')

    total = sum(len(v) for v in out.values())
    print('wrote %d examples across %d modules -> %s' % (total, len(out), dest))
    print('distinct identities remapped: %d' % len(an.by_username))


if __name__ == '__main__':
    main()
