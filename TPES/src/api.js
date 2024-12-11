import axios from 'axios';

// function to call the backend
export const processSymptom = async (symptom) => {
    const response = await axios.post('/api/process', { symptom });
    return response.data;
};
