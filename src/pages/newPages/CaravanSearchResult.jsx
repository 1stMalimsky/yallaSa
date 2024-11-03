import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
//import SortComponent from "../components/SortComponent";
//import useSort from "../hooks/useSort";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Grid, Box, Button, Card } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import moment from "moment/moment";
import CaravanCard from "../../components/newComponents/CaravanCard";
import caravanCatalog from "../../components/newComponents/helpers/caravanCatalog.js";

const CaravanSearchResults = () => {
  const params = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [chosenDates, setChosenDates] = useState({
    start: params.start,
    end: params.end,
    numOfDay: params.numOfDays,
  });

  const isOverlappingDates = (start1, end1, start2, end2) => {
    return start1 <= end2 && end1 >= start2;
  };

  const searchAvailability = () => {
    const availableCaravans = caravanCatalog.filter((caravan) => {
      const isBooked = caravan.bookedDates.some(({ start, end }) => {
        return isOverlappingDates(
          chosenDates.start,
          chosenDates.end,
          start,
          end
        );
      });
      return !isBooked;
    });
    console.log("searchResults", availableCaravans);
    setSearchResults(availableCaravans);
  };

  useEffect(() => {
    searchAvailability();
  }, [chosenDates]);

  console.log("chosen dates", chosenDates);
  if (!searchResults.length || !chosenDates.start || !chosenDates.end) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Card>
        <h1>תוצאות חיפוש</h1>
        <CaravanCard />
      </Card>
    </div>
  );
};

export default CaravanSearchResults;
