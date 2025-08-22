import db from "../../models/index.js";

export const sequelize = db.sequelize;
export const models = { Character: db.Character, Origin: db.Origin };
