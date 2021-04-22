import mongoose from 'mongoose';
import { environment } from './environment/environment.js';

// TODO: if file only exports one thing, function name and filename should be exact same
export const mongoConnection = async () => {
    try {
        console.info('Try connecting to MongoDB');
        await mongoose.connect(environment.mongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDb is connected`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
