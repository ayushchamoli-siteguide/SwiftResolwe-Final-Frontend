import axios from "axios";

// Base URL of the odr-backend API. Override via REACT_APP_BACKEND_URL.
const BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
