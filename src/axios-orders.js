import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-271e5-default-rtdb.firebaseio.com/'
});

export default instance;