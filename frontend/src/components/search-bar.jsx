import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searchNote, searchNoteDesc } from "../store/notes/notesSlice"

import { Stack, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

/*-------------------------MUI---------------------------*/

const textFieldSX = {
  width: { xs: "300px", sm: "400px" },
  bgcolor: "white",
  borderRadius: "5px",
}

const searchIconSX = { color: "white", cursor: "pointer" }

/*-------------------------MUI---------------------------*/

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    if (searchInput.length === 32) {
      dispatch(searchNote(searchInput))
    } else if (searchInput.length > 0 && searchInput.length !== 32) {
      //Search note by description
      dispatch(searchNoteDesc(searchInput))
    }

    navigate("/")
    setSearchInput("")
  }

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <TextField
        sx={textFieldSX}
        size="small"
        variant="outlined"
        placeholder="Search Notes by Id or Description"
        onChange={handleSearchInput}
        value={searchInput}
      />
      <SearchIcon onClick={handleSearch} fontSize="large" sx={searchIconSX} />
    </Stack>
  )
}

export default SearchBar
