import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/store"
import { useNavigate, useParams } from "react-router-dom"
import {
  createNote,
  resetNotes,
  updateNote,
  clearNote,
  showSnackbar,
} from "../store/notes/notesSlice"
import useUpdatedData from "../hooks/useUpdatedData"
import { noteDataToFilesObject } from "../utils"
import { NoteDataType, UpdatedDataType } from "../types/Note"

import Spinner from "../components/spinner"
import { Box, Button, TextField, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import GitButton from "../components/buttons/git-button"
import { Stack } from "@mui/system"

const CreateNote = () => {
  const [noteDescription, setNoteDescription] = useState<string>("")
  const [noteData, setNoteData] = useState<NoteDataType[]>([
    {
      fileName: "",
      content: "",
    },
  ])
  const [deletedFileNames, setDeletedFileNames] = useState<string[]>([])

  const { isLoading, isSuccess, isCreated, isUpdated, isError, message } =
    useAppSelector((state) => state.notes)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { noteId } = useParams()

  //Fetch Updated Data
  useUpdatedData(setNoteDescription, setNoteData)

  useEffect(() => {
    if (isError) {
      dispatch(showSnackbar([message, "error", true]))
    }

    if (isCreated) {
      navigate("/my-notes")
      dispatch(showSnackbar(["Created Successfully", "success", true]))
    }

    if (isUpdated) {
      dispatch(resetNotes())
      dispatch(clearNote())
      dispatch(showSnackbar(["Successfully Updated", "success", true]))
      navigate("/my-notes")
    }

    dispatch(resetNotes())
  }, [
    isError,
    dispatch,
    message,
    isSuccess,
    isUpdated,
    isCreated,
    noteId,
    navigate,
  ])

  const handleChange = (index: number, e) => {
    let data = [...noteData]

    data[index][e.target.name] = e.target.value
    setNoteData(data)
  }

  //Add another file to the form
  const addFiles = () => {
    let newData: NoteDataType = { fileName: "", content: "" }
    setNoteData([...noteData, newData])
  }

  //Remove a file from the form
  const removeFiles = (index: number) => {
    let data: NoteDataType[] = [...noteData]

    //For Deletion see Github Gist API Updating a Gist > Deleting a Gist File
    if (noteId) {
      setDeletedFileNames([...deletedFileNames, data[index].fileName])
    }

    data.splice(index, 1)
    setNoteData(data)
  }

  //Extract finalData to be sent to the API endpoint
  const finalData = noteDataToFilesObject(
    noteDescription,
    noteData,
    deletedFileNames
  )

  //Form Submission
  const submitForm = (e) => {
    e.preventDefault()
    if (noteId) {
      const updatedData: UpdatedDataType = { noteId, ...finalData }
      console.log("submitted data", updatedData)
      dispatch(updateNote(updatedData))
    } else {
      dispatch(createNote(finalData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{ my: "20px" }}>
      <Typography color="gray" variant="h4" component="h2">
        {noteId ? "Update Note" : "Create New Note"}
      </Typography>
      <form onSubmit={submitForm}>
        <TextField
          name="noteDescription"
          label="Description"
          placeholder="Enter Description"
          type="text"
          variant="outlined"
          required
          sx={{ my: "40px", width: "800px" }}
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
        />
        <br />
        {noteData.map((file, index) => {
          return (
            <div key={index}>
              <TextField
                name="fileName"
                label="Filename"
                placeholder="Enter Filename"
                type="text"
                variant="outlined"
                required
                sx={{ MozHyphens: "40px", width: "800px" }}
                value={file.fileName}
                onChange={(e) => handleChange(index, e)}
              />
              {index !== 0 ? (
                <DeleteIcon
                  onClick={() => removeFiles(index)}
                  fontSize="large"
                  color="error"
                  sx={{ mx: "20px", cursor: "pointer" }}
                />
              ) : null}
              <br />
              <TextField
                name="content"
                label="Content"
                placeholder="Enter content"
                multiline
                rows={8}
                type="text"
                variant="outlined"
                required
                fullWidth
                sx={{ my: "40px" }}
                value={file.content}
                onChange={(e) => handleChange(index, e)}
              />
              <br />
            </div>
          )
        })}
        <Stack direction="column" width="25%" gap={3}>
          <GitButton onClick={addFiles}>Add File</GitButton>
          <GitButton onClick={submitForm}>
            {noteId ? "Update Note" : "Create New Note"}
          </GitButton>
        </Stack>
      </form>
    </Box>
  )
}

export default CreateNote
