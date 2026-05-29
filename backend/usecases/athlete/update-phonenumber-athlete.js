class UpdatePhoneNumber{
    constructor(AthleteRepository){
        this.AthleteRepository = AthleteRepository
    }

    async execute({athleteId , phoneNumber}){

           if (!athleteId) {
            throw new Error("athlete id is required");
        }

        const athlete = await this.AthleteRepository.getById(athleteId);

         if (!athlete) {
            throw new Error("athlete not found");
        }

        return await this.AthleteRepository.updateAthletePhoneNumber(athleteId, phoneNumber);


    }
}

module.exports = UpdatePhoneNumber;