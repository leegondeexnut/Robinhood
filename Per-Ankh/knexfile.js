require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      port: process.env.PG_PORT,
    },
  },
};
