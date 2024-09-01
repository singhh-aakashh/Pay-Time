import { NextRequest } from "next/server";
import { publicRoute } from "./routes";

export default function middleware(req:NextRequest){
    const {nextUrl} = req;
    const userId = req.cookies.get("id")?.value

    const isPublicRoute = publicRoute.includes(nextUrl.pathname);

    if(!userId && !isPublicRoute){
        return Response.redirect(new URL("/onboard",nextUrl))
    }

    
}
export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
  };