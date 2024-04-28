const db = require("../models"); 
const QuestionModel = db.question;

exports.createQuestion = async (req, res) => {
    try {
        const { Question, Question_Hint, A, B, C, D, Answer } = req.body;
        const newQuestion = await QuestionModel.create({ Question, Question_Hint, A, B, C, D, Answer });
        res.status(201).json({ question: newQuestion }); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
}

exports.getAllQuestion = async (req, res) => {
    try {
        const allQuestions = await QuestionModel.findAll({});
        const formattedQuestions = allQuestions.map(question => {
            const { A, B, C, D, ...rest } = question.toJSON();
            const options = [{ 'A': A }, { 'B': B }, { 'C': C }, { 'D': D }]; 
            return { ...rest, option: options };
        });
        res.status(200).json({ questions: formattedQuestions });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


