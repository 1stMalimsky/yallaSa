import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import getUserCaravanData from "../../utils/helpers/getCaravanData";
import getUserCaravanImages from "../../utils/helpers/getCaravanImages";
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditAcc1 from "../../components/newComponents/editCaravan/EditAcc1";
import EditAcc2 from "../../components/newComponents/editCaravan/EditAcc2";
import EditAcc3 from "../../components/newComponents/editCaravan/EditAcc3";
import EditAcc4 from "../../components/newComponents/editCaravan/EditAcc4";
import EditAcc5 from "../../components/newComponents/editCaravan/EditAcc5";
import AddAcc6 from "../../components/newComponents/addCaravanDetails/AddAcc6";
import AddAcc7 from "../../components/newComponents/addCaravanDetails/AddAcc7";
import AddAcc8 from "../../components/newComponents/addCaravanDetails/AddAcc8";
import AddAcc9 from "../../components/newComponents/addCaravanDetails/AddAcc9";
import normalizeEditCaravan from "../../utils/helpers/normalizeEditCaravan";
import getUserDetails from "../../utils/helpers/getUserDetails";

const EditCaravanPage = () => {
  const params = useParams();
  const [caravanDetails, setCaravanDetails] = useState({});
  const [caravanImages, setCaravanImages] = useState([]);
  const [accDetails, setAccDetails] = useState([]);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getCaravanData = async () => {
      const caravanData = await getUserCaravanData(params.caravanId);
      const caravanImages = await getUserCaravanImages(params.caravanId);
      const userDetails = await getUserDetails(
        caravanData.found_caravan.ownerDetails.ownerId
      );

      console.log("userDetails", userDetails);
      console.log("caravanData", caravanData.found_caravan);
      const normzlizedCaravan = normalizeEditCaravan(
        caravanData.found_caravan,
        userDetails
      );
      const paymentDetails = userDetails.paymentDetails;
      setAccDetails(normzlizedCaravan);
      setUserDetails(userDetails);
      setCaravanDetails(caravanData.found_caravan);
      setCaravanImages(caravanImages.caravanImages);
      setDetailsLoaded(true);
    };
    getCaravanData();
  }, []);

  const handleNextBtn = (data, numberOfEntry) => {
    setAccDetails((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry] = data;
      return newData;
    });
  };

  const handleSubmitButton = () => {
    console.log("submit clicked");
  };

  console.log("accDetails", accDetails);

  if (accDetails.length < 1) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h2">Edit Caravan</Typography>
      {detailsLoaded && (
        /* ACC1 */
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h5">1. פרטים אישיים</Typography>
              <Typography variant="h6">שינוי</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <EditAcc1
              nextBtn={handleNextBtn}
              parentData={accDetails[0]}
              caravanId={params.caravanId}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {/* ACC2 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">2. תיאור וחוקים</Typography>
            <Typography variant="h6">שינוי</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <EditAcc2
            nextBtn={handleNextBtn}
            parentData={accDetails[1]}
            caravanId={params.caravanId}
          />
        </AccordionDetails>
      </Accordion>
      {/* ACC3 */}
      <Accordion>
        <AccordionSummary id="acc3" expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">3. סוג הקרוואן</Typography>
            <Typography variant="h6">שינוי</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <EditAcc3
            nextBtn={handleNextBtn}
            parentData={accDetails[2]}
            caravanId={params.caravanId}
          />
        </AccordionDetails>
      </Accordion>
      {/* ACC4 */}
      <Accordion>
        <AccordionSummary id="acc4" expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">4. פרטי הלנה</Typography>
            <Typography variant="h6">שינוי</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <EditAcc4
            nextBtn={handleNextBtn}
            parentData={accDetails[3]}
            caravanId={params.caravanId}
          />
        </AccordionDetails>
      </Accordion>
      {/* ACC5 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">5. מתקנים וציוד</Typography>
            <Typography variant="h6">שינוי</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <EditAcc5
            nextBtn={handleNextBtn}
            parentData={accDetails[4]}
            caravanId={params.caravanId}
          />
        </AccordionDetails>
      </Accordion>
      {/* ACC6 */}
      {/*       <Accordion expanded={openState === 5 ? true : false}>
        <AccordionSummary
          expandIcon={
            openState === 6 ? <Typography variant="h5">שינוי</Typography> : null
          }
          id="acc6"
          onClick={handleBackBtn}
        >
          <Typography variant="h5">6. תמונות הקרוואן</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc6
            nextBtn={handleNextBtn}
            carId={caravanDetails._id}
            uploadTrigger={imageUploadTrigger} 
          />
        </AccordionDetails>
      </Accordion> */}
      {/* ACC7 */}
      {/* <Accordion expanded={openState === 6 ? true : false}>
        <AccordionSummary
          expandIcon={
            openState === 7 ? <Typography variant="h5">שינוי</Typography> : null
          }
          id="acc7"
          onClick={handleBackBtn}
        >
          <Typography variant="h5">7. מיקום ושעות</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc7 nextBtn={handleNextBtn} />
        </AccordionDetails>
      </Accordion> */}
      {/* ACC8 */}
      {/*   <Accordion expanded={openState === 7 ? true : false}>
        <AccordionSummary
          expandIcon={
            openState === 8 ? <Typography variant="h5">שינוי</Typography> : null
          }
          id="acc8"
          onClick={handleBackBtn}
        >
          <Typography variant="h5">8. ביטוח ורישיון רכב</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc8
            nextBtn={handleNextBtn}
            photoRemoved={updatePhotoRemoved}
            caravanId={caravanDetails._id}
            uploadTrigger={imageUploadTrigger}
          />
        </AccordionDetails>
      </Accordion> */}
      {/* ACC9 */}
      {/* <Accordion expanded={openState === 8 ? true : false}>
        <AccordionSummary
          expandIcon={
            openState === 9 ? <Typography variant="h5">שינוי</Typography> : null
          }
          id="acc9"
          onClick={handleBackBtn}
        >
          <Typography variant="h5">9. הגדרות מחיר</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc9
            nextBtn={handleNextBtn}
            handle
            handleSubmit={handleSubmitButton}
          />
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
};

export default EditCaravanPage;
