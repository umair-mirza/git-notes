import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5acba1",
      light: "#bdead9",
    },
    secondary: {
      main: "#35a77d",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
})
