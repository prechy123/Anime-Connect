import axios from "axios";

const BASE_URL = "http://127.0.0.1:4000/"
export const API = axios.create({
    baseURL: BASE_URL
})
