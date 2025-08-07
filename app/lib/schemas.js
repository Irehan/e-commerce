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