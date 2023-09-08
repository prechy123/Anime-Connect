// import {configureStore} from "@reduxjs/toolkit"
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/authenticationReducer";

// const store = configureStore({
//     reducer: authReducer,
//     middleware: [thunk]
// })
const store = createStore(authReducer, applyMiddleware(thunk));

export default store;
