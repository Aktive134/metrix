import * as dotenv from "dotenv";
dotenv.config();

interface IJWT {
    secret: string;
    issuer: string;
    expires: number;
    subject: string;
    algorithm: string;
}
interface IDATABASE {
   url: string
   urlSample: string
}

interface PRODATABASE {
    database: string
}
interface OAuth {
    client_id: string,
    client_secret: string,
    session_key: string,
    callback_url: string
}

interface Cloudinary {
    cloud_name: string,
    cloud_api_key: string,
    cloud_api_secret: string
}

interface IConfig {
    serverPort: string
    saltFactor: number
    JWT: IJWT
    Database: IDATABASE
    Production: PRODATABASE,
    OAuth: OAuth,
    cloudinary_setup: Cloudinary
}


const Configuration: IConfig = {
    serverPort: process.env.PORT as string,
    saltFactor: Number(process.env.SALT_FACTOR),
    JWT: {
        secret: process.env.JWT_SECRET as string,
        issuer: process.env.JWT_ISSUER as string,
        subject: process.env.JWT_SUBJECT as string,
        algorithm: process.env.JWT_ALGORITHM as string,
        expires: Number(process.env.JWT_EXPIRES)
    },
    Database: {
        url: process.env.MONGO_URL as string,
        urlSample: process.env.MONGO_URL_SAMPLE as string,
    },
    Production: {
        database: process.env.PRODUCTION_DATABASE as string,
    },
    OAuth: {
        client_id: process.env.CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
        session_key: process.env.SESSION_KEY as string,
        callback_url: process.env.REDIRECT_URL as string
    },
    cloudinary_setup: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
        cloud_api_key: process.env.CLOUDINARY_API_KEY as string,
        cloud_api_secret: process.env.CLOUDINARY_API_SECRET as string,

    }
}

export default Configuration;
