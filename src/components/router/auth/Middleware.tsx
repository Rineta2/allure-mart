import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { Role } from '@/components/router/auth/schema/auth';

// Paths that don't require authentication
const publicPaths = ['/auth'];

// Role-based path mapping
const rolePathMap = {
    [Role.SUPER_ADMIN]: ['/super-admins'],
    [Role.SELLER]: ['/seller'],
    [Role.USER]: ['/users']
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public paths
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    // Check for authentication token and user role
    const token = request.cookies.get('auth-token');
    const userRole = request.cookies.get('user-role')?.value;

    // If no token or role, redirect to home page
    if (!token || !userRole) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Check role-based access
    const allowedPaths = rolePathMap[userRole as unknown as Role] || [];
    const hasAccess = allowedPaths.some(path => pathname.startsWith(path));

    // If no access, redirect to home page instead of unauthorized
    if (!hasAccess) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};