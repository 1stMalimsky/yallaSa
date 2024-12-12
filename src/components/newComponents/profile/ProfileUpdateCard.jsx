import { useState } from "react";
import { Button, Grid, Box, Typography, TextField, Alert } from "@mui/material";
import { toast } from "react-toastify";
import { validateProfileSchema } from "../../../validation/profileValidation";
import { useNavigate } from "react-router-dom";

const ProfileUpdateCard = ({ userDetails }) => {
  const [inputState, setInputState] = useState(userDetails);
  const [inputsErrorsState, setInputsErrorsState] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const joiResponse = validateProfileSchema(inputState);
      console.log("joiResponse", joiResponse);

      if (joiResponse && Object.keys(joiResponse).length > 0) {
        const newErrors = Object.entries(joiResponse).map(
          ([field, messages]) => ({
            field,
            message: messages[0],
          })
        );
        setInputsErrorsState(newErrors);
      } else {
        setInputsErrorsState([]);
      }
    } catch (err) {
      console.log("error from handleProfileSave", err);
      toast.error("Couldn't apply changes. Please try again");
    }
  };
  console.log("inputErrorState", inputsErrorsState);

  const handleCancelBtnClick = () => {
    setInputState(userDetails);
    navigate("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          id="fullName"
          className="inputRTL"
          variant="outlined"
          label="שם מלא"
          value={inputState.fullName}
          fullWidth
          onChange={handleInputChange}
        />
        {inputsErrorsState &&
          inputsErrorsState
            .filter((error) => error.field === "fullName")
            .map((error, index) => (
              <Alert severity="warning" key={`fullName-${index}`}>
                {error.message}
              </Alert>
            ))}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="email"
          className="inputRTL"
          variant="outlined"
          label="מייל"
          value={inputState.email}
          fullWidth
          onChange={handleInputChange}
        />
        {inputsErrorsState && inputsErrorsState[inputState.email] && (
          <Alert severity="warning">
            {inputsErrorsState[inputState.email].map((err) => (
              <div key={inputState + err}>{err}</div>
            ))}
          </Alert>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="phone"
          className="inputRTL"
          variant="outlined"
          label="טלפון"
          value={inputState.phone}
          fullWidth
          onChange={handleInputChange}
        />
        {inputsErrorsState && inputsErrorsState[inputState.phone] && (
          <Alert severity="warning">
            {inputsErrorsState[inputState.phone].map((err) => (
              <div key={inputState + err}>{err}</div>
            ))}
          </Alert>
        )}
      </Grid>

      {inputState.license ? (
        <Grid item xs={12} sm={6}>
          <Typography>Lisence here</Typography>
        </Grid>
      ) : (
        <Grid item xs={12} sm={6}></Grid>
      )}

      <Grid item xs={6}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSaveClick}
        >
          שמירה
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleCancelBtnClick}
        >
          ביטול
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileUpdateCard;
