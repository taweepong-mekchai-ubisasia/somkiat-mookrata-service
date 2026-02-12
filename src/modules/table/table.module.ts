import { Elysia } from "elysia";
import { permissionGuard } from "../../plugins/permissionGuard";
import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getReservations,
  createReservation,
  deleteReservation
} from "./table.service";

/**
 * Table management module
 * Handles restaurant table CRUD operations and reservations
 */
export const tableModule = new Elysia({ name: "table" })
  .get("/", async () => {
    return getTables();
  }, {
    detail: {
      tags: ["Table"],
      summary: "List all tables",
      description: "Get list of all restaurant tables with their status"
    }
  })
  .get("/:id", async ({ params }) => {
    return getTableById(params.id);
  }, {
    detail: {
      tags: ["Table"],
      summary: "Get table by ID",
      description: "Get a specific restaurant table details"
    }
  })
  .post("/", async ({ body }: any) => {
    return createTable(body);
  }, {
    detail: {
      tags: ["Table"],
      summary: "Create new table",
      description: "Create a new restaurant table with QR code"
    }
  })
  .put("/:id", async ({ params, body }: any) => {
    return updateTable(params.id, body);
  }, {
    detail: {
      tags: ["Table"],
      summary: "Update table",
      description: "Update table information"
    }
  })
  .delete("/:id", async ({ params }) => {
    return deleteTable(params.id);
  }, {
    detail: {
      tags: ["Table"],
      summary: "Delete table",
      description: "Delete a restaurant table"
    }
  })
  .get("/reservations/list", async () => {
    return getReservations();
  }, {
    detail: {
      tags: ["Table"],
      summary: "List all reservations",
      description: "Get list of all table reservations"
    }
  })
  .post("/reservations/create", async ({ body }: any) => {
    return createReservation(body);
  }, {
    detail: {
      tags: ["Table"],
      summary: "Create reservation",
      description: "Create a new table reservation"
    }
  })
  .delete("/reservations/:id", async ({ params }) => {
    return deleteReservation(params.id);
  }, {
    detail: {
      tags: ["Table"],
      summary: "Delete reservation",
      description: "Cancel a table reservation"
    }
  });