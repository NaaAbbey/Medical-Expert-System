import { useState } from 'react';
import { processSymptom } from '../services/api'
import './form.css'

const SymptomForm = () => {
    const [symptoms, setSymptoms] = useState('');
    const [treatment, setTreatment] = useState('');
    const [cause, setCause] = useState('');
    const [disease, setDisease] = useState('');


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log("Sending symptom:", capitalizeInput(symptoms));
        const response = await processSymptom(capitalizeInput(symptoms));
        console.log(response)

        setTreatment(response.treatment);
        setDisease(response.disease);
        setCause(response.cause);
        console.log(response)
      } catch (error) {
          console.log("An error occurred:", error);
          alert("An error occurred. Please try again.");
      }
  };
  
  const capitalizeInput = (input) => {
    if (!input) {
      return ''; // Return an empty string if name is undefined or null
    }
    return input.trim().split([' ', ","]).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };
    return (
        <div className='flex flex-col-reverse items-center   justify-start pb-6 h-full  '>
        
            <div className="border-2 border-gray-600 rounded-lg w-full flex pe-4">
            <form onSubmit={handleSubmit} className='flex items-center justify-between w-full '>
                <input 
                 className="border-none w-full outline-none h-12 px-4 rounded-lg"
                    placeholder="Enter symptoms separated by commas"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                />
                <button className='h-8 w-8 flex items-center justify-center' type="submit"></button>
            </form>
            </div>
            <div className="flex justify-center h-full">
              {treatment && (
              <div className="treatment-container">
                <h3>treatment Result:</h3>
                <ul  className="treatment-list">
                  {treatment.map((d, index) => (
                
                    
                    <li key={index}>
                      <span className="recommendation-label">Recommendation:</span> 
                      <span className="recommendation-text">{d}</span>
                      </li>
                  
                  ))}
                </ul>
              </div>
            )}
            </div>
              </div>
    );
};

export default SymptomForm;
