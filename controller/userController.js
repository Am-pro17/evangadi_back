const bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes")
const dbconnection = require("../db/dbConfigue")
const jwt = require("jsonwebtoken")


async function register (req,res) {    
        const {firstName, lastName, email, password, userName}=req.body
        if (!firstName||!lastName||!email||!password||!userName){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "please enter all field"})
        }
            try{
                const [user] = await dbconnection.query("SELECT userName, userId from users where  userName = ? or email=?", [userName, email])
                    if(user.length>0){
                        return res.status(StatusCodes.BAD_REQUEST).json({msg: "already registerd"})
                    }
                    if(password.length<=8){
                        return res.status(StatusCodes.BAD_REQUEST).json({msg:"password should be greater than 8"})
                    }
                    // encrypt password
                    const salt = await bcrypt.genSalt(10)

                    const harshedPassword = await bcrypt.hash(password,salt)

                await dbconnection.query("INSERT INTO users (firstName, lastName, email, password, userName) VALUES (?,?,?,?,?)", [firstName, lastName, email, harshedPassword, userName]) 
            
                return res.status(StatusCodes.CREATED).json({ msg :"user created perfectly natural"})
            }
            catch(err){
                console.log(err.message)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : "some went wrong"})
            }


}


async function login (req,res) {
    const {email, password} = req.body
    if(!email || !password){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter email and password"})
    }
    try {

        const [someUser] = await dbconnection.query("SELECT userName, userId, password FROM users where email=?", [email])
        if(someUser.length){
            // console.log(someUser)
            // checking the password
            const ismatch = await bcrypt.compare(password,someUser[0].password)
            if(!ismatch){
               return res.status(400).json({msg: "incorrect password"})
            }

            const username =someUser[0].userName
            const userid = someUser[0].userId
            const token = jwt.sign({username,userid}, process.env.JWT_SECRET, {expiresIn : "1d"})

            return res.status(200).json({msg : "logged in successfully",token ,username} )
        }else{
            return res.status(400).json({msg: "this user is not registered"})
            
        }
        
    } catch (error) {

        console.log(error)
        return res.status(500).send(error.message);
    }
}


async function check (req,res) {
    const {username,userid} = req.user
    res.status(StatusCodes.OK).json({msg: "valid user with the name", username, userid})

}

module.exports = {register,login,check}
