import { Button, Typography } from "@mui/material"

const GitButton = ({ children, onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      <Typography color="white">{children}</Typography>
    </Button>
  )
}

export default GitButton
