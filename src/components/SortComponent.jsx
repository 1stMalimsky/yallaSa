import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Box } from "@mui/material";
import { Typography } from "@mui/material";

const SortComponent = ({ onChange, onSortClick }) => {
  const [value, setValue] = useState("None");

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ direction: "rtl" }}>
      <Box className="sortCompBox">
        <FormLabel id="sortGroup">
          <Typography
            variant="body1"
            sx={{ fontSize: "1.5em", color: "text.primary" }}
          >
            סדר לפי
          </Typography>
        </FormLabel>
        <RadioGroup
          value={value}
          onChange={handleChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            pl: "2em",
          }}
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
            label="מס מיטות"
          />
          <FormControlLabel value="rating" control={<Radio />} label="דירוג" />
        </RadioGroup>
        <Button
          variant="contained"
          onClick={onSortClick}
          sx={{ width: "5em", maxHeight: "3em" }}
        >
          סדר
        </Button>
      </Box>
    </FormControl>
  );
};

export default SortComponent;
