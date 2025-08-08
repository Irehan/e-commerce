// D:\web-dev\nextjs-tut\e-commerce\app\models\userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    otpSecret: {
        type: String,
        default: null,
    },
    is2FAEnabled: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;