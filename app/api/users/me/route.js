// D:\web-dev\nextjs-tut\e-commerce\app\api\users\me\route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/dbConfig';
import User from '../../../models/userModel';
import { generateToken, verifyToken } from '../../../lib/getDataFromToken';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 m'),
    prefix: 'me_rate_limit',
});

export async function GET(request) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { success, remaining } = await ratelimit.limit(String(decoded.userId));
    if (!success) {
        return NextResponse.json(
            { error: `Too many requests. Limit: 20/min. Remaining: ${remaining}` },
            { status: 429 }
        );
    }

    try {
        await connectDB();
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ username: user.username, email: user.email });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
