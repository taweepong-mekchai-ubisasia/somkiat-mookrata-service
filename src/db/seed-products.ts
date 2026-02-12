import { db } from './client'
import { products } from './schema/product'
import { randomUUID } from 'crypto'

const seedProducts = async () => {
  // ลบสินค้าเก่าออก
  try {
    await db.delete(products)
    console.log('✓ Deleted old products')
  } catch (err) {
    console.log('No old products to delete')
  }

  const productList = [
    // Rice Dishes / ข้าวหลัก
    {
      name: 'ข้าวสวย - เล็ก / ใหญ่',
      category: 'Rice',
      description: 'ข้าวขาวปกติ',
      price: '49 / 89'
    },
    {
      name: 'ข้าวไข่ - เล็ก / ใหญ่',
      category: 'Rice',
      description: 'ข้าวไข่ไก่',
      price: '69 / 129'
    },
    {
      name: 'ข้าวผัดกระเพราหมู - เล็ก / ใหญ่',
      category: 'Rice',
      description: 'ข้าวผัดกระเพราหมูสด',
      price: '89 / 159'
    },
    {
      name: 'ข้าวโคมัวกับข้าวแช่',
      category: 'Rice',
      description: 'ข้าวโคมัวสไตล์โบราณ',
      price: '69'
    },

    // Papaya Salad / สลัดป่าปาปายา
    {
      name: 'สลัดป่า',
      category: 'Papaya Salad',
      description: 'สลัดป่าแบบดั้งเดิม',
      price: '60'
    },
    {
      name: 'สลัดป่ากุ้งสด',
      category: 'Papaya Salad',
      description: 'สลัดป่าใส่กุ้งสด',
      price: '60'
    },
    {
      name: 'สลัดป่าไก่ปลา',
      category: 'Papaya Salad',
      description: 'สลัดป่าผสมไก่และปลา',
      price: '69'
    },
    {
      name: 'สลัดป่าไก่ปลากุ้งสด',
      category: 'Papaya Salad',
      description: 'สลัดป่าประมาณ 3 อย่าง',
      price: '89'
    },

    // Drinks / เครื่องดื่ม
    {
      name: 'น้ำแร่ เล็ก / ใหญ่',
      category: 'Drinks',
      description: 'น้ำแร่ธรรมชาติ',
      price: '10 / 20'
    },
    {
      name: 'โค๊ก / เป๊ปซี่',
      category: 'Drinks',
      description: 'เครื่องดื่มโค๊ก/เป๊ปซี่',
      price: '25 / 35'
    },
    {
      name: 'เหล้าส้ม แก้ว / เมธ',
      category: 'Drinks',
      description: 'เหล้าขาวผสมน้ำส้ม',
      price: '79 / 139'
    },
    {
      name: 'ร้อยแสง',
      category: 'Drinks',
      description: 'เหล้าขาวผสมสตมหมักสไตล์บ้าน',
      price: '420'
    },
    {
      name: 'เบียร์ LEO',
      category: 'Drinks',
      description: 'เบียร์ลีโอ',
      price: '75'
    },
    {
      name: 'เบียร์ Chang',
      category: 'Drinks',
      description: 'เบียร์ช้าง',
      price: '75'
    },
    {
      name: 'เบียร์ Singha',
      category: 'Drinks',
      description: 'เบียร์สิงห์',
      price: '80'
    },
    {
      name: 'น้ำโซดา Soda',
      category: 'Drinks',
      description: 'น้ำโซดา',
      price: '15'
    },
    {
      name: 'น้ำแร้ง เล็ก / ใหญ่',
      category: 'Drinks',
      description: 'น้ำแร้งเย็น',
      price: '15 / 30'
    },

    // Set Menus / เซ็ท
    {
      name: 'Set เดือกหมูบาน',
      category: 'Set Menus',
      description: 'เซ็ทเดือกหมูบาน',
      price: '250'
    },
    {
      name: 'Set ถาดหมูกระทะแบบ (พิ.1 เนื้อ 1 ผิด)',
      category: 'Set Menus',
      description: 'เซ็ทหมูกระทะ',
      price: '350'
    },
    {
      name: 'Set โคมัวหมูกระทะแบบ (พิ.1 เนื้อ 1 ผิด)',
      category: 'Set Menus',
      description: 'เซ็ทโคมัว',
      price: '450'
    },
    {
      name: 'เนื้อสดคนหา',
      category: 'Set Menus',
      description: 'เนื้อวัวสดคนหา',
      price: '160 / 190'
    },

    // A la carte - Meat Section / เมนูคำสั่ง - เนื้อ
    {
      name: 'เนื้อหมูไก่',
      category: 'Meat',
      description: 'เนื้อหมูไก่',
      price: '99'
    },
    {
      name: 'หนังหมูไก่',
      category: 'Meat',
      description: 'หนังหมูไก่',
      price: '99'
    },
    {
      name: 'เนื้อลิ้นไก่',
      category: 'Meat',
      description: 'เนื้อลิ้นไก่',
      price: '99'
    },
    {
      name: 'หมูหนอนไก่',
      category: 'Meat',
      description: 'หมูหนอน',
      price: '99'
    },
    {
      name: 'สามชั้นลิ้นไก่',
      category: 'Meat',
      description: 'สามชั้นลิ้นไก่',
      price: '49'
    },
    {
      name: 'ตับลิ้นไก่',
      category: 'Meat',
      description: 'ตับลิ้นไก่',
      price: '49'
    },
    {
      name: 'ปลาหมึกไก่',
      category: 'Meat',
      description: 'ปลาหมึก',
      price: '49'
    },
    {
      name: 'กุ้งสดไก่',
      category: 'Meat',
      description: 'กุ้งสด',
      price: '49'
    },
    {
      name: 'แหนมกระหมูขาน',
      category: 'Meat',
      description: 'แหนมกระหมูข้าน',
      price: '49'
    },
    {
      name: 'ปลูกไก่',
      category: 'Meat',
      description: 'ปลูก',
      price: '39'
    },
    {
      name: 'เศษหมูบ้า',
      category: 'Meat',
      description: 'เศษหมูบ้า',
      price: '39'
    },
    {
      name: 'ชะอม',
      category: 'Meat',
      description: 'ชะอม',
      price: '39'
    },
    {
      name: 'สาหร่ายวาฬแบบ',
      category: 'Meat',
      description: 'สาหร่ายวาฬ',
      price: '29'
    },
    {
      name: 'เศษหมูไก่ 1 ผิด',
      category: 'Meat',
      description: 'เศษหมูไก่',
      price: '15'
    },
    {
      name: 'ไข่ไก่',
      category: 'Meat',
      description: 'ไข่ไก่',
      price: '10'
    },
    {
      name: 'วันแล่น',
      category: 'Meat',
      description: 'วันแล่น',
      price: '15'
    },
    {
      name: 'มำม่า',
      category: 'Meat',
      description: 'มำม่า',
      price: '15'
    },
    {
      name: 'ข่าวปลา',
      category: 'Meat',
      description: 'ข่าวปลา',
      price: '15'
    },
    {
      name: 'หนึ่งพยัน',
      category: 'Meat',
      description: 'หนึ่งพยัน',
      price: '29'
    },

    // Vegetables / เครื่องแกง
    {
      name: 'ผักควงหวาน / ผักบ่าน',
      category: 'Vegetables',
      description: 'ผักควง',
      price: '19'
    },
    {
      name: 'กะหล่ำปลี / ผักบ่าน',
      category: 'Vegetables',
      description: 'กะหล่ำปลี',
      price: '19'
    },
    {
      name: 'ผัดไข่มดแดง / ไทยคำ',
      category: 'Vegetables',
      description: 'ผัดไข่มดแดง',
      price: '19'
    },
    {
      name: 'ผัดกระแพงแก้ง',
      category: 'Vegetables',
      description: 'ผัดกระแพงแก้ง',
      price: '19'
    },
    {
      name: 'ข่าวไทยต่างช่าย',
      category: 'Vegetables',
      description: 'ข่าวไทย',
      price: '10 / 20'
    },
    {
      name: 'ข่าวไทยคำดูน / ข่าวไทยอื่นอัน',
      category: 'Vegetables',
      description: 'ข่าวไทยสปป.แล.ดท',
      price: '29'
    },

    // Fried Menu / เมนูทอด
    {
      name: 'ปลาไทยทอด / เนื้อหมูทอดครอบ',
      category: 'Fried',
      description: 'ปลาทอด',
      price: '69'
    },
    {
      name: 'ปลาหมึกไทยทอด / เอื่อไทยทอด',
      category: 'Fried',
      description: 'ปลาหมึกทอด',
      price: '79'
    },
    {
      name: 'ข่าวไทยทอด',
      category: 'Fried',
      description: 'ข่าวไทยทอด',
      price: '69'
    },
    {
      name: 'สามชั้นหมูทอดเครื่อ',
      category: 'Fried',
      description: 'สามชั้นหมูทอด',
      price: '79'
    },
    {
      name: 'สามชั้นหมูทอดกระเทีย',
      category: 'Fried',
      description: 'สามชั้นหมูทอด',
      price: '89'
    },
    {
      name: 'ไส้อืนหมูทอดกระเทีย',
      category: 'Fried',
      description: 'ไส้อืนหมูทอด',
      price: '89'
    },
    {
      name: 'ศูนย์แบบข่อทอด',
      category: 'Fried',
      description: 'เชิญบุปผทอด',
      price: '89'
    },
    {
      name: 'ปลาหมึกหมูทอดกระเทีย',
      category: 'Fried',
      description: 'ปลาหมึกทอด',
      price: '89'
    },
    {
      name: 'เผ้งยำหลาษ - เล็ก / ใหญ่',
      category: 'Fried',
      description: 'เผ้งยำหลาษ',
      price: '69 / 99'
    },

    // Spicy Salad / ยำสมุนไสร
    {
      name: 'ยำรวมมิดร',
      category: 'Spicy Salad',
      description: 'ยำเข้ากันได้หลายอย่าง',
      price: '69'
    },
    {
      name: 'ยำวุ้นเส็นหมูสัน / ยำวุ้นหมมัน',
      category: 'Spicy Salad',
      description: 'ยำวุ้น',
      price: '79'
    },
    {
      name: 'ยำวุ้นเส็นรวมมิดร / ยำวาหมูรวมมิดร',
      category: 'Spicy Salad',
      description: 'ยำวุ้นรวม',
      price: '89'
    },
    {
      name: 'ยำไร่ดำ',
      category: 'Spicy Salad',
      description: 'ยำไร่ดำ',
      price: '79'
    },
    {
      name: 'ยำสามชั้นหมูทอดครอบ',
      category: 'Spicy Salad',
      description: 'ยำสามชั้นหมูทอด',
      price: '89'
    },
    {
      name: 'ยำคุณก่าสุลติ / สัก',
      category: 'Spicy Salad',
      description: 'ยำคุณก่า',
      price: '79'
    },
    {
      name: 'คั่วข้มห่าเล',
      category: 'Spicy Salad',
      description: 'คั่วข้ม',
      price: '89'
    },
    {
      name: 'ไส่อืนลาคร่ืมทีด / วัมแจ',
      category: 'Spicy Salad',
      description: 'ไส้อืน',
      price: '89'
    },
    {
      name: 'แม่กระเทพลาคร่ืม',
      category: 'Spicy Salad',
      description: 'แม่กระเทพ',
      price: '79'
    }
  ]

  // แยกสินค้าออกเป็น batches เล็กๆ เพื่อให้ได้ราคา
  const allProducts = [
    // Rice
    { name: 'ข้าวสวย เล็ก', category: 'Rice', description: 'ข้าวขาวปกติ ตัวเล็ก', price: 49 },
    { name: 'ข้าวสวย ใหญ่', category: 'Rice', description: 'ข้าวขาวปกติ ตัวใหญ่', price: 89 },
    { name: 'ข้าวไข่ เล็ก', category: 'Rice', description: 'ข้าวไข่ไก่ ตัวเล็ก', price: 69 },
    { name: 'ข้าวไข่ ใหญ่', category: 'Rice', description: 'ข้าวไข่ไก่ ตัวใหญ่', price: 129 },
    { name: 'ข้าวผัดกระเพราหมู เล็ก', category: 'Rice', description: 'ข้าวผัดกระเพราหมูสด ตัวเล็ก', price: 89 },
    { name: 'ข้าวผัดกระเพราหมู ใหญ่', category: 'Rice', description: 'ข้าวผัดกระเพราหมูสด ตัวใหญ่', price: 159 },
    { name: 'ข้าวโคมัวกับข้าวแช่', category: 'Rice', description: 'ข้าวโคมัวสไตล์โบราณ', price: 69 },

    // Papaya Salad
    { name: 'สลัดป่า', category: 'Papaya Salad', description: 'สลัดป่าแบบดั้งเดิม', price: 60 },
    { name: 'สลัดป่ากุ้งสด', category: 'Papaya Salad', description: 'สลัดป่าใส่กุ้งสด', price: 60 },
    { name: 'สลัดป่าไก่ปลา', category: 'Papaya Salad', description: 'สลัดป่าผสมไก่และปลา', price: 69 },
    { name: 'สลัดป่าไก่ปลากุ้งสด', category: 'Papaya Salad', description: 'สลัดป่าประมาณ 3 อย่าง', price: 89 },

    // Drinks
    { name: 'น้ำแร่ เล็ก', category: 'Drinks', description: 'น้ำแร่ธรรมชาติ ตัวเล็ก', price: 10 },
    { name: 'น้ำแร่ ใหญ่', category: 'Drinks', description: 'น้ำแร่ธรรมชาติ ตัวใหญ่', price: 20 },
    { name: 'โค๊ก เล็ก', category: 'Drinks', description: 'โค๊กอเมริกา ตัวเล็ก', price: 25 },
    { name: 'โค๊ก ใหญ่', category: 'Drinks', description: 'โค๊กอเมริกา ตัวใหญ่', price: 35 },
    { name: 'เป๊ปซี่ เล็ก', category: 'Drinks', description: 'เป๊ปซี่โคลา ตัวเล็ก', price: 25 },
    { name: 'เป๊ปซี่ ใหญ่', category: 'Drinks', description: 'เป๊ปซี่โคลา ตัวใหญ่', price: 35 },
    { name: 'เหล้าส้ม แก้ว', category: 'Drinks', description: 'เหล้าขาวผสมน้ำส้ม แก้ว', price: 79 },
    { name: 'เหล้าส้ม เมธ', category: 'Drinks', description: 'เหล้าขาวผสมน้ำส้ม เมธ', price: 139 },
    { name: 'ร้อยแสง', category: 'Drinks', description: 'เหล้าขาวผสมสตมหมักสไตล์บ้าน', price: 420 },
    { name: 'เบียร์ LEO', category: 'Drinks', description: 'เบียร์ลีโอ', price: 75 },
    { name: 'เบียร์ Chang', category: 'Drinks', description: 'เบียร์ช้าง', price: 75 },
    { name: 'เบียร์ Singha', category: 'Drinks', description: 'เบียร์สิงห์', price: 80 },
    { name: 'น้ำโซดา Soda', category: 'Drinks', description: 'น้ำโซดา', price: 15 },
    { name: 'น้ำแร้ง เล็ก', category: 'Drinks', description: 'น้ำแร้งเย็น ตัวเล็ก', price: 15 },
    { name: 'น้ำแร้ง ใหญ่', category: 'Drinks', description: 'น้ำแร้งเย็น ตัวใหญ่', price: 30 },

    // Set Menus
    { name: 'Set เดือกหมูบาน', category: 'Set Menus', description: 'เซ็ทเดือกหมูบาน', price: 250 },
    { name: 'Set ถาดหมูกระทะแบบ', category: 'Set Menus', description: 'เซ็ทหมูกระทะ 1 เนื้อ', price: 350 },
    { name: 'Set โคมัวหมูกระทะแบบ', category: 'Set Menus', description: 'เซ็ทโคมัว 1 เนื้อ', price: 450 },
    { name: 'เนื้อสดคนหา เล็ก', category: 'Set Menus', description: 'เนื้อวัวสดคนหา ตัวเล็ก', price: 160 },
    { name: 'เนื้อสดคนหา ใหญ่', category: 'Set Menus', description: 'เนื้อวัวสดคนหา ตัวใหญ่', price: 190 },

    // A la carte - Meat
    { name: 'เนื้อหมูไก่', category: 'Meat', description: 'เนื้อหมูไก่', price: 99 },
    { name: 'หนังหมูไก่', category: 'Meat', description: 'หนังหมูไก่', price: 99 },
    { name: 'เนื้อลิ้นไก่', category: 'Meat', description: 'เนื้อลิ้นไก่', price: 99 },
    { name: 'หมูหนอนไก่', category: 'Meat', description: 'หมูหนอน', price: 99 },
    { name: 'สามชั้นลิ้นไก่', category: 'Meat', description: 'สามชั้นลิ้นไก่', price: 49 },
    { name: 'ตับลิ้นไก่', category: 'Meat', description: 'ตับลิ้นไก่', price: 49 },
    { name: 'ปลาหมึก', category: 'Meat', description: 'ปลาหมึก', price: 49 },
    { name: 'กุ้งสด', category: 'Meat', description: 'กุ้งสด', price: 49 },
    { name: 'แหนมกระหมูขาน', category: 'Meat', description: 'แหนมกระหมูข้าน', price: 49 },
    { name: 'ปลูก', category: 'Meat', description: 'ปลูก', price: 39 },
    { name: 'เศษหมูบ้า', category: 'Meat', description: 'เศษหมูบ้า', price: 39 },
    { name: 'ชะอม', category: 'Meat', description: 'ชะอม', price: 39 },
    { name: 'สาหร่ายวาฬแบบ', category: 'Meat', description: 'สาหร่ายวาฬ', price: 29 },
    { name: 'เศษหมูไก่', category: 'Meat', description: 'เศษหมูไก่', price: 15 },
    { name: 'ไข่ไก่', category: 'Meat', description: 'ไข่ไก่', price: 10 },
    { name: 'วันแล่น', category: 'Meat', description: 'วันแล่น', price: 15 },
    { name: 'มำม่า', category: 'Meat', description: 'มำม่า', price: 15 },
    { name: 'ข่าวปลา', category: 'Meat', description: 'ข่าวปลา', price: 15 },
    { name: 'หนึ่งพยัน', category: 'Meat', description: 'หนึ่งพยัน', price: 29 },

    // Vegetables
    { name: 'ผักควงหวาน', category: 'Vegetables', description: 'ผักควง', price: 19 },
    { name: 'ผักบ่าน', category: 'Vegetables', description: 'ผักบ่าน', price: 19 },
    { name: 'กะหล่ำปลี', category: 'Vegetables', description: 'กะหล่ำปลี', price: 19 },
    { name: 'ผัดไข่มดแดง', category: 'Vegetables', description: 'ผัดไข่มดแดง', price: 19 },
    { name: 'ผัดกระแพงแก้ง', category: 'Vegetables', description: 'ผัดกระแพงแก้ง', price: 19 },
    { name: 'ข่าวไทยต่างช่าย เล็ก', category: 'Vegetables', description: 'ข่าวไทย ตัวเล็ก', price: 10 },
    { name: 'ข่าวไทยต่างช่าย ใหญ่', category: 'Vegetables', description: 'ข่าวไทย ตัวใหญ่', price: 20 },
    { name: 'ข่าวไทยอื่นๆ', category: 'Vegetables', description: 'ข่าวไทยสปป.แล.ดท', price: 29 },

    // Fried
    { name: 'ปลาไทยทอด', category: 'Fried', description: 'ปลาทอด', price: 69 },
    { name: 'เนื้อหมูทอดครอบ', category: 'Fried', description: 'เนื้อหมูทอด', price: 69 },
    { name: 'ปลาหมึกไทยทอด', category: 'Fried', description: 'ปลาหมึกทอด', price: 79 },
    { name: 'เอื่อไทยทอด', category: 'Fried', description: 'เอื่อทอด', price: 79 },
    { name: 'ข่าวไทยทอด', category: 'Fried', description: 'ข่าวไทยทอด', price: 69 },
    { name: 'สามชั้นหมูทอดเครื่อ', category: 'Fried', description: 'สามชั้นหมูทอด', price: 79 },
    { name: 'สามชั้นหมูทอดกระเทีย', category: 'Fried', description: 'สามชั้นหมูทอดกระเทีย', price: 89 },
    { name: 'ไส้อืนหมูทอดกระเทีย', category: 'Fried', description: 'ไส้อืนหมูทอด', price: 89 },
    { name: 'เชิญบุปผทอด', category: 'Fried', description: 'เชิญบุปผทอด', price: 89 },
    { name: 'ปลาหมึกหมูทอดกระเทีย', category: 'Fried', description: 'ปลาหมึกทอดกระเทีย', price: 89 },
    { name: 'เผ้งยำหลาษ เล็ก', category: 'Fried', description: 'เผ้งยำหลาษ ตัวเล็ก', price: 69 },
    { name: 'เผ้งยำหลาษ ใหญ่', category: 'Fried', description: 'เผ้งยำหลาษ ตัวใหญ่', price: 99 },

    // Spicy Salad
    { name: 'ยำรวมมิดร', category: 'Spicy Salad', description: 'ยำเข้ากันได้หลายอย่าง', price: 69 },
    { name: 'ยำวุ้นเส็นหมูสัน', category: 'Spicy Salad', description: 'ยำวุ้นเส็นหมูสัน', price: 79 },
    { name: 'ยำวุ้นหมมัน', category: 'Spicy Salad', description: 'ยำวุ้นหมมัน', price: 79 },
    { name: 'ยำวุ้นเส็นรวมมิดร', category: 'Spicy Salad', description: 'ยำวุ้นรวมหลายอย่าง', price: 89 },
    { name: 'ยำวาหมูรวมมิดร', category: 'Spicy Salad', description: 'ยำวาหมูรวม', price: 89 },
    { name: 'ยำไร่ดำ', category: 'Spicy Salad', description: 'ยำไร่ดำ', price: 79 },
    { name: 'ยำสามชั้นหมูทอดครอบ', category: 'Spicy Salad', description: 'ยำสามชั้นหมูทอด', price: 89 },
    { name: 'ยำคุณก่าสุลติ', category: 'Spicy Salad', description: 'ยำคุณก่า', price: 79 },
    { name: 'คั่วข้มห่าเล', category: 'Spicy Salad', description: 'คั่วข้ม', price: 89 },
    { name: 'ไส้อืนลาคร่ืมทีด', category: 'Spicy Salad', description: 'ไส้อืน', price: 89 },
    { name: 'แม่กระเทพลาคร่ืม', category: 'Spicy Salad', description: 'แม่กระเทพ', price: 79 }
  ]

  try {
    for (const product of allProducts) {
      await db.insert(products).values({
        id: randomUUID(),
        name: product.name,
        category: product.category,
        description: product.description || '',
        price: product.price.toString(),
        isAvailable: true
      })
    }
    console.log(`✓ Seeded ${allProducts.length} products successfully!`)
  } catch (err) {
    console.error('Error seeding products:', err)
  }
}

seedProducts().then(() => {
  console.log('✓ Product seeding completed')
  process.exit(0)
}).catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
