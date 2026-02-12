# API Setup & Troubleshooting Guide

## Quick Start

```bash
# 1. Install dependencies
cd k:\freelance\services-elysiajs
bun i

# 2. Verify database schema
bun run setup

# 3. Apply migrations (if needed)
bun run migrate

# 4. Seed initial data
bun run seed          # Users (admin, staff, waiter1)
bun run seed:products # Menu items (~55 products)

# 5. Start development server
bun run dev
```

## Database Setup

### Current Schema
- **staff**: User accounts with permissions (fullname, username, password_hash, role, permissions, is_active)
- **products**: Menu items (name, category, description, image, price, is_available)
- **tables**: Restaurant tables (name, seats, status, qr_code)
- **orders**: Customer orders (table_id, status, total_price, created_at)
- **order_items**: Order line items (product_id, qty, price_snapshot)

### Migration Files
Located in `/drizzle/`:
- `0000_update_product_schema.sql` - Initial schema with products, orders, staff, etc.
- `0001_update_products_with_image.sql` - Adds image column to products

### Running Migrations
```bash
bun run migrate
```

If you see errors about missing columns, the migration hasn't run yet.

## API Endpoints

### Products
```
GET    /products              - List all products
GET    /products/:id          - Get single product
POST   /products              - Create product
PUT    /products/:id          - Update product
DELETE /products/:id          - Delete product
```

Request body example:
```json
{
  "name": "Pad Krapow Moo",
  "category": "Rice",
  "price": 89,
  "description": "Spicy pork with basil",
  "image": "data:image/jpeg;base64,..." (optional, Base64 encoded)
}
```

### Staff
```
GET    /staff                 - List all staff
GET    /staff/:id             - Get single staff member
POST   /staff                 - Create staff
PUT    /staff/:id             - Update staff
DELETE /staff/:id             - Delete staff
```

### Orders
```
GET    /orders                - List all orders
GET    /orders/:id            - Get single order
POST   /orders                - Create order
PUT    /orders/:id            - Update order status
DELETE /orders/:id            - Delete order
```

### Tables
```
GET    /tables                - List all tables
GET    /tables/:id            - Get single table
POST   /tables                - Create table
PUT    /tables/:id            - Update table
DELETE /tables/:id            - Delete table
```

## Troubleshooting

### Error: "Unknown column 'category' in products"
**Solution**: Run migrations
```bash
bun run migrate
```

### Error: "Module not found: crypto"
**Solution**: Already fixed in seed-products.ts - uses `randomUUID()` from crypto

### Products API returns empty
**Solution**: Seed the database
```bash
bun run seed:products
```

### Can't connect to database
**Verify connection in `drizzle.config.ts`:**
- Host: localhost
- Port: 3306
- User: root
- Password: ubis@Pass01
- Database: somkiat-mookrata

### Image upload not working in Frontend
**Note**: Images are stored as Base64 longtext in database.
- Max practical size: ~2-3MB per image (becomes ~3-4MB as Base64)
- Consider implementing proper file upload with separate storage for production

## Seed Data

### Users (via `bun run seed`)
```
Username: admin     | Password: admin123      | Role: admin
Username: staff     | Password: staff123      | Role: staff
Username: waiter1   | Password: waiter123     | Role: staff
```

### Products (via `bun run seed:products`)
~55 menu items across 8 categories:
- Rice (7 items)
- Papaya Salad (4 items)
- Drinks (15 items)
- Set Menus (5 items)
- Meat (19 items)
- Vegetables (8 items)
- Fried (12 items)
- Spicy Salad (10 items)

## Development

### Start Dev Server
```bash
bun run dev
```
Server runs on `http://localhost:3536`

### Environment
- Runtime: Bun
- Framework: Elysia
- Database: MySQL
- ORM: Drizzle

### Adding New Features
1. Update schema in `/src/db/schema/`
2. Generate migration: `drizzle-kit generate`
3. Apply migration: `bun run migrate`
4. Create service in `/src/modules/*/service.ts`
5. Add routes in `/src/modules/*/module.ts`
