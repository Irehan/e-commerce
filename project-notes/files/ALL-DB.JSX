// ALL - DATABASE
# D: \web - dev\nextjs - tut\e - commerce\.env.local
MONGO_URI = mongodb + srv://irfann46:Hpb61JZhoz5PiZ3B@e-commerce.zjbqtrf.mongodb.net/myapp?retryWrites=true&w=majority
TOKEN_SECRET = !@mysecretjwtkey12321111
UPSTASH_REDIS_REST_URL = "https://meet-condor-7382.upstash.io"
UPSTASH_REDIS_REST_TOKEN = "ARzWAAIjcDFmY2QxNTJjOTk2MGU0ZmZlYjQ5MmE5NzI0ZDRkYzk5ZnAxMA"
---------------------------------------------------

// D:\web-dev\nextjs-tut\e-commerce\app\lib\schemas.js
import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    otp: z.string().optional(), // Optional for 2FA
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    otp: z.string().optional(), // Add this line if otp is used in login
});

--------------------------------------------------------------------

// D:\web-dev\nextjs-tut\e-commerce\app\lib\getDataFromToken.js
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

// Generate JWT Token
export async function generateToken(userId) {
    return await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);
}

// Verify JWT Token
export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}
-----------------------------------------------------------

// D:\web-dev\nextjs-tut\e-commerce\app\lib\dbConfig.js
import mongoose from 'mongoose';

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
            process.exit();
        });
    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
};

export default connect;