import { API, handleApiError } from "./utils";

export const signin = async (form) => {
  try {
    const response = await API.post("/users/signin", form);
    if (response) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    const err =
      error.response?.data?.message || "An unexpected error has occured";
    return { error: err, data: null };
  }
};
export const signup = async (form) => {
  try {
    const response = await API.post("/users/signup", form);
    return { data: response.data, error: null };
  } catch (error) {
    const err = error.response.data.error;
    return { error: err, data: null };
  }
};
export const logout = async (accessToken) => {
  try {
    const response = await API.post("/users/logout", {
      accessToken: accessToken,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error);
  }
};
