import React from 'react'
import Questoin from '../components/Questoin'
import QuestoinCount from '../components/QuestoinCount'

const QuestionPage = () => {
    return (
        <div className='p-4 h-screen'>
            <div className='flex w-full  justify-center'>
                <p className='fontManrope-bold'>Quiz Title</p>
            </div>

            {/* <div className=' flex pt-8 gap-5'>
               <div className='bg-red600 w-[78%] '>
                  <Questoin />
               </div>
               <div className='bg-blue600 w-[22%] '>
                  <QuestoinCount />
               </div>
            </div> */}
            <Questoin />
        </div>
    )
}

export default QuestionPage