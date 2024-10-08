import { Fragment, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const ExtrasBtn = ({ text, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onClick(text, clicked);
  };

  return (
    <Box className="extraComp">
      <Button variant="contained" onClick={handleClick} className="btn">
        {!clicked ? `+ ${text}` : `- ${text}`}
      </Button>
      <Typography variant="body1">
        {text === "Insurance" ? "(25 per day)" : null}
        {text === "Infant Seat" ? "(15 per day)" : null}
        {text === "Additional Driver" ? "(30 per day)" : null}
      </Typography>
    </Box>
  );
};

export default ExtrasBtn;
