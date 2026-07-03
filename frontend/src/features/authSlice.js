import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/login", {
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me");
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const Logout = createAsyncThunk("user/logout", async () => {
  await axios.delete("http://localhost:5000/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // LoginUser
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload;
    });

    // GetMe
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload;
    });

    // Logout
    builder.addCase(Logout.fulfilled, (state) => {
      state.user = null;
      state.isSuccess = false;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
