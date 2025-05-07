import { Request, Response, NextFunction } from 'express';

export const validateRequest = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const missing = fields.filter((field) => !req.body[field]);
        if (missing.length > 0) {
            res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
            return;
        }
        next();
    };
};