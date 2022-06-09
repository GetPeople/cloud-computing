import express from "express";
import { getUser, register, login, logout } from "../controllers/Users.js";
import { getVictim, addVictim } from "../controllers/Victims.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import uploadFile from "../middleware/upload.js";

const router  = express.Router();

router.get('/users', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);
router.get('/victim/list', verifyToken, getVictim);
router.post('/victim/add', uploadFile.single('photoUrl'), verifyToken, addVictim);

export default router;