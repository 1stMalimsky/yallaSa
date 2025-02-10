import { useEffect, useState } from "react";
import { Modal, Button, Box, Typography, Grid, TextField } from "@mui/material";
import extrasList from "../../checkoutAccordion/helpers/extrasList";
import checkSessionStorage from "../../../../utils/helpers/checkSessionStorage";
import CircularProgress from "@mui/material/CircularProgress";
import normalizeExtrasFromServer from "./normalizeExtrasFromServer";
import axios from "axios";
import normalizeExtras from "../../addCaravanDetails/helpers/normalizeExtras";

const EditExtrasPickerComponent = ({ extrasObj, carId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [prices, setPrices] = useState({});
  // console.log("parentData in extra", extrasObj);

  useEffect(() => {
    if (!extrasObj) return;
    if (extrasObj) {
      const normalizedData = normalizeExtrasFromServer(extrasObj);
      setPrices(normalizedData);
    }
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPrices((prevPrices) => ({
      ...prevPrices,
      [name]: +value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!prices) {
        return console.log("no prices");
      }
      const normalizedData = normalizeExtras(prices);
      console.log("normalizedData", normalizedData);

      const response = await axios.patch(`/caravans/${carId}`, {
        ...normalizedData,
      });
      setModalOpen(false);
    } catch (err) {
      console.error("EditExtrasPicker error:", err);
    }
  };
  //console.log("prices", prices);

  return (
    <Box>
      <Button
        variant="contained"
        color="warning"
        onClick={() => setModalOpen(true)}
      >
        עדכון תוספות
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
                    value={prices[item.name] || ""}
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

export default EditExtrasPickerComponent;
