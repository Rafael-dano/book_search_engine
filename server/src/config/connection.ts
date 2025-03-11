import mongoose, { ConnectOptions } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI!, {
        useUnifiedTopology: true
} as ConnectOptions);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };
  
  export default connectDB;
