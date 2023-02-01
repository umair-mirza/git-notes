import React, { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/store"
import { useNavigate } from "react-router-dom"
import {
  fetchNotes,
  resetNotes,
  resetSearch,
  clearNotes,
  showSnackbar,
} from "../store/notes/notes-slice"
import { Note } from "../types/note.types"
import Spinner from "../components/spinner"
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

import GitButton from "../components/buttons/git-button"

/*-------------------------MUI---------------------------*/

const tableHeadingSX = {
  my: "30px",
  width: "100%",
  "& th": {
    color: "white",
    backgroundColor: "primary.main",
    opacity: 0.7,
    fontWeight: "bold",
  },
}

const avatarSX = {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
}

/*-------------------------MUI---------------------------*/

const NotesTable = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    notes,
    searchedNote,
    isSuccess,
    isError,
    isLoading,
    isSearchError,
    message,
  } = useAppSelector((state) => state.notes)

  //UseEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetNotes())
    }

    if (isError) {
      dispatch(showSnackbar([message, "error", true]))
    }

    dispatch(resetNotes())
  }, [dispatch, page, rowsPerPage, isSuccess, isError, message])

  useEffect(() => {
    dispatch(fetchNotes({ currPage: page + 1, rowsPerPage: rowsPerPage }))
  }, [dispatch, page, rowsPerPage])

  //Cleanup on Unmount
  useEffect(() => {
    return () => {
      dispatch(clearNotes())
    }
  }, [])

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
  const totalCount: number = 3000

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
          {selectedNotes?.map((note: Note) => (
            <TableRow
              key={note.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <Box
                  component="img"
                  src={note.owner.avatar_url}
                  alt="avatar"
                  sx={avatarSX}
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
                onClick={() => noteHandler(note.id)}
                sx={{ cursor: "pointer" }}
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
    <div>
      <Box sx={tableHeadingSX}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">User</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Created Date</TableCell>
                <TableCell align="left">Note Id</TableCell>
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
          <GitButton onClick={allResultsHandler}>Back to All Results</GitButton>
        </div>
      )}
    </div>
  )
}

export default NotesTable
