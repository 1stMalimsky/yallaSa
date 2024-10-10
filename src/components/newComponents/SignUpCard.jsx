import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Input,
  Box,
} from "@mui/material/";
import Container from "@mui/material/Container";

const SignInCardComponent = () => {
  const [acceptRulesIsChecked, setAcceptRulesIsChecked] = useState(false);
  const [disableButtonState, setDisableButtonState] = useState(true);
  const [inputState, setInputState] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      acceptRulesIsChecked &&
      inputState.fullName.trim() &&
      inputState.email.trim() &&
      inputState.password.trim()
    ) {
      setDisableButtonState(false);
    } else {
      setDisableButtonState(true);
    }
  }, [
    inputState.fullName,
    inputState.email,
    inputState.password,
    acceptRulesIsChecked,
  ]);

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

  return (
    <div>
      {/* GRID CONTAINER */}
      <Grid
        container
        className="signupCardContainer"
        maxWidth="sm"
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
export default SignInCardComponent;
