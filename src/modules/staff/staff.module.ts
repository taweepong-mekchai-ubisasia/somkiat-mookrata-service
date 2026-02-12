import { Elysia } from "elysia";
import { permissionGuard } from "../../plugins/permissionGuard";
import { getStaff, getStaffById, createStaff, updateStaff, deleteStaff } from "./staff.service";

/**
 * Staff management module
 * Handles staff CRUD operations with permission checks
 */
export const staffModule = new Elysia({ name: "staff" })
  .use(permissionGuard("staff.manage"))
  .get("/", async () => {
    return getStaff();
  }, {
    detail: {
      tags: ["Staff"],
      summary: "List all staff",
      description: "Get list of all staff members"
    }
  })
  .get("/:id", async ({ params }: any) => {
    return getStaffById(params.id);
  }, {
    detail: {
      tags: ["Staff"],
      summary: "Get staff details",
      description: "Get details of a specific staff member"
    }
  })
  .post("/", async ({ body }: any) => {
    return createStaff(body);
  }, {
    detail: {
      tags: ["Staff"],
      summary: "Create new staff",
      description: "Create a new staff member"
    }
  })
  .put("/:id", async ({ params, body }: any) => {
    return updateStaff(params.id, body);
  }, {
    detail: {
      tags: ["Staff"],
      summary: "Update staff",
      description: "Update staff member details"
    }
  })
  .delete("/:id", async ({ params }: any) => {
    return deleteStaff(params.id);
  }, {
    detail: {
      tags: ["Staff"],
      summary: "Delete staff",
      description: "Delete a staff member"
    }
  });
