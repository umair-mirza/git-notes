import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/header"
import Note from "./pages/note"
import MyNotes from "./pages/my-notes"
import NotesTable from "./pages/notes-table"
import CreateNote from "./pages/create-note"
import GitSnackbar from "./components/snackbar"

import { theme } from "./theme"
import { ThemeProvider } from "@mui/material/styles"
import NotFound from "./pages/not-found"
import { Box, Container } from "@mui/material"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Router>
          <Header />
          <Container>
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
          </Container>
          <GitSnackbar />
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
