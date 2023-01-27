import React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { useSelector, useDispatch } from "react-redux"
import { resetSnackbar } from "../store/notes/notesSlice"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const GitSnackbar = () => {
  const dispatch = useDispatch()
  const { snackbar } = useSelector((state) => state.notes)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(resetSnackbar())
  }

  return (
    <Snackbar
      open={snackbar?.isOpen}
      autoHideDuration={6000}
      severity={snackbar?.type}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar?.type}
        sx={{ width: "100%" }}
      >
        {snackbar?.message}
      </Alert>
    </Snackbar>
  )
}

export default GitSnackbar
