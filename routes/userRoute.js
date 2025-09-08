 const express = require("express")
 const authMiddleWare = require("../authMiddleWare/authMiddleWare")
 const {register,login,check} = require("../controller/userController")

const router = express.Router()
// user controller 
// Check
router.get("/check", authMiddleWare, check)

// register
router.post("/register", register)

// login
router.post("/login",login)



module.exports = router