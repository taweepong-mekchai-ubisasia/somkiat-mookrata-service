# Railway Auto-Deploy with Database Setup

Railway จะรัน migrations และ seed อัตโนมัติทุกครั้งที่ deploy

## วิธีทำงาน

Dockerfile ได้ถูกแก้ไขให้:
1. Build ขั้น 1: Install dependencies
2. Build ขั้น 2: Copy all files
3. **ที่ Runtime:**
   - ✅ รัน `bun run migrate` - ปรับปรุง database schema
   - ✅ รัน `bun run seed` - เพิ่มข้อมูล staff (admin, staff, waiter)
   - ✅ รัน `bun run seed:products` - เพิ่มข้อมูลสินค้า
   - ✅ รัน `bun run dev` - เปิด API server

## ตั้งค่า Railway

ไม่ต้องตั้งค่าเพิ่มเติม! เพียงแค่:
1. Push code ให้ GitHub
2. Railway จะ auto-deploy
3. Build จะสำเร็จและ seed ข้อมูลโดยอัตโนมัติ

## ข้อสังเกต

- ⚠️ Seed script จะ skip ถ้าข้อมูลมีอยู่แล้ว (safe to re-deploy)
- ⚠️ ต้องมี database connection string ผ่าน Environment Variables
- ⚠️ ครั้งแรก deploy อาจใช้เวลาสักครู่จากการ seed ข้อมูล

## ตัวอย่าง Output

```
Running migrations...
Seeding database...
🌱 Seeding staff data...
✅ Staff user "admin" seeded
✅ Staff user "staff" seeded
✅ Staff user "waiter1" seeded
Seeding products...
🌱 Seeding products...
✅ Product "Pad Thai" seeded
Starting server...
🚀 Server running on http://localhost:3536
```

