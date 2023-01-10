import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"
import Note from "./pages/Note"
import MyNotes from "./pages/MyNotes"
import NotesTable from "./pages/NotesTable"
import CreateNote from "./pages/CreateNote"

import "react-toastify/dist/ReactToastify.css"
import "./App.scss"
import NotFound from "./pages/NotFound"

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
