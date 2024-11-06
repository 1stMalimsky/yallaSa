import { useState } from "react";
import Rating from "react-rating";
import { Button, Popover, TextField, Box } from "@mui/material";
import "@fortawesome/fontawesome-free/css/all.min.css";

const RatingThing = ({ readOnly }) => {
  const [rating, setRating] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClick = (event, newRating) => {
    handlePopClick(event);
    setRating(newRating);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Submitted value:", inputValue);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "text-field-popover" : undefined;

  return (
    <div style={{ display: "flex" }}>
      <div onClick={onClick}>
        <Rating
          readOnly
          initialRating={rating}
          emptySymbol={
            <i
              className="far fa-star"
              style={{ fontSize: "24px", color: "gray" }}
            ></i>
          }
          fullSymbol={
            <i
              className="fas fa-star"
              style={{ fontSize: "24px", color: "gold" }}
            ></i>
          }
          style={{ flexGrow: 1 }}
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ direction: "rtl" }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
          <TextField
            className="ratingTextField"
            label="כתוב חוות דעת"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            שלח
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default RatingThing;
