import { Elysia } from "elysia";
import { permissionGuard } from "../../plugins/permissionGuard";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "./product.service";

/**
 * Product management module
 * Handles menu items and product CRUD operations
 */
export const productModule = new Elysia({ name: "product" })
  .get("/", async () => {
    return getProducts();
  }, {
    detail: {
      tags: ["Product"],
      summary: "List all products",
      description: "Get list of all menu items and products"
    }
  })
  .get("/search/:query", async ({ params }) => {
    return searchProducts(params.query);
  }, {
    detail: {
      tags: ["Product"],
      summary: "Search products",
      description: "Search products by name, category, or description"
    }
  })
  .get("/:id", async ({ params }) => {
    return getProductById(params.id);
  }, {
    detail: {
      tags: ["Product"],
      summary: "Get product by ID",
      description: "Get a specific product/menu item"
    }
  })
  .post("/", async ({ body }: any) => {
    return createProduct(body);
  }, {
    detail: {
      tags: ["Product"],
      summary: "Create new product",
      description: "Create a new menu item or product"
    }
  })
  .put("/:id", async ({ params, body }: any) => {
    return updateProduct(params.id, body);
  }, {
    detail: {
      tags: ["Product"],
      summary: "Update product",
      description: "Update a menu item or product"
    }
  })
  .delete("/:id", async ({ params }) => {
    return deleteProduct(params.id);
  }, {
    detail: {
      tags: ["Product"],
      summary: "Delete product",
      description: "Delete a menu item or product"
    }
  });
