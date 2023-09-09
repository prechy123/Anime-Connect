import axios from "axios";

const BASE_URL = "http://127.0.0.1:4000/"
//during production insert in environment variable....
export const API = axios.create({
    baseURL: BASE_URL
})
