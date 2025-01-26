import { useEffect, useState } from "react";
import { TextField, Box, Button, Typography, Grid } from "@mui/material";
import ImageUploadComponent from "../../../utils/helpers/FilePondHelper2";
import { baseCaravanDetailsSchema } from "../../../validation/addCaravanValidation";
import { validateInputs } from "../../../validation/validation";
import { toast } from "react-toastify";
import checkSessionStorage from "../../../utils/helpers/checkSessionStorage";
import getToken from "../../../utils/helpers/getToken";

const AddAcc8 = ({ nextBtn, photoRemoved, caravanId, uploadTrigger }) => {
  const [caravanDetails, setCaravanDetails] = useState({
    licenseNumber: "",
    carModel: "",
    carYear: "",
  });
  const [base64Data, setBase64Data] = useState([
    {
      fileName: "license",
      base64Data: null,
    },
    { fileName: "mandInsure", base64Data: null },
    { fileName: "3rdPartyInsure", base64Data: null },
  ]);
  const [imageUploadTrigger, setImageUploadTrigger] = useState(false);

  useEffect(() => {
    const sessionData = JSON.parse(checkSessionStorage(8));
    if (sessionData) {
      setCaravanDetails(sessionData);
    }
  }, []);

  useEffect(() => {
    setImageUploadTrigger(uploadTrigger);
  }, [uploadTrigger]);
  const userId = getToken().userId;

  const checkForPhotos = (data) => {
    for (let item of data) {
      if (item.base64Data === null) {
        //console.log("null");
        return false;
      } else return true;
    }
  };

  const handleNextBtn = () => {
    const joiResponse = validateInputs(
      baseCaravanDetailsSchema,
      caravanDetails
    );
    if (joiResponse) {
      return;
    }
    if (!checkForPhotos(base64Data)) {
      return toast.error("אנא העלו את המסמכים הנדרשים");
    }
    const caravanData = {
      caravanDetails,
      base64Data,
    };
    sessionStorage.setItem("acc8Data", JSON.stringify(caravanDetails));
    nextBtn(caravanData, 7);
  };

  const sendUpData = (data, numberOfEntry) => {
    setBase64Data((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry].base64Data = data;
      return newData;
    });
  };

  const handleRemoveItem = (indexNumber) => {
    const newData = [...base64Data];
    newData[indexNumber].base64Data = null;
    //console.log("handleRemoveItem data", newData);
    setBase64Data(newData);
    photoRemoved(base64Data);
  };

  const onCaravanDetailsChange = (e) => {
    const { name, value } = e.target;
    setCaravanDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //console.log("base64Data", base64Data);
  //console.log("caravanDetails", caravanDetails);

  return (
    <Box>
      <Typography variant="h6">פרטים בסיסיים:</Typography>
      <Box sx={{ marginBottom: 2, marginTop: 2 }}>
        <TextField
          name="licenseNumber"
          className="addCarTextFiled"
          label="מספר רישוי"
          value={caravanDetails.licenseNumber}
          onChange={onCaravanDetailsChange}
        />
        <TextField
          name="carModel"
          className="addCarTextFiled"
          label="דגם רכב"
          value={caravanDetails.carModel}
          sx={{ marginRight: 2 }}
          onChange={onCaravanDetailsChange}
        />
        <TextField
          name="carYear"
          className="addCarTextFiled"
          label="שנת ייצור"
          value={caravanDetails.carYear}
          sx={{ marginRight: 2 }}
          onChange={onCaravanDetailsChange}
        />
      </Box>
      <Typography variant="h6">אנא העלו את ביטוח ורישיון הרכב שלכם</Typography>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">רישיון רכב:</Typography>
          <Box>
            <ImageUploadComponent
              imageTypeName="licenseImages"
              uploadTrigger={imageUploadTrigger}
              userId={userId}
              indexNumber={0}
              serverUrl={`http://localhost:5000/api/images/uploadimage/licenseImages/${userId}/${caravanId}`}
              fileType="licenseImages"
              sendUpFunc={sendUpData}
              handleRemovePhoto={() => handleRemoveItem(0)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">ביטוח חובה:</Typography>
          <ImageUploadComponent
            imageTypeName="licenseImages"
            uploadTrigger={imageUploadTrigger}
            serverUrl={`http://localhost:5000/api/images/uploadimage/licenseImages/${userId}/${caravanId}`}
            fileType="licenseImages"
            indexNumber={1}
            sendUpFunc={sendUpData}
            handleRemovePhoto={() => handleRemoveItem(1)}
            userId={userId}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">ביטוח צד ג':</Typography>
          <ImageUploadComponent
            userId={userId}
            imageTypeName="licenseImages"
            uploadTrigger={imageUploadTrigger}
            indexNumber={2}
            serverUrl={`http://localhost:5000/api/images/uploadimage/licenseImages/${userId}/${caravanId}`}
            fileType="licenseImages"
            sendUpFunc={sendUpData}
            handleRemovePhoto={() => handleRemoveItem(2)}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleNextBtn}
        >
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc8;
