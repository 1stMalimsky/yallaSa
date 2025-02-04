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

const ProfileAcc2 = ({ userDetailsData, onDetailsUpdated, renderFunc }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [userDetails, setUserDetailsState] = useState(userDetailsData);
  const [showUploadWindow, setShowUploadWindow] = useState(true);
  const [showImageWindow, setShowImageWindow] = useState(false);
  const [licenseImageId, setLicenseImageId] = useState("");

  //console.log("userDetails", userDetails);
  useEffect(() => {
    // console.log("userDetalisData", userDetailsData);
    if (
      userDetails &&
      userDetailsData.license &&
      userDetailsData.license.path
    ) {
      setShowUploadWindow(false);
      setShowImageWindow(true);
    }
    setUserDetailsState(userDetailsData);
  }, [userDetailsData]);

  const handleUploadComplete = (response) => {
    //console.log("in handle Comeplete");
    renderFunc();
    const uploadCompleteResponse = JSON.parse(response);
    console.log(
      "uploadCompleteResponse",
      uploadCompleteResponse._id,
      uploadCompleteResponse.filename
    );
    setUserDetailsState((prevState) => ({
      ...prevState,
      license: {
        filename: uploadCompleteResponse.filename,
        path: uploadCompleteResponse.path,
        contentType: uploadCompleteResponse.contentType,
      },
    }));
  };

  const handleRemoveLicenseClick = async () => {
    try {
      if (userDetails.license.path === "") {
        return console.log("no license found");
      }
      /*      const userToUpdate = {
        ...userDetails,
        license: {
          filename: "",
          path: "",
          contentType: "",
        },
      }; */
      const deleteUserImage = await axios.delete(
        `images/deletelicense/${userDetails.userId}/${userDetails.license._id}`
      );
      //setUserDetailsState(userToUpdate);
      setShowUploadWindow(true);
      setShowImageWindow(false);
      toast.error("הרישיון נמחק בהצלחה");
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
            serverUrl={`http://localhost:5000/api/images/uploadlicense/${userDetails.userId}`}
            allowMultiple={false}
            maxFiles={1}
            fileType="userImages"
            onUploadComplete={handleUploadComplete}
            userDetails={userDetails}
          />
        ) : null}
        {showImageWindow ? (
          <div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={userDetails.license.path}
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
