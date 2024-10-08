import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const SortViewComponent = ({ onSortClick }) => {
  const [value, setValue] = useState("None");

  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSortClick = () => {
    onSortClick(value);
  };

  return (
    <FormControl>
      <FormLabel id="sortGroup">
        <Typography
          variant="body1"
          color={isDarkTheme ? "white" : "black"}
          sx={{ fontSize: "1.5em" }}
        >
          View As
        </Typography>
      </FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel
          value="Full Item"
          control={<Radio />}
          label="Full Item"
        />
        <FormControlLabel value="List" control={<Radio />} label="List" />
      </RadioGroup>
      <Button variant="contained" onClick={handleSortClick}>
        Sort
      </Button>
    </FormControl>
  );
};

export default SortViewComponent;
