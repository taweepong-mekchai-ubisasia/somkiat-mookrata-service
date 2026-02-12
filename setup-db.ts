#!/usr/bin/env bun
import { db } from './src/db/client'
import { products } from './src/db/schema/product'

const setupDatabase = async () => {
  try {
    // Test if products table has all columns
    console.log('✓ Testing database connection...')
    
    // Try simple query
    const result = await db.select().from(products).limit(1)
    
    console.log('✓ Products table query successful!')
    console.log(`✓ Found ${result.length} products`)
    
    // If table is empty, it's fine
    if (result.length === 0) {
      console.log('✓ Table is empty, ready for seeding')
    }
    
    process.exit(0)
  } catch (err: any) {
    console.error('✗ Database error:', err.message)
    
    // If error mentions missing columns, suggest migration
    if (err.message.includes('Unknown column')) {
      console.error('\n⚠️  Table schema mismatch!')
      console.error('Run: bun run migrate')
    }
    
    process.exit(1)
  }
}

setupDatabase()
