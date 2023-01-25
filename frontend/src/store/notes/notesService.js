import axios from "axios"

const API_URL = "https://api.github.com/gists"

//Fetch Public notes
const fetchNotes = async (page, perPage, token) => {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  }

  const response = await axios.get(
    `${API_URL}/public?page=${page}&per_page=${perPage}&sort=updated`,
    config
  )

  if (response.data) {
    console.log("gists list", response.data)
    return response.data
  }
}

// Fetch Single Note
const fetchNote = async (id, token) => {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  }

  const response = await axios.get(`${API_URL}/${id}`, config)

  if (response.data) {
    console.log("gist:", response.data)
    return response.data
  }
}

//Fetch Loggedin user notes
const fetchUserNotes = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  if (response.data) {
    console.log("user gists list", response.data)
    return response.data
  }
}

//Create a Note
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, noteData, config)

  console.log(response.data)
  return response.data
}

//Delete a note
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  await axios.delete(`${API_URL}/${noteId}`, config)

  return noteId
}

//Update a note
const updateNote = async (updatedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { noteId, ...updatedNote } = updatedData

  const response = await axios.patch(
    `${API_URL}/${noteId}`,
    {
      noteId: noteId,
      description: updatedData.description,
      files: updatedNote.files,
    },
    config
  )

  console.log("response", response.data)

  return response.data
}

//Check Starred Status
const checkStar = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.get(`${API_URL}/${noteId}/star`, config)

    if (response.status === 204) {
      return true
    }
  } catch (error) {
    if (error.response.status === 404) {
      return false
    }
  }
}

//Star a Note
const starNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Length": "0",
    },
  }

  try {
    const response = await axios.put(
      `${API_URL}/${noteId}/star`,
      { noteId },
      config
    )

    console.log("request sent")

    if (response.status === 204) {
      console.log("working", response)
      return true
    }
  } catch (error) {
    if (error.response.status === 404) {
      console.log(error)
    }
  }
}

//Unstar a note

const unStarNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.delete(`${API_URL}/${noteId}/star`, config)

    console.log("request sent")

    if (response.status === 204) {
      console.log("unstar working", response)
      return false
    }
  } catch (error) {
    if (error.response.status === 404) {
      console.log(error)
    }
  }
}

//Fork a Note
const forkNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/${noteId}/forks`, null, config)

  return response.data
}

//Get Number of Forks
const getForks = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  }

  const response = await axios.get(`${API_URL}/${noteId}/forks`, config)

  return response.data.length
}

const notesService = {
  fetchNotes,
  fetchNote,
  fetchUserNotes,
  createNote,
  deleteNote,
  updateNote,
  checkStar,
  starNote,
  unStarNote,
  forkNote,
  getForks,
}

export default notesService
