import { Date } from "mongoose";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      expiresAt: string;
      accessToken: string;
      refreshToken: {
        refreshToken: string;
        expirationTime: Date;
      };
      error?: string;
      errors?: [string];
    };
  }
}
