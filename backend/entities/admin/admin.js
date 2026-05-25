//backend/entity/admin/Admin.js

class Admin{
    constructor({
        id,
        name,
        lastName,
        phoneNumber,
        password,
        createdAt = new Date(),
    }){
        this.id = id
        this.name = name
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.password = password
        this.createdAt = createdAt
    }

    
}

module.exports = Admin