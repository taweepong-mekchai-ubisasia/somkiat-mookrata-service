import { db } from "./client";
import { staff } from "./schema/staff";
import { eq } from "drizzle-orm";
import { hashPassword } from "../utils/password";

async function seedStaff() {
  console.log("🌱 Seeding staff data...");

  const usersToSeed = [
    {
      id: crypto.randomUUID(),
      fullname: "Administrator",
      username: "admin",
      password: "admin@123",
      role: "admin"
    },
    {
      id: crypto.randomUUID(),
      fullname: "Staff User",
      username: "staff",
      password: "staff@123",
      role: "staff"
    },
    {
      id: crypto.randomUUID(),
      fullname: "Waiter One",
      username: "waiter1",
      password: "waiter@123",
      role: "staff"
    }
  ];

  for (const user of usersToSeed) {
    try {
      // Check if user already exists
      const existing = await db
        .select()
        .from(staff)
        .where(eq(staff.username, user.username))
        .limit(1);

      if (existing.length > 0) {
        console.log(`⏭️  User "${user.username}" already exists, skipping...`);
        continue;
      }

      const passwordHash = await hashPassword(user.password);

      await db.insert(staff).values({
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        passwordHash,
        role: user.role,
        isActive: true
      });

      console.log(`✅ Created user: ${user.username} (${user.role})`);
    } catch (error) {
      console.error(`❌ Error creating user ${user.username}:`, error);
    }
  }

  console.log("✨ Seed completed!");
}

seedStaff().catch(console.error).finally(() => process.exit(0));
