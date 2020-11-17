import axios from "axios";
import apiURL from "../constants/apiURL";

let instance = axios.create({ baseURL: apiURL });

instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    if (token) token = JSON.parse(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
