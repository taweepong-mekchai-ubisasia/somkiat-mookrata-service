import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { staff } from "./schema/staff";
import { permissions, rolePermissions } from "./schema/permission";
import { tables } from "./schema/table";
import { products } from "./schema/product";
import { orders } from "./schema/order";
import { orderItems } from "./schema/order-item";

const pool = mysql.createPool({
  // host: "localhost",
  // user: "root",
  // password: "ubis@Pass01",
  // database: "somkiat-mookrata",
    host: "trolley.proxy.rlwy.net",
    port: 58557,
    user: "root",
    password: "TUwXfqoYHihbJhxcmYPxwvHBrtHXmHSw",
    database: "railway",
  connectionLimit: 10
});



export const db = drizzle(pool, { 
  schema: { staff, permissions, rolePermissions, tables, products, orders, orderItems },
  mode: "default"
});