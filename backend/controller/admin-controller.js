//backend/controller/admin-controller.js

const jwt = require("jsonwebtoken");

const RegisterAdmin = require('../usecases/admin/register-admin')
const LoginAdmin = require('../usecases/admin/login-admin')


const AdminRepository = require('../repository/admin-repository')
const adminRepository = new AdminRepository()


const registerAdmin = new RegisterAdmin(adminRepository)
const GetAdminForAuth = new LoginAdmin(adminRepository)


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


    async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;

      if (!phoneNumber || !password) {
        return res.status(400).json({
          error: "phoneNumber and password are required"
        });
      }

      const admin = await GetAdminForAuth.execute(phoneNumber, password);

      if (!admin) {
        return res.status(401).json({
          error: "invalid credentials"
        });
      }

      const secret = process.env.JWT_SECRET || "DEV_SECRET_KEY";

      const token = jwt.sign(
        { id: admin.id, lastName: admin.lastName, role: 'admin' },
        secret,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "login successful",
        token,
        admin
      });

    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        error: "internal server error"
      });
    }
  }

    
}