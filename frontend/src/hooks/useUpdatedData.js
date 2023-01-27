import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { filesObjectToArray } from "../utils"

const useUpdatedData = (setNoteDescription, setNoteData) => {
  const { note } = useSelector((state) => state.notes)
  const { noteId } = useParams()

  useEffect(() => {
    if (noteId && noteId === note.id) {
      const filesData = filesObjectToArray(note?.files)
      const filesArray = filesData?.map((file) => {
        return {
          fileName: file.filename,
          content: file.content,
        }
      })

      setNoteDescription(note?.description)

      setNoteData(filesArray)
    }
  }, [noteId])
}

export default useUpdatedData
