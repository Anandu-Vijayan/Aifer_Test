import { useState } from "react"
import { DataContext } from "./context/DataContext"
import QuestionPage from "./pages/QuestionPage"
import { Routes, Route } from "react-router-dom";
import LanginPage from "./pages/LanginPage";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dataCount, setDatCount] = useState(0)


  return (
    <>
      <DataContext.Provider value={{ currentQuestionIndex, setCurrentQuestionIndex, setDatCount, dataCount }}>
        <Routes>
          <Route path='/' element={<LanginPage />} />
          <Route path='/questions' element={ <QuestionPage />} />
        </Routes>
      </DataContext.Provider>
    </>
  )
}

export default App
