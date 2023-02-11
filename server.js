import express from "express";
import connectToDB from "./db/db.js";

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const app = express();
connectToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});
