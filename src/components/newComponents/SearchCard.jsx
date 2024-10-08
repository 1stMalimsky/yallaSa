import { useState } from "react";
import Grid from "@mui/system/Grid";
import { Typography, Button } from "@mui/material";
import DatePickers from "../DatePicker";
import { toast } from "react-toastify";
import { dateActions } from "../../store/dateHandler";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const SearchCard = ({ onChange }) => {
  const [chosenDates, setChosenDates] = useState({
    start: "",
    end: "",
  });

  const currentDate = new Date();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDateChange = (dateText, newDate) => {
    if (newDate == null) {
      return;
    }

    setChosenDates((prevDates) => ({
      ...prevDates,
      [dateText.toLowerCase()]: newDate.$d.getTime(),
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
    dispatch(dateActions.setStartDate(chosenDates.start));
    dispatch(dateActions.setEndDate(chosenDates.end));
    dispatch(dateActions.calculateDays());
    navigate(`/car-inv/${chosenDates.start}/${chosenDates.end}`);
  };

  return (
    <Grid container spacing={1} class="searchCardGrid">
      <Grid item xs={12} className="subGridSearchCard">
        <Typography variant="h4" component="h6" sx={{ fontWeight: "bold" }}>
          יאללה סע! השכרת קרוואנים
        </Typography>
        <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
          השכרת קרוואנים בכל הארץ. במחיר הטוב ביותר!
        </Typography>
      </Grid>
      <Grid item xs={12} className="subGridSearchCard">
        <DatePickers dateText="מתי אוספים?" onChange={handleDateChange} />
      </Grid>
      <Grid item xs={12} className="subGridSearchCard">
        <DatePickers dateText="מתי מתי מחזירים?" onChange={handleDateChange} />
      </Grid>
      <Grid item xs={12} className="subGridSearchCard">
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{ width: "10em", height: "4em" }}
        >
          <Typography variant="body1" className={"mainButton"}>
            SEARCH
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchCard;
