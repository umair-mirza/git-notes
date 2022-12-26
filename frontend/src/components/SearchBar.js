import React, { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { useSelector, useDispatch } from "react-redux"
import { searchNote } from "../features/notes/notesSlice"

import "./Header.scss"

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("")

  const dispatch = useDispatch()

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    dispatch(searchNote(searchInput))
  }

  return (
    <div className="search">
      <input
        onChange={handleSearchInput}
        className="searchbar"
        placeholder="Search Notes by Id"
        value={searchInput}
      />
      <div className="search-icon">
        <CiSearch onClick={handleSearch} size={20} />
      </div>
    </div>
  )
}

export default SearchBar
