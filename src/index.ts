import app from "./app"; 
import Configuration from "./config";
import Constant from "./constant";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const port = process.env.PORT || 4600;
app.listen(Configuration.serverPort , () => console.log(`App is up and running on Configured port ${port}`));

mongoose.set("strictQuery", false);
mongoose.connect(Configuration.Database.url).then(() => {
    console.log('connected to mongoDb');
}).catch((err) => {
    console.error('could not connect to mongoDb\n', err);
})


