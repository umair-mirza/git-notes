import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchNotes,
  resetNotes,
  resetSearch,
  clearNote,
} from "../redux/notes/notesSlice"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import { format } from "date-fns"

import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import TablePagination from "@mui/material/TablePagination"

import "./scss/NoteTable.scss"
import "../components/scss/UserIcon.scss"
import "../components/scss/Spinner.scss"

const NotesTable = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    notes,
    searchedNote,
    isSuccess,
    isError,
    isLoading,
    isSearchError,
    message,
  } = useSelector((state) => state.notes)

  //UseEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetNotes())
      dispatch(clearNote())
    }

    if (isError) {
      toast.error(message)
    }

    dispatch(resetNotes())
  }, [dispatch, page, rowsPerPage, isSuccess, isError, message])

  useEffect(() => {
    dispatch(fetchNotes({ currPage: page + 1, rowsPerPage: rowsPerPage }))
  }, [dispatch, page, rowsPerPage])

  //Page changer for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  //Number of rows changer for pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  //Navigate to Individual Note
  const noteHandler = (noteId) => {
    navigate(`/notes/${noteId}`)
  }

  //Total number of notes
  const totalCount = 3000

  const selectedNotes =
    Object.keys(searchedNote).length > 0 && notes ? [searchedNote] : notes

  //Back to All Results option
  const allResultsHandler = () => {
    dispatch(resetSearch())
    navigate("/")
  }

  //Notes Renderer
  const notesRenderer = () => {
    if (isSearchError) {
      return (
        <TableBody>
          <TableRow sx={{ textAlign: "center" }}>
            <TableCell>No Results Found</TableCell>
          </TableRow>
        </TableBody>
      )
    } else {
      return (
        <TableBody>
          {selectedNotes?.map((note) => (
            <TableRow
              key={note.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <img
                  className="avatar"
                  src={note.owner.avatar_url}
                  alt="avatar"
                />
              </TableCell>
              <TableCell align="left">{note.owner.login}</TableCell>
              <TableCell align="left">
                {note?.description?.length > 0
                  ? note.description.slice(0, 20)
                  : "no description"}
              </TableCell>
              <TableCell align="left">
                {format(new Date(note.created_at), "p, dd/MM/yyyy")}
              </TableCell>
              <TableCell
                align="left"
                className="select-cell"
                onClick={() => noteHandler(note.id)}
              >
                {note.id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="container top-bottom-space">
      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bold-headings" align="left">
                  Avatar
                </TableCell>
                <TableCell className="bold-headings" align="left">
                  User
                </TableCell>
                <TableCell className="bold-headings" align="left">
                  Description
                </TableCell>
                <TableCell className="bold-headings" align="left">
                  Created Date
                </TableCell>
                <TableCell className="bold-headings" align="left">
                  Note Id
                </TableCell>
              </TableRow>
            </TableHead>
            {notesRenderer()}
          </Table>
        </TableContainer>
        {selectedNotes.length > 1 && !isSearchError && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            showFirstButton
            showLastButton
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
      {(Object.keys(searchedNote).length > 0 || isSearchError) && (
        <div>
          <button
            onClick={allResultsHandler}
            className="primary-button back-button"
          >
            Back to All Results
          </button>
        </div>
      )}
    </div>
  )
}

export default NotesTable
