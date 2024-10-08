import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  Box,
  Container,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateProfileSchema from "../validation/profileValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import userInputs from "../utils/userInput";
import EditCardInput from "../components/EditCardInputs";
import { useSelector } from "react-redux";
import normalizeUser from "../utils/normalizeUser";

const EditProfilePage = () => {
  const [inputState, setInputState] = useState("");
  const [inputsErrorsState, setInputsErrorsState] = useState("");
  const navigate = useNavigate();
  const payload = useSelector((storePie) => storePie.authSlice.payload);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/user/" + payload.userId);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        if (data.address) {
          newInputState.country = data.address.country;
          newInputState.city = data.address.city;
          newInputState.street = data.address.street;
          newInputState.houseNumber = data.address.houseNumber;
          newInputState.zip = data.address.zip;
        }
        if (data.name) {
          newInputState.firstName = data.name.firstName;
          newInputState.middleName = data.name.middleName;
          newInputState.lastName = data.name.lastName;
        }
        delete newInputState.name;
        delete newInputState.image;
        delete newInputState.address;
        delete newInputState._id;
        delete newInputState.createdAt;
        delete newInputState.__v;
        delete newInputState.password;
        delete newInputState.isAdmin;

        setInputState(newInputState);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [payload.userId]);

  const handleSaveBtnClick = async (ev) => {
    try {
      const updatedInputState = { ...inputState };
      const joiResponse = validateProfileSchema(updatedInputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        normalizeUser(updatedInputState);
        await axios.put("/user/" + payload.userId, updatedInputState);
        toast.success("User Updated");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log(err);
      toast.error("Couldn't apply changes. Please try again");
    }
  };

  const handleCancelBtnClick = () => {
    navigate("/");
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

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
          Edit card
        </Typography>
        <Box
          component="img"
          sx={{
            maxWidth: 350,
            maxHeight: 350,
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {userInputs.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={item.inputName + "EditProfilePage"}
              >
                <EditCardInput
                  input={item.stateName}
                  label={item.inputName}
                  required={true}
                  value={inputState[item.stateName]}
                  id={item.stateName}
                  onChange={handleInputChange}
                />

                {inputsErrorsState && inputsErrorsState[item.stateName] && (
                  <Alert severity="warning">
                    {inputsErrorsState[item.stateName].map((err) => (
                      <div key={item.stateName + err}>{err}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSaveBtnClick}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelBtnClick}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default EditProfilePage;
