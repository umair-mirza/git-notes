import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import notesService from "./notesService"

const initialState = {
  notes: [],
  userNotes: [],
  note: {},
  searchedNote: {},
  forks: 0,
  deletedNote: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  isSearchError: false,
  isStarred: false,
  isForked: false,
  isCreated: false,
  isUpdated: false,
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
        error?.response?.data?.message || error.message || error.toString()
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
        error?.response?.data?.message || error.message || error.toString()
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
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Fetch Logged in user notes
export const fetchUserNotes = createAsyncThunk(
  "notes/userNotes",
  async (notesData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await notesService.fetchUserNotes(
        notesData.currPage,
        notesData.rowsPerPage,
        notesData.currUser,
        token
      )
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Create new Note
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await notesService.createNote(noteData, token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Delete a Note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await notesService.deleteNote(noteId, token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update a note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (updatedData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await notesService.updateNote(updatedData, token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Check Star Status
export const checkStar = createAsyncThunk(
  "notes/checkStar",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await notesService.checkStar(noteId, token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Star a Note
export const starNote = createAsyncThunk(
  "notes/starNote",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await notesService.starNote(noteId, token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//UnStar a Note
export const unStarNote = createAsyncThunk(
  "notes/unStarNote",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await notesService.unStarNote(noteId, token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Fork a Note
export const forkNote = createAsyncThunk(
  "notes/forkNote",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken

      return await notesService.forkNote(noteId, token)
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get Number of Forks
export const getForks = createAsyncThunk(
  "notes/getForks",
  async (noteId, thunkAPI) => {
    try {
      return await notesService.getForks(noteId)
    } catch(error) {
      const message =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetNotes: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
      state.isUpdated = false
      state.isCreated = false
      state.isForked = false
    },
    clearNote: (state) => {
      state.note = {}
    },
    resetSearch: (state) => {
      state.searchedNote = {}
      state.isSearchError = false
    },
    removeNote: (state, action) => {
      const noteId = action.payload
      state.userNotes = state.userNotes.filter((note) => note.id !== noteId)
      console.log(state.userNotes)
    },
    searchNoteDesc: (state, action) => {
      const searchTerm = action.payload
      const searchResult = state.notes.filter(
        (note) => note.description === searchTerm
      )

      if (searchResult.length > 0) {
        state.isSuccess = true
        state.searchedNote = searchResult[0]
      } else {
        state.isSuccess = false
        state.isSearchError = true
        state.isError = true
        state.message = "Note with description not Found"
      }
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
        state.isError = true
        state.message = action.payload
      })
      .addCase(searchNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.searchedNote = action.payload
      })
      .addCase(searchNote.rejected, (state) => {
        state.isLoading = false
        state.isSearchError = true
      })
      .addCase(fetchUserNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userNotes = action.payload
      })
      .addCase(fetchUserNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state) => {
        state.isLoading = false
        state.isCreated = true
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.deletedNote = action.payload
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(checkStar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkStar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isStarred = action.payload
      })
      .addCase(checkStar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(starNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(starNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isStarred = action.payload
      })
      .addCase(starNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(unStarNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(unStarNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isStarred = action.payload
      })
      .addCase(unStarNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNote.fulfilled, (state) => {
        state.isLoading = false
        state.isUpdated = true
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(forkNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(forkNote.fulfilled, (state) => {
        state.isLoading = false
        state.isForked = true
      })
      .addCase(forkNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getForks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.forks = action.payload
      })
  },
})

export const {
  resetNotes,
  clearNote,
  resetSearch,
  removeNote,
  searchNoteDesc,
} = notesSlice.actions
export default notesSlice.reducer
