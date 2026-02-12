import { Elysia } from "elysia";
import { permissionGuard } from "../../plugins/permissionGuard";
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "./order.service";

/**
 * Order management module
 * Handles order CRUD operations
 */
export const orderModule = new Elysia({ name: "order" })
  .use(permissionGuard("order.manage"))
  .get("/", async () => {
    return getOrders();
  }, {
    detail: {
      tags: ["Order"],
      summary: "List all orders",
      description: "Get list of all orders"
    }
  })
  .get("/:id", async ({ params }: any) => {
    return getOrderById(params.id);
  }, {
    detail: {
      tags: ["Order"],
      summary: "Get order details",
      description: "Get details of a specific order by ID"
    }
  })
  .post("/", async ({ body }: any) => {
    return createOrder(body);
  }, {
    detail: {
      tags: ["Order"],
      summary: "Create new order",
      description: "Create a new order for a table"
    }
  })
  .put("/:id", async ({ params, body }: any) => {
    return updateOrder(params.id, body);
  }, {
    detail: {
      tags: ["Order"],
      summary: "Update order",
      description: "Update order status"
    }
  })
  .delete("/:id", async ({ params }: any) => {
    return deleteOrder(params.id);
  }, {
    detail: {
      tags: ["Order"],
      summary: "Delete order",
      description: "Delete an order"
    }
  });
