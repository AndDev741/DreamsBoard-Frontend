import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dreamsboard-backend-production.up.railway.app',
    withCredentials: true,
})

export default instance;