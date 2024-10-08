import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Fragment } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";

const DatePickers = ({ dateText, onChange }) => {
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const handleDateChange = (newDate) => {
    onChange(newDate);
  };

  return (
    <Fragment>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ locale: "ar-SA" }}
      >
        {isDarkTheme ? (
          <DatePicker
            label={dateText}
            onChange={handleDateChange}
            format="DD-MM-YYYY"
            className="datePickerDark"
            sx={{
              marginTop: 1,
              marginBottom: 1,
            }}
          />
        ) : (
          <DatePicker
            label={dateText}
            onChange={handleDateChange}
            format="DD-MM-YYYY"
            className={"datePicker"}
            sx={{ marginTop: 1, marginBottom: 1 }}
          />
        )}
      </LocalizationProvider>
    </Fragment>
  );
};

export default DatePickers;
