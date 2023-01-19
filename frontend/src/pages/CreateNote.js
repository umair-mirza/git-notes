import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {
  createNote,
  resetNotes,
  fetchNote,
  updateNote,
  updateNoteFrontend,
} from "../redux/notes/notesSlice"

import Spinner from "../components/Spinner"
import { Button, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import "../App.scss"
import "./scss/CreateNote.scss"
import "../components/scss/Spinner.scss"

const CreateNote = () => {
  const [noteDescription, setNoteDescription] = useState("")
  const [noteData, setNoteData] = useState([
    {
      fileName: "",
      content: "",
    },
  ])
  const [deletedFileNames, setDeletedFileNames] = useState([])

  const {
    note = {},
    isLoading,
    isSuccess,
    isCreated,
    isUpdated,
    isError,
    message,
  } = useSelector((state) => state.notes)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { noteId } = useParams()

  //For Editing / Updating
  useEffect(() => {
    if (noteId) {
      dispatch(fetchNote(noteId))

      setNoteDescription(note.description)

      //Convert files object to array
      const noteData = note?.files ? Object.values(note?.files) : []

      const noteArr = noteData.map((note) => {
        return {
          fileName: note.filename,
          content: note.content,
        }
      })

      setNoteData(noteArr)
    }

    dispatch(resetNotes())
  }, [dispatch, noteId])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isCreated) {
      dispatch(resetNotes())
      toast.success("Successfully Created")
      navigate("/my-notes")
    }

    if (isUpdated) {
      dispatch(resetNotes())
      toast.success("Successfully Updated")
      navigate("/my-notes")
    }
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

  const handleChange = (index, e) => {
    let data = [...noteData]

    data[index][e.target.name] = e.target.value
    setNoteData(data)
  }

  //Add another file to the form
  const addFiles = () => {
    let newData = { fileName: "", content: "" }
    setNoteData([...noteData, newData])
  }

  //Remove a file from the form
  const removeFiles = (index) => {
    let data = [...noteData]

    //For Deletion see Github Gist API Updating a Gist > Deleting a Gist File
    if (noteId) {
      setDeletedFileNames([...deletedFileNames, data[index].fileName])
    }

    data.splice(index, 1)
    setNoteData(data)
  }

  //Convert noteData to the correct format as per API specification
  const files = {}

  noteData.forEach((note) => {
    files[note.fileName] = {
      content: note.content,
    }
  })

  //For file deletion. See Github Gist API Updating a Gist > Deleting a Gist File
  if (deletedFileNames.length > 0) {
    for (const fileName of deletedFileNames) {
      files[fileName] = null
    }
  }

  //Final data that will be submitted to the API
  const finalData = {
    description: noteDescription,
    files,
  }

  //Form Submission
  const submitForm = (e) => {
    e.preventDefault()
    if (noteId) {
      const updatedData = { noteId, ...finalData }
      console.log("submitted data", updatedData)
      dispatch(updateNote(updatedData))
      // dispatch(updateNoteFrontend(updatedData))
    } else {
      dispatch(createNote(finalData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="container top-bottom-space">
      <h2>{noteId ? "Update Note" : "Create New Note"}</h2>
      <form onSubmit={submitForm} className="form-margin">
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
        <Button
          onClick={addFiles}
          variant="contained"
          color="success"
          sx={{ width: "200px" }}
        >
          Add File
        </Button>
        <br />
        <Button
          onClick={submitForm}
          variant="contained"
          color="success"
          sx={{ my: "20px", width: "200px" }}
        >
          {noteId ? "Update Note" : "Create New Note"}
        </Button>
      </form>
    </div>
  )
}

export default CreateNote
