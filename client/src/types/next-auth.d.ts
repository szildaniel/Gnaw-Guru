import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      expiresAt: string;
      token: string;
      error?: string;
      errors?: [string];
    };
  }
}
