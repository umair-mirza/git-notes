import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import notesService from "./notesService"

const initialState = {
  notes: [],
  note: {},
  searchedNote: {},
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
}

//Fetch Public Notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (pagesData, thunkAPI) => {
    try {
      return await notesService.fetchNotes(
        pagesData.currPage,
        pagesData.rowsPerPage
      )
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

//Fetch Single Note
export const fetchNote = createAsyncThunk(
  "notes/fetchNote",
  async (noteId, thunkAPI) => {
    try {
      return await notesService.fetchNote(noteId)
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

//Search a Note
export const searchNote = createAsyncThunk(
  "notes/searchNote",
  async (noteId, thunkAPI) => {
    try {
      return await notesService.fetchNote(noteId)
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

export const notesSlice = createSlice({
  name: "notes",
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
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(fetchNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.note = action.payload
      })
      .addCase(fetchNote.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(searchNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchedNote = action.payload
      })
      .addCase(searchNote.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = notesSlice.actions
export default notesSlice.reducer
