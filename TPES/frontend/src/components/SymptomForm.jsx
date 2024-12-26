import { useState } from 'react';
<<<<<<< HEAD
import { processSymptom } from '../services/api'
=======
import { diagnoseSymptoms } from '../services/api'
>>>>>>> e7e3f510b8699f268d099474f9f34f7e5006b269
import './form.css'

const SymptomForm = () => {
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const symptomList = symptoms.split(',').map(s => s.trim());
<<<<<<< HEAD
        const response = await processSymptom(symptomList);
=======
        const response = await diagnoseSymptoms(symptomList);
>>>>>>> e7e3f510b8699f268d099474f9f34f7e5006b269
        console.log(response.data)
        setDiagnosis(response.data.recommendation);
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
            {diagnosis && (
        <div className="diagnosis-container">
          <h3>Diagnosis Result:</h3>
          <ul  className="diagnosis-list">
            {diagnosis.map((d, index) => (
           
              
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
