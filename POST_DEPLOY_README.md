# Railway Post-Deploy Script

Railway จะรัน script นี้หลังจาก build สำเร็จ

## วิธีตั้งค่า

1. **Railway Dashboard** → Select Project → Settings
2. ไปที่ **Build** tab
3. ในส่วน **Post-Deploy Command** ใส่:
   ```
   bun run post-deploy
   ```

## Script ทำอะไร

- `bun run migrate` - ประมาณการ database schema
- `bun run seed` - เพิ่มข้อมูล staff (admin, staff, waiter)
- `bun run seed:products` - เพิ่มข้อมูลสินค้า

## หมายเหตุ

- Seed script จะ skip ถ้าข้อมูลมีอยู่แล้ว (safe to re-run)
- ต้องให้ DATABASE_URL ผ่าน Environment Variables
- ตัวอักษร Railway ต้อง access database ได้
