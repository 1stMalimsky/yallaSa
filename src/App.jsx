import { useState, useEffect } from "react";
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
import { Box } from "@mui/system"; // <-- NEW (Replace for layout and styling)

// Configure RTL theme
const light = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // General button styling
          fontWeight: "bold",
        },
        disabled: {
          backgroundColor: "#cccccc", // Set a custom background color for disabled buttons
          color: "#666666", // Set a custom text color for disabled buttons
          opacity: 1, // Override default transparency
        },
      },
    },
  },
});

const dark = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
  },
});

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

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // <-- NEW (Enable RTL for toast notifications)
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box sx={{ direction: "rtl" }}>
        {" "}
        {/* <-- NEW (RTL for layout wrapper) */}
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

export default App;
