import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {
  fetchUserNotes,
  resetNotes,
  clearUserNotes,
} from "../../store/notes/notesSlice"
import useDeleteOnRender from "../../hooks/useDeleteOnRender"
import Spinner from "../../components/spinner/spinner"
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

import { Button } from "@mui/material"

const MyNotes = () => {
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
    dispatch(fetchUserNotes(user))
  }, [dispatch])

  //Cleanup on Unmount
  useEffect(() => {
    return () => dispatch(clearUserNotes())
  }, [dispatch])

  //Custom Hook to remove deleted note from list
  const finalUserNotes = useDeleteOnRender()

  const noteHandler = (noteId) => {
    navigate(`/notes/${noteId}`)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{ my: "20px" }}>
      <Box
        sx={{
          width: "100%",
          "& th": {
            color: "white",
            backgroundColor: "primary.main",
            opacity: 0.7,
            fontWeight: "bold",
          },
        }}
      >
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
            <TableBody>
              {isLoading ? (
                <Spinner />
              ) : (
                finalUserNotes?.map((note) => (
                  <TableRow
                    key={note.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Box
                        component="img"
                        src={note?.owner?.avatar_url}
                        alt="avatar"
                        sx={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{note?.owner?.login}</TableCell>
                    <TableCell align="left">
                      {note?.description?.length > 0
                        ? note?.description?.slice(0, 20)
                        : "no description"}
                    </TableCell>
                    <TableCell align="left">
                      {format(new Date(note?.created_at), "p, dd/MM/yyyy")}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => noteHandler(note?.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {note?.id}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Link to="/">
          <Button variant="contained" color="primary" sx={{ color: "white" }}>
            Back to Home
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default MyNotes
