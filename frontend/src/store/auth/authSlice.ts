import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"
import { User } from "../../types/User"
import { AppDispatch, RootState } from "../store"

interface UserState {
  isSuccess: Boolean
  user: User | null
  isLoading: Boolean
  isError: Boolean
  message: string | undefined
}

const initialState: UserState = {
  isSuccess: false,
  user: JSON.parse(localStorage.getItem("user")!) || null,
  isLoading: false,
  isError: false,
  message: "",
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()

type CodeParam = {
  code: string
}

//Login User
export const login = createAppAsyncThunk(
  "auth/login",
  async (codeParam: CodeParam, thunkAPI) => {
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

//Logout User
export const logout = createAppAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.user = null
        state.message = action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
