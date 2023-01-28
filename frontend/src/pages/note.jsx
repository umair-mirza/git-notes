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
  showSnackbar,
} from "../store/notes/notesSlice"

import Spinner from "../components/spinner"
import { format } from "date-fns"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import StarIcon from "@mui/icons-material/Star"
import ForkRightIcon from "@mui/icons-material/ForkRight"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CodeIcon from "@mui/icons-material/Code"

import { Box, Stack, styled, Typography } from "@mui/material"
import CustomButton from "../components/buttons/git-button"

/*-------------------------MUI---------------------------*/

const CustomBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  gap: "3px",
  cursor: "pointer",
}))

const noteContentSX = {
  mt: "20px",
  width: "100%",
  height: "100%",
  padding: "5px 10px",
  outline: "2px solid lightgray",
  boxShadow: "3px 5px 10px #888888",
  overflow: "none",
}

/*-------------------------MUI---------------------------*/

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
      dispatch(showSnackbar([message, "error", true]))
    }

    if (isSuccess) {
      dispatch(resetNotes())
    }

    if (isForked) {
      dispatch(showSnackbar(["Note Successfully Forked", "success", true]))
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
      dispatch(showSnackbar(["You are not logged in", "error", true]))
    } else {
      dispatch(forkNote(noteId))
    }
  }

  //Handle Star
  const starHandler = () => {
    if (!user) {
      dispatch(showSnackbar(["You are not logged in", "error", true]))
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
      dispatch(showSnackbar(["Deleted Successfully", "success", true]))
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
      <Box key={index} sx={noteContentSX}>
        <Stack
          direction="row"
          alignItems="center"
          paddingBottom="5px"
          sx={{ color: "tertiary.main" }}
        >
          <CodeIcon />
          <Box component="span" sx={{ marginLeft: "10px" }}>
            {file?.filename}
          </Box>
        </Stack>
        <hr />
        <Box
          sx={{ padding: "10px 5px", overflow: "none", wordWrap: "break-word" }}
        >
          {file?.content}
        </Box>
      </Box>
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
                    <CustomBox onClick={() => updateHandler(note?.id)}>
                      <EditIcon />
                      <div>Edit</div>
                    </CustomBox>
                    <CustomBox onClick={() => deleteHandler(note?.id)}>
                      <DeleteIcon />
                      <div>Delete</div>
                    </CustomBox>
                  </Stack>
                )}
                <Stack direction="row" gap={1}>
                  <CustomBox onClick={starHandler}>
                    {isStarred ? <StarIcon /> : <StarOutlineIcon />}
                    <div>Star</div>
                  </CustomBox>
                  <CustomBox onClick={forkHandler}>
                    <ForkRightIcon />
                    <div>Fork</div>
                    <span>{forks}</span>
                  </CustomBox>
                </Stack>
              </Stack>
            </Stack>
            {isLoading ? <Spinner /> : noteContent()}
          </Box>

          <Box sx={{ my: "20px" }}>
            <CustomButton onClick={backToAllHandler}>
              Back to All Notes
            </CustomButton>
          </Box>
        </div>
      )}
    </>
  )
}

export default Note
