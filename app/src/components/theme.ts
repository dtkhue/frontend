import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#210BE0A2", // Bright blue
    },
    secondary: {
      main: "#676270", // Bright green
    },
    background: {
      default: "#f2f2f2", // Lighter grey
    },
    text: {
      primary: "#2c3e50", // Dark grey
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },

});

export default theme;
