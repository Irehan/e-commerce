// D:\web-dev\nextjs-tut\e-commerce\app\api\users\signup\route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '../../../lib/dbConfig';
import User from '../../../models/userModel';


export async function POST(request) {
    try {
        await connect();
        const body = await request.json();
        const { username, email, password } = body;

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email or username already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to log in' },
            { status: 500 }
        );
    }
}
