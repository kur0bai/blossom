import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath } from "url";
import configFile from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"));

for (const file of files) {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((name) => {
  if (db[name].associate) db[name].associate(db);
});

export default { ...db, sequelize, Sequelize };
