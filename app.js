const express = require("express")
const dbconnection = require("./db/dbConfigue")
const authMiddleWare = require("./authMiddleWare/authMiddleWare")
const cors = require("cors")

const app = express();
let port = process.env.PORT
// user route middleware
const userRoute= require("./routes/userRoute")
const questionRoter = require("./routes/questionRouter")


app.use(cors())
// json middleware

app.use(express.json())

// user middleware 

app.use("/api/users", userRoute)

// question middleware
app.use("/api/questions", authMiddleWare, questionRoter)

// db connection
 
async function bombo (){
     try {
   const result = await dbconnection.execute("select 'test' ")
    await app.listen(port)
        console.log("database connected successfully")
        console.log("listening to port "+ port)
  //  console.log(result)
} catch (error) {
    console.log(error)
 }
}
bombo()

