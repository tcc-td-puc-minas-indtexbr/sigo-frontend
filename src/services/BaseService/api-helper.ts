import axios from "axios";
import { LocalStorageKeys } from "shared/constants";

export function buildApiInstanceForURL(url: string) {
  if (url === "") {
    throw new Error("URL cannot be empty.");
  }

  const key = LocalStorageKeys?.token ?? "AUTH_TOKEN";
  let token = "";
  try {
    token = JSON.parse(localStorage.getItem(key) ?? "");
  } catch (e) {
    console.error(e);
  }

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
