import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

fetch(`${apiBaseUrl}/projects`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error fetching projects:", err));

export default API;
