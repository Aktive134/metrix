import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config';

interface UploadResponse {
    public_id: string;
    url: string;
    [key: string]: any;
}


export function generateRandomString(length = 24) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    
    return result;
}

export async function getUserData(access_token: string) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data;
}


export async function uploadImage (imageBuffer: Buffer, folder?: string): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folder || 'default_folder',
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve({
                    public_id: result?.public_id as string,
                    url: result?.secure_url as string,
                    ...result,
                });
            }
        );

        // Convert Buffer to Readable Stream
        const readableStream = new Readable();
        readableStream._read = () => {}; // _read is a no-op
        readableStream.push(imageBuffer);
        readableStream.push(null);

        readableStream.pipe(stream);
    });
};