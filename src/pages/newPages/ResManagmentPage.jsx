import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import getReservations from "../../utils/helpers/getReservations";
import ResResultItem from "../../components/resManagement/ResResultItem";

const ResManagmentPage = () => {
  const params = useParams();

  const [showToday, setShowToday] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [resArr, setResArr] = useState([]);
  const [typeToShow, setTypeToShow] = useState("upcoming");

  const getRes = async (owenrId, type) => {
    try {
      const foundreservations = await getReservations(owenrId, type);
      console.log("foundReservations", foundreservations.data);
      if (!foundreservations) return console.log("no res found");
      setResArr(foundreservations);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    getRes(params.ownerId, typeToShow);
    console.log("triggered");
  }, [typeToShow]);

  const handleViewChoice = (e) => {
    setTypeToShow(e.target.id);
  };

  console.log("resArr", resArr);

  return (
    <Box>
      <Typography variant="h4">ניהל הזמנות</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            id="today"
            variant="contained"
            onClick={handleViewChoice}
            sx={{ margin: 1 }}
          >
            הזמנות להיום
          </Button>
          <Button
            id="upcoming"
            variant="contained"
            onClick={handleViewChoice}
            sx={{ margin: 1 }}
          >
            הזמנות מתקרבות
          </Button>
          <Button
            id="newReservations"
            variant="contained"
            onClick={handleViewChoice}
            sx={{ margin: 1 }}
          >
            הזמנות חדשות
          </Button>
          <Button
            id="upcomingByCaravan"
            variant="contained"
            onClick={handleViewChoice}
            sx={{ margin: 1 }}
          >
            הזמנות לפי קרוואן
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Box>
        <ResResultItem resArr={resArr} />
      </Box>
    </Box>
  );
};

export default ResManagmentPage;
