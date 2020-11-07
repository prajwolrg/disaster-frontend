import axios from "axios";

const apiURL = "http://localhost:5000";

let instance = axios.create({ baseURL: apiURL });

export default instance;
