import axios from 'axios';

// The URL for Vercel
const PRODUCTION_URL = 'https://todone-4vjo.onrender.com/api';

// The URL for local development (using the proxy)
const DEVELOPMENT_URL = '/api';

// The magic variable that switches between them
const baseURL = import.meta.env.PROD ? PRODUCTION_URL : DEVELOPMENT_URL;

const api = axios.create({
  baseURL: baseURL, // This is dynamic and correct
  withCredentials: true,
});

export default api;