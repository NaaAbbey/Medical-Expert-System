import { useState,useEffect, useRef } from 'react'
import bg from '../assets/bg.svg'
import MedEx from '../assets/MedEx.svg'
import ST from '../assets/stethoscope.svg'
import SendIcon from '../assets/SendIcon.svg'
import axios from "axios";
import { processSymptom } from '../services/api';

const LandingPage = () => {
  const [messages, setMessages] = useState([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showYesNoButtons, setShowYesNoButtons] = useState(false);
  const [symptom, setsymptom] = useState('');
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const messagesEndRef = useRef(null);

  const resetSession = async () => {
    try {
      await axios.post("http://localhost:5000/api/reset");
      console.log("Session reset successfully.");
    } catch (error) {
      console.error("Error resetting session:", error);
    }
  };

  // Reset session when the page loads
  useEffect(() => {
    resetSession();
  }, []); // Empty dependency array ensures it runs only once on page load


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleYesNo = async (response) => {
    // Add user response
    setAnswer(response);
    setMessages((prev) => [...prev, { sender: "user", text: response }] 
  )};


  const capitalizeInput = (input) => {
    if (!input) {
      return ''; // Return an empty string if input is undefined or null
    }
    return input.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isInputDisabled)
     // Ensure the symptom is always included
    const payload = { symptom: capitalizeInput(symptom) };
    

    if (!isInputDisabled) {
      // Add user message only if input is enabled
      setMessages((prev) => [...prev, { sender: "user", text: capitalizeInput(symptom) }]);
    }

    // Disable input and show Yes/No buttons
    setIsInputDisabled(true);
    setShowYesNoButtons(true);

    // If an answer exists, include it in the payload
    if (answer.trim()) {
         payload.answer = answer;
     }

    try {
      console.log("ans: ", payload)
      const response = await processSymptom(payload);
      console.log(response.data);
    
      const botMessageText = (response.data.diagnosis && response.data.treatment)
      ? {
        Diagnosis: response.data.diagnosis,
        Cause: response.data.cause,
        Treatment: response.data.treatment
      }
      : response.data.question || "Unexpected error";

      if ((response.data.diagnosis && response.data.treatment) || !response.data.question) {
          setsymptom('');
          setIsInputDisabled(false)
          setShowYesNoButtons(false);
      }
            
      const botMessage = { sender: "bot", text: botMessageText };
      setMessages((prev) => [...prev, botMessage]);
      console.log(messages)
      
      setAnswer('');
    } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
        setIsInputDisabled(false);
    }
  };
  

  return (
    <>
      <div className='flex items-center justify-center'>

        <div className='absolute flex items-center flex-col  p-4   h-[43rem] w-[51rem] rounded-2xl bg-white/30 backdrop-blur-md '>
          <div className="flex items-center justify-start w-full">
            <img className='w-[8rem] ' src={MedEx} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className='w-[6.5rem]' src={ST} alt="" />
            <span className='text-lg text-gray-700 font-mono'>How are you feeling?</span>
          </div>
          <div className="h-full w-full flex flex-col">
            <div className="w-full h-[24.7rem]  overflow-y-auto p-4 scrollbar-hide ">
              <div className="space-y-4">
              {messages && (messages.map((message, index) => (
                <div
                  key= {index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs  overflow-hidden   ${
                      message.sender === 'user' 
                      ? message.text === 'Yes' 
                        ? 'bg-[#BFF5BA] text-[#0D5310] rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br  flex items-center justify-end px-12 py-2'
                        : message.text === 'No' 
                          ? 'bg-[#F5BABA] text-[#531010] rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br flex items-center justify-end px-12 py-2'
                          : 'bg-white text-gray-700 rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br  flex items-center justify-end px-4 py-2 '
                      : 'bg-white text-gray-700 rounded-ss-3xl rounded-se-3xl rounded-br-3xl rounded-bl h-full flex items-center justify-start px-4 py-2 '
                      }`}
                  >
                    {message.text.Diagnosis?
                    <div>
                      <span className='font-semibold'>Diagnosis: </span> {message.text.Diagnosis} <br/>
                      <span className='font-semibold '>Possible Cause: </span> {message.text.Cause}<br/>
                      <span className='font-semibold '>Treatment: </span> {message.text.Treatment}
                    </div> 
                    : <p>
                       {message.text}
                    </p>  }
                  </div>
                </div>
              )))}
                {/* Invisible div for auto-scrolling */}
                <div ref={messagesEndRef} /></div> 
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-end">
              <div className="w-full items-center justify-center flex h-10 px-3 rounded-se-2xl rounded-ss-2xl bg-white ">
                <input
                  className='w-full h-7 outline-none'
                  type="text"
                  placeholder='Enter your symptom...'
                  value={symptom}
                  onChange={(e) => setsymptom(e.target.value)}
                  disabled={isInputDisabled}
                />
                <button className='flex items-center justify-center' type="submit">
                  <img className='w-5 outline-none' src={SendIcon} alt="Send" />
                </button>
              </div>
              {showYesNoButtons && (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleYesNo("Yes")}
                      className="bg-[#BFF5BA] text-[#0D531A] h-10 w-[50%] rounded-none rounded-bl-2xl hover:outline-none"
                      >
                      Yes
                    </button>
                    <button
                      onClick={() => handleYesNo("No")}
                      className="bg-[#FFC5C5] text-[#6E0808] h-10 w-[50%] rounded-none rounded-br-2xl hover:outline-none"
                      >
                        No
                    </button>
                  </div>
                )}
            </form>
          </div>
        </div>
        <img className='h-screen w-screen object-cover' src={bg} alt="Background" />
      </div>
    </>
  )
};


export default LandingPage;
