//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import SymptomForm from './components/SymptomForm'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      
      <div  className="header-container">
        <h1>Treatment Recommendation System</h1>
        <SymptomForm />
    </div>
    </>
  )
}

export default App
