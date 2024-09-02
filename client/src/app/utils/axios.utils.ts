import axios from "axios";

export const API = () => {
    return axios.create({
        baseURL: import.meta.env.VITE_APP_API_URL,
        timeout: 1000,
      })
}