const authMiddleWare = require("../authMiddleWare/authMiddleWare");
const express = require("express");
const StatusCodes = require("http-status-codes")
const { allQuestion, askQuestion, singleQuestion, postAnswer } = require("../controller/questionController")

const router = express.Router();

// show all question
router.get("/all-question", allQuestion);

// ask question
router.post("/askQuestion", askQuestion)

// post question

router.post("/postAnswer/:questionId", postAnswer)

// get single question

router.get("/singleQuestion/:questionId",singleQuestion)


module.exports = router