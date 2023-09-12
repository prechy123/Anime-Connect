import axios from "axios";

const BASE_URL = "http://127.0.0.1:4000/"
//during production insert in environment variable....
export const API = axios.create({
    baseURL: BASE_URL
})

export const handleApiError = (error) => {
    try {
        const errorMessage = error?.response?.data?.message || "An unexpected error occured... Try again"
        return {error: errorMessage, data: null}
    } catch(err) {
        throw new Error("An unexpected error has occured.")
    }
}
