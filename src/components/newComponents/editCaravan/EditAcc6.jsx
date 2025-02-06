import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ImageUploadComponent from "../../../utils/helpers/FilePondHelper2";
import { toast } from "react-toastify";
import getToken from "../../../utils/helpers/getToken";
import getCaravanImages from "../../../utils/helpers/getCaravanImages";
import axios from "axios";

const EditAcc6 = ({ nextBtn, carId }) => {
  const [imageData, setImageData] = useState([
    {
      fileName: "תמונה01",
      base64Data: "",
    },
    { fileName: "תמונה02", base64Data: "" },
    { fileName: "תמונה03", base64Data: "" },
    { fileName: "תמונה04", base64Data: "" },
  ]);
  const [caravanId, setCaravanId] = useState(carId);

  const [imageChangeTrigger, setImageChangeTrigger] = useState(false);
  useEffect(() => {
    setCaravanId(carId);
    const getImgs = async () => {
      try {
        const caravanImgs = await getCaravanImages(carId);
        //console.log("caravanImgs", caravanImgs.caravanImages);

        if (caravanImgs) setImageData(caravanImgs.caravanImages);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    getImgs();
  }, [carId, imageChangeTrigger]);
  const userId = getToken().userId;

  const sendUpData = (data, numberOfEntry) => {
    console.log("prevData", imageData[numberOfEntry]);
    if (imageData && imageData[numberOfEntry]) {
      setImageData((prevData) => {
        const newData = [...prevData];
        newData[numberOfEntry].base64Data = data;
        return newData;
      });
    }
  };
  const handleRemoveItem = (indexNumber) => {
    const newData = [...imageData];
    newData[indexNumber].base64Data = null;
    //console.log("handleRemoveItem data", newData);
    setImageData(newData);
    //photoRemoved(base64Data);
  };
  const checkForPhotos = (data) => {
    for (let item of data) {
      if (item.base64Data || item.original) return true;
    }
    return false;
  };

  const handleNextBtn = () => {
    if (checkForPhotos(imageData)) {
      nextBtn(imageData, 5);
    } else return toast.error("יש להעלות לפחות תמונה אחת");
  };

  const showImgUpload = (index) => {
    setImageData((prevState) => {
      const updatedImageData = [...prevState]; // Copy the array
      updatedImageData[index] = { ...updatedImageData[index], original: "" }; // Update first object

      return updatedImageData; // Set updated state
    });
  };

  const deleteCaravanImg = async (caravanId, imageName) => {
    try {
      const foundImages = await getCaravanImages(caravanId);
      console.log("foundImaegs", foundImages);
      if (foundImages.caravanImages.length === 0) return;
      else {
        const filteredImg = foundImages.caravanImages.find(
          (img) => img.filename === imageName
        );
        //console.log("filteredImg", filteredImg);
        if (filteredImg) {
          console.log("prepare to delete");
          const imgToDel = await axios.delete(
            `/images/removeimage/caravanImages/${userId}/${filteredImg._id}/`
          );
          if (imgToDel) {
            toast.success("התמונה נמחקה בהצלחה");
            setImageChangeTrigger(!imageChangeTrigger);
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  //console.log("imageData", imageData);
  return (
    <Box>
      <Typography variant="h6">יש להעלות עד 4 תמונות</Typography>
      <Box>
        <Grid container spacing={2}>
          {[0, 1, 2, 3].map((index) => (
            <Grid key={index} item xs={12} md={3}>
              <Typography variant="h6">{`תמונה ${index + 1}:`}</Typography>

              {/* Show image if exists */}
              {imageData[index]?.original && (
                <Box>
                  <img
                    src={imageData[index].original}
                    alt={imageData[index].filename}
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
                    onClick={() =>
                      deleteCaravanImg(carId, imageData[index].filename || "")
                    }
                  >
                    להסרת התמונה
                  </Button>
                </Box>
              )}
              {!imageData[index]?.original && (
                // Show Upload Component if no image exists
                <ImageUploadComponent
                  imageTypeName="caravanImages"
                  uploadTrigger={imageChangeTrigger}
                  userId={userId}
                  indexNumber={index}
                  serverUrl={`http://localhost:5000/api/images/uploadimage/caravanImages/${userId}/${caravanId}`}
                  fileType="caravanImages"
                  sendUpFunc={sendUpData}
                  handleRemovePhoto={() => handleRemoveItem(index)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" onClick={handleNextBtn}>
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default EditAcc6;
