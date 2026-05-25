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

      await pool.query(`
      INSERT INTO admin (name, last_name, phone_number, password)
      VALUES ('AGT', 'tabesh', '09392078042', '$2b$10$r1cjx4iA9CvX2xn4Hh/IH.n6v65i.HKMt8KTVu2T4.R1bAXJgDq3e')
      ON CONFLICT (phone_number) DO NOTHING;
    `);

    console.log("✅ Default admin checked/inserted");  


    await pool.end();

  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();