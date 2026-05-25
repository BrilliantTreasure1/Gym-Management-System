//backend/usecases/admin/register-admin.js

const Admin = require('../../entities/admin/admin')
const bcrypt = require("bcrypt")


class RegisterAdmin{
    constructor(AdminRepository){
        this.AdminRepository = AdminRepository
    }

    async execute({ name , lastName, phoneNumber , password }) {

        try {
         const passwordHash = await bcrypt.hash(password,10)

        const admin = new Admin({
            id: null ,
            name : name,
            lastName : lastName,
            phoneNumber : phoneNumber,
            password : passwordHash
        })

        const registeredAdmin = await this.AdminRepository.register(admin)
        return registeredAdmin   
        } catch (error) {
            throw new Error(error.message)
        }
        
    }
}

module.exports = RegisterAdmin;