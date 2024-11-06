import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SortComponent from "../../components/SortComponent.jsx";
import sortArray from "../../components/newComponents/helpers/sortArray";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Grid, Box, Button, Card } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import CaravanCard from "../../components/newComponents/CaravanCard";
import caravanCatalog from "../../components/newComponents/helpers/caravanCatalog.js";
import fetchUserLocation from "../../components/newComponents/helpers/fetchUserLocation";

const CaravanSearchResults = () => {
  const params = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [sortState, setSortState] = useState("None");
  const [userLocation, setUserLocation] = useState(null);
  const [chosenDates, setChosenDates] = useState({
    start: +params.start,
    end: +params.end,
    numOfDay: +params.numOfDays,
  });

  const currentDate = dayjs().startOf("day").unix();

  const isOverlappingDates = (start1, end1, start2, end2) => {
    return start1 <= end2 && end1 >= start2;
  };

  const searchAvailability = () => {
    //console.log("here", chosenDates);

    if (chosenDates.start < currentDate || chosenDates.end < currentDate) {
      return toast.error("אנא הכנס תאריכים תקינים");
    }
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
    setSearchResults(availableCaravans);
  };

  const getUserLocation = async () => {
    if (userLocation) return;
    const location = await fetchUserLocation();
    setUserLocation(location);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    searchAvailability();
  }, [chosenDates]);

  const onSortPick = (value) => {
    setSortState(value);
  };

  const handleSortClick = async () => {
    console.log("sortState", sortState);

    if (!sortState || sortState === "None") {
      return;
    }
    const sortedArray = await sortArray(
      sortState,
      setSearchResults,
      searchResults,
      userLocation
    );
    console.log("sortClickFunc", sortedArray);

    //setSearchResults(sortedArray);
  };

  if (!searchResults || !searchResults.length) {
    return <CircularProgress />;
  }

  return (
    <div className="searchResultsBg">
      <Card sx={{ width: "100%", backgroundColor: "rgba(255,255,255,0)" }}>
        <h1>תוצאות חיפוש</h1>
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            pb: "2em",
          }}
        >
          <Grid item xs={12}>
            <SortComponent
              onChange={onSortPick}
              onSortClick={handleSortClick}
            />
          </Grid>
          {searchResults.map((card) => (
            <Grid key={card.title} item xs={12}>
              <CaravanCard
                caravanDetails={card}
                numOfDays={chosenDates.numOfDay}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default CaravanSearchResults;
