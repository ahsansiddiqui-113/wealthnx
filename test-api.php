<?php
/**
 * WealthNX API Testing Script
 * Tests all API endpoints and database connectivity
 */

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load environment and config
require_once 'config.php';
require_once 'database.php';

// Start output buffering to prevent headers already sent errors
ob_start();

// HTML header
?>
<!DOCTYPE html>
<html>
<head>
    <title>WealthNX API Test Suite</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; }
        h1 { color: #333; border-bottom: 3px solid #0066cc; padding-bottom: 10px; }
        .test-section { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0066cc; border-radius: 4px; }
        .test-result { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .pass { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }
        .fail { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }
        .info { background: #d1ecf1; color: #0c5460; border-left: 4px solid #17a2b8; }
        .code { background: #f4f4f4; padding: 10px; border-radius: 3px; font-family: monospace; overflow-x: auto; }
        button { background: #0066cc; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
        button:hover { background: #0052a3; }
        input[type="text"], textarea { padding: 8px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; width: 200px; }
        textarea { width: 100%; height: 100px; }
        .test-form { background: #f9f9f9; padding: 15px; border-radius: 4px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>WealthNX API Test Suite</h1>

        <?php
        // Test 1: Database Connection
        echo '<div class="test-section">';
        echo '<h2>1. Database Connection Test</h2>';
        try {
            $conn = Database::connect();
            if ($conn) {
                echo '<div class="test-result pass">✓ Database connection successful</div>';
                echo '<div class="code">Host: ' . DB_HOST . '<br>Database: ' . DB_NAME . '<br>User: ' . DB_USER . '</div>';
            } else {
                echo '<div class="test-result fail">✗ Database connection failed</div>';
            }
        } catch (Exception $e) {
            echo '<div class="test-result fail">✗ Database Error: ' . $e->getMessage() . '</div>';
        }
        echo '</div>';

        // Test 2: Check Database Tables
        echo '<div class="test-section">';
        echo '<h2>2. Database Tables Check</h2>';
        try {
            $conn = Database::connect();
            $tables = ['contacts', 'wishlists', 'email_metas', 'email_statuses', 'support_queries', 'support_query_items', 'cookie_consents'];

            foreach ($tables as $table) {
                $result = $conn->query("SHOW TABLES LIKE '$table'");
                if ($result && $result->num_rows > 0) {
                    // Get row count
                    $countResult = $conn->query("SELECT COUNT(*) as cnt FROM $table");
                    $row = $countResult->fetch_assoc();
                    $count = $row['cnt'];
                    echo '<div class="test-result pass">✓ Table <strong>' . $table . '</strong> exists (' . $count . ' rows)</div>';
                } else {
                    echo '<div class="test-result fail">✗ Table <strong>' . $table . '</strong> missing</div>';
                }
            }
        } catch (Exception $e) {
            echo '<div class="test-result fail">✗ Error: ' . $e->getMessage() . '</div>';
        }
        echo '</div>';

        // Test 3: Environment Variables
        echo '<div class="test-section">';
        echo '<h2>3. Environment Variables Check</h2>';
        $envVars = ['DB_NAME', 'DB_USER', 'DB_HOST', 'APP_BASE_URL', 'MAIL_SENDER', 'ADMIN_EMAIL'];
        foreach ($envVars as $var) {
            $value = defined($var) ? constant($var) : 'NOT SET';
            if ($value !== 'NOT SET') {
                $displayValue = (strpos($var, 'PASSWORD') !== false || strpos($var, 'SECRET') !== false) ? '***' : $value;
                echo '<div class="test-result pass">✓ ' . $var . ' = ' . $displayValue . '</div>';
            } else {
                echo '<div class="test-result fail">✗ ' . $var . ' not set</div>';
            }
        }
        echo '</div>';

        // Test 4: API Endpoint Tests
        echo '<div class="test-section">';
        echo '<h2>4. API Endpoint Tests</h2>';
        echo '<p>Test API endpoints below:</p>';

        // Create Contact Form
        echo '<div class="test-form">';
        echo '<h3>Test: Create Contact</h3>';
        echo '<form method="POST" action="api.php?route=contacts">';
        echo '<input type="text" name="firstName" placeholder="First Name" value="Test"><br>';
        echo '<input type="text" name="lastName" placeholder="Last Name" value="User"><br>';
        echo '<input type="text" name="email" placeholder="Email" value="test@example.com"><br>';
        echo '<textarea name="message" placeholder="Message">This is a test message from API test script</textarea><br>';
        echo '<button type="submit">Submit Contact Form</button>';
        echo '</form>';
        echo '</div>';

        // Subscribe to Newsletter Form
        echo '<div class="test-form">';
        echo '<h3>Test: Subscribe to Newsletter</h3>';
        echo '<form method="POST" action="api.php?route=wishlists">';
        echo '<input type="text" name="email" placeholder="Email" value="newsletter@example.com"><br>';
        echo '<button type="submit">Subscribe to Newsletter</button>';
        echo '</form>';
        echo '</div>';

        // Support Query Form
        echo '<div class="test-form">';
        echo '<h3>Test: Create Support Query</h3>';
        echo '<form method="POST" action="api.php?route=support/queries">';
        echo '<input type="text" name="subject" placeholder="Subject" value="Test Support Query"><br>';
        echo '<textarea name="description" placeholder="Description">This is a test support query from the API test script</textarea><br>';
        echo '<input type="text" name="userEmail" placeholder="Your Email" value="support@example.com"><br>';
        echo '<button type="submit">Create Support Query</button>';
        echo '</form>';
        echo '</div>';

        // Cookie Consent Form
        echo '<div class="test-form">';
        echo '<h3>Test: Save Cookie Consent</h3>';
        echo '<form method="POST" action="api.php?route=cookie-consent">';
        echo '<input type="text" name="email" placeholder="Email" value="cookie@example.com"><br>';
        echo '<input type="text" name="userConsent" placeholder="Consent (accept/reject)" value="accept"><br>';
        echo '<button type="submit">Save Cookie Consent</button>';
        echo '</form>';
        echo '</div>';

        echo '</div>';

        // Test 5: Display Submitted Data
        echo '<div class="test-section">';
        echo '<h2>5. Recent Database Entries</h2>';

        try {
            $conn = Database::connect();

            // Recent contacts
            echo '<h3>Recent Contacts:</h3>';
            $result = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 3");
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo '<div class="code">';
                    echo 'Name: ' . $row['first_name'] . ' ' . $row['last_name'] . '<br>';
                    echo 'Email: ' . $row['email'] . '<br>';
                    echo 'Created: ' . $row['created_at'] . '<br>';
                    echo '</div>';
                }
            } else {
                echo '<div class="test-result info">No contacts yet</div>';
            }

            // Recent wishlists
            echo '<h3>Recent Newsletter Subscriptions:</h3>';
            $result = $conn->query("SELECT * FROM wishlists ORDER BY created_at DESC LIMIT 3");
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo '<div class="code">';
                    echo 'Email: ' . $row['email'] . '<br>';
                    echo 'Created: ' . $row['created_at'] . '<br>';
                    echo '</div>';
                }
            } else {
                echo '<div class="test-result info">No newsletter subscriptions yet</div>';
            }

            // Recent support queries
            echo '<h3>Recent Support Queries:</h3>';
            $result = $conn->query("SELECT * FROM support_queries ORDER BY created_at DESC LIMIT 3");
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo '<div class="code">';
                    echo 'Subject: ' . $row['subject'] . '<br>';
                    echo 'Status: ' . $row['status'] . '<br>';
                    echo 'Created: ' . $row['created_at'] . '<br>';
                    echo '</div>';
                }
            } else {
                echo '<div class="test-result info">No support queries yet</div>';
            }

        } catch (Exception $e) {
            echo '<div class="test-result fail">Error loading data: ' . $e->getMessage() . '</div>';
        }

        echo '</div>';

        // Test 6: File Structure Check
        echo '<div class="test-section">';
        echo '<h2>6. File Structure Check</h2>';
        $requiredFiles = [
            'api.php' => 'Main API Router',
            'config.php' => 'Configuration',
            'database.php' => 'Database Class',
            '.env.php' => 'Environment Variables',
            '.htaccess' => 'Apache Rewrite Rules',
            'index.php' => 'Frontend Entry Point',
            'vite.config.js' => 'Vite Configuration',
            'package.json' => 'Node Dependencies'
        ];

        $baseDir = __DIR__;
        foreach ($requiredFiles as $file => $description) {
            $path = $baseDir . DIRECTORY_SEPARATOR . $file;
            if (file_exists($path)) {
                $size = filesize($path);
                echo '<div class="test-result pass">✓ ' . $file . ' (' . $description . ') - ' . number_format($size) . ' bytes</div>';
            } else {
                echo '<div class="test-result fail">✗ ' . $file . ' (' . $description . ') - MISSING</div>';
            }
        }
        echo '</div>';

        // Summary
        echo '<div class="test-section" style="background: #f0f0f0; border-left: 4px solid #666;">';
        echo '<h2>Testing Instructions</h2>';
        echo '<ol>';
        echo '<li>Verify database connection (check green passes above)</li>';
        echo '<li>Use the forms above to test each API endpoint</li>';
        echo '<li>Submit the forms and check for success messages</li>';
        echo '<li>Scroll down to "Recent Database Entries" to see if data was saved</li>';
        echo '<li>Check phpMyAdmin to verify data in tables: <code>http://localhost/phpmyadmin</code></li>';
        echo '<li>Test the website forms at: <code>http://localhost/wealthnx</code></li>';
        echo '</ol>';
        echo '</div>';

        ob_end_flush();
        ?>
    </div>
</body>
</html>
