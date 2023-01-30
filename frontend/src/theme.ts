import { createTheme } from "@mui/material"

declare module "@mui/material/styles" {
  interface PaletteOptions {
    tertiary: {
      main: "#1176ff"
    }
    fourth: {
      main: "ffffff"
    }
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5acba1",
      light: "#bdead9",
    },
    secondary: {
      main: "#35a77d",
    },
    tertiary: {
      main: "#1176ff",
    },
    fourth: {
      main: "ffffff",
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
