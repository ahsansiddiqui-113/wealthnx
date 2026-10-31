<?php
/**
 * WealthNX - Database Helper Functions
 * MySQL Database Abstraction Layer for GoDaddy Shared Hosting
 */

require_once __DIR__ . '/config.php';

class Database {
    private static $connection = null;

    /**
     * Get or establish database connection
     */
    public static function connect() {
        if (self::$connection === null) {
            try {
                self::$connection = new mysqli(
                    DB_HOST,
                    DB_USER,
                    DB_PASSWORD,
                    DB_NAME,
                    DB_PORT
                );

                // Check connection
                if (self::$connection->connect_error) {
                    throw new Exception('Database connection failed: ' . self::$connection->connect_error);
                }

                // Set charset to utf8mb4
                self::$connection->set_charset('utf8mb4');
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Database connection failed']);
                error_log($e->getMessage());
                exit();
            }
        }
        return self::$connection;
    }

    /**
     * Execute SELECT query
     */
    public static function query($sql, $params = []) {
        $conn = self::connect();

        // Prepare statement
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log('Query prepare failed: ' . $conn->error);
            return null;
        }

        // Bind parameters if provided
        if (!empty($params)) {
            $types = '';
            $values = [];
            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= 'i';
                } elseif (is_float($param)) {
                    $types .= 'd';
                } else {
                    $types .= 's';
                }
                $values[] = $param;
            }
            $stmt->bind_param($types, ...$values);
        }

        // Execute
        if (!$stmt->execute()) {
            error_log('Query execution failed: ' . $stmt->error);
            return null;
        }

        // Get result
        $result = $stmt->get_result();
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $stmt->close();
        return $data;
    }

    /**
     * Execute single row SELECT query
     */
    public static function queryOne($sql, $params = []) {
        $results = self::query($sql, $params);
        return !empty($results) ? $results[0] : null;
    }

    /**
     * Execute INSERT query and return inserted ID
     */
    public static function insert($sql, $params = []) {
        $conn = self::connect();

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log('Insert prepare failed: ' . $conn->error);
            return null;
        }

        if (!empty($params)) {
            $types = '';
            $values = [];
            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= 'i';
                } elseif (is_float($param)) {
                    $types .= 'd';
                } else {
                    $types .= 's';
                }
                $values[] = $param;
            }
            $stmt->bind_param($types, ...$values);
        }

        if (!$stmt->execute()) {
            error_log('Insert execution failed: ' . $stmt->error);
            return null;
        }

        $id = $conn->insert_id;
        $stmt->close();
        return $id;
    }

    /**
     * Execute UPDATE or DELETE query
     */
    public static function execute($sql, $params = []) {
        $conn = self::connect();

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log('Execute prepare failed: ' . $conn->error);
            return false;
        }

        if (!empty($params)) {
            $types = '';
            $values = [];
            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= 'i';
                } elseif (is_float($param)) {
                    $types .= 'd';
                } else {
                    $types .= 's';
                }
                $values[] = $param;
            }
            $stmt->bind_param($types, ...$values);
        }

        $result = $stmt->execute();
        $affected = $stmt->affected_rows;
        $stmt->close();

        return $result ? $affected : false;
    }

    /**
     * Begin transaction
     */
    public static function beginTransaction() {
        return self::connect()->begin_transaction();
    }

    /**
     * Commit transaction
     */
    public static function commit() {
        return self::connect()->commit();
    }

    /**
     * Rollback transaction
     */
    public static function rollback() {
        return self::connect()->rollback();
    }

    /**
     * Close connection
     */
    public static function close() {
        if (self::$connection !== null) {
            self::$connection->close();
            self::$connection = null;
        }
    }

    /**
     * Generate UUID (MySQL 5.7+ uses UUID() function)
     */
    public static function generateUUID() {
        return bin2hex(random_bytes(16));
    }

    /**
     * Escape string for safe SQL
     */
    public static function escape($string) {
        return self::connect()->real_escape_string($string);
    }
}
