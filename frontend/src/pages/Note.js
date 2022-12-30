import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { format } from "date-fns"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import ForkRightIcon from "@mui/icons-material/ForkRight"
import CodeIcon from "@mui/icons-material/Code"
import { fetchNote, resetNotes } from "../features/notes/notesSlice"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

import "../App.scss"
import "./Note.scss"
import "../components/UserIcon.scss"
import "../components/Spinner.scss"

const Note = () => {
  const dispatch = useDispatch()

  const { note, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.notes
  )

  const { noteId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isLoading) {
      return <Spinner />
    }

    if (isSuccess) {
      dispatch(resetNotes())
    }

    dispatch(fetchNote(noteId))
  }, [noteId])

  return (
    <>
      {Object.keys(note).length > 0 && isSuccess && (
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
                    {`${note.owner.login} / ${
                      Object.values(note.files)[0].filename
                    }`}
                  </div>
                  <div className="user-sub-heading">
                    {format(new Date(note.created_at), "p, dd/MM/yyyy")}
                  </div>
                  <div className="note-id">{note.id}</div>
                </div>
              </div>
              <div className="note-features">
                <div className="note-feature">
                  <StarOutlineIcon />
                  <div>Star</div>
                  <span className="feature-count">0</span>
                </div>
                <div className="note-feature">
                  <ForkRightIcon />
                  <div>Fork</div>
                  <span className="feature-count">0</span>
                </div>
              </div>
            </div>

            <div className="note-content">
              <div className="content-head">
                <CodeIcon />
                <span className="note-desc">
                  {Object.values(note.files)[0].filename}
                </span>
              </div>
              <hr />
              <div className="content-main">
                {Object.values(note.files)[0].content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Note
