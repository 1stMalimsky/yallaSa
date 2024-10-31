import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import validateLoginSchema from "../../validation/loginValidation";
import axios from "axios";
import { toast } from "react-toastify";

const LoginCardComponent = () => {
  /* STATES */
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  /* USER VALIDATION */
  const handleLoginClick = async (ev) => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      if (joiResponse) {
        let firstError = Object.keys(joiResponse)[0];
        let firstErrorValue = String(joiResponse[firstError]);
        //console.log("joiResponse", firstErrorValue);
        toast.error(firstErrorValue);
        return;
      }
      await axios.post("/user/register", inputState);
      toast.success("Registeration success!");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      //console.log("error from axios", err.response.data);
      toast.error("Registrationg error occured. Please try again");
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
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(51, 51, 51, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
        })}
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
          <FormControlLabel control={<Checkbox />} label="זכור אותי" />
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
