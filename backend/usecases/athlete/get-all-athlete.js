class GetAllAthlete{
    constructor(AthleteRepository){
        this.AthleteRepository = AthleteRepository
    }

    async execute(){

        const athletes = await this.AthleteRepository.getAll();

        return athletes
    }
}

module.exports = GetAllAthlete;