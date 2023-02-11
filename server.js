import express from "express";
import connectToDB from "./db/db.js";
import contactRoutes from "./routes/contactRoutes.js";

// Get env variables
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

// Get relative path(module)
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialise express app
const app = express();

// Connection to database
connectToDB();

// Middlewares
app.use(express.json());
app.use("/api/v1/contact-manager", contactRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle unhandled promise rejection
process.on(`unhandledRejection`, (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
