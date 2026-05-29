//backend/controller/athlete-controller.js

const RegisterAthlete = require('../usecases/athlete/register-athlete')
const GetAllAthlete = require('../usecases/athlete/get-all-athlete')
const GetAthleteByFullname = require('../usecases/athlete/get-athlete-by-fullname')
const RenewAthlete = require('../usecases/athlete/renew-athlete')
const UpdatePhoneNumber = require('../usecases/athlete/update-phonenumber-athlete')





const AthleteRepository = require('../repository/athlete-repository')
const athleteRepository = new AthleteRepository()


const registerAthlete = new RegisterAthlete(athleteRepository)
const getAllAthlete = new GetAllAthlete(athleteRepository)
const getAthleteByFullname = new GetAthleteByFullname(athleteRepository)
const renewAthleteUsecase = new RenewAthlete(athleteRepository)
const updatePhoneNumberUsecase = new UpdatePhoneNumber(athleteRepository)





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

    async getAll(req , res) {
      try {

      const athletes = await getAllAthlete.execute();

      return res.status(200).json(athletes);

      } catch (error) {

        return res.status(500).json({ error: error.message });  
        
      }

    },

     async getAthleteByFullname(req , res) {
      try {

        const {name , lastName} = req.query;

           if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "name is required" });
      }

       if (!lastName || typeof lastName !== "string") {
        return res.status(400).json({ error: "lastName is required" });
      }

      const athletes = await getAthleteByFullname.execute(name , lastName);

      return res.status(200).json(athletes);

      } catch (error) {

        return res.status(500).json({ error: error.message });  
        
      }
},

async renewAthlete(req , res){
  try {
      const {id} = req.params;

       if (id === undefined || id === null || id === "") {
      return res.status(400).json({ error: "id is required" });
      }

      const athleteId = Number(id);

      const athlete = await renewAthleteUsecase.execute(athleteId)

      return res.status(200).json(athlete);


  } catch (error) {
        return res.status(500).json({ error: error.message });  
   
  }
 
},

async updatePhoneNumber(req, res) {
  try {
    const { id } = req.params;
    const { phoneNumber } = req.body;

    if (id === undefined || id === null || id === "") {
      return res.status(400).json({ error: "id is required" });
      }

      const athleteId = Number(id);

    if (!phoneNumber || typeof phoneNumber !== "string") {
      return res.status(400).json({ error: "phoneNumber is required" });
    }
    const normalized = phoneNumber.trim();
    if (!/^09\d{9}$/.test(normalized)) {
      return res.status(400).json({ error: "phoneNumber format is invalid. Example: 09xxxxxxxxx" });
    }

    const updated = await updatePhoneNumberUsecase.execute({
      athleteId,
      phoneNumber: normalized
    });

    return res.status(200).json(updated);
  } catch (error) {
    if (error.message === "athlete not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}


}