import { useSelector } from "react-redux"

const useDeleteOnRender = () => {
  const { userNotes, deletedNote } = useSelector((state) => state.notes)

  const filteredNotes = userNotes.filter((note) => note.id !== deletedNote)

  if (deletedNote) {
    return filteredNotes
  } else {
    return userNotes
  }
}

export default useDeleteOnRender
