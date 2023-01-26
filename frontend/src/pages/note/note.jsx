import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import {
  fetchNote,
  deleteNote,
  resetNotes,
  resetSearch,
  checkStar,
  starNote,
  unStarNote,
  forkNote,
  getForks,
  clearNote,
} from "../../store/notes/notesSlice"

import Spinner from "../../components/spinner/spinner"
import { toast } from "react-toastify"
import { format } from "date-fns"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import StarIcon from "@mui/icons-material/Star"
import ForkRightIcon from "@mui/icons-material/ForkRight"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CodeIcon from "@mui/icons-material/Code"

import { Box, Button, Stack, Typography } from "@mui/material"

const Note = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    note,
    forks,
    isSuccess,
    isLoading,
    isError,
    message,
    isStarred,
    isForked,
  } = useSelector((state) => state.notes)

  const { user } = useSelector((state) => state.auth)

  const { noteId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(resetNotes())
    }

    if (isForked) {
      toast.success("Note Successfully Forked")
      dispatch(getForks(noteId))
    }
  }, [dispatch, isSuccess, isError, isForked, message, noteId])

  useEffect(() => {
    if (user) {
      dispatch(fetchNote(noteId))
      dispatch(checkStar(noteId))
    } else {
      dispatch(fetchNote(noteId))
    }
    dispatch(getForks(noteId))
  }, [dispatch, noteId])

  //Cleanup on Unmount
  useEffect(() => {
    return () => dispatch(clearNote())
  }, [dispatch])

  //Handle Fork
  const forkHandler = () => {
    if (!user) {
      toast.error("You are not logged in")
    } else {
      dispatch(forkNote(noteId))
    }
  }

  //Handle Star
  const starHandler = () => {
    if (!user) {
      toast.error("You are not logged in")
      return
    }
    if (isStarred) {
      dispatch(unStarNote(noteId))
    } else if (!isStarred) {
      dispatch(starNote(noteId))
    }
  }

  //Handle Delete
  const deleteHandler = (noteId) => {
    if (window.confirm("Are you sure you want to delete this Note?")) {
      dispatch(deleteNote(noteId))
      toast.success("Deleted Successfully")
      navigate("/my-notes")
    }
  }

  //Handle Update
  const updateHandler = (noteId) => {
    navigate(`/edit/${noteId}`)
    dispatch(fetchNote(noteId))
  }

  //Back to All Handler
  const backToAllHandler = () => {
    dispatch(resetSearch())
    if (note?.owner?.login === user?.login) {
      navigate("/my-notes")
    } else {
      navigate("/")
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  const noteContent = () => {
    const files = Object.values(note.files)
    return files.map((file, index) => (
      <div key={index} className="note-content">
        <div className="content-head">
          <CodeIcon />
          <span className="note-desc">{file?.filename}</span>
        </div>
        <hr />
        <div className="content-main">{file?.content}</div>
      </div>
    ))
  }

  return (
    <>
      {Object.keys(note)?.length > 0 && (
        <div>
          <Box sx={{ padding: "20px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" gap={2}>
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
                <Stack direction="column">
                  <Typography color="primary" fontWeight="bold">
                    {`${note?.owner?.login} / ${note?.description}`}
                  </Typography>
                  <Typography fontSize="0.8rem" color="gray">
                    {format(new Date(note?.created_at), "p, dd/MM/yyyy")}
                  </Typography>
                  <Typography fontSize="0.6rem" color="gray">
                    {note?.id}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" gap={8}>
                {user && user?.login === note?.owner.login && (
                  <Stack direction="row" gap={1}>
                    <Box
                      onClick={() => updateHandler(note?.id)}
                      sx={{
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon />
                      <div>Edit</div>
                    </Box>
                    <Box
                      onClick={() => deleteHandler(note?.id)}
                      sx={{
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        cursor: "pointer",
                      }}
                    >
                      <DeleteIcon />
                      <div>Delete</div>
                    </Box>
                  </Stack>
                )}
                <Stack direction="row" gap={1}>
                  <Box
                    onClick={starHandler}
                    sx={{
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      cursor: "pointer",
                    }}
                  >
                    {isStarred ? <StarIcon /> : <StarOutlineIcon />}
                    <div>Star</div>
                  </Box>
                  <Box
                    onClick={forkHandler}
                    sx={{
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      cursor: "pointer",
                    }}
                  >
                    <ForkRightIcon />
                    <div>Fork</div>
                    <span>{forks}</span>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            {isLoading ? <Spinner /> : noteContent()}
          </Box>

          <Box sx={{ my: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={backToAllHandler}
              sx={{ color: "white" }}
            >
              Back to All Notes
            </Button>
          </Box>
        </div>
      )}
    </>
  )
}

export default Note
