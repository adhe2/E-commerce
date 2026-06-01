import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";

import "./model/Associations.js";

dotenv.config();

const app = express();

// await db.authenticate();
// await db.sync();

app.use(express.json());
app.use(cors({ credentials: true }));

app.listen(process.env.APP_PORT, () => {
  try {
    console.log("Server up and running");
  } catch (error) {
    console.log(error);
  }
});
