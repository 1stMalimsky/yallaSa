import { useState } from "react";
import { Typography, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { dateActions } from "../../store/dateHandler";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import daysCalculator from "../../utils/daysCalculator";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { DatePicker } from "@mui/x-date-pickers";
import { heIL } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
dayjs.locale("he");

const SearchCard = () => {
  const [chosenDates, setChosenDates] = useState({
    start: null,
    end: null,
  });

  const currentDate = new Date();
  const navigate = useNavigate();

  const handleDateChange = (date, field) => {
    setChosenDates((prevDates) => ({
      ...prevDates,
      [field]: date,
    }));
  };

  const handleSearchClick = () => {
    const adjustedCurrentDate = currentDate.setHours(0, 0, 0, 0);
    if (
      isNaN(chosenDates.start) ||
      isNaN(chosenDates.end) ||
      chosenDates.start < adjustedCurrentDate ||
      chosenDates.end < adjustedCurrentDate ||
      chosenDates.start >= chosenDates.end
    ) {
      return toast.error("אנא הכנס תאריכים תקינים");
    }
    let numOfDays = daysCalculator(chosenDates.start, chosenDates.end);
    const formatDates = {
      start: chosenDates.start.unix(),
      end: chosenDates.end.unix(),
    };
    console.log("unix startDate", formatDates.start);

    toast.success(`number of Day = ${numOfDays}`);
    navigate(`/car-inv/${formatDates.start}/${formatDates.end}/${numOfDays}`);
  };
  //console.log("chosendates", chosenDates);

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
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(51, 51, 51, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        })}
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
            value={dayjs(chosenDates.start)}
            onChange={(date) => handleDateChange(date, "start")}
          />
        </Grid>
        <Grid item xs={12} className="searchCardGridItem">
          <DatePicker
            id="returnDate"
            className="datePickerInput"
            label="מתי מחזירים?"
            variant="outlined"
            value={dayjs(chosenDates.end)}
            onChange={(date) => handleDateChange(date, "end")}
            minDate={chosenDates.start} // Ensures earliest selectable date is pickupDate
            openTo="day" // Ensures the DatePicker opens to the calendar view
          />
        </Grid>
        <Grid item xs={12} className="searchCardGridItem">
          <Button
            variant="contained"
            onClick={handleSearchClick}
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
            <Link to="/register">להצטרפות הרשמו עכשיו!</Link>
          </Typography>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SearchCard;
