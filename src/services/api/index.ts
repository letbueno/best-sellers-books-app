import Axios from "axios";
import camelCaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";
export const baseURL = "https://api.nytimes.com/svc/books/v3/lists/";
export const API_KEY = process.env.REACT_APP_API_KEY;

const api = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) =>
  request?.data
    ? { ...request, data: snakeCaseKeys(request?.data, { deep: true }) }
    : request,
);

api.interceptors.response.use(
  (response) => ({
    ...response,
    data: camelCaseKeys(response.data, { deep: true }),
  }),
  (error) => Promise.reject(error),
);

export function apiGet(url: string) {
  return api.get(`/${url}`, {
    params: {
      "api-key": API_KEY,
    },
  });
}

export default api;
