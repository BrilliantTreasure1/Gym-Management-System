//backend/app.js

const express = require('express')

const athleteController = require('./controller/athlete-controller')
const adminController = require('./controller/admin-controller')
const authMiddleware = require("./middleware/auth")
const roleCheck = require("./middleware/role-check")




const app = express()
app.use(express.json())

app.get('/' , (req ,res ) => {
    res.send("salam")
})

app.post('/auth/login', adminController.login);


app.post('/register/admin' ,authMiddleware , roleCheck,adminController.register )
app.post('/register/athlete' ,authMiddleware , roleCheck,athleteController.register )

app.get('/athletes' , authMiddleware ,roleCheck , athleteController.getAll)
app.get('/athlete/fullname' , authMiddleware ,roleCheck , athleteController.getAthleteByFullname)
app.patch('/athlete/:id/renew' , authMiddleware ,roleCheck , athleteController.renewAthlete)
app.patch('/athlete/:id/update/phonenumber' , authMiddleware ,roleCheck , athleteController.updatePhoneNumber)





 app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });