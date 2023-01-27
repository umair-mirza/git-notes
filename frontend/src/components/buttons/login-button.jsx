import { Button, Typography } from "@mui/material"

const LoginButton = ({ url, children }) => {
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
