import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material/";
import axios from "axios";
import { registerSchema } from "../../validation/registerValidation";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { validateInputs } from "../../validation/validation";

const RegisterCardComponent = ({ handleBtnClick }) => {
  /* STATES */
  const [inputState, setInputState] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    license: "",
  });
  const [acceptRulesIsChecked, setAcceptRulesIsChecked] = useState(false);
  const [disableButtonState, setDisableButtonState] = useState(true);
  const navigate = useNavigate();

  /* CHECK FEILDS ARE NOT EMPTY */
  const areFieldsValid = () => {
    const fieldsToCheck = {
      fullName: inputState.fullName,
      phone: inputState.phone,
      email: inputState.email,
      password: inputState.password,
    };
    const allFieldsFilled = Object.values(fieldsToCheck).every(
      (value) => value.trim() !== ""
    );

    return acceptRulesIsChecked && allFieldsFilled;
  };
  useEffect(() => {
    setDisableButtonState(!areFieldsValid());
  }, [inputState, acceptRulesIsChecked]);

  const handleRulesCheckboxChange = (e) => {
    setAcceptRulesIsChecked(e.target.checked);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setInputState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  /* REGISTER VALIDATION AND COMPLETION */
  const handleRegisterClick = async () => {
    const joiResponse = validateInputs(registerSchema, inputState);
    console.log("joiresponse", joiResponse);
    if (joiResponse) {
      toast.error(joiResponse);
      return;
    }
    try {
      await axios.post("/users/register", inputState);
      toast.success("נרשמת בהצלחה");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err);
      toast.error(err.response.data.message || err);
    }
  };

  return (
    <div>
      {/* GRID CONTAINER */}
      <Grid
        container
        className="signupCardContainer"
        maxWidth="sm"
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        {/* HEADER AND CHECKBOX */}
        <Grid item xs={12} sx={{ padding: 2 }}>
          <Typography variant="h4" component="h6" sx={{ fontWeight: "bold" }}>
            עמוד הרשמה
          </Typography>
          <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
            אנא מלאו את הפרטים הנ"ל. <br /> ע"י הרשמה אתם מסכימים עם תנאי השימוש
            והפרטיות שלנו
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptRulesIsChecked}
                onChange={handleRulesCheckboxChange}
              />
            }
            label="אני מאשר את תנאי השימוש והפרטיות שלנו"
          />
          {}
        </Grid>
        {/* {/* INPUTS */}
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <TextField
              className="signUpCardInputs"
              id="fullName"
              required={true}
              label={"שם מלא"}
              value={inputState.fullName}
              onChange={handleInputChange}
            />
            {/*  <input placeholder="שם מלא" /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="signUpCardInputs"
              id="email"
              required={true}
              label={"כתובת מייל"}
              value={inputState.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="signUpCardInputs"
              id="phone"
              required={true}
              label={"מספר טלפון"}
              value={inputState.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "0.5em" }}>
            <TextField
              className="signUpCardInputs"
              id="password"
              required={true}
              label={"סיסמא"}
              value={inputState.password}
              onChange={handleInputChange}
              sx={{ input: { direction: "ltr" } }}
            />
          </Grid>
        </Grid>
        {/* BUTTON */}
        <Grid item xs={12} sx={{ marginBottom: "0.5em" }}>
          <Button
            variant="contained"
            disabled={disableButtonState}
            onClick={handleRegisterClick}
            sx={{
              width: "10em",
              height: "4em",
            }}
          >
            <Typography variant="body1">להרשמה</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default RegisterCardComponent;