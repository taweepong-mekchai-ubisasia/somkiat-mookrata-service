import { t } from "elysia";

export const loginSchema = {
  body: t.Object({
    username: t.String(),
    password: t.String()
  })
};
