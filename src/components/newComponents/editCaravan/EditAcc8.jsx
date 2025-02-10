import { useEffect, useState } from "react";
import { TextField, Box, Button, Typography, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ImageUploadComponent from "../../../utils/helpers/FilePondHelper2";
import { baseCaravanDetailsSchema } from "../../../validation/addCaravanValidation";
import { validateInputs } from "../../../validation/validation";
import { toast } from "react-toastify";
import getToken from "../../../utils/helpers/getToken";
import getUserImages from "../../../utils/helpers/getUserImages";
import axios from "axios";
import getLicenseImages from "../../../utils/helpers/getLicenseImages";

const EditAcc8 = ({ nextBtn, caravanId, parentData }) => {
  const [caravanDetails, setCaravanDetails] = useState({
    licenseNumber: "",
    carModel: "",
    carYear: "",
  });
  const [base64Data, setBase64Data] = useState([]);
  const [imageUploadTrigger, setImageUploadTrigger] = useState(false);

  const userId = getToken().userId;
  const licenseTitles = ["רשיון רכב", "ביטוח חובה", "ביטוח צד ג'"];
  useEffect(() => {
    const getImgs = async () => {
      try {
        const foundImages = await getLicenseImages(caravanId);
        //console.log("licenseImgs", foundImages);
        if (foundImages) setBase64Data(foundImages);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    getImgs();
    const newData = {
      licenseNumber: parentData.licensePlateNumber,
      carModel: parentData.model,
      carYear: parentData.year,
    };
    setCaravanDetails(newData);
  }, [imageUploadTrigger]);

  const checkForPhotos = (data) => {
    for (let item of data) {
      if (item.base64Data === null) {
        //console.log("null");
        return false;
      } else return true;
    }
  };

  const handleNextBtn = async () => {
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
    /*   try {
      const licenseDetails = {
        licensePlateNumber: caravanDetails.licenseNumber,
        model: caravanDetails.carModel,
        year: caravanDetails.carYear,
      };
      const updatedData = await axios.patch(
        `/caravans/${caravanId}`,
        licenseDetails
      );

      if (updatedData.status === 200) return;
      toast.success("הקרוואן עודכן בהצלחה");
    } catch (err) {
      console.error("Error:", err);
    }
 */
    nextBtn(caravanData, 7);
  };

  const showImgUpload = (index) => {
    setBase64Data((prevState) => {
      const updatedImageData = [...prevState]; // Copy the array
      updatedImageData[index] = { ...updatedImageData[index], path: "" }; // Update first object

      return updatedImageData; // Set updated state
    });
  };

  /*   const sendUpData = (data, numberOfEntry) => {
    console.log("prevData", base64Data, base64Data[numberOfEntry]);

    setBase64Data((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry].base64Data = data;
      return newData;
    });
  }; */

  const handleRemoveItem = (indexNumber) => {
    setBase64Data((prevData) => {
      if (!prevData[indexNumber]) {
        console.warn(`Index ${indexNumber} does not exist in base64Data`);
        return prevData; // Return the same state if index is invalid
      }

      const newData = [...prevData];
      newData[indexNumber] = { ...newData[indexNumber], base64Data: null }; // Set base64Data to null instead of []
      return newData;
    });
  };

  const deleteLicenseImg = async (imgId) => {
    try {
      const response = await axios.delete(
        `/images/removeimage/licenseImages/${userId}/${imgId}/`
      );
      if (response.status === 200) {
        toast.success("התמונה נמחקה בהצלחה");
        setImageUploadTrigger(!imageUploadTrigger);
        return;
      }
      toast.error("אירעה שגיאה בעת מחיקת התמונה");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const onCaravanDetailsChange = (e) => {
    const { name, value } = e.target;
    setCaravanDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //console.log("base64Data", base64Data);
  //console.log("parentData 8", parentData);
  if (!parentData || !base64Data) return <CircularProgress />;

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
        {[0, 1, 2].map((index) => (
          <Grid item xs={12} md={3} key={index}>
            <Typography variant="h6">{licenseTitles[index]}:</Typography>
            {base64Data[index]?.path && (
              <Box>
                <img
                  src={base64Data[index].path || ""}
                  alt={base64Data[index].filename || ""}
                  style={{ width: "100%" }}
                />
                <Button
                  variant="contained"
                  onClick={() => showImgUpload(index)}
                  sx={{ marginLeft: 2 }}
                >
                  לעדכון התמונה
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteLicenseImg(base64Data[index]._id)}
                >
                  להסרת התמונה
                </Button>
              </Box>
            )}

            {!base64Data[index]?.path && (
              <Box>
                <ImageUploadComponent
                  imageTypeName="licenseImages"
                  uploadTrigger={imageUploadTrigger}
                  userId={userId}
                  indexNumber={index}
                  serverUrl={`http://localhost:5000/api/images/uploadimage/licenseImages/${userId}/${caravanId}`}
                  fileType="licenseImages"
                  /* sendUpFunc={sendUpData} */
                  handleRemovePhoto={() => handleRemoveItem(index)}
                />
              </Box>
            )}
          </Grid>
        ))}
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

export default EditAcc8;
