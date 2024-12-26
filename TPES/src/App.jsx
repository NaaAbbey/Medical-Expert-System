import React, { useState } from 'react';
import { processSymptom } from './api';

function App() {
    const [symptom, setSymptom] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await processSymptom(symptom);
        setResponse(result);
    };

    return (
        <div>
            <h1>Treatment Prediction</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    placeholder="Enter symptom"
                />
                <button type="submit">Submit</button>
            </form>
            {response && <div>{JSON.stringify(response)}</div>}
        </div>
    );
}

export default App;
