import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import SimplePopover from "./SimplePopover";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const ExtrasComponent = ({
  extraName,
  extraDescription,
  iconImg,
  maxExtras,
  pricePerUnit,
  onUpdate,
}) => {
  const [inputState, setInputState] = useState({
    extrasSum: 0,
    totalPrice: 0,
  });

  const handleAddExtra = () => {
    setInputState((prevChoice) => {
      if (prevChoice.extrasSum >= maxExtras) return prevChoice;

      const newExtrasSum = prevChoice.extrasSum + 1;
      const newPrice = newExtrasSum * pricePerUnit;
      onUpdate(extraName, newExtrasSum, newPrice);
      return { extrasSum: newExtrasSum, price: newPrice };
    });
  };

  const handleRemoveExtra = () => {
    setInputState((prevChoice) => {
      if (prevChoice.extrasSum <= 0) return prevChoice;

      const newExtrasSum = prevChoice.extrasSum - 1;
      const newPrice = newExtrasSum * pricePerUnit;
      onUpdate(extraName, newExtrasSum, newPrice);
      return { extrasSum: newExtrasSum, price: newPrice };
    });
  };

  return (
    <Card sx={{ maxWidth: "15em" }}>
      <CardHeader
        title={<Typography variant="h6">{extraName}</Typography>}
        action={
          <SimplePopover title={extraName} description={extraDescription} />
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          {/* +/- BUTTONS */}
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="primary"
              variant="contained"
              onClick={handleAddExtra}
              sx={{ ml: -1 }}
            >
              <AddBoxIcon fontSize="large" />
            </IconButton>
            <Typography
              variant="subtitle1"
              sx={{
                border: 1,
                borderRadius: 1,
                pl: 1.2,
                pr: 1.2,
                pt: 0.25,
                pb: 0.25,
              }}
            >
              {inputState.extrasSum}
            </Typography>
            <IconButton
              color="primary"
              variant="contained"
              onClick={handleRemoveExtra}
              sx={{ mr: -1 }}
            >
              <IndeterminateCheckBoxIcon fontSize="large" />
            </IconButton>
          </Grid>
          {/* EXTRA'S IMG */}
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            <img src={iconImg} alt="hello" style={{ maxWidth: "4em" }} />
          </Grid>
          {/* EXTRA'S PRICE */}
          <Grid item xs={12}>
            <Typography variant="h5">&#8362;{inputState.price}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExtrasComponent;
