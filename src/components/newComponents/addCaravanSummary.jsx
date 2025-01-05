import { useState, useEffect } from "react";
import { Box, Typography, Card, CardHeader, CardContent } from "@mui/material";
import ImageGallery from "../../utils/helpers/ImageGallery";

const AddCaravanSummary = ({ setupDetails }) => {
  const [accDetails, setAccDetails] = useState(setupDetails);
  const [images, setImages] = useState(setupDetails[4]);

  useEffect(() => {
    setAccDetails(setupDetails);
    setImages(setupDetails[4]);
  }, [setupDetails]);

  console.log("imagess", setupDetails[4]);

  return (
    <Box>
      <Card>
        <CardHeader
          title={<Typography variant="h5">המודעה שלכם</Typography>}
          sx={{ textAlign: "center" }}
        />
        <CardContent>{images && <ImageGallery images={images} />}</CardContent>
      </Card>
    </Box>
  );
};

export default AddCaravanSummary;
