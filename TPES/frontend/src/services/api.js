import axios from 'axios';

<<<<<<< HEAD
export const processSymptom = async (symptom) => {
    const response = await axios.post('/api/predict', { symptom });
    return response.data;
};
=======
const API = axios.create({ baseURL: 'http://127.0.0.1:5000/api/' });

export const diagnoseSymptoms = (symptoms) => API.post('/diagnose', { symptoms });
>>>>>>> e7e3f510b8699f268d099474f9f34f7e5006b269
