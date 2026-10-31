-- ====================================
-- WealthNX MySQL Database Schema
-- For GoDaddy Deluxe Shared Hosting
-- ====================================

-- Create Database (if not exists)
CREATE DATABASE IF NOT EXISTS wealthnx_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wealthnx_db;

-- ====================================
-- 1. CONTACTS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS contacts (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 2. WISHLISTS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS wishlists (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES contacts(email) ON DELETE CASCADE,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 3. EMAIL_METAS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS email_metas (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  priority VARCHAR(50) DEFAULT 'None',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES contacts(email) ON DELETE CASCADE,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 4. EMAIL_STATUSES TABLE (Email Tracking)
-- ====================================
CREATE TABLE IF NOT EXISTS email_statuses (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  token VARCHAR(255) NOT NULL UNIQUE,
  sent_at TIMESTAMP NULL,
  delivered_at TIMESTAMP NULL,
  opened_at TIMESTAMP NULL,
  clicked_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES contacts(email) ON DELETE CASCADE,
  INDEX idx_email (email),
  INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 5. SUPPORT_QUERIES TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS support_queries (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  total_queries INT DEFAULT 1,
  last_query_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES contacts(email) ON DELETE CASCADE,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 6. SUPPORT_QUERY_ITEMS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS support_query_items (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  query_id CHAR(36) NOT NULL,
  question LONGTEXT NOT NULL,
  response LONGTEXT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  asked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP NULL,
  responded_by VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (query_id) REFERENCES support_queries(id) ON DELETE CASCADE,
  INDEX idx_query_id (query_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 7. COOKIE_CONSENTS TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS cookie_consents (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  action VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45) NULL,
  country VARCHAR(100) NULL,
  city VARCHAR(100) NULL,
  page VARCHAR(255) NULL,
  user_agent LONGTEXT NULL,
  referrer VARCHAR(255) DEFAULT 'Direct',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_timestamp (timestamp),
  INDEX idx_action (action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- FEEDBACK TABLE
-- ====================================
CREATE TABLE IF NOT EXISTS feedback (
  id          CHAR(36)     PRIMARY KEY DEFAULT (UUID()),
  agent       VARCHAR(100) NOT NULL,
  rating      TINYINT      NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message     TEXT         NULL,
  page        VARCHAR(255) NULL DEFAULT '/wealth-genie',
  ip_address  VARCHAR(45)  NULL,
  user_agent  LONGTEXT     NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_agent  (agent),
  INDEX idx_rating (rating),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- CONTACT_MESSAGES TABLE (/contact page form)
-- ====================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id          CHAR(36)     PRIMARY KEY DEFAULT (UUID()),
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(40)  NULL,
  message     TEXT         NOT NULL,
  page        VARCHAR(255) NULL,
  ip_address  VARCHAR(45)  NULL,
  user_agent  LONGTEXT     NULL,
  status      VARCHAR(30)  DEFAULT 'new',
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email   (email),
  INDEX idx_created (created_at),
  INDEX idx_status  (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- BLOG + ADMIN TABLES (see docs/BLOG_PLAN.md, docs/BLOG_API.md)
-- All datetimes are stored in UTC (written by PHP, not by NOW()).
-- ====================================

-- BLOG_POSTS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
  id           CHAR(36)     NOT NULL PRIMARY KEY,
  slug         VARCHAR(190) NOT NULL,
  title        VARCHAR(255) NOT NULL,
  excerpt      TEXT         NULL,
  content      MEDIUMTEXT   NULL,
  category     VARCHAR(60)  NOT NULL DEFAULT 'General',
  layout       VARCHAR(12)  NOT NULL DEFAULT 'style1',
  cover_image  VARCHAR(255) NULL,
  meta_title       VARCHAR(255) NULL,
  meta_description VARCHAR(320) NULL,
  author       VARCHAR(100) NOT NULL DEFAULT 'WealthNX Team',
  read_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  status       ENUM('draft','published') NOT NULL DEFAULT 'draft',
  is_trending  TINYINT(1)   NOT NULL DEFAULT 0,
  is_featured  TINYINT(1)   NOT NULL DEFAULT 0,
  published_at DATETIME     NULL,
  created_at   DATETIME     NOT NULL,
  updated_at   DATETIME     NOT NULL,
  UNIQUE KEY uq_slug (slug),
  INDEX idx_status_published (status, published_at),
  INDEX idx_category (category),
  INDEX idx_featured (is_featured),
  INDEX idx_trending (is_trending)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- MIGRATION for installs created BEFORE the "layout" column existed (safe to run twice).
-- Paste in phpMyAdmin > SQL BEFORE uploading the new api.php. Fresh installs already have the column.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'layout');
SET @s := IF(@c = 0,
  "ALTER TABLE blog_posts ADD COLUMN layout VARCHAR(12) NOT NULL DEFAULT 'style1' AFTER category",
  'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- MIGRATION: SEO title / description columns (safe to run twice). Run BEFORE importing posts or uploading the new api.php.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'meta_title');
SET @s := IF(@c = 0,
  "ALTER TABLE blog_posts ADD COLUMN meta_title VARCHAR(255) NULL AFTER cover_image, ADD COLUMN meta_description VARCHAR(320) NULL AFTER meta_title",
  'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- BLOG_VIDEOS TABLE
CREATE TABLE IF NOT EXISTS blog_videos (
  id           CHAR(36)     NOT NULL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  url          VARCHAR(255) NOT NULL,
  thumbnail    VARCHAR(255) NULL,
  description  TEXT         NULL,
  duration     VARCHAR(10)  NULL,
  is_featured  TINYINT(1)   NOT NULL DEFAULT 0,
  sort_order   INT          NOT NULL DEFAULT 0,
  status       ENUM('draft','published') NOT NULL DEFAULT 'draft',
  created_at   DATETIME     NOT NULL,
  updated_at   DATETIME     NOT NULL,
  INDEX idx_status_sort (status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- BLOG_SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS blog_subscribers (
  id              CHAR(36)     NOT NULL PRIMARY KEY,
  email           VARCHAR(190) NOT NULL,
  source          VARCHAR(30)  NOT NULL DEFAULT 'hero',
  ip_address      VARCHAR(45)  NULL,
  created_at      DATETIME     NOT NULL,
  unsubscribed_at DATETIME     NULL,
  UNIQUE KEY uq_email (email),
  INDEX idx_ip_created (ip_address, created_at),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ADMIN_SESSIONS TABLE (token_hash = SHA-256 of the cookie token; the raw token is never stored)
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash  CHAR(64)    NOT NULL PRIMARY KEY,
  csrf        CHAR(32)    NOT NULL,
  expires_at  DATETIME    NOT NULL,
  ip          VARCHAR(45) NULL,
  created_at  DATETIME    NOT NULL,
  INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ADMIN_LOGIN_ATTEMPTS TABLE (failed logins, for rate limiting)
CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ip          VARCHAR(45) NOT NULL,
  created_at  DATETIME    NOT NULL,
  INDEX idx_ip_created (ip, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- Database Setup Complete
-- ====================================
-- Next steps:
-- 1. Create a MySQL user: CREATE USER 'wealthnx_user'@'localhost' IDENTIFIED BY 'password';
-- 2. Grant privileges: GRANT ALL PRIVILEGES ON wealthnx_db.* TO 'wealthnx_user'@'localhost';
-- 3. Flush privileges: FLUSH PRIVILEGES;
-- ====================================
