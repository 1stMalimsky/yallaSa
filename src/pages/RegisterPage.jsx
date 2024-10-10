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

const RegisterPage = () => {
  const [inputState, setInputState] = useState(
    Object.fromEntries(registerInputs.map((item) => [item.stateName, ""]))
  );
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [disableButtonState, setDisableButtonState] = useState(true);
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (
      inputState.firstName.trim() &&
      inputState.lastName.trim() &&
      inputState.phone.trim() &&
      inputState.email.trim() &&
      inputState.password.trim() &&
      inputState.country.trim() &&
      inputState.city.trim() &&
      inputState.street.trim &&
      inputState.houseNumber.trim()
    ) {
      setDisableButtonState(false);
    } else {
      setDisableButtonState(true);
    }
  }, [
    inputState.firstName,
    inputState.lastName,
    inputState.phone,
    inputState.email,
    inputState.password,
    inputState.country,
    inputState.city,
    inputState.street,
    inputState.houseNumber,
  ]);
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      await axios.post("/user/register", inputState);
      toast.success("Registeration success!");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("Registrationg error occured. Please try again");
    }
  };
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
        <Grid item xs={12} className="signupGridItem" sx={{ border: 2 }}>
          <SignUpCardComponent />
        </Grid>
      </Grid>
    </div>
  );
};
export default RegisterPage;
