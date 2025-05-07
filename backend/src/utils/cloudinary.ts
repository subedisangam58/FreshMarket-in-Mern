import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = (filePath: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            filePath,
            {
                folder: "products",
                use_filename: true,
                unique_filename: true,
                transformation: [{ width: 1000, height: 1000, crop: "limit" }]
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
    });
};