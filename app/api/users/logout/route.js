// D:\web-dev\nextjs-tut\e-commerce\app\api\users\logout\route.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    const cookie = serialize('auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1, // Expire immediately
        path: '/',
    });

    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.headers.set('Set-Cookie', cookie);
    return response;
}