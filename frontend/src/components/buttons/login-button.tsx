import React from "react"
import { Button } from "@mui/material"

type LoginButtonProps = {
  url: string
  children: React.ReactNode
}

const LoginButton = ({ url, children }: LoginButtonProps) => {
  return (
    <Button
      component="button"
      variant="contained"
      sx={{ backgroundColor: "white" }}
      href={url}
    >
      {children}
    </Button>
  )
}

export default LoginButton
