import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { DataContext } from '../context/DataContext';

const Question = () => {
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);
    const { currentQuestionIndex, setCurrentQuestionIndex, setDatCount } = useContext(DataContext);

    const getAllData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getAll_question");
            setData(response.data.questions);
            setDatCount(response.data.questions.length)
            setSelectedValues(response.data.questions.map(() => ''));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllData();
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setIsExplanationExpanded(false);
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setIsExplanationExpanded(false);
    };

    const handleInputChange = (optionIndex, e) => {
        const newSelectedValues = [...selectedValues];
        const selectedOption = data[currentQuestionIndex].option[optionIndex];
        const selectedField = Object.keys(selectedOption)[0];
        newSelectedValues[currentQuestionIndex] = selectedField;
        setSelectedValues(newSelectedValues);
        setIsAnswerCorrect(false); // Reset answer correctness when selecting a new option
    };

    const handleCheckAnswer = () => {
        const currentQuestion = data[currentQuestionIndex];
        const selectedValue = selectedValues[currentQuestionIndex];
        const correctAnswer = currentQuestion.Answer;
        setIsAnswerCorrect(selectedValue === correctAnswer);
        setIsExplanationExpanded(true);
    };

    const currentQuestion = data[currentQuestionIndex];

    return (
        <section className="">
            <div>
                <div className="h-full rounded-xl border-2 border-blue-500 w-full p-4 pb-7">
                    <p className="fontManrope-bold">Question {currentQuestion?.Question_id}</p>
                    <p className="text-s fontManrope-medium pt-3 leading-[22px] pr-10">
                        {currentQuestion?.Question}
                    </p>
                </div>
                <div className="pt-6 flex flex-col gap-4">
                    {currentQuestion?.option?.map((option, optionIndex) => (
                        <input
                            key={optionIndex}
                            className={`h-12 pl-6 cursor-pointer outline-none rounded-lg shadow-md border w-full fontManrope-medium 
                            ${selectedValues[currentQuestionIndex] === Object.keys(option)[0] ? (isAnswerCorrect ? 'bg-green-600 text-white' : 'bg-red-500 text-white') : ''}`}
                            type="text"
                            value={Object.values(option)[0]}
                            readOnly
                            onClick={(e) => handleInputChange(optionIndex, e)}
                        />
                    ))}
                </div>
                <div className="flex justify-center py-6 gap-14 fontManrope-medium">
                    <button
                        className="px-6 py-2 border rounded-xl shadow-md"
                        disabled={currentQuestionIndex === 0}
                        onClick={handlePrevQuestion}>
                        Prev
                    </button>
                    <button
                        className="px-6 py-2 border rounded-xl shadow-md"
                        disabled={currentQuestionIndex === data.length - 1}
                        onClick={handleNextQuestion}>
                        Next
                    </button>
                    <button
                        className="px-6 py-2 border rounded-xl shadow-md"
                        onClick={handleCheckAnswer}
                    >
                        Check
                    </button>
                </div>
                {isExplanationExpanded && (
                    <div className="h-[calc(100vh-35rem)] rounded-xl border-2 w-full p-6">
                        <p className="fontManrope-bold">Explanation</p>
                        <p className="text-s fontManrope-medium pt-3 leading-[22px] pr-10 pl-4 ">
                            {currentQuestion?.Question_Hint}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Question;
