#!/bin/bash
set -e

echo "🚀 Starting post-deploy setup..."

# Run migrations
echo "📦 Running database migrations..."
bun run migrate

# Run seed
echo "🌱 Seeding database..."
bun run seed

echo "📦 Seeding products..."
bun run seed:products

echo "✅ Post-deploy setup completed!"
