const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const oracledb = require('oracledb')
const dbConfig = require('./dbConfig.js')
console.log(dbConfig);

//
require('dotenv/config')
const app = express()
const QUERIES = require('./queries/queries.js')

// Allow requests from http://localhost:3000


//app.use(cors(corsOptions));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200

}

app.use(cors(corsOptions))
app.use('/', router)

console.log(process.env.DB_CONNECTSTRING)
//const dbOptions = {useNewUrlParser:true, useUnifiedTopology: true} //not totally sure what this does

let db;
oracledb.getConnection(dbConfig, (err, connection) => {
if (err) {
    console.error(err.message)
}
else {
    db = connection;
    console.log('Connection established')
    
}})

const port = process.env.PORT || 4000
const server = app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})

app.get('/get', async (req,res)=>{

    const sql = QUERIES.VAR_TEST;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            //console.log(sql);
            //co/nst result = await db.execute(sql, [`01-JAN-21`, `01-JAN-22`, `Austria`],
            
            const q = await db.execute(sql ,[req], {
                outFormat: oracledb.OBJECT,
               
              }, (err, result)=>{
               // console.log(result);
                
                    //res.send(JSON.stringify(result.rows, null, 2))
                      
                        //JSON.stringify(result.rows, null, 2))
                   // res.send(result)
                
            });
            res.send(JSON.stringify(result.rows, null, 2))
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

})

//query 1
app.get('/:country', async (req,res)=>{
    //formatting request to title case
    const country = req.params.country;
    //const country = (req.params.country.charAt(0).toUpperCase() + req.params.country.substr(1).toLowerCase());
    console.log(country);

    const sql = QUERIES.VAR_TEST;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            console.log(sql);
            //co/nst result = await db.execute(sql, [`01-JAN-21`, `01-JAN-22`, `Austria`],
            
            const q = await db.execute(sql ,[country], 
                //{outFormat: oracledb.OBJECT},
                (err, result)=>{
               console.log(result);
                
                    res.send(JSON.stringify(result.rows, null, 2))
                      
                        //JSON.stringify(result.rows, null, 2))
                   // res.send(result)
                
            });
            //res.send(JSON.stringify(result.rows, null, 2))
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

})

//get tuples
app.get('/get/tuples', async (req,res)=>{

    const sql = QUERIES.TOTAL_TUPLES;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            console.log(sql);
            const result = await db.execute(sql, [], // no binds
            []);
           // const q = await db.execute(sql , (err, result)=>{
                console.log(result.rows[0]);
                
                    res.send(result.rows[0])
                      
                        //JSON.stringify(result.rows, null, 2))
                    //res.send(result)
                
          //  });
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

})

//vaccine query server test
app.get('/get/vaccines', async (req,res)=>{

    const sql = QUERIES.VACCINE_QUERY;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            console.log(sql);
            const result = await db.execute(sql, [], // no binds
            {
              outFormat: oracledb.OBJECT
            });
            const q = await db.execute(sql , (err, result)=>{
                //console.log(q);
                
                    res.send(JSON.stringify(result.rows, null, 2))
                      
                        //JSON.stringify(result.rows, null, 2))
                    //res.send(result)
                
            });
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

})

//query 3
app.get('/usage/:state/:age', async (req,res)=>{
    //formatting request to title case
    const state = req.params.state;
    const age = req.params.age;
    //const country = (req.params.country.charAt(0).toUpperCase() + req.params.country.substr(1).toLowerCase());
    console.log("STATE: " + state, "AGE: " + age);

    const sql = QUERIES.QUERY_3;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            console.log(sql);
            //co/nst result = await db.execute(sql, [`01-JAN-21`, `01-JAN-22`, `Austria`],
            
            const q = await db.execute(sql ,[age, state], 
                //{outFormat: oracledb.OBJECT},
                (err, result)=>{
               console.log(result);
                
                    res.send(JSON.stringify(result.rows, null, 2))
                      
                        //JSON.stringify(result.rows, null, 2))
                   // res.send(result)
                
            });
            //res.send(JSON.stringify(result.rows, null, 2))
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

})

//query 4
app.get('/usrace/:state/:race', async (req,res)=>{
    //formatting request to title case
    const state = req.params.state;
    const race = req.params.race;
    //const country = (req.params.country.charAt(0).toUpperCase() + req.params.country.substr(1).toLowerCase());
    console.log("STATE: " + state, "RACE: " + race);

    const sql = QUERIES.QUERY_4;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            console.log(sql);
            //const result = await db.execute(sql, [`01-JAN-21`, `01-JAN-22`, `Austria`],
            
            const q = await db.execute(sql ,[race, state], 
                //{outFormat: oracledb.OBJECT},
                (err, result)=>{
               console.log(result);
                
                    res.send(JSON.stringify(result.rows, null, 2))
                      
                        //JSON.stringify(result.rows, null, 2))
                   // res.send(result)
                
            });
            //res.send(JSON.stringify(result.rows, null, 2))
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

})

//query 5 - ADD :pattern' to route when implemented
app.get('/mobility/:country/', async (req,res)=>{
    //formatting request to title case
    const country = req.params.country;
    const pattern = req.params.pattern;
    //const country = (req.params.country.charAt(0).toUpperCase() + req.params.country.substr(1).toLowerCase());
    console.log(country);

    const sql = QUERIES.QUERY_5;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            console.log(sql);
            //co/nst result = await db.execute(sql, [`01-JAN-21`, `01-JAN-22`, `Austria`],
            
            const q = await db.execute(sql ,[country], 
                //{outFormat: oracledb.OBJECT},
                (err, result)=>{
               console.log(result);
                
                    res.send(JSON.stringify(result.rows, null, 2))
                      
                        //JSON.stringify(result.rows, null, 2))
                   // res.send(result)
                
            });
            //res.send(JSON.stringify(result.rows, null, 2))
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

})

//countries menu
app.get('/get/countries', async (req,res)=>{

    const sql = `SELECT UNIQUE location FROM "MARINA.TUCKER".REGIONS ORDER BY location ASC`;
    if (db) {
        try {
            //res.setHeader('Timeout', '20');
            console.log(sql);
            const result = await db.execute(sql, [], // no binds
            {
              outFormat: oracledb.LIST
            });
            //const q = await db.execute(sql , (err, result)=>{
                //console.log(q);
                
                   res.send(JSON.stringify(result.rows, null, 2))
                      
                        //JSON.stringify(result.rows, null, 2))
                    //    console.log("result: " +    result);
                   // res.send(result)
                
            //});
        } catch (err) {
        console.log(err.message); 
        } 
    } else {
        console.log('Error: DB connection lost')
    }

    //db.close();

})

