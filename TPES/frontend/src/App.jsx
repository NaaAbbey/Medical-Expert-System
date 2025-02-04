
import LandingPage from './components/LandingPage';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import SymptomForm from './components/SymptomForm'
import './App.css'

function App() {


  return (
    <>
      {/*
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
     <div className="flex flex-col justify-between h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg text-white ${
                  message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center p-4 bg-white shadow-md">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg border-gray-300"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
    */}
    <LandingPage />
    </>
  )
}

export default App
