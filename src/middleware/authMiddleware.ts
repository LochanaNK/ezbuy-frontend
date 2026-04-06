import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function authMiddleware(request: NextRequest){
    const token = request.cookies.get("ezbuy_token")?.value;
    const {pathname} = request.nextUrl;

    if(pathname.startsWith('/vendor')){
        if(!token){
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try{
            const user = JSON.parse(token);
            if(user.roleId != 2){
                console.warn("Unauthorizd access! redirecting");
                return NextResponse.redirect(new URL('/home',request.url));
            }
        }catch(error){
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/vendor/:path*'],
}