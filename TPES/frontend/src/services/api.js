import axios from 'axios';

export const processSymptom = async (symptoms) => {
    const response = await axios.post('/api/predict', { symptoms: symptoms });
    return response.data
};

