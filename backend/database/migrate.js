//database/migrate.js
const pool = require("../config/db");

async function migrate() {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS athlete (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expire_date TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '30 days')
);

    `);

    console.log("✅ Athlete table created");

     await pool.query(`
  CREATE TABLE IF NOT EXISTS admin (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,   
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
    `);

    console.log("✅ Admin table created");


    await pool.end();

  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();