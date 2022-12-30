import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import "../App.scss"
import "./CreateNote.scss"

const CreateNote = () => {
  const [description, setDescription] = useState("")
  const [noteData, setNoteData] = useState([
    {
      fileName: "",
      content: "",
    },
  ])

  const handleChange = (index, e) => {
    let data = [...noteData]
    data[index][e.target.name] = e.target.value
    setNoteData(data)
  }

  const addFiles = () => {
    let newData = { fileName: "", content: "" }
    setNoteData([...noteData, newData])
  }

  const removeFiles = (index) => {
    let data = [...noteData]
    data.splice(index, 1)
    setNoteData(data)
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log(noteData)
  }

  return (
    <div className="container top-bottom-space">
      <h2>Create a Note</h2>
      <form onSubmit={submitForm} className="form-margin">
        <TextField
          name="description"
          label="Description"
          placeholder="Enter Description"
          type="text"
          variant="outlined"
          required
          sx={{ my: "40px", width: "800px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <Button onClick={addFiles} variant="contained" color="success">
          Add File
        </Button>
        <br />
        <Button
          onClick={submitForm}
          variant="contained"
          color="success"
          sx={{ my: "20px" }}
        >
          Create new Note
        </Button>
      </form>
    </div>
  )
}

export default CreateNote
