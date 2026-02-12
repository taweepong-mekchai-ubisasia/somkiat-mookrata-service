import { Elysia } from "elysia";
import { db } from "../db";

type User = { id: string; role: string };

export const permissionGuard = (permission: string) =>
  new Elysia({ name: "permissionGuard" })
    .derive(async (context: any) => {
      const user = context.user as User;
      
      if (!user || !user.role) throw new Error("Unauthorized");

      const allow = await db.query.rolePermissions.findFirst({
        where: (rp: any, { eq }: any) =>
          eq(rp.role, user.role) &&
          eq(rp.permissionKey, permission)
      });

      if (!allow) throw new Error("Forbidden");
      
      return {};
    });
