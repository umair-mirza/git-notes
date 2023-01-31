import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Spinner from "./components/spinner"
import Header from "./components/header"
import { theme } from "./theme"
import { ThemeProvider } from "@mui/material/styles"
import { Box, Container } from "@mui/material"

const Note = React.lazy(() => import("./pages/note"))
const MyNotes = React.lazy(() => import("./pages/my-notes"))
const NotesTable = React.lazy(() => import("./pages/notes-table"))
const CreateNote = React.lazy(() => import("./pages/create-note"))
const GitSnackbar = React.lazy(() => import("./components/snackbar"))
const NotFound = React.lazy(() => import("./pages/not-found"))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Router>
          <Header />
          <React.Suspense fallback={<Spinner />}>
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
          </React.Suspense>
          <GitSnackbar />
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
