//backend/controller/athlete-controller.js

const RegisterAdmin = require('../usecases/admin/register-admin')

const AdminRepository = require('../repository/admin-repository')
const adminRepository = new AdminRepository()


const registerAdmin = new RegisterAdmin(adminRepository)

module.exports = {
    async register(req , res){

        try {

         const {name , lastName , phoneNumber , password} = req.body;

         if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "name is required" });
      }

       if (!lastName || typeof lastName !== "string") {
        return res.status(400).json({ error: "lastName is required" });
      }

      if (!phoneNumber) {
        return res.status(400).json({ error: "phoneNumber is required" });
      }

      if (!password) {
        return res.status(400).json({ error: "password is required" });
      }

      const admin = await registerAdmin.execute({name , lastName , phoneNumber ,password})
      
      return res.status(201).json(admin);



        } catch (error) {
            return res.status(500).json({ error: error.message });  
        }
    },

    
}