import React from "react"
import { Button, Typography } from "@mui/material"

type GitButtonProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const GitButton = ({ children, onClick }: GitButtonProps) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      <Typography color="white">{children}</Typography>
    </Button>
  )
}

export default GitButton
