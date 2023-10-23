import axios from "axios";

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL,
  timeout: 30000,
  headers: {
    "Accept-Language": "en",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosIns.interceptors.request.use((config) => {
  const token = "Bearer " + localStorage.getItem("accessToken");
  config.headers.Authorization = token;
  return config;
});

export default axiosIns;
