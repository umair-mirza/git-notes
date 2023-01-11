import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import {
  fetchNote,
  deleteNote,
  resetNotes,
  resetSearch,
  removeNote,
  checkStar,
  starNote,
  unStarNote,
  forkNote,
} from "../features/notes/notesSlice"

import { format } from "date-fns"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import StarIcon from "@mui/icons-material/Star"
import ForkRightIcon from "@mui/icons-material/ForkRight"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CodeIcon from "@mui/icons-material/Code"

import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

import "../App.scss"
import "./Note.scss"
import "../components/UserIcon.scss"
import "../components/Spinner.scss"

const Note = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { note, isSuccess, isLoading, isError, message, isStarred, isForked } =
    useSelector((state) => state.notes)

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
    }

    dispatch(resetNotes())
  }, [dispatch, isSuccess, isError, isForked, message])

  useEffect(() => {
    if (user) {
      dispatch(fetchNote(noteId))
      dispatch(checkStar(noteId))
    } else {
      dispatch(fetchNote(noteId))
    }
  }, [dispatch, noteId])

  //Handle Fork
  const forkHandler = () => {
    if (!user) {
      toast.error("You are not logged in")
    }

    dispatch(forkNote(noteId))
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
      dispatch(removeNote(noteId))
      toast.success("Deleted Successfully")
      navigate("/my-notes")
    }
  }

  //Handle Update
  const updateHandler = (noteId) => {
    navigate(`/edit/${noteId}`)
  }

  if (isLoading) {
    return <Spinner />
  }

  //Back to All Handler
  const backToAllHandler = () => {
    dispatch(resetSearch())
    navigate("/")
  }

  const noteContent = () => {
    const files = Object.values(note.files)
    return files.map((file, index) => (
      <div key={index} className="note-content">
        <div className="content-head">
          <CodeIcon />
          <span className="note-desc">{file.filename}</span>
        </div>
        <hr />
        <div className="content-main">{file.content}</div>
      </div>
    ))
  }

  return (
    <>
      {Object.keys(note).length > 0 && (
        <div className="container top-bottom-space">
          <div className="note-area">
            <div className="header-area">
              <div className="user-details">
                <div className="avatar">
                  <img
                    className="avatar"
                    src={note.owner.avatar_url}
                    alt="avatar"
                  />
                </div>
                <div className="user-desc">
                  <div className="user-heading">
                    {`${note.owner.login} / ${note.description}`}
                  </div>
                  <div className="user-sub-heading">
                    {format(new Date(note.created_at), "p, dd/MM/yyyy")}
                  </div>
                  <div className="note-id">{note.id}</div>
                </div>
              </div>
              <div className="note-features">
                {user && user.login === note.owner.login && (
                  <div className="edit-delete">
                    <div
                      onClick={() => updateHandler(note.id)}
                      className="note-feature"
                    >
                      <EditIcon />
                      <div>Edit</div>
                    </div>
                    <div
                      onClick={() => deleteHandler(note.id)}
                      className="note-feature"
                    >
                      <DeleteIcon />
                      <div>Delete</div>
                    </div>
                  </div>
                )}
                <div className="edit-delete">
                  <div onClick={starHandler} className="note-feature">
                    {isStarred ? <StarIcon /> : <StarOutlineIcon />}
                    <div>Star</div>
                  </div>
                  <div onClick={forkHandler} className="note-feature">
                    <ForkRightIcon />
                    <div>Fork</div>
                  </div>
                </div>
              </div>
            </div>
            {noteContent()}
          </div>

          <div className="back-button">
            <button onClick={backToAllHandler} className="primary-button">
              Back to All Notes
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Note
