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
import EditAcc6 from "../../components/newComponents/editCaravan/EditAcc6";
import EditAcc7 from "../../components/newComponents/editCaravan/EditAcc7";
import EditAcc8 from "../../components/newComponents/editCaravan/EditAcc8";
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
  const [isExpanded, setIsExpanded] = useState(0);

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
    setIsExpanded(isExpanded + 1);
    setAccDetails((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry] = data;
      return newData;
    });
  };

  const handleSubmitButton = () => {
    console.log("submit clicked");
  };

  const accordionClick = (id) => {
    if (id > 9 || id < 0) {
      console.log("isExpanded wrong id");
      setIsExpanded(22);
      return;
    }
    if (isExpanded === id) {
      setIsExpanded(22);
      return;
    }
    setIsExpanded(id);
  };

  console.log("accDetails", accDetails);
  //console.log("carqavasnIds", userDetails);

  if (accDetails.length < 1) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h2">Edit Caravan</Typography>
      {detailsLoaded && (
        /* ACC1 */
        <Accordion id="0" expanded={isExpanded === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => accordionClick(0)}
          >
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
              numOfCaravansOwned={2}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {/* ACC2 */}
      <Accordion id="1" expanded={isExpanded === 1}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => accordionClick(1)}
        >
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

      <Accordion id="2" expanded={isExpanded === 2}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => accordionClick(2)}
        >
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
      <Accordion expanded={isExpanded === 3}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => accordionClick(3)}
        >
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
      <Accordion expanded={isExpanded === 4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => accordionClick(4)}
        >
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
      <Accordion expanded={isExpanded === 5}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => accordionClick(5)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">6. תמונות הקרוואן</Typography>
            <Typography variant="h6">שינוי</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <EditAcc6 nextBtn={handleNextBtn} carId={caravanDetails._id} />
        </AccordionDetails>
      </Accordion>
      {/* ACC7 */}
      <Accordion expanded={isExpanded === 6}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => accordionClick(6)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">7. מיקום ושעות</Typography>
            <Typography variant="h6">שינוי</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <EditAcc7
            nextBtn={handleNextBtn}
            parentData={accDetails[6]}
            caravanId={params.caravanId}
          />
        </AccordionDetails>
      </Accordion>
      {/* ACC8 */}
      <Accordion expanded={isExpanded === 7}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="acc8"
          onClick={() => accordionClick(7)}
        >
          <Typography variant="h5">8. ביטוח ורישיון רכב</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EditAcc8
            nextBtn={handleNextBtn}
            parentData={accDetails[7]}
            caravanId={caravanDetails._id}
          />
        </AccordionDetails>
      </Accordion>
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
