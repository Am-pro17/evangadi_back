const { StatusCodes } = require("http-status-codes")
const dbconnection = require("../db/dbConfigue")
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');



async function allQuestion(req,res){
    try {
                const allquest = await dbconnection.query("SELECT question.title, question.questionId, users.username FROM question JOIN users ON question.userId = users.userId")
                res.status(StatusCodes.OK).json({ info:allquest[0]})
                // console.log(allquest[0])
             
    } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
  
}

async function askQuestion (req,res){
    try {
                const {questionTitle,questionDetail} = req.body
                const { username, userid } = req.user
                console.log(req.body)
            
                // Secret can be anything random
                const questionId = uuidv4();
                    // console.log(questionId)
                    const num1 = Math.floor(Math.random() * 10)
                    const num = num1*(Math.floor(Math.random() * 10))

                    // console.log(questionId)
                    // console.log(num)

            await dbconnection.query("INSERT INTO question (questionId, userId, title, description, tag) VALUES (?,?,?,?,?)",[questionId,userid,questionTitle,questionDetail,num])
            console.log("Question posted Successfully")
            return res.status(StatusCodes.CREATED).json({msg:"Question posted Successfully"})
            
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
        console.log(error.message)
    }
 
}

async function postAnswer (req,res){
    try {
            const { answer } = req.body
            const { username, userid} = req.user
            const { questionId } = req.params
            // console.log(answer, username, userid, questionId)
            const Postanswer = await dbconnection.query("INSERT INTO answers(userId, questionId, answer) VALUES (?,?,?)",[userid, questionId, answer])
            res.status(StatusCodes.CREATED).json({msg: "Answer posted successfully"})
    } catch (error) {
       console.log(error.message) 
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:error.message })
    }

}

async function singleQuestion(req,res){

    try {
            // console.log(req.user)
            const {questionId} = req.params
            // console.log(questionId)
            const singleQue = await dbconnection.query("SELECT users.userName, question.title, question.description, answers.answer FROM answers JOIN question ON answers.questionId = question.questionId JOIN users ON answers.userId = users.userId WHERE question.questionId = ?",[questionId])
            res.status(StatusCodes.OK).json(singleQue[0])
          
        // console.log(req)
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}


module.exports = {allQuestion,askQuestion,singleQuestion,postAnswer}