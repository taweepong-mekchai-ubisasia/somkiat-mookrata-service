export const hashPassword = async (password: string) => {
  return Bun.password.hash(password);
};

export const verifyPassword = async (
  password: string,
  hash: string
) => {
  return Bun.password.verify(password, hash);
};
