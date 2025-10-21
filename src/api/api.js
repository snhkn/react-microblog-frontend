import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true, // ensures cookies are sent
});

console.log("API Base URL:", import.meta.env.VITE_BACK_END_URL); // debug

export default api;
