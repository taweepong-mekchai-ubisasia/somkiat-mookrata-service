import { Elysia } from "elysia";

type User = { id: string; role: string };

export const authGuard = new Elysia({ name: "authGuard" })
  .onBeforeHandle(async (context: any) => {
    // Allow auth routes to pass through without checking
    const url = new URL(context.request.url);
    if (url.pathname.includes("/auth")) return;

    const authHeader = context.request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    
    if (!token) throw new Error("Unauthorized");

    try {
      const payload = await context.jwt.verify(token);
      if (!payload) throw new Error("Unauthorized");
      
      context.user = { id: payload.sub as string, role: payload.role as string };
    } catch (e) {
      throw new Error("Unauthorized");
    }
  });
