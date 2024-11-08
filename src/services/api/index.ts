import Axios from "axios";

export const baseURL = "https://api.nytimes.com/svc/books/v3/lists/";
export const API_KEY = process.env.REACT_APP_API_KEY;

console.log("API_KEY", API_KEY);
const api = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

export function apiGet(url: string) {
  return api.get(`/${url}`, {
    params: {
      "api-key": API_KEY,
    },
  });
}

export default api;
