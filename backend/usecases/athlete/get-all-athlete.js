class GetAllAthlete{
    constructor(AthleteRepository){
        this.AthleteRepository = AthleteRepository
    }

    async execute(){

        const athletes = await this.AthleteRepository.getAll();

         const now = new Date();

        return athletes.map(athlete => {
            const expireDate = new Date(athlete.expire_date);
            
            const diffInMs = expireDate - now;
            
            let daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

            if (daysRemaining < 0) daysRemaining = 0;
        

        return {
                id: athlete.id,
                name: athlete.name,
                lastName: athlete.lastName,
                phoneNumber: athlete.phoneNumber,
                createdAt: athlete.createdAt,
                expire_date: athlete.expire_date,
                daysRemaining: daysRemaining
            };
        });
    }
}

module.exports = GetAllAthlete;