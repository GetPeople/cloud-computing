import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, '', 
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql"
  }
);

export default db;