import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CachedIcon from "@mui/icons-material/Cached";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import validateLoginSchema from "../validation/loginValidation";
import useLogin from "../hooks/useLogin";
import { useSelector } from "react-redux";
import LoginCardComponent from "../components/newComponents/logInCardComponent";

const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [buttonDisabledState, setButtonDisabledState] = useState(true);
  const login = useLogin();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((storePie) => storePie.authSlice.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      toast.error(
        "You are currently logged in. You must logout to login again"
      );
      navigate("/");
    }
    if (inputState.email.trim() && inputState.password.trim()) {
      setButtonDisabledState(false);
    } else {
      setButtonDisabledState(true);
    }
  }, [inputState]);

  const handleSignInBtnClick = async (ev) => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      const { data } = await axios.post("user/users/login", inputState);
      localStorage.setItem("token", data.token);
      login();
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("Email or password incorrect. Try again");
      console.log("login error", err);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  const handleResetBtn = () => {
    setInputState({ email: "", password: "" });
    setInputsErrorsState(null);
  };
  return (
    <div>
      <Grid container className="loginGridContainer">
        <Grid item xs={12} sx={{ marginTop: "1em" }}>
          <LoginCardComponent />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
