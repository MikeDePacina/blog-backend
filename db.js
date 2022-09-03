const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "songreview",
  password: "loona",
  port: "5432",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
