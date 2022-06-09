import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Victim = db.define('victims', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  posko: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM,
    values: ["Laki-Laki", "Perempuan"],
    allowNull: true,
  },
  birthPlace: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  momName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nik: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  freezeTableName: true
});
export default Victim;