import * as types from "../constants/authenticationConstants";

const initialState = {
  userData: null,
  refreshToken: null,
  accessToken: null,
  signUpError: [],
  signInError: null,
  successMessage: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNIN_FAIL:
      return {
        ...state,
        successMessage: null,
        signUpError: [],
        signInError: payload ? payload : "",
      };
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload.user || null,
        refreshToken: payload.refreshToken || null,
        accessToken: payload.accessToken || null,
        signInError: null,
        successMessage: payload || null
      };
    default:
      return state;
  }
};

export default authReducer;
