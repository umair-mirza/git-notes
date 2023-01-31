import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const Spinner = () => {
  return (
    <Box sx={{ position: "fixed", top: "40%", left: "50%" }}>
      <CircularProgress size={80} />
    </Box>
  )
}

export default Spinner
