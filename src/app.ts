import express, { Application } from "express";
import * as path from "path";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import httpLogger from "./common/logging/http-logger";
import errorHandler from "./middleware/error-handler";
import multer from 'multer';  // Import multer
import router from "./routes";

const app: Application = express();

// Multer setup for file uploads
const upload = multer({ 
  limits: { fileSize: 10 * 1024 * 1024 }  // 10 MB limit
});

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(helmet({
    referrerPolicy: { policy: 'no-referrer-when-downgrade' }
}));

app.use(upload.single('image'));  // Handle single file upload with key 'image'

app.use(compression());
app.use(express.json());
app.use(httpLogger);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(router);
app.use(errorHandler);

export default app;
