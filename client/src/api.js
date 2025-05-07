import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Set Authorization token
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Login function
export const login = async (username, password) => {
  const response = await apiClient.post("/login", { username, password });
  return response.data.token;
};

// Fetch journeys
export const fetchJourneys = async (page = 1, limit = 10) => {
  const response = await apiClient.get("/journeys", { params: { page, limit } });
  return response.data;
};
