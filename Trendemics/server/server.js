const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const oracledb = require('oracledb')
const dbConfig = require('./dbConfig.js')
require('dotenv/config')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)

console.log(process.env.DB_CONNECTSTRING)
//const dbOptions = {useNewUrlParser:true, useUnifiedTopology: true} //not totally sure what this does

oracledb.getConnection(dbConfig, (err, connection) => {
if (err) {
    console.error(err.message)
}
else {
    
    console.log('Connection established')
    
}})

const port = process.env.PORT || 4000
const server = app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})