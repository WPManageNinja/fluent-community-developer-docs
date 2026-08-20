# REST response capture harness

`generate-docs.mjs` used to synthesise every API sample from static analysis, which
produced correct field names but empty values (`""`, `0`, `null`). This harness
records **real** request/response pairs from a running FluentCommunity install,
anonymises them, and writes `data/response-examples.json`, which the generator then
uses as both the OpenAPI example *and* the source of the response schema
(`schemaFromExample()`), so one recording makes both accurate.

## Files

| File | Role |
| --- | --- |
| `capture.php` | Dispatch harness: sends internal REST requests, records each response to `captured/<module>/<slug>.json` |
| `capture-plan.php` | The ordered plan — builds a sandbox, walks every operation, tears it down |
| `teardown.php` | Removes every sandbox row (safe to run on its own) |
| `anonymize.py` | Turns `captured/` into the publishable `data/response-examples.json` |

## Running it

Requires WP-CLI and a FluentCommunity install with the Pro plugin active. **Point it
at a development site only** — the plan creates and deletes content.

```bash
cd /path/to/wordpress
wp eval-file .../scripts/capture/teardown.php          # clear any previous sandbox
FC_CAPTURE_OUT=/tmp/fc-capture wp eval-file .../scripts/capture/capture.php
python3 .../scripts/capture/anonymize.py /tmp/fc-capture \
        .../dev-docs-repo/data/response-examples.json
cd .../dev-docs-repo && npm run generate:docs
```

`FC_CAPTURE_ONLY=feeds/` limits a run to one module prefix while iterating.

The generator prints a provenance summary at the end, and lists any operation still
falling back to a statically inferred sample.

## How it works

**Sandbox.** The plan creates three fictional users, a space group, two spaces, a
course with sections and lessons (including a quiz), feeds, comments, a survey, a
topic, a webhook and a sidebar link. Destructive operations (`DELETE`, `remove`,
`leave`) run against dedicated scratch rows so nothing pre-existing is touched.
Settings endpoints are captured as a **read-then-write-the-same-value round trip**,
so `POST /settings/*` has a real response without changing any configuration.
`wp_mail()` is stubbed out for the whole run.

**Request isolation.** WPFluent binds its `Request` as a container singleton built
from `$_GET`/`$_POST`, and `Route::handle()` *merges* each `WP_REST_Request`'s params
into it. Across many dispatches in one PHP process that leaks parameters from earlier
calls into later ones — a course was silently created with a feed's title before this
was found. `fc_reset_framework_request()` in `capture.php` clears those buckets before
every dispatch. Do not remove it.

**Not captured.** Endpoints whose module is not installed (FluentCart paywalls,
BuddyPress migrations), that need a real multipart upload (`/feeds/media-upload`,
`/documents/upload`, `/fluent-player/video-upload`), or that would mutate licensing or
plugin state (`/admin/license`, `/settings/install_plugin`) are hand-authored in
`data/manual-examples.json` instead, and are labelled as reconstructed in the docs.

## Anonymisation

The reference install is a copy of production, so **nothing captured may be published
as-is**. `anonymize.py`:

- maps every distinct identity to a fixed fictional cast, keyed on username /
  `user_login`, so the same person stays the same person across all 231 samples;
- rewrites `display_name`, `username`, `user_login`, `user_nicename`, `user_email`,
  `avatar`, `photo`, `cover_photo`, `website`, `short_description` and social handles;
- replaces free text (`message`, `title`, `description`, `content`, …) from a fixed
  corpus, hashed on the original so repeats stay consistent;
- rewrites the site host to `yourwebsite.com` and third-party links to `example.com`;
- runs a final redaction pass over *every* string for any real name or username it
  learned, so identities cannot survive inside prose, URLs or dict keys;
- renames the harness's own `Docs Sandbox …` rows to ordinary community naming;
- trims collections to three items, strings to 400 characters, and wide flat maps
  (translation bundles) to 24 keys, so examples stay readable.

Two guards are deliberate and worth keeping: name-part redaction is **case-sensitive**
(so a member called "Shahjahan" is caught while the word `support` in a URL is not),
and redaction never fires straight after `://` (so a name cannot become a hostname).
Generic usernames (`admin`, `support`, `team`, …) are excluded from redaction entirely.

After any change, re-run the leak scan before committing:

```bash
grep -oiE 'realhost\.tld|realbrand|<a real member name>' data/response-examples.json
```
