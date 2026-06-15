import axios from "axios";

const API = axios.create({
  baseURL: "https://mybeautyglow-2.onrender.com/api",
});

export default API;