import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // If not logged in and trying to access a protected route, redirect to home
    if (!role && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    
    // If logged in as user and trying to access admin route, redirect to home
    if (role === "CUSTOMER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // If logged in as admin and trying to access customer route, redirect to admin dashboard
    if (role === "ADMIN" && pathname.startsWith("/")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
},
{
  callbacks: {
    async authorized() {
        return true;
    },
  },
}
);

export const config = {
  matcher: ["/admin/:path*", "/"],
};