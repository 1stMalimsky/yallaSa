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

const AddAcc3 = ({ nextBtn }) => {
  const params = useParams();
  const [location, setLocation] = useState(params.location);
  const [radioOption, setRadioOption] = useState(params.vehicleType);

  const handleNextBtnClick = () => {
    let locationName = location;
    let vehicleType = radioOption;
    switch (location) {
      case "10":
        locationName = "צפון";
        break;
      case "20":
        locationName = "מרכז";
        break;
      case "30":
        locationName = "דרום";
        break;
      default:
        locationName = location;
    }

    switch (vehicleType) {
      case "10":
        vehicleType = "towCaravan";
        break;
      case "20":
        vehicleType = "fullCaravan";
        break;
      case "30":
        vehicleType = "integratedCarvan";
        break;
      default:
        vehicleType = radioOption;
    }
    /*    sessionStorage.setItem(
      "acc3Data",
      JSON.stringify({ location, vehicleType })
    ); */
    nextBtn(
      {
        location: locationName,
        vehicleType: vehicleType,
      },
      2
    );
  };

  useEffect(() => {
    switch (location) {
      case 10:
        setLocation("north");
        break;
      case 20:
        setLocation("center");
        break;
      case 30:
        setLocation("south");
        break;
      default:
        break;
    }
  }, []);

  const handleChange = (event) => {
    setRadioOption(event.target.value);
  };

  //console.log("radio option", radioOption);
  return (
    <Box>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ marginBottom: 2 }}>
            בחר סוג רכב
          </FormLabel>
          <RadioGroup
            row
            aria-label="vehicle-type"
            name="vehicle-type"
            value={radioOption}
            onChange={handleChange}
          >
            <FormControlLabel
              value={10}
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
              value={20}
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
              value={30}
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
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc3;
