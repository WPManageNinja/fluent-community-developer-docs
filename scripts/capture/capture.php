<?php
/**
 * FluentCommunity REST response capture harness.
 * Run with: wp eval-file capture.php
 *
 * Dispatches internal REST requests against the live dev site, creates a
 * throwaway sandbox for mutating endpoints, and writes every raw response
 * to captured/<module>/<slug>.json for later anonymisation.
 */

$OUT = getenv('FC_CAPTURE_OUT') ?: __DIR__ . '/captured';
$ONLY = getenv('FC_CAPTURE_ONLY') ?: '';

if (!is_dir($OUT)) {
    mkdir($OUT, 0777, true);
}

global $FC_CTX, $FC_LOG, $FC_OUT, $FC_ONLY;
$FC_CTX = [];
$FC_LOG = [];
$FC_OUT = $OUT;
$FC_ONLY = $ONLY;

wp_set_current_user(1);

// Never let the capture run send real mail from this dev copy.
add_filter('pre_wp_mail', '__return_true', 999);
add_filter('fluent_community/disable_email_notification', '__return_true', 999);

function fc_ctx($key, $default = null)
{
    global $FC_CTX;
    return isset($FC_CTX[$key]) ? $FC_CTX[$key] : $default;
}

function fc_set($key, $value)
{
    global $FC_CTX;
    $FC_CTX[$key] = $value;
}

/**
 * Replace {{key}} tokens from the shared context.
 */
function fc_interpolate($value)
{
    global $FC_CTX;
    if (is_array($value)) {
        foreach ($value as $k => $v) {
            $value[$k] = fc_interpolate($v);
        }
        return $value;
    }
    if (!is_string($value)) {
        return $value;
    }
    return preg_replace_callback('/\{\{(\w+)\}\}/', function ($m) use ($FC_CTX) {
        return isset($FC_CTX[$m[1]]) ? (string)$FC_CTX[$m[1]] : $m[0];
    }, $value);
}

/**
 * The WPFluent Request is a container singleton built once from $_GET/$_POST;
 * Route::handle() then *merges* each WP_REST_Request's params into it. Across
 * many dispatches in one PHP process that leaks parameters from earlier calls
 * into later ones, so reset its input buckets before every request.
 */
function fc_reset_framework_request()
{
    try {
        $request = \FluentCommunity\App\App::make('request');
    } catch (\Throwable $e) {
        return;
    }
    if (!is_object($request)) {
        return;
    }
    $ref = new \ReflectionObject($request);
    foreach (['request', 'post', 'get', 'files'] as $prop) {
        if (!$ref->hasProperty($prop)) {
            continue;
        }
        $p = $ref->getProperty($prop);
        $p->setAccessible(true);
        $p->setValue($request, []);
    }
    $_GET = $_POST = $_REQUEST = [];
}

/**
 * Dispatch one REST request and persist the response.
 *
 * @param string $slug     module/operation-slug, matching the OpenAPI file name
 * @param string $method   HTTP verb
 * @param string $path     path below /fluent-community/v2, may contain {{tokens}}
 * @param array  $query    query args
 * @param array  $body     JSON body
 * @param array  $opts     ['as' => user id, 'save' => false, 'note' => string]
 */
function fc_cap($slug, $method, $path, $query = [], $body = [], $opts = [])
{
    global $FC_LOG, $FC_OUT, $FC_ONLY;

    if ($FC_ONLY && strpos($slug, $FC_ONLY) !== 0) {
        return null;
    }

    $path  = fc_interpolate($path);
    $query = fc_interpolate($query);
    $body  = fc_interpolate($body);

    if (strpos($path, '{{') !== false) {
        $FC_LOG[] = ['slug' => $slug, 'status' => 'skipped', 'reason' => 'unresolved token in ' . $path];
        return null;
    }

    $asUser = isset($opts['as']) ? (int)$opts['as'] : 1;
    wp_set_current_user($asUser);
    fc_reset_framework_request();

    $req = new WP_REST_Request($method, '/fluent-community/v2/' . ltrim($path, '/'));
    foreach ($query as $k => $v) {
        $req->set_param($k, $v);
    }
    if ($body) {
        $req->set_header('content-type', 'application/json');
        $req->set_body(wp_json_encode($body));
        foreach ($body as $k => $v) {
            $req->set_param($k, $v);
        }
    }

    $start = microtime(true);
    try {
        $res    = rest_do_request($req);
        $status = $res->get_status();
        $data   = $res->get_data();
        $error  = null;
    } catch (\Throwable $e) {
        $status = 500;
        $data   = null;
        $error  = get_class($e) . ': ' . $e->getMessage();
    }
    $ms = round((microtime(true) - $start) * 1000);

    $record = [
        'slug'        => $slug,
        'method'      => $method,
        'path'        => '/' . ltrim($path, '/'),
        'query'       => (object)$query,
        'requestBody' => $body ? $body : null,
        'status'      => $status,
        'as_user'     => $asUser,
        'duration_ms' => $ms,
        'note'        => isset($opts['note']) ? $opts['note'] : null,
        'error'       => $error,
        'response'    => $data,
    ];

    $shouldSave = !isset($opts['save']) || $opts['save'] !== false;
    if (!$shouldSave && ($status < 200 || $status >= 300)) {
        // Always keep failures so scratch-step problems are debuggable.
        $file = $FC_OUT . '/_failures/' . str_replace('/', '__', $slug) . '.json';
        if (!is_dir(dirname($file))) {
            mkdir(dirname($file), 0777, true);
        }
        file_put_contents($file, wp_json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    if ($shouldSave) {
        $file = $FC_OUT . '/' . $slug . '.json';
        $dir  = dirname($file);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
        file_put_contents($file, wp_json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    }

    $FC_LOG[] = ['slug' => $slug, 'status' => $status, 'ms' => $ms, 'error' => $error];
    fwrite(STDERR, sprintf("[%s] %-6s %-55s %s\n", $status, $method, $path, $slug));

    return $data;
}

require __DIR__ . '/capture-plan.php';

global $FC_LOG;
$ok   = 0;
$fail = [];
foreach ($FC_LOG as $entry) {
    if (isset($entry['status']) && $entry['status'] >= 200 && $entry['status'] < 300) {
        $ok++;
    } else {
        $fail[] = $entry;
    }
}
file_put_contents($OUT . '/_log.json', wp_json_encode($FC_LOG, JSON_PRETTY_PRINT));
fwrite(STDERR, sprintf("\n==== %d ok, %d failed of %d ====\n", $ok, count($fail), count($FC_LOG)));
foreach ($fail as $f) {
    fwrite(STDERR, sprintf("  FAIL %-50s %s %s\n", $f['slug'], isset($f['status']) ? $f['status'] : '?', isset($f['reason']) ? $f['reason'] : (isset($f['error']) ? $f['error'] : '')));
}
