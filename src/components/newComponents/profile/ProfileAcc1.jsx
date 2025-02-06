import { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { toast } from "react-toastify";
import { validateInputs } from "../../../validation/validation";
import { profileSchema } from "../../../validation/profileValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileAcc1 = ({ userDetails }) => {
  const [inputState, setInputState] = useState(userDetails);
  const [editUserDetails, setEditUserDetails] = useState({
    fullName: userDetails.fullName,
    email: userDetails.email,
    phone: userDetails.phone,
    license: userDetails.license || "",
  });

  console.log("userDetails", userDetails);

  const navigate = useNavigate();
  const userId = userDetails.userId;

  const handleSaveUserDeetsClick = async () => {
    console.log("editUserDetails", editUserDetails.license);

    const joiResponse = validateInputs(profileSchema, editUserDetails);
    console.log("joiresponse", joiResponse);
    if (joiResponse) {
      toast.error(joiResponse);
      return;
    }
    try {
      await axios.put(`/users/update/${userId}`, editUserDetails);
      toast.success("הפרטים שונו בהצלחה");
      setInputState((prevState) => ({ ...prevState, ...editUserDetails }));
    } catch (err) {
      console.log("error from handleProfileSave", err.response.data);
      toast.error("בעיה בביצוע עדכון. אנא נסו שנית");
    }
  };
  const handleCancelBtnClick = () => {
    setInputState(userDetails);
    navigate("/");
  };

  const handleInputChange = (e, setinputState) => {
    setinputState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ marginLeft: 3, padding: 2 }}>
              <span style={{ fontWeight: "bold" }}>שם: </span>{" "}
              {inputState.fullName}
            </Typography>
            <Typography sx={{ marginLeft: 3, padding: 2 }}>
              <span style={{ fontWeight: "bold" }}>מייל: </span>
              {inputState.email}
            </Typography>
            <Typography sx={{ marginLeft: 3, padding: 2 }}>
              <span style={{ fontWeight: "bold" }}> טלפון: </span>{" "}
              {inputState.phone}
            </Typography>
            <Button
              variant="text"
              sx={{ marginLeft: 3, padding: 2, fontWeight: "bold" }}
            >
              עדכון פרטים
            </Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="fullName"
              className="inputRTL"
              variant="outlined"
              label="שם מלא"
              value={editUserDetails.fullName}
              fullWidth
              onChange={(event) => handleInputChange(event, setEditUserDetails)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              className="inputRTL"
              variant="outlined"
              label="מייל"
              value={editUserDetails.email}
              fullWidth
              onChange={(event) => handleInputChange(event, setEditUserDetails)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone"
              className="inputRTL"
              variant="outlined"
              label="טלפון"
              value={editUserDetails.phone}
              fullWidth
              onChange={(event) => handleInputChange(event, setEditUserDetails)}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSaveUserDeetsClick}
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
      </AccordionDetails>
    </Accordion>
  );
};

export default ProfileAcc1;
