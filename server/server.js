import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";
import morgan from "morgan";

// Routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);


//Error Hanlder middleware
app.use(invalidPathHandler);
app.use(errorResponserHandler);

/* DATABASE CONNECTION AND PORT LISTENING*/
await connectDB();
const PORT = process.env.PORT || 5556;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in server setup");
  } else {
    console.log(`Server listening on Port ${PORT}`);
  }
});
