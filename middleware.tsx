import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';

function getCookie(name: any) {
    if (process.browser) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

export async function middleware(request: NextRequest) {

    // const session = await getCookie("survey");
    // console.log(session);

    // return NextResponse.next();

    //   return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: ['/rewards', '/survey'],
}