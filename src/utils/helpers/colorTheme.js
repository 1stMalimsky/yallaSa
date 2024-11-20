import { createTheme } from "@mui/material/styles";

/* LIGHT THEME */
const lightThemePallette = {
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7c009c",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffffcc",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--primary-main": "#1976d2",
          "--primary-contrastText": "#ffffff",
          "--secondary-main": "#7c009c",
          "--secondary-contrastText": "#ffffff",
          "--background-default": "#ffffffcc",
          "--background-paper": "#ffffff",
          "--text-primary": "#333333",
          "--text-secondary": "#666666",
        },
      },
    },
  },
};

/* DARK THEME */
const darkThemePallette = {
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      contrastText: "#000000",
    },
    secondary: {
      main: "#f48fb1",
      contrastText: "#000000",
    },
    background: {
      default: "#232323dc",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--primary-main": "#90caf9",
          "--primary-contrastText": "#000000",
          "--secondary-main": "#f48fb1",
          "--secondary-contrastText": "#000000",
          "--background-default": "#232323dc",
          "--background-paper": "#1d1d1d",
          "--text-primary": "#ffffff",
          "--text-secondary": "#b0bec5",
        },
      },
    },
  },
};

export const light = createTheme(lightThemePallette);
export const dark = createTheme(darkThemePallette);
