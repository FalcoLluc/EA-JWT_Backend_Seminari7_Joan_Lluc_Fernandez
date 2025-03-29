import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.handle.js';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded; // Attach user to request
        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: "Token expired",
                code: "TOKEN_EXPIRED"
            });
        }
        return res.status(403).json({ error: "Invalid token" });
    }
};

export { checkJwt };