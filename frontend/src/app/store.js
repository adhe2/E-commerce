import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
// import todoReducer from "../features/todos/todoSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // todos: todoReducer,s
  },
});
