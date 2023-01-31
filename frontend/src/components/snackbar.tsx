import React from "react"
import { useAppDispatch, useAppSelector } from "../store/store"
import { resetSnackbar } from "../store/notes/notesSlice"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { AlertProps } from "@mui/material"
import { AlertColor } from "@mui/material"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref as React.RefObject<HTMLDivElement>}
      variant="filled"
      {...props}
    />
  )
})

const GitSnackbar = () => {
  const dispatch = useAppDispatch()
  const { snackbar } = useAppSelector((state) => state.notes)

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
      onClose={handleClose}
    >
      <Alert severity={snackbar?.type as AlertColor} sx={{ width: "100%" }}>
        {snackbar?.message}
      </Alert>
    </Snackbar>
  )
}

export default GitSnackbar
