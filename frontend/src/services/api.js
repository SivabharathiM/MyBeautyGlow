import axios from "axios";

const API = axios.create({
  baseURL: "https://mybeautygloww.onrender.com/api",
});

export default API;