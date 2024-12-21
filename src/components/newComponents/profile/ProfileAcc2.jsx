import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material";
import FilePondHelper from "../../../utils/helpers/FilePondHelper";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import getUserDetails from "../../../utils/helpers/getUserDetails";

const ProfileAcc2 = ({ userDetails, onDetailsUpdated, renderFunc }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [serverResponseData, setServerResponseData] = useState({});
  const [userDetailsState, setUserDetailsState] = useState(userDetails);
  const [showUploadWindow, setShowUploadWindow] = useState(true);
  const [showImageWindow, setShowImageWindow] = useState(false);

  //console.log("userDetails", userDetailsState);
  /*   //console.log(
    "showUploadWindow",
    showUploadWindow,
    "showImageWindow",
    showImageWindow
  ); */
  //console.log("userDetailsState", userDetailsState);
  useEffect(() => {
    if (userDetailsState && !userDetailsState.license.path) {
      console.log("no image found");
      setShowImageWindow(false);
    } else {
      console.log("Image Exists!");
      setShowUploadWindow(false);
      setShowImageWindow(true);
    }
  }, [userDetailsState]);

  const handleUploadComplete = (response) => {
    const uploadCompleteResponse = JSON.parse(response);
    setUserDetailsState((prevState) => ({
      ...prevState,
      license: {
        filename: uploadCompleteResponse.license.filename,
        path: uploadCompleteResponse.license.path,
        contentType: uploadCompleteResponse.license.contentType,
      },
    }));
  };

  const handleRemoveLicenseClick = async () => {
    try {
      if (userDetailsState.license.path === "") {
        return console.log("no license found");
      }
      const userToUpdate = {
        ...userDetailsState,
        license: {
          filename: "",
          path: "",
          contentType: "",
        },
      };
      const updatedState = await axios.patch(
        `/users/update/${userDetails._id}`,
        userToUpdate
      );
      console.log("updatedState", updatedState);

      if (updatedState) {
        setUserDetailsState(userToUpdate);
        setShowUploadWindow(true);
        setShowImageWindow(false);
        toast.error("הרישיון נמחק בהצלחה");
      } else console.log("no license updated");
    } catch (err) {
      console.log("removeLicenseClick Err", err.response.data);
    }
  };

  const handleUpdateLicenseClick = () => {
    setShowUploadWindow(true);
    setShowImageWindow(false);
  };

  if (!userDetails) {
    return <CircularProgress />;
  }
  return (
    <Accordion
      open={accordionOpen}
      onClick={() => setAccordionOpen(!accordionOpen)}
    >
      <AccordionSummary>
        {showUploadWindow ? (
          <Button variant="text">העלאת רישיון נהיגה</Button>
        ) : (
          <Button variant="text">צפייה ברישיון הנהיגה</Button>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {showUploadWindow ? (
          <FilePondHelper
            serverUrl={`http://localhost:5000/api/images/uploadimage/${userDetailsState._id}`}
            allowMultiple={false}
            maxFiles={1}
            fileType="licenseImage"
            onUploadComplete={handleUploadComplete}
            userDetails={userDetailsState}
          />
        ) : null}
        {showImageWindow ? (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={userDetailsState.license.path}
                alt="license"
                style={{ maxWidth: "40%" }}
              />
            </Box>
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ ml: 2, width: 250 }}
                onClick={handleUpdateLicenseClick}
              >
                עדכן תמונה
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: 250 }}
                onClick={handleRemoveLicenseClick}
              >
                הסר תמונה
              </Button>
            </Box>
          </div>
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProfileAcc2;
