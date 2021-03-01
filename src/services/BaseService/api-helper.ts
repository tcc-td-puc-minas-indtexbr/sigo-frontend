import axios from "axios";
import { LocalStorageKeys } from "shared/constants";

export function buildApiInstanceForURL(url: string) {
  if (url === "") {
    throw new Error("URL cannot be empty.");
  }

  const token = localStorage.getItem(LocalStorageKeys.token);

  const api = axios.create({
    baseURL: url,
  });

  api.interceptors.request.use(async (config) => {
    config.headers.authorization = `Bearer ${token}`;
    config.headers["X-API-KEY"] = process.env.REACT_APP_X_API_KEY || "";

    return config;
  });

  return api;
}
