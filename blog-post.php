<?php
/**
 * WealthNX - /blogs/<slug>/ server-side wrapper (SEO).
 *
 * Apache (.htaccess rule 4b) sends every /blogs/<slug>/ request here. The page itself is still the static
 * reader shell (blogs/read/index.html, which fetches the post in the browser), but this script first writes
 * the post's real <title>, meta description, canonical URL, Open Graph tags and Article JSON-LD into the HTML,
 * and adds a server-rendered copy of the article (id="wnx-ssr", removed by the reader once it has loaded)
 * so crawlers that do not run JavaScript still see the full text.
 *
 * Unknown / unpublished slugs answer 404 with "X-Robots-Tag: noindex" (the reader then shows its not-found state).
 */

$envFile = __DIR__ . '/.env.php';
if (file_exists($envFile)) {
    require_once $envFile;
}
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';

const WNX_SITE = 'https://www.wealthnx.ai';

function wnxEsc($s) {
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function wnxAbs($url) {
    $url = (string)$url;
    if ($url === '') {
        return '';
    }
    if (preg_match('#^https?://#i', $url)) {
        return $url;
    }
    return WNX_SITE . ($url[0] === '/' ? '' : '/') . $url;
}

$shellFile = __DIR__ . '/blogs/read/index.html';
$shell = is_file($shellFile) ? file_get_contents($shellFile) : false;
if ($shell === false) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Blog reader is not installed.';
    exit;
}

$slug = isset($_GET['slug']) ? (string)$_GET['slug'] : '';
$post = null;
if (preg_match('/^[A-Za-z0-9_-]{1,190}$/', $slug)) {
    try {
        $post = Database::queryOne(
            "SELECT slug, title, excerpt, content, cover_image, author, published_at, updated_at, meta_title, meta_description
             FROM blog_posts
             WHERE slug = ? AND status = 'published' AND published_at IS NOT NULL AND published_at <= ?
             LIMIT 1",
            [$slug, gmdate('Y-m-d H:i:s')]
        );
    } catch (Throwable $e) {
        error_log('blog-post.php: ' . $e->getMessage());
        $post = null;
    }
}

header('Content-Type: text/html; charset=utf-8');

if (!$post) {
    // Let the reader show its own "not found" message, but keep the URL out of search results.
    http_response_code(404);
    header('X-Robots-Tag: noindex, follow');
    echo $shell;
    exit;
}

$url = WNX_SITE . '/blogs/' . $post['slug'] . '/';
$title = trim((string)($post['meta_title'] ?? '')) !== '' ? $post['meta_title'] : $post['title'] . ' - WealthNX';
$desc = trim((string)($post['meta_description'] ?? '')) !== '' ? $post['meta_description'] : (string)$post['excerpt'];
$image = wnxAbs($post['cover_image'] ?? '');
$published = $post['published_at'] ? gmdate('Y-m-d\TH:i:s\Z', strtotime($post['published_at'] . ' UTC')) : null;
$modified = $post['updated_at'] ? gmdate('Y-m-d\TH:i:s\Z', strtotime($post['updated_at'] . ' UTC')) : $published;

$ld = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'Article',
            'headline' => $post['title'],
            'description' => $desc !== '' ? $desc : null,
            'image' => $image !== '' ? [$image] : null,
            'author' => ['@type' => 'Person', 'name' => $post['author']],
            'datePublished' => $published,
            'dateModified' => $modified,
            'mainEntityOfPage' => $url,
            'publisher' => ['@type' => 'Organization', 'name' => 'WealthNX', 'url' => WNX_SITE],
        ],
        [
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => WNX_SITE . '/'],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blogs', 'item' => WNX_SITE . '/blogs/'],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $post['title'], 'item' => $url],
            ],
        ],
    ],
];
// drop null fields
$ld['@graph'][0] = array_filter($ld['@graph'][0], function ($v) { return $v !== null; });

$head = "\n"
    . '<meta name="description" content="' . wnxEsc($desc) . '">' . "\n"
    . '<link rel="canonical" href="' . wnxEsc($url) . '">' . "\n"
    . '<meta property="og:type" content="article">' . "\n"
    . '<meta property="og:site_name" content="WealthNX">' . "\n"
    . '<meta property="og:title" content="' . wnxEsc($title) . '">' . "\n"
    . '<meta property="og:description" content="' . wnxEsc($desc) . '">' . "\n"
    . '<meta property="og:url" content="' . wnxEsc($url) . '">' . "\n"
    . ($image !== '' ? '<meta property="og:image" content="' . wnxEsc($image) . '">' . "\n" : '')
    . '<meta name="twitter:card" content="' . ($image !== '' ? 'summary_large_image' : 'summary') . '">' . "\n"
    . '<meta name="twitter:title" content="' . wnxEsc($title) . '">' . "\n"
    . '<meta name="twitter:description" content="' . wnxEsc($desc) . '">' . "\n"
    . ($image !== '' ? '<meta name="twitter:image" content="' . wnxEsc($image) . '">' . "\n" : '')
    . '<script type="application/ld+json" id="bp-jsonld">'
    . json_encode($ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP)
    . '</script>' . "\n";

// Replace the shell's generic head tags
$titleTag = '<title>' . wnxEsc($title) . '</title>';
$shell = preg_replace_callback('#<title>.*?</title>#is', function () use ($titleTag) { return $titleTag; }, $shell, 1);
$shell = preg_replace('#<meta\s+name="(?:robots|description)"[^>]*>#i', '', $shell);
$shell = preg_replace('#<link\s+rel="canonical"[^>]*>#i', '', $shell);
$shell = preg_replace_callback('#</head>#i', function () use ($head) { return $head . '</head>'; }, $shell, 1);

// Server-rendered copy of the article for crawlers without JavaScript (the reader removes it once it renders)
$dateText = $published ? gmdate('F j, Y', strtotime($post['published_at'] . ' UTC')) : '';
$ssr = "\n" . '<div id="wnx-ssr" hidden><article>'
    . '<h1>' . wnxEsc($post['title']) . '</h1>'
    . '<p>' . wnxEsc($post['author']) . ($dateText !== '' ? ' &middot; ' . wnxEsc($dateText) : '') . '</p>'
    . (string)$post['content']
    . '</article></div>' . "\n";
$shell = preg_replace_callback('#</body>#i', function () use ($ssr) { return $ssr . '</body>'; }, $shell, 1);

header('Cache-Control: public, max-age=300');
echo $shell;
