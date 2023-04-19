import mongoose from 'mongoose';
const dbName = process.env.MONGODB_DATABASE_NAME;
const dbPass = process.env.MONGODB_PASSWORD;
const dbUrl = `mongodb://${dbName}:${dbPass}@localhost:6000/munic?authSource=admin`;
const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connected...');
    }
    catch (error) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
};
export default connectDB;
