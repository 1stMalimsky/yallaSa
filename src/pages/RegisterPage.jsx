import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";
import validateRegisterSchema from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import RegisterFieldComponent from "../components/RegisterFieldComponent";
import registerInputs from "./registerInputs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SignUpCardComponent from "../components/newComponents/SignUpCard";
import CardComponent from "../components/newComponents/logInCardComponent";

const RegisterPage = () => {
  const [inputState, setInputState] = "";
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [disableButtonState, setDisableButtonState] = useState(true);
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const navigate = useNavigate();

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  const handleResetBtn = () => {
    setInputState(
      Object.fromEntries(registerInputs.map((item) => [item.stateName, ""]))
    );
    setInputsErrorsState(null);
  };

  return (
    <div className="registerContainer">
      <Grid container className="registerGridPageContainer">
        <Grid item xs={12} className="signupGridItem">
          <SignUpCardComponent />
        </Grid>
      </Grid>
    </div>
  );
};
export default RegisterPage;
