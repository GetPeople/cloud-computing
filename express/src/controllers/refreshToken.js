import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken
      }
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({
        status: "error",
        message: "Token tidak valid"
      });
      const idUser = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const name = user[0].name;
      const role = user[0].role;
      const id_petugas = user[0].id_petugas;

      const accessToken = jwt.sign({idUser, username, email, name, role, id_petugas}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '20m'
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
}