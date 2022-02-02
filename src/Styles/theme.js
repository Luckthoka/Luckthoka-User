import { createTheme } from "@mui/material/styles";
import { yellow, pink, orange, green, red } from "@mui/material/colors";

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "#ffd400",
          backgroundColor: "#353535",
        },
        "*::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "*::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
        },
        "*::-webkit-scrollbar-thumb": {
          //   backgroundColor: yellow[500],
          backgroundImage: "linear-gradient(#ffd400,#d93013)",
          borderRadius: 10,
          outline: "1px solid slategrey",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffd400",
          color: "#353535",
          "&:hover": {
            backgroundColor: "#353535",
            color: "#ffd400",
          },
          "&.Mui-selected": {
            backgroundColor: "#d93013",
            color: "#ffd400",
          },
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#353535",
      dark: "#000000",
      contrastText: "#ffd400",
    },
    secondary: {
      main: "#ffd400",
      contrastText: "#353535",
    },
    // error: {
    //   main: red.A400,
    // },
    background: {
      default: "#353535",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

export default theme;
