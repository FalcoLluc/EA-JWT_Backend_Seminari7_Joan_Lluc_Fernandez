import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
const JWT_SECRET = process.env.JWT_SECRET || "token.010101010101";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh.010101010101";

// Generate access token (short-lived)
const generateAccessToken = (id: string) => {
    return sign({ id }, JWT_SECRET, { expiresIn: '10s' }); // 10 seconds
};

// Generate refresh token (long-lived)
const generateRefreshToken = (id: string) => {
    return sign({ id }, JWT_REFRESH_SECRET, { expiresIn: '7d' }); // 7 days
};

// Verify access token
const verifyAccessToken = (token: string) => {
    return verify(token, JWT_SECRET);
};

// Verify refresh token
const verifyRefreshToken = (token: string) => {
    return verify(token, JWT_REFRESH_SECRET);
};

export { 
    generateAccessToken, 
    generateRefreshToken, 
    verifyAccessToken, 
    verifyRefreshToken 
};