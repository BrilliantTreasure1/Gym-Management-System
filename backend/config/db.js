//backend/config/db.js

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "gym_api"
});

module.exports = pool;
