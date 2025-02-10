import { useEffect, useState } from "react";
import { Modal, Button, Box, Typography, Grid, TextField } from "@mui/material";
import extrasList from "../../checkoutAccordion/helpers/extrasList";
import checkSessionStorage from "../../../../utils/helpers/checkSessionStorage";

const ExtrasPickerComponent = ({ extrasUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("acc5extras"));
    if (sessionData) {
      setPrices(sessionData);
    }
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value) || 0;

    setPrices((prevPrices) => ({
      ...prevPrices,
      [name]: {
        price: numericValue,
        isAvailable: numericValue > 0, // ✅ Set `isAvailable` based on price
      },
    }));
  };

  const handleSubmit = () => {
    sessionStorage.setItem("acc5extras", JSON.stringify(prices));
    console.log("submitting prices", prices);
    if (!prices) {
      extrasUpdate({});
    } else {
      extrasUpdate(prices);
    }
    setModalOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="warning"
        onClick={() => setModalOpen(true)}
      >
        מוכרים תוספות?
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box>
          <Typography varian="h6">תוספות</Typography>
          <Grid
            container
            sx={{
              direction: "rtl",
              pt: 4,
              pb: 4,
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            {extrasList.map((item) => (
              <Grid item xs={6} md={3} key={item.name} sx={{ pb: 4, pr: 4 }}>
                <div>
                  <Box
                    sx={{ display: "flex", justifyContent: "spaca-between" }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {item.name}
                    </Typography>
                    <img
                      src={item.iconImg}
                      alt="extra"
                      style={{ maxWidth: "4em" }}
                    />
                  </Box>
                  <TextField
                    type="number"
                    className="inputFixExtraLong"
                    value={prices[item.name]?.price || ""}
                    label="מחיר ליחידה"
                    name={item.name}
                    onChange={onInputChange}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.primary.contrastText,
                    }}
                  />
                </div>
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button variat="contained" onClick={handleSubmit}>
                עדכן
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default ExtrasPickerComponent;
