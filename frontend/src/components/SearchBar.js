import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CiSearch } from "react-icons/ci"
import { searchNote, resetSearch } from "../features/notes/notesSlice"

import "./Header.scss"

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isError, message } = useSelector((state) => state.notes)

  useEffect(() => {
    if (isError) {
      setSearchInput("")
      toast.error(message)
      dispatch(resetSearch())
    }
  }, [isError, message])

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    dispatch(searchNote(searchInput))
    navigate("/")
    setSearchInput("")
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
