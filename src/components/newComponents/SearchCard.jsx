import { useState } from "react";
import { Typography, Button, Grid, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { dateActions } from "../../store/dateHandler";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import daysCalculator from "../../utils/daysCalculator";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/he";
import { DatePicker } from "@mui/x-date-pickers";
import { heIL } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { current } from "@reduxjs/toolkit";
dayjs.locale("he");

const SearchCard = () => {
  const [chosenDates, setChosenDates] = useState({
    start: null,
    end: null,
  });

  const currentDate = dayjs();
  const currentUnixDate = dayjs().startOf("day").unix();
  console.log("currentUnixDate", currentDate);

  const navigate = useNavigate();

  const handleDateChange = (date, field) => {
    setChosenDates((prevDates) => ({
      ...prevDates,
      [field]: date,
    }));
  };
  const handleSearchClick = () => {
    const formatDates = {
      start: chosenDates.start.unix(),
      end: chosenDates.end.unix(),
    };
    const isInvalidDate =
      isNaN(formatDates.start) ||
      isNaN(formatDates.end) ||
      formatDates.start < currentUnixDate ||
      formatDates.end <= formatDates.start;
    //console.log("isInvalidDate", isInvalidDate);

    if (isInvalidDate) {
      return toast.error("אנא הכנס תאריכים תקינים");
    }

    const numOfDays = daysCalculator(chosenDates.start, chosenDates.end);
    navigate(`/car-inv/${formatDates.start}/${formatDates.end}/${numOfDays}`);
  };

  //console.log("current", currentDate);
  //console.log("chosendates", chosenDates.start);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="he"
      localeText={
        heIL.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Grid
        container
        spacing={1}
        className="searchCardGrid"
        sx={{
          backgroundColor: "background.default",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} className="searchCardGridItem">
          <Typography variant="h4" component="h6" sx={{ fontWeight: "bold" }}>
            יאללה סע! השכרת קרוואנים
          </Typography>
          <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
            השכרת קרוואנים בכל הארץ. במחיר הטוב ביותר!
          </Typography>
        </Grid>
        <Grid item xs={12} className="searchCardGridItem">
          <DatePicker
            id="pickupDate"
            className="datePickerInput"
            label="מתי אוספים?"
            variant="outlined"
            value={chosenDates.start}
            onChange={(date) => handleDateChange(date, "start")}
            minDate={currentDate}
            openTo="day"
          />
        </Grid>
        <Grid item xs={12} className="searchCardGridItem">
          <DatePicker
            id="returnDate"
            className="datePickerInput"
            label="מתי מחזירים?"
            variant="outlined"
            value={chosenDates.end}
            onChange={(date) => handleDateChange(date, "end")}
            minDate={chosenDates.start}
            openTo="day"
          />
        </Grid>
        <Grid item xs={12} className="searchCardGridItem">
          <Button
            variant="contained"
            onClick={handleSearchClick}
            disabled={!chosenDates.start || !chosenDates.end}
            style={{
              width: "10em",
              height: "4em",
            }}
          >
            <Typography variant="body1">חיפוש&nbsp;</Typography>
            <SearchIcon />
          </Button>
        </Grid>

        <Grid item xs={6} className="searchCardGridItem"></Grid>

        <Grid item xs={12} className="searchCardGridItem">
          <Typography
            variant="body1"
            className="homepageSignUpLink"
            sx={{ marginBottom: "1em" }}
          >
            <Link to="/register" className="registerLink">
              להצטרפות הרשמו עכשיו!
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SearchCard;
