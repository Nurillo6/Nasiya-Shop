import axios from "axios";
import API from "./getEnv";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const instance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = cookies.get("refreshToken");
        if (!refreshToken) {
          return Promise.reject(error);
        }

        // 🔑 refresh token bilan yangi accessToken olish
        const res = await axios.post(`${API}/seller/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.data.accessToken;

        // Cookie yangilash
        cookies.set("accessToken", newAccessToken, { path: "/" });

        // Requestni qayta yuborish
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
