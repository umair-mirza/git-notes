import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../store/store"

import { Note } from "../types/note.types"

import { filesObjectToArray } from "../utils"

type FileObj = {
  filename: string
  content: string
}

const useUpdatedData = (
  setNoteDescription: React.Dispatch<React.SetStateAction<string>>,
  setNoteData: React.Dispatch<
    React.SetStateAction<
      {
        fileName: string
        content: string
      }[]
    >
  >
) => {
  const { note } = useAppSelector((state) => state.notes)
  const { noteId } = useParams()

  useEffect(() => {
    if (noteId && "id" in note && noteId === note.id) {
      const filesData = filesObjectToArray(note?.files)
      const filesArray = filesData?.map((file: FileObj) => {
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
