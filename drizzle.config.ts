import type { Config } from "drizzle-kit";

// export default {
//   schema: "./src/db/schema",
//   out: "./drizzle",
//   dialect: "mysql",
//   dbCredentials: {
//     // connectionString: process.env.DATABASE_URL!
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "ubis@Pass01",
//     database: "somkiat-mookrata"
//   }
// } satisfies Config;


export default {
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    // connectionString: process.env.DATABASE_URL!
    host: "trolley.proxy.rlwy.net",
    port: 58557,
    user: "root",
    password: "TUwXfqoYHihbJhxcmYPxwvHBrtHXmHSw",
    database: "railway"
  }
} satisfies Config;
// mysql://root:TUwXfqoYHihbJhxcmYPxwvHBrtHXmHSw@mysql.railway.internal:3306/railway