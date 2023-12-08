import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import authConfig from "../../auth.config";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session(params) {
      if (params.session.user && params.token.sub) {
        params.session.user.id = params.token.sub;
      }
      return params.session;
    },
  },
  ...authConfig,
});

export default handlers;
