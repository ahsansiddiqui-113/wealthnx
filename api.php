<?php
/**
 * WealthNX - Main API Router
 * Handles all HTTP requests and routes to appropriate handlers
 */

// Load environment configuration if it exists
$envFile = __DIR__ . '/.env.php';
if (file_exists($envFile)) {
    require_once $envFile;
}

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';

// Get the request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path); // Remove /api prefix
$path = trim($path, '/');

// Parse query string
$query = $_GET;

// Get POST/PUT data
$input = json_decode(file_get_contents('php://input'), true) ?? [];

// ====================================
// API Routes
// ====================================

switch ($path) {
    // ====================================
    // CONTACTS ENDPOINTS
    // ====================================

    case 'contacts':
        if ($method === 'POST') {
            handleCreateContact($input);
        } elseif ($method === 'GET') {
            handleGetContacts($query);
        }
        break;

    case preg_match('/^contacts\/([a-f0-9\-]+)$/', $path, $matches) ? true : false:
        $contactId = $matches[1];
        if ($method === 'GET') {
            handleGetContact($contactId);
        }
        break;

    // ====================================
    // WISHLISTS ENDPOINTS
    // ====================================

    case 'wishlists':
        if ($method === 'GET') {
            handleGetWishlists($query);
        } elseif ($method === 'POST') {
            handleCreateWishlist($input);
        }
        break;

    // ====================================
    // EMAIL ENDPOINTS
    // ====================================

    case 'emails':
        if ($method === 'GET') {
            handleGetEmails($query);
        }
        break;

    case 'emails/status':
        if ($method === 'GET') {
            handleGetEmailStatuses($query);
        } elseif ($method === 'POST') {
            handleTrackEmailEvent($input);
        }
        break;

    case preg_match('/^emails\/([a-f0-9\-]+)\/track$/', $path, $matches) ? true : false:
        $emailStatusId = $matches[1];
        if ($method === 'POST') {
            handleTrackEmail($emailStatusId, $input);
        }
        break;

    // ====================================
    // SUPPORT ENDPOINTS
    // ====================================

    case 'support/queries':
        if ($method === 'GET') {
            handleGetSupportQueries($query);
        } elseif ($method === 'POST') {
            handleCreateSupportQuery($input);
        }
        break;

    case preg_match('/^support\/queries\/([a-f0-9\-]+)$/', $path, $matches) ? true : false:
        $queryId = $matches[1];
        if ($method === 'GET') {
            handleGetSupportQuery($queryId);
        }
        break;

    case preg_match('/^support\/queries\/([a-f0-9\-]+)\/items$/', $path, $matches) ? true : false:
        $queryId = $matches[1];
        if ($method === 'GET') {
            handleGetSupportQueryItems($queryId, $query);
        } elseif ($method === 'POST') {
            handleCreateSupportQueryItem($queryId, $input);
        }
        break;

    case preg_match('/^support\/queries\/([a-f0-9\-]+)\/items\/([a-f0-9\-]+)$/', $path, $matches) ? true : false:
        $queryId = $matches[1];
        $itemId = $matches[2];
        if ($method === 'PUT') {
            handleUpdateSupportQueryItem($queryId, $itemId, $input);
        }
        break;

    // ====================================
    // FEEDBACK ENDPOINTS
    // ====================================

    case 'feedback':
        if ($method === 'POST') {
            handleCreateFeedback($input);
        } elseif ($method === 'GET') {
            handleGetFeedback($query);
        }
        break;

    // ====================================
    // COOKIE CONSENT ENDPOINTS
    // ====================================

    case 'cookie-consent':
        if ($method === 'POST') {
            handleCookieConsent($input);
        }
        break;

    // ====================================
    // CONTACT MESSAGE ENDPOINT (/contact page form)
    // ====================================

    case 'contact-message':
        if ($method === 'POST') {
            handleCreateContactMessage($input);
        } else {
            header('Allow: POST');
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    // ====================================
    // BLOG ENDPOINTS (public) - exact string matches, so
    // 'blog/posts' and 'blog/posts/trending' never shadow each other
    // ====================================

    case 'blog/posts':
        handleBlogPosts($method, $query);
        break;

    case 'blog/posts/trending':
        handleBlogTrending($method);
        break;

    case 'blog/post':
        handleBlogPost($method, $query);
        break;

    case 'blog/videos':
        handleBlogVideos($method);
        break;

    case 'blog/subscribe':
        handleBlogSubscribe($method, $input);
        break;

    // ====================================
    // ADMIN ENDPOINTS (cookie session + CSRF header on writes)
    // ====================================

    case 'admin/login':
        handleAdminLogin($method, $input);
        break;

    case 'admin/logout':
        handleAdminLogout($method);
        break;

    case 'admin/me':
        handleAdminMe($method);
        break;

    case 'admin/posts':
        handleAdminPosts($method, $query, $input);
        break;

    case 'admin/post':
        handleAdminPost($method, $query);
        break;

    case 'admin/videos':
        handleAdminVideos($method, $query, $input);
        break;

    case 'admin/video':
        handleAdminVideo($method, $query);
        break;

    case 'admin/upload':
        handleAdminUpload($method);
        break;

    case 'admin/subscribers':
        handleAdminSubscribers($method, $query);
        break;

    // ====================================
    // HEALTH CHECK
    // ====================================

    case 'health':
        http_response_code(200);
        echo json_encode(['status' => 'ok', 'timestamp' => time()]);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}

// ====================================
// HANDLER FUNCTIONS
// ====================================

// CONTACTS
function handleCreateContact($data) {
    if (empty($data['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email is required']);
        return;
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

    // Check if contact already exists
    $existing = Database::queryOne("SELECT id FROM contacts WHERE email = ?", [$email]);
    if ($existing) {
        // Contact already exists
        http_response_code(200);
        echo json_encode([
            'id' => $existing['id'],
            'email' => $email,
            'message' => 'Contact already exists'
        ]);
        return;
    }

    // Create new contact
    $id = Database::generateUUID();
    $sql = "INSERT INTO contacts (id, email, created_at, updated_at) VALUES (?, ?, NOW(), NOW())";
    $result = Database::insert($sql, [$id, $email]);

    if ($result !== null) {
        http_response_code(201);
        echo json_encode([
            'id' => $id,
            'email' => $email,
            'created_at' => date('c'),
            'message' => 'Contact created successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create contact']);
    }
}

function handleGetContacts($query) {
    $limit = isset($query['limit']) ? (int)$query['limit'] : 100;
    $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

    $sql = "SELECT id, email, created_at, updated_at FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $contacts = Database::query($sql, [$limit, $offset]);

    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM contacts";
    $countResult = Database::queryOne($countSql);

    http_response_code(200);
    echo json_encode([
        'data' => $contacts ?? [],
        'total' => $countResult['total'] ?? 0,
        'limit' => $limit,
        'offset' => $offset
    ]);
}

function handleGetContact($contactId) {
    $sql = "SELECT id, email, created_at, updated_at FROM contacts WHERE id = ?";
    $contact = Database::queryOne($sql, [$contactId]);

    if ($contact) {
        http_response_code(200);
        echo json_encode($contact);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Contact not found']);
    }
}

// WISHLISTS
function handleGetWishlists($query) {
    $limit = isset($query['limit']) ? (int)$query['limit'] : 100;
    $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

    $sql = "SELECT id, email, created_at, updated_at FROM wishlists ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $wishlists = Database::query($sql, [$limit, $offset]);

    $countSql = "SELECT COUNT(*) as total FROM wishlists";
    $countResult = Database::queryOne($countSql);

    http_response_code(200);
    echo json_encode([
        'data' => $wishlists ?? [],
        'total' => $countResult['total'] ?? 0,
        'limit' => $limit,
        'offset' => $offset
    ]);
}

function handleCreateWishlist($data) {
    if (empty($data['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email is required']);
        return;
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $id = Database::generateUUID();

    $sql = "INSERT INTO wishlists (id, email, created_at, updated_at) VALUES (?, ?, NOW(), NOW())";
    $result = Database::insert($sql, [$id, $email]);

    if ($result !== null) {
        http_response_code(201);
        echo json_encode([
            'id' => $id,
            'email' => $email,
            'created_at' => date('c'),
            'message' => 'Wishlist created successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create wishlist']);
    }
}

// EMAILS
function handleGetEmails($query) {
    $limit = isset($query['limit']) ? (int)$query['limit'] : 100;
    $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

    $sql = "SELECT id, email, created_at, updated_at FROM email_metas ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $emails = Database::query($sql, [$limit, $offset]);

    $countSql = "SELECT COUNT(*) as total FROM email_metas";
    $countResult = Database::queryOne($countSql);

    http_response_code(200);
    echo json_encode([
        'data' => $emails ?? [],
        'total' => $countResult['total'] ?? 0,
        'limit' => $limit,
        'offset' => $offset
    ]);
}

function handleGetEmailStatuses($query) {
    $limit = isset($query['limit']) ? (int)$query['limit'] : 100;
    $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

    $sql = "SELECT id, email, token, sent_at, delivered_at, opened_at, clicked_at FROM email_statuses ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $statuses = Database::query($sql, [$limit, $offset]);

    $countSql = "SELECT COUNT(*) as total FROM email_statuses";
    $countResult = Database::queryOne($countSql);

    http_response_code(200);
    echo json_encode([
        'data' => $statuses ?? [],
        'total' => $countResult['total'] ?? 0,
        'limit' => $limit,
        'offset' => $offset
    ]);
}

function handleTrackEmailEvent($data) {
    // Track email open/click events
    if (empty($data['token']) || empty($data['event'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Token and event are required']);
        return;
    }

    $token = $data['token'];
    $event = $data['event']; // 'opened' or 'clicked'

    $validEvents = ['opened', 'clicked', 'delivered', 'sent'];
    if (!in_array($event, $validEvents)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid event type']);
        return;
    }

    $updateColumn = $event . '_at';
    $sql = "UPDATE email_statuses SET $updateColumn = NOW(), updated_at = NOW() WHERE token = ? AND $updateColumn IS NULL";
    $result = Database::execute($sql, [$token]);

    if ($result !== false) {
        http_response_code(200);
        echo json_encode([
            'message' => ucfirst($event) . ' tracked successfully',
            'token' => $token,
            'event' => $event
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to track event']);
    }
}

function handleTrackEmail($emailStatusId, $data) {
    // Alternative tracking endpoint
    if (empty($data['event'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Event is required']);
        return;
    }

    $event = $data['event'];
    $validEvents = ['opened', 'clicked', 'delivered', 'sent'];

    if (!in_array($event, $validEvents)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid event type']);
        return;
    }

    $updateColumn = $event . '_at';
    $sql = "UPDATE email_statuses SET $updateColumn = NOW(), updated_at = NOW() WHERE id = ? AND $updateColumn IS NULL";
    $result = Database::execute($sql, [$emailStatusId]);

    if ($result !== false) {
        http_response_code(200);
        echo json_encode(['message' => 'Event tracked']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to track event']);
    }
}

// SUPPORT
function handleGetSupportQueries($query) {
    $limit = isset($query['limit']) ? (int)$query['limit'] : 100;
    $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

    $sql = "SELECT id, email, total_queries, last_query_at FROM support_queries ORDER BY last_query_at DESC LIMIT ? OFFSET ?";
    $queries = Database::query($sql, [$limit, $offset]);

    $countSql = "SELECT COUNT(*) as total FROM support_queries";
    $countResult = Database::queryOne($countSql);

    http_response_code(200);
    echo json_encode([
        'data' => $queries ?? [],
        'total' => $countResult['total'] ?? 0
    ]);
}

function handleGetSupportQuery($queryId) {
    $sql = "SELECT id, email, total_queries, last_query_at FROM support_queries WHERE id = ?";
    $query = Database::queryOne($sql, [$queryId]);

    if ($query) {
        http_response_code(200);
        echo json_encode($query);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Query not found']);
    }
}

function handleCreateSupportQuery($data) {
    if (empty($data['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email is required']);
        return;
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $id = Database::generateUUID();

    Database::beginTransaction();
    try {
        $sql = "INSERT INTO support_queries (id, email, total_queries, last_query_at) VALUES (?, ?, 1, NOW())";
        Database::insert($sql, [$id, $email]);

        Database::commit();

        http_response_code(201);
        echo json_encode([
            'id' => $id,
            'email' => $email,
            'message' => 'Support query created'
        ]);
    } catch (Exception $e) {
        Database::rollback();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create support query']);
    }
}

function handleGetSupportQueryItems($queryId, $query) {
    $limit = isset($query['limit']) ? (int)$query['limit'] : 100;
    $offset = isset($query['offset']) ? (int)$query['offset'] : 0;

    $sql = "SELECT id, query_id, question, response, status, asked_at, responded_at FROM support_query_items WHERE query_id = ? ORDER BY asked_at DESC LIMIT ? OFFSET ?";
    $items = Database::query($sql, [$queryId, $limit, $offset]);

    $countSql = "SELECT COUNT(*) as total FROM support_query_items WHERE query_id = ?";
    $countResult = Database::queryOne($countSql, [$queryId]);

    http_response_code(200);
    echo json_encode([
        'data' => $items ?? [],
        'total' => $countResult['total'] ?? 0
    ]);
}

function handleCreateSupportQueryItem($queryId, $data) {
    if (empty($data['question'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Question is required']);
        return;
    }

    $id = Database::generateUUID();
    $question = $data['question'];

    Database::beginTransaction();
    try {
        $sql = "INSERT INTO support_query_items (id, query_id, question, status, asked_at) VALUES (?, ?, ?, 'pending', NOW())";
        Database::insert($sql, [$id, $queryId, $question]);

        // Update support_queries last_query_at
        $updateSql = "UPDATE support_queries SET last_query_at = NOW(), total_queries = total_queries + 1 WHERE id = ?";
        Database::execute($updateSql, [$queryId]);

        Database::commit();

        http_response_code(201);
        echo json_encode([
            'id' => $id,
            'query_id' => $queryId,
            'question' => $question,
            'status' => 'pending',
            'message' => 'Query item created'
        ]);
    } catch (Exception $e) {
        Database::rollback();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create query item']);
    }
}

function handleUpdateSupportQueryItem($queryId, $itemId, $data) {
    if (empty($data['response']) || empty($data['respondedBy'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Response and respondedBy are required']);
        return;
    }

    $response = $data['response'];
    $respondedBy = $data['respondedBy'];

    $sql = "UPDATE support_query_items SET response = ?, status = 'resolved', responded_at = NOW(), responded_by = ? WHERE id = ? AND query_id = ?";
    $result = Database::execute($sql, [$response, $respondedBy, $itemId, $queryId]);

    if ($result !== false) {
        http_response_code(200);
        echo json_encode(['message' => 'Query item updated']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update query item']);
    }
}

// COOKIE CONSENT
function handleCookieConsent($data) {
    if (empty($data['action'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Action is required']);
        return;
    }

    $id = Database::generateUUID();
    $action = $data['action']; // 'accept', 'reject', 'customize'
    $ipAddress = $_SERVER['REMOTE_ADDR'];
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $referrer = $_SERVER['HTTP_REFERER'] ?? 'Direct';
    $page = $data['page'] ?? $_SERVER['HTTP_REFERER'] ?? '';

    $sql = "INSERT INTO cookie_consents (id, action, ip_address, user_agent, referrer, page, timestamp) VALUES (?, ?, ?, ?, ?, ?, NOW())";
    $result = Database::insert($sql, [$id, $action, $ipAddress, $userAgent, $referrer, $page]);

    if ($result !== null) {
        http_response_code(201);
        echo json_encode([
            'id' => $id,
            'action' => $action,
            'timestamp' => date('c'),
            'message' => 'Consent recorded'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to record consent']);
    }
}

// ====================================
// FEEDBACK HANDLERS
// ====================================

function handleCreateFeedback($data) {
    // Validate required fields
    if (empty($data['agent'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Agent is required']);
        return;
    }

    $id        = Database::generateUUID();
    $agent     = htmlspecialchars(trim($data['agent']), ENT_QUOTES, 'UTF-8');
    $rating    = isset($data['rating']) ? (int)$data['rating'] : 0;
    $message   = isset($data['message']) ? htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8') : '';
    $page      = isset($data['page']) ? htmlspecialchars(trim($data['page']), ENT_QUOTES, 'UTF-8') : '/wealth-genie';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';

    // Validate rating range
    if ($rating < 1 || $rating > 5) {
        http_response_code(400);
        echo json_encode(['error' => 'Rating must be between 1 and 5']);
        return;
    }

    $sql = "INSERT INTO feedback (id, agent, rating, message, page, ip_address, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
    $result = Database::insert($sql, [$id, $agent, $rating, $message, $page, $ipAddress, $userAgent]);

    if ($result !== null) {
        http_response_code(201);
        echo json_encode([
            'id'         => $id,
            'agent'      => $agent,
            'rating'     => $rating,
            'created_at' => date('c'),
            'message'    => 'Feedback submitted successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save feedback']);
    }
}

function handleGetFeedback($query) {
    $limit  = isset($query['limit'])  ? (int)$query['limit']  : 100;
    $offset = isset($query['offset']) ? (int)$query['offset'] : 0;
    $agent  = isset($query['agent'])  ? $query['agent']       : null;

    if ($agent) {
        $sql   = "SELECT id, agent, rating, message, page, created_at FROM feedback WHERE agent = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $rows  = Database::query($sql, [$agent, $limit, $offset]);
        $cSql  = "SELECT COUNT(*) as total FROM feedback WHERE agent = ?";
        $count = Database::queryOne($cSql, [$agent]);
    } else {
        $sql   = "SELECT id, agent, rating, message, page, created_at FROM feedback ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $rows  = Database::query($sql, [$limit, $offset]);
        $cSql  = "SELECT COUNT(*) as total FROM feedback";
        $count = Database::queryOne($cSql);
    }

    http_response_code(200);
    echo json_encode([
        'data'   => $rows ?? [],
        'total'  => $count['total'] ?? 0,
        'limit'  => $limit,
        'offset' => $offset
    ]);
}

// ====================================
// CONTACT MESSAGE HANDLERS
// ====================================

function handleCreateContactMessage($data) {
    if (!is_array($data)) {
        $data = [];
    }

    // Honeypot: real visitors never fill this hidden field. Pretend success, store nothing.
    if (isset($data['website']) && trim((string)$data['website']) !== '') {
        http_response_code(201);
        echo json_encode(['message' => 'Message received']);
        return;
    }

    // Read + trim (kept as raw text; output escaping is the viewer's job)
    $field = function ($key) use ($data) {
        return (isset($data[$key]) && is_scalar($data[$key])) ? trim((string)$data[$key]) : '';
    };
    $firstName = $field('firstName');
    $lastName  = $field('lastName');
    $email     = $field('email');
    $phone     = $field('phone');
    $message   = $field('message');
    $page      = $field('page');

    // Validate
    if ($firstName === '' || mb_strlen($firstName) > 100) {
        http_response_code(400);
        echo json_encode(['error' => 'First name is required (max 100 characters)']);
        return;
    }
    if ($lastName === '' || mb_strlen($lastName) > 100) {
        http_response_code(400);
        echo json_encode(['error' => 'Last name is required (max 100 characters)']);
        return;
    }
    if ($email === '' || mb_strlen($email) > 255 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'A valid email address is required']);
        return;
    }
    if ($phone !== '' && (mb_strlen($phone) > 40 || !preg_match('/^[0-9 +()\-.]+$/', $phone))) {
        http_response_code(400);
        echo json_encode(['error' => 'Phone number may only contain digits, spaces and + ( ) - . (max 40 characters)']);
        return;
    }
    $messageLength = mb_strlen($message);
    if ($messageLength < 5 || $messageLength > 5000) {
        http_response_code(400);
        echo json_encode(['error' => 'Message must be between 5 and 5000 characters']);
        return;
    }

    // Page is informational only: cap its length rather than rejecting
    if (mb_strlen($page) > 255) {
        $page = mb_substr($page, 0, 255);
    }

    // Client details (REMOTE_ADDR only: X-Forwarded-For is client-controlled)
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

    // Basic abuse limit: max 5 messages per IP per hour
    if ($ipAddress !== '') {
        $recent = Database::queryOne(
            "SELECT COUNT(*) AS total FROM contact_messages WHERE ip_address = ? AND created_at > (NOW() - INTERVAL 1 HOUR)",
            [$ipAddress]
        );
        if ($recent && (int)$recent['total'] >= 5) {
            http_response_code(429);
            echo json_encode(['error' => 'Too many messages. Please try again later.']);
            return;
        }
    }

    $id = Database::generateUUID();
    $sql = "INSERT INTO contact_messages (id, first_name, last_name, email, phone, message, page, ip_address, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    $result = Database::insert($sql, [
        $id,
        $firstName,
        $lastName,
        $email,
        $phone !== '' ? $phone : null,
        $message,
        $page !== '' ? $page : null,
        $ipAddress !== '' ? $ipAddress : null,
        $userAgent !== '' ? $userAgent : null,
    ]);

    if ($result !== null) {
        http_response_code(201);
        echo json_encode([
            'id' => $id,
            'message' => 'Message received'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save your message. Please try again later.']);
    }
}

// ====================================
// BLOG + ADMIN: SHARED HELPERS
// (NOTE: no top-level const/variables here - the route switch runs before this
//  code in the file, only functions are hoisted)
// ====================================

/**
 * Per-request setup for blog/admin routes: JSON errors instead of blank 500s,
 * and for admin routes no CORS + no caching + noindex.
 */
function blogBoot($admin = false) {
    static $handlerSet = false;
    if (!$handlerSet) {
        $handlerSet = true;
        set_exception_handler(function ($e) {
            error_log('Blog API error: ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
            if (!headers_sent()) {
                http_response_code(500);
            }
            echo json_encode(['error' => 'Server error. Please try again later.']);
        });
    }
    if ($admin) {
        // Admin API is same-origin only: drop the permissive CORS headers set in config.php
        header_remove('Access-Control-Allow-Origin');
        header_remove('Access-Control-Allow-Methods');
        header_remove('Access-Control-Allow-Headers');
        header('Cache-Control: no-store');
        header('X-Robots-Tag: noindex, nofollow');
    }
}

function blogJson($code, $payload) {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
}

function blogFail($code, $message) {
    blogJson($code, ['error' => $message]);
    exit();
}

function blogMethodCheck($method, $allowed) {
    if (!in_array($method, $allowed, true)) {
        header('Allow: ' . implode(', ', $allowed));
        blogFail(405, 'Method not allowed');
    }
}

function blogNow() {
    return gmdate('Y-m-d H:i:s');
}

function blogIso($dt) {
    if ($dt === null || $dt === '') {
        return null;
    }
    $ts = strtotime((string)$dt . ' UTC');
    return $ts === false ? null : gmdate('Y-m-d\TH:i:s\Z', $ts);
}

/** Parse client-supplied date (ISO 8601 or "Y-m-d H:i:s", treated as UTC when no zone) -> UTC datetime string or null */
function blogParseDate($value) {
    if (!is_string($value) || trim($value) === '' || strlen($value) > 40) {
        return null;
    }
    $ts = strtotime(trim($value));
    return $ts === false ? null : gmdate('Y-m-d H:i:s', $ts);
}

function blogIntParam($query, $key, $default, $min, $max) {
    if (!isset($query[$key]) || !is_scalar($query[$key]) || !preg_match('/^-?[0-9]{1,9}$/', (string)$query[$key])) {
        return $default;
    }
    return max($min, min($max, (int)$query[$key]));
}

function blogStrParam($query, $key, $maxLen) {
    if (!isset($query[$key]) || !is_scalar($query[$key])) {
        return '';
    }
    return mb_substr(trim((string)$query[$key]), 0, $maxLen);
}

/** Read a scalar field from a decoded JSON body as a trimmed string without control characters */
function blogText($data, $key) {
    if (!is_array($data) || !isset($data[$key]) || !is_scalar($data[$key]) || is_bool($data[$key])) {
        return '';
    }
    $s = trim((string)$data[$key]);
    return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $s);
}

function blogBool($value) {
    return is_scalar($value) ? (int)filter_var($value, FILTER_VALIDATE_BOOLEAN) : 0;
}

/** Escape a user search string for use inside LIKE ? ESCAPE '!' */
function blogLike($s) {
    return '%' . str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $s) . '%';
}

function blogValidId($id) {
    return is_string($id) && preg_match('/^[a-f0-9\-]{32,36}$/', $id) === 1;
}

function blogClientIp() {
    return $_SERVER['REMOTE_ADDR'] ?? '';
}

function blogIsHttps() {
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        return true;
    }
    return (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function blogPlainText($html) {
    $text = html_entity_decode(strip_tags((string)$html), ENT_QUOTES, 'UTF-8');
    return trim(preg_replace('/\s+/u', ' ', $text));
}

function blogEstimateMinutes($html) {
    $words = preg_split('/\s+/u', blogPlainText($html), -1, PREG_SPLIT_NO_EMPTY);
    $count = is_array($words) ? count($words) : 0;
    return max(1, (int)ceil($count / 200));
}

/** Allowed values for cover_image / thumbnail: empty, an uploaded file, a site asset or an https URL */
function blogValidImageRef($v) {
    if ($v === '') {
        return true;
    }
    if (strlen($v) > 255 || strpos($v, '..') !== false) {
        return false;
    }
    if (preg_match('#^/(uploads/blog|assets)/[A-Za-z0-9_./\-]+$#', $v)) {
        return true;
    }
    return preg_match('#^https://[^\s<>"\'\\\\]+$#i', $v) === 1;
}

const BLOG_LAYOUTS = ['style1', 'style2', 'style3', 'style4', 'style5'];

function blogValidVideoUrl($u) {
    if ($u === '' || strlen($u) > 255 || !preg_match('#^https?://#i', $u)) {
        return false;
    }
    $p = parse_url($u);
    if (!is_array($p) || empty($p['host']) || isset($p['user']) || isset($p['pass'])) {
        return false;
    }
    $hosts = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com'];
    return in_array(strtolower($p['host']), $hosts, true);
}

/** Lowercase ASCII slug: a-z 0-9 and single hyphens, max 180 chars (room for -N suffix within 190) */
function blogSlugify($text) {
    $text = trim((string)$text);
    if ($text === '') {
        return '';
    }
    if (function_exists('transliterator_transliterate')) {
        $t = @transliterator_transliterate('Any-Latin; Latin-ASCII', $text);
        if (is_string($t) && $t !== '') {
            $text = $t;
        }
    } elseif (function_exists('iconv')) {
        $t = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text);
        if (is_string($t) && $t !== '') {
            $text = $t;
        }
    }
    $text = strtolower($text);
    $text = trim((string)preg_replace('/[^a-z0-9]+/', '-', $text), '-');
    if (strlen($text) > 180) {
        $text = rtrim(substr($text, 0, 180), '-');
    }
    return $text;
}

function blogSlugTaken($slug, $excludeId) {
    // 'read' is the reader shell at /blogs/read/, it can never be a post slug
    if ($slug === 'read') {
        return true;
    }
    $row = Database::queryOne("SELECT id FROM blog_posts WHERE slug = ? AND id <> ?", [$slug, $excludeId]);
    return $row ? true : false;
}

function blogUniqueSlug($base, $excludeId) {
    if ($base === '') {
        $base = 'post';
    }
    $candidate = $base;
    $n = 1;
    while (blogSlugTaken($candidate, $excludeId)) {
        $n++;
        if ($n > 200) {
            return $base . '-' . bin2hex(random_bytes(3));
        }
        $candidate = $base . '-' . $n;
    }
    return $candidate;
}

// ====================================
// BLOG: HTML SANITISER (allow-list, DOMDocument)
// ====================================

function blogUnwrapElement($parent, $el) {
    while ($el->firstChild) {
        $parent->insertBefore($el->firstChild, $el);
    }
    $parent->removeChild($el);
}

function blogRenameElement($el, $newName) {
    $new = $el->ownerDocument->createElement($newName);
    while ($el->firstChild) {
        $new->appendChild($el->firstChild);
    }
    $el->parentNode->replaceChild($new, $el);
    return $new;
}

/** Returns a safe URL or null. $allowMailto only for links, never for images. */
function blogCleanUrl($url, $allowMailto) {
    $url = (string)preg_replace('/[\x00-\x20\x7F]+/', '', (string)$url);
    if ($url === '' || strlen($url) > 2000) {
        return null;
    }
    if (preg_match('/^([a-z][a-z0-9+.\-]*):/i', $url, $m)) {
        $scheme = strtolower($m[1]);
        if ($scheme === 'http' || $scheme === 'https') {
            return $url;
        }
        if ($allowMailto && $scheme === 'mailto') {
            return $url;
        }
        return null; // javascript:, data:, vbscript:, file: ...
    }
    return $url; // relative URL
}

function blogIsExternalUrl($url) {
    if (!preg_match('#^(?:https?:)?//([^/:?\\\\\#]+)#i', $url, $m)) {
        return false;
    }
    $host = strtolower($m[1]);
    return !in_array($host, ['wealthnx.ai', 'www.wealthnx.ai'], true);
}

function blogSanitizeChildren($node) {
    $dropWithContent = ['script', 'style', 'iframe', 'object', 'embed', 'noscript', 'template', 'svg', 'math',
        'head', 'title', 'meta', 'link', 'base', 'form', 'input', 'button', 'textarea', 'select', 'option',
        'frame', 'frameset', 'applet', 'audio', 'video', 'canvas'];
    $rename = ['b' => 'strong', 'i' => 'em', 'h1' => 'h2', 'h5' => 'h4', 'h6' => 'h4'];
    $allowed = ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'blockquote', 'img', 'br', 'code', 'pre', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'];
    // Exact-match class allow-list (keep in sync with src/admin/sanitize.js)
    $classes = ['p' => ['wx-note'], 'blockquote' => ['wx-callout', 'wx-tip', 'wx-check', 'wx-author'], 'a' => ['wx-video']];

    $children = [];
    foreach ($node->childNodes as $c) {
        $children[] = $c;
    }

    foreach ($children as $child) {
        if ($child->nodeType === XML_TEXT_NODE) {
            continue;
        }
        if ($child->nodeType !== XML_ELEMENT_NODE) {
            $node->removeChild($child); // comments, processing instructions, CDATA ...
            continue;
        }

        $tag = strtolower($child->nodeName);
        if (in_array($tag, $dropWithContent, true)) {
            $node->removeChild($child);
            continue;
        }
        if (isset($rename[$tag])) {
            $child = blogRenameElement($child, $rename[$tag]);
            $tag = $rename[$tag];
        }

        blogSanitizeChildren($child);

        if (!in_array($tag, $allowed, true)) {
            blogUnwrapElement($node, $child); // keep the text, drop the tag
            continue;
        }

        // Remove every attribute except the allowed ones
        $keep = ($tag === 'a') ? ['href', 'class', 'data-duration'] : (($tag === 'img') ? ['src', 'alt'] : (isset($classes[$tag]) ? ['class'] : []));
        $names = [];
        foreach ($child->attributes as $attr) {
            $names[] = $attr->nodeName;
        }
        foreach ($names as $name) {
            if (!in_array(strtolower($name), $keep, true)) {
                $child->removeAttribute($name);
            }
        }

        if ($tag === 'a') {
            $href = blogCleanUrl($child->getAttribute('href'), true);
            if ($href === null) {
                blogUnwrapElement($node, $child);
                continue;
            }
            $child->setAttribute('href', $href);
            if (blogIsExternalUrl($href)) {
                $child->setAttribute('rel', 'noopener noreferrer');
                $child->setAttribute('target', '_blank');
            }
        } elseif ($tag === 'img') {
            $src = blogCleanUrl($child->getAttribute('src'), false);
            if ($src === null) {
                $node->removeChild($child);
                continue;
            }
            $child->setAttribute('src', $src);
        }

        // class: exact allow-list value only; wx-video also needs a YouTube href and a valid data-duration
        if ($child->hasAttribute('class')) {
            $cls = $child->getAttribute('class');
            $ok = isset($classes[$tag]) && in_array($cls, $classes[$tag], true);
            if ($ok && $tag === 'a') {
                $ok = blogValidVideoUrl($child->getAttribute('href'));
            }
            if (!$ok) {
                $child->removeAttribute('class');
            }
        }
        if ($child->hasAttribute('data-duration')) {
            $dur = $child->getAttribute('data-duration');
            if ($child->getAttribute('class') !== 'wx-video' || !preg_match('/^\d{1,2}(:\d{2}){1,2}$/D', $dur)) {
                $child->removeAttribute('data-duration');
            }
        }
    }
}

function blogSanitizeHtml($html) {
    $html = (string)$html;
    if (trim($html) === '') {
        return '';
    }
    if (!class_exists('DOMDocument')) {
        // No DOM extension: fall back to escaped plain text
        return '<p>' . nl2br(htmlspecialchars(strip_tags($html), ENT_QUOTES, 'UTF-8'), false) . '</p>';
    }

    $prev = libxml_use_internal_errors(true);
    $dom = new DOMDocument('1.0', 'UTF-8');
    $ok = $dom->loadHTML('<?xml encoding="UTF-8"><html><body>' . $html . '</body></html>');
    libxml_clear_errors();
    libxml_use_internal_errors($prev);

    if (!$ok) {
        return '<p>' . htmlspecialchars(strip_tags($html), ENT_QUOTES, 'UTF-8') . '</p>';
    }
    $bodies = $dom->getElementsByTagName('body');
    if ($bodies->length === 0) {
        return '';
    }
    $body = $bodies->item(0);
    blogSanitizeChildren($body);

    $out = '';
    foreach ($body->childNodes as $child) {
        $out .= $dom->saveHTML($child);
    }
    return trim($out);
}

// ====================================
// ADMIN AUTH
// ====================================

function blogAdminConfigured() {
    if (!defined('ADMIN_PASSWORD_HASH') || !defined('ADMIN_EMAIL')) {
        return false;
    }
    $hash = ADMIN_PASSWORD_HASH;
    $email = ADMIN_EMAIL;
    if (!is_string($hash) || $hash === '' || !is_string($email) || trim($email) === '') {
        return false;
    }
    $info = password_get_info($hash);
    return !empty($info['algo']);
}

/** Same-origin check for state-changing admin requests (defence in depth on top of SameSite + CSRF token) */
function blogAdminOriginCheck($method) {
    if ($method === 'GET' || $method === 'HEAD') {
        return;
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return;
    }
    $originHost = parse_url($origin, PHP_URL_HOST);
    $host = strtolower((string)preg_replace('/:[0-9]+$/', '', (string)($_SERVER['HTTP_HOST'] ?? '')));
    if (!is_string($originHost) || strtolower($originHost) !== $host) {
        blogFail(403, 'Cross-origin request blocked');
    }
}

function blogAdminSetCookie($value, $expires) {
    setcookie('wnx_admin', $value, [
        'expires'  => $expires,
        'path'     => '/',
        'secure'   => blogIsHttps(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

/** Validate the admin session cookie (+ CSRF header on writes). Exits with 503/401/403 on failure; returns the session row. */
function blogAdminAuth($method) {
    if (!blogAdminConfigured()) {
        blogFail(503, 'Admin is not configured');
    }
    blogAdminOriginCheck($method);

    $token = (isset($_COOKIE['wnx_admin']) && is_string($_COOKIE['wnx_admin'])) ? $_COOKIE['wnx_admin'] : '';
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
        blogFail(401, 'Not authenticated');
    }
    $session = Database::queryOne(
        "SELECT token_hash, csrf, expires_at FROM admin_sessions WHERE token_hash = ? AND expires_at > ?",
        [hash('sha256', $token), blogNow()]
    );
    if (!$session) {
        blogFail(401, 'Not authenticated');
    }

    if ($method !== 'GET' && $method !== 'HEAD') {
        $sent = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        if (!is_string($sent) || $sent === '' || !hash_equals((string)$session['csrf'], $sent)) {
            blogFail(403, 'Invalid CSRF token');
        }
    }
    return $session;
}

function handleAdminLogin($method, $data) {
    blogBoot(true);
    blogMethodCheck($method, ['POST']);
    if (!blogAdminConfigured()) {
        blogFail(503, 'Admin is not configured');
    }
    blogAdminOriginCheck($method);
    if (!is_array($data)) {
        $data = [];
    }

    $ip = blogClientIp();
    if ($ip === '') {
        $ip = '0.0.0.0';
    }

    // Opportunistic clean-up of expired sessions and old attempts
    Database::execute("DELETE FROM admin_sessions WHERE expires_at < ?", [blogNow()]);
    Database::execute("DELETE FROM admin_login_attempts WHERE created_at < ?", [gmdate('Y-m-d H:i:s', time() - 86400)]);

    // Rate limit: 5 failed attempts / 15 minutes / IP
    $recent = Database::queryOne(
        "SELECT COUNT(*) AS total FROM admin_login_attempts WHERE ip = ? AND created_at > ?",
        [$ip, gmdate('Y-m-d H:i:s', time() - 900)]
    );
    if ($recent && (int)$recent['total'] >= 5) {
        header('Retry-After: 900');
        blogFail(429, 'Too many login attempts. Please try again later.');
    }

    $email = strtolower(blogText($data, 'email'));
    $password = (isset($data['password']) && is_string($data['password'])) ? $data['password'] : '';
    if (strlen($password) > 1024) {
        $password = '';
    }

    // Always run both checks (constant-time email compare + password_verify) so timing does not reveal which was wrong
    $emailOk = hash_equals(hash('sha256', strtolower(trim((string)ADMIN_EMAIL))), hash('sha256', $email));
    $passOk = password_verify($password, (string)ADMIN_PASSWORD_HASH);

    if (!($emailOk && $passOk)) {
        Database::insert("INSERT INTO admin_login_attempts (ip, created_at) VALUES (?, ?)", [$ip, blogNow()]);
        blogFail(401, 'Invalid email or password');
    }

    // Session fixation hygiene: drop any session presented with this request, always issue a brand-new token
    if (isset($_COOKIE['wnx_admin']) && is_string($_COOKIE['wnx_admin']) && preg_match('/^[a-f0-9]{64}$/', $_COOKIE['wnx_admin'])) {
        Database::execute("DELETE FROM admin_sessions WHERE token_hash = ?", [hash('sha256', $_COOKIE['wnx_admin'])]);
    }

    $token = bin2hex(random_bytes(32));
    $csrf = bin2hex(random_bytes(16));
    $ttl = 12 * 3600;
    $result = Database::insert(
        "INSERT INTO admin_sessions (token_hash, csrf, expires_at, ip, created_at) VALUES (?, ?, ?, ?, ?)",
        [hash('sha256', $token), $csrf, gmdate('Y-m-d H:i:s', time() + $ttl), $ip, blogNow()]
    );
    if ($result === null) {
        blogFail(500, 'Could not start a session');
    }

    blogAdminSetCookie($token, time() + $ttl);
    blogJson(200, ['ok' => true, 'email' => (string)ADMIN_EMAIL, 'csrf' => $csrf]);
}

function handleAdminLogout($method) {
    blogBoot(true);
    blogMethodCheck($method, ['POST']);
    $session = blogAdminAuth($method);
    Database::execute("DELETE FROM admin_sessions WHERE token_hash = ?", [$session['token_hash']]);
    blogAdminSetCookie('', time() - 3600);
    blogJson(200, ['ok' => true]);
}

function handleAdminMe($method) {
    blogBoot(true);
    blogMethodCheck($method, ['GET']);
    $session = blogAdminAuth($method);
    blogJson(200, ['ok' => true, 'email' => (string)ADMIN_EMAIL, 'csrf' => $session['csrf']]);
}

// ====================================
// BLOG: FORMATTERS
// ====================================

function blogPostColumns($withContent) {
    $cols = "id, slug, title, excerpt, category, layout, cover_image, meta_title, meta_description, author, read_minutes, status, is_trending, is_featured, published_at, created_at, updated_at";
    return $withContent ? $cols . ", content" : $cols;
}

function blogFormatPost($r, $withContent, $admin = false) {
    $p = [
        'id'           => $r['id'],
        'slug'         => $r['slug'],
        'title'        => $r['title'],
        'excerpt'      => (string)$r['excerpt'],
        'category'     => $r['category'],
        'layout'       => in_array($r['layout'] ?? '', BLOG_LAYOUTS, true) ? $r['layout'] : 'style1',
        'cover_image'  => ($r['cover_image'] === null || $r['cover_image'] === '') ? null : $r['cover_image'],
        'meta_title'   => ($r['meta_title'] ?? '') === '' ? null : $r['meta_title'],
        'meta_description' => ($r['meta_description'] ?? '') === '' ? null : $r['meta_description'],
        'author'       => $r['author'],
        'read_minutes' => (int)$r['read_minutes'],
        'published_at' => blogIso($r['published_at']),
        'is_trending'  => ((int)$r['is_trending'] === 1),
        'is_featured'  => ((int)$r['is_featured'] === 1),
        'status'       => $r['status'],
    ];
    if ($admin) {
        $p['created_at'] = blogIso($r['created_at']);
        $p['updated_at'] = blogIso($r['updated_at']);
    }
    if ($withContent) {
        $p['content'] = (string)$r['content'];
    }
    return $p;
}

function blogFormatVideo($r, $admin = false) {
    $v = [
        'id'          => $r['id'],
        'title'       => $r['title'],
        'url'         => $r['url'],
        'thumbnail'   => ($r['thumbnail'] === null || $r['thumbnail'] === '') ? null : $r['thumbnail'],
        'description' => (string)$r['description'],
        'duration'    => (string)$r['duration'],
        'is_featured' => ((int)$r['is_featured'] === 1),
    ];
    if ($admin) {
        $v['sort_order'] = (int)$r['sort_order'];
        $v['status'] = $r['status'];
        $v['created_at'] = blogIso($r['created_at']);
        $v['updated_at'] = blogIso($r['updated_at']);
    }
    return $v;
}

// ====================================
// BLOG: PUBLIC HANDLERS
// ====================================

function handleBlogPosts($method, $query) {
    blogBoot(false);
    blogMethodCheck($method, ['GET']);

    $limit = blogIntParam($query, 'limit', 9, 1, 50);
    $offset = blogIntParam($query, 'offset', 0, 0, 1000000);
    $category = blogStrParam($query, 'category', 60);
    $q = blogStrParam($query, 'q', 100);
    $sort = blogStrParam($query, 'sort', 10) === 'oldest' ? 'oldest' : 'newest';

    $now = blogNow();
    $where = ["status = 'published'", "published_at IS NOT NULL", "published_at <= ?"];
    $params = [$now];
    if ($category !== '' && strtolower($category) !== 'all') {
        $where[] = "category = ?";
        $params[] = $category;
    }
    if ($q !== '') {
        $where[] = "(title LIKE ? ESCAPE '!' OR excerpt LIKE ? ESCAPE '!')";
        $params[] = blogLike($q);
        $params[] = blogLike($q);
    }
    $whereSql = implode(' AND ', $where);
    $order = ($sort === 'oldest')
        ? "published_at ASC, created_at ASC, id ASC"
        : "published_at DESC, created_at DESC, id DESC";

    $rows = Database::query(
        "SELECT " . blogPostColumns(false) . " FROM blog_posts WHERE $whereSql ORDER BY $order LIMIT ? OFFSET ?",
        array_merge($params, [$limit, $offset])
    );
    $count = Database::queryOne("SELECT COUNT(*) AS total FROM blog_posts WHERE $whereSql", $params);
    $cats = Database::query(
        "SELECT DISTINCT category FROM blog_posts WHERE status = 'published' AND published_at IS NOT NULL AND published_at <= ? ORDER BY category ASC",
        [$now]
    );
    if ($rows === null || $count === null || $cats === null) {
        blogFail(500, 'Failed to load posts');
    }

    $items = [];
    foreach ($rows as $r) {
        $items[] = blogFormatPost($r, false);
    }
    $categories = [];
    foreach ($cats as $c) {
        $categories[] = $c['category'];
    }

    header('Cache-Control: public, max-age=60');
    blogJson(200, [
        'items'      => $items,
        'total'      => (int)($count['total'] ?? 0),
        'categories' => $categories,
    ]);
}

function handleBlogTrending($method) {
    blogBoot(false);
    blogMethodCheck($method, ['GET']);

    $now = blogNow();
    $base = "status = 'published' AND published_at IS NOT NULL AND published_at <= ?";

    $featuredRow = Database::queryOne(
        "SELECT " . blogPostColumns(false) . " FROM blog_posts WHERE $base AND is_featured = 1 ORDER BY published_at DESC, id DESC LIMIT 1",
        [$now]
    );
    // Trending cards exclude the featured post so it is never shown twice
    $rows = Database::query(
        "SELECT " . blogPostColumns(false) . " FROM blog_posts WHERE $base AND is_trending = 1 AND is_featured = 0 ORDER BY published_at DESC, id DESC LIMIT 3",
        [$now]
    );
    if ($rows === null) {
        blogFail(500, 'Failed to load posts');
    }

    $items = [];
    foreach ($rows as $r) {
        $items[] = blogFormatPost($r, false);
    }

    header('Cache-Control: public, max-age=60');
    blogJson(200, [
        'featured' => $featuredRow ? blogFormatPost($featuredRow, false) : null,
        'items'    => $items,
    ]);
}

function handleBlogPost($method, $query) {
    blogBoot(false);
    blogMethodCheck($method, ['GET']);

    $slug = blogStrParam($query, 'slug', 190);
    if ($slug === '' || !preg_match('/^[a-z0-9\-]+$/', $slug)) {
        blogFail(404, 'Post not found');
    }
    $row = Database::queryOne(
        "SELECT " . blogPostColumns(true) . " FROM blog_posts WHERE slug = ? AND status = 'published' AND published_at IS NOT NULL AND published_at <= ?",
        [$slug, blogNow()]
    );
    if (!$row) {
        blogFail(404, 'Post not found');
    }

    header('Cache-Control: public, max-age=60');
    blogJson(200, blogFormatPost($row, true));
}

function handleBlogVideos($method) {
    blogBoot(false);
    blogMethodCheck($method, ['GET']);

    $rows = Database::query(
        "SELECT id, title, url, thumbnail, description, duration, is_featured, sort_order, status, created_at, updated_at
         FROM blog_videos WHERE status = 'published' ORDER BY sort_order ASC, created_at DESC, id ASC LIMIT 100"
    );
    if ($rows === null) {
        blogFail(500, 'Failed to load videos');
    }

    $featured = null;
    $items = [];
    foreach ($rows as $r) {
        $v = blogFormatVideo($r);
        if ($featured === null && $v['is_featured']) {
            $featured = $v; // first featured video by sort order; the rest go to the list
        } else {
            $items[] = $v;
        }
    }

    header('Cache-Control: public, max-age=60');
    blogJson(200, ['featured' => $featured, 'items' => $items]);
}

function handleBlogSubscribe($method, $data) {
    blogBoot(false);
    blogMethodCheck($method, ['POST']);
    if (!is_array($data)) {
        $data = [];
    }

    // Honeypot: real visitors never fill this hidden field. Pretend success, store nothing.
    if (isset($data['website']) && (!is_scalar($data['website']) || trim((string)$data['website']) !== '')) {
        blogJson(201, ['ok' => true]);
        return;
    }

    $email = strtolower(blogText($data, 'email'));
    if ($email === '' || strlen($email) > 190 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        blogFail(400, 'A valid email address is required');
    }
    $source = blogText($data, 'source');
    if (!in_array($source, ['hero', 'footer-form'], true)) {
        $source = 'hero';
    }

    // Basic abuse limit: max 5 new subscriptions per IP per hour
    $ip = blogClientIp();
    if ($ip !== '') {
        $recent = Database::queryOne(
            "SELECT COUNT(*) AS total FROM blog_subscribers WHERE ip_address = ? AND created_at > ?",
            [$ip, gmdate('Y-m-d H:i:s', time() - 3600)]
        );
        if ($recent && (int)$recent['total'] >= 5) {
            blogFail(429, 'Too many requests. Please try again later.');
        }
    }

    // Duplicates answer exactly like new sign-ups (no way to probe which emails are subscribed)
    $existing = Database::queryOne("SELECT id, unsubscribed_at FROM blog_subscribers WHERE email = ?", [$email]);
    if ($existing) {
        if ($existing['unsubscribed_at'] !== null) {
            Database::execute("UPDATE blog_subscribers SET unsubscribed_at = NULL WHERE id = ?", [$existing['id']]);
        }
        blogJson(201, ['ok' => true]);
        return;
    }

    try {
        $result = Database::insert(
            "INSERT INTO blog_subscribers (id, email, source, ip_address, created_at) VALUES (?, ?, ?, ?, ?)",
            [Database::generateUUID(), $email, $source, $ip !== '' ? $ip : null, blogNow()]
        );
    } catch (Throwable $e) {
        // Most likely a concurrent duplicate hitting the UNIQUE index
        error_log('Blog subscribe insert failed: ' . $e->getMessage());
        $result = Database::queryOne("SELECT id FROM blog_subscribers WHERE email = ?", [$email]) ? 0 : null;
    }

    if ($result !== null) {
        blogJson(201, ['ok' => true]);
    } else {
        blogFail(500, 'Failed to subscribe. Please try again later.');
    }
}

// ====================================
// BLOG ADMIN: POSTS
// ====================================

/**
 * Validate + normalise the writable fields of a post (whitelist: nothing else from the body is ever used).
 * $existing = current DB row on update, null on create.
 * Returns [fields, error]; fields only holds columns that should be written.
 */
function blogCollectPostFields($data, $existing) {
    $isNew = ($existing === null);
    $f = [];

    if ($isNew || array_key_exists('title', $data)) {
        $title = blogText($data, 'title');
        if ($title === '' || mb_strlen($title) > 200) {
            return [null, 'Title is required (max 200 characters)'];
        }
        $f['title'] = $title;
    }
    if (array_key_exists('excerpt', $data)) {
        $excerpt = blogText($data, 'excerpt');
        if (mb_strlen($excerpt) > 1000) {
            return [null, 'Excerpt must be at most 1000 characters'];
        }
        $f['excerpt'] = $excerpt;
    }
    if (array_key_exists('content', $data)) {
        $raw = (isset($data['content']) && is_string($data['content'])) ? $data['content'] : '';
        if (strlen($raw) > 500000) {
            return [null, 'Content is too long (max 500,000 characters)'];
        }
        $f['content'] = blogSanitizeHtml($raw);
    }
    if ($isNew || array_key_exists('category', $data)) {
        $category = blogText($data, 'category');
        if ($category === '') {
            $category = 'General';
        }
        if (mb_strlen($category) > 60) {
            return [null, 'Category must be at most 60 characters'];
        }
        $f['category'] = $category;
    }
    if (array_key_exists('layout', $data)) {
        $layout = blogText($data, 'layout');
        if ($layout === '') {
            $layout = 'style1';
        }
        if (!in_array($layout, BLOG_LAYOUTS, true)) {
            return [null, 'layout must be one of style1, style2, style3, style4, style5'];
        }
        $f['layout'] = $layout;
    }
    if (array_key_exists('cover_image', $data)) {
        $cover = blogText($data, 'cover_image');
        if (!blogValidImageRef($cover)) {
            return [null, 'Cover image must be an uploaded file path (/uploads/blog/...) or an https URL'];
        }
        $f['cover_image'] = $cover !== '' ? $cover : null;
    }
    foreach (['meta_title' => 255, 'meta_description' => 320] as $metaKey => $metaMax) {
        if (array_key_exists($metaKey, $data)) {
            $metaVal = blogText($data, $metaKey);
            if (mb_strlen($metaVal) > $metaMax) {
                return [null, $metaKey . ' must be at most ' . $metaMax . ' characters'];
            }
            $f[$metaKey] = $metaVal !== '' ? $metaVal : null;
        }
    }
    if ($isNew || array_key_exists('author', $data)) {
        $author = blogText($data, 'author');
        if ($author === '') {
            $author = 'WealthNX Team';
        }
        if (mb_strlen($author) > 100) {
            return [null, 'Author must be at most 100 characters'];
        }
        $f['author'] = $author;
    }
    if ($isNew || array_key_exists('status', $data)) {
        $status = blogText($data, 'status');
        if ($status === '') {
            $status = $isNew ? 'draft' : (string)$existing['status'];
        }
        if ($status !== 'draft' && $status !== 'published') {
            return [null, 'Status must be "draft" or "published"'];
        }
        $f['status'] = $status;
    }
    if (array_key_exists('is_trending', $data)) {
        $f['is_trending'] = blogBool($data['is_trending']);
    }
    if (array_key_exists('is_featured', $data)) {
        $f['is_featured'] = blogBool($data['is_featured']);
    }
    if (array_key_exists('published_at', $data) && blogText($data, 'published_at') !== '') {
        $pub = blogParseDate(blogText($data, 'published_at'));
        if ($pub === null) {
            return [null, 'published_at must be a valid ISO 8601 date'];
        }
        $f['published_at'] = $pub;
    }
    if (array_key_exists('read_minutes', $data) && blogText($data, 'read_minutes') !== '') {
        $rm = blogText($data, 'read_minutes');
        if (!preg_match('/^[0-9]{1,3}$/', $rm) || (int)$rm < 1) {
            return [null, 'read_minutes must be a whole number between 1 and 999'];
        }
        $f['read_minutes'] = (int)$rm;
    }

    // Derived values
    $finalContent = array_key_exists('content', $f) ? $f['content'] : ($isNew ? '' : (string)$existing['content']);
    if (!isset($f['read_minutes']) && ($isNew || array_key_exists('content', $f))) {
        $f['read_minutes'] = blogEstimateMinutes($finalContent);
    }
    if ($isNew && (!isset($f['excerpt']) || $f['excerpt'] === '') && $finalContent !== '') {
        $plain = blogPlainText($finalContent);
        $f['excerpt'] = mb_strlen($plain) > 200 ? rtrim(mb_substr($plain, 0, 200)) . '...' : $plain;
    }

    $finalStatus = isset($f['status']) ? $f['status'] : (string)$existing['status'];
    if ($finalStatus === 'published') {
        if (blogPlainText($finalContent) === '' && stripos($finalContent, '<img') === false) {
            return [null, 'Content is required to publish a post'];
        }
        $finalPub = isset($f['published_at']) ? $f['published_at'] : ($isNew ? null : $existing['published_at']);
        if ($finalPub === null || $finalPub === '') {
            $f['published_at'] = blogNow();
        }
    }

    return [$f, null];
}

function blogLoadPost($id) {
    return Database::queryOne("SELECT " . blogPostColumns(true) . " FROM blog_posts WHERE id = ?", [$id]);
}

function blogAdminListPosts($query) {
    $limit = blogIntParam($query, 'limit', 20, 1, 50);
    $offset = blogIntParam($query, 'offset', 0, 0, 1000000);
    $status = blogStrParam($query, 'status', 10);
    $q = blogStrParam($query, 'q', 100);

    $where = ['1 = 1'];
    $params = [];
    if ($status === 'draft' || $status === 'published') {
        $where[] = "status = ?";
        $params[] = $status;
    }
    if ($q !== '') {
        $where[] = "(title LIKE ? ESCAPE '!' OR excerpt LIKE ? ESCAPE '!' OR category LIKE ? ESCAPE '!')";
        $params[] = blogLike($q);
        $params[] = blogLike($q);
        $params[] = blogLike($q);
    }
    $whereSql = implode(' AND ', $where);

    $rows = Database::query(
        "SELECT " . blogPostColumns(false) . " FROM blog_posts WHERE $whereSql ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?",
        array_merge($params, [$limit, $offset])
    );
    $count = Database::queryOne("SELECT COUNT(*) AS total FROM blog_posts WHERE $whereSql", $params);
    if ($rows === null || $count === null) {
        blogFail(500, 'Failed to load posts');
    }
    $items = [];
    foreach ($rows as $r) {
        $items[] = blogFormatPost($r, false, true);
    }
    blogJson(200, ['items' => $items, 'total' => (int)($count['total'] ?? 0), 'limit' => $limit, 'offset' => $offset]);
}

function blogAdminCreatePost($data) {
    if (!is_array($data)) {
        $data = [];
    }
    list($f, $err) = blogCollectPostFields($data, null);
    if ($err !== null) {
        blogFail(400, $err);
    }

    // Slug: explicit one must be free (409), otherwise generated from the title with -2, -3 ... suffix
    $id = Database::generateUUID();
    $explicit = blogSlugify(blogText($data, 'slug'));
    if (blogText($data, 'slug') !== '') {
        if ($explicit === '') {
            blogFail(400, 'Slug may only contain letters and numbers');
        }
        if (blogSlugTaken($explicit, '')) {
            blogFail(409, 'This slug is already in use');
        }
        $f['slug'] = $explicit;
    } else {
        $f['slug'] = blogUniqueSlug(blogSlugify($f['title']), '');
    }

    $now = blogNow();
    $makeFeatured = isset($f['is_featured']) && $f['is_featured'] === 1;

    Database::beginTransaction();
    try {
        if ($makeFeatured) {
            if (Database::execute("UPDATE blog_posts SET is_featured = 0 WHERE is_featured = 1") === false) {
                throw new Exception('Could not clear featured flag');
            }
        }
        $result = Database::insert(
            "INSERT INTO blog_posts (id, slug, title, excerpt, content, category, layout, cover_image, meta_title, meta_description, author, read_minutes, status, is_trending, is_featured, published_at, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $id,
                $f['slug'],
                $f['title'],
                isset($f['excerpt']) ? $f['excerpt'] : '',
                isset($f['content']) ? $f['content'] : '',
                $f['category'],
                isset($f['layout']) ? $f['layout'] : 'style1',
                isset($f['cover_image']) ? $f['cover_image'] : null,
                isset($f['meta_title']) ? $f['meta_title'] : null,
                isset($f['meta_description']) ? $f['meta_description'] : null,
                $f['author'],
                (int)$f['read_minutes'],
                $f['status'],
                isset($f['is_trending']) ? (int)$f['is_trending'] : 0,
                isset($f['is_featured']) ? (int)$f['is_featured'] : 0,
                isset($f['published_at']) ? $f['published_at'] : null,
                $now,
                $now,
            ]
        );
        if ($result === null) {
            throw new Exception('Insert failed');
        }
        Database::commit();
    } catch (Throwable $e) {
        Database::rollback();
        error_log('Blog create post failed: ' . $e->getMessage());
        if (blogSlugTaken($f['slug'], '')) {
            blogFail(409, 'This slug is already in use');
        }
        blogFail(500, 'Failed to create post');
    }

    $row = blogLoadPost($id);
    blogJson(201, $row ? blogFormatPost($row, true, true) : ['id' => $id]);
}

function blogAdminUpdatePost($data) {
    if (!is_array($data)) {
        $data = [];
    }
    $id = isset($data['id']) && is_string($data['id']) ? trim($data['id']) : '';
    if (!blogValidId($id)) {
        blogFail(400, 'A valid post id is required');
    }
    $existing = blogLoadPost($id);
    if (!$existing) {
        blogFail(404, 'Post not found');
    }

    list($f, $err) = blogCollectPostFields($data, $existing);
    if ($err !== null) {
        blogFail(400, $err);
    }

    if (array_key_exists('slug', $data) && blogText($data, 'slug') !== '') {
        $slug = blogSlugify(blogText($data, 'slug'));
        if ($slug === '') {
            blogFail(400, 'Slug may only contain letters and numbers');
        }
        if ($slug !== $existing['slug']) {
            if (blogSlugTaken($slug, $id)) {
                blogFail(409, 'This slug is already in use');
            }
            $f['slug'] = $slug;
        }
    }

    if (empty($f)) {
        blogJson(200, blogFormatPost($existing, true, true));
        return;
    }

    $sets = [];
    $params = [];
    foreach ($f as $col => $val) { // $col comes from the fixed whitelist built above, never from input
        $sets[] = "`" . $col . "` = ?";
        $params[] = $val;
    }
    $sets[] = "`updated_at` = ?";
    $params[] = blogNow();
    $params[] = $id;

    $makeFeatured = isset($f['is_featured']) && $f['is_featured'] === 1;

    Database::beginTransaction();
    try {
        if ($makeFeatured) {
            if (Database::execute("UPDATE blog_posts SET is_featured = 0 WHERE is_featured = 1 AND id <> ?", [$id]) === false) {
                throw new Exception('Could not clear featured flag');
            }
        }
        if (Database::execute("UPDATE blog_posts SET " . implode(', ', $sets) . " WHERE id = ?", $params) === false) {
            throw new Exception('Update failed');
        }
        Database::commit();
    } catch (Throwable $e) {
        Database::rollback();
        error_log('Blog update post failed: ' . $e->getMessage());
        if (isset($f['slug']) && blogSlugTaken($f['slug'], $id)) {
            blogFail(409, 'This slug is already in use');
        }
        blogFail(500, 'Failed to update post');
    }

    $row = blogLoadPost($id);
    blogJson(200, $row ? blogFormatPost($row, true, true) : ['id' => $id]);
}

function blogAdminDeleteById($table, $query, $label) {
    $id = blogStrParam($query, 'id', 40);
    if (!blogValidId($id)) {
        blogFail(400, 'A valid id is required');
    }
    // $table is one of three fixed literals chosen by the callers below
    $affected = Database::execute("DELETE FROM " . $table . " WHERE id = ?", [$id]);
    if ($affected === false) {
        blogFail(500, 'Failed to delete ' . $label);
    }
    if ($affected < 1) {
        blogFail(404, ucfirst($label) . ' not found');
    }
    blogJson(200, ['ok' => true]);
}

function handleAdminPosts($method, $query, $data) {
    blogBoot(true);
    blogMethodCheck($method, ['GET', 'POST', 'PUT', 'DELETE']);
    blogAdminAuth($method);

    if ($method === 'GET') {
        blogAdminListPosts($query);
    } elseif ($method === 'POST') {
        blogAdminCreatePost($data);
    } elseif ($method === 'PUT') {
        blogAdminUpdatePost($data);
    } else {
        blogAdminDeleteById('blog_posts', $query, 'post');
    }
}

function handleAdminPost($method, $query) {
    blogBoot(true);
    blogMethodCheck($method, ['GET']);
    blogAdminAuth($method);

    $id = blogStrParam($query, 'id', 40);
    if (!blogValidId($id)) {
        blogFail(400, 'A valid post id is required');
    }
    $row = blogLoadPost($id);
    if (!$row) {
        blogFail(404, 'Post not found');
    }
    blogJson(200, blogFormatPost($row, true, true));
}

// ====================================
// BLOG ADMIN: VIDEOS
// ====================================

function blogLoadVideo($id) {
    return Database::queryOne(
        "SELECT id, title, url, thumbnail, description, duration, is_featured, sort_order, status, created_at, updated_at FROM blog_videos WHERE id = ?",
        [$id]
    );
}

function blogCollectVideoFields($data, $existing) {
    $isNew = ($existing === null);
    $f = [];

    if ($isNew || array_key_exists('title', $data)) {
        $title = blogText($data, 'title');
        if ($title === '' || mb_strlen($title) > 200) {
            return [null, 'Title is required (max 200 characters)'];
        }
        $f['title'] = $title;
    }
    if ($isNew || array_key_exists('url', $data)) {
        $url = blogText($data, 'url');
        if (!blogValidVideoUrl($url)) {
            return [null, 'Video URL must be a valid YouTube link (max 255 characters)'];
        }
        $f['url'] = $url;
    }
    if (array_key_exists('thumbnail', $data)) {
        $thumb = blogText($data, 'thumbnail');
        if (!blogValidImageRef($thumb)) {
            return [null, 'Thumbnail must be an uploaded file path (/uploads/blog/...) or an https URL'];
        }
        $f['thumbnail'] = $thumb !== '' ? $thumb : null;
    }
    if (array_key_exists('description', $data)) {
        $desc = blogText($data, 'description');
        if (mb_strlen($desc) > 1000) {
            return [null, 'Description must be at most 1000 characters'];
        }
        $f['description'] = $desc;
    }
    if (array_key_exists('duration', $data)) {
        $dur = blogText($data, 'duration');
        if ($dur !== '' && !preg_match('/^[0-9]{1,2}(:[0-9]{2}){1,2}$/', $dur)) {
            return [null, 'Duration must look like 4:32 or 1:02:10'];
        }
        $f['duration'] = $dur !== '' ? $dur : null;
    }
    if (array_key_exists('is_featured', $data)) {
        $f['is_featured'] = blogBool($data['is_featured']);
    }
    if (array_key_exists('sort_order', $data) && blogText($data, 'sort_order') !== '') {
        $so = blogText($data, 'sort_order');
        if (!preg_match('/^-?[0-9]{1,6}$/', $so)) {
            return [null, 'sort_order must be a whole number'];
        }
        $f['sort_order'] = (int)$so;
    }
    if ($isNew || array_key_exists('status', $data)) {
        $status = blogText($data, 'status');
        if ($status === '') {
            $status = $isNew ? 'draft' : (string)$existing['status'];
        }
        if ($status !== 'draft' && $status !== 'published') {
            return [null, 'Status must be "draft" or "published"'];
        }
        $f['status'] = $status;
    }
    return [$f, null];
}

function blogAdminListVideos($query) {
    $limit = blogIntParam($query, 'limit', 50, 1, 50);
    $offset = blogIntParam($query, 'offset', 0, 0, 1000000);
    $rows = Database::query(
        "SELECT id, title, url, thumbnail, description, duration, is_featured, sort_order, status, created_at, updated_at
         FROM blog_videos ORDER BY sort_order ASC, created_at DESC, id ASC LIMIT ? OFFSET ?",
        [$limit, $offset]
    );
    $count = Database::queryOne("SELECT COUNT(*) AS total FROM blog_videos");
    if ($rows === null || $count === null) {
        blogFail(500, 'Failed to load videos');
    }
    $items = [];
    foreach ($rows as $r) {
        $items[] = blogFormatVideo($r, true);
    }
    blogJson(200, ['items' => $items, 'total' => (int)($count['total'] ?? 0), 'limit' => $limit, 'offset' => $offset]);
}

function blogAdminCreateVideo($data) {
    if (!is_array($data)) {
        $data = [];
    }
    list($f, $err) = blogCollectVideoFields($data, null);
    if ($err !== null) {
        blogFail(400, $err);
    }

    $id = Database::generateUUID();
    $now = blogNow();
    $makeFeatured = isset($f['is_featured']) && $f['is_featured'] === 1;

    Database::beginTransaction();
    try {
        if ($makeFeatured) {
            if (Database::execute("UPDATE blog_videos SET is_featured = 0 WHERE is_featured = 1") === false) {
                throw new Exception('Could not clear featured flag');
            }
        }
        $result = Database::insert(
            "INSERT INTO blog_videos (id, title, url, thumbnail, description, duration, is_featured, sort_order, status, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $id,
                $f['title'],
                $f['url'],
                isset($f['thumbnail']) ? $f['thumbnail'] : null,
                isset($f['description']) ? $f['description'] : '',
                isset($f['duration']) ? $f['duration'] : null,
                isset($f['is_featured']) ? (int)$f['is_featured'] : 0,
                isset($f['sort_order']) ? (int)$f['sort_order'] : 0,
                $f['status'],
                $now,
                $now,
            ]
        );
        if ($result === null) {
            throw new Exception('Insert failed');
        }
        Database::commit();
    } catch (Throwable $e) {
        Database::rollback();
        error_log('Blog create video failed: ' . $e->getMessage());
        blogFail(500, 'Failed to create video');
    }

    $row = blogLoadVideo($id);
    blogJson(201, $row ? blogFormatVideo($row, true) : ['id' => $id]);
}

function blogAdminUpdateVideo($data) {
    if (!is_array($data)) {
        $data = [];
    }
    $id = isset($data['id']) && is_string($data['id']) ? trim($data['id']) : '';
    if (!blogValidId($id)) {
        blogFail(400, 'A valid video id is required');
    }
    $existing = blogLoadVideo($id);
    if (!$existing) {
        blogFail(404, 'Video not found');
    }
    list($f, $err) = blogCollectVideoFields($data, $existing);
    if ($err !== null) {
        blogFail(400, $err);
    }
    if (empty($f)) {
        blogJson(200, blogFormatVideo($existing, true));
        return;
    }

    $sets = [];
    $params = [];
    foreach ($f as $col => $val) { // fixed whitelist of column names
        $sets[] = "`" . $col . "` = ?";
        $params[] = $val;
    }
    $sets[] = "`updated_at` = ?";
    $params[] = blogNow();
    $params[] = $id;

    $makeFeatured = isset($f['is_featured']) && $f['is_featured'] === 1;

    Database::beginTransaction();
    try {
        if ($makeFeatured) {
            if (Database::execute("UPDATE blog_videos SET is_featured = 0 WHERE is_featured = 1 AND id <> ?", [$id]) === false) {
                throw new Exception('Could not clear featured flag');
            }
        }
        if (Database::execute("UPDATE blog_videos SET " . implode(', ', $sets) . " WHERE id = ?", $params) === false) {
            throw new Exception('Update failed');
        }
        Database::commit();
    } catch (Throwable $e) {
        Database::rollback();
        error_log('Blog update video failed: ' . $e->getMessage());
        blogFail(500, 'Failed to update video');
    }

    $row = blogLoadVideo($id);
    blogJson(200, $row ? blogFormatVideo($row, true) : ['id' => $id]);
}

function handleAdminVideos($method, $query, $data) {
    blogBoot(true);
    blogMethodCheck($method, ['GET', 'POST', 'PUT', 'DELETE']);
    blogAdminAuth($method);

    if ($method === 'GET') {
        blogAdminListVideos($query);
    } elseif ($method === 'POST') {
        blogAdminCreateVideo($data);
    } elseif ($method === 'PUT') {
        blogAdminUpdateVideo($data);
    } else {
        blogAdminDeleteById('blog_videos', $query, 'video');
    }
}

function handleAdminVideo($method, $query) {
    blogBoot(true);
    blogMethodCheck($method, ['GET']);
    blogAdminAuth($method);

    $id = blogStrParam($query, 'id', 40);
    if (!blogValidId($id)) {
        blogFail(400, 'A valid video id is required');
    }
    $row = blogLoadVideo($id);
    if (!$row) {
        blogFail(404, 'Video not found');
    }
    blogJson(200, blogFormatVideo($row, true));
}

// ====================================
// BLOG ADMIN: IMAGE UPLOAD
// ====================================

function handleAdminUpload($method) {
    blogBoot(true);
    blogMethodCheck($method, ['POST']);
    blogAdminAuth($method);

    if (!isset($_FILES['file']) || !is_array($_FILES['file']) || is_array($_FILES['file']['error'])) {
        blogFail(400, 'No file uploaded (multipart field name must be "file")');
    }
    $file = $_FILES['file'];
    $err = (int)$file['error'];
    if ($err === UPLOAD_ERR_INI_SIZE || $err === UPLOAD_ERR_FORM_SIZE) {
        blogFail(413, 'File is too large (max 5 MB)');
    }
    if ($err !== UPLOAD_ERR_OK) {
        blogFail(400, 'Upload failed. Please try again.');
    }
    $tmp = (string)$file['tmp_name'];
    if (!is_uploaded_file($tmp)) {
        blogFail(400, 'Upload failed. Please try again.');
    }
    $size = (int)$file['size'];
    if ($size <= 0) {
        blogFail(400, 'The uploaded file is empty');
    }
    if ($size > 5 * 1024 * 1024) {
        blogFail(413, 'File is too large (max 5 MB)');
    }
    if (!class_exists('finfo')) {
        error_log('Blog upload: fileinfo extension is not available');
        blogFail(500, 'Uploads are not available on this server');
    }

    // Trust the file contents, never the client-supplied name or MIME type
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = (string)$finfo->file($tmp);
    $extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
    if (!isset($extensions[$mime])) {
        blogFail(415, 'Only JPEG, PNG, WebP or GIF images are allowed');
    }
    $info = @getimagesize($tmp);
    if (!is_array($info) || empty($info[0]) || empty($info[1]) || !isset($info['mime']) || $info['mime'] !== $mime) {
        blogFail(415, 'The file is not a valid image');
    }
    if ($info[0] > 10000 || $info[1] > 10000) {
        blogFail(400, 'Image dimensions are too large (max 10000 px)');
    }

    $dir = __DIR__ . '/uploads/blog';
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        error_log('Blog upload: cannot create ' . $dir);
        blogFail(500, 'Could not store the file');
    }
    $name = bin2hex(random_bytes(12)) . '.' . $extensions[$mime];
    $dest = $dir . '/' . $name;
    if (!move_uploaded_file($tmp, $dest)) {
        error_log('Blog upload: move_uploaded_file failed for ' . $dest);
        blogFail(500, 'Could not store the file');
    }
    @chmod($dest, 0644);

    blogJson(201, ['url' => '/uploads/blog/' . $name]);
}

// ====================================
// BLOG ADMIN: SUBSCRIBERS
// ====================================

function blogCsvCell($value) {
    $s = (string)$value;
    // Neutralise spreadsheet formula injection
    if ($s !== '' && strpos("=+-@\t\r", $s[0]) !== false) {
        $s = "'" . $s;
    }
    return $s;
}

function handleAdminSubscribers($method, $query) {
    blogBoot(true);
    blogMethodCheck($method, ['GET', 'DELETE']);
    blogAdminAuth($method);

    if ($method === 'DELETE') {
        blogAdminDeleteById('blog_subscribers', $query, 'subscriber');
        return;
    }

    if (blogStrParam($query, 'format', 10) === 'csv') {
        $rows = Database::query(
            "SELECT id, email, source, created_at, unsubscribed_at FROM blog_subscribers ORDER BY created_at DESC, id DESC LIMIT 50000"
        );
        if ($rows === null) {
            blogFail(500, 'Failed to export subscribers');
        }
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="subscribers-' . gmdate('Y-m-d') . '.csv"');
        $out = fopen('php://output', 'w');
        fputcsv($out, ['id', 'email', 'source', 'subscribed_at', 'unsubscribed_at']);
        foreach ($rows as $r) {
            fputcsv($out, [
                blogCsvCell($r['id']),
                blogCsvCell($r['email']),
                blogCsvCell($r['source']),
                blogCsvCell(blogIso($r['created_at'])),
                blogCsvCell(blogIso($r['unsubscribed_at'])),
            ]);
        }
        fclose($out);
        return;
    }

    $limit = blogIntParam($query, 'limit', 50, 1, 50);
    $offset = blogIntParam($query, 'offset', 0, 0, 1000000);
    $rows = Database::query(
        "SELECT id, email, source, created_at, unsubscribed_at FROM blog_subscribers ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?",
        [$limit, $offset]
    );
    $count = Database::queryOne("SELECT COUNT(*) AS total FROM blog_subscribers");
    if ($rows === null || $count === null) {
        blogFail(500, 'Failed to load subscribers');
    }
    $items = [];
    foreach ($rows as $r) {
        $items[] = [
            'id'              => $r['id'],
            'email'           => $r['email'],
            'source'          => $r['source'],
            'created_at'      => blogIso($r['created_at']),
            'unsubscribed_at' => blogIso($r['unsubscribed_at']),
        ];
    }
    blogJson(200, ['items' => $items, 'total' => (int)($count['total'] ?? 0), 'limit' => $limit, 'offset' => $offset]);
}
