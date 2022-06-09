import multer from "multer";
import {v4 as uuid} from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:/BANGKIT 2022/get-people/resources/database_wajah/database/");
  },
  filename: (req, file, cb) => {
    console.log(req);
    const fileObj = {
      "image/png": ".png",
    };
    if (fileObj[file.mimetype] == undefined) {
      cb(new Error("Format foto harus .png"));
    } else {
      cb(null, uuid() + '-' + file.originalname);
    }
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

export default uploadFile;