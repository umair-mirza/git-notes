import { Button } from "@mui/material"

const CustomButton = ({ children, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ color: "white" }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default CustomButton
