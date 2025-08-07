// D:\web-dev\nextjs-tut\e-commerce\app\api\users\login\route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import connectDB from '../../../lib/dbConfig';
import User from '../../../models/userModel';
import { generateToken } from '../../../lib/getDataFromToken';

export async function POST(request) {
    try {
        console.log('Login attempt starting...');
        await connectDB();
        const { email, password } = await request.json();
        console.log('Attempting login for email:', email);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // FIX: Await the generateToken function since it's async
        const token = await generateToken(user._id.toString());

        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600, // 1 hour
            path: '/',
            // Make sure this matches your Vercel deployment domain
            domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost'
        });

        const response = NextResponse.json({
            message: 'Login successful',
            // Optional: You can also return user info if needed
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
        response.headers.set('Set-Cookie', cookie);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Failed to log in' },
            { status: 500 }
        );
    }
}