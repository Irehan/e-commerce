// D:\web-dev\nextjs-tut\e-commerce\app\api\test-db\route.js
import { NextResponse } from 'next/server';
import connect from '../../lib/dbConfig';

connect();

export async function GET() {
    try {
        return NextResponse.json({
            message: 'Database connected successfully',
            success: true,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}