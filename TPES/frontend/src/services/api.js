import axios from 'axios';

export const processSymptom = async (symptom) => {
    const response = await axios.post('/api/predict', { symptom });
    return response.data;
};
