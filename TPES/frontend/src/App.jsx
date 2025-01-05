//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import SymptomForm from './components/SymptomForm'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      
      <div  className="grid grid-cols-5 min-h-screen bg-white h-screen w-screen" >
       <div className="col-span-1 bg-white flex items-end justify-center pb-6">
        <div className="h-[43rem] w-[16rem] bg-[#02040F] rounded-lg p-4 border-white border-2 shadow flex flex-col justify-between">
          <div className=" flex flex-col  items-end w-full gap-2">
            <button className="h-8 w-8 border-white border-2 mb-6"></button>
            <div className="w-full h-12 rounded bg-[#474747]"></div>
            <div className="w-full h-12 rounded bg-[#474747]"></div>
          </div>
          <div className="bg-white w-full h-16 rounded-lg"></div>
        

        </div>
        </div> 
        <div className="col-span-4 grid grid-rows-12">
        <div className="row-span-1 flex pt-5 justify-end gap-8 px-6 ">
          <button className="h-8 w-8"></button>
<button className="h-8 w-8"></button>
        </div>
        <div className="row-span-3">
          <div className="flex flex-col items-center justify-center h-full">
          <h1 className='text-3xl font-semibold'>What can I help you with?</h1>
          <span >Tell me your symptoms, and I will guide you</span>
          </div>
        </div>
          
          <div className="row-span-8 max-h-max px-6">
          <SymptomForm />
          </div>
        </div>
    </div>
    </>
  )
}

export default App
