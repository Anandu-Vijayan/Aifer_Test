import React from 'react'
import { Link } from 'react-router-dom'

const LanginPage = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
                <a href="#_" className="relative  items-center justify-start px-8 py-4 overflow-hidden font-bold rounded-full group bg-black">
            <Link to="/questions">
                    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-blue-00 opacity-[3%]"></span>
                    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-400  opacity-100 group-hover:-translate-x-8"></span>
                    <span className="relative w-full text-left text-white group-hover:text-white transition-colors duration-200 ease-in-out fontManrope-medium">Get Started</span>
                    <span className="absolute  border-white rounded-full"></span>
        </Link>
                </a>
            </div>
    )
}

export default LanginPage