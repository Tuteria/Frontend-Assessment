// axiosconfig.js
import axios from 'axios';

// configure base url
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 60000
});

export default api;
