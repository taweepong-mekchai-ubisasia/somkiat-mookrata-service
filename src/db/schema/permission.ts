import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const permissions = mysqlTable("permissions", {
  key: varchar("key", { length: 60 }).primaryKey()
});

export const rolePermissions = mysqlTable("role_permissions", {
  role: varchar("role", { length: 20 }).notNull(),

  permissionKey: varchar("permission_key", { length: 60 })
    .notNull()
    .references(() => permissions.key)
});
