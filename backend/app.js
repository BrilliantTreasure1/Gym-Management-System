//backend/app.js

const express = require('express')

const athleteController = require('./controller/athlete-controller')
const adminController = require('./controller/admin-controller')


const app = express()
app.use(express.json())

app.get('/' , (req ,res ) => {
    res.send("salam")
})

app.post('/register/admin' ,adminController.register )
app.post('/register/athlete' ,athleteController.register )


 app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });