import React, { useEffect, useState } from 'react'
import axios from "axios"
import { questions } from "../data"

const Questoin = () => {
    const [data, setData] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


    // console.log("questions", questions);



    const getAllData = async() => {
        try {
            await axios.get("http://localhost:5000/getAll_question")
            .then((res)=> {
                console.log(res.data.questions
                    );
                setData(res.data.questions
                    )
            })  
        } catch (error) {
             console.log(error);
        }
    }
    useEffect(()=> {
        getAllData()
    }, [])


    const handleNextQuestion = () => {
        // Increment the current question index
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };
    const handlePrevQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
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
                        className="h-12 pl-6 rounded-lg shadow-md border w-full fontManrope-medium"
                        type="text"
                        value={Object.values(option)[0]} // Assuming your options are objects with single key-value pairs
                        readOnly
                    />
                ))}
            </div>
            <div className="flex justify-center py-6 gap-14 fontManrope-medium">
                <button className="px-6 py-2 border rounded-xl shadow-md" 
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevQuestion}
                >
                    Prev
                </button>
                <button className="px-6 py-2 border rounded-xl shadow-md"
                disabled={currentQuestionIndex === data.length - 1}
                onClick={handleNextQuestion}>
                    Next
                </button>
            </div>
            <div className="h-[calc(100vh-35rem)] rounded-xl border-2 w-full p-6">
                <p className="fontManrope-bold">Explanation</p>
                <p className="text-s fontManrope-medium pt-3 leading-[22px] pr-10 pl-4 ">
                    {currentQuestion?.Question_Hint}
                </p>
            </div>
        </div>
    </section>
    )
}

export default Questoin