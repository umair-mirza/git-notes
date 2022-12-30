import axios from "axios"

const API_URL = "https://api.github.com/gists"

//Fetch Public notes
const fetchNotes = async (page, perPage) => {
  console.log("details", page, perPage)
  const response = await axios.get(
    `${API_URL}?page=${page}&per_page=${perPage}&sort=updated`
  )

  if (response.data) {
    console.log("gists list", response.data)
    return response.data
  }
}

// Fetch Single Note
const fetchNote = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)

  if (response.data) {
    console.log("gist:", response.data)
    return response.data
  }
}

//Fetch Loggedin user notes
const fetchUserNotes = async (page, perPage, currentUser) => {
  const response = await axios.get(
    `https://api.github.com/users/${currentUser}/gists`
  )

  if (response.data) {
    console.log("user gists list", response.data)
    return response.data
  }
}

const notesService = {
  fetchNotes,
  fetchNote,
  fetchUserNotes,
}

export default notesService
