import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuizApp from './components/QuizApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <QuizApp />
        </div>
    </>
  )
}

export default App
