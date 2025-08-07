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
