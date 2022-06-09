import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["petugas", "pengguna"],
    allowNull: false,
    defaultValue: "pengguna",
  },
  id_petugas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  refresh_token: {
    type: DataTypes.TEXT
  },
},{
  freezeTableName:true
});

export default User;