// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // à remplacer par ton backend réel plus tard
});

export default api;
