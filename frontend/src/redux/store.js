import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import notesReducer from "./notes/notesSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
})
