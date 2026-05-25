//backend/repository/athlete-repository.js

const pool = require("../config/db");
const Athlete = require('../entities/athlete/athlete')

class AthleteRepository {

    async register(athlete) {

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);

        const query = `
            INSERT INTO athlete (name, last_name, phone_number , password , created_at , expire_date)
            VALUES ($1, $2, $3, $4, $5 , $6)
            RETURNING id, name, last_name,phone_number ,password ,created_at,expire_date
        `;

        const values = [
            athlete.name,
            athlete.lastName,
            athlete.phoneNumber,
            athlete.password,
            athlete.createdAt,
            expireDate
        ];

        const result = await pool.query(query, values);

        const row = result.rows[0];

        return new Athlete({
            id: row.id,
            name: row.name,
            lastName: row.last_name,
            phoneNumber: row.phone_number,
            password: row.password,
            createdAt: row.created_at,
            expire_date: row.expire_date
        })

    }
}

module.exports = AthleteRepository;
