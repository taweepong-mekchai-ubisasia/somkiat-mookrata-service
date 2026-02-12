import { eq } from "drizzle-orm";
import { db } from "../../db";
import { staff } from "../../db";
import { verifyPassword } from "../../utils/password";

export const login = async (
  body: { username: string; password: string },
  jwt: any
) => {
 const user = await db
    .select()
    .from(staff)
    .where(eq(staff.username, body.username))
    .limit(1)
    .then(res => res[0]);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  if (!user.isActive) {
    throw new Error("Account is disabled");
  }

  const valid = await verifyPassword(
    body.password,
    user.passwordHash
  );

  if (!valid) {
    throw new Error("Invalid username or password");
  }

  const token = await jwt.sign({
    sub: user.id,
    role: user.role
  });

  return {
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      role: user.role
    }
  };
};
