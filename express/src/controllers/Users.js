import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Validator from "fastest-validator";
import jwt from "jsonwebtoken";

const id_petugas_arr= [
  "12345",
  "87652",
  "55555",
];

export const getUser = async(req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

export const register = async(req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
  };

  const id_petugas = req.body.id_petugas;

  const idPetugas = id_petugas_arr.includes(id_petugas);

  if (!idPetugas) {
    return res.status(400).json({
      status: "error",
      message: "Id petugas tidak valid",
    });
  }

  const v = new Validator();

  const validate = v.validate (req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate[0].message,
    });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "Email Sudah Terdaftar",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    username: req.body.username,
    email: req.body.email,
    password,
    name: req.body.name,
    role: "petugas",
    id_petugas: req.body.id_petugas,
  };

  const createUser = await User.create(data);

  return res.json({
    status: "success",
    message: "Akun berhasil dibuat",
  
  })
}

export const login = async(req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email
      }
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({
      status: "error",
      message: "Password salah"
    });
    const idUser = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const name = user[0].name;
    const role = user[0].role;
    const id_petugas = user[0].id_petugas;

    const accessToken = jwt.sign({idUser, username, email, name, role, id_petugas}, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: '3h'
    });

    const refreshToken = jwt.sign({idUser, username, email, name, role, id_petugas}, process.env.REFRESH_TOKEN_SECRET,{
      expiresIn: '3h'
    });

    await User.update({refresh_token: refreshToken},{
      where: {
        id: idUser
      }
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ 
      status: "success",
      message: "success",
      data: {
        idUser,
        role,
        name,
        accessToken,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Email belum terdaftar"})
  }
}

export const logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findAll({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!user[0]) return res.sendStatus(204);
  const idUser = user[0].id;
  await User.update({refresh_token: null}, {
    where:{
      id: idUser
    }
  });
  res.clearCookie('refreshToken');
  return res.status(200).json({
    status: "success",
    message: "Anda berhasil logout"})
}

