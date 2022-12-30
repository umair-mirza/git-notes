import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import EnhancedTable from "../components/EnhancedTable"
import { fetchUserNotes, resetNotes } from "../features/notes/notesSlice"
import { resetSearch } from "../features/notes/notesSlice"

const MyNotes = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userNotes, searchedNote, isSuccess, isLoading, message } =
    useSelector((state) => state.notes)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      dispatch(
        fetchUserNotes({
          currPage: page + 1,
          rowsPerPage: rowsPerPage,
          currentUser: user.login,
        })
      )
    }

    if (isSuccess) {
      dispatch(resetNotes())
    }
  }, [dispatch, page, rowsPerPage])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 100) : 0

  const totalCount = 100

  const selectedNotes = userNotes

  return (
    <EnhancedTable
      userNotes={userNotes}
      page={page}
      rowsPerPage={rowsPerPage}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      isLoading={isLoading}
      totalCount={totalCount}
      resetSearch={resetSearch}
      searchedNote={searchedNote}
    />
  )
}

export default MyNotes
