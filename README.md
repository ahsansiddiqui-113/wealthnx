# WealthNX - PHP + MySQL for GoDaddy Shared Hosting

A lightweight, production-ready web application designed specifically for GoDaddy's Deluxe Shared Hosting environment.

## Overview

WealthNX is now built on **PHP + MySQL** instead of Node.js, making it perfect for GoDaddy's Deluxe Shared Hosting (which doesn't support Node.js). This architecture provides:

- **Lightweight**: No Node.js runtime needed
- **Fast**: Direct PHP execution on shared hosting
- **Cost-effective**: From $5/month GoDaddy plan (instead of $29/day Azure costs)
- **Scalable**: MySQL database with proper indexing
- **Simple**: Pure PHP with no heavy frameworks required

## Project Structure

```
.
├── api.php                          # Main API router - handles all HTTP requests
├── config.php                       # Configuration and environment setup
├── database.php                     # MySQL helper class with query builders
├── index.php                        # Frontend entry point (serves React app)
├── .htaccess                        # Apache rewrite rules for clean URLs
├── .env.php                         # Environment variables (create manually on server)
├── database.sql                     # MySQL schema and table definitions
├── index.html                       # React frontend HTML template
├── dist/                            # Built React application (static assets)
├── public/                          # Static files (images, fonts, etc.)
├── src/                             # React source code (JSX, CSS, etc.)
│   ├── components/                  # Reusable React components
│   ├── Pages/                       # Page components
│   └── ...
└── GODADDY_DEPLOYMENT_GUIDE.md     # Detailed deployment instructions
```

## Quick Start - Development

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Local web server (Apache with mod_rewrite)

### Setup

1. **Create database**
```bash
mysql -u root -p < database.sql
```

2. **Configure environment**

Create `.env.php` with your credentials:
```php
<?php
putenv('DB_NAME=wealthnx_db');
putenv('DB_USER=wealthnx_user');
putenv('DB_PASSWORD=your_password');
putenv('DB_HOST=localhost');
putenv('APP_BASE_URL=http://localhost:8000');
```

3. **Start PHP server**
```bash
php -S localhost:8000
```

4. **Build React frontend** (if modifying)
```bash
npm install
npm run build
```

5. **Access application**
```
http://localhost:8000
```

## API Endpoints

### Contacts
- `POST /api/contacts` - Create contact
- `GET /api/contacts` - List contacts
- `GET /api/contacts/{id}` - Get contact

### Wishlists
- `POST /api/wishlists` - Create wishlist
- `GET /api/wishlists` - List wishlists

### Emails
- `GET /api/emails` - List emails
- `POST /api/emails/status` - Track email events

### Support
- `POST /api/support/queries` - Create ticket
- `GET /api/support/queries` - List tickets
- `POST /api/support/queries/{id}/items` - Add question
- `PUT /api/support/queries/{id}/items/{itemId}` - Add response

### Other
- `POST /api/cookie-consent` - Record consent
- `GET /api/health` - Health check

## Deployment to GoDaddy

**See GODADDY_DEPLOYMENT_GUIDE.md for complete instructions.**

Quick summary:
1. Create MySQL database in GoDaddy cPanel
2. Import `database.sql` 
3. Upload files via FTP to `/public_html/`
4. Create `.env.php` with GoDaddy credentials
5. Update React API URLs
6. Test endpoints

## Database Schema

7 tables with proper relationships and indexes:
- `contacts` - User emails
- `wishlists` - User wishlists
- `email_metas` - Email metadata
- `email_statuses` - Delivery tracking
- `support_queries` - Support tickets
- `support_query_items` - Ticket questions
- `cookie_consents` - Consent tracking

## Making Changes

### React Frontend
```bash
cd project
npm install
npm run build
# Rebuilt files in dist/
```

### PHP API
Edit `api.php` and `database.php` directly. Test with:
```bash
curl -X POST http://localhost:8000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Performance & Security

- ✅ Prepared statements prevent SQL injection
- ✅ Input validation on all endpoints
- ✅ Proper error logging
- ✅ CORS headers configured
- ✅ Database indexes on key columns
- ✅ HTTPS-ready (set up SSL in GoDaddy)

## Cost Comparison

| Platform | Monthly Cost | Type |
|----------|-------------|------|
| GoDaddy Deluxe | $5-10 | Shared Hosting |
| Azure B1 Instance + Cosmos DB | ~$870 | Cloud VM + NoSQL |

**Savings: ~$850/month** by switching to shared hosting!

## Troubleshooting

### API returns 404
- Check `.htaccess` is uploaded
- Verify `mod_rewrite` enabled
- Check file permissions (644)

### Database connection error
- Verify credentials in `.env.php`
- Check user has proper privileges
- Confirm correct hostname

### Frontend shows blank
- Check browser console for JS errors
- Verify `/dist/` folder uploaded
- Check React build succeeded

See GODADDY_DEPLOYMENT_GUIDE.md for more solutions.

## Support

For deployment: **GODADDY_DEPLOYMENT_GUIDE.md**

For API details: **api.php** (commented)

For database: **database.sql** and **database.php**

## Technology Stack

- **Frontend**: React 18, React Router
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Server**: Apache with mod_rewrite
- **Hosting**: GoDaddy Deluxe Shared Hosting

## Migration from Azure

✅ Migrated from:
- Node.js → Pure PHP
- MongoDB → MySQL
- Sequelize ORM → Direct SQL queries
- Azure Cloud → GoDaddy Shared Hosting

All API endpoints work identically.

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Requirements**: PHP 7.4+, MySQL 5.7+