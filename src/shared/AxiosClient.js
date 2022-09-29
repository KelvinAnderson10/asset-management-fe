import axios from "axios";

export const clientInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


