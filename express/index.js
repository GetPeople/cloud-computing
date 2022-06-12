import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./src/config/database.js";
// import User from "./models/userModel.js";
// import Victim from "./src/models/victimModel.js";
import router from "./src/routes/index.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();

const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__basedir = __dirname;

try {
  await db.authenticate();
  console.log('Koneksi berhasil!');
  // await Victim.sync();
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, ()=> console.log("Server running at port " + port));