import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import notesService from "./notesService"
import { Note } from "../../interfaces/Note"
import { AppDispatch, RootState } from "../store"
import { User } from "../../interfaces/User"

interface NoteState {
  notes: Note[] | []
  userNotes: Note[] | []
  note: Note | {}
  searchedNote: Note | {}
  snackbar: {
    message: string
    type: string
    isOpen: boolean
  }
  forks: number
  deletedNote: string | null
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
  isSearchError: boolean
  isStarred: boolean | undefined
  isForked: boolean | undefined
  isCreated: boolean
  isUpdated: boolean
  message: string | undefined
}

const initialState: NoteState = {
  notes: [],
  userNotes: [],
  note: {},
  searchedNote: {},
  snackbar: { message: "", type: "success", isOpen: false },
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

type PagesDataType = {
  currPage: number
  rowsPerPage: number
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  extra: { s: string; n: number }
}>()

//Fetch Public Notes
export const fetchNotes = createAppAsyncThunk(
  "notes/fetchNotes",
  async (pagesData: PagesDataType, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const token = state.auth?.user?.accessToken
    try {
      return await notesService.fetchNotes(
        pagesData.currPage,
        pagesData.rowsPerPage,
        token
      )
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Fetch Single Note
export const fetchNote = createAppAsyncThunk(
  "notes/fetchNote",
  async (noteId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const token = state.auth?.user?.accessToken
    try {
      return await notesService.fetchNote(noteId, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()!
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Search a Note
export const searchNote = createAppAsyncThunk(
  "notes/searchNote",
  async (noteId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const token = state.auth?.user?.accessToken
    try {
      return await notesService.fetchNote(noteId, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Fetch Logged in user notes
export const fetchUserNotes = createAppAsyncThunk(
  "notes/userNotes",
  async (user: User, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.fetchUserNotes(user, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Create new Note
export const createNote = createAppAsyncThunk(
  "notes/createNote",
  async (noteData: Note, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.createNote(noteData, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Delete a Note
export const deleteNote = createAppAsyncThunk(
  "notes/deleteNote",
  async (noteId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.deleteNote(noteId, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update a note
export const updateNote = createAppAsyncThunk(
  "notes/updateNote",
  async (updatedData: Note, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.updateNote(updatedData, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Check Star Status
export const checkStar = createAppAsyncThunk(
  "notes/checkStar",
  async (noteId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.checkStar(noteId, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Star a Note
export const starNote = createAppAsyncThunk(
  "notes/starNote",
  async (noteId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.starNote(noteId, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//UnStar a Note
export const unStarNote = createAppAsyncThunk(
  "notes/unStarNote",
  async (noteId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.unStarNote(noteId, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Fork a Note
export const forkNote = createAppAsyncThunk(
  "notes/forkNote",
  async (noteId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.forkNote(noteId, token)
    } catch (error) {
      const message: string =
        error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get Number of Forks
export const getForks = createAppAsyncThunk(
  "notes/getForks",
  async (noteId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth?.user?.accessToken
      return await notesService.getForks(noteId, token)
    } catch (error) {
      const message: string =
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
    clearNotes: (state) => {
      state.notes = []
    },
    clearUserNotes: (state) => {
      state.userNotes = []
    },
    resetSearch: (state) => {
      state.searchedNote = {}
      state.isSearchError = false
    },
    removeNote: (state, action) => {
      const noteId = action.payload
      state.userNotes = state.userNotes.filter(
        (note: Note) => note.id !== noteId
      )
    },
    searchNoteDesc: (state, action) => {
      const searchTerm = action.payload
      const searchResult = state.notes.filter(
        (note: Note) => note.description === searchTerm
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
    showSnackbar: (state, action) => {
      const [message, type, isOpen] = action.payload
      state.snackbar = {
        message: message,
        type: type,
        isOpen: isOpen,
      }
    },
    resetSnackbar: (state) => {
      state.snackbar = { message: "", type: "success", isOpen: false }
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
      .addCase(getForks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getForks.fulfilled, (state, action) => {
        state.isLoading = false
        state.forks = action.payload
      })
      .addCase(getForks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const {
  resetNotes,
  clearNote,
  clearNotes,
  clearUserNotes,
  resetSearch,
  removeNote,
  searchNoteDesc,
  showSnackbar,
  resetSnackbar,
} = notesSlice.actions
export default notesSlice.reducer
