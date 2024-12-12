import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  Box,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateProfileSchema from "../validation/profileValidation";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import normalizeUser from "../utils/normalizeUser";
import ProfileUpdateCard from "../components/newComponents/profile/ProfileUpdateCard";

const EditProfilePage = () => {
  const [inputState, setInputState] = useState("");
  const [inputsErrorsState, setInputsErrorsState] = useState("");
  const navigate = useNavigate();
  const payload = useSelector((storePie) => storePie.authSlice.payload);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/users/" + payload.userId);
        let newInputState = {
          ...data,
        };
        delete newInputState._id;
        delete newInputState.createdAt;
        delete newInputState.__v;
        delete newInputState.password;
        delete newInputState.isAdmin;
        delete newInputState.isOwner;
        delete newInputState.userReservations;
        delete newInputState.ownerReservations;
        delete newInputState.date;
        delete newInputState.caravanIds;
        delete newInputState.updatedAt;
        //console.log("newInputState", newInputState);

        setInputState(newInputState);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [payload.userId]);

  if (!inputState) {
    return <CircularProgress />;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הפרופיל שלי
        </Typography>

        <Box component="div" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileUpdateCard userDetails={inputState} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default EditProfilePage;
