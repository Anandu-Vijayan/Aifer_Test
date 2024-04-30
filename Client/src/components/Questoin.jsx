import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { DataContext } from '../context/DataContext';
import QuestoinCount from './QuestoinCount';

const Question = () => {
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState(Array(data.length).fill('')); // Initialize array with empty strings
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(Array(data.length).fill(false)); // Initialize array with false values
    const [explanationVisible, setExplanationVisible] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(Array(data.length).fill('')); // Initialize array with empty strings
    const [attemptedCheck, setAttemptedCheck] = useState(false); // Track if check was attempted without selecting an option
    const {currentQuestionIndex, setCurrentQuestionIndex, setDatCount, dataCount } = useContext(DataContext);

    const numbersArray = Array.from({ length: dataCount }, (_, index) => index + 1);

    const getAllData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getAll_question");
            setData(response.data.questions);
            setDatCount(response.data.questions.length);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllData();
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setExplanationVisible(false); // Hide explanation for the next question
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setExplanationVisible(false); // Hide explanation for the previous question
    };
    const handleInputChange = (optionIndex, e) => {
        const newSelectedValues = [...selectedValues];
        const selectedOption = data[currentQuestionIndex].option[optionIndex];
        const selectedField = Object.keys(selectedOption)[0];
        newSelectedValues[currentQuestionIndex] = selectedField;
        setSelectedValues(newSelectedValues);

        // If attempted check was made without selecting an option, immediately check answer
        if (attemptedCheck) {
            handleCheckAnswer();
        }
    };
// chenging the right and wrong answer for both cases //

    const handleCheckAnswer = () => {
        const correctAns = data[currentQuestionIndex].Answer;
        const selectedAns = selectedValues[currentQuestionIndex];

        // Check if any option has been selected
        if (selectedAns) {
            const newIsAnswerCorrect = [...isAnswerCorrect];
            newIsAnswerCorrect[currentQuestionIndex] = correctAns === selectedAns;
            setIsAnswerCorrect(newIsAnswerCorrect);
            setExplanationVisible(true);
            const newCorrectAnswers = [...correctAnswers];
            newCorrectAnswers[currentQuestionIndex] = correctAns;
            setCorrectAnswers(newCorrectAnswers);
            setAttemptedCheck(false); // Reset attempted check state
        } else {
            // If no option has been selected, set attempted check state to true
            setAttemptedCheck(true);
            setExplanationVisible(true);
        }
    };

    const currentQuestion = data[currentQuestionIndex];

    return (
        <>

            <div className=' flex pt-8 gap-5'>
                <div className='bg-red600 w-[78%] '>
                    {/* <Questoin /> */}
                    <section className="">
                        <div>
                            <div className="h-full rounded-xl border-2 border-blue-500 w-full p-4 pb-7">
                                <p className="fontManrope-bold">Question {currentQuestion?.Question_id}</p>
                                <p className="text-s fontManrope-medium pt-3 leading-[22px] pr-10">
                                    {currentQuestion?.Question}
                                </p>
                            </div>
                            <div className="pt-6 flex flex-col gap-4">
                                {currentQuestion?.option?.map((option, optionIndex) => {
                                    const optionKey = Object.keys(option)[0];
                                    const isSelected = selectedValues[currentQuestionIndex] === optionKey;
                                    const isAnswerCorrectForCurrentQuestion = isAnswerCorrect[currentQuestionIndex];
                                    // console.log(isAnswerCorrectForCurrentQuestion);
                                    const isCorrect = correctAnswers[currentQuestionIndex] === optionKey;
                                    console.log("isSelected", isAnswerCorrectForCurrentQuestion);
                                    return (
                                        <input
                                            key={optionIndex}
                                            className={`h-12 pl-6 cursor-pointer outline-none rounded-lg shadow-md border w-full fontManrope-medium 
                            ${isSelected ? (isAnswerCorrectForCurrentQuestion ? 'bg-green-300 text-white' : 'bg-blue-300 text-white') : ''}
                            ${isCorrect ? 'bg-green-300 text-white' : ''}`}
                                            type="text"
                                            value={Object.values(option)[0]}
                                            readOnly
                                            onClick={(e) => handleInputChange(optionIndex, e)}
                                        />
                                    );
                                })}
                            </div>
                            <div className="flex justify-center py-6 gap-14 fontManrope-medium">
                                <button
                                    className="px-6 py-2 border rounded-xl shadow-md cursor-pointer"
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

                                {/* <button
                                    className="px-6 py-2 border rounded-xl shadow-md"
                                    onClick={handleCheckAnswer}
                                >
                                    Check
                                </button> */}
                            </div>
                            {explanationVisible && (
                                <div className="h-[calc(100vh-35rem)] rounded-xl border-2 w-full p-6">
                                    <p className="fontManrope-bold">Explanation</p>
                                    <p className="text-s fontManrope-medium pt-3 leading-[22px] pr-10 pl-4 ">
                                        {currentQuestion?.Question_Hint}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
                <div className='bg-blue600 w-[22%] '>
                    {/* <QuestoinCount /> */}
                    <section className='h-full border-2 rounded-xl p-7 fontManrope-medium'>
                        <div className='flex justify-between'>
                            <p>Question {currentQuestionIndex + 1}/{dataCount}</p>
                            <p  onClick={handleCheckAnswer}  className='cursor-pointer hover:scale-105 duration-200'>Need Help ?</p>
                        </div>
                        <div className='pt-10 flex items-center flex-wrap gap-4'>
                            {/* Map over the numbersArray to render div elements */}
                            {numbersArray.map((number) => (
                                <div
                                    key={number}
                                    className={`w-10 h-10 rounded-full text-white flex justify-center items-center ${currentQuestionIndex + 1 >= number ? 'bg-blue-400' : 'bg-gray-400'
                                        }`}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

        </>
    );
};

export default Question;
