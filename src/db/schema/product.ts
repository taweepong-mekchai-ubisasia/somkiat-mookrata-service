import {
  mysqlTable,
  char,
  varchar,
  boolean,
  decimal,
  text,
  longtext
} from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: char("id", { length: 36 }).primaryKey(),

  name: varchar("name", { length: 120 }).notNull(),

  category: varchar("category", { length: 60 }).notNull(),

  description: text("description"),

  image: longtext("image"),

  price: decimal("price", {
    precision: 10,
    scale: 2
  }).notNull(),

  isAvailable: boolean("is_available")
    .default(true)
    .notNull()
});