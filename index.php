<?php
/**
 * WealthNX Frontend Entry Point
 * Loads environment variables and serves React frontend
 */

// Load environment configuration if it exists
$envFile = __DIR__ . '/.env.php';
if (file_exists($envFile)) {
    require_once $envFile;
}

// Load main configuration
require_once __DIR__ . '/config.php';

// Get the HTML file
$indexHtml = __DIR__ . '/index.html';

// Serve the React frontend
if (file_exists($indexHtml)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($indexHtml);
} else {
    http_response_code(404);
    echo 'Frontend not found';
}
