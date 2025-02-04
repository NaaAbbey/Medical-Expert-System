import { useState } from 'react'
import bg from '../assets/bg.svg'
import MedEx from '../assets/MedEx.svg'
import ST from '../assets/stethoscope.svg'
import SendIcon from '../assets/SendIcon.svg'

const LandingPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const botResponses = [
    "Hello! How can I help?",
    "That's interesting!",
    "Can you tell me more?",
    "I see! What else?",
    "That's a great question!"
  ];

  const handleSendMessage = (text, sender = 'user') => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);

    {/**const messageStyle =(message) => {
      if(message.sender === 'user' && message.text === 'Yes'){

        return 'bg-[#BFF5BA] text-[#0D5310]  rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br  h-10 flex items-center justify-end px-12'
      } else if (message.sender === 'user' && message.text === 'No'){

        return 'bg-[#FFC5C5] text-[#6E0808]  rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br  h-10 flex items-center justify-end px-12'

      } else {
        return 'bg-white rounded-ss-3xl rounded-se-3xl rounded-br-3xl rounded-bl  h-10 flex items-center justify-end text-gray-600' 
      }
    } **/}

    // Simulate a bot response after 1 second
    if (sender === 'user') {
      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        setMessages((prevMessages) => [...prevMessages, { text: randomResponse, sender: 'bot' },]);
        setIsGenerating(false);
      }, 1000);
    }
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
      setInput('');
      setIsGenerating(true);
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
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs break-all overflow-hidden   ${
                      message.sender === 'user' 
                      ? message.text === 'Yes' 
                        ? 'bg-[#BFF5BA] text-[#0D5310] rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br  flex items-center justify-end px-12 py-2'
                        : message.text === 'No' 
                          ? 'bg-[#F5BABA] text-[#531010] rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br flex items-center justify-end px-12 py-2'
                          : 'bg-white text-gray-700 rounded-ss-3xl rounded-se-3xl rounded-bl-3xl rounded-br  flex items-center justify-end px-4 py-2 '
                      : 'bg-white text-gray-700 rounded-ss-3xl rounded-se-3xl rounded-br-3xl rounded-bl h-10 flex items-center justify-end px-4 py-2 '
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-end">
              <div className="w-full items-center justify-center flex h-10 px-3 rounded-se-2xl rounded-ss-2xl bg-white ">
                <input
                  className='w-full h-7 outline-none'
                  type="text"
                  placeholder='Enter your symptom...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isGenerating}
                />
                <button className='flex items-center justify-center' type="submit">
                  <img className='w-5 outline-none' src={SendIcon} alt="Send" />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <button onClick={() => handleSendMessage("No")}  disabled={isGenerating} className="bg-[#FFC5C5] text-[#6E0808] h-10 w-[50%] rounded-none rounded-bl-2xl hover:outline-none">No</button>
                <button onClick={() => handleSendMessage("Yes")} disabled={isGenerating} className="bg-[#BFF5BA] text-[#0D531A] h-10 w-[50%] rounded-none rounded-br-2xl hover:outline-none">Yes</button>
              </div>
            </form>
          </div>
        </div>
        <img className='h-screen w-screen object-cover' src={bg} alt="Background" />
      </div>
    </>
  )
}

export default LandingPage



