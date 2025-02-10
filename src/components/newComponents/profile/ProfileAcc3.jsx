import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import getUserCaravans from "../../../utils/helpers/getUserCaravans";
import axios from "axios";
import EditCaravanCard from "../caravanCard/EditCaravanCard";

const ProfileAcc3 = ({ userData }) => {
  const [userDetails, setUserDetails] = useState(userData);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [caravanArr, setCaravanArr] = useState([]);
  //console.log("userDetails", userDetails);

  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
    }
  }, [userData]);

  useEffect(() => {
    const getCaravans = async () => {
      if (!userData) {
        return console.log("no user details yet Acc3");
      }
      try {
        const foundCaravanArr = await getUserCaravans(userData.userId);

        if (foundCaravanArr) {
          setCaravanArr(foundCaravanArr.caravansByUser);
        } else return console.log("no Caravans Found");
      } catch (err) {
        console.log("getCaravans error", err);
      }
    };
    getCaravans();
  }, []);

  //console.log("caravaArr", caravanArr);

  return (
    <Accordion
      open={accordionOpen}
      onClick={() => setAccordionOpen(!accordionOpen)}
    >
      <AccordionSummary>ניהול הקרוואנים שלי</AccordionSummary>
      <AccordionDetails>
        {caravanArr.length > 0 &&
          caravanArr.map((caravan) => {
            return (
              <Grid item xs={12} key={caravan._id}>
                <EditCaravanCard caravanDetails={caravan} />
              </Grid>
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProfileAcc3;
