import axios from "axios";
const axiosInstance = axios.create({
    baseURL: `${window._env_.BACKEND_URL}`,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
});
export default axiosInstance;
