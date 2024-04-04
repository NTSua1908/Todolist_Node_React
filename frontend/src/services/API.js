import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
