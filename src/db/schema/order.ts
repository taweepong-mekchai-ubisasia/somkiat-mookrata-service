import {
  mysqlTable,
  char,
  varchar,
  decimal,
  timestamp
} from "drizzle-orm/mysql-core";
import { tables } from "./table";

export const orders = mysqlTable("orders", {
  id: char("id", { length: 36 }).primaryKey(),

  tableId: char("table_id", { length: 36 })
    .notNull()
    .references(() => tables.id),

  status: varchar("status", { length: 20 })
    .default("pending") // pending | preparing | served | paid | cancelled
    .notNull(),

  totalPrice: decimal("total_price", {
    precision: 10,
    scale: 2
  }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull()
});
