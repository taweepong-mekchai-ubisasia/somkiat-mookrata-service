import {
  mysqlTable,
  char,
  varchar,
  boolean,
  timestamp,
  json
} from "drizzle-orm/mysql-core";

export const staff = mysqlTable("staff", {
  id: char("id", { length: 36 }).primaryKey(),

  fullname: varchar("fullname", { length: 120 }).notNull(),

  username: varchar("username", { length: 60 })
    .notNull()
    .unique(),

  passwordHash: varchar("password_hash", { length: 255 }).notNull(),

  role: varchar("role", { length: 20 }).notNull(),

  permissions: json("permissions")
    .$type<{
      dashboard: boolean;
      tables: boolean;
      products: boolean;
      orders: boolean;
      staff: boolean;
    }>()
    .default({
      dashboard: true,
      tables: false,
      products: false,
      orders: true,
      staff: false
    })
    .notNull(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull()
});
