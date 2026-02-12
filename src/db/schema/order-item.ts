import {
  mysqlTable,
  char,
  decimal
} from "drizzle-orm/mysql-core";
import { orders } from "./order";

export const orderItems = mysqlTable("order_items", {
  id: char("id", { length: 36 }).primaryKey(),

  orderId: char("order_id", { length: 36 })
    .notNull()
    .references(() => orders.id),

  productId: char("product_id", { length: 36 })
    .notNull(),


  qty: decimal("qty").notNull(),

  priceSnapshot: decimal("price_snapshot", {
    precision: 10,
    scale: 2
  }).notNull()
});
