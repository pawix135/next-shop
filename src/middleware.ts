import { auth } from "@/auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (req.auth) {
      return NextResponse.next();
    }
    let redirect_url = new URL("/api/auth/signin", req.url);
    redirect_url.searchParams.append("callbackUrl", req.url);
    return NextResponse.redirect(redirect_url);
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
