import { db } from "../../db";
import { staff } from "../../db/schema/staff";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { hashPassword } from "../../utils/password";

export const getStaff = async () => {
  return db.select().from(staff);
};

export const getStaffById = async (id: string) => {
  return db.select().from(staff).where(eq(staff.id, id)).limit(1).then(res => res[0]);
};

export const createStaff = async (body: {
  fullname: string;
  username: string;
  password: string;
  role: string;
}) => {
  const passwordHash = await hashPassword(body.password);
  
  return db.insert(staff).values({
    id: randomUUID(),
    fullname: body.fullname,
    username: body.username,
    passwordHash,
    role: body.role,
    isActive: true
  });
};

export const updateStaff = async (id: string, body: Partial<{
  fullname: string;
  password: string;
  role: string;
  isActive: boolean;
}>) => {
  const updates: any = {};
  
  if (body.fullname) updates.fullname = body.fullname;
  if (body.role) updates.role = body.role;
  if (body.isActive !== undefined) updates.isActive = body.isActive;
  if (body.password) updates.passwordHash = await hashPassword(body.password);

  return db.update(staff).set(updates).where(eq(staff.id, id));
};

export const deleteStaff = async (id: string) => {
  return db.delete(staff).where(eq(staff.id, id));
};
