//backend/controller/athlete-controller.js

const RegisterAthlete = require('../usecases/athlete/register-athlete')

const AthleteRepository = require('../repository/athlete-repository')
const athleteRepository = new AthleteRepository()


const registerAthlete = new RegisterAthlete(athleteRepository)

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

      const athlete = await registerAthlete.execute({name , lastName , phoneNumber ,password})
      
      return res.status(201).json(athlete);



        } catch (error) {
            return res.status(500).json({ error: error.message });  
        }
    },

    
}