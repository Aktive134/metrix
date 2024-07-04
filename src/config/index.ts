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

interface IConfig {
    serverPort: string
    saltFactor: number
    JWT: IJWT
    Database: IDATABASE
    Production: PRODATABASE
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
    }
}

export default Configuration;
