import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Alert,
} from "@mui/material/";
import axios from "axios";
import { registerSchema } from "../../validation/registerValidation";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import validateInputs from "../../utils/helpers/validateInputs";

const RegisterCardComponent = ({ handleBtnClick }) => {
  /* STATES */
  const [inputState, setInputState] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [acceptRulesIsChecked, setAcceptRulesIsChecked] = useState(false);
  const [disableButtonState, setDisableButtonState] = useState(true);
  const navigate = useNavigate();

  /* CHECK FEILDS ARE NOT EMPTY */
  const areFieldsValid = () => {
    const allFieldsFilled = Object.values(inputState).every(
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
    try {
      if (validateInputs(registerSchema, inputState)) {
        await axios.post("/users/register", inputState);
        toast.success("נרשמת בהצלחה");
        navigate(ROUTES.LOGIN);
      } else {
        console.log("registration error");
      }
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("Registrationg error occured. Please try again");
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
