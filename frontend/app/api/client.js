import axios from 'axios';

const API=axios.create({
    baseURL:'http://10.68.202.144:8080/api',
    timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    },
});
export default API;
