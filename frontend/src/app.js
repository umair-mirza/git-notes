import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "./components/header/header"
import Note from "./pages/note/note"
import MyNotes from "./pages/my-notes/my-notes"
import NotesTable from "./pages/notes-table/notes-table"
import CreateNote from "./pages/create-note/create-note"

import "react-toastify/dist/ReactToastify.css"
import "./app.scss"
import NotFound from "./pages/not-found/not-found"

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<NotesTable />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/notes/:noteId" element={<Note />} />
          <Route
            path="/create-note"
            element={<CreateNote key={window.location.pathname} />}
          />
          <Route path="/edit/:noteId" element={<CreateNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App