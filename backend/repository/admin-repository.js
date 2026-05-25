//backend/repository/admin-repository.js

const pool = require("../config/db");
const Admin = require('../entities/admin/admin')

class AdminRepository {

    async register(admin) {

        const query = `
            INSERT INTO admin (name, last_name, phone_number , password , created_at )
            VALUES ($1, $2, $3, $4, $5 )
            RETURNING id, name, last_name,phone_number ,password ,created_at
        `;

        const values = [
            admin.name,
            admin.lastName,
            admin.phoneNumber,
            admin.password,
            admin.createdAt,
        ];

        const result = await pool.query(query, values);

        const row = result.rows[0];

        return new Admin({
            id: row.id,
            name: row.name,
            lastName: row.last_name,
            phoneNumber: row.phone_number,
            password: row.password,
            createdAt: row.created_at,
        })

    }

    async getUserBynumber(phoneNumber){
          const query = `
            SELECT id, name, last_name, phone_number,password, created_at
            FROM admin
            WHERE phone_number = $1
        `;

        const result = await pool.query(query, [phoneNumber]);

         if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return new Admin({
            id:row.id,
            name: row.name,
            lastName: row.last_name,
            phoneNumber: row.phone_number,
            password: row.password,
            createdAt : row.created_at
        })

    }
}

module.exports = AdminRepository;
