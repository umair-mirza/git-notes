import axios from "axios"

//Fetch Public notes
const fetchNotes = async (page, perPage) => {
  console.log("details", page, perPage)
  const NOTES_URL = `https://api.github.com/gists?page=${page}&per_page=${perPage}&sort=updated`
  const response = await axios.get(NOTES_URL)

  if (response.data) {
    console.log("gists list", response.data)
    return response.data
  }
}

const notesService = {
  fetchNotes,
}

export default notesService
