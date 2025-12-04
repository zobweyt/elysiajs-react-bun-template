export const passwordHasher = {
  hash: (plain: string) => Bun.password.hash(plain),
  verify: (plain: string, hashed: string) => Bun.password.verify(plain, hashed),
};
