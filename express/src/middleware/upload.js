import multer, { memoryStorage } from "multer";
import {promisify} from 'util';
import dotenv from "dotenv";

dotenv.config();

export const uploadFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 },
}).single("image");

const processFileMiddleware = promisify(uploadFile);

export default processFileMiddleware;