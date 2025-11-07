import axios from 'axios';

// 1. Define the production URL (the one you just got)
const PRODUCTION_URL = 'https://todone-4vjo.onrender.com/api';

// 2. Define the development URL (for our proxy)
const DEVELOPMENT_URL = '/api';

// 3. Use Vite's "magic variable" to decide
const baseURL = import.meta.env.PROD ? PRODUCTION_URL : DEVELOPMENT_URL;

const api = axios.create({
  baseURL: baseURL, // This is now dynamic!
  withCredentials: true,
});

export default api;