import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import authConfig from "../../auth.config";

export const { handlers, auth } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
});

export default handlers;
