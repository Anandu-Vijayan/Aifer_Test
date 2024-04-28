import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const QuestoinCount = () => {
  const { currentQuestionIndex, setCurrentQuestionIndex, dataCount  } = useContext(DataContext)
  const numbersArray = Array.from({ length: dataCount }, (_, index) => index + 1);

  console.log("dataCount", dataCount);
  return (
    <section className='h-full border-2 rounded-xl p-7 fontManrope-medium'>
      <div className='flex justify-between'>
        <p>Question {currentQuestionIndex + 1}/{dataCount}</p>
        <p >Need Help ?</p>
      </div>
      <div className='pt-10 flex items-center flex-wrap gap-4'>
        {/* Map over the numbersArray to render div elements */}
        {numbersArray.map((number) => (
          <div
            key={number}
            className={`w-10 h-10 rounded-full text-white flex justify-center items-center ${
              currentQuestionIndex + 1 >= number ? 'bg-blue-400' : 'bg-gray-400'
            }`}
          >
            {number}
          </div>
        ))}
      </div>
    </section>
  )
}

export default QuestoinCount