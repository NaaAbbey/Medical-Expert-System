import { useState, useEffect } from 'react';
import axios from 'axios';
import { processSymptom } from '../services/api';
import './form.css'

const SymptomForm = () => {
  const [symptom, setsymptom] = useState('');
  const [treatment, setTreatment] = useState(null);
  const [cause, setCause] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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

  
  const handleSymptomChange = (e) => {
    setsymptom(e.target.value);
  };

  const handleAnswerChange = (e) => {
      setAnswer(e.target.value);
  };

  const capitalizeInput = (input) => {
    if (!input) {
      return ''; // Return an empty string if input is undefined or null
    }
    return input.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Ensure the symptom is always included
     const payload = { symptom: capitalizeInput(symptom) };
     // If an answer exists, include it in the payload
     if (answer.trim()) {
         payload.answer = answer;
     }
    try {
      console.log("ans: ", payload)

        const response = await processSymptom(payload);
        console.log(response.data)

        if (response.data.diagnosis && response.data.treatment) {
            setDiagnosis(response.data.diagnosis);
            setTreatment(response.data.treatment);
            setCause(response.data.cause);
            setMessage('');
            setQuestion('');
            resetSession();
        } else if (response.data.question) {
            setQuestion(response.data.question);
            setMessage('');
        } else {
            setMessage(response.data.message || 'Unexpected error');
            setQuestion('');
        }

        // Reset answer field after each submission
        setAnswer('');
    } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className='flex flex-col-reverse items-center   justify-start pb-6 h-full  '>
      <div className="border-2 border-gray-600 rounded-lg w-full flex pe-4">
        <form onSubmit={handleSubmit} className='flex items-center justify-between w-full '>
          <div>
            <label>
              Symptom:
              <input
                className="border-none w-full outline-none h-12 px-4 rounded-lg"
                  type="text"
                  value={symptom}
                  onChange={handleSymptomChange}
                  placeholder="Enter your symptom"
                  required
              />
            </label>
          </div>
          {question && (
            <div>
              <label>{question}</label>
              <input
                type="text"
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Yes or No"
                required
              />
            </div>
          )}
          <button className='h-8 w-8 flex items-center justify-center' type="submit">Submit</button>
        </form>
      </div>

      {diagnosis && treatment && (
                <div>
                    <h3>Diagnosis: {diagnosis}</h3>
                    <p>Cause: {cause}</p>
                    <p>Treatment: {treatment}</p>
                </div>
      )}

      {message && <p>{message}</p>}

    </div>
  );
};

export default SymptomForm;
