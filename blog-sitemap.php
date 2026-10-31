<?php
/**
 * WealthNX - /sitemap-blog.xml : every published blog post (generated from the database, so new posts appear automatically).
 * Linked from robots.txt next to the main /sitemap.xml.
 */

$envFile = __DIR__ . '/.env.php';
if (file_exists($envFile)) {
    require_once $envFile;
}
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';

$rows = [];
try {
    $rows = Database::query(
        "SELECT slug, published_at, updated_at FROM blog_posts
         WHERE status = 'published' AND published_at IS NOT NULL AND published_at <= ?
         ORDER BY published_at DESC",
        [gmdate('Y-m-d H:i:s')]
    );
} catch (Throwable $e) {
    error_log('blog-sitemap.php: ' . $e->getMessage());
}
if (!is_array($rows)) {
    $rows = [];
}

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=3600');

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($rows as $r) {
    $last = $r['updated_at'] ?: $r['published_at'];
    $ts = strtotime($last . ' UTC');
    echo '  <url><loc>https://www.wealthnx.ai/blogs/' . htmlspecialchars($r['slug'], ENT_XML1 | ENT_QUOTES, 'UTF-8') . '/</loc>'
        . ($ts ? '<lastmod>' . gmdate('Y-m-d', $ts) . '</lastmod>' : '')
        . '<changefreq>monthly</changefreq><priority>0.6</priority></url>' . "\n";
}
echo '</urlset>' . "\n";
