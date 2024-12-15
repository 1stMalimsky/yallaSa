import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, TextField, Button } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import useLogin from "../../hooks/useLogin";
import { loginSchema } from "../../validation/loginValidation";
import { validateInputs } from "../../validation/validation";

const LoginCardComponent = () => {
  /* STATES */
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const login = useLogin();

  const handleLoginClick = async () => {
    try {
      if (!validateInputs(loginSchema, inputState)) {
        const serverResponse = await axios.post("/users/login", inputState);
        //console.log("server response", serverResponse.data);
        localStorage.setItem("token", serverResponse.data.token);
        login();
        toast.success("התחברת בהצלחה");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("login error from axios", err.response.data);
      toast.error(err.response.data.message);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setInputState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="loginCardContainer">
      {/* GRID CONTAINER */}
      <Grid
        container
        maxWidth="sm"
        spacing={1}
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        {/* HEADER AND CHECKBOX */}
        <Grid item xs={12} sx={{ padding: 2 }}>
          <Typography variant="h4" component="h6" sx={{ fontWeight: "bold" }}>
            עמוד התחברות
          </Typography>
        </Grid>
        {/* {/* INPUTS */}

        <Grid item xs={12}>
          <TextField
            className="loginTextField"
            id="email"
            required={true}
            label={"אימייל"}
            value={inputState.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "0.5em" }}>
          <TextField
            className="loginTextField"
            id="password"
            required={true}
            label={"סיסמא"}
            value={inputState.password}
            onChange={handleInputChange}
            sx={{ input: { direction: "ltr" } }}
          />
        </Grid>

        {/* BUTTON */}
        <Grid item xs={12} sx={{ marginBottom: "1em" }}>
          <Button
            variant="contained"
            sx={{
              width: "10em",
              height: "4em",
            }}
            onClick={handleLoginClick}
          >
            <Typography variant="body1">התחברות</Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: "0.5em" }}>
          <Typography variant="body2">
            עוד לא רשומים?{" "}
            <a href={ROUTES.REGISTER} style={{ fontWeight: "bold" }}>
              לחצו כאן
            </a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginCardComponent;
