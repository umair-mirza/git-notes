import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  // user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

export default authSlice.reducer
