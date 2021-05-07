import mongoose from 'mongoose';
import { environment } from './environment/environment.js';

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
