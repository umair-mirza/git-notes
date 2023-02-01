import { Note } from "../types/note.types"
import { useAppSelector } from "../store/store"

const useDeleteFromState = () => {
  const { userNotes, deletedNote } = useAppSelector((state) => state.notes)
  const filteredNotes = userNotes.filter(
    (note: Note) => note.id !== deletedNote
  )
  return deletedNote ? filteredNotes : userNotes
}

export default useDeleteFromState
