//backend/usecases/athlete/registe-athlete.js

const Athlete = require('../../entities/athlete/athlete')
const bcrypt = require("bcrypt")


class RegisterAthlete{
    constructor(AthleteRepository){
        this.AthleteRepository = AthleteRepository
    }

    async execute({ name , lastName, phoneNumber , password }) {

        try {
         const passwordHash = await bcrypt.hash(password,10)

        const athlete = new Athlete({
            id: null ,
            name : name,
            lastName : lastName,
            phoneNumber : phoneNumber,
            password : passwordHash
        })

        const registeredAthlete = await this.AthleteRepository.register(athlete)
        return registeredAthlete   
        } catch (error) {
            throw new Error(error.message)
        }
        
    }
}

module.exports = RegisterAthlete;