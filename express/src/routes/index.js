import express from "express";
import { getUser, register, login, logout } from "../controllers/Users.js";
import { getVictim, uploadImage } from "../controllers/Victims.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { uploadFile } from "../middleware/upload.js";
// import uploadFile from "../middleware/upload.js";
// import { uploadImage } from "../controllers/Victims.js";

const router  = express.Router();

router.get('/users', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);
router.get('/victim/list', verifyToken, getVictim);
// router.post('/victim/add', verifyToken, addVictim);
router.post('/victim/upload', uploadImage);

export default router;