import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

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
