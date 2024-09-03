import { NextRequest } from "next/server";
import { publicRoute } from "./route";

export default function middleware(req:NextRequest){
    const {nextUrl} = req;
    const userId = req.cookies.get("id")?.value

    const isPublicRoute = publicRoute.includes(nextUrl.pathname);

    if(!userId && !isPublicRoute){
        return Response.redirect(new URL("/sign-in",nextUrl))
    }

    
}
export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  };