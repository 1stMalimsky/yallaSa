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

const SortComponent = ({ onSortClick }) => {
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
          Sort By
        </Typography>
      </FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="Price" control={<Radio />} label="Price" />
        <FormControlLabel
          value="Car Type"
          control={<Radio />}
          label="Car Type"
        />
        <FormControlLabel
          value="Location"
          control={<Radio />}
          label="Location"
        />
      </RadioGroup>
      <Button variant="contained" onClick={handleSortClick}>
        Sort
      </Button>
    </FormControl>
  );
};

export default SortComponent;
