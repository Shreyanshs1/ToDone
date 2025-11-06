import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // This uses the proxy from vite.config.js
  withCredentials: true, // This sends the cookie
});

export default api;