import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  alpha,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";

const EditAcc3 = ({ nextBtn, parentData, caravanId }) => {
  // const [location, setLocation] = useState(parentData.location);
  const [radioOption, setRadioOption] = useState(parentData.vehicleType);
  /* console.log("parentData in acc3", parentData);
  console.log("radio in acc3", radioOption);
 */
  useEffect(() => {
    setRadioOption(parentData.vehicleType);
  }, [parentData]);

  const handleNextBtnClick = async () => {
    try {
      const updateData = await axios.patch(`/caravans/${caravanId}`, {
        carType: radioOption,
      });
      if (updateData) {
        console.log("updateData", updateData);
        toast.success("הקרוואן עודכן בהצלחה");
      }
    } catch (err) {
      console.error("Error:", err);
    }
    nextBtn(
      {
        ...parentData,
        vehicleType: radioOption,
      },
      2
    );
  };

  const handleChange = (event) => {
    setRadioOption(event.target.value);
  };

  //console.log("radio option", radioOption);

  if (!parentData) return <CircularProgress />;
  return (
    <Box>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ marginBottom: 2 }}>
            בחר סוג רכב
          </FormLabel>
          <RadioGroup
            row
            aria-label="vehiclType"
            name="vehicleType"
            value={radioOption}
            onChange={handleChange}
          >
            <FormControlLabel
              value="towCaravan"
              control={<Radio />}
              label={
                <Box
                  className="raiseEffect"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: (theme) =>
                      alpha(theme.palette.text.primary, 0.12),
                  }}
                >
                  <Typography variant="h6">קרוואן נגרר</Typography>
                  <img
                    src={`${process.env.PUBLIC_URL}/imgs/caravanPhotos/caravanIcons/towCarIcon.png`}
                    alt="towCaravan"
                    className="addAcc1Img"
                  />
                </Box>
              }
            />
            <FormControlLabel
              value="fullCaravan"
              control={<Radio />}
              label={
                <Box
                  className="raiseEffect"
                  sx={{
                    className: "raiseEffect",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: (theme) =>
                      alpha(theme.palette.text.primary, 0.12),
                  }}
                >
                  <Typography variant="h6">קרוואן נוסע</Typography>
                  <img
                    src={`${process.env.PUBLIC_URL}/imgs/caravanPhotos/caravanIcons/drivingCamperIcon.png`}
                    alt="towCaravan"
                    className="addAcc1Img"
                  />
                </Box>
              }
            />
            <FormControlLabel
              value="integratedCarvan"
              control={<Radio />}
              label={
                <Box
                  className="raiseEffect"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderColor: (theme) =>
                      alpha(theme.palette.text.primary, 0.12),
                  }}
                >
                  <Typography variant="h6">קרוואן מוסב</Typography>
                  <img
                    src={`${process.env.PUBLIC_URL}/imgs/caravanPhotos/caravanIcons/transitIcon.png`}
                    alt="towCaravan"
                    className="addAcc1Img"
                  />
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          disabled={radioOption ? false : true}
          onClick={handleNextBtnClick}
        >
          עדכן
        </Button>
      </Box>
    </Box>
  );
};

export default EditAcc3;
