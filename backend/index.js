const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./src/routes/route')
const {dbConnection} = require('./src/Config/dbConfig')

const config = require('./src/Config/config');

app.use(cors())
app.use(express.json())
app.use(route)

const serverStart = async()=>{
    try {
        dbConnection()
        app.listen(config.PORT, ()=>{
            console.log('Express app running on', config.PORT)
        })
    } catch (error) {
        console.log(error.message)
    }
}

serverStart()