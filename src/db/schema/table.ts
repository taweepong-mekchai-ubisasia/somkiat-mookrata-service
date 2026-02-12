import { mysqlTable, char, varchar, int, timestamp } from "drizzle-orm/mysql-core";

export const tables = mysqlTable("tables", {
  id: char("id", { length: 36 }).primaryKey(),

  name: varchar("name", { length: 40 }).notNull(),

  seats: int("seats").default(4).notNull(),

  qrToken: varchar("qr_token", { length: 120 })
    .notNull()
    .unique(),

  status: varchar("status", { length: 20 })
    .default("available") // available | occupied | reserved
    .notNull(),

  qrCode: varchar("qr_code", { length: 500 })
});

export const tableReservations = mysqlTable("table_reservations", {
  id: char("id", { length: 36 }).primaryKey(),

  tableId: char("table_id", { length: 36 }).notNull(),

  customerName: varchar("customer_name", { length: 120 }).notNull(),

  phone: varchar("phone", { length: 20 }).notNull(),

  date: varchar("date", { length: 20 }).notNull(),

  time: varchar("time", { length: 10 }).notNull(),

  guests: int("guests").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()
});
