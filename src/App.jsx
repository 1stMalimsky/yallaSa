import { useState, useEffect, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Router from "./routes/Router";
import Navbar from "./components/NavBar/MuiNav";
import "./index.css";
import useLogin from "./hooks/useLogin";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import FooterComponent from "./components/FooterComponent";
import { Box } from "@mui/system";
import { toastOptions } from "./utils/helpers/toastSettings";
import { light, dark } from "./utils/helpers/colorTheme";
import AccessibilityWidget from "./components/newComponents/AccessibilityComponent";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLogin();

  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const selectedTheme = useMemo(
    () => (isDarkTheme ? dark : light),
    [isDarkTheme]
  );

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <ToastContainer {...toastOptions} />
      <Box sx={{ direction: "rtl" }}>
        <header>
          <Navbar />
        </header>
        <main>{isLoading ? <CircularProgress /> : <Router />}</main>
        <footer>
          <FooterComponent />
        </footer>
      </Box>
    </ThemeProvider>
  );
}

{
  /* <AccessibilityWidget /> */
}
export default App;
