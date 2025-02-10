import { useEffect, useState } from "react";
import ExtrasComponent from "./helpers/ExtrasComponent";
import extrasList from "./helpers/extrasList";
import { Grid, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Panel5 = ({ setExpanded, onSubmit, extraPrices }) => {
  const [inputState, setInputState] = useState({});
  //const [filteredExtras, setFilteredExtras] = useState([]);
  const [list, setList] = useState(extrasList);

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

  useEffect(() => {
    if (extraPrices) {
      const filteredExtras = list.filter(
        (item) => extraPrices[item.english]?.isAvailable
      );

      const updatedExtras = filteredExtras.map((extra) => ({
        ...extra,
        pricePerUnit: extraPrices[extra.english]?.price ?? extra.pricePerUnit,
      }));
      setList(updatedExtras);
    }
  }, [extraPrices]);

  const handlePanel5Submit = () => {
    onSubmit(inputState);
    setExpanded("panel6");
    //console.log("inputState", inputState);
  };

  //console.log("extra prices", extraPrices);
  //console.log("list", list);

  /* if (!extraPrices) {
    return <CircularProgress />;
  } */

  return (
    <div>
      {extraPrices && (
        <Grid container spacing={1}>
          {list.map((extra) => (
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
                height: "100%",
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
      )}
      {!extraPrices && (
        <div>
          <Typography variant="h6">אין אפשרות לתוספות</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePanel5Submit}
          >
            הבא
          </Button>
        </div>
      )}
    </div>
  );
};

export default Panel5;
