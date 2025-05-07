import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // @ts-ignore
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            res.status(403).json({ message: 'Access denied. Insufficient role.' });
            return;
        }
        next();
    };
};