<?php
/**
 * WealthNX - PHP Configuration
 * GoDaddy Deluxe Shared Hosting Environment
 */

// ====================================
// Database Configuration
// ====================================
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'wealthnx_user');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'wealthnx_db');
define('DB_PORT', getenv('DB_PORT') ?: 3306);

// ====================================
// Application Configuration
// ====================================
define('APP_BASE_URL', getenv('APP_BASE_URL') ?: 'http://localhost');
define('API_BASE_URL', APP_BASE_URL . '/api');

// ====================================
// Email Configuration
// ====================================
define('MAIL_SENDER', getenv('MAIL_SENDER') ?: 'no-reply@wealthnx.ai');

// ====================================
// Azure Configuration (Microsoft Graph API)
// ====================================
define('AZURE_TENANT_ID', getenv('AZURE_TENANT_ID') ?: '');
define('AZURE_CLIENT_ID', getenv('AZURE_CLIENT_ID') ?: '');
define('AZURE_CLIENT_SECRET', getenv('AZURE_CLIENT_SECRET') ?: '');

// ====================================
// Support Team Configuration
// ====================================
if (!defined('ADMIN_EMAIL')) {
    define('ADMIN_EMAIL', getenv('ADMIN_EMAIL') ?: 'admin@wealthnx.ai');
}
define('INEXOR_SHARED_PASSWORD', getenv('INEXOR_SHARED_PASSWORD') ?: '');

// ====================================
// Blog admin panel login (password_hash() output, NEVER a plain password)
// Set ADMIN_EMAIL + ADMIN_PASSWORD_HASH in .env.php. Empty = admin API disabled (503).
// ====================================
if (!defined('ADMIN_PASSWORD_HASH')) {
    define('ADMIN_PASSWORD_HASH', getenv('ADMIN_PASSWORD_HASH') ?: '');
}

// ====================================
// Error Handling
// ====================================
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to users
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');

// Create logs directory if it doesn't exist
if (!is_dir(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
}

// ====================================
// CORS Headers
// ====================================
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ====================================
// Timezone
// ====================================
date_default_timezone_set('UTC');
