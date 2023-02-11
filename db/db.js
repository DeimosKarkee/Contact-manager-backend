import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Connect to the database at ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

export default connectToDB;
