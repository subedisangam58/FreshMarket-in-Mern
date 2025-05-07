import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // Use true if SMTP requires SSL (e.g., port 465)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendMail = async (
    to: string,
    subject: string,
    html: string,
    from: string = process.env.MAIL_FROM || "no-reply@farmersmart.com"
): Promise<void> => {
    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
        });

        if (process.env.NODE_ENV !== "production") {
            console.log(`Email sent to ${to}`);
            console.log(`Message ID: ${info.messageId}`);
        }
    } catch (error: any) {
        console.error("Email sending failed:", error.message);
        throw new Error("Failed to send email.");
    }
};

