import mongoose from "mongoose";
let isConnected = false;
const dbConnection = async () => {
  if (isConnected) {
    return;
  }
  mongoose.set("strictQuery", true);
  try {
    const connect = await mongoose.connect(process.env.url!);
    if (connect) {
      isConnected = true;
    }
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
