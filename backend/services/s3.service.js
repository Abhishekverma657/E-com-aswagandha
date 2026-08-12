import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configure S3 Client (Compatible with AWS and MEGA S4)
const s3Config = {
    region: process.env.AWS_REGION || "eu-central-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
};

// Add endpoint for MEGA S4 if provided
if (process.env.AWS_S3_ENDPOINT) {
    s3Config.endpoint = process.env.AWS_S3_ENDPOINT;
    s3Config.forcePathStyle = true; // Often required for S3-compatible services like MEGA
}

const s3Client = new S3Client(s3Config);
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "node-media";

/**
 * Generate a Signed URL for a given S3 key
 */
export async function getSignedImageUrl(key) {
    if (!key) return null;
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        // Signed URL valid for 1 hour (3600 seconds)
        return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return null;
    }
}

export function getS3Url(key) {
    if (!key) return null;

    if (process.env.AWS_S3_ENDPOINT) {
        const accountId = "biijszzsfufvateaffbvtjapmculhceod7agr";
        return `https://s3.eu-central-1.s4.mega.io/${accountId}/${BUCKET_NAME}/${key}`;
    }
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "ap-south-1"}.amazonaws.com/${key}`;
}

/**
 * Helper to get buffer and content type from various inputs
 */
async function prepareUploadData(input) {
    let buffer;
    let contentType = "image/jpeg"; // Default

    if (Buffer.isBuffer(input)) {
        buffer = input;
    } else if (typeof input === "string") {
        if (input.length < 500 && fs.existsSync(input)) {
            buffer = fs.readFileSync(input);
            const ext = path.extname(input).toLowerCase();
            if (ext === ".png") contentType = "image/png";
            else if (ext === ".pdf") contentType = "application/pdf";
            else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
        } else {
            const base64Regex = /^data:(.*?);base64,/;
            const match = input.match(base64Regex);
            if (match) {
                contentType = match[1];
                const base64Data = input.replace(base64Regex, "");
                buffer = Buffer.from(base64Data, "base64");
            } else {
                try {
                    buffer = Buffer.from(input, "base64");
                } catch (e) {
                    buffer = Buffer.from(input);
                }
            }
        }
    }

    return { buffer, contentType };
}

/**
 * Upload generic image to S3 (Works for files, base64, buffer)
 */
export async function uploadImage(fileInput, folder = "uploads", resourceType = "auto", publicId = null) {
    try {
        const { buffer, contentType } = await prepareUploadData(fileInput);

        let extension = "jpg";
        if (contentType.includes("pdf")) extension = "pdf";
        else if (contentType.includes("png")) extension = "png";
        else if (contentType.includes("mp4")) extension = "mp4";
        else if (contentType.includes("webm")) extension = "webm";
        else if (contentType.includes("quicktime") || contentType.includes("mov")) extension = "mov";

        const cleanName = (name) => name.replace(/\s+/g, "_").replace(/[^\w.-]/g, "");
        const baseName = publicId ? cleanName(publicId) : `${Date.now()}_file`;

        const fileName = `${baseName}.${extension}`;
        const key = `${folder}/${fileName}`;

        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        }));

        return getS3Url(key);
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw new Error(`Failed to upload to S3: ${error.message}`);
    }
}

/**
 * Delete file from S3
 */
export async function deleteFile(fileUrl) {
    try {
        if (!fileUrl) return;

        let key = "";
        if (process.env.AWS_S3_ENDPOINT) {
            const parts = fileUrl.split(`${BUCKET_NAME}/`);
            if (parts.length > 1) key = parts[1];
        } else {
            const urlParts = fileUrl.split(".amazonaws.com/");
            if (urlParts.length > 1) key = urlParts[1];
        }

        if (!key) return;

        await s3Client.send(new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        }));
    } catch (error) {
        console.error("Error deleting from S3:", error);
    }
}
