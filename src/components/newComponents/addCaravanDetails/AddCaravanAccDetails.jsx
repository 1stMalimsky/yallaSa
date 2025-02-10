import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddAcc1 from "./AddAcc1";
import AddAcc2 from "./AddAcc2";
import AddAcc3 from "./AddAcc3";
import AddAcc4 from "./AddAcc4";
import AddAcc5 from "./AddAcc5";
import AddAcc6 from "./AddAcc6";
import AddAcc7 from "./AddAcc7";
import AddAcc8 from "./AddAcc8";
import AddAcc9 from "./AddAcc9";
import AddCaravanSummary from "./addCaravanSummary";
import axios from "axios";
import getToken from "../../../utils/helpers/getToken";
import getUserDetails from "../../../utils/helpers/getUserDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import normalizeExtras from "./helpers/normalizeExtras";

const AddCaravanAcc = () => {
  const [accDetails, setAccDetails] = useState([]);
  const [openState, setOpenState] = useState(0);
  const [caravanId, setCaravanId] = useState("");
  const [imageUploadTrigger, setImageUploadTrigger] = useState(false);
  const [extrasPrices, setExtrasPrices] = useState({});
  const [user, setUser] = useState("");
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const setUserDetails = async () => {
      try {
        const user = await getUserDetails(token.userId);
        if (user) {
          console.log("user", user);

          setUser(user);
        } else return console.log("no user found");
      } catch (err) {
        console.error("Error:", err);
      }
    };
    setUserDetails();
  }, []);

  const handleSubmitBtn = async () => {
    try {
      /*    if (user.isOwner === false) {
        const userChanged = await axios.patch(`/users/update/${token.userId}`, {
          isOwner: true,
        });
        console.log("userChnaged");
      } */

      const objToSend = {
        ...accDetails[0],
        ...accDetails[1],
        ...accDetails[2],
        ...accDetails[3],
        ...accDetails[4],
        ...accDetails[6],
        ...accDetails[7].caravanDetails,
        ...accDetails[8],
        ...normalizeExtras(extrasPrices),
      };
      console.log("obj to send", objToSend);

      const newData =
        accDetails[0].privateUser === "false"
          ? {
              isOwner: true,
              isBusiness: true,
              businessDetails: {
                companyName: accDetails[0].userDetails.companyName,
                companyId: accDetails[0].userDetails.companyId,
                phone: accDetails[0].userDetails.phone,
                city: accDetails[0].userDetails.city,
                street: accDetails[0].userDetails.street,
                email: accDetails[0].userDetails.email,
              },
              paymentDetails: accDetails[0].paymentDetails,
            }
          : {
              isOwner: true,
              isBusiness: false,
              ...accDetails[0].paymentDetails,
            };
      console.log("newData", newData);

      const userUpdate = await axios.put(
        `/users/update/${token.userId}`,
        newData
      );
      console.log("update user", userUpdate);

      const res = await axios.post("/caravans/create", objToSend);
      console.log("res from addCaravan", res);

      const caravavnId = res.data.newCaravan._id;
      setImageUploadTrigger(true);
      //console.log("main trigger", imageUploadTrigger);
      setTimeout(() => {
        setImageUploadTrigger(false);
      }, 1000);
      setCaravanId(caravavnId);
      if (userUpdate.data) {
        localStorage.setItem("token", userUpdate.data.token);
      }
      // sessionStorage.clear();
      toast.success("הטופס נשלח בהצלחה");
      /* setTimeout(() => {
        navigate("/profile");
      }, 2000); */
      //console.log("caravanId", caravavnId);
    } catch (err) {
      console.log("handkeSubmit erro", err);
    }
  };

  const handleNextBtn = (data, numberOfEntry) => {
    setAccDetails((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry] = data;
      return newData;
    });
    /* STOPPER */
    if (numberOfEntry === 9) return;
    /* STOPPER */
    setOpenState(openState + 1);
  };

  const handleBackBtn = () => {
    if (openState === 0) {
      return;
    }
    setOpenState(openState - 1);
  };

  const updatePhotoRemoved = (data) => {
    setAccDetails((prevData) => {
      const newData = [...prevData];
      newData[2] = data;
      // console.log("updatePhotoRemoved Data", newData);
      return newData;
    });
  };

  const handleExtrasUpdate = (data) => {
    setExtrasPrices(data);
  };

  useEffect(() => {
    console.log("accDetails", accDetails);
  }, [accDetails]);

  console.log("extrasPrices", extrasPrices);

  if (!user) return <CircularProgress />;
  return (
    <Grid container sx={{ display: "flex" }}>
      <Grid item xs={12} md={8} lg={8}>
        {/* ACC1 */}
        <Accordion expanded={openState === 0 ? true : false}>
          <AccordionSummary
            id="acc1"
            expandIcon={
              openState === 1 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
            onClick={handleBackBtn}
          >
            <Typography variant="h5">1. פרטים אישיים</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc1 nextBtn={handleNextBtn} user={user} />
          </AccordionDetails>
        </Accordion>
        {/* ACC2 */}
        <Accordion expanded={openState === 1 ? true : false}>
          <AccordionSummary
            id="acc2"
            expandIcon={
              openState === 2 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
            onClick={handleBackBtn}
          >
            <Typography variant="h5">2. תיאור וחוקים</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc2 nextBtn={handleNextBtn} />
          </AccordionDetails>
        </Accordion>
        {/* ACC3 */}
        <Accordion expanded={openState === 2 ? true : false}>
          <AccordionSummary
            id="acc3"
            expandIcon={
              openState === 3 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
            onClick={handleBackBtn}
          >
            <Typography variant="h5">3. סוג הקרוואן</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc3 nextBtn={handleNextBtn} />
          </AccordionDetails>
        </Accordion>
        {/* ACC4 */}
        <Accordion expanded={openState === 3 ? true : false}>
          <AccordionSummary
            id="acc4"
            onClick={handleBackBtn}
            expandIcon={
              openState === 4 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
          >
            <Typography variant="h5">4. פרטי הלנה</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc4 nextBtn={handleNextBtn} />
          </AccordionDetails>
        </Accordion>
        {/* ACC5 */}
        <Accordion expanded={openState === 4 ? true : false}>
          <AccordionSummary
            expandIcon={
              openState === 5 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
            id="acc5"
            onClick={handleBackBtn}
          >
            <Typography variant="h5">5. מתקנים וציוד</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc5 nextBtn={handleNextBtn} extrasFunc={handleExtrasUpdate} />
          </AccordionDetails>
        </Accordion>
        {/* ACC6 */}
        <Accordion expanded={openState === 5 ? true : false}>
          <AccordionSummary
            expandIcon={
              openState === 6 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
            id="acc6"
            onClick={handleBackBtn}
          >
            <Typography variant="h5">6. תמונות הקרוואן</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc6
              nextBtn={handleNextBtn}
              carId={caravanId}
              uploadTrigger={imageUploadTrigger}
            />
          </AccordionDetails>
        </Accordion>
        {/* ACC7 */}
        <Accordion expanded={openState === 6 ? true : false}>
          <AccordionSummary
            expandIcon={
              openState === 7 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
            id="acc7"
            onClick={handleBackBtn}
          >
            <Typography variant="h5">7. מיקום ושעות</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc7 nextBtn={handleNextBtn} />
          </AccordionDetails>
        </Accordion>
        {/* ACC8 */}
        <Accordion expanded={openState === 7 ? true : false}>
          <AccordionSummary
            expandIcon={
              openState === 8 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
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
              caravanId={caravanId}
              uploadTrigger={imageUploadTrigger}
            />
          </AccordionDetails>
        </Accordion>
        {/* ACC9 */}
        <Accordion expanded={openState === 8 ? true : false}>
          <AccordionSummary
            expandIcon={
              openState === 9 ? (
                <Typography variant="h5">שינוי</Typography>
              ) : null
            }
            id="acc9"
            onClick={handleBackBtn}
          >
            <Typography variant="h5">9. הגדרות מחיר</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddAcc9
              nextBtn={handleNextBtn}
              handleSubmit={() => handleSubmitBtn()}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <div
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          {<AddCaravanSummary setupDetails={accDetails} />}
        </div>
        <Grid />
      </Grid>
    </Grid>
  );
};

export default AddCaravanAcc;
