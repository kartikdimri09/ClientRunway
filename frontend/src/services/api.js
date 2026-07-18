import axios from "axios";

const api = axios.create({
  baseURL: "https://clientrunway.onrender.com/api",
  withCredentials: true,
});

export default api;