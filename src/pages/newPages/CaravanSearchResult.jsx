import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SortComponent from "../../components/SortComponent.jsx";
import sortArray from "../../components/newComponents/helpers/sortArray";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Grid, Box, Button, Card, CardHeader } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import CaravanCard from "../../components/newComponents/CaravanCard";
import caravanCatalog from "../../components/newComponents/helpers/caravanCatalog.js";
import fetchUserLocation from "../../components/newComponents/helpers/fetchUserLocation";
import { heIL } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import daysCalculator from "../../utils/daysCalculator.js";

const CaravanSearchResults = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [sortState, setSortState] = useState("None");
  const [userLocation, setUserLocation] = useState(null);
  const [chosenDates, setChosenDates] = useState({
    start: dayjs.unix(params.start),
    end: dayjs.unix(params.end),
    numOfDay: +params.numOfDays,
    updateStart: dayjs.unix(params.start),
    updateEnd: dayjs.unix(params.end),
  });

  const currentDate = dayjs();
  const currentUnixDate = dayjs().startOf("day").unix();

  const handleDateChange = (date, field) => {
    setChosenDates((prevDates) => ({
      ...prevDates,
      [field]: date,
    }));
  };
  const isOverlappingDates = (start1, end1, start2, end2) => {
    return start1 <= end2 && end1 >= start2;
  };

  const searchAvailability = (startDate, endDate) => {
    if (startDate < currentUnixDate || endDate < currentUnixDate) {
      return toast.error("אנא הכנס תאריכים תקינים");
    }
    const availableCaravans = caravanCatalog.filter((caravan) => {
      const isBooked = caravan.bookedDates.some(({ start, end }) => {
        return isOverlappingDates(startDate, endDate, start, end);
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
    searchAvailability(params.start, params.end);
  }, []);

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

  const handleSearchUpdate = () => {
    const unixDates = {
      start: chosenDates.updateStart.unix(),
      end: chosenDates.updateEnd.unix(),
    };
    const numOfDays = daysCalculator(
      chosenDates.updateStart,
      chosenDates.updateEnd
    );

    const newUrl = `/car-inv/${unixDates.start}/${unixDates.end}/${numOfDays}`;
    /* navigate(
      `/car-inv/${unixDates.start}/${unixDates.end}/${numOfDays}`
    ); */

    window.location.href = newUrl;
  };

  if (!searchResults || !searchResults.length) {
    return <CircularProgress />;
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="he"
      localeText={
        heIL.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <div className="searchResultsBg">
        <Card
          sx={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0)",
          }}
        >
          {/* HEADER SECTION */}
          <Box className="sortCompHeader">
            <CardHeader title="תוצאות חיפוש" />
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <SortComponent
                  onChange={onSortPick}
                  onSortClick={handleSortClick}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "1em" }}>
                <DatePicker
                  className="datePickerInput"
                  label="תאריך איסוף"
                  variant="outlined"
                  value={chosenDates.updateStart}
                  onChange={(date) => handleDateChange(date, "updateStart")}
                  sx={{ ml: "1em" }}
                  minDate={currentDate}
                />
                <DatePicker
                  className="datePickerInput"
                  label="תאריך החזרה"
                  variant="outlined"
                  value={chosenDates.updateEnd}
                  minDate={chosenDates.updateStart}
                  openTo="day"
                  onChange={(date) => handleDateChange(date, "updateEnd")}
                />
                <Button
                  variant="contained"
                  sx={{ width: "5em", height: "3em", mr: "1em" }}
                  onClick={handleSearchUpdate}
                >
                  שינוי
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              pb: "2em",
            }}
          >
            {searchResults.map((card) => (
              <Grid key={card.title} item xs={12}>
                <CaravanCard caravanDetails={card} chosenDates={chosenDates} />
              </Grid>
            ))}
          </Grid>
        </Card>
      </div>
    </LocalizationProvider>
  );
};

export default CaravanSearchResults;
