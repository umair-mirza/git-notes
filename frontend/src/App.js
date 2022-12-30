import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"
import MainWindow from "./components/MainWindow"
import Note from "./pages/Note"
import MyNotes from "./pages/MyNotes"
import CreateNote from "./pages/CreateNote"

import "react-toastify/dist/ReactToastify.css"
import "./App.scss"

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainWindow />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/notes/:noteId" element={<Note />} />
          <Route path="/create-note" element={<CreateNote />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
