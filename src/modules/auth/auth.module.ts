import { Elysia } from "elysia";
import { jwtPlugin } from "../../plugins/jwt";
import { login } from "./auth.service";
import { loginSchema } from "./auth.schema";

/**
 * Authentication module
 * Handles user login and token generation
 */
export const authModule = new Elysia({ name: "auth" })
  .use(jwtPlugin)
  .post(
    "/login",
    async ({ body, jwt }) => {
      return login(body, jwt);
    },
    {
      ...loginSchema,
      detail: {
        tags: ["Auth"],
        summary: "User Login",
        description: "Authenticate user and generate JWT token"
      }
    }
  );
