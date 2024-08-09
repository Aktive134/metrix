import express, { Application } from "express" 
import * as path from "path";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import httpLogger from "./common/logging/http-logger";
import errorHandler from "./middleware/error-handler";
import router from "./routes";

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(helmet({
    referrerPolicy: { policy: 'no-referrer-when-downgrade' }
}));

app.use(compression());
app.use(express.json());
app.use(httpLogger)
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(router)
app.use(errorHandler)

export default app