import {
  mysqlTable,
  char,
  timestamp
} from "drizzle-orm/mysql-core";
import { tables } from "./table";

export const tableSessions = mysqlTable("table_sessions", {
  // id: uuid("id").defaultRandom().primaryKey(),
  id: char("id", { length: 36 }).primaryKey(),
  //   tableId: uuid("table_id")
  //     .notNull()
  //     .references(() => tables.id),

  tableId: char("table_id", { length: 36 })
    .notNull()
    .references(() => tables.id),


  expiresAt: timestamp("expires_at").notNull()
});
