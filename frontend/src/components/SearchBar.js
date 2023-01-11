import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CiSearch } from "react-icons/ci"
import { searchNote, searchNoteDesc } from "../features/notes/notesSlice"

import "./Header.scss"

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
    } else {
      //Search note by description
      dispatch(searchNoteDesc(searchInput))
    }

    navigate("/")
    setSearchInput("")
  }

  return (
    <div className="search">
      <input
        onChange={handleSearchInput}
        className="searchbar"
        placeholder="Search Notes by Id or Description"
        value={searchInput}
      />
      <div className="search-icon">
        <CiSearch onClick={handleSearch} size={20} />
      </div>
    </div>
  )
}

export default SearchBar
