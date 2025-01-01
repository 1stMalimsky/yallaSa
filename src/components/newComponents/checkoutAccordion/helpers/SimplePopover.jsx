import { useState } from "react";
import { IconButton, Typography, Popover, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const SimplePopover = ({ title, description }) => {
  //const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton variant="contained" onClick={handleClick}>
        <InfoIcon variant="contained">Open Popover</InfoIcon>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={2} sx={{ maxWidth: "20em", direction: "rtl" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
      </Popover>
    </div>
  );
};

export default SimplePopover;
