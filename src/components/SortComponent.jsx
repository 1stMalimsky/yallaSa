import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

const SortComponent = ({ onChange, onSortClick }) => {
  const [value, setValue] = useState("None");

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const handleSortClick = async () => {
    onSortClick(value);
  };

  return (
    <FormControl>
      <FormLabel id="sortGroup">
        <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
          סדר לפי
        </Typography>
      </FormLabel>
      <RadioGroup
        value={value}
        onChange={handleChange}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <FormControlLabel value="price" control={<Radio />} label="מחיר" />
        <FormControlLabel
          value="location"
          control={<Radio />}
          label="מיקום (קרוב אלי)"
        />
        <FormControlLabel
          value="numOfBeds"
          control={<Radio />}
          label="מספר מיטות"
        />
      </RadioGroup>
      <Button variant="contained" onClick={onSortClick}>
        Sort
      </Button>
    </FormControl>
  );
};

export default SortComponent;
