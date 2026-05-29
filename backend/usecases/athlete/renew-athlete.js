// backend/usecases/athlete/renew-athlete.js

class RenewAthlete {
    constructor(athleteRepository) {
        this.athleteRepository = athleteRepository;
    }

    async execute(id) {
        if (!id) {
            throw new Error("athlete id is required");
        }

        const athlete = await this.athleteRepository.getById(id);

        if (!athlete) {
            throw new Error("athlete not found");
        }

        const now = new Date();
        const currentExpireDate = new Date(athlete.expire_date);

        let newExpireDate = new Date();

        if (currentExpireDate > now) {
            newExpireDate = new Date(currentExpireDate);
        } else {
            newExpireDate = new Date(now);
        }

        newExpireDate.setDate(newExpireDate.getDate() + 30);

        return await this.athleteRepository.updateExpireDate(id, newExpireDate);
    }
}

module.exports = RenewAthlete;
