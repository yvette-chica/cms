import mongoose from 'mongoose';
import { mongoDbUrl } from './config/database';

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) return handler(req, res);
    // Using new database connection
    await mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    return handler(req, res);
}

export default connectDb;