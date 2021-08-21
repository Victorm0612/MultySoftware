import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fffff",
    },
    dark: {
      main: "#212121",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
