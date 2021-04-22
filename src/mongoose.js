import mongoose from 'mongoose';
import { environment } from './environment/environment.js';

// TODO: if file only exports one thing, function name and filename should be exact same
export const mongoConnection = async () => {
    try {
        await mongoose.connect(environment.mongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDb is connected`);
    } catch (err) {
        // TODO: if connection error, would it be great if you exit the program by process.exit(1) ?
        console.log(err);
    }
};
