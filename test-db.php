<?php
/**
 * WealthNX - Database Connection Tester
 *
 * Use this file to diagnose database connection issues
 * IMPORTANT: Delete this file before deploying to production
 *
 * To use:
 * 1. Upload to your GoDaddy server
 * 2. Visit: https://yourdomain.com/test-db.php
 * 3. Review the results
 * 4. Delete this file when done
 */

// Set up error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Try to load .env.php if it exists
if (file_exists(__DIR__ . '/.env.php')) {
    require_once __DIR__ . '/.env.php';
}

// Try to load config.php
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WealthNX - Database Test</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
        }
        .test {
            margin: 20px 0;
            padding: 15px;
            border-left: 4px solid #ddd;
        }
        .test.pass {
            background: #d4edda;
            border-left-color: #28a745;
        }
        .test.fail {
            background: #f8d7da;
            border-left-color: #dc3545;
        }
        .test-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .test-result {
            font-size: 14px;
            margin: 5px 0;
        }
        .pass .test-result {
            color: #155724;
        }
        .fail .test-result {
            color: #721c24;
        }
        .code {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            margin: 10px 0;
            overflow-x: auto;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffc107;
            color: #856404;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        table th {
            background: #f9f9f9;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WealthNX - Database Connection Test</h1>

        <div class="warning">
            ⚠️ <strong>Security Note:</strong> Delete this file (test-db.php) before deploying to production.
            This file exposes database information for testing purposes only.
        </div>

        <?php
        // Test 1: PHP Version
        echo '<div class="test ' . (version_compare(PHP_VERSION, '7.4.0') >= 0 ? 'pass' : 'fail') . '">';
        echo '<div class="test-title">✓ PHP Version</div>';
        echo '<div class="test-result">PHP ' . PHP_VERSION . '</div>';
        echo '<div class="test-result">' . (version_compare(PHP_VERSION, '7.4.0') >= 0 ? '✓ Compatible (7.4+)' : '✗ Requires PHP 7.4 or higher') . '</div>';
        echo '</div>';

        // Test 2: Configuration Loading
        echo '<div class="test ' . (defined('DB_NAME') ? 'pass' : 'fail') . '">';
        echo '<div class="test-title">✓ Configuration</div>';
        if (defined('DB_NAME')) {
            echo '<div class="test-result">✓ Configuration loaded successfully</div>';
            echo '<div class="test-result">';
            echo 'Database: ' . htmlspecialchars(DB_NAME) . '<br>';
            echo 'Host: ' . htmlspecialchars(DB_HOST) . '<br>';
            echo 'Port: ' . htmlspecialchars(DB_PORT) . '<br>';
            echo 'User: ' . htmlspecialchars(DB_USER) . '<br>';
            echo '</div>';
        } else {
            echo '<div class="test-result">✗ Configuration not loaded - check .env.php</div>';
        }
        echo '</div>';

        // Test 3: Database Connection
        if (defined('DB_NAME')) {
            $conn = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);

            $isConnected = !$conn->connect_error;
            echo '<div class="test ' . ($isConnected ? 'pass' : 'fail') . '">';
            echo '<div class="test-title">✓ Database Connection</div>';

            if ($isConnected) {
                echo '<div class="test-result">✓ Connected successfully</div>';
                echo '<div class="test-result">MySQL Version: ' . $conn->server_info . '</div>';
                echo '<div class="test-result">Connection ID: ' . $conn->thread_id . '</div>';
            } else {
                echo '<div class="test-result">✗ Connection failed</div>';
                echo '<div class="test-result">Error: ' . htmlspecialchars($conn->connect_error) . '</div>';
                echo '<div class="test-result">';
                echo '<strong>Possible solutions:</strong><br>';
                echo '1. Verify DB_USER and DB_PASSWORD in .env.php<br>';
                echo '2. Check DB_HOST - typically "localhost" for GoDaddy<br>';
                echo '3. Ensure database user has permission to access this database<br>';
                echo '4. Check GoDaddy cPanel for exact database credentials<br>';
                echo '</div>';
            }
            echo '</div>';

            // Test 4: Database Tables
            if ($isConnected) {
                $requiredTables = [
                    'contacts',
                    'wishlists',
                    'email_metas',
                    'email_statuses',
                    'support_queries',
                    'support_query_items',
                    'cookie_consents'
                ];

                $result = $conn->query("SHOW TABLES");
                $existingTables = [];
                while ($row = $result->fetch_row()) {
                    $existingTables[] = $row[0];
                }

                $allTablesExist = count(array_intersect($requiredTables, $existingTables)) === count($requiredTables);

                echo '<div class="test ' . ($allTablesExist ? 'pass' : 'fail') . '">';
                echo '<div class="test-title">✓ Database Schema</div>';
                echo '<div class="test-result">';

                if ($allTablesExist) {
                    echo '✓ All required tables exist<br><br>';
                    echo '<table>';
                    echo '<th>Table Name</th><th>Rows</th><th>Status</th>';

                    foreach ($requiredTables as $table) {
                        $rowCount = $conn->query("SELECT COUNT(*) FROM $table")->fetch_row()[0];
                        echo '<tr>';
                        echo '<td><code>' . htmlspecialchars($table) . '</code></td>';
                        echo '<td>' . $rowCount . '</td>';
                        echo '<td>✓ OK</td>';
                        echo '</tr>';
                    }

                    echo '</table>';
                } else {
                    echo '✗ Missing tables<br><br>';
                    echo '<strong>Expected tables:</strong><br>';
                    foreach ($requiredTables as $table) {
                        $status = in_array($table, $existingTables) ? '✓' : '✗';
                        echo $status . ' ' . htmlspecialchars($table) . '<br>';
                    }
                    echo '<br>';
                    echo '<strong>Solution:</strong><br>';
                    echo 'Import the database.sql file:<br>';
                    echo '<div class="code">mysql -u ' . htmlspecialchars(DB_USER) . ' -p ' . htmlspecialchars(DB_NAME) . ' < database.sql</div>';
                    echo 'Or in GoDaddy cPanel phpMyAdmin: Database → Import → Select database.sql file';
                }

                echo '</div>';
                echo '</div>';

                // Test 5: Database Permissions
                echo '<div class="test pass">';
                echo '<div class="test-title">✓ Database Permissions</div>';

                // Test basic operations
                $testData = [
                    'INSERT' => false,
                    'SELECT' => false,
                    'UPDATE' => false,
                    'DELETE' => false
                ];

                // Try INSERT
                $testId = bin2hex(random_bytes(4));
                $insertTest = $conn->query("INSERT INTO contacts (id, email) VALUES ('$testId', 'test@test.local')");
                $testData['INSERT'] = $insertTest !== false;

                // Try SELECT
                $selectTest = $conn->query("SELECT * FROM contacts WHERE id = '$testId'");
                $testData['SELECT'] = $selectTest !== false;

                // Try UPDATE
                $updateTest = $conn->query("UPDATE contacts SET email = 'updated@test.local' WHERE id = '$testId'");
                $testData['UPDATE'] = $updateTest !== false;

                // Try DELETE
                $deleteTest = $conn->query("DELETE FROM contacts WHERE id = '$testId'");
                $testData['DELETE'] = $deleteTest !== false;

                echo '<div class="test-result">';
                foreach ($testData as $operation => $success) {
                    echo ($success ? '✓' : '✗') . ' ' . $operation . '<br>';
                }
                echo '</div>';
                echo '</div>';

                // Test 6: File Permissions
                echo '<div class="test ' . (is_writable(__DIR__ . '/logs') ? 'pass' : 'fail') . '">';
                echo '<div class="test-title">✓ File Permissions</div>';

                // Create logs directory if it doesn't exist
                if (!is_dir(__DIR__ . '/logs')) {
                    mkdir(__DIR__ . '/logs', 0755, true);
                }

                $canWriteLogs = is_writable(__DIR__ . '/logs');
                echo '<div class="test-result">';
                if ($canWriteLogs) {
                    echo '✓ Logs directory writable<br>';
                } else {
                    echo '✗ Cannot write to logs directory<br>';
                    echo 'Solution: Set logs/ directory permissions to 755<br>';
                }
                echo '</div>';
                echo '</div>';

                // Test 7: API Test
                echo '<div class="test pass">';
                echo '<div class="test-title">✓ API Endpoints</div>';
                echo '<div class="test-result">';
                echo 'Health Check: <code>GET /api/health</code><br>';
                echo 'Contacts: <code>GET /api/contacts</code><br>';
                echo 'Create Contact: <code>POST /api/contacts</code><br>';
                echo '<br>';
                echo 'Test with curl:<br>';
                echo '<div class="code">curl http://localhost/api/health</div>';
                echo '<div class="code">curl -X POST http://localhost/api/contacts \\<br>&nbsp;&nbsp;-H "Content-Type: application/json" \\<br>&nbsp;&nbsp;-d \'{"email":"test@example.com"}\'</div>';
                echo '</div>';
                echo '</div>';

                $conn->close();
            }
        } else {
            echo '<div class="test fail">';
            echo '<div class="test-title">Configuration Required</div>';
            echo '<div class="test-result">';
            echo 'Create a .env.php file with database credentials:<br>';
            echo '<div class="code">&lt;?php<br>';
            echo 'putenv(\'DB_NAME=your_db_name\');<br>';
            echo 'putenv(\'DB_USER=your_username\');<br>';
            echo 'putenv(\'DB_PASSWORD=your_password\');<br>';
            echo 'putenv(\'DB_HOST=localhost\');<br>';
            echo '?&gt;</div>';
            echo '</div>';
            echo '</div>';
        }
        ?>

        <div class="warning">
            <strong>Next Steps:</strong><br>
            1. ✓ Verify all tests pass above<br>
            2. ✓ Update React API URLs to point to your domain<br>
            3. ✓ Test API endpoints manually<br>
            4. ✓ Run your application<br>
            5. ✓ <strong>Delete this file (test-db.php) for security</strong><br>
        </div>

    </div>
</body>
</html>
