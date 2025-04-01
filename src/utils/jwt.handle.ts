import pkg from "jsonwebtoken";
import { IUser } from "../modules/users/user_models.js"; // Import your user interface

const { sign, verify } = pkg;
const JWT_SECRET = process.env.JWT_SECRET || "token.010101010101";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh.010101010101";

// Define token payload interfaces
interface AccessTokenPayload {
    id: string;
    isAdmin: boolean;
    lastLogin: Date;
}

interface RefreshTokenPayload {
    id: string;
}

// Generate access token (short-lived)
const generateAccessToken = (user: IUser) => {
    const payload: AccessTokenPayload = {
        id: user.email, // Using email as ID
        isAdmin: user.isAdmin || false, // Default to false if undefined
        lastLogin: user.lastLogin || new Date() // Current time if undefined
    };
    
    return sign(payload, JWT_SECRET, { expiresIn: '10s' }); // 10 seconds
};

// Generate refresh token (long-lived)
const generateRefreshToken = (user: IUser) => {
    const payload: RefreshTokenPayload = {
        id: user.email // Using email as ID
    };
    
    return sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' }); // 7 days
};

// Verify access token
const verifyAccessToken = (token: string) => {
    return verify(token, JWT_SECRET) as AccessTokenPayload;
};

// Verify refresh token
const verifyRefreshToken = (token: string) => {
    return verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload;
};

export { 
    generateAccessToken, 
    generateRefreshToken, 
    verifyAccessToken, 
    verifyRefreshToken 
};