import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { fetchUserNotes, resetNotes } from "../features/notes/notesSlice"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
// import TablePagination from "@mui/material/TablePagination"

import "../components/Spinner.scss"
import "./MyNotes.scss"

const MyNotes = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userNotes, isSuccess, isError, isLoading, message, deletedNote } =
    useSelector((state) => state.notes)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetNotes())
    }

    if (isError) {
      toast.error(message)
    }
  }, [dispatch, isSuccess, isError, message])

  useEffect(() => {
    dispatch(
      fetchUserNotes({
        currPage: page + 1,
        rowsPerPage: rowsPerPage,
        currUser: user,
      })
    )
  }, [dispatch, page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const noteHandler = (noteId) => {
    navigate(`/notes/${noteId}`)
  }

  //User notes without the deleted notes
  const finalUserNotes = deletedNote
    ? userNotes.filter((note) => note.id !== deletedNote)
    : userNotes

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
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">User</TableCell>
                <TableCell align="left">Created Data</TableCell>
                <TableCell align="left">Updated Date</TableCell>
                <TableCell align="left">Note Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <Spinner />
              ) : (
                finalUserNotes.map((note) => (
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
                    <TableCell align="left">{note.created_at}</TableCell>
                    <TableCell align="left">{note.updated_at}</TableCell>
                    <TableCell
                      align="left"
                      className="select-cell"
                      onClick={() => noteHandler(note.id)}
                    >
                      {note.id}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {userNotes.length > rowsPerPage && (
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )} */}
      </Box>
      <div className="back-button">
        <Link to="/">
          <button className="primary-button">Back to Home</button>
        </Link>
      </div>
    </div>
  )
}

export default MyNotes
