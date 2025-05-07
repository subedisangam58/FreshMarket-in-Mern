import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const protect = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Temporarily cast req.session to any to bypass TS error
        const session = req.session as any;
        const userId = session?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Not authorized - no session' });
            return;
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            res.status(401).json({ success: false, message: 'User not found' });
            return;
        }

        if (user.verificationToken) {
            res.status(403).json({ success: false, message: 'Email not verified' });
            return;
        }

        req.user = user;
        next();
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
};
