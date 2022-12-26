import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import MainWindow from "./components/MainWindow"
import Note from "./components/Note"

import "./App.scss"

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainWindow />} />
          <Route path="/notes/:noteId" element={<Note />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
