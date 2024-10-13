import { React, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";

const CardComponent = () => {
  const [inputState, setInputState] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

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
            control={<Checkbox />}
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

export default CardComponent;
