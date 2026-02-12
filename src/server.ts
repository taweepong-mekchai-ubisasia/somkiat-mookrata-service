import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { jwtPlugin } from "./plugins/jwt";
import { authGuard } from "./plugins/authGuard";

import { authModule } from "./modules/auth/auth.module";
import { staffModule } from "./modules/staff/staff.module";
import { tableModule } from "./modules/table/table.module";
import { productModule } from "./modules/product/product.module";
import { orderModule } from "./modules/order/order.module";

const port = Number(process.env.PORT) || 3536;
new Elysia()
  .use(
    cors({
      // origin: ["http://localhost:5173", "http://localhost:3000"],
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      // exposedHeaders: ["Content-Type"]
    }),
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Somkiat Mookrata API",
          version: "1.0.0",
          description: "Restaurant Management System API",
        },
        tags: [
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Staff", description: "Staff management endpoints" },
          { name: "Table", description: "Table management endpoints" },
          { name: "Product", description: "Product management endpoints" },
          { name: "Order", description: "Order management endpoints" },
        ],
      },
    }),
  )
  .use(jwtPlugin)
  .use(authGuard)

  .group("/auth", (app) => app.use(authModule))
  .group("/staff", (app) => app.use(staffModule))
  .group("/tables", (app) => app.use(tableModule))
  .group("/products", (app) => app.use(productModule))
  .group("/orders", (app) => app.use(orderModule))

  .listen(port);

// new Elysia().listen(port);

console.log(`🚀 Server running on ${port}`);
// console.log("🚀 Server running on http://localhost:3536");
console.log("📚 Swagger docs available at http://localhost:3536/docs");
console.log("✅ CORS enabled for http://localhost:5173");
