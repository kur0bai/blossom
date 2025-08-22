require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "rickmortydb",
    host: process.env.DB_HOST || "db",
    dialect: "postgres",
  },
};
