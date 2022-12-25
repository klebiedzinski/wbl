
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${window._env_.BACKEND_URL}`
});

axiosInstance.interceptors.response.use(response => {
  response.headers['Access-Control-Allow-Origin'] = `*`;
  return response;
});

export default axiosInstance;