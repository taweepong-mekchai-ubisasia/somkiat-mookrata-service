import { db } from './src/db/client'
import { products } from './src/db/schema/product'

const verifySchema = async () => {
  try {
    console.log('Fetching products table info...')
    const result = await db.select().from(products).limit(1)
    console.log('✓ Products table query successful!')
    console.log('Sample result:', result)
  } catch (err: any) {
    console.error('✗ Error:', err.message)
    console.error('Details:', err)
  }
}

verifySchema().then(() => {
  process.exit(0)
}).catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
