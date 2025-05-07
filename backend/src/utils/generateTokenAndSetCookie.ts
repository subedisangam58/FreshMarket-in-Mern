import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSetCookie = (
    res: Response,
    userId: string
): string => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    // Generate the JWT token
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "1d", // 1 day expiration
    });

    // Set the cookie in response
    res.cookie("token", token, {
        httpOnly: true, // Cannot be accessed via JS on client
        secure: process.env.NODE_ENV === "production", // true only in HTTPS
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    return token;
};
