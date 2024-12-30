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
        console.log("Sending symptom:", symptoms);
        const response = await processSymptom(symptoms);
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
  

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea 
                 className="styled-placeholder"
                     style={{marginTop:'10rem' ,marginRight:'5rem',width:'20rem', borderRadius:'2rem'}}
                    placeholder="Enter symptoms separated by commas"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                />
                <button className='diagnose-button'  type="submit">Diagnose</button>
            </form>
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
    );
};

export default SymptomForm;
