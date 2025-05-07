// File: /src/utils/sendResponse.ts
import { Response } from "express";

export const sendResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data?: any
): Response => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message,
        data,
    });
};
