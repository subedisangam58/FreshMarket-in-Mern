import { sendMail } from '../config/mail';
import { VERIFICATION_EMAIL_TEMPLATE } from './templates/verificationEmail';
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from './templates/passwordResetSuccess';
import { PASSWORD_RESET_REQUEST_TEMPLATE } from './templates/passwordResetRequest';
import { WELCOME_EMAIL_TEMPLATE } from './templates/welcomeEmail';
import { PRODUCT_CREATED_TEMPLATE } from './templates/productCreatedEmail';

export const sendVerificationEmail = async (email: string, code: string) => {
    try {
        const html = VERIFICATION_EMAIL_TEMPLATE(code);
        await sendMail(email, 'Verify Your Email', html);
    } catch (err: any) {
        console.error(`Failed to send verification email to ${email}:`, err.message);
        throw err;
    }
};

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE(resetURL);
    await sendMail(email, 'Reset Your Password', html);
};

export const sendResetSuccessEmail = async (email: string) => {
    const html = PASSWORD_RESET_SUCCESS_TEMPLATE();
    await sendMail(email, 'Password Reset Successful', html);
};

export const sendWelcomeEmail = async (email: string, name: string) => {
    const html = WELCOME_EMAIL_TEMPLATE(name);
    await sendMail(email, 'Welcome to FarmerSmart', html);
};

export const sendProductCreatedEmail = async (
    email: string,
    name: string,
    category: string,
    price: number,
    quantity: number
) => {
    const html = PRODUCT_CREATED_TEMPLATE(name, category, price, quantity);
    await sendMail(email, 'Your Product Has Been Created Successfully', html);
};
