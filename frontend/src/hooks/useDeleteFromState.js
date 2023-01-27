import { useSelector } from "react-redux"

const useDeleteFromState = () => {
  const { userNotes, deletedNote } = useSelector((state) => state.notes)
  const filteredNotes = userNotes.filter((note) => note.id !== deletedNote)
  return deletedNote ? filteredNotes : userNotes
}

export default useDeleteFromState
