import axios from "axios";

export const API = () => {
    return axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        timeout: 1000,
      })
}