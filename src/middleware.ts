import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { links } from './datas/links';

// This function can be marked `async` if using `await` inside
export default async function middlewares(request: NextRequest) {
    const token: undefined | { name: string; value: string } = request.cookies.get('token');

    const roles: undefined | { name: string; value: string } = request.cookies.get('role');

    // if (request.nextUrl.pathname.includes('/log-out')) {
    //     console.log('in log out');
    //     request.cookies.clear();
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    if (!token || (token && token.value.length < 100)) {
        if (request.nextUrl.pathname.includes(links.adminMidleware)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname.includes(links.adminMidleware) && roles && roles.value !== 'ROLE_ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/payment', '/profile:path*', '/other-history/:path*', '/cart', '/admin/dashboard/:path*'],
};
