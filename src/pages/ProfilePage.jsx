import { useState, useEffect } from "react";
import ProfileAcc1 from "../components/newComponents/profile/ProfileAcc1";
import ProfileAcc2 from "../components/newComponents/profile/ProfileAcc2";
import { Avatar, Box, Container, Typography, Button } from "@mui/material";
import ProfileAcc3 from "../components/newComponents/profile/ProfileAcc3";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import getToken from "../utils/helpers/getToken";
import getUserDetails from "../utils/helpers/getUserDetails";
import getUserImages from "../utils/helpers/getUserImages";

const EditProfilePage = () => {
  const [inputState, setInputState] = useState(null);
  const [renderTrigger, setRendertrigger] = useState(false);
  const tokenPayload = getToken();
  if (!tokenPayload) {
    window.location.href = "/login";
  }
  //console.log("inputState", inputState);

  const triggerInit = () => {
    setRendertrigger(!renderTrigger);
    console.log("trigger set");
  };

  useEffect(() => {
    (async () => {
      try {
        const foundUser = await getUserDetails(tokenPayload.userId);
        const userImages = await getUserImages(tokenPayload.userId);
        //console.log("foundUser", foundUser);
        //console.log("userImages", userImages);
        const dataToUpdate = {
          userId: foundUser._id,
          fullName: foundUser.fullName,
          email: foundUser.email,
          phone: foundUser.phone,
          license: userImages[0] || "",
          isOwner: foundUser.isOwner,
        };
        setInputState(dataToUpdate);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [renderTrigger]);

  //console.log("profile page in put state", inputState);

  if (!inputState) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={3}
            md={4}
            sx={{ border: 1, display: "flex", justifyContent: "center" }}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: 1,
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
            </Avatar>

            <Typography
              variant="h5"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              הפרופיל שלי
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={4}
            sx={{ border: 1, display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              href="/preaddcaravan"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                marginLeft: 2,
                marginRight: 2,
              }}
            >
              הוספת קרוואן
            </Button>
            <Button
              variant="contained"
              color="primary"
              href={`/resmanagement/${inputState.userId}`}
              sx={{
                marginTop: 2,
                marginBottom: 2,
                marginLeft: 2,
                marginRight: 2,
              }}
            >
              ניהול הזמנות
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          פרטי משתמש
        </Typography>
        <ProfileAcc1 userDetails={inputState} />
        <Typography variant="h5" gutterBottom>
          רשיון נהיגה
        </Typography>
        <ProfileAcc2 userDetailsData={inputState} renderFunc={triggerInit} />
        <Typography variant="h5" gutterBottom>
          הקרוואנים שלי
        </Typography>
        <ProfileAcc3 userData={inputState} />
      </Box>
    </Container>
  );
};
export default EditProfilePage;
