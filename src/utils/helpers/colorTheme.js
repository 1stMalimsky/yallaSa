import { createTheme } from "@mui/material/styles";

/* LIGHT THEME */
const lightThemePalette = {
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      dark: "#125b9b", // Manually calculated darker shade
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7c009c",
      dark: "#5b0074", // Manually calculated darker shade
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
          "--primary-dark": "#125b9b", // Adding CSS variable for darker primary
          "--primary-contrastText": "#ffffff",
          "--secondary-main": "#7c009c",
          "--secondary-dark": "#5b0074", // Adding CSS variable for darker secondary
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
const darkThemePalette = {
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      light: "#b3daff", // Added lightened primary color
      contrastText: "#000000",
    },
    secondary: {
      main: "#f48fb1",
      light: "#f7a8c8", // Added lightened secondary color
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
          "--primary-light": "#b3daff", // Adding CSS variable for lightened primary
          "--primary-contrastText": "#000000",
          "--secondary-main": "#f48fb1",
          "--secondary-light": "#f7a8c8", // Adding CSS variable for lightened secondary
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

export const light = createTheme(lightThemePalette);
export const dark = createTheme(darkThemePalette);
