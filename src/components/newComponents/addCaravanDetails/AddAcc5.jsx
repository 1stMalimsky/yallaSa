import { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ImageUploadComponent from "../../../utils/helpers/FilePondHelper2";
import { toast } from "react-toastify";

const AddAcc5 = ({ nextBtn }) => {
  const [imageData, setImageData] = useState([
    {
      fileName: "תמונה01",
      base64Data: "",
    },
    { fileName: "תמונה02", base64Data: "" },
    { fileName: "תמונה03", base64Data: "" },
    { fileName: "תמונה04", base64Data: "" },
  ]);

  const sendUpData = (data, numberOfEntry) => {
    setImageData((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry].base64Data = data;
      return newData;
    });
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
      if (item.base64Data) return true;
    }
    return false;
  };

  const handleNextBtn = () => {
    if (checkForPhotos(imageData)) {
      nextBtn(imageData, 4);
    } else return toast.error("יש להעלות לפחות תמונה אחת");
  };

  //console.log("imageData", imageData);
  return (
    <Box>
      <Typography variant="h6">יש להעלות עד 4 תמונות</Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">תמונה 1:</Typography>
            <ImageUploadComponent
              indexNumber={0}
              sendUpFunc={sendUpData}
              handleRemovePhoto={() => handleRemoveItem(0)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">תמונה 2:</Typography>
            <ImageUploadComponent
              indexNumber={1}
              sendUpFunc={sendUpData}
              handleRemovePhoto={() => handleRemoveItem(1)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">תמונה 3:</Typography>
            <ImageUploadComponent
              indexNumber={2}
              sendUpFunc={sendUpData}
              handleRemovePhoto={() => handleRemoveItem(2)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">תמונה 4:</Typography>
            <ImageUploadComponent
              indexNumber={3}
              sendUpFunc={sendUpData}
              handleRemovePhoto={() => handleRemoveItem(3)}
            />
          </Grid>
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

export default AddAcc5;
