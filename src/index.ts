import app from "./app"; 
import Configuration from "./config";
import Constant from "./constant";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
app.listen(Configuration.serverPort , () => console.log(Constant.messages.serverUp));

mongoose.connect(Configuration.Database.url).then(() => {
    console.log('connected to mongoDb');
}).catch((err) => {
    console.error('could not connect to mongoDb\n', err);
})

