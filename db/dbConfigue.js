require("dotenv").config()
const mysql2 = require('mysql2') 

const dbconnection = mysql2.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:"sql3.freesqldatabase.com",
    password:process.env.PASSWORD,
    connectionLimit:10
})

// dbconnection.execute("select 'test' ", (err,result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })

module.exports = dbconnection.promise()