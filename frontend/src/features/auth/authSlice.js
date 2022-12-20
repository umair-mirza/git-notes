import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
}

export const login = createAsyncThunk(
  "auth/login",
  async (codeParam, thunkAPI) => {
    try {
      return await authService.login(codeParam)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

export default authSlice.reducer
