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
    <Container component="main" maxWidth="lg">
      <Box className="registerBox">
        <Box className="headerBox">
          <Grid container>
            <Grid
              item
              xs={12}
              md={7}
              className={
                isDarkTheme ? "registerHeaderBoxDark" : "registerHeaderBox"
              }
            >
              <Typography component="h1" variant="h2" className="pageTitle">
                Register Page
              </Typography>
              <Typography variant="body1" className="registerHeader">
                Let's get started!If you'd like to join our community, we'll
                need some basic information about you. Please fill in the boxes
                below.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {registerInputs.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={item.inputName + " registerPage"}
              >
                <RegisterFieldComponent
                  input={item.inputName}
                  required={item.required}
                  value={inputState[item.stateName]}
                  id={item.stateName}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState[item.stateName] && (
                  <Alert severity="warning">
                    {inputsErrorsState[item.stateName].map((err) => (
                      <div key={item.stateName + err}>
                        {err === "pattern error" ? (
                          <div>
                            Password must contain:
                            <br />
                            - Uppercase letter
                            <br />
                            - Lowercase letter
                            <br />
                            - 4 consecutive numbers
                            <br />
                            - Special character (@#$%^&*()_)
                            <br />- At least 8 characters
                          </div>
                        ) : (
                          err
                        )}
                      </div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}

            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(ROUTES.HOME)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth onClick={handleResetBtn}>
                <CachedIcon />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                disabled={disableButtonState}
                fullWidth
                onClick={handleBtnClick}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.LOGIN}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
