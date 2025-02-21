import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#ee3b44",
    },
    secondary: {
      main: "#1a1a1a",
      light: "#808080",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

export { theme };
