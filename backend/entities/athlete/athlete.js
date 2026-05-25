//backend/entitiy/athlete/athlete.js

class athlete{
    constructor({
        id,
        name,
        lastName,
        phoneNumber,
        password,
        createdAt = new Date(),
        expire_date
    }){
        this.id = id
        this.name = name
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.password = password
        this.createdAt = createdAt
        this.expire_date = expire_date
    }

    
}

module.exports = athlete