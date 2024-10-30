import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const Panel4Dialog = ({ insuranceType }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={() => {
          handleClickOpen();
        }}
        startIcon={<InfoIcon />}
      >
        <Typography variant="subtitle1">&nbsp; תנאים</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Conditions
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            &#10005;
          </IconButton>
        </DialogTitle>

        {insuranceType === "basic" && (
          <DialogContent>
            <Typography gutterBottom>
              Your <strong>Basic</strong> package includes coverage with a
              deductible of <strong>€2500</strong>.
            </Typography>
            <Typography gutterBottom>
              In case of an incident, you will be liable for damages up to this
              amount, while any excess damages will be covered by Indie.
            </Typography>
            <Typography gutterBottom>
              Upon selecting this package, a security deposit of{" "}
              <strong>€2000</strong> is required at check-in.
            </Typography>
            <Typography gutterBottom>
              Please note that this coverage excludes certain types of damages
              and usage behaviors.
            </Typography>
            <Typography>
              For more details, see our{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
              .
            </Typography>
          </DialogContent>
        )}
        {insuranceType === "premium" && (
          <DialogContent>
            <Typography gutterBottom>
              Your <strong>Premium</strong> package includes coverage with a
              deductible of <strong>€2500</strong>.
            </Typography>
            <Typography gutterBottom>
              In case of an incident, you will be liable for damages up to this
              amount, while any excess damages will be covered by Indie.
            </Typography>
            <Typography gutterBottom>
              Upon selecting this package, a security deposit of{" "}
              <strong>€2000</strong> is required at check-in.
            </Typography>
            <Typography gutterBottom>
              Please note that this coverage excludes certain types of damages
              and usage behaviors.
            </Typography>
            <Typography>
              For more details, see our{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
              .
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Panel4Dialog;
