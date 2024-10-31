import { useState } from "react";
import ExtrasComponent from "./helpers/ExtrasComponent";
import extrasList from "./helpers/extrasList";
import { Grid, Button } from "@mui/material";

const Panel5 = ({ setExpanded, onSubmit }) => {
  const [inputState, setInputState] = useState({});

  const handleExtrasUpdate = (name, extraSum, price) => {
    //console.log("extraSum", extraSum);
    setInputState((prevState) => {
      if (extraSum === 0) {
        const { [name]: removed, ...rest } = prevState;
        return rest;
      } else {
        return {
          ...prevState,
          [name]: {
            extraSum: extraSum,
            totalPrice: price,
          },
        };
      }
    });
  };

  const handlePanel5Submit = () => {
    onSubmit(inputState);
    setExpanded("panel6");
    //console.log("inputState", inputState);
  };

  return (
    <div>
      <Grid container spacing={1}>
        {extrasList.map((extra) => (
          <Grid
            key={extra.name}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid white",
              borderRadius: "10px",
              height: "15em",
              mb: 1,
            }}
          >
            <ExtrasComponent
              extraName={extra.name}
              extraDescription={extra.description}
              iconImg={extra.iconImg}
              maxExtras={extra.maxExtras}
              pricePerUnit={extra.pricePerUnit}
              onUpdate={handleExtrasUpdate}
            />
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePanel5Submit}
          >
            הבא
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Panel5;
