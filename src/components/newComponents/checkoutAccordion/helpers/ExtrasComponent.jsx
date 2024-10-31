import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Grid,
  Box,
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
    <Card sx={{ width: "12em", height: "15em" }}>
      <CardHeader
        title={<Typography variant="h6">{extraName}</Typography>}
        action={
          <SimplePopover title={extraName} description={extraDescription} />
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          {/* EXTRA'S IMG */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img src={iconImg} alt="hello" style={{ maxWidth: "4em" }} />
              <Typography variant="h5">&#8362;{inputState.price}</Typography>
            </Box>
          </Grid>
          {/* EXTRA'S PRICE */}
          {/* <Grid item xs={6}>
             
            </Grid> */}
          {/* </Grid> */}
          {/* +/- BUTTONS */}
          <Grid
            item
            xs={12}
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExtrasComponent;
