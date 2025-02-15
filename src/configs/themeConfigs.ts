import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#ee3b44",
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
