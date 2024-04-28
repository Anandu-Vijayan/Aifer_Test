const {createQuestion, getAllQuestion} = require("../controllers/question.controller.js");

  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create_question",createQuestion )
    router.get("/getAll_question",getAllQuestion)
   

  
module.exports =router